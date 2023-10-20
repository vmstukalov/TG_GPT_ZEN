import puppeteer, {Browser, Page, Protocol, PuppeteerLaunchOptions} from "puppeteer";
import fs from 'fs';
import {sendTelegramMessage} from "./telegram.service";

const selectors = {
    addButtonSelector: "button[class^=author-studio-header__addButton]",
    addArticleButtonSelector: "label[aria-label='Написать статью']",
    articleTitleInput: ".editable-input.editor__title-input",
    articleTextInput: ".zen-editor.editor__zen-draft-editor"

}

export async function createPost(title: string, text: string, isLocalhost: boolean) {

    let options: PuppeteerLaunchOptions = {
        headless: isLocalhost ? false : "new",
        defaultViewport: null,
        args: isLocalhost ? [] : ["--no-sandbox"],
    }

    if (isLocalhost) {
        options = {
            ...options,
            executablePath: '/usr/bin/chromium-browser'
        }
    }

    const browser = await puppeteer.launch(options);


    if (!fs.existsSync("cookies.json")) {
        await browser.close();
        return
    }
    const cookies = JSON.parse(fs.readFileSync("cookies.json").toString())

    //console.log({cookies})
    const page = await browser.newPage();

    page.on("framenavigated", async frame => {

        if (!frame) {
            return
        }
        const url = frame.url(); // the new url
        if (url.endsWith("/edit")) {
            await writePost(browser, title, text)
            page.removeAllListeners("framenavigated");
        }
    })

    for (let cookie of cookies) {
        await page.setCookie(cookie)
    }

    // Navigate the page to a URL
    await page.goto(`https://dzen.ru/profile/editor/id/${process.env.ZEN_ID}`)

    await page.waitForSelector(selectors.addButtonSelector);
    await page.waitForSelector(`${selectors.addButtonSelector} use`)
    await page.click(selectors.addButtonSelector);


    await page.waitForSelector(selectors.addArticleButtonSelector);

    await page.waitForSelector(`${selectors.addArticleButtonSelector} span[class^=new-publication-dropdown__buttonTitle]`);
    //console.log(page.$(selectors.addArticleButtonSelector))
    await page.waitForTimeout(5000);
    await page.click(selectors.addArticleButtonSelector);


}

async function writePost(browser: Browser, title: string, text: string) {

    const pages = await browser.pages();
    let page: Page;

    for (let p of pages) {
        if (p.url().includes("editor/id")) {
            page = p;
        }
    }


    if (!page) {
        return
    }

    await page.waitForSelector(selectors.articleTextInput);
    const articleTitleInput = await page.$(selectors.articleTitleInput);
    await articleTitleInput.click({delay: 150})

    const editableTitleElements = await page.$$(`${selectors.articleTitleInput} *`);

    editableTitleElements.forEach((e, i) => {
        try {
            e.type(" ");
        } catch (e) {
        }
    });

    const titleInput = editableTitleElements[editableTitleElements.length - 1];
    await titleInput.type(title, {delay: 100});



    await page.waitForSelector(selectors.articleTextInput);
    const editor = await page.$(selectors.articleTextInput);
    await editor.click({delay: 250});

    await editor.type(text, {
        delay: 150
    })

    const contentElement = await page.$(".content");
    await contentElement.click({delay: 250})

    setTimeout(() => {
        browser.close();
    }, 10000);

}

async function saveCookies(interceptedRequest, page) {
    console.log('A request was made:', interceptedRequest.url());
    //console.log({cookies: await page.cookies()});
    const cookies = JSON.stringify(await page.cookies());

    fs.writeFileSync("cookies.json", cookies)
}

export async function createCookies() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://dzen.ru');


    page.on('request', (interceptedRequest) => saveCookies(interceptedRequest, page));
}

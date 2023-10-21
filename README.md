# Инструкция по запуску

В репозитории лежит исходный код бекенда. Чтобы он заработал, выполните следующие шаги.

## 1. Подпишитесь на YouTube канал автора (Опционально)

https://www.youtube.com/@indie_it

## 2. Подготовка

Скачайте репозиторий на компьютер

Убедитесь, что у вас установлены:
- Node.js
- TypeScript
- Nodemon

## 3. Настройка

Откройте проект в среде разработки

Добавьте пустой файл .env в папку /api

Создайте Telegram бота

Ключ апи пропишите в файл .env в формате

TG_API_KEY=0193456:AAEсduOнDggHqyi5byKw-tdda-lqmEuIvEx

Перейдите в терминале в папку api с помощью команды 
```
cd /api
```
Выполните команду
```
npm init
```

## 3.1 Безопасность

Добавьте файл .env в .gitignore, чтобы ваши ключи не стали доступны другим или публикуйте код в приватный репозиторий.

## 3. Настройте webhook для Telegram бота

Придумайте секретное слово для приема сообщений от Telegram, например, "super_telega41". Добавьте его в файл .env, таким образом:
WEBHOOK=super_telega41

## 4. Запустите проект локально

Удалите файл /api/cookies.json из проекта

Это нужно, чтобы сохранить cookies и программа могла бы в дальнейшем без авторизации добавлять статьи на Дзен.

В папке api выполните следующую команду 

```
npm run dev
```

Это запустит проект на вашем компьютере.

Перейдите по адресу http://localhost:9001/zen/start

Откроется браузер. В этом браузере залогиньтесь на сайте dzen.ru и создайте блог на Яндекс Дзене (введите название и описание)

Перейдите на страницу «Мой канал» и скопируйте id канала. Он есть в адресе страницы. Например, на этом канале https://dzen.ru/id/652cff086592826adf967c83, здесь id=652cff086592826adf967c83.

добавьте в файл .env строку

ZEN_ID={id канала}

Пример:
ZEN_ID=652cff086592826adf967c83

Закройте браузер

### 4.1. Безопасность (Важно)

При публикации своего репозитория, сделайте его приватным, поскольку после запуска в папке /api появится файл cookies.json. С этим файлом любой может получить доступ к вашему аккаунту на Яндексе. В текущем проекте файл есть, поскольку аккаунт не представляет ценности.  

## 5. Получите ключ API для Chat GPT

https://platform.openai.com/account/api-keys 

Добавьте в файл /api/.env переменную

CHAT_GPT_API_KEY=ваш ключ

Пополните баланс в разделе billing на минимальную сумму

## 6. Выложите проект на сервер.

Как это сделать можно посмотреть в бесплатном уроке «Настройка сервера» на сайте https:/js-course.ru.

## 6.1 Конфигурация на сервере

Добавьте вручную файл .env на сервер в папку с приложением/api


## 6.2 Установите Chromium на сервер

Установите Chromium и библиотеки для него на сервер

```
apt-get install chromium-browser
apt-get install gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm-dev
```

Запустите/перезапустите приложение на сервере.

## 7. Сообщите серверу Telegram о своем адресе для вебхуков.

Для этого вызовите метод setWebhook() https://core.telegram.org/bots/api#setwebhook. Говоря простым языком, откройте в браузере адрес 

https://api.telegram.org/bot{TG_API_KEY}/setWebhook?url={WEBHOOK_URL}

Пример:

https://api.telegram.org/bot0193456:AAEсduOнDggHqyi5byKw-tdda-lqmEuIvEx/setWebhook?url=https://site.ru/telegram/webhook/super_telega41

## P.S. Самореклама 

Открыт для участия в стартапах США и ЕС, где уже есть инвестиции или договоренности с фондом.

Если не получается запустить программу, нужны доработки или разработка программы на базе текущей, пишите мне.

Хотите научиться делать Telegram ботов? Пишите!

Моя почта vmstukalov@mail.ru

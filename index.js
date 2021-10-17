const needle = require('needle');
const { parse } = require("url");
const fs = require("fs");
const path = require('path');


const checkArgv = require('./functions/checkargv');
const getDownloadPath = require('./functions/getdownloadpath');
const getScrfToken = require('./functions/getscrftoken');
const getFilename = require('./functions/getfilename');


(async () => {
    try {
        // проверяем наличие аргументов в командной строке
        let { url, folder } = await checkArgv()

        // получаем токен
        let { scrf } = await getScrfToken(url)

        // получаем ссылку для скачивания файла
        let fileurl = await getDownloadPath(url, scrf)

        // отправляем запрос на скачивание
        let res = await needle.get(fileurl)

        // получаем название файла и записываем по выбранному пути
        let { pathname } = parse(res.request.path)
        let filename = await getFilename(pathname)
        let out = res.pipe(fs.createWriteStream(path.join(folder, filename)))

        out.on("error", (err) => {
                console.log("----writing file closed with error", err)
            })
            .on("finish", () => {
                console.log(`File has been download to ${path.join(folder, filename)}`)
            })

    } catch (error) {
        console.error(error)
    }
})()
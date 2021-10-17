const { URL, parse } = require("url");
const needle = require('needle');
const path = require('path');

async function checkArgv(){
    process.argv.splice(0, 2)
    let [url, folder] = process.argv

    // проверка на наличие аргументов
    if(!folder && !url) throw new Error("Not found first argument. It must be valid url")
    if(!folder ) throw new Error("Not found second argument. It must be valid path")

    // проверка на корректый URL
    new URL(url)
    const parsed = parse(url)
    let host = parsed.host
    if(host !== 'we.tl' && host !== 'wetransfer.com') throw new Error("Invalid URL")
    // если ссылка сокращённая - превращаем в полноценную
    if(host === 'we.tl') {
        let res = await needle('head', url)
        url = res.headers.location
    }

    // если переданный путь относительный - превращаем в абсолютный
    if(path.resolve( folder ) !== path.normalize( folder )) {
        folder = path.resolve( folder )
    }

    return { url, folder }
}

module.exports = checkArgv
const needle = require('needle');
const { parse } = require("url");

// получаем ссылку для скачивания
async function getDownloadPath(url, scrf, cookies) {
    // парсим урл 
    let { pathname } = parse(url)
    let parsed = pathname.split('/')
    parsed.splice(0, 2)

    // составляем тело запроса
    let body = {
        "intent": "entire_transfer"
    }
    let urlID = parsed[0]
    let hash
    if(parsed.length == 3) {
        hash = parsed[2]
        body["recipient_id"] = parsed[1]
    } else {
        hash = parsed[1]
    }
    body["security_hash"] = hash

    // ссылка для получения ссылки для скачивания
    let wetransferurl = `https://wetransfer.com/api/v4/transfers/${urlID}/download`

    let options = {
        headers: {
            'x-csrf-token': scrf,
            'x-requested-with': 'XMLHttpRequest',
            'Content-Type': 'application/json',
        },
    };

    // отправка POST запроса для получения ссылки
    let res = await needle("post", wetransferurl, body,  options)

    
    return res.body.direct_link
}

module.exports = getDownloadPath
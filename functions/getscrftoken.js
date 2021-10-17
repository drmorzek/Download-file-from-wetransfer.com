const needle = require('needle');
const cheerio = require('cheerio');

// получаем scrf токен
async function getScrfToken(url) {

    let { body } = await needle('get', url)
    const $ = cheerio.load(body)
    const scrf = $("meta[name=csrf-token]").attr('content').trim()

    return { scrf }
}

module.exports = getScrfToken
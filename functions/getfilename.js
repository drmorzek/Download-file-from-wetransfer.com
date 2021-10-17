const path = require('path');

// получаем наименование файла
async function getFilename(pathname) {

    let { base } = path.parse(pathname)

    return base
}

module.exports = getFilename
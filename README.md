# Задача

Необходимо написать утилиту, позволяющую скачивать файлы с файлообменника в нужный каталог, вот пример ссылки(https://we.tl/t-mev6bRoweQ). 
Вызов утилиты должен выглядеть следующим образом: "node index.js https://we.tl/t-mev6bRoweQ C:\work"

## Необходимые требования для запуска прилжения

- Node.js >= 10.0

## Установка

1. Клонировать репозиторий
```bash
git clone https://github.com/drmorzek/Download-file-from-wetransfer.com

```

2. Перейти в папку
```bash
cd Download-file-from-wetransfer.com
```

3. Установить зависимости
```bash
npm install

```


4. Запустить скрипт

```bash
node index.js https://we.tl/t-mev6bRoweQ C:\work

# вместо https://we.tl/t-mev6bRoweQ указать необходимую ссылку
# вместо C:\work указать необходимую папку для загрузки файла
# если указан относительный путь то файл скачается в папку со скриптом

```



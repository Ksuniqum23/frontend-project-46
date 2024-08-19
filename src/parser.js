//установить библиотеку для работы с jml
//npm install js-yaml

import yaml from "js-yaml";

const parser = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
}

export default (data, format) => parser[format](data);

//метод диспетчеризации по ключу:
//https://www.perplexity.ai/search/process-cwd-eto-chto-O2vyoHMKT6KKpuuy6hyFpw
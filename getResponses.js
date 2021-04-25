const fs = require('fs')
const fetch = require('node-fetch');
const parse = require('csv-parse')
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTWB15wJZWtL_imMr_kHX7DkJal2_G6OLSawSnLi0cKnMBssCmwQhN_ClEL-eC1AWLusPnY86dqX3l9/pub?gid=1750418078&single=true&output=csv"

fetch(sheetURL)
    .then(res => res.text())
    .then(body => {
        parse(body, { columns: true }, function (err, data) {
            data.forEach(row => {
                row.images = row.images.replace(/\n/g, ';')
            })
            fs.writeFileSync('./_data/responses.json', JSON.stringify(data, null, '  '))
        })
    });
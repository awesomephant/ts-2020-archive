const parse = require("csv-parse/lib/sync");
const fs = require("fs");

function readCSV() {
    const input = fs.readFileSync("./_data/commentsData.csv");
    const records = parse(input, {
        columns: true,
        skip_empty_lines: true,
    });

    records.forEach(r => {
        r.author = JSON.parse(r.author)
    })
    console.log(`${records.length} comments found.`);
    return records;
}

module.exports = function () {
    const data = readCSV();
    return data;
};
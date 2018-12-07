const fs = require('fs-extra');

module.exports = async (filePath) => {
  const csv = await fs.readFileSync(filePath, { encoding: 'utf8' });

  if (!csv) {
    throw new Error('File Does Not Exist.');
  }

  const data = csvToArray(csv);
  const locales = data.shift().slice(1);
  const output = {};

  data.forEach(row => {
    const key = row.shift();

    row.forEach((value, i) => {
      const locale = locales[i];
      (output[locale] || (output[locale] = {}))[key] = value;
    });
  });

  return output;
};

const csvToArray = (data) => {
  if (data.slice(-1) !== '\n') data += '\n';

  const regex = /("(?:[^"]|"")*"|[^,"\n\r]*)(,|\r?\n|\r)/y;
  const rows = [];
  let row = [];

  while (true) {
    const match = data.match(regex);

    if (!match) {
      return rows;
    }

    const [, str, separator] = match;
    const value = str[0] !== '"' ? str : str.slice(1, -1).replace(/""/g, '"');

    if (separator === ',' || value) {
      row.push(value.replace(/[^\r]\n/g, '\r\n'));
    }

    if (separator !== ',') {
      rows.push(row);
      row = [];
    }
  }
};
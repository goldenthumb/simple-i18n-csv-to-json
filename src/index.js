const fs = require ('fs-extra');

module.exports = async (filePath) => {
  const csv = await fs.readFileSync(filePath, { encoding: 'utf8' });
  const data = csv.split(/\r?\n/).map(str => str.split(','));
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
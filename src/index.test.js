import toJson from '../src';


// sample csv
// ,ko,en,ja,zh_CN,zh_TW
// yes,예,Yes,はい,是的,是的
// no,아니오,No,いいえ,没有,沒有

test('basic', async () => {
  const result = await toJson('./sample.csv');
  const messages = {
    ko: {
      yes: '예',
      no: '아니오'
    },
    en: {
      yes: 'Yes',
      no: 'No'
    },
    ja: {
      yes: 'はい',
      no: 'いいえ'
    },
    zh_CN: {
      yes: '是的',
      no: '没有'
    },
    zh_TW: {
      yes: '是的',
      no: '沒有'
    }
  };
  expect(result).toEqual(messages);
});


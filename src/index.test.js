import path from 'path';
import toJson from '../src';
import SimpleI18n from '@goldenthumb/simple-i18n';

// sample csv
// ,ko,en,ja,zh_CN,zh_TW
// yes,예,Yes,はい,是的,是的
// no,,No,いいえ,没有,沒有

test('basic', async () => {
  const result = await toJson(path.resolve(__dirname, './sample.csv'));
  const messages = {
    ko: {
      yes: '예',
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

test('allow empty string', async () => {
  const result = await toJson(path.resolve(__dirname, './sample.csv'), { allowEmpty: true });
  const messages = {
    ko: {
      yes: '예',
      no: ''
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

test('using by with SimpleI18n', async () => {
  const messages = await toJson('./sample.csv');
  const i18n = new SimpleI18n({
    defaultLocale: ['en'],
    locale: 'en',
    messages
  });

  expect(i18n.message('yes')).toBe('Yes');
  i18n.switchLang('ja');
  expect(i18n.message('no')).toBe('いいえ');
});

import { urlValid } from '../js/formHandler'

test('Should return true if valid url', () => {
  expect(urlValid('http://google.com')).toBe(true);
});

test('Should return false if not valid url', () => {
  expect(urlValid('test')).toBe(false);
});
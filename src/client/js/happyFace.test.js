import { getFaceColor, HAPPY, UNHAPPY, NEUTRAL } from '../js/happyFace'

test('Should return right color if Neutral', () => {
  expect(getFaceColor('neutral')).toBe(NEUTRAL);
});

test('Should return right color if Positive', () => {
  expect(getFaceColor('positive')).toBe(HAPPY);
});

test('Should return right color if Negative', () => {
  expect(getFaceColor('negative')).toBe(UNHAPPY);
});
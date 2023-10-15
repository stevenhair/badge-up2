import { getColorCode } from './color';

describe('color', () => {
    describe('getColorCode()', () => {
        describe('When the input is a hex value', () => {
            test('it accepts a 6-digit value', () => {
                expect(getColorCode('123456')).toBe('#123456');
            });

            test('it accepts a 6-digit value with a leading #', () => {
                expect(getColorCode('#123456')).toBe('#123456');
            });
        });

        describe('When the input is a color name', () => {
            test('it returns the hex value for that color', () => {
                expect(getColorCode('red')).toBe('#ff0000');
                expect(getColorCode('peru')).toBe('#cd853f');
            });
        });
    });
});

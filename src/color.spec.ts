import { getColorCode, basicColors } from './color';

describe('color', () => {
    describe('getColorCode()', () => {
        describe('When the input is a hex value', () => {
            test('it accepts a 6-digit value', () => {
                expect(getColorCode('123456')).toBe('#123456');
            });

            test('it accepts a 6-digit value with a leading #', () => {
                expect(getColorCode('#123456')).toBe('#123456');
            });

            test('it accepts a 3-digit value', () => {
                expect(getColorCode('123')).toBe('#123');
            });

            test('it accepts a 3-digit value with a leating #', () => {
                expect(getColorCode('#123')).toBe('#123');
            });
        });

        describe('When the input is one of the basic colors', () => {
            for (const [ name, color ] of Object.entries(basicColors)) {
                test(`it accepts basic color "${name}"`, () => {
                    expect(getColorCode(color)).toBe(color);
                });
            }
        });

        describe('When the input is a color name', () => {
            test('it returns the hex value for that color', () => {
                expect(getColorCode('red')).toBe('#ff0000');
                expect(getColorCode('peru')).toBe('#cd853f');
            });
        });
    });
});

import { badge, basic, basicColors, colors } from './index';

describe('index', () => {
    test('it exports the badge function', () => {
        expect(badge).toBeInstanceOf(Function);
    });

    test('it exports the basic function', () => {
        expect(basic).toBeInstanceOf(Function);
    });

    test('it exports the colors', () => {
        expect(colors).toBeInstanceOf(Object);
    });

    test('it exports the basic colors', () => {
        expect(basicColors).toBeInstanceOf(Object);
    });
});

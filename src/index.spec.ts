import { basic, basicColors } from './index';
import { getMockBadge } from './test-utils/badge-utils';

describe('index', () => {
    describe('basic', () => {
        test('it should be able to create a badge', async () => {
            expect(basic('batman', 'component', basicColors.green)).toBe(await getMockBadge('good'));
        });

        test('it should be able to create a long badge', async () => {
            expect(basic('batmanandrobinforever', 'component', basicColors.green)).toBe(await getMockBadge('long'));
        });

        test('it should prevent bad xml values', async () => {
            expect(basic('&<>"\'', '&<>"\'', basicColors.green)).toBe(await getMockBadge('xml'));
        });
    });
});

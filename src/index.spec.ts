import badge, { colors } from './index';
import { getMockBadge } from './test-utils/badge-utils';

describe('#index', () => {
    test('should be able to create a badge', async () => {
        expect(badge('batman', 'component', colors.green)).toBe(await getMockBadge('good'));
    });

    test('should be able to create a long badge', async () => {
        expect(badge('batmanandrobinforever', 'component', colors.green)).toBe(await getMockBadge('long'));
    });

    test('should prevent bad xml values', async () => {
        expect(badge('&<>"\'', '&<>"\'', colors.green)).toBe(await getMockBadge('xml'));
    });
});

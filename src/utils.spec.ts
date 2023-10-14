import { escapeXml, textWidth } from './utils';

describe('utils', () => {
    describe('escapeXml()', function () {
        test('should escape all funky characters', function () {
            expect(escapeXml('&')).toBe('&amp;');
            expect(escapeXml('<')).toBe('&lt;');
            expect(escapeXml('>')).toBe('&gt;');
            expect(escapeXml('"')).toBe('&quot;');
            expect(escapeXml("'")).toBe('&apos;');
        });

        test('should escape all instances', () => {
            expect(escapeXml('"<<<\'yes&no&maybe\'>>>"'))
                .toBe('&quot;&lt;&lt;&lt;&apos;yes&amp;no&amp;maybe&apos;&gt;&gt;&gt;&quot;',
                );
        });
    });

    describe('textWidth()', () => {
        test('should measure simple text', () => {
            expect(textWidth('hi')).toBe(11);
        });

        test("shouldn't measure weird characters by default", () => {
            expect(textWidth('HI∃')).toBe(14);
        });

        test('should measure weird characters when asked', () => {
            expect(textWidth('HI∃', 7)).toBe(21);
        });
    });
});

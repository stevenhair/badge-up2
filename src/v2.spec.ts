import { getMockBadge } from './test-utils/badge-utils';
import v2, { sectionsToData } from './v2';

describe('v2', () => {
    describe('sectionsToData()', () => {
        test('uses default colors', () => {
            const sections = ['foo', 'bar', 'baz'];
            const have = sectionsToData(sections);
            expect(have.sections[0].color).toBe('#696969');
            expect(have.sections[1].color).toBe('#d3d3d3');
            expect(have.sections[2].color).toBe('#d3d3d3');
        });

        test('uses color attributes', () => {
            const sections = [
                ['foo', 'lightgreen'],
                ['bar', 'ef03BB'],
            ];
            const have = sectionsToData(sections);
            expect(have.sections[0].color).toBe('#90ee90');
            expect(have.sections[1].color).toBe('#ef03bb');
        });

        test('uses stroke attributes', () => {
            const sections = ['foo', ['bar', 'd3d3d3', 's{ffffff}']];
            const have = sectionsToData(sections);
            expect(have.sections[0].stroke).toBeUndefined();
            expect(have.sections[1].stroke).toBe('#ffffff');
        });

        test('ignores stroke attributes with invalid color', () => {
            const sections = ['foo', ['bar', 'd3d3d3', 's{foobar}']];
            const have = sectionsToData(sections);
            expect(have.sections[0].stroke).toBeUndefined();
            expect(have.sections[1].stroke).toBeUndefined();
        });

        test('lays out two sections', () => {
            const sections = ['foo', 'bar'];
            const want = {
                width: 57,
                height: 20,
                sections: [
                    {
                        x: 0,
                        width: 28,
                        color: '#696969',
                        lines: [
                            {
                                x: 5,
                                y: 14,
                                text: 'foo',
                            },
                        ],
                    },
                    {
                        x: 28,
                        width: 29,
                        color: '#d3d3d3',
                        lines: [
                            {
                                x: 33,
                                y: 14,
                                text: 'bar',
                            },
                        ],
                    },
                ],
            };
            const have = sectionsToData(sections);
            expect(have).toEqual(want);
        });

        test('ignores unknown attributes', () => {
            const sections = [['foo', 'mork', 'mindy'], ['bar', 'oh no not this']];
            const want = {
                width: 57,
                height: 20,
                sections: [
                    {
                        x: 0,
                        width: 28,
                        color: '#696969',
                        lines: [
                            {
                                x: 5,
                                y: 14,
                                text: 'foo',
                            },
                        ],
                    },
                    {
                        x: 28,
                        width: 29,
                        color: '#d3d3d3',
                        lines: [
                            {
                                x: 33,
                                y: 14,
                                text: 'bar',
                            },
                        ],
                    },
                ],
            };
            const have = sectionsToData(sections);
            expect(have).toEqual(want);
        });

        test('lays out a complex example', () => {
            const sections = [
                'foo/far;fun',
                ['bar\nbaz', 'orange'],
                ['mork "mindy"', 'olive'],
                ['<∀>', 'moccasin'],
            ];
            const want = {
                width: 219,
                height: 32,
                sections: [
                    {
                        x: 0,
                        width: 70,
                        color: '#696969',
                        lines: [
                            {
                                x: 5,
                                y: 14,
                                text: 'foo/far;fun',
                            },
                        ],
                    },
                    {
                        x: 70,
                        width: 30,
                        color: '#ffa500',
                        lines: [
                            {
                                x: 75,
                                y: 14,
                                text: 'bar',
                            },
                            {
                                x: 75,
                                y: 26,
                                text: 'baz',
                            },
                        ],
                    },
                    {
                        x: 100,
                        width: 86,
                        color: '#808000',
                        lines: [
                            {
                                x: 105,
                                y: 14,
                                text: 'mork "mindy"',
                            },
                        ],
                    },
                    {
                        x: 186,
                        width: 33,
                        color: '#ffe4b5',
                        lines: [
                            {
                                x: 191,
                                y: 14,
                                text: '<∀>',
                            },
                        ],
                    },
                ],
            };
            const have = sectionsToData(sections);
            expect(have).toEqual(want);
        });
    });

    describe('badge()', () => {
        test('renders foo/bar correctly', async () => {
            const sections = ['foo', 'bar'];
            const svg = v2(sections);
            expect(svg).toEqual(await getMockBadge('v2-foo-bar'));
        });

        test('renders a named color correctly', async () => {
            const sections = ['foo', ['bar', 'lightgreen']];
            const svg = v2(sections);
            expect(svg).toEqual(await getMockBadge('v2-one-color'));
        });

        test('renders the example correctly', async () => {
            const sections = [
                'foo/far;fun',
                ['bar\nbaz', 'orange'],
                ['mork "mindy"', 'olive', 's{white}'],
                ['<∀>', 'moccasin'],
            ];

            const svg = v2(sections);
            expect(svg).toEqual(await getMockBadge('v2-example'));
        });

        test('renders stroke correctly', async () => {
            const sections = ['foo', ['bar', 'd3d3d3', 's{white}']];
            const svg = v2(sections);
            expect(svg).toEqual(await getMockBadge('v2-foo-bar-stroke'));
        });
    });
});

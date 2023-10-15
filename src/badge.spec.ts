import { readFile } from 'fs/promises';
import path from 'path';

import { badge, basic, buildBadgeConfig } from './badge';
import { basicColors } from './color';

describe('badge', () => {
    describe('basic', () => {
        test('it should be able to create a badge', async () => {
            expect(basic('batman', 'component', basicColors.green)).toBe(await getMockBadge('basic'));
        });

        test('it should be able to create a long badge', async () => {
            expect(basic('batmanandrobinforever', 'component', basicColors.green))
                .toBe(await getMockBadge('basic-long'));
        });

        test('it should prevent bad xml values', async () => {
            expect(basic('&<>"\'', '&<>"\'', basicColors.green)).toBe(await getMockBadge('xml'));
        });
    });

    describe('buildBadgeConfig()', () => {
        test('uses default colors', () => {
            const sections = ['foo', 'bar', 'baz'];
            const have = buildBadgeConfig(sections);
            expect(have.sections[0].color).toBe('#696969');
            expect(have.sections[1].color).toBe('#d3d3d3');
            expect(have.sections[2].color).toBe('#d3d3d3');
        });

        test('uses color attributes', () => {
            const sections = [
                { text: 'foo', color: 'lightgreen' },
                { text: 'bar', color: 'ef03BB' },
            ];
            const have = buildBadgeConfig(sections);
            expect(have.sections[0].color).toBe('#90ee90');
            expect(have.sections[1].color).toBe('#ef03bb');
        });

        test('uses stroke attributes', () => {
            const sections = [
                'foo',
                { text: 'bar', color: 'd3d3d3', strokeColor: 'ffffff' },
            ];
            const have = buildBadgeConfig(sections);
            expect(have.sections[0].stroke).toBeNull();
            expect(have.sections[1].stroke).toBe('#ffffff');
        });

        test('ignores stroke attributes with invalid color', () => {
            const sections = [
                'foo',
                { text: 'bar', color: 'd3d3d3', strokeColor: 'foobar' },
            ];
            const have = buildBadgeConfig(sections);
            expect(have.sections[0].stroke).toBeNull();
            expect(have.sections[1].stroke).toBeNull();
        });

        test('lays out two sections', () => {
            const sections = ['foo', 'bar'];
            const want = {
                width: 57,
                height: 20,
                sections: [
                    {
                        x: 0,
                        height: 20,
                        stroke: null,
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
                        height: 20,
                        stroke: null,
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
            const have = buildBadgeConfig(sections);
            expect(have).toEqual(want);
        });

        test('ignores unknown attributes', () => {
            const sections = [
                { text: 'foo', color: 'mork', strokeColor: 'mindy' },
                { text: 'bar', color: 'oh no not this' },
            ];
            const want = {
                width: 57,
                height: 20,
                sections: [
                    {
                        x: 0,
                        height: 20,
                        stroke: null,
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
                        height: 20,
                        stroke: null,
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
            const have = buildBadgeConfig(sections);
            expect(have).toEqual(want);
        });

        test('lays out a complex example', () => {
            const sections = [
                'foo/far;fun',
                { text: 'bar\nbaz', color: 'orange' },
                { text: 'mork "mindy"', color: 'olive' },
                { text: '<∀>', color: 'moccasin' },
            ];
            const want = {
                width: 219,
                height: 32,
                sections: [
                    {
                        x: 0,
                        height: 20,
                        width: 70,
                        stroke: null,
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
                        height: 32,
                        width: 30,
                        stroke: null,
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
                        height: 20,
                        width: 86,
                        stroke: null,
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
                        height: 20,
                        width: 33,
                        stroke: null,
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
            const have = buildBadgeConfig(sections);
            expect(have).toEqual(want);
        });
    });

    describe('badge()', () => {
        test('renders foo/bar correctly', async () => {
            const sections = ['foo', 'bar'];
            const svg = badge(sections);
            expect(svg).toEqual(await getMockBadge('foo-bar'));
        });

        test('renders a named color correctly', async () => {
            const sections = ['foo', { text: 'bar', color: 'lightgreen' }];
            const svg = badge(sections);
            expect(svg).toEqual(await getMockBadge('one-color'));
        });

        test('renders the example correctly', async () => {
            const sections = [
                'foo/far;fun',
                { text: 'bar\nbaz', color: 'orange' },
                { text: 'mork "mindy"', color: 'olive', strokeColor: 'white' },
                { text: '<∀>', color: 'moccasin' },
            ];

            const svg = badge(sections);
            expect(svg).toEqual(await getMockBadge('example'));
        });

        test('renders stroke correctly', async () => {
            const sections = ['foo', { text: 'bar', color: 'd3d3d3', strokeColor: 'white' }];
            const svg = badge(sections);
            expect(svg).toEqual(await getMockBadge('foo-bar-stroke'));
        });
    });
});

async function getMockBadge(name: string): Promise<string> {
    return (await readFile(path.join(__dirname, 'test-data', `${name}.svg`))).toString().trim();
}


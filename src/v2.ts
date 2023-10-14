import colors from 'css-color-names';
import dot from 'dot';
import fs from 'fs';
import path from 'path';
import svgo from 'svgo';

import { textWidth } from './utils';

export type Section = string | [string] | string[]; // TODO: shair: this last one should be a tuple type

interface LineData {
    x: number;
    y: number;
    text: string;
}

interface SectionData {
    x: number;
    width: number;
    lines: LineData[];
    color?: string;
    stroke?: string;
}

interface BadgeData {
    width: number;
    height: number;
    sections: SectionData[];
}

const TEMPLATE = dot.template(fs.readFileSync(path.join(__dirname, 'templates', 'v2.svg'), 'utf-8'));
const COLOR_REGEX = /^[0-9a-f]{6}$/i;
const STROKE_REGEX = /^s\{(.+?)}$/i;
const DEFAULT_COLOR_FIRST = colors.dimgrey;
const DEFAULT_COLOR_REST = colors.lightgrey;
const PAD_X = 5;
const PAD_Y = 4;
const LINE_HEIGHT = 12;
const DECENDER_HEIGHT = 2;
const DEFAULT_LETTER_WIDTH = 8; // probably unicode, hard to guess width

function getColorCode(input: string | keyof typeof colors): string | undefined {
    if (COLOR_REGEX.test(input)) {
        return `#${input.toLowerCase()}`;
    }

    if (Object.hasOwn(colors, input)) {
        return colors[input as keyof typeof colors];
    }

    return undefined;
}

// exported for unit testing
export function sectionsToData(sections: Section[]): BadgeData {
    const badgeData: BadgeData = {
        width: 0,
        height: 0,
        sections: [],
    };

    sections.forEach((section, s) => {
        const sectionData: SectionData = {
            x: 0,
            width: 0,
            lines: [],
        };
        const text = Array.isArray(section) ? section.shift() : section;

        if (!text) {
            return;
        }

        sectionData.x = badgeData.width;
        sectionData.color = (s === 0 ? DEFAULT_COLOR_FIRST : DEFAULT_COLOR_REST);
        if (Array.isArray(section)) {
            section.forEach((attribute) => {
                // stroke attribute `s{color}` as CSS color or color code in hex
                const strokeAttribute = STROKE_REGEX.exec(attribute);
                if (strokeAttribute) {
                    sectionData.stroke = getColorCode(strokeAttribute[1]);
                }

                // fill color attribute (without attribute qualifier) as CSS color or color code in hex
                if (getColorCode(attribute)) {
                    sectionData.color = getColorCode(attribute);
                }
            });
        }
        const lines = text.split('\n');
        lines.forEach(function (line, l) {
            const lineData: LineData = {
                x: 0,
                y: 0,
                text: line,
            };
            const lineWidth = (2 * PAD_X) + textWidth(lineData.text, DEFAULT_LETTER_WIDTH);
            lineData.x = badgeData.width + PAD_X;
            lineData.y = (LINE_HEIGHT * l) + PAD_Y + LINE_HEIGHT - DECENDER_HEIGHT;
            sectionData.lines.push(lineData);
            sectionData.width = Math.max(sectionData.width, lineWidth);
        });
        badgeData.sections.push(sectionData);
        const sectionHeight = (2 * PAD_Y) + (lines.length * LINE_HEIGHT);
        badgeData.height = Math.max(badgeData.height, sectionHeight);
        badgeData.width += sectionData.width;
    });
    return badgeData;
}

export default function v2(sections: Section[]): string {
    const raw = TEMPLATE(sectionsToData(sections));
    // TODO: shair: re-enable optimization for everything when you figure out how to use svgo
    let optimized;
    try {
        optimized = svgo.optimize(raw).data;
    } catch (e) {
        optimized = raw;
    }
    return optimized;
}

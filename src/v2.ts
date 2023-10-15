import colors from 'css-color-names';
import dot from 'dot';
import fs from 'fs';
import path from 'path';
import svgo from 'svgo';

import { getColorCode } from './color';
import { textWidth } from './utils';

export type Section = string | [string] | string[];

interface LineConfig {
    x: number;
    y: number;
    text: string;
}

interface SectionConfig {
    x: number;
    height: number;
    width: number;
    lines: LineConfig[];
    color: string;
    stroke: string | null;
}

interface BadgeConfig {
    width: number;
    height: number;
    sections: SectionConfig[];
}

const TEMPLATE = dot.template(fs.readFileSync(path.join(__dirname, 'templates', 'v2.svg'), 'utf-8'));

const DEFAULT_COLOR_FIRST = colors.dimgrey;
const DEFAULT_COLOR_REST = colors.lightgrey;
const PAD_X = 5;
const PAD_Y = 4;
const LINE_HEIGHT = 12;
const DECENDER_HEIGHT = 2;
const DEFAULT_LETTER_WIDTH = 8; // probably unicode, hard to guess width

// exported for unit testing
export function sectionsToData(sections: Section[]): BadgeConfig {
    const badgeConfig: BadgeConfig = {
        width: 0,
        height: 0,
        sections: [],
    };

    sections.forEach((section, index) => {
        const sectionConfig = buildSection(section, badgeConfig.width, index);

        badgeConfig.sections.push(sectionConfig);
        badgeConfig.height = Math.max(badgeConfig.height, sectionConfig.height);
        badgeConfig.width += sectionConfig.width;
        return sectionConfig;
    });

    return badgeConfig;
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

function buildLines(section: Section, badgeWidth: number): LineConfig[] {
    const text = (Array.isArray(section) ? section[0] : section) ?? '';
    return text.split('\n').map((line, l) => ({
        x: badgeWidth + PAD_X,
        y: (LINE_HEIGHT * l) + PAD_Y + LINE_HEIGHT - DECENDER_HEIGHT,
        text: line,
    }));
}

function buildSection(section: Section, badgeWidth: number, index: number): SectionConfig {
    const lines = buildLines(section, badgeWidth);
    return {
        lines,
        x: badgeWidth,
        height: (2 * PAD_Y) + (lines.length * LINE_HEIGHT),
        width: Math.max(...lines.map((line) => (2 * PAD_X) + textWidth(line.text, DEFAULT_LETTER_WIDTH))),
        color: getBackgroundColor(section, index),
        stroke: getStrokeColor(section),
    };
}

function getBackgroundColor(section: Section, index: number): string {
    let colorCode;
    if (Array.isArray(section) && section.length > 1) {
        colorCode = getColorCode(section[1]);
    }

    if (!colorCode) {
        // the first section gets a different default badge color
        colorCode = index === 0 ? DEFAULT_COLOR_FIRST : DEFAULT_COLOR_REST;
    }

    return colorCode;
}

function getStrokeColor(section: Section): string | null {
    let colorCode = null;
    if (Array.isArray(section) && section.length > 2) {
        colorCode = getColorCode(section[2]);
    }

    return colorCode;
}

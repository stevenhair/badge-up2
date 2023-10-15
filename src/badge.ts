import colors from 'css-color-names';
import dot from 'dot';
import fs from 'fs';
import path from 'path';
import svgo from 'svgo';

import { basicColors, getColorCode } from './color';
import { textWidth } from './text';

export type Section = string | SectionConfig;

interface SectionConfig {
    text: string;
    color?: string;
    strokeColor?: string;
}

interface SectionLine {
    x: number;
    y: number;
    text: string;
}

interface BadgeSection {
    x: number;
    height: number;
    width: number;
    lines: SectionLine[];
    color: string | null;
    stroke: string | null;
}

interface BadgeConfig {
    width: number;
    height: number;
    sections: BadgeSection[];
}

const TEMPLATE = dot.template(fs.readFileSync(path.join(__dirname, 'templates', 'v2.svg'), 'utf-8'));

const DEFAULT_COLOR_FIRST = colors.dimgrey;
const DEFAULT_COLOR_REST = colors.lightgrey;
const PAD_X = 5;
const PAD_Y = 4;
const LINE_HEIGHT = 12;
const DECENDER_HEIGHT = 2;

export function badge(sections: Section[]): string {
    const raw = TEMPLATE(buildBadgeConfig(sections));

    try {
        return svgo.optimize(raw).data;
    } catch (e) {
        // There is a bug in svgo that erroneously causes it to think that some characters are unencoded.
        // It's probably pretty rare for those to be in a badge and the badge files are pretty small anyway.
        // If we get one of those errors, we'll just return an unoptimized version for now.
        // https://github.com/svg/svgo/issues/1498
        return raw;
    }
}

export function basic(field1: string, field2: string, color: string): string {
    return badge([{ text: field1, color: basicColors.grey }, { text: field2, color }]);
}

// exported for unit testing
export function buildBadgeConfig(sections: Section[]): BadgeConfig {
    const badgeConfig: BadgeConfig = {
        width: 0,
        height: 0,
        sections: [],
    };

    sections.forEach((section, index) => {
        const sectionConfig = buildSection(section, badgeConfig.width);

        const defaultColor = index === 0 ? DEFAULT_COLOR_FIRST : DEFAULT_COLOR_REST;
        sectionConfig.color = sectionConfig.color ?? defaultColor;

        badgeConfig.sections.push(sectionConfig);
        badgeConfig.height = Math.max(badgeConfig.height, sectionConfig.height);
        badgeConfig.width += sectionConfig.width;
        return sectionConfig;
    });

    return badgeConfig;
}

function buildLines(section: Section, badgeWidth: number): SectionLine[] {
    const text = isSectionObject(section) ? section.text : section;
    return text.split('\n').map((line, l) => ({
        x: badgeWidth + PAD_X,
        y: (LINE_HEIGHT * l) + PAD_Y + LINE_HEIGHT - DECENDER_HEIGHT,
        text: line,
    }));
}

function buildSection(section: Section, badgeWidth: number): BadgeSection {
    const lines = buildLines(section, badgeWidth);
    return {
        lines,
        x: badgeWidth,
        height: (2 * PAD_Y) + (lines.length * LINE_HEIGHT),
        width: Math.max(...lines.map((line) => (2 * PAD_X) + textWidth(line.text))),
        color: isSectionObject(section) && section.color ? getColorCode(section.color) : null,
        stroke: isSectionObject(section) && section.strokeColor ? getColorCode(section.strokeColor) : null,
    };
}

function isSectionObject(section: Section): section is SectionConfig {
    return typeof section !== 'string' && Object.hasOwn(section, 'text');
}

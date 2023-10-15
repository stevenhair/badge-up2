import colors from 'css-color-names';
import dot from 'dot';
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

const DEFAULT_COLOR_FIRST = colors.dimgrey;
const DEFAULT_COLOR_REST = colors.lightgrey;
const PAD_X = 5;
const PAD_Y = 4;
const LINE_HEIGHT = 12;
const DECENDER_HEIGHT = 2;

const TEMPLATE = dot.template(`
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="{{=it.width}}" height="{{=it.height}}">
  <defs>
    <style><![CDATA[
      text {
        font-size: 11px;
        font-family: Verdana,DejaVu Sans,Geneva,sans-serif;
      }
      text.shadow {
        fill: #010101;
        fill-opacity: .3;
      }
      text.high {
        fill: #ffffff;
      }
    ]]></style>
    <linearGradient id="smooth" x2="0" y2="100%">
      <stop offset="0" stop-color="#aaa" stop-opacity=".1"/>
      <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <mask id="round">
      <rect width="100%" height="100%" rx="3" fill="#fff"/>
    </mask>
  </defs>
  <g id="bg" mask="url(#round)">
{{~ it.sections :sec }}
    <rect x="{{=sec.x}}" width="{{=sec.width}}" height="{{=it.height}}" fill="{{=sec.color}}"{{? sec.stroke}} stroke="{{=sec.stroke}}"{{?}}/>
{{~}}
    <rect width="{{=it.width}}" height="{{=it.height}}" fill="url(#smooth)"/>
  </g>
  <g id="fg">
{{~ it.sections :sec }}
{{~ sec.lines :line }}
    <text class="shadow" x="{{=line.x+.5}}" y="{{=line.y+1}}">{{! line.text}}</text>
    <text class="high" x="{{=line.x}}" y="{{=line.y}}">{{! line.text}}</text>
{{~}}
{{~}}
  </g>
</svg>
`);

export function badge(sections: Section[]): string {
    const raw = TEMPLATE(buildBadgeConfig(sections))
        // Working around a bug in svgo: https://github.com/svg/svgo/issues/1498
        // Workaround courtesy of brettz9: https://github.com/yahoo/badge-up/pull/21
        .replace(/&#(x3c|60);/gi, '&lt;')
        .replace(/&#(x26|38);/gi, '&amp;');

    return svgo.optimize(raw).data;
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

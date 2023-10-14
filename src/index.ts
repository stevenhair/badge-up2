import dot from 'dot';
import * as fs from 'fs';
import * as path from 'path';
import svgo from 'svgo';

import { escapeXml, textWidth } from './utils';

export const colors = {
    brightgreen: '#4C1',
    green: '#97CA00',
    yellow: '#DFB317',
    yellowgreen: '#A4A61D',
    orange: '#FE7D37',
    red: '#E05D44',
    blue: '#007EC6',
    grey: '#555',
    gray: '#555',
    lightgrey: '#9F9F9F',
    lightgray: '#9F9F9F',
    purple: '#400090',
};

const template = dot.template(fs.readFileSync(path.join(__dirname, 'templates', 'basic.svg'), 'utf-8'));

export default function badge(field1: string, field2: string, color: string): string {
    const data = {
        text: [
            escapeXml(field1),
            escapeXml(field2),
        ],
        widths: [
            // Add 10 extra pixels of padding
            textWidth(field1) + 10,
            textWidth(field2) + 10,
        ],
        colorA: '#555',
        colorB: escapeXml(color),
    };

    return svgo.optimize(template(data)).data;
}

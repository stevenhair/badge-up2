import colors from 'css-color-names';

const COLOR_REGEX = /^#?[0-9a-f]{6}$/i;

export const basicColors = {
    brightgreen: '#4C1',
    green: '#97CA00',
    yellow: '#DFB317',
    yellowgreen: '#A4A61D',
    orange: '#FE7D37',
    red: '#E05D44',
    blue: '#007EC6',
    grey: '#555555',
    gray: '#555555',
    lightgrey: '#9F9F9F',
    lightgray: '#9F9F9F',
    purple: '#400090',
};

export function getColorCode(input: string | keyof typeof colors): string | null {
    if (COLOR_REGEX.test(input)) {
        return `#${input.toLowerCase().replace('#', '')}`;
    }

    if (Object.hasOwn(colors, input)) {
        return colors[input as keyof typeof colors];
    }

    return null;
}

export { colors };

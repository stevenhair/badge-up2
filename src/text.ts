/* eslint-disable @typescript-eslint/naming-convention */
const LETTER_WIDTH: Record<string, number> = {
    0: 6,
    1: 6,
    2: 6,
    3: 6,
    4: 6,
    5: 6,
    6: 6,
    7: 6,
    8: 6,
    9: 6,
    '\x00': 0,
    '\x01': 25,
    '\x02': 25,
    '\x03': 25,
    '\x04': 25,
    '\x05': 25,
    '\x06': 25,
    '\x07': 25,
    '\b': 0,
    '\t': 23,
    '\n': 0,
    '\x0B': 25,
    '\f': 25,
    '\r': 0,
    '\x0E': 25,
    '\x0F': 25,
    '\x10': 25,
    '\x11': 25,
    '\x12': 25,
    '\x13': 25,
    '\x14': 25,
    '\x15': 25,
    '\x16': 25,
    '\x17': 25,
    '\x18': 25,
    '\x19': 25,
    '\x1A': 25,
    '\x1B': 25,
    '\x1C': 25,
    '\x1D': 0,
    '\x1E': 25,
    '\x1F': 25,
    ' ': 3,
    '!': 3,
    '"': 4,
    '#': 6,
    $: 6,
    '%': 9,
    '&': 7,
    "'": 2,
    '(': 4,
    ')': 4,
    '*': 4,
    '+': 6,
    ',': 3,
    '-': 4,
    '.': 3,
    '/': 3,
    ':': 3,
    ';': 3,
    '<': 6,
    '=': 6,
    '>': 6,
    '?': 6,
    '@': 11,
    A: 7,
    B: 7,
    C: 8,
    D: 8,
    E: 7,
    F: 7,
    G: 8,
    H: 8,
    I: 3,
    J: 5,
    K: 7,
    L: 6,
    M: 9,
    N: 8,
    O: 8,
    P: 7,
    Q: 8,
    R: 8,
    S: 7,
    T: 7,
    U: 8,
    V: 7,
    W: 10,
    X: 7,
    Y: 7,
    Z: 7,
    '[': 3,
    '\\': 3,
    ']': 3,
    '^': 5,
    _: 6,
    '`': 4,
    a: 6,
    b: 6,
    c: 5,
    d: 6,
    e: 6,
    f: 3,
    g: 6,
    h: 6,
    i: 3,
    j: 3,
    k: 5,
    l: 3,
    m: 9,
    n: 6,
    o: 6,
    p: 6,
    q: 6,
    r: 4,
    s: 5,
    t: 3,
    u: 6,
    v: 5,
    w: 8,
    x: 5,
    y: 5,
    z: 5,
    '{': 4,
    '|': 3,
    '}': 4,
    '~': 6,
    '\x7F': 25,
    '\x80': 25,
    '\x81': 25,
    '\x82': 25,
    '\x83': 25,
    '\x84': 25,
    '\x85': 25,
    '\x86': 25,
    '\x87': 25,
    '\x88': 25,
    '\x89': 25,
    '\x8A': 25,
    '\x8B': 25,
    '\x8C': 25,
    '\x8D': 25,
    '\x8E': 25,
    '\x8F': 25,
    '\x90': 25,
    '\x91': 25,
    '\x92': 25,
    '\x93': 25,
    '\x94': 25,
    '\x95': 25,
    '\x96': 25,
    '\x97': 25,
    '\x98': 25,
    '\x99': 25,
    '\x9A': 25,
    '\x9B': 25,
    '\x9C': 25,
    '\x9D': 25,
    '\x9E': 25,
    '\x9F': 25,
    ' ': 3,
    '¡': 4,
    '¢': 6,
    '£': 6,
    '¤': 6,
    '¥': 6,
    '¦': 3,
    '§': 6,
    '¨': 4,
    '©': 8,
    ª: 4,
    '«': 6,
    '¬': 6,
    '­': 0,
    '®': 8,
    '¯': 4,
    '°': 4,
    '±': 6,
    '²': 4,
    '³': 4,
    '´': 4,
    µ: 6,
    '¶': 6,
    '·': 3,
    '¸': 4,
    '¹': 4,
    º: 4,
    '»': 6,
    '¼': 9,
    '½': 9,
    '¾': 9,
    '¿': 7,
    À: 7,
    Á: 7,
    Â: 7,
    Ã: 7,
    Ä: 7,
    Å: 7,
    Æ: 10,
    Ç: 8,
    È: 7,
    É: 7,
    Ê: 7,
    Ë: 7,
    Ì: 3,
    Í: 3,
    Î: 3,
    Ï: 3,
    Ð: 8,
    Ñ: 8,
    Ò: 8,
    Ó: 8,
    Ô: 8,
    Õ: 8,
    Ö: 8,
    '×': 6,
    Ø: 8,
    Ù: 8,
    Ú: 8,
    Û: 8,
    Ü: 8,
    Ý: 7,
    Þ: 7,
    ß: 7,
    à: 6,
    á: 6,
    â: 6,
    ã: 6,
    ä: 6,
    å: 6,
    æ: 9,
    ç: 5,
    è: 6,
    é: 6,
    ê: 6,
    ë: 6,
    ì: 3,
    í: 3,
    î: 3,
    ï: 3,
    ð: 6,
    ñ: 6,
    ò: 6,
    ó: 6,
    ô: 6,
    õ: 6,
    ö: 6,
    '÷': 6,
    ø: 7,
    ù: 6,
    ú: 6,
    û: 6,
    ü: 6,
    ý: 5,
    þ: 6,
};
const DEFAULT_LETTER_WIDTH = 8; // probably unicode, hard to guess width

export function escapeXml(s: string): string {
    return s.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function textWidth(text: string): number {
    // Measure each letter and add padding between letters
    return text.split('').reduce((total, letter) => {
        return total + 1 + (LETTER_WIDTH[letter] ?? DEFAULT_LETTER_WIDTH);
    }, 0);
}

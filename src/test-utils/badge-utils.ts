import { readFile } from 'fs/promises';
import path from 'path';

export async function getMockBadge(name: string): Promise<string> {
    return (await readFile(path.join(__dirname, 'test-data', `${name}.svg`))).toString().trim();
}

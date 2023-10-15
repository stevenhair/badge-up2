import { basicColors, colors } from './color';
import v2 from './v2';

export { basicColors, colors, v2 };

export function basic(field1: string, field2: string, color: string): string {
    return v2([[field1, basicColors.grey], [field2, color]]);
}

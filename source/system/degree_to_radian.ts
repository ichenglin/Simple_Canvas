/**
 * Converts degree to radian
 * @param degree the angle in unit degrees
 * @returns the angle in unit radians
 */
export default function degree_to_radian(degree: number): number {
    const percentage = degree / 360;
    return Math.PI * 2 * percentage;
}
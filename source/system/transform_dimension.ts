import { SimpleDimensionOptions } from "../types/canvas_options";

/**
 * Transform length to canvas configurated length
 * @param length original length
 * @param type the type of length
 * @param options the (defaults-filled) dimension configuration
 * @returns transformed length
 */
export function transform_dimension(length: number, type: "width" | "height", options: SimpleDimensionOptions): number {
    if (type === "width") {
        const width_ratio = (options.pixels_width as number) / (options.units_width as number);
        return length * width_ratio;
    } else {
        const height_ratio = (options.pixels_height as number) / (options.units_height as number);
        return length * height_ratio;
    }
}
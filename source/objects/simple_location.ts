import { SimpleDimensionOptions } from "../types/canvas_options";

/**
 * Two-dimensional location object used in SimpleCanvas package
 */
export default class SimpleLocation {

    private coordinate_x: number;
    private coordinate_y: number;

    /**
     * Constructs a location object used in SimpleCanvas package
     * @param x the x coordinate of the location
     * @param y the y coordinate of the location
     */
    constructor(x: number, y: number) {
        this.coordinate_x = x;
        this.coordinate_y = y;
    }

    /**
     * Transform location to canvas configurated location
     * @param options the (defaults-filled) dimension configuration
     * @returns transformed location
     */
    public transform(options: SimpleDimensionOptions): SimpleLocation {
        const coordinate_x_new = (this.coordinate_x / (options.units_width as number)) * (options.pixels_width as number);
        const coordinate_y_new = (this.coordinate_y / (options.units_height as number)) * (options.pixels_height as number);
        return new SimpleLocation(coordinate_x_new, coordinate_y_new);
    }

    /**
     * Export the x coordinate of the location
     * @returns the x coordinate of the location
     */
    public get_x(): number {
        return this.coordinate_x;
    }

    /**
     * Export the y coordinate of the location
     * @returns the y coordinate of the location
     */
    public get_y(): number {
        return this.coordinate_y;
    }

}
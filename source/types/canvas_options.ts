// types
export enum SimpleOptions {
    RECTANGLE = "rectangle",
    DIMENSION = "dimension"
}

// option interfaces
/**
 * Configures the type of rectangles to draw on canvas
 * @param type   (optional) the type of rectangle
 * @param width  (optional) the width of rectangle (in configured units)
 * @param height (optional) the height of rectangle (in configured units)
 */
export interface SimpleRectangleOptions {
    type?:   "solid" | "stroke" | "clear",
    width?:  number,
    height?: number
}

/**
 * Configures the dimension settings of canvas element
 * @param pixels_width  (optional) actual width of canvas
 * @param pixels_height (optional) actual height of canvas
 * @param units_width   (optional) split width into units
 * @param units_height  (optional) split height into units
 */
export interface SimpleDimensionOptions {
    pixels_width?: number,
    pixels_height?: number,
    units_width?: number,
    units_height?: number
}
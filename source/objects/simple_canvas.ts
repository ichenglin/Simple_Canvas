import { SimpleDimensionOptions, SimpleOptions, SimpleRectangleOptions } from "../types/canvas_options";
import SimpleLocation from "./simple_location";
import configurable_options from "../system/configurable_options";
import { transform_dimension } from "../system/transform_dimension";

/**
 * The main object in SimpleCanvas package, controls canvas element.
 */
export default class SimpleCanvas {

    private canvas_element: HTMLCanvasElement;
    private canvas_context: CanvasRenderingContext2D;
    private canvas_dimension: SimpleDimensionOptions;

    /**
     * Constructs a SimpleCanvas object targetting the canvas element.
     * @param canvas_element canvas element
     */
    constructor(canvas_element: HTMLCanvasElement, options: SimpleDimensionOptions = {}) {
        this.canvas_element = canvas_element;
        this.canvas_context = canvas_element.getContext("2d") as CanvasRenderingContext2D;
        const dimension_configuration = configurable_options(SimpleOptions.DIMENSION, options);
        this.canvas_dimension = dimension_configuration;
        canvas_element.width = dimension_configuration.pixels_width as number;
        canvas_element.height = dimension_configuration.pixels_height as number;
    }

    /**
     * Draw a rectangle on the canvas
     * @param location location of the rectangle
     * @param options configurable options for rectangle
     */
    public draw_rectangle(location: SimpleLocation, options: SimpleRectangleOptions = {}): void {
        const shape_configuration = configurable_options(SimpleOptions.RECTANGLE, options);
        let rectangle_function: Function;
        switch (shape_configuration.type) {
            case "solid":
                rectangle_function = this.canvas_context.fillRect.bind(this.canvas_context);
                break;
            case "stroke":
                rectangle_function = this.canvas_context.strokeRect.bind(this.canvas_context);
                break;
            case "clear":
                rectangle_function = this.canvas_context.clearRect.bind(this.canvas_context);
                break;
            default:
                rectangle_function = this.canvas_context.fillRect.bind(this.canvas_context);
                break;
        }
        const location_on_canvas = location.transform(this.canvas_dimension);
        const width_on_canvas = transform_dimension(shape_configuration.width as number, "width", this.canvas_dimension);
        const height_on_canvas = transform_dimension(shape_configuration.height as number, "height", this.canvas_dimension);
        rectangle_function(location_on_canvas.get_x(), location_on_canvas.get_y(), width_on_canvas, height_on_canvas);
    }

    /**
     * Clears the whole canvas
     */
    public clear_canvas(): void {
        this.canvas_context.clearRect(0, 0, this.canvas_element.width, this.canvas_element.height);
    }

    /**
     * Exports the canvas context for non-supported features
     * @returns canvas context of targetted canvas
     */
    public export_context(): CanvasRenderingContext2D {
        return this.canvas_context;
    }

}
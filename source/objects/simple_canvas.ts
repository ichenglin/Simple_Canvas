import { SimpleDimensionOptions, SimpleOptions, SimplePolygonOptions, SimpleRectangleOptions } from "../types/canvas_options";
import SimpleLocation from "./simple_location";
import configurable_options from "../system/configurable_options";
import { transform_dimension } from "../system/transform_dimension";
import degree_to_radian from "../system/degree_to_radian";

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
     * Draws a line on the canvas
     * @param origin the origin of the line
     * @param destination the destination of the line
     */
    public draw_line(origin: SimpleLocation, destination: SimpleLocation): void {
        const origin_on_canvas = origin.transform(this.canvas_dimension);
        const destination_on_canvas = destination.transform(this.canvas_dimension);
        this.canvas_context.beginPath();
        this.canvas_context.moveTo(origin_on_canvas.get_x(), origin_on_canvas.get_y());
        this.canvas_context.lineTo(destination_on_canvas.get_x(), destination_on_canvas.get_y());
        this.canvas_context.stroke();
    }

    /**
     * Draws a rectangle on the canvas
     * @param location location of the rectangle
     * @param options configurable options for rectangle
     */
    public draw_rectangle(location: SimpleLocation, options: SimpleRectangleOptions = {}): void {
        const shape_configuration = configurable_options(SimpleOptions.RECTANGLE, options);
        let rectangle_function: Function;
        switch (shape_configuration.type as "solid" | "stroke" | "clear") {
            case "solid":
                rectangle_function = this.canvas_context.fillRect.bind(this.canvas_context);
                break;
            case "stroke":
                rectangle_function = this.canvas_context.strokeRect.bind(this.canvas_context);
                break;
            case "clear":
                rectangle_function = this.canvas_context.clearRect.bind(this.canvas_context);
                break;
        }
        const location_on_canvas = location.transform(this.canvas_dimension);
        const width_on_canvas = transform_dimension(shape_configuration.width as number, "width", this.canvas_dimension);
        const height_on_canvas = transform_dimension(shape_configuration.height as number, "height", this.canvas_dimension);
        rectangle_function(location_on_canvas.get_x(), location_on_canvas.get_y(), width_on_canvas, height_on_canvas);
    }

    /**
     * Draws a polygon on the canvas
     * @param location the location of the polygon (center of shape)
     * @param options configurable options for polygon
     */
    public draw_polygon(location: SimpleLocation, options: SimplePolygonOptions = {}): void {
        const shape_configuration = configurable_options(SimpleOptions.POLYGON, options);
        const location_on_canvas = location.transform(this.canvas_dimension);
        const radius_x_on_canvas = transform_dimension(shape_configuration.radius as number, "width", this.canvas_dimension);
        const radius_y_on_canvas = transform_dimension(shape_configuration.radius as number, "height", this.canvas_dimension);
        const anchor_locations: SimpleLocation[] = [];
        for (let anchor_index = 0; anchor_index < ((shape_configuration.sides as number) + 1); anchor_index++) {
            const anchor_degree = (shape_configuration.rotate as number) + (360 / (shape_configuration.sides as number)) * anchor_index;
            const anchor_degree_radian = degree_to_radian(anchor_degree);
            const anchor_x = location_on_canvas.get_x() + Math.cos(anchor_degree_radian) * radius_x_on_canvas;
            const anchor_y = location_on_canvas.get_y() + Math.sin(anchor_degree_radian) * radius_y_on_canvas;
            anchor_locations.push(new SimpleLocation(anchor_x, anchor_y));
        }
        this.canvas_context.beginPath();
        const path_origin = anchor_locations[0];
        this.canvas_context.moveTo(path_origin.get_x(), path_origin.get_y());
        for (let side_index = 0; side_index < (shape_configuration.sides as number); side_index++) {
            const side_destination = anchor_locations[side_index + 1];
            this.canvas_context.lineTo(side_destination.get_x(), side_destination.get_y());
        }
        let polygon_function: Function;
        switch (shape_configuration.type as "solid" | "stroke") {
            case "solid":
                polygon_function = this.canvas_context.fill.bind(this.canvas_context);
                break;
            case "stroke":
                polygon_function = this.canvas_context.stroke.bind(this.canvas_context);
                break;
        }
        polygon_function();
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
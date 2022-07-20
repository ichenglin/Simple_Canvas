export default class SimpleCanvas {

    private canvas_element: HTMLCanvasElement;

    /**
     * Constructs a SimpleCanvas object targetting a Canvas element.
     * @param canvas_element canvas element
     */
    constructor(canvas_element: HTMLCanvasElement) {
        this.canvas_element = canvas_element;
        console.log(this.canvas_element);
    }

}
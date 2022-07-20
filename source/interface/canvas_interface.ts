import SimpleCanvas from "../objects/simple_canvas.js";
import SimpleLocation from "../objects/simple_location.js";

const canvas_element = document.getElementById("simple_canvas");
const simple_canvas = new SimpleCanvas(canvas_element as HTMLCanvasElement);

for (let index = 0; index < 10; index++) {
    simple_canvas.draw_rectangle(new SimpleLocation(index * 10, index * 10));
}
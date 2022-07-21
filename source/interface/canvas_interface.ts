import SimpleCanvas from "../objects/simple_canvas";
import SimpleLocation from "../objects/simple_location";

const canvas_element = document.getElementById("simple_canvas");
const simple_canvas = new SimpleCanvas(canvas_element as HTMLCanvasElement, {pixels_width: 800, pixels_height: 800});

for (let index = 0; index < 10; index++) {
    simple_canvas.clear_canvas();
    simple_canvas.draw_rectangle(new SimpleLocation(index * 10, index * 10), {type: "stroke"});
}
import SimpleCanvas from "../objects/simple_canvas";
import SimpleLocation from "../objects/simple_location";

const canvas_element = document.getElementById("simple_canvas");
const simple_canvas = new SimpleCanvas(canvas_element as HTMLCanvasElement, {pixels_width: 800, pixels_height: 800});

for (let index = 0; index < 10; index++) {
    simple_canvas.export_context().fillStyle = "red";
    simple_canvas.export_context().strokeStyle = "black";
    simple_canvas.draw_rectangle(new SimpleLocation(index * 10, index * 10), {type: "solid"});
    simple_canvas.export_context().fillStyle = "black";
    simple_canvas.draw_polygon(new SimpleLocation(index * 10 + 5, index * 10 + 5), {radius: 5, sides: 20, rotate: 0, type: (index % 2 === 0 ? "solid" : "stroke")});
    simple_canvas.export_context().strokeStyle = "white";
    simple_canvas.draw_line(new SimpleLocation(index * 10, index * 10), new SimpleLocation(index * 10 + 10, index * 10 + 10));
}
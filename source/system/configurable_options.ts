import { SimpleOptions } from "../types/canvas_options";
import { canvas_option_defaults } from "../data/canvas_option_defaults.js";

/**
 * Returns configurable options with default values filled in
 * @param type the type of configurable option
 * @param options raw user input, possibly undefined
 * @returns configurable options with default values filled in
 */
export default function configurable_options<T>(type: SimpleOptions, options?: T): T {
    const option_defaults = canvas_option_defaults[type as keyof typeof canvas_option_defaults];
    if (options === undefined) {
        return option_defaults as unknown as T;
    }
    const option_keys = Object.keys(option_defaults);
    const option_final: {[key: string]: any} = {};
    for (let key_index = 0; key_index < option_keys.length; key_index++) {
        const loop_option_key = option_keys[key_index];
        option_final[loop_option_key] = options[loop_option_key as keyof typeof options] !== undefined
        ? options         [loop_option_key as keyof typeof options]
        : option_defaults [loop_option_key as keyof typeof option_defaults];
    }
    return option_final as T;
}
import pluginObjs from "@plugins/plugin";
import { Plugin } from "./types";

let plugins: Array<Plugin> = [];
for(let key in pluginObjs) {
    let plugin = pluginObjs[key]
    plugin.key = key;
    plugins.push(plugin as Plugin);
}
export default plugins;


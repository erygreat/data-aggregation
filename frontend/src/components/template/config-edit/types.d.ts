import { Plugin, PluginConfigUpdateFunction } from "@/types";

export interface EditConfigModelProps {
    plugin: PluginInstance;
    visiable: boolean;
    close(): void;
    onSave: PluginConfigUpdateFunction;
}
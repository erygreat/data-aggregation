import { Plugin, PluginInstance, PluginInstanceConfig, PluginUpdate, PluginUpdateFunction } from "@/types";

export interface EditProps {
    plugins: Array<PluginInstance>;
    onSave: (index: number, plugin: PluginInstance, callback?: UpdateCallback) => void
    removePlugin: (index: number) => void;
}
export interface ItemNameProps {
    name: string;
    onChange?: (name: string) => void
}

export interface PluginInstanceProps extends PluginUpdate {
    removePlugin: () => void;
    isFullScreen: boolean;
    onFullScreen: (isFullScreen: boolean) => void;
}

export interface ItemHeadProps extends PluginInstanceProps {
    onMouseDown: (e: React.MouseEvent) => void;
}
export interface OptionDeleteProps {
    removePlugin: () => void;
}

export interface OptionInfoProps {
    plugin: PluginInstance;
}

export interface OptionConfigEditProps extends PluginUpdate {}
export interface OptionFullScreenProps {
    onFullScreen: (isFullScreen: boolean) => void;
}

export interface OptionDragProps {
    onMouseDown: (e: React.MouseEvent) => void;
}
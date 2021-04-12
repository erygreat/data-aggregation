export interface BaseResponse<T> {
    success: boolean,
    code: number,
    data: T,
    message?: string
}

export type PluginConfig = {}
export interface IPlugin {
    readonly name: string,
    readonly description?: string,
    readonly view: {
        readonly edit: (plugin: Plugin) => JSX.Element,
        readonly info?: (plugin: Plugin) => JSX.Element
        readonly configEdit?: (config: PluginInstanceConfig, onSave: PluginConfigUpdateFunction) => JSX.Element
        readonly editFullScreen?: (plugin: Plugin) => JSX.Element,
    },
    config: PluginConfig
}
export interface Plugin extends IPlugin {
    readonly key: string,
};

export type Plugins = Array<Plugin>

export interface PluginInstanceConfig extends PluginConfig {
    uniqueKey: string;
    name: string;
}
export interface PluginInstance extends Plugin {
    config: PluginInstanceConfig
}
export interface PluginConfigUpdateFunction {
    (config: PluginInstanceConfig, callback?: UpdateCallback): void
}

export interface UpdateCallback {
    (isSuccess: boolean, message?: string): void
}
export interface PluginConfigUpdate {
    config: PluginInstanceConfig;
    onSave: PluginConfigSaveFunction;
}

export interface PluginUpdateFunction {
    (plugin: PluginInstance, callback?: UpdateCallback): void
}

export interface PluginUpdate {
    plugin: PluginInstance;
    onSave: PluginUpdateFunction;
}
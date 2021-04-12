import { Plugins, PluginWrapper, Plugin } from "@/types"

export interface PluginProps {
    plugin: Plugin
    addPlugin(plugin: Plugin): void
}
export interface PluginsProps {
    plugins: Plugins
    addPlugin(plugin: Plugin): void
}
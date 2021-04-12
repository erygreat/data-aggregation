import React from "react";
import style from "./index.module.scss"
import Plugins from "./plugins";
import { Plugin, PluginInstance, Plugins as IPlugins, UpdateCallback } from "@/types";
import Edits from "./edits";
import { nanoid } from 'nanoid'
import useArrayState from "@/hooks/useArrayState";
import ContentHead from "./content-head";
import lodash from "lodash"

export const TemplateManagement = (props: { plugins: IPlugins }) => {

    const [editPlugins, editPluginsOption] = useArrayState<PluginInstance>([]);

    const handlerAddPlugin = (plugin: Plugin) => {
        const key = plugin.key;
        const editPlugin = lodash.cloneDeep(plugin) as PluginInstance;
        const hasKey = editPlugins.find(item => item.config.uniqueKey === key);
        editPlugin.config.uniqueKey = hasKey ? key + "-" + nanoid(6) : key;
        editPlugin.config.name = editPlugin.name;
        editPluginsOption.push(editPlugin);
    }

    const handlerSave = (index: number, plugin: PluginInstance, cb?: UpdateCallback) => {
        if(editPlugins.some((item, _index) => _index !== index && item.config.uniqueKey === plugin.config.uniqueKey)) {
            cb && cb(false, "字段名称不能同名 !");
        } else {
            editPluginsOption.update(index, plugin);
            cb && cb(true);
        }
    }

    const removePlugin = (index: number) => {
        editPluginsOption.remove(index);
    }

    return <div className={style['template-main-conainer']}>
        <Plugins plugins={ props.plugins } addPlugin={ handlerAddPlugin } />
        <div className={ style.content }>
            <ContentHead></ContentHead>
            <Edits plugins={ editPlugins } onSave={ handlerSave } removePlugin={ index => removePlugin(index) }></Edits>
        </div>
    </div>
}
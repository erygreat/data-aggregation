import React from "react";
import { PluginInstanceConfig, PluginConfigUpdateFunction } from "@frontend/types";

const Info = (config: PluginInstanceConfig, onSave: PluginConfigUpdateFunction): JSX.Element => {
    const update = () => {
        config.name = "张三";
        onSave(config, (isSuccess) => {
            alert(isSuccess ? "成功" : "失败");
        })
    }
    return <div>
        <button onClick={() => update()}>修改名字</button>
        {config.name}
    </div>
}
export default Info;
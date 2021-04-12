import React, { useState } from "react";
import { Button, Input, messagePopup, Modal } from "@/components/ui";
import { PluginConfigUpdateFunction, PluginInstanceConfig, PluginConfigUpdate } from "@/types";
import { EditConfigModelProps } from "./types";
import lodash from "lodash";
import style from "./index.module.scss";

const DefaultView = (props: PluginConfigUpdate) => {

    const [config, setConfig] = useState<PluginInstanceConfig>(props.config);

    const save = (isSuccess: boolean, message?: string) => {
        if(isSuccess) {
            messagePopup.success('修改成功!');
        } else {
            messagePopup.error('修改失败' + (message ? ", 失败原因: " + message : "!"));
        }
    }

    const handlerChangeName = (name: string) => {
        config.name = name
        setConfig(lodash.cloneDeep(config));
    }

    const handlerChangeUniqueKey = (uniqueKey: string) => {
        config.uniqueKey = uniqueKey
        setConfig(lodash.cloneDeep(config));
    }

    return <div>
        <div className={ style.item }>
            <div className={ style.label }>字段名称: </div>
            <div className={ style.value }>
                <Input size="small" value={ config.uniqueKey } placeholder={ props.config.uniqueKey } onChange={ e => handlerChangeUniqueKey(e.target.value) }/>
            </div>
        </div>
        <div className={ style.item }>
            <div className={ style.label }>显示名称: </div>
            <div className={ style.value }>
                <Input size="small" value={ config.name } placeholder={ props.config.name } onChange={ e => handlerChangeName(e.target.value) }/>
            </div>
        </div>
        <div className={ style.btn }>
            <Button onClick={ () => props.onSave(config, save) } type="primary">保存</Button>
        </div>
    </div>
}

const defaultView = (config: PluginInstanceConfig, onSave: PluginConfigUpdateFunction): JSX.Element => {
    return <DefaultView config={ config } onSave={ onSave }></DefaultView>
}

const EditConfigModel = (props: EditConfigModelProps) => {

    return <Modal visible={ props.visiable } closable={ false } footer={<Button type="primary"  onClick={() => { props.close() }}>关闭</Button>}>
        { props.plugin.view.configEdit ? props.plugin.view.configEdit(props.plugin.config, props.onSave) : defaultView(props.plugin.config, props.onSave) }
    </Modal>
}

export default EditConfigModel
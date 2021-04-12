import React, { useState } from "react";
import { LeftCircleOutlined, RightCircleOutlined, InfoCircleOutlined, DoubleRightOutlined } from '@ant-design/icons';
import style from "./index.module.scss"
import { PluginProps, PluginsProps } from "./types";
import { Tooltip } from "antd";
import InfoModal from "../info";

const PluginItem = (props: PluginProps) => {
    const [infoVisiable, setInfoVisiable] = useState<boolean>(false);
    return <div className={style['plugin-item']}>
        <span className={style['plugin-name']} >{ props.plugin.name }</span>
        <div className={style['plugin-btn-group']}>
            <Tooltip placement="top" title="插件详情">
                <InfoCircleOutlined onClick={ () => setInfoVisiable(true) }/>
            </Tooltip>
            <Tooltip placement="top" title="使用插件">
                <DoubleRightOutlined className={style['plugin-btn']} onClick={ () => props.addPlugin(props.plugin) }/>
            </Tooltip>
        </div>
        <InfoModal plugin={props.plugin} visiable={infoVisiable} close={() => setInfoVisiable(false) }></InfoModal>
    </div>
}

const PluginWrapper = (props: PluginsProps) => {
    return <div className={style['plugins-container']}>
        <div className={style['plugin-title']}>数据插件</div>
        <div>
            { props.plugins.map(plugin => <PluginItem plugin={plugin} key={ plugin.key } addPlugin={ props.addPlugin }></PluginItem>)}
        </div>
    </div>
}

export const Plugins = (props: PluginsProps) => {
    const [visiable, setVisiable] = useState<boolean>(true);
    return <div className={style['plugins-outer-container']}>
        <div className={`${style['plugins-main-container']} ${visiable ? '' : style['hide']}`}>
            <PluginWrapper {...props}></PluginWrapper>
        </div>
        <div className={style.collapse} onClick={() => setVisiable(!visiable)}>
            { visiable ? <LeftCircleOutlined /> : <RightCircleOutlined /> }
        </div>
    </div>
}
export default Plugins;
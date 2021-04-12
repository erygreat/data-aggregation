import React from "react";
import { Button, Modal } from "@/components/ui";
import { Plugin } from "@/types";
import { InfoModalProps } from "./types";


const DefaultView = (props: Plugin) => {
    // TODO 待开发
    return <div>
        <div>名称: {props.name}</div>
        <div>描述: {props.description}</div>
        <div>名称: {props.name}</div>
    </div>
}

const InfoModal = (props: InfoModalProps) => {
    return <Modal title={ "开发中，敬请期待！" } visible={ props.visiable } closable={ false } footer={ <Button type="primary"  onClick={() => { props.close() }}>关闭</Button>}>
        { props.plugin.view.info ? props.plugin.view.info(props.plugin) : <DefaultView {...props.plugin}></DefaultView> }
    </Modal>
}

export default InfoModal
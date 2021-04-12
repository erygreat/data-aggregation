import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { EditProps, ItemHeadProps, ItemNameProps, OptionConfigEditProps, OptionDeleteProps, OptionDragProps, OptionFullScreenProps, OptionInfoProps, PluginInstanceProps } from "./types";
import style from "./index.module.scss";
import { DeleteOutlined, DragOutlined, EditOutlined, ExclamationCircleOutlined, FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import InfoModal from "../info";
import { Popconfirm } from "antd";
import EditConfigModel from "../config-edit";
import { PluginInstanceConfig, UpdateCallback } from "@/types";
import DragSort, { withDragSortMouseDown } from "@/components/ui/drag-sort";
import { DragSortMouseDownProps } from "@/components/ui/drag-sort/types";

const ItemName = (props: ItemNameProps) => {
    const [isShowInput, setIsShowInput] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const openInput = () => {
        setIsShowInput(true);
    }

    useEffect(() => {
        if(isShowInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isShowInput]);

    const hiddenInput = () => {
        setIsShowInput(false);
    }

    const handlerBlur = () => {
        hiddenInput();
    }

    const handlerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter' || e.keyCode === 13) {
            hiddenInput();
        }
    }

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(props.onChange) {
            props.onChange(e.target.value);
        }

    }

    return <div className={style['item-name']}>
        {!isShowInput || !props.onChange
            ? <div onClick={ openInput }>{ props.name }</div> 
            : <input className={ style['name-input'] } ref={ inputRef } placeholder={ props.name } value={ props.name } onChange={ handlerChange } onBlur={ handlerBlur } onKeyDown={ handlerKeyDown }/> }
    </div>
}

const OptionDelete = (props: OptionDeleteProps) => {
    return <Popconfirm placement="top" title="确认删除?" onConfirm={ props.removePlugin } okText="是" cancelText="否">
        <DeleteOutlined className={ style['icon'] } />
    </Popconfirm>
}

const OptionInfo = (props: OptionInfoProps) => {
    const [infoVisiable, setInfoVisiable] = useState<boolean>(false);
    return <>
        <ExclamationCircleOutlined className={ style['icon'] } onClick={ () => setInfoVisiable(true) } />
        <InfoModal plugin={ props.plugin } visiable={infoVisiable} close={() => setInfoVisiable(false) } />
    </>
}

const OptionConfigEdit = (props: OptionConfigEditProps) => {

    const handlerSave = (config: PluginInstanceConfig, cb?: UpdateCallback) => {
        const plugin = props.plugin;
        plugin.config = config;
        props.onSave(plugin, cb);
    }

    const [visiable, setVisiable] = useState<boolean>(false);
    return <>
        <EditOutlined className={ style['icon'] } onClick={ () => setVisiable(true) } />
        <EditConfigModel plugin={ props.plugin } visiable={ visiable } close={() => setVisiable(false) } onSave={ handlerSave }/>
    </>
}

const OptionFullScreen = (props: OptionFullScreenProps) => {
    return <FullscreenOutlined  className={ style['icon'] } onClick={ () => props.onFullScreen(true) }/>
}

const OptionCloseFullScreen = (props: OptionFullScreenProps) => {
    return <FullscreenExitOutlined className={ style['icon'] } onClick={ () => props.onFullScreen(false) }/>
}

const OptionDrag = (props: OptionDragProps) => {
    return <DragOutlined className={ `${style['icon']} ${style['drag']}` } onMouseDown={ props.onMouseDown } />
}

const ItemHead = (props: ItemHeadProps) => {

    const updateName = (name: string) => {
        const plugin = props.plugin;
        plugin.config.name = name;
        props.onSave(plugin);
    }

    return <div className={style['head']}>
        <ItemName name={ props.plugin.config.name } onChange={ name => updateName(name) }/>
        { !props.isFullScreen 
            ? <div>
                <OptionFullScreen onFullScreen={ props.onFullScreen }/>
                <OptionInfo plugin={ props.plugin }/>
                <OptionDelete removePlugin={ props.removePlugin }/>
                <OptionConfigEdit plugin={ props.plugin } onSave={ props.onSave }/>
                <OptionDrag onMouseDown={ props.onMouseDown }/>
            </div>
            : <div>
                <OptionCloseFullScreen onFullScreen={ props.onFullScreen }/>
                <OptionInfo plugin={ props.plugin }/>
            </div>
        }

    </div>
}

const EditItem = withDragSortMouseDown((props: PluginInstanceProps & DragSortMouseDownProps) => {
    return <div className={`${style['edit-item']} ${ props.isFullScreen ? style['full-screen'] : ''}`}>
        <ItemHead {...props} isFullScreen={ props.isFullScreen }></ItemHead>
        { props.isFullScreen && props.plugin.view.editFullScreen ? props.plugin.view.editFullScreen(props.plugin) : props.plugin.view.edit(props.plugin) }
    </div>
});

const Edits = (props: EditProps) => {

    const [fullScreenIndex, setFullScreenIndex] = useState<number  | null>(null);

    const openFullScreen = (isOpen:boolean, index: number) => {
        setFullScreenIndex(isOpen ? index : null);
    }

    return <div className={style.container}>
        <DragSort className={style.wrapper}>
            { props.plugins.map((plugin, index) => {
                return (fullScreenIndex === null || fullScreenIndex === index) 
                && <EditItem
                    isFullScreen={ fullScreenIndex !== null }
                    onFullScreen={(isOpen) => openFullScreen(isOpen, index) }
                    key={ plugin.config.uniqueKey }
                    onSave={ (plugin, cb) => props.onSave(index, plugin, cb) }
                    plugin={ plugin }
                    removePlugin={() => props.removePlugin(index) } />
                })
            }
        </DragSort>
    </div>
}
export default Edits;
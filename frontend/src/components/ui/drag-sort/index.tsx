import React, {FC, useEffect, useRef } from 'react';
import { DragSortMouseDownProps, DragSortProps, TypeMouseDown } from './types';
import style from "./index.module.scss";
import { nanoid } from 'nanoid';

type domStyles = Array<{ el: HTMLElement, style: { [key: string]: string | number }}>

class DragSortError extends Error {
    constructor(message: string) {
        super(message);
    }
}

const updateStyle = (styles: domStyles) => {
    for(const item of styles) {
        setStyle(item.el, item.style);
    }
}

const setStyle = (el: HTMLElement, style: { [key: string]: string | number }) => {
    for(const key in style) {
        el.style.setProperty(key, String(style[key]));
    }
}

const isComponentCanDrag = (component: React.ReactElement | string | number | {}) => {
    return React.isValidElement(component) && typeof component.type !== "string" && (component.type as TypeMouseDown).hasDragSortMouseDown;
}

interface MousePosition {
    left: number;
    top: number;
    startX: number;
    startY: number;
    deltaX: number,
    deltaY: number;
    moveX: number;
    moveY: number;
}

const getLeft = (dom: HTMLElement): number => {
    return dom.offsetLeft - parseFloat(getComputedStyle(dom).getPropertyValue("margin-left"))
}

const getTop = (dom: HTMLElement): number => {
    return dom.offsetTop - parseFloat(getComputedStyle(dom).getPropertyValue("margin-top"))
}

const DragSort: FC<DragSortProps> = (props: DragSortProps) => {

    const ref = useRef<HTMLDivElement | null>(null);
    const needReRenderRef = useRef<boolean>(false);
    const dragDomRef = useRef<HTMLElement | null>();
    const mouseRef = useRef<MousePosition>();

    const handlerMouseDown = (ev: MouseEvent, index: number) => {
        if(!ref.current || props.disabled) {
            return
        }
        addMouseStyles();
        const dom = Array.from(ref.current.children)[index] as HTMLElement
        needReRenderRef.current = true;
        dragDomRef.current = dom;
        console.log(dom.scrollTop);
        mouseRef.current = {
            left: getLeft(dom),
            top: getTop(dom),
            startX: ev.clientX,
            startY: ev.clientY,
            deltaX: 0,
            deltaY: 0,
            moveX: 0,
            moveY: 0,
        }
    }

    const addMouseStyles = () => {
        if(!ref.current) return;
        const styles: domStyles = [];
        ref.current.style.setProperty("height", ref.current.scrollHeight + "px");
        ref.current.style.setProperty("width", ref.current.scrollWidth + "px");
        Array.from(ref.current.children).forEach(item => {
            const _item = item as HTMLElement
            styles.push({
                el: _item,
                style: {
                    "position": "absolute",
                    "left": getLeft(_item) + "px",
                    "top": getTop(_item) + "px",
                    "z-index": 0,
                }
            })
        });
        updateStyle(styles);
    }

    const addMouseDownEvents = () => {
        if(ref.current) {
            const removeEvents = Array.from(ref.current.children).map((dom, index) => {
                const component = React.Children.toArray(props.children)[index];
                if(component && !isComponentCanDrag(component)) {
                    const mouseDownEvent = (ev: Event): void => {
                        handlerMouseDown(ev as MouseEvent, index);
                    }
                    dom.addEventListener("mousedown", mouseDownEvent);
                    return () => dom.removeEventListener("mousedown", mouseDownEvent);
                }
            })
            return () => removeEvents.forEach(event => event && event());
        }
    }

    useEffect(() => {
        window.addEventListener("mousemove", (e: MouseEvent) => {
            if(dragDomRef.current && mouseRef.current && ref.current) {
                // window.getSelection()?.removeAllRanges();
                // let left = e.clientX - mouseRef.current.startX + mouseRef.current.left + mouseRef.current.deltaX;
                // left = left < 0 ? 0 : left
                // let top = e.clientY - mouseRef.current.startY + mouseRef.current.top + mouseRef.current.deltaY;
                // top = top < 0 ? 0 : top
                // const dom = dragDomRef.current;
                // setStyle(dom, {
                //     left: left + "px",
                //     top: top + "px",
                //     "z-index": 1
                // });
                // console.log("移动中");
            }
        })
        window.addEventListener("wheel", (e: WheelEvent) => {
            if(dragDomRef.current && mouseRef.current && ref.current) {
                e.stopPropagation();
                let deltaY = mouseRef.current.deltaY + e.deltaY
                let deltaX = mouseRef.current.deltaX + e.deltaX
                mouseRef.current.deltaX = deltaX < 0 ? 0 : deltaX;
                mouseRef.current.deltaY = deltaY < 0 ? 0 : deltaY;
                const left = mouseRef.current.deltaX + mouseRef.current.left + mouseRef.current.moveX;
                const top = mouseRef.current.deltaY + mouseRef.current.top + mouseRef.current.moveY;
                const dom = dragDomRef.current;
                setStyle(dom, {
                    left: left + "px",
                    top: top + "px",
                    "z-index": 1
                });
                console.log(ref.current.scrollTop, ref.current.scrollHeight);
                console.log(e.deltaY);
                console.log("滚动中");
            }
        })
        window.addEventListener("mouseup", () => {
            if(dragDomRef.current) {
                console.log("mouseup 移动完成");
                dragDomRef.current = null;
            }
        })
        window.addEventListener("dragend", () => {
            if(dragDomRef.current) {
                console.log("dragend 移动完成");
                dragDomRef.current = null;
            }
        })
        
    }, []);

    const getChildren = (children: React.ReactNode, needReRender: boolean) => {
        const id = nanoid();
        return React.Children.toArray(children).map((item, index) => {
            if(!React.isValidElement(item)) {
                throw new DragSortError("DragSort组件内元素必须都是 React 元素，不能为纯文本!");
            } else {
                const props: any = {
                    ...item.props,
                    key: needReRender ? (item.key + id) : item.key
                };
                if(isComponentCanDrag(item)) {
                    props.onMouseDown = (ev: MouseEvent) => handlerMouseDown(ev, index);
                }
                return React.createElement(item.type, props)
            }
        })
    }

    useEffect(() => {
        needReRenderRef.current = false;
        return addMouseDownEvents();
    }, [props.children]);

    const renderChildren = getChildren(props.children, needReRenderRef.current);
    return <div ref={ ref } className={`${style['wrapper']} ${props.className}`}>
        { renderChildren }
    </div>
}

DragSort.defaultProps = {
    disabled: false,
    className: "",
}


export const withDragSortMouseDown = <T extends {}>(Component: React.ComponentType<T & DragSortMouseDownProps> & TypeMouseDown): React.ComponentType<T> => {
    const render = (props: any) => {
        const { forwardRef } = props;
        return <Component {...props} ref={forwardRef} onMouseDown={ props.onMouseDown }/>
    }
    render.hasDragSortMouseDown = true;
    return render;
}

export default DragSort;

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
    minLeft: number;
    maxLeft: number;
    minTop: number;
    maxTop: number;
    startX: number;
    startY: number;
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
        mouseRef.current = {
            left: getLeft(dom),
            top: getTop(dom),
            minLeft: 0,
            maxLeft: ref.current.scrollWidth - dom.scrollWidth - parseFloat(getComputedStyle(dragDomRef.current).getPropertyValue("border-right")) - parseFloat(getComputedStyle(ref.current).getPropertyValue("margin-right")),
            minTop: 0,
            maxTop: ref.current.scrollHeight - dom.scrollHeight - parseFloat(getComputedStyle(dragDomRef.current).getPropertyValue("border-bottom")) - parseFloat(getComputedStyle(ref.current).getPropertyValue("margin-bottom")),
            startX: ev.clientX,
            startY: ev.clientY,
            moveX: 0,
            moveY: 0,
        }
    }

    const disableWheel = (e: MouseEvent) => {
        if(dragDomRef.current && mouseRef.current && ref.current) {
            e.preventDefault();
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
                window.getSelection()?.removeAllRanges();
                let left = e.clientX - mouseRef.current.startX + mouseRef.current.left;
                left = left < mouseRef.current.minLeft ? mouseRef.current.minLeft : left;
                left = left > mouseRef.current.maxLeft ? mouseRef.current.maxLeft : left;
                let top = e.clientY - mouseRef.current.startY + mouseRef.current.top;
                top = top < mouseRef.current.minTop ? mouseRef.current.minTop : top;
                top = top > mouseRef.current.maxTop ? mouseRef.current.maxTop : top;
                const dom = dragDomRef.current;
                setStyle(dom, {
                    left: left + "px",
                    top: top + "px",
                    "z-index": 1
                });
                console.log("移动中");
            }
        })
        window.addEventListener("wheel", disableWheel, { passive:false });
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
        return () => {
            window.removeEventListener("wheel", disableWheel);
        }
        
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

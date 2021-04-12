import { nanoid } from "nanoid"
import React, { useRef } from "react"
import DragSort from ".."

// interface ComponentProps extends DragSortElement {
//     text: string;
// }

// // HTML元素
// const Elements = () => {
//     const texts = ["hello", "world", "this", "is", "a", "demo"];
//     return <DragSort>
//         {texts.map(item => <div key={nanoid()}>{item}</div>)}
//     </DragSort>
// }

// // 类组件
// class ClassComponent extends React.Component<ComponentProps, {}> {
//     render() {
//         return <div onMouseDown={ e => this.props.onMouseDown  && this.props.onMouseDown(e) }>
//             {this.props.text}
//         </div>
//     }
// }
// const ClassComponentElements = () => {
//     const texts = ["hello", "world", "this", "is", "a", "demo"];
//     return <DragSort>
//         {texts.map(item => <ClassComponent key={nanoid()} text={item} />)}
//     </DragSort>
// }

// // 函数式组件
// const FunctionComponent = (props: ComponentProps) => {
//     return <div onMouseDown={ e => props.onMouseDown && props.onMouseDown(e) }>
//         {props.text}
//     </div>
// }
// const FunctionComponentElements = () => {
//     const texts = ["hello", "world", "this", "is", "a", "demo"];
//     return <DragSort>
//         {texts.map(item => <FunctionComponent key={nanoid()} text={item} />)}
//     </DragSort>
// }

// // 奇怪的操作(拖动元素非排序元素)
// const DragComponent = (props: ComponentProps) => {
//     const ref = useRef<HTMLDivElement | null>(null);
//     const handlerMouseDown = () => {
//         if(ref.current && props.onDragMouseDown) {
//             props.onDragMouseDown(ref.current);
//         }
//     }
//     return <div ref={ ref } style={{ width: "200px", height: "200px", display: "inline-block", border: "1px solid red" }}>
//         {props.text}
//         <button onMouseDown={ handlerMouseDown }>拖拽</button>
//     </div>
// }
// const DragComponentElements = () => {
//     const texts = ["hello", "world", "this", "is", "a", "demo"];
//     return <DragSort>
//         {texts.map(item => <DragComponent key={nanoid()} text={item} />)}
//     </DragSort>
// }

const Demo = () => {
    return <div>
        {/* <Elements />
        <ClassComponentElements />
        <FunctionComponentElements />
        <DragComponentElements /> */}
    </div>
}
export default Demo;
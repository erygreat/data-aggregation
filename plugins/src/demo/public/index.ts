import EditView from "./views/edit"

export default {
    name: "Demo Plugin",
    description: "这是一个Demo插件，没有任何功能 !",
    view: {
        edit: EditView,
        fullScreenEdit: EditView
    },
    config: {
        
    }
}
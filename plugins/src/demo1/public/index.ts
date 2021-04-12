import ConfigEditView from "./views/ConfigEdit"
import { IPlugin } from "@plugins/types";
import InfoView from "./views/Info";
import EditView from "./views/Edit";
import EditFullScreenView from "./views/EditFullScreen";

export default {
    name: "Demo Plugin",
    description: "这是一个Demo插件，没有任何功能 !",
    view: {
        edit: EditView,
        info: InfoView,
        configEdit: ConfigEditView,
        editFullScreen: EditFullScreenView,
    },
    config: {
        
    }
} as IPlugin;
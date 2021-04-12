import React from "react";
import { IPlugin } from "@plugins/types";

const Info = (plugin: IPlugin): JSX.Element => {
    return <div>{plugin.name}
    "hello"
    </div>
}
export default Info;
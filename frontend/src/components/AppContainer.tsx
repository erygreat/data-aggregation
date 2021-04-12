import React, { FC, useState } from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;
import { DashboardOutlined } from '@ant-design/icons';
import style from "./app-container.module.css"
import { CollapseBtn } from "@/components/ui";
import { Switch, Route, Link } from "react-router-dom";
import { TemplateManagement } from "./template";
import { BrowserRouter as Router } from "react-router-dom";
import { Plugins } from '@/types';

const AppContainerMenu = () => {
    const [collapse, setCollapse] = useState(false);
    return (
        <div className={style['spider-menu']}>
            <Menu className={style.menu} style={{ width: collapse ? 64 : 150 }} defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark" inlineCollapsed={collapse}>
                <SubMenu key="sub1" icon={<DashboardOutlined />} title="仪表盘">
                    <Menu.Item key="2">
                        <Link to="/template">模板管理</Link>
                    </Menu.Item>
                </SubMenu>
                <CollapseBtn className={style['collapse-btn']} openCollapse={() => { setCollapse(false) }} closeCollapse={() => { setCollapse(true) }} />
            </Menu>
        </div>
    )
}

const AppContainer: FC<{ plugins: Plugins }> = (props) => {
    return (
        <div className={style['app-container']}>
            <Router>
                <AppContainerMenu></AppContainerMenu>
                <div className={style['content-container']}>
                    <Switch>
                        <Route exact path="/">
                            少年，你渴望变强吗
                        </Route>
                        <Route exact path="/template">
                            <TemplateManagement plugins={ props.plugins }></TemplateManagement>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default AppContainer;

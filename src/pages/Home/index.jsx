import store from '../../Redux/store';

import React, { useState, useEffect } from 'react'
import Header from "../../component/Header"
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MailOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Content, Sider } = Layout;



function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items1 = [
    getItem('用户信息', '1', <PieChartOutlined />, [
        getItem('查看用户', 'userList'),
        getItem('新增用户', 'addUser'),
    ]),
    getItem('员工信息', '4', <DesktopOutlined />, [
        getItem('查看员工', 'employeeList'),
        getItem('新增员工', 'addEmployee'),
    ]),
    getItem('发布广告', 'post', <ContainerOutlined />),
    getItem('投诉', 'sue', <MailOutlined />),
];
const items2 = [
    getItem('维修中心', 'fixHall', <ContainerOutlined />),
];


export default function Home() {
    const navigateTo = useNavigate()
    console.log("jjj", store.getState());
    const authority = store.getState().userInfo.authority
    const pathName = useLocation().pathname
    const pathKey = pathName.split("/")[pathName.split("/").length - 1]
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [defaultKey, setDefaultKey] = useState(pathKey)
    const [open, setOpen] = useState(pathKey == "userList" || pathKey == "addUser" ? "1" : pathKey == "employeeList" || pathKey == "addEmployee" ? "4" : "")
    const handleClick = (e) => {
        switch (e.key) {
            case "userList":
                setOpen("1")
                navigateTo("/home/userList")
                break;
            case "addUser":
                setOpen("1")
                navigateTo("/home/addUser")
                break;
            case "employeeList":
                setOpen("4")
                navigateTo("/home/employeeList")
                break;
            case "addEmployee":
                setOpen("4")
                navigateTo("/home/addEmployee")
                break;
            case "post":
                navigateTo("/home/post")
                break;
            case "fixHall":
                navigateTo("/home/fixHall")
                break;
            case "sue":
                navigateTo("/home/sue")
                break;
            default:
                break;
        }
    }
    const checkPath = () => {
        switch (pathKey) {
            case "userList":
                setDefaultKey("userList")
                break;
            case "addUser":
                setDefaultKey("addUser")
                break;
            case "employeeList":
                setDefaultKey("employeeList")
                break;
            case "addEmployee":
                setDefaultKey("addEmployee")
                break;
            case "post":
                setDefaultKey("post")
                break;
            case "fixHall":
                setDefaultKey("fixHall")
                break;
            case "sue":
                setDefaultKey("sue")
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        checkPath()
    }, [pathName])
    return (
        <div>
            <Header></Header>
            <Layout style={{ marginTop: "2px" }}>
                <Sider
                    width={200}
                    style={{
                        background: colorBgContainer,
                    }}
                >
                    <Menu
                        mode="inline"
                        defaultOpenKeys={[open]}
                        defaultSelectedKeys={[defaultKey]}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={authority == 1 ? items1 : items2}
                        onClick={handleClick}
                        theme="dark"
                    />
                </Sider>
                <Layout
                    style={{
                        padding: '0 24px 24px',
                    }}
                >
                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: "521px",
                            height: "100%",
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

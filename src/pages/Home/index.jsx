import React, { useState } from 'react'
import Header from "../../component/Header"
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Spin } from 'antd';
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
const items = [
    getItem('人员总览', 'roleOverView', <MailOutlined />,),
    getItem('新增人员', 'addRole', <AppstoreOutlined />),
];



export default function Home() {
    const navigateTo = useNavigate()
    const pathName = useLocation().pathname
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    console.log("pathName.split('/')[1]", pathName.split("/")[2]);
    const [defaultKey, setDefaultKey] = useState("roleOverView")
    const handleClick = (e) => {
        console.log("e", e);
        switch (e.key) {
            case "roleOverView":
                navigateTo("/home/roleOverView")
                break;
            case "addRole":
                navigateTo("/home/addRole")
                break;
            default:
                break;
        }
    }
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
                        defaultSelectedKeys={[defaultKey]}
                        style={{
                            height: '100%',
                            borderRight: 0,
                            // backgroundColor: "#4966df"
                        }}
                        items={items}
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

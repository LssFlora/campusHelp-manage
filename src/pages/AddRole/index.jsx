import { Button, Form, Input, Select, message, Spin } from 'antd';
import { useState } from 'react';
import { reqRegiUser } from '../../service/api';
import CryptoJS from 'crypto-js';
import roleReplace from '../../utils/roleReplace';



const App = () => {
    const [newForm, setNewForm] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const handleInputChange = (e) => {
        switch (e.target.id) {
            case "userName":
                setNewForm({ ...newForm, userName: e.target.value })
                break;
            case "password":
                setNewForm({ ...newForm, password: e.target.value })
                break;
            default:
                break;
        }
    }
    const selectChange = (e) => {
        console.log("select e", e);
        setNewForm({ ...newForm, role: roleReplace(e) })
    }
    const addUser = async () => {
        setIsLoading(true)
        console.log("newForm", newForm);
        let result = await reqRegiUser(newForm)
        if (result.code == 200) {
            setIsLoading(false)
            message.success("添加成功", [3])
        } else {
            setIsLoading(false)
        }
    }
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="账号"
                name="username"
                rules={[
                    {
                        required: true,
                        message: '请输入账号!',
                    },
                ]}
            >
                <Input onChange={handleInputChange} id="userName" />
            </Form.Item>

            <Form.Item
                label="密码"
                name="password"
                rules={[
                    {
                        required: true,
                        message: '请输入密码!',
                    },
                ]}
            >
                <Input.Password onChange={handleInputChange} id="password" />
            </Form.Item>
            <Form.Item
                label="身份"
                rules={[
                    {
                        required: true,
                        message: '请选择身份!',
                    },
                ]}
            >
                <Select
                    id='role'
                    style={{
                        width: 120,
                    }}
                    onChange={selectChange}
                    // onChange={handleChange}
                    options={[
                        {
                            value: '登记员',
                            label: '登记员',
                        },
                        {
                            value: '评估员',
                            label: '评估员',
                        },
                        {
                            value: '报销员',
                            label: '报销员',
                        },
                        {
                            value: '管理员',
                            label: '管理员',
                        },
                    ]}
                />
            </Form.Item>


            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit" onClick={addUser}>
                    创建
                </Button>
            </Form.Item>
            <Spin size="large" spinning={isLoading} />
        </Form>

    );
}
export default App;
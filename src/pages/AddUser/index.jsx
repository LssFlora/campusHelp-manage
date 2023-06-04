import { Button, Form, Input, Select, message, Spin } from 'antd';
import { useState } from 'react';
import { reqAddUser } from '../../service/api';
import { useNavigate } from 'react-router-dom';




const App = () => {
    const [newForm, setNewForm] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigateTo = useNavigate()



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
    const addUser = async () => {
        let result = await reqAddUser(newForm)
        if (result.code == 200) {
            message.success("添加成功", [3])
            navigateTo("/home/userList")

        } else {
            message.error(result.msg, [3])

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
                name="userName"
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
                <Input onChange={handleInputChange} id="password" />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={addUser}
                >
                    创建
                </Button>
            </Form.Item>
            <Spin size="large" spinning={isLoading} />
        </Form>

    );
}
export default App;
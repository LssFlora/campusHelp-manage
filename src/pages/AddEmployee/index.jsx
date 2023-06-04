import { Button, Form, Input, Select, message, Spin } from 'antd';
import { useState } from 'react';
import { reqAddEmp } from '../../service/api';
import roleReplace from '../../utils/roleReplace';
import { useNavigate } from 'react-router-dom';




const App = () => {
    const [newForm, setNewForm] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const navigateTo = useNavigate()



    const handleInputChange = (e) => {
        switch (e.target.id) {
            case "accountNumber":
                setNewForm({ ...newForm, accountNumber: e.target.value })
                break;
            case "password":
                setNewForm({ ...newForm, password: e.target.value })
                break;
            case "name":
                setNewForm({ ...newForm, name: e.target.value })
                break;
            case "password":
                setNewForm({ ...newForm, password: e.target.value })
                break;
            case "phoneNumber":
                setNewForm({ ...newForm, phoneNumber: e.target.value })
                break;
            case "password":
                setNewForm({ ...newForm, password: e.target.value })
                break;
            default:
                break;
        }
    }
    const selectChange = (e) => {
        setNewForm({ ...newForm, role: roleReplace(e) })
    }
    const addUser = async () => {
        let result = await reqAddEmp(newForm)
        if (result.code == 200) {
            message.success("添加成功", [3])
            navigateTo("/home/employeeList")

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
                label="登录账号"
                name="accountNumber"
                rules={[
                    {
                        required: true,
                        message: '请输入账号!',
                    },
                ]}
            >
                <Input onChange={handleInputChange} id="accountNumber" />
            </Form.Item>
            <Form.Item
                label="登录密码"
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
                label="姓名"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '请输入姓名!',
                    },
                ]}
            >
                <Input onChange={handleInputChange} id="name" />
            </Form.Item>
            <Form.Item
                label="电话号码"
                name="phoneNumber"
                rules={[
                    {
                        required: true,
                        message: '请输入电话号码!',
                    },
                ]}
            >
                <Input onChange={handleInputChange} id="phoneNumber" />
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
                    id='authority'
                    style={{
                        width: 120,
                    }}
                    onChange={selectChange}
                    // onChange={handleChange}
                    options={[
                        {
                            value: '管理员',
                            label: '管理员',
                        },
                        {
                            value: '普通员工',
                            label: '普通员工',
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
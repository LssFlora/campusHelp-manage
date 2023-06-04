import { Button, Form, DatePicker, Upload, message, Spin } from 'antd';
import { useState, useRef } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import { reqAddPost } from '../../service/api';
const OSS = require("ali-oss");

const { RangePicker } = DatePicker;



const App = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState()
    const fileDom = useRef(null)





    const upload = () => {
        let client = new OSS({
            // 以下信息可以在阿里云上查看
            region: "oss-cn-beijing", // 服务器集群地区
            accessKeyId: "LTAI5tLAUYNKmPj7cbMJPsEp", // accessKeyId
            accessKeySecret: "ae6y6bxR4ZWBnw5ly0uVzEItb4k5VL", // accessKeySecret
            // stsToken 可以不写但是不安全
            // stsToken: 'xxx', // 签名token
            bucket: "campus-help-picture", // 阿里云上存储的 Bucket名称
        });
        const file = fileDom.files[0]; // 获取文件
        const filePathArr = file.name.split(".");
        let path = `/user/post/${filePathArr[0]
            }`; // 路径以及文件名，根据需求定义
        var response = client.put(path, file); // 上传并获取响应
        response.then((res) => {
            // 获取返回的文件url
            setForm({ ...form, picture: res.url })
        });
    }
    const handlePicker = (e) => {
        setForm({ ...form, createTime: `${e[0].$y}-${e[0].$M + 1}-${e[0].$D}`, endTime: `${e[1].$y}-${e[1].$M + 1}-${e[1].$D}` })
    }
    const addPost = async () => {
        // setIsLoading(true)
        let result = await reqAddPost(form)
        if (result.code == 200) {
            message.success("添加成功", [3])
            setForm({})
        } else {
            message.error(result.msg || result.message, [3])
            setIsLoading(false)

        }
    }
    const props = {
        maxCount: "1",
        customRequest(info) {
            let client = new OSS({
                // 以下信息可以在阿里云上查看
                region: "oss-cn-beijing", // 服务器集群地区
                accessKeyId: "LTAI5tLAUYNKmPj7cbMJPsEp", // accessKeyId
                accessKeySecret: "ae6y6bxR4ZWBnw5ly0uVzEItb4k5VL", // accessKeySecret
                // stsToken 可以不写但是不安全
                // stsToken: 'xxx', // 签名token
                bucket: "campus-help-picture", // 阿里云上存储的 Bucket名称
            });
            const file = info.file; // 获取文件
            // 使用FileReader将文件转换为Blob对象
            const reader = new FileReader();
            reader.onload = () => {
                const blob = new Blob([new Uint8Array(reader.result)]);
                const filePathArr = file.name.split(".");
                let path = `/user/post/${filePathArr[filePathArr.length - 2]}`;
                var response = client.put(path, blob); // 上传并获取响应
                response.then((res) => {
                    setForm({ ...form, picture: res.url })
                });
            };
            reader.readAsArrayBuffer(new Blob([file]));
        },
    };
    return (
        <div>
            <Spin size="large" spinning={isLoading} >
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
                        label="海报"
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: '请上传海报!',
                            },
                        ]}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="开始和结束时间"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请选择开始和结束时间!',
                            },
                        ]}
                    >
                        <RangePicker onChange={handlePicker} />

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
                            onClick={addPost}
                        >
                            创建
                        </Button>
                    </Form.Item>
                </Form>
            </Spin >
        </div >
    );
}
export default App;
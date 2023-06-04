import React, { useState, useEffect } from 'react'
import { reqGetEmp, reqChangeEmp, reqDelEmp } from '../../service/api';
import { UserOutlined, PhoneOutlined, TeamOutlined } from '@ant-design/icons';


import { Input, Row, Table, Popconfirm, Button, Spin, Modal, message } from 'antd';

export default function MainList() {

    const [caseList, setCaseList] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [record, setRecord] = useState({
        "id": 0,
        "jobNumber": 0,
        "name": "",
        "phoneNumber": 0,
        "accountNumber": "",
        "password": "",
        "status": 0,
        "authority": 0
    },)
    const columns = [
        {
            title: '工号',
            dataIndex: 'jobNumber',
        },
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '登录账户',
            dataIndex: 'accountNumber',
        },
        {
            title: '手机号',
            dataIndex: 'phoneNumber',
        },
        {
            title: '身份',
            dataIndex: 'authority',
        }, {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) =>
                caseList.length >= 1 ? (
                    <div>
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={() => goEdit(record)}>
                            编辑
                        </Button>
                        <Popconfirm
                            title="确认删除?无法恢复！"
                            onConfirm={() => handleDelete(record.id)}
                        >
                            <Button danger>
                                删除
                            </Button>

                        </Popconfirm>
                    </div>

                ) : null,
        },
    ];
    useEffect(() => {
        getEmp()
    }, [])

    const handleDelete = async (id) => {
        let result = await reqDelEmp(id)
        if (result.code == 200) {
            message.success("删除成功", [3])

            getEmp()
        } else {
            message.error(result.msg, [3])

        }

    }
    // 获取用户
    const getEmp = async () => {
        let temp = []
        let result = await reqGetEmp()
        if (result.code == 200) {
            setIsLoading(false)
            result.data.forEach((item, index) => {
                temp = [...temp, { ...item, key: item.id, authority: item.authority == 0 ? "普通员工" : "管理员" }]
            })
            setCaseList(temp)
        }
    }
    const goEdit = (record) => {
        setIsModalOpen(true)
        setRecord(record)
    }
    const handleOk = () => {
        setIsModalOpen(false);

    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleInput = (e) => {
        switch (e.target.id) {
            case "name":
                setRecord({ ...record, name: e.target.value })
                break;
            case "accountNumber":
                setRecord({ ...record, accountNumber: e.target.value })
                break;
            case "phoneNumber":
                setRecord({ ...record, phoneNumber: e.target.value })
                break;
            case "authority":
                setRecord({ ...record, authority: e.target.value })
                break;
            default:
                break;
        }
    }
    const submitChange = async () => {
        let result = await reqChangeEmp({ ...record, authority: record.authority == "管理员" ? 1 : 0 })
        if (result.code == 200) {
            message.success("修改成功", [3])

            setIsModalOpen(false);
            getEmp()
        } else {

            message.error(result.msg, [3])

        }
    }

    return (
        <div>
            <Row>
                <Table
                    columns={columns}
                    dataSource={caseList}
                    // onChange={onChange}
                    bordered="true"
                    style={{
                        width: "100%",
                        margin: "15px",
                        marginTop: "30px"
                    }}
                    pagination={
                        {
                            defaultPageSize: 5
                        }
                    }
                    onRow={(record) => {
                        return {
                            onDoubleClick: (event) => { },
                            onContextMenu: (event) => { },
                            onClick: (event) => { },
                            // onMouseEnter: (event) => { setRow(event) }, // 鼠标移入行
                            onMouseLeave: (event) => { },
                        };
                    }}
                >
                </Table>
            </Row>
            <Spin size="large" spinning={isLoading} />
            <Modal title="修改员工信息" open={isModalOpen} onOk={submitChange} onCancel={handleCancel}>
                <div>
                    修改姓名：<Input id="name" placeholder="修改姓名" prefix={<UserOutlined />} style={{ margin: '5px 0' }} value={record.name} onChange={handleInput} />
                </div>
                <div>修改登录账户：
                    <Input id="accountNumber" placeholder="修改登录账户" prefix={<UserOutlined />} style={{ margin: '5px 0' }} value={record.accountNumber} onChange={handleInput} />
                </div>
                <div>修改电话号码：
                    <Input id="phoneNumber" placeholder="修改电话号码" prefix={<PhoneOutlined />} style={{ margin: '5px 0' }} value={record.phoneNumber} onChange={handleInput} />
                </div>
                <div>修改身份：
                    <Input id="c" placeholder="修改身份" prefix={<TeamOutlined />} style={{ margin: '5px 0' }} value={record.authority} onChange={handleInput} />
                </div>
            </Modal>

        </div>
    )
}

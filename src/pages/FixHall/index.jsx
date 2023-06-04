import React, { useState, useEffect } from 'react'
import { reqFixEnd, reqFix } from '../../service/api';
import { useLocation } from 'react-router-dom';


import { Input, Row, Table, Button, Spin, Modal, message } from 'antd';

export default function MainList() {
    const userInfo = useLocation().state.userInfo


    const [caseList, setCaseList] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setConent] = useState("")

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
            title: '维修单号',
            dataIndex: 'repairOrderNumber',
        },
        {
            title: '用户ID',
            dataIndex: 'userId',
        },
        {
            title: '用户姓名',
            dataIndex: 'userName',
        },
        {
            title: '电话号码',
            dataIndex: 'phoneNumber',
        },
        {
            title: '维修类型',
            dataIndex: 'repairType',
        },
        {
            title: '地址',
            dataIndex: 'address',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        }, {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) =>
                caseList.length >= 1 ? (
                    <div>
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={() => goEdit(record)}>
                            已处理
                        </Button>
                    </div>

                ) : null,
        },
    ];
    useEffect(() => {
        getEmp()
    }, [])

    // 获取用户
    const getEmp = async () => {
        let temp = []

        let result = await reqFix(userInfo.id)
        if (result.code == 200) {
            setIsLoading(false)
            result.data.forEach((item, index) => {
                temp = [...temp, {
                    ...item, key: item.id, repairType: item.repairType == 0
                        ? "门窗维修"
                        : item.repairType == 1
                            ? "空调电器维修"
                            : item.repairType == 2
                                ? "下水道维修"
                                : item.repairType == 3
                                    ? "桌椅维修"
                                    : "其他"
                    , createTime: item.createTime.split("T").join(" ")
                }]
            })
            setCaseList(temp)
        }
    }
    const goEdit = (record) => {
        setIsModalOpen(true)
        setRecord(record)
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleInput = (e) => {
        setConent(e.target.value)
    }
    const submitChange = async () => {
        let result = await reqFixEnd({ content: content, id: record.id })
        if (result.code == 200) {
            message.success("处理成功", [3])
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
            <Modal title="已处理" open={isModalOpen} onOk={submitChange} onCancel={handleCancel}>
                <div>
                    填报故障原因：<Input id="name" placeholder="故障原因" style={{ margin: '5px 0' }} value={record.name} onChange={handleInput} />
                </div>
            </Modal>

        </div>
    )
}

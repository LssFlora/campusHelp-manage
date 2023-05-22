import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import caseListReplace from "../../utils/caseListReplace"
import { reqUserInfo, reqDeleteUser } from '../../service/api';

import { Input, Row, Table, Popconfirm, Button, Spin } from 'antd';
const { Search } = Input;

export default function MainList() {
    const [caseList, setCaseList] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const columns = [
        {
            title: '账号',
            dataIndex: 'account_number',
        },
        {
            title: '权限',
            dataIndex: 'authority',
        },
        {
            title: '创建时间',
            dataIndex: 'createtime',
        }, {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) =>
                caseList.length >= 1 ? (
                    <Popconfirm
                        title="确认删除?无法恢复！"
                        onConfirm={() => handleDelete(record.key)}
                    >
                        <Button danger>
                            删除
                        </Button>

                    </Popconfirm>
                ) : null,
        },
    ];
    const mockData = [
        {
            roleId: "admin",
            limition: "管理员",
            createTime: "2023-4-19"
        },
        {
            roleId: "111111",
            limition: "登记员",
            createTime: "2023-4-19"
        },
        {
            roleId: "222222",
            limition: "评估员",
            createTime: "2023-4-20"

        },
        {
            roleId: "333333",
            limition: "报销员",
            createTime: "2023-4-21"

        }
    ]
    useEffect(() => {
        getUserInfo()
    }, [])

    const onChange = (pagination, filters, sorter, extra) => {
        // console.log('params', pagination, filters, sorter, extra);
    };
    const handleDelete = (id) => {
        console.log("点击的id", id);
        deleteUser(id)
    }
    // 获取用户
    const getUserInfo = async () => {
        let result = await reqUserInfo();
        if (result.code == 200) {
            setIsLoading(false)
            console.log("获取成功", result);
            setCaseList(caseListReplace(result.data))
        } else {
            setIsLoading(false)
        }
    }
    // 删除用户
    const deleteUser = async (id) => {
        let result = await reqDeleteUser(id)
        if (result.code == 200) {
            console.log("删除成功");
            getUserInfo()
        }
    }
    return (
        <div>
            <Row>
                <Table
                    columns={columns}
                    dataSource={caseList}
                    onChange={onChange}
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
                            onMouseEnter: (event) => { }, // 鼠标移入行
                            onMouseLeave: (event) => { },
                        };
                    }}
                >
                </Table>
            </Row>
            <Spin size="large" spinning={isLoading} />


        </div>
    )
}

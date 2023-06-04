import React, { useState, useEffect } from 'react'
import { reqGetUser, reqReset, reqDelUser } from '../../service/api';


import { Row, Table, Popconfirm, Button, Spin, message } from 'antd';

export default function MainList() {

    const [caseList, setCaseList] = useState()
    const [isLoading, setIsLoading] = useState(true)


    const columns = [
        {
            title: '账号',
            dataIndex: 'userName',
        },
        {
            title: '昵称',
            dataIndex: 'nickName',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '电话号码',
            dataIndex: 'phoneNumber',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '身份证',
            dataIndex: 'identityCard',
        },
        {
            title: '评分',
            dataIndex: 'rate',
        }, {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) =>
                caseList.length >= 1 ? (
                    <div>
                        <Button type="primary" style={{ marginRight: '5px' }} onClick={() => goEdit(record)}>
                            重置密码
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
        let result = await reqDelUser(id)
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
        let result = await reqGetUser()
        if (result.code == 200) {
            setIsLoading(false)
            result.data.forEach((item, index) => {
                temp = [...temp, { ...item, key: item.id, sex: item.sex == "1" ? "男" : "女" }]
            })
            setCaseList(temp)
        }
    }
    const goEdit = async (record) => {
        let result = await reqReset(record.id)
        if (result.code == 200) {
            message.success("重置成功", [3])
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


        </div>
    )
}

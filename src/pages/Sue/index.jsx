import React, { useState, useEffect } from 'react'
import { reqAllSue, reqEndSue } from '../../service/api';


import { Input, Row, Table, Popconfirm, Button, Spin, message } from 'antd';

export default function MainList() {

    const [caseList, setCaseList] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const columns = [
        {
            title: '订单号',
            dataIndex: 'orderNumber',
        },
        {
            title: '被投诉骑手',
            dataIndex: 'nickName',
        },
        {
            title: '订单内容',
            dataIndex: 'taskContent',
        },
        {
            title: '投诉内容',
            dataIndex: 'complaintInformation',
        },
        {
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) =>
                caseList.length >= 1 ? (
                    <div>
                        <Popconfirm
                            title="已完成处理？"
                            onConfirm={() => goEnd(record.id)}
                        >
                            <Button type='primary'>
                                完成处理
                            </Button>

                        </Popconfirm>
                    </div>

                ) : null,
        },
    ];
    useEffect(() => {
        getEmp()
    }, [])


    // 获取用户
    const getEmp = async () => {
        let result = await reqAllSue()
        if (result.code == 200) {
            setIsLoading(false)
            setCaseList(result.data)
        }
    }
    const goEnd = async (id) => {
        let result = await reqEndSue(id)
        if (result.code == 200) {
            message.success("修改成功", [3])
            getEmp()
        } else {
            message.error(result.msg, [3])
        }
    }


    return (
        <div>
            <Row>
                <Spin size="large" spinning={isLoading} style={{ width: '100%' }}>
                    <Table
                        columns={columns}
                        dataSource={caseList}
                        // onChange={onChange}
                        bordered="true"
                        style={{
                            width: "75vw",
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
                </Spin >
            </Row>

        </div>
    )
}

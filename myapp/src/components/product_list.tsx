import React, { useState ,useEffect} from 'react';
import { useModel } from 'umi';
import { Space, Table, Tag, Button, Drawer, Form, Input, Checkbox, InputNumber, DatePicker, message } from 'antd';
import axios from 'axios';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import type { DatePickerProps } from 'antd';
const { Column, ColumnGroup } = Table;

const { TextArea } = Input;
interface DataType {
    id: React.Key;
    departureRime: string;
    productPrices: number;
    productDesc: number;
    productStatus: string;
    productNum: string;
    cityName:string;
}



export default function Product_list(_memo: any, props: any) {
   
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const { open, setOpen, dates, setDates ,productArr,setProductArr} = useModel('product', model => ({
        open: model.open, setOpen: model.setOpen,
        dates: model.dates, setDates: model.setDates,
        productArr:model.productArr,setProductArr:model.setProductArr
    }));
     // 生命周期
     useEffect(() => {
        //组件挂载
        getList()
         return () => {
           // 在这里执行 componentWillUnmount 相关的操作
         };
       }, []);
    const getList=()=>{
        axios({
            url: `http://localhost:8080/product/list?page=${0}&num=${10}`,
            method: "GET",
        }).then(res=>{
            setProductArr(res.data);
        })
    }   
    const addProduct = () => { setOpen(true);}
    const onClose = () => {setOpen(false);form.resetFields();;};
    //   表单函数
    //  提交表单
    const onFinish = (values: any) => {
        values.departureRime=dates;
        axios({
            url: "http://localhost:8080/product/add",
            method: "put",
            data: values
        }).then(res => {
            messageApi.open({
                type: res.data == 'success'?'success':'error',
                content:  res.data == 'success'?'添加成功':'添加失败',
            });
            onClose();
            getList();
            form.resetFields();
        })


    };

    const onFinishFailed = (errorInfo: any) => {
        messageApi.open({
            type: 'error',
            content: '必须填写才能提交',
        });
    };
    //时间选择框
    const onChange: DatePickerProps['onChange'] = (date, dateString) => { setDates(dateString); };
    return (
        <div>
            {contextHolder}
            <div>
                <Button type="primary" onClick={addProduct}>添加产品</Button>
            </div>
            <div>
                <Table dataSource={productArr}>
                    <Column title="产品名称" dataIndex="producrName" key="producrName" />
                    <Column title="出发时间" dataIndex="departureRime" key="departureRime" />
                    <Column title="城市" dataIndex="cityName" key="cityName" />
                    <Column title="价格" dataIndex="productPrice" key="productPrice" />
                    <Column title="数量" dataIndex="productNum" key="productNum" />
                    {/* <Column
                        title="Tags"
                        dataIndex="tags"
                        key="tags"
                        render={(tags: string[]) => (
                            <>
                                {tags.map((tag) => (
                                    <Tag color="blue" key={tag}>
                                        {tag}
                                    </Tag>
                                ))}
                            </>
                        )}
                    /> */}
                    <Column
                        title="Action"
                        key="action"
                        render={(_: any) => (
                            <Space size="middle">
                                <a>修改</a>
                                <a>删除</a>
                            </Space>
                        )}
                    />
                </Table>
            </div>
            <Drawer
                title="添加产品"
                placement='right'
                width={500}
                onClose={onClose}
                open={open}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="产品名称"
                        name="producrName"
                        rules={[{ required: true, message: '请输入产品名称' }]}
                    >
                        <Input placeholder='请输入产品名称' />
                    </Form.Item>

                    <Form.Item
                        label="产品价格"
                        name="productPrice"
                        rules={[{ required: true, message: '请输入产品价格' }]}
                    >
                        <InputNumber
                            defaultValue={0}
                            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

                        />
                    </Form.Item>
                    <Form.Item
                        label="出发时间"
                        name="departureRime"
                        rules={[{ required: true, message: '请选择时间' }]}
                    >
                        <DatePicker onChange={onChange} showTime />
                    </Form.Item>
                    <Form.Item
                        label="产品数量"
                        name="produtNum"
                        rules={[{ required: true, message: '请输入产品数量' }]}
                    >
                        <InputNumber min={1} defaultValue={0} />
                    </Form.Item>
                    <Form.Item
                        label="产品状态"
                        name="produtstatus"
                        rules={[{ required: true, message: '请输入产品数量' }]}
                    >
                        <InputNumber min={1} defaultValue={0} />
                    </Form.Item>
                    <Form.Item
                        label="目标城市"
                        name="cityName"
                        rules={[{ required: true, message: '请输入目标城市' }]}
                    >
                        <Input placeholder='请输入目标城市' />
                    </Form.Item>
                    <Form.Item
                        label="产品介绍"
                        name="productDesc"
                        rules={[{ required: true, message: '请输入产品介绍' }]}
                    >
                        <TextArea rows={4} placeholder="最多输入200个字" maxLength={200} />
                    </Form.Item>


                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>

        </div>

    );
}
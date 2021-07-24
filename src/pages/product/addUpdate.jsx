import React, {Component} from 'react'
import {Card, Form, Input, Space, Cascader} from 'antd'
import {LeftOutlined} from "@ant-design/icons";
import {getCategoryList} from '@/api/category'
import UploadCommont from "./uploadCommont";

const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 10},
};
export default class AddUpdate extends Component {
    state = {
        initFormVal: {},
        options: []
    }

    async componentDidMount() {
        const {row = {}, editType} = this.props.location.state

        const options = await this._getCategoryList('0')
        if (row.pCategoryId !== '0' && editType === 'edit') {
            const subCategorys = await this._getCategoryList(row.pCategoryId)


            // 找到当前商品对应的一级option对象
            const targetOption = options.find(option => option.value === row.pCategoryId)

            // 关联对应的一级option上
            targetOption.children = subCategorys
        }
        this.setState(() => ({initFormVal: row, options}))
    }

    _getCategoryList = async id => {
        const result = await getCategoryList({parentId: id})
        console.log(result)
        let options = []
        if (result.status === 0) {
            options = result.data.map(item => ({value: item._id, label: item.name, isLeaf: id === '0' ? false : true}))
        }
        return options
    }
    loadData = async selectedOptions => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const children = await this._getCategoryList(targetOption.value)
        targetOption.loading = false;
        if (children.length) {
            targetOption.children = children
        } else {
            targetOption.isLeaf = true
        }
        this.setState(() => ({...this.state}));

    }
    title = () => {
        const {editType} = this.props.location.state

        return (
            <Space>
                <LeftOutlined onClick={() => {
                    this.props.history.goBack()
                }} style={{color: '#1DA57A', marginRight: '8px'}}/>
                <span>{editType === 'add' ? '添加商品' : '修改商品'}</span>
            </Space>
        )
    }
    onChange = (value) => {
        console.log(value)
    }

    render() {
        console.log(this.props.location.state)
        const {row = {}} = this.props.location.state
        console.log(row !== {})
        if (JSON.stringify(row) !== '{}') {
            if (row.pCategoryId === '0') {
                row.idList = [row.categoryId]
            } else {
                row.idList = [row.pCategoryId, row.categoryId]
            }

        } else {
            row.idList = null
        }
        console.log(row)
        const {options} = this.state
        return (
            <Card title={this.title()}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={row}
                >
                    <Form.Item
                        label="商品名称"
                        name="name"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="商品描述"
                        name="desc"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input.TextArea autoSize={{minRows: 2, maxRows: 4}}/>
                    </Form.Item>
                    <Form.Item
                        label="商品价格"
                        name="price"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input type='number' addonAfter='元'/>
                    </Form.Item>
                    <Form.Item
                        label="商品分类"
                        name="idList"
                    >
                        <Cascader options={options} loadData={this.loadData} onChange={this.onChange}
                                  placeholder="Please select"/>
                    </Form.Item>
                    <Form.Item
                        label="商品图片"
                    >
                        <UploadCommont/>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}
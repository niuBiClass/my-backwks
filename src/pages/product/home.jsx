import React, {Component} from 'react'
import {Input, Button, Select, Card, Space, Table, Pagination, Modal, message} from 'antd'
import {
    ExclamationCircleOutlined,
    PlusOutlined
} from '@ant-design/icons';
import LinkButton from "../../components/link-button";
import {getProductList, updateStatus} from '@/api/product'
import {memoryUtils, removeUserInfo} from "../../utils";

const {Option} = Select
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.selectVal = 'productName'
        this.pagination = {
            defaultPageSize: 5,
            defaultCurrent: 1,
            current: 1,
            pageSize: 5,
            hideOnSinglePage: true,
            total: 0,
            pageSizeOptions: [5, 10, 15],
            onChange: (page, pageSize) => {
                this.changePagination(page, pageSize)
            }
        }
    }

    inputRef = React.createRef()
    state = {
        tableList: [],

    }

    componentDidMount() {
        this.initTable()
        this.getTableList()
    }

    /*更新上下架状态*/
    _updateStatus = (row) => {
        const {status, _id: productId} = row
        Modal.confirm({
            title: `确认${status === 1 ? '下架' : '上架'}`,
            icon: <ExclamationCircleOutlined/>,
            // content: '确认退出？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                updateStatus({status: status === 1 ? 2 : 1, productId}).then(res => {
                    if (res.status === 0) {
                        message.success('更新成功！')
                        this.getTableList()
                    }
                })
            }
        });
    }
    gotoDetail=(row)=>{
        console.log(row)
        this.props.history.push('/products/product/detail',{product:row})
    }
    /*初始化表格配置*/
    initTable = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: text => (
                    `￥${text}`
                )
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (status, row) => (
                    <Space>
                        <Button type='primary' onClick={() => {
                            this._updateStatus(row)
                        }}>{status === 1 ? '下架' : '上架'}</Button>
                        <span>{status === 1 ? '在售' : '已下架'}</span>
                    </Space>
                ),
            },
            {
                title: '操作',
                render: text => (
                    <Space>
                        <LinkButton onClick={()=>{this.gotoDetail(text)}}>详情</LinkButton>
                        <LinkButton onClick={()=>{this.addUpdate('edit',text)}}>修改</LinkButton>
                    </Space>
                ),
            },
        ]
    }
    /*获取表格信息*/
    getTableList = () => {
        console.log(this.inputRef.current.state.value)
        const searchVal = this.inputRef.current.state.value
        const {pagination: {defaultPageSize, defaultCurrent, pageSize, current}} = this
        const params = {
            pageNum: current || defaultCurrent,
            pageSize: pageSize || defaultPageSize,
            [this.selectVal]: searchVal
        }
        getProductList(params).then(res => {
            if (res.status === 0) {
                this.pagination.total = res.data.total
                this.setState(() => ({tableList: res.data.list}))
            }
        })
    }
    changePagination = (page, pagesize) => {
        this.pagination.current = page
        this.pagination.pageSize = pagesize
        this.getTableList()
    }
    /*改变下拉框选项*/
    changeSelect = ({value}) => {
        this.selectVal = value
    }
    /*点击添加/修改商品*/
    addUpdate=(flag,row)=>{
        this.props.history.push('/products/product/addUpdate',{editType:flag,row})
    }
    /*头部*/
    title = () => {
        return (
            <Space>
                <Select labelInValue defaultValue={{value: 'productName'}} onChange={this.changeSelect}>
                    <Option key='productName' value='productName'>按名称搜索</Option>
                    <Option key='productDesc' value='productDesc'> 按描述搜索</Option>
                </Select>
                <Input maxLength={80} ref={this.inputRef} placeholder='关键字'/>
                <Button type='primary' onClick={this.getTableList}>搜索</Button>
            </Space>
        )
    }
    addShopNode = () => {
        return (
            <Button type='primary' onClick={()=>{this.addUpdate('add')}} icon={<PlusOutlined/>}>
                添加商品
            </Button>
        )
    }


    render() {
        const {tableList} = this.state
        const {pagination} = this
        return (
            <Card title={this.title()} extra={this.addShopNode()}>
                <Table pagination={false} columns={this.columns} dataSource={tableList} rowKey={'_id'}/>
                <Pagination style={{textAlign: 'right', "marginTop": '5px'}} {...pagination} />
            </Card>
        )
    }
}
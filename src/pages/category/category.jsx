import React, {Component} from 'react'
import {Card, Button, Table, Space, Pagination} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons'
import {getCategoryList} from '@/api/category'
import LinkButton from "../../components/link-button";
import EditCategory from "./editCategory";

const addbutton = () => {
    return <Button type="primary" onClick={() => {
        this.openEditCategory('add')
    }} icon={<PlusOutlined/>}>添加</Button>
}
/*商品分类*/
export default class Category extends Component {
    // editRef = React.createRef()
    constructor(props) {
        super(props);
        this.record = {}
        this.addFlag = 'add'
    }

    state = {
        showModal: false,
        categoryList: [], //一级分类列表
        parentId: '0', //父级id
        parentName: '',//父级name
        subCategoryList: [],//二级分类列表
        pagination: {defaultPageSize: 5, pageSizeOptions: [5, 10, 15], responsive: true, hideOnSinglePage: true}
    }
    /*获取分类列表*/
    getCategoryList = () => {
        const {parentId} = this.state
        getCategoryList({parentId}).then(res => {
            if (res && res.status === 0) {
                const categoryList = res.data
                this.setState(() => {
                    if (parentId === '0') {
                        return {categoryList}
                    } else {
                        return {subCategoryList: categoryList}
                    }
                })
            }
        })
    }
    /*显示二级分类列表*/
    showSubCategory = ({name, _id}) => {
        this.setState(() => ({parentName: name, parentId: _id}), () => {
            this.getCategoryList()
        })
    }
    /*点击一级列表*/
    showCategory = () => {
        this.setState(() => ({parentId: '0'}))
    }
    /*点击新增/修改分类*/
    openEditCategory = (addFlag, record) => {
        console.log(this.editRef)
        this.record = record
        this.addFlag = addFlag
        this.changeModal(true)
    }
    /*改变弹框状态*/
    changeModal = (flag) => {
        this.setState(() => ({showModal: flag}))
    }
    /*初始化分类表格*/
    initTable = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                key: 'action',
                width: 300,
                render: ({parentId}, record) => {

                    return (
                        <Space size="middle">
                            <LinkButton onClick={() => {
                                this.openEditCategory('edit', record)
                            }}>修改分类</LinkButton>
                            <LinkButton style={{display: parentId === '0' ? 'block' : 'none'}} onClick={() => {
                                this.showSubCategory(record)
                            }}>查看子分类</LinkButton>
                        </Space>
                    )
                },
            },
        ];
        this.getCategoryList()

    }
    addbutton = () => {
        return <Button type="primary" onClick={() => {
            this.openEditCategory('add')
        }} icon={<PlusOutlined/>}>添加</Button>
    }

    componentDidMount() {
        this.initTable()
    }

    render() {

        const {categoryList, pagination, parentId, parentName, subCategoryList, showModal} = this.state
        const title = parentId === '0' ? '一级分类列表' : (<Space size="middle">
            <LinkButton onClick={this.showCategory}>一级分类列表</LinkButton>
            <ArrowRightOutlined/>
            <span>{parentName}</span>
        </Space>)

        const layOut = {
            changeModal: this.changeModal,
            showModal,
            parentId,
            categoryList,
            addFlag: this.addFlag,
            record: this.record,
            getCategoryList: this.getCategoryList
        }
        return (
            <div>
                <Card title={title} extra={this.addbutton()}>

                    <Table scroll={{y: '550px'}} pagination={pagination} rowKey={'_id'} bordered
                           dataSource={parentId === '0' ? categoryList : subCategoryList}
                           columns={this.columns}>
                    </Table>
                </Card>
                <EditCategory {...layOut} ref={(ele) => {
                    this.editRef = ele
                }}>
                </EditCategory>
            </div>
        )
    }
}
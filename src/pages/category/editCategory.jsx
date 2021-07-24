import React, {Component} from 'react'
import {Modal, Button, Form, Input, Select,message} from 'antd';
import PropTypes from 'prop-types'
import {addCategory,updateCategory} from '@/api/category'
const {Option} = Select
const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 16},
};
export default class EditCategory extends Component {
    static propTypes = {
        showModal: PropTypes.bool.isRequired
    }
    static defaultProps = {
        showModal: false
    }
    formRef = React.createRef()

    static getDerivedStateFromProps(props, state) {
        console.log(props, state)
        if (props.showModal !== state.showModal) {
            return {
                showModal: props.showModal,

            }
        } else {
            return null
        }
    }

    state = {
        showModal: false
    }

    /* 点击取消*/
    handleCancel = () => {
        const {changeModal} = this.props
        changeModal(false)
    }
    /*点击确定*/
    handleOk = () => {
        const {changeModal,addFlag, record = {}, getCategoryList} = this.props
        this.formRef.current.validateFields().then(value => {
           let [requestApi,params] = [null,{}]
            if(addFlag === 'add'){
                requestApi = addCategory
                params = value
            }else {
                requestApi = updateCategory
                params = {
                    parentId:value.parentId,
                    categoryId:record._id,
                    categoryName:value.categoryName
                }
            }
            requestApi(params).then(res=>{
                if(res.status === 0){
                    message.success('操作成功！')
                    getCategoryList()
                    changeModal(false)
                }else {
                    message.error('操作失败！')
                }
            })

        })

    }

    render() {
        const {showModal} = this.state
        const {addFlag, record = {}, categoryList,parentId} = this.props
        return (
            <Modal destroyOnClose={true} title={addFlag === 'add' ? '新增' : '修改'} visible={showModal}
                   onOk={this.handleOk}
                   onCancel={this.handleCancel}>
                <Form
                    ref={this.formRef}
                    name="basic"
                    {...layout}
                    initialValues={{parentId: parentId,categoryName:record.name}}
                >
                    <Form.Item
                        style={
                            {display:parentId==='0'&&'none'}
                        }
                        label="一级分类"
                        name="parentId"
                        rules={[{required: true, message: '请选择一级分类'}]}
                    >
                        <Select
                            disabled={addFlag === 'add' ? false : true}
                            placeholder="请选择一级分类"
                            allowClear
                        >
                            {
                                categoryList.map(item => (
                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                ))
                            }

                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="分类名称"
                        name="categoryName"
                        rules={[{required: true, message: '请输入分类名称!'}]}
                    >
                        <Input maxLength={10}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}
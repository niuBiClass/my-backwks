import React, {Component} from 'react'
import {Card, Pagination, Space, Table, List} from "antd";
import {LeftOutlined} from '@ant-design/icons'
import './product.less'
import {DEFAULT_IMGURL} from '@/utils'
import {getCategoryInfo} from '@/api/product'

export default class detail extends Component {
    state = {
        pCaName: '',
        SCaName: ''
    }
    title = () => {
        return (
            <Space>
                <LeftOutlined onClick={() => {
                    this.props.history.goBack()
                }} style={{color: '#1DA57A', marginRight: '8px'}}/>
                <span>商品详情</span>
            </Space>
        )
    }

    componentDidMount() {
        this._getCategoryInfo()

    }

    _getCategoryInfo = () => {
        const {pCategoryId, categoryId} = this.props.location.state.product
        if (pCategoryId === '0') {
            getCategoryInfo({categoryId}).then(res => {
                if (res.status === 0) {
                    this.setState(()=>({pCaName:res.data.name}))
                }
            })
        } else {
            Promise.all([getCategoryInfo({categoryId: pCategoryId}), getCategoryInfo({categoryId})]).then(res => {
                this.setState(() => ({pCaName: res[0].data.name, SCaName: res[1].data.name}))
            })
        }
    }

    render() {
        console.log(this.props)
        const {desc, detail, name, imgs, price, pCategoryId} = this.props.location.state.product
        const {pCaName, SCaName} = this.state
        return (
            <Card title={this.title()}>
                <List bordered className='product-detail'>
                    <List.Item>
                        <Space>
                            <span className='left'>
                                商品名称：
                            </span>
                            <span>
                                {name}
                            </span>
                        </Space>
                    </List.Item>
                    <List.Item>
                        <Space>
                            <span className='left'>
                                商品描述：
                            </span>
                            <span>
                                {desc}
                            </span>
                        </Space>
                    </List.Item>
                    <List.Item>
                        <Space>
                            <span className='left'>
                                商品价格：
                            </span>
                            <span>
                                {price}元
                            </span>
                        </Space>
                    </List.Item>
                    <List.Item>
                        <Space>
                            <span className='left'>
                                所属分类：
                            </span>
                            <span>
                                {pCategoryId === '0' ? pCaName : `${pCaName}-->${SCaName}`}
                            </span>
                        </Space>
                    </List.Item>
                    <List.Item>
                        <Space>
                            <span className='left'>
                                商品图片：
                            </span>
                            <span>
                                {
                                    imgs.map(item => (
                                        <img className='product-img' src={`${DEFAULT_IMGURL}/${item}`} key={item}
                                             alt=""/>
                                    ))
                                }
                            </span>
                        </Space>
                    </List.Item>
                    <List.Item>
                        <Space>
                            <span className='left'>
                                商品详情：
                            </span>
                            <span dangerouslySetInnerHTML={{__html: detail}}>

                            </span>
                        </Space>
                    </List.Item>
                </List>
            </Card>
        )
    }
}
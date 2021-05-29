import React, {Component} from 'react'
import {Card, Button} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

const addbutton = ()=>{
    return <Button type="primary"  icon={<PlusOutlined />} >添加</Button>
}
/*商品分类*/
export default class Category extends Component {
    render() {
        return (
            <div>
                <Card title="Default size card" extra={addbutton()} >

                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        )
    }
}
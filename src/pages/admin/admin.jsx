import React, {Component} from 'react'

/*后台管理路由界面*/
import {Redirect} from 'react-router-dom'
import {memoryUtils} from "@/utils";

import { Layout } from 'antd';


export default class Admin extends Component {
    componentDidMount() {

        /* //执行时机为dom加载完毕，是在render函数之后执行
         const _user = memoryUtils.user
          if (!_user?._id) {
              console.log(2)
              /!*componentDidMount 使用this.props.history.replace('/login')*!/
              this.props.history.replace('/login')
          }*/
    }

    render() {
        const _user = memoryUtils.user
        if (!_user?._id) {
            console.log(1)
            /*在render函数里面使用 Redirect 跳回登录的方法*/
            return <Redirect to={'/login'}/>
        }
        const { Header, Footer, Sider, Content } = Layout;
        return (
            <Layout style={{height:"100%"}}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
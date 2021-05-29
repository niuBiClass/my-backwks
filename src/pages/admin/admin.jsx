import React, {Component} from 'react'

/*后台管理路由界面*/
import {Redirect,Switch,Route} from 'react-router-dom'
import {memoryUtils} from "@/utils";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
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
            /*在render函数里面使用 Redirect 跳回登录的方法*/
            return <Redirect to={'/login'}/>
        }
        const { Footer, Sider, Content } = Layout;
        return (
            <Layout style={{height:"100%"}}>
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{background:'#fff',margin:'20px'}}>
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/products/category' component={Category}/>
                            <Route path='/products/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{background:'#eee',textAlign:'center'}}>推荐使用谷歌浏览器</Footer>
                </Layout>
            </Layout>
        )
    }
}
import React, {Component, useEffect} from 'react'
import './index.less'
import logo from "@/static/image/logo.png";
import {Link, withRouter} from 'react-router-dom'
import {Menu, Button} from 'antd';
import menuList from "../../config/menuConfig";

const {SubMenu} = Menu
@withRouter
export default class LeftNav extends Component {
    getMenuList = (list) => {
        return list.map(item => {
            if (!item.children?.length) {
                return (

                    <Menu.Item key={item.key} icon={item.icon}>
                        <Link to={item.key}>
                            {item.title}
                        </Link>
                    </Menu.Item>

                )
            } else {
                return <SubMenu key={item.key} icon={item.icon} title={<span>{item.title}</span>}>
                    {
                        this.getMenuList(item.children)
                    }
                </SubMenu>
            }
        })


    };


    render() {
        console.log(this.props.location.pathname)
        const path = this.props.location.pathname
        const defaultOpenKeys = '/' + this.props.location.pathname.split('/')[1]
        console.log(defaultOpenKeys)
        return (
            <div className='LeftNav'>
                <Link to='/' className='LeftNav-header'>
                    <img src={logo} alt=""/>
                    <h1>后台管理</h1>
                </Link>
                <Menu
                    selectedKeys={[path]}
                    defaultOpenKeys={[defaultOpenKeys]}
                    mode="inline"
                    theme="dark"
                >
                    {
                        this.getMenuList(menuList)
                    }


                    {/* <SubMenu key="sub1" icon={<AppstoreOutlined />} title={<span>商品</span>}>
                        <Menu.Item key="5">
                            <span>
                                <BarsOutlined />
                                <span>品类管理</span>
                            </span>
                        </Menu.Item>
                        <Menu.Item key="6"><span>
                                <ToolOutlined />
                                <span>商品管理</span>
                            </span></Menu.Item>

                    </SubMenu>*/}
                </Menu>
            </div>
        )
    }
}
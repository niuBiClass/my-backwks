import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {memoryUtils, formateDate, removeUserInfo} from '../../utils'
import {getWeather} from '@/api/header'
import {Modal} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import menuConfig from "../../config/menuConfig";
import './index.less'
import LinkButton from "../link-button";

@withRouter
export default class Header extends Component {
    state = {
        day_weather: '',
        currentTime: formateDate(Date.now()),
        day_wind_direction: '',
    }
    /*获取天气*/
    getWeather = () => {
        getWeather().then(res => {
            if (res.status === 200) {
                const {day_weather, day_wind_direction} = res.data.forecast_24h['1']
                this.setState(() => ({day_weather, day_wind_direction}))
            }
        })
    }
    /*获取时间*/
    getCurrentTime = () => {
        this.timer = setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState(() => ({currentTime}))

        }, 1000)

    }
    /*退出登录*/
    loginOut = () => {
        Modal.confirm({
            title: '确认退出',
            icon: <ExclamationCircleOutlined/>,
            // content: '确认退出？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                /*清空保存的用户信息*/
                removeUserInfo()
                memoryUtils.user = {}

                /*跳转到登录界面*/
                this.props.history.replace('/login')
            }
        });
    }
    /*获取标题*/
    getCurrentTitle = () => {
        let title = ''
        const pathname = this.props.location.pathname
        menuConfig.forEach(item => {
            if (pathname === item.key) {
                title = item.title
            } else if (item.children?.length) {
                const itemArr = item.children.find(E =>  pathname.indexOf(E.key)!==-1)
                if (itemArr) {
                    title = itemArr.title
                }
            }
        })
        return title
    }

    componentDidMount() {
        /*获取日期*/
        this.getWeather()
        /*更新当前时间*/
        this.getCurrentTime()
    }

    componentWillUnmount() {
        /*清空定时器*/
        clearInterval(this.timer)
    }

    render() {
        const {currentTime, day_wind_direction, day_weather} = this.state
        const title = this.getCurrentTitle()
        return (
            <div className='Header'>
                <div className='header-top'>
                    <span>
                        欢迎，{memoryUtils.user.username}
                    </span>
                    <LinkButton onClick={this.loginOut}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        {title}
                    </div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{day_wind_direction}</span>
                        <span>{day_weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
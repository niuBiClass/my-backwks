import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {memoryUtils, formateDate} from '../../utils'
import {getWeather} from '@/api/header'
import menuConfig from "../../config/menuConfig";
import './index.less'

@withRouter
export default class Header extends Component {
    state = {
        day_weather: '',
        currentTime: formateDate(Date.now()),
        day_wind_direction:'',
    }
    /*获取天气*/
    getWeather = () => {
        getWeather().then(res => {
            if(res.status === 200){
                const {day_weather,day_wind_direction} = res.data.forecast_24h['1']
                this.setState(()=>({day_weather,day_wind_direction}))
            }
        })
    }
    /*获取时间*/
    getCurrentTime = () => {
        setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState(()=>({currentTime}))

        }, 1000)

    }
    /*获取标题*/
    getCurrentTitle=()=>{
        let title = ''
        const pathname = this.props.location.pathname
        menuConfig.forEach(item=>{
            if(pathname === item.key){
                title = item.title
            }else if(item.children?.length){
                const itemArr = item.children.find(E=>E.key === pathname)
                if(itemArr){
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

    render() {
        const {currentTime,day_wind_direction,day_weather} = this.state
        const title = this.getCurrentTitle()
        return (
            <div className='Header'>
                <div className='header-top'>
                    <span>
                        欢迎，{memoryUtils.user.username}
                    </span>
                    <a href="#!">退出</a>
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
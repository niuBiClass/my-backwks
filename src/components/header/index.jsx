import React, {Component} from 'react'
import {memoryUtils} from '../../utils'
import './index.less'

export default class Header extends Component {
    render() {

        return (
            <div className='Header'>
                <div className='header-top'>
                    <span>
                        欢迎，{memoryUtils.user.username}
                    </span>
                    <a href="javascript:;">退出</a>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        首页
                    </div>
                    <div className='header-bottom-right'>
                        <span>2020-01-01</span>
                        <img src="" alt=""/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
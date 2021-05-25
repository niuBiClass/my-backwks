import App from "./App";
import React from 'react'
import ReactDom from 'react-dom'

import {getUserInfo, memoryUtils} from './utils'

const _userInfo = getUserInfo()
memoryUtils.user = _userInfo
/*读取localStorage中userInfo 存储到内存中*/
ReactDom.render(<App/>, document.getElementById('root'))
import jsonp from 'jsonp'
import axios from "axios";
import {message} from "antd";

const getWeather = (city) => {
    return new Promise((resolve, reject) => {
        jsonp('https://wis.qq.com/weather/common?source=xw&weather_type=forecast_24h&city=哈尔滨市&province=黑龙江',
            {},(err,data)=>{
                if(!err){
                     resolve(data)
                }else {
                    message.error('获取天气失败！')
                }
        })
    })
    // axios.get('http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=3p49MVra6urFRGOT9s8UBWr2',{})
}

export {
    getWeather
}
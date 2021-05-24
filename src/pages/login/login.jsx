import React, { Component } from 'react'
import './login.less'
import logo from '@/static/image/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { login } from '@/api/login'
/*
* 登录的路由组件
* */
export default class Login extends Component {
    formRef = React.createRef()
    /*
   用户名/密码的的合法性要求

   
     1). 必须输入
     2). 必须大于等于4位
     3). 必须小于等于12位
     4). 必须是英文、数字或下划线组成
    */
    initRules = (type) => {
        return [
            {
                required: true,
                whitespace: true,
                message: `${type}必须输入！`,
            },
            {
                max: 12,
                message: `${type}最多12位！`,
            },
            {
                min: 4,
                message: `${type}最少4位！`,
            },
            {
                pattern: !/^[a-zA-Z0-9_]+$/,
                message: `${type}必须是英文、数字或下划线组成！`,
            },

        ]
    }

    componentDidMount() {

    }

    onFinish = values => {
        console.log(values)
        login(values).then(res => {
            console.log(res)
        })
    }
    onFinishFailed = errorInfo => {
        console.log(errorInfo)
    }
    submitInfo = (event) => {
        event.preventDefault()
        console.log(this.formRef)
        this.formRef.current.validateFields().then(value => {
            console.log('校验通过', value)
            login(value).then(res => {
                console.log(res)
            })
        }).catch(errInfo => {
            console.log(errInfo)
        })

    }

    render() {
        // const layout = {
        //     labelCol: {span: 8},
        //     wrapperCol: {span: 16},
        // };
        const tailLayout = {
            wrapperCol: { offset: 0, span: 24 },
        };
        return (
            <div className='login'>
                <header className='login-header'>
                    <img src={logo} alt="" />
                    <h1>React:后台管理项目</h1>
                </header>
                <section className='login-section'>
                    <h2>用户登录</h2>
                    <Form
                        ref={this.formRef}
                        name="normal_login"
                        className="login-form"
                        validateTrigger='onBlur'
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            validateFirst={true}
                            name="username"
                            rules={this.initRules('用户名')}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            validateFirst={true}
                            name="password"
                            rules={[
                                ...this.initRules('密码'),
                                /*(obj) => {
                                    return {
                                        validator(_, value) {
                                            console.log(obj)
                                            if (value === '123') {
                                                return Promise.resolve();
                                            }

                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                        },
                                    }
                                }*/
                            ]}
                        >
                            <Input.Password
                                autoComplete={'on'}
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button onClick={this.submitInfo} type="primary" htmlType="submit"
                                className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

/*
* 高阶函数
*   1：接收函数类型的参数
*   2：返回值是函数
* 常见：定时器：setTimeout/setInterval
*      promise(()=>{}).then().catch()
*      数组的方法
*      函数的bind()方法
*  高阶函数更加动态，更加具有扩展性
* */

/*
* 高阶组件
*   1.本质就是一个函数
*   2.接收一个组件，返回一个新组件，新组建内部渲染接收的组件，会向接收的组件传入特定的属性
*   3.扩展组件的功能
*
* */
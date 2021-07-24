import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from "./home";
import detail from "./detail";
import addUpdate from './addUpdate'
/*商品*/
export default class Product extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/products/product' component={Home} exact/>
                    <Route path='/products/product/detail' component={detail}/>
                    <Route path='/products/product/addUpdate' component={addUpdate}/>
                    <Redirect to='/products/product'/>
                </Switch>
            </div>
        )
    }
}
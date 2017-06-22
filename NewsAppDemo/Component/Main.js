/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';
//引入外部组件
var Home = require('../Component/Home');
var Find = require('../Component/Find');
var Message = require('../Component/Message');
var Me = require('../Component/Me');

class Main extends Component {
	 //设置初始值
  constructor(props){
    super(props);
    
    this.state={
        //默认item
        selectItem:'首页'
    };
  };
  render() {
    return (
      <TabBarIOS
         tintColor = "orange"
         >
          {/*第一个*/}
         <TabBarIOS.Item
                icon={{uri:"tabbar_home",scale:2}}
                title="首页"
                selected={this.state.selectItem == '首页'}
                onPress = {()=>{this.setState({selectItem: '首页'})}}
            >
            <NavigatorIOS
                tintColor = "orange"
                initialRoute={{
                component: Home,
                title: '首页',
                leftButtonIcon:{uri:'navigationbar_friendattention',scale:2},
                rightButtonIcon:{uri:'navigationbar_pop',scale:2}
              }}
              style={{flex: 1}}
            />

           
          </TabBarIOS.Item>
          {/*第二个*/}
          <TabBarIOS.Item 
            icon={{uri:"tabbar_discover",scale:2}}
            title="搜索"
            selected={this.state.selectItem == '搜索'}
            onPress = {()=>{this.setState({selectItem: '搜索'})}}
            >
             <NavigatorIOS
                initialRoute={{
                component: Find,
                title: '发现',

              }}
              style={{flex: 1}}
            />
          </TabBarIOS.Item>
          {/*第三个*/}
          <TabBarIOS.Item
            icon={{uri:"tabbar_message_center",scale:2}}
            title="消息"
            selected={this.state.selectItem == '消息'}
            onPress = {()=>{this.setState({selectItem: '消息'})}}
          >
           <NavigatorIOS
                initialRoute={{
                component: Message,
                title: '消息',
              }}
              style={{flex: 1}}
            />
          </TabBarIOS.Item>
          {/*第四个*/}
          <TabBarIOS.Item
            icon={{uri:"tabbar_profile",scale:2}}
            title="我的"
            selected={this.state.selectItem == '我的'}
            onPress = {()=>{this.setState({selectItem: '我的'})}}
          >
            <NavigatorIOS
                initialRoute={{
                component: Me,
                title: '我的',
              }}
              style={{flex: 1}}
            />
          </TabBarIOS.Item>
         </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
 
});

module.exports = Main;

//输出类
// AppRegistry.registerComponent('Main', () => Main);
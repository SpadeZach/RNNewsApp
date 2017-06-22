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
  ScrollView,
  Image
} from 'react-native';


//引入计时器类库
var TimerMixin = require('react-timer-mixin');


var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
class WheelView extends Component {
  //设置可变的初始值
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      //所有Image对象
      imageDataArr:[]
    };
  };
  //时至固定值
  static defaultProps = {
        //每隔多少时间
        duration:3000,
  }; 
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
        //水平滚动
          horizontal={true}
          //隐藏水平滚动条
          showsHorizontalScrollIndicator={false}
          //自动分页
          pagingEnabled={true}
          //一帧滚动结束
          onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
          ref="scrollView"
          // 开始拖拽
          onScrollBeginDrag={this.onScrollBeginDrag}
          // 停止拖拽
          onScrollEndDrag={this.onScrollEndDrag}
        >
           {this.renderAllImage()}
        </ScrollView>
        {/*返回pageControl*/}
        <View style={styles.pageViewStyle}>
          {this.renderPageContol()}
        </View>
      </View>
    );
  };
  componentDidMount(){
    //开启定时器
    this.startTimer();
  };
  //返回图片
  renderAllImage(){
    //数组
    var allImgArr = [];
    //拿到data
    var imgArr = this.props.imageDataArr;
    //遍历
    for (var i = 0; i < imgArr.length; i++) {
       //取出对象
       var imgObject = imgArr[i];
       //创建组件装入数组
      allImgArr.push(
        <Image key={i} source={{uri:"https://morgoth-aman.huainanhai.com/banner/249/8208889"}} style={{width:width,height:200}}/>
      );
    }
    //返回数组
    return allImgArr;
  }
  //返回所有pageContol
  renderPageContol(){
    var style;
    //定义一个数组放置圆点
    var pageContolArr = [];
    //图片数组
    var imgArr = this.props.imageDataArr;
    //遍历
    for (var i = 0; i < imgArr.length; i++) {
      //判断
      style = (i == this.state.currentPage) ? {color:'red'} : {color:'#fff'};

      pageContolArr.push(
        <Text key={i} style={[{fontSize:25},style]}>&bull;</Text>
      );
    }
    return pageContolArr;
  }
  //一帧滚动结束
  onAnimationEnd(e){
    //1.偏移量
    var offsetX = e.nativeEvent.contentOffset.x;
    //2. 求出当前也出
    var current = Math.floor(offsetX / width);
    //3.更新
    this.setState({
      currentPage:current
    });
  };
  //开启定时器
  startTimer(){
    //1.拿到scrollView
    var scrollView = this.refs.scrollView;
     //图片数组
    var imgCount = this.props.imageDataArr.length;
    //2.添加定时器
    this.timer = setInterval(()=>{
      alert(1);
      //2.1设置圆点
      var activePage = 0;
      //2.2判断

      if ((this.state.currentPage + 1)>=imgCount) {
        //越界
        activePage = 0;

      }else{
        activePage = this.state.currentPage + 1;
      }
      //2.3更新UI
      this.setState({
        currentPage:activePage
      });
      //2.4 让scrollView滚动起来
      var offsetX = activePage * width;
      scrollView.scrollResponderScrollTo({x:offsetX, y:0, animated:true});
      
      clearInterval(this.timer);
    },this.props.duration);

  };
  // 调用开始拖拽
    onScrollBeginDrag(){
       // 停止定时器
       clearInterval(this.timer);
    };

    // 调用停止拖拽
   // onScrollEndDrag(){
   //   // 开启定时器
     // this.startTimer();
   // };
}

const styles = StyleSheet.create({
   container:{
    marginTop:20,
   },
   pageViewStyle:{
    width:width,
    height:40,
    backgroundColor:'rgba(0,0,0,0.5)',
    //定位
    position:'absolute',
    bottom:0,
    //设置主轴方向
    flexDirection:'row',
    //侧轴对齐方式
    alignItems:'center'
   }
});

module.exports = WheelView;

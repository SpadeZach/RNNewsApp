import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity
} from 'react-native';


//导入外部的组件
var ScrollImage = require('../Component/WheelView');


var HomeDetailView = require('../Component/HomeDetail');
class Home extends Component {
  static defaultProps = {
    
        url_api:"https://sindar.huainanhai.com/front_page/list?cookie=%7B%22cate_ids%22%3A%228%22%7D&device=iPhone6%2C2&end=0&limit=20&login_user_id=0&module_id=banner%2Cbroadcast%2Centrance%2Cdaily_elite%2Celite_cate%2Crecommend&pcid=&phone_sn=3dc3867a1ccf293cdff4c93c58f5ad7cc18e9a64&session_id=&start=0&user_agent=Mozilla%2F5.0%20%28iPhone%3B%20CPU%20iPhone%20OS%2010_3_1%20like%20Mac%20OS%20X%29%20AppleWebKit%2F603.1.30%20%28KHTML%2C%20like%20Gecko%29%20Mobile%2F14E304%20avari%2F4.2.20%20hnh_4.2.20%20screen-size%3A320%2A568&version=4.2.20",
        // url_api:"https://facebook.github.io/react-native/movies.json",
        key_word:"front_page"
    }; 

  //初始化
  constructor(props){
    super(props);
    this.state={
      //listView头部数据
      headerDataArr:[],
      //cell数据
      dataSource:new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 != r2
      }),

    };
  }

  render() {
    return (
     <ListView 
     dataSource={this.state.dataSource}
     renderRow ={this.renderRow=this.renderRow.bind(this)}
     renderHeader={this.renderHeader=this.renderHeader.bind(this)}
     />
    );
  };

  //头部
  renderHeader(){
    if (this.state.headerDataArr.length == 0) return; 
    return (
    <ScrollImage
      imageDataArr = {this.state.headerDataArr}
    />


    );
  }
  

  //单独的一个cell
  renderRow(rowData){
    return(
      <TouchableOpacity activeOpacity={0.5} 
      onPress={()=>{this.pushToNewsDetail(rowData)}}
       
      >
        <View style={styles.cellViewStyle}>
          <Image source={{uri:'https://morgoth-aman.huainanhai.com/elite/1706090016349524240/8219943'}} style={styles.imgStyle}/>
          <View style={styles.rightViewStyle}>
            <Text style={styles.titleStyle}>{rowData.title}</Text>
            <Text style={styles.flowTitleStyle}>{rowData.create_user.user_name}</Text>
          </View>
        </View>
        
      </TouchableOpacity>
    )
  }
    // 跳转到新闻详情页
    pushToNewsDetail(rowData){

        // alert(rowData.title);
        this.props.navigator.push({
            component: HomeDetailView,
            title: rowData.title,
            passProps:{rowData}
        })
    }

  //请求网络数据
  componentDidMount(){
    this.loadDataFromNet();
  };

  loadDataFromNet(){
    fetch(this.props.url_api)
    .then((response)=>response.json())
    .then((responseData)=>{
      //拿到数据
      var jsonData = responseData.data;
      this.dealWithData(jsonData);

    })
    .catch((error)=>{
      //捕获异常
      if (error) {

      }
    })
  };
  
  // 处理网络数据
  dealWithData(jsonData){
    var headerArr = [];
    headerArr = jsonData.banner;
     this.setState({
      headerDataArr:headerArr,
      dataSource:this.state.dataSource.cloneWithRows(jsonData.list)
    })

  }
  
}

const styles = StyleSheet.create({
  cellViewStyle:{
    //确定主轴方向
    flexDirection:'row',
    padding:10,
    borderBottomColor:'#E6E6E6',
    borderWidth:0.5
  },
  rightViewStyle:{
    width:260,
    marginLeft:8
  },
  imgStyle:{
    width:80,
    height:80,
  },
  titleStyle:{
    fontSize:16,
    marginBottom:5
  },
  flowTitleStyle:{
    //绝对定位
    position:'absolute',
    left:0,
    bottom:5,
    // borderWidth:0.5,
    // borderColor:'gray',
    // borderRadius:5
    color:'gray'
  }
});

module.exports = Home;
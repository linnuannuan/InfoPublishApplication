import React, { useState, useEffect } from 'react';
import {Upload, Input, Radio, Select, NumberPicker, Avatar, Card, Tab, ResponsiveGrid, Table, Typography,  Button, Form, Message, Box,  Dialog, List, Icon} from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';
const Option = Select.Option;

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;


const userType = window.sessionStorage.getItem('type')

const isManager = (userType == 'manager')

const isVip = (userType == 'vip' || userType == 'manager')


const MockJoinList = [
  // {
  //   id:1,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // },
  // {
  //   id:2,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // },
  // {
  //   id:3,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // },
  // {
  //   id:4,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // },
  // {
  //   id:5,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // },
  // {
  //   id:6,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // },
  // {
  //   id:7,
  //   title:'上海一片天餐饮管理股份有限公司',
  //   telephone: 15911002198,
  //   email:'apdadas@mail.com',
  //   applyTime:'2020-01-02',
  //   address:"西安",
  //   concont:"一家公司"
  // }
]

const SettingSystemBlock: React.SFC = (props): JSX.Element => {
  const {
    // dataSource = DEFAULT_DATA,
  } = props;

  const [vipList, setVipList] = useState([]);
  const [joinList, setJoinList] = useState([]);
  const [investList, setInvestList] = useState([]);
  const [zhaobiaoList, setZhaobiaoList] = useState([]);
  const [vipStatus,setVipStatus]= useState(false)

  
  const [joinStatus, setJoinStatus] = useState([]);
  const [inited, setInited] = useState(false);

  
  const isPhone = typeof navigator !== 'undefined' &&
                    navigator &&
                    navigator.userAgent.match(/phone/gi);

  useEffect(() => {
    refreshInitData()
  }, [inited]);


  const checkLogin=(response)=>{
    if(response.data.msg == "未登录"){
        Message.warning("请登录！")
        window.location.href='/#/user/login';
        return false
    }
    return true
  }


  
  const refreshInitData=()=>{
    //加盟
    axios.get('/user/joinApplyList')
    .then(function (response) {
      
      if(checkLogin(response)){
        setJoinList(response.data.data.zhaoshangApplyList);
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //招商 
    axios.get('/user/zhaoshangApplyList')
    .then(function (response) {
      if(checkLogin(response)){
       setInvestList(response.data.data.zhaoshangApplyList);
      }
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //转让 
    axios.get('/user/zhaobiaoApplyList')
    .then(function (response) {
      if(checkLogin(response)){
        setZhaobiaoList(response.data.data.zhaoshangApplyList);
      } 
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //VIP 
    axios.get('/vip/vipInfoApplyList')
    .then(function (response) {
      setVipList(response.data.data.infoList);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


    //VIP开通状态查询 
    axios.get('/user/vipApplyList')
    .then(function (response) {
      setVipStatus(response.data.data.data);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    //联系状态查询
    axios.get(isManager?'/manage/wantJoinList':'/user/myJoinList')
    .then(function (response1) {
      if(isVip){
        axios.get(isManager?'/manage/wantJoinInfoList':'/vip/myJoinList')
            .then(function (response2) {

                    setJoinStatus(isManager?response1.data.data.list.concat(response2.data.data.list):response1.data.data.joinList.concat(response2.data.data.joinList));
                    console.log(response1,response2);
                  })
            .catch(function (error) {
              console.log(error);
            });
      }
      else{
        setJoinStatus(response1.data.data.joinList)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }


  //根据设备显示内容
  const renderPublishContent=(dataSource)=>{
    if(isPhone){
      return <Table dataSource={dataSource}  size="small" hasBorder={false}>
                {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}

                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="company" title="标题" />
                <Table.Column dataIndex="address" title="地址" />
                <Table.Column dataIndex="applyTime"  title="申请时间"/>

                <Table.Column title="审核状态" cell={(value,index,record) => {
                  // varify 审核通过否，申请通过标志,0表示未审核，1表示审核通过，2表示未通过
                    if(record.verifyFlag == 1){
                      return <>已通过<Icon type="success" /></>
                    }
                    if(record.verifyFlag == 2){
                      return <>已拒绝<Icon type="error" /></>
                    }
                    else{
                      return <>待审核</>
                    }
                  }}>

                </Table.Column>
              </Table>
    }
    return <Table dataSource={dataSource}  hasBorder={false}>
    {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}

    <Table.Column dataIndex="id" title="序号" />
    <Table.Column dataIndex="company" title="标题" />
    <Table.Column dataIndex="content" title="介绍" />
    <Table.Column dataIndex="address" title="地址" />
    <Table.Column dataIndex="telephone" title="电话" />
    <Table.Column dataIndex="applyTime"  title="申请时间"/>

    <Table.Column title="审核状态" cell={(value,index,record) => {
      // varify 审核通过否，申请通过标志,0表示未审核，1表示审核通过，2表示未通过
        if(record.verifyFlag == 1){
          return <>已通过<Icon type="success" /></>
        }
        if(record.verifyFlag == 2){
          return <>已拒绝<Icon type="error" /></>
        }
        else{
          return <>待审核</>
        }
      }}>

    </Table.Column>
  </Table>
  }







  return (
    <div className={styles.SettingPersonBlock}>
      <Tab className={styles.customTab} navClassName={styles.customTabHead}>
    
      <Tab.Item title="查看已发布信息" key="info">
          <Card free contentHeight={600}>
            <Card.Header 
              title="招商"/>
            <Card.Content>
                {renderPublishContent(investList)}
            </Card.Content>
          </Card>
      </Tab.Item>
   
      <Tab.Item title="查看已发布信息" key="info">
          <Card free contentHeight={600}>
            <Card.Header title="加盟"/>
            <Card.Content>
                {renderPublishContent(joinList)}
             </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="查看已发布信息" key="info">
          <Card free contentHeight={600}>
             <Card.Header title="招标"/>
             <Card.Content>
              {renderPublishContent(zhaobiaoList)}
             </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="查看已发布信息" key="info">
          <Card free contentHeight={600}>
             <Card.Header title="VIP"/>
             <Card.Content>
                {renderPublishContent(vipList)}
             </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="申请状态查询" key="help">
          <Card free contentHeight={600}>
            <Card.Header
              title="申请加入状态"
            />
            <Card.Content>
              <Table dataSource={joinStatus} hasBorder={false}>
                <Table.Column title="序号" dataIndex="id" />
                <Table.Column title="项目名称" dataIndex="company" />
                <Table.Column title="项目邮箱" dataIndex="apply_email" />
                <Table.Column title="项目电话号码" dataIndex="apply_telephone" />   

                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="电话号码" dataIndex="telephone" />                
                {/* <Table.Column dataIndex="period" /> */}
                <Table.Column title="申请时间" dataIndex="join_time" />
                <Table.Column cell={(value,index,record) => {
                    if(!!record.deal_flag){
                      return <>已受理<Icon type="success" />
                             </>
                    }
                    else{
                      return <>待受理</>
                    }
                }}></Table.Column>
                    
              </Table>
            </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="申请状态查询" key="help">
          <Card free contentHeight={600}>
            <Card.Header
              title="VIP审核状态"
            />
            <Card.Content>
              <Table dataSource={vipStatus} hasBorder={false}>
                <Table.Column title="申请类型" dataIndex="vipType" cell= {(value) => {return value==1?<span>正式VIP</span>:<span>体验VIP</span>}}/>
                <Table.Column title="申请时间" dataIndex="applyTime" />
                <Table.Column title="审核状态" dataIndex="verifyFlag" cell= {(value) => {return (value== 0?<span>未审核</span>:(value== 1?<span>已通过</span>:<span>已拒绝</span>))}}/>
                <Table.Column title="审核时间" dataIndex="verifyTime" />                    
              </Table>
            </Card.Content>
          </Card>
        </Tab.Item>

      </Tab>
    </div>
  );
};

export default SettingSystemBlock;

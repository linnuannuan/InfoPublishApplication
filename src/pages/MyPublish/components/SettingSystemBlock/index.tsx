import React, { useState, useEffect } from 'react';
import {Upload, Input, Radio, Select, NumberPicker, Avatar, Card, Tab, ResponsiveGrid, Table, Typography,  Button, Form, Message, Box,  Dialog, List, Icon} from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';
const Option = Select.Option;

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

const userType = 'manager'
// const userType = window.localStorage.getItem('type')

const MockJoinList = [
  {
    id:1,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  },
  {
    id:2,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  },
  {
    id:3,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  },
  {
    id:4,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  },
  {
    id:5,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  },
  {
    id:6,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  },
  {
    id:7,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    applyTime:'2020-01-02',
    address:"西安",
    concont:"一家公司"
  }
]




const SettingSystemBlock: React.SFC = (props): JSX.Element => {
  const {
    // dataSource = DEFAULT_DATA,
  } = props;

  const [vipList, setVipList] = useState([]);

  const [joinList, setJoinList] = useState([]);
  const [investList, setInvestList] = useState([]);
  const [zhaobiaoList, setZhaobiaoList] = useState([]);

  const [inited, setInited] = useState(false);

  useEffect(() => {
    setVipList(MockJoinList)
    setJoinList(MockJoinList)
    setInvestList(MockJoinList)
    setZhaobiaoList(MockJoinList)
    setInited(true);
  }, [inited]);


  const refreshInitData=()=>{
    //加盟
    axios.get('/user/joinList')
    .then(function (response) {
      setJoinList(response.data.joinList);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //招商 
    axios.get('/user/zhaoshangApplyList')
    .then(function (response) {
      setInvestList(response.data.joinList);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //转让 
    axios.get('/user/zhaobiaoList')
    .then(function (response) {
      setZhaobiaoList(response.data.joinList);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    //VIP 
    // axios.get('/user/joinList')
    // .then(function (response) {
    //   setJoinList(response.data.joinList);
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }


  refreshInitData()

  return (
    <div className={styles.SettingPersonBlock}>
      <Tab className={styles.customTab} navClassName={styles.customTabHead}>
    
      <Tab.Item title="招商信息" key="invest">
          <Card free contentHeight={600}>
            <Card.Header/>
             <Card.Content>
              <Table dataSource={investList}  hasBorder={false}>
                {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}

                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="title" title="标题" />
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
            </Card.Content>
          </Card>
      </Tab.Item>
   
      <Tab.Item title="加盟信息" key="join">
          <Card free contentHeight={600}>
            <Card.Header/>
             <Card.Content>
              <Table dataSource={joinList}  hasBorder={false}>
                {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}

                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="title" title="标题" />
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
            </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="招标转让信息" key="zhaobiao">
          <Card free contentHeight={600}>
            <Card.Header/>
             <Card.Content>
              <Table dataSource={zhaobiaoList}  hasBorder={false}>
                {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}

                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="title" title="标题" />
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
            </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="VIP信息区" key="vip">
          <Card free contentHeight={600}>
            <Card.Header/>
             <Card.Content>
              <Table dataSource={vipList}  hasBorder={false}>
                {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}

                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="title" title="标题" />
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
            </Card.Content>
          </Card>
      </Tab.Item>
      <Tab.Item title="联系状态查询" key="help">
          <Card free contentHeight={600}>
            <Card.Header
              title="信息促成"
            //   extra={
            //     <Box spacing={10} direction="row">
            //       <Button type="secondary">设置角色 1 权限</Button>
            //       <Button type="primary">新增</Button>
            //     </Box>
            // }
            />
            <Card.Content>
              <Table dataSource={joinList} hasBorder={false}>
                <Table.Column title="序号" dataIndex="id" />
                <Table.Column title="项目名称" dataIndex="title" />
                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="电话号码" dataIndex="telephone" />
                {/* <Table.Column dataIndex="period" /> */}
                <Table.Column title="申请时间" dataIndex="time" />
                <Table.Column cell={(value,index,record) => {
                    if(record.dealFlag){
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
   

      </Tab>
    </div>
  );
};

export default SettingSystemBlock;

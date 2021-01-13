import React, { useState, useEffect } from 'react';
import {Upload, Input, Radio, Select, NumberPicker, Avatar, Card, Tab, ResponsiveGrid, Table, Typography,  Button, Form, Message, Box,  Dialog, List,  } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';
const Option = Select.Option;

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

const userType = 'manager'
// const userType = window.localStorage.getItem('type')

const MockData = [
  {
    id:1,
    applyUserName: '阿不思·布萊恩·鄧不利多',
    vipType: '正式',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:1
    //会员时长
    // period:'12个月'c
  },
  {
    id:2,
    applyUserName: '戒钱',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:0

    //会员时长
    // period:'3天'
  },
  {
    id:3,
    applyUserName: '格林德沃',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:1

    //会员时长
    // period:'15天'
  },
  {
    id:4,
    applyUserName: '哈利玻特',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:0

    //会员时长
    // period:'3个月'
  },
  {
    id:5,
    applyUserName: '小天狼星',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:1
    //会员时长
    // period:'3个月'
  },
  {
    id:6,
    applyUserName: '罗恩',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:0

    //会员时长
    // period:'3个月'
  },
  {
    id:7,
    applyUserName: '伏地魔',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:1,
    //会员时长
    period:'3个月'
  },
  {
    id:8,
    applyUserName: '赫敏',
    vipType: '体验',//  体验/正式
    //发起申请时间
    applyTime:'2020-10-28',
    verifyFlag:1,
    //会员时长
    period:'3个月'
  },
];

const MockApplyData = [
  {
    id:1,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  },
  {
    id:2,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  },
  {
    id:3,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  },
  {
    id:4,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  },
  {
    id:5,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  },
  {
    id:6,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  },
  {
    id:7,
    title:'上海一片天餐饮管理股份有限公司',
    telephone: 15911002198,
    email:'apdadas@mail.com',
    time:'2020-01-02'
  }
]


export interface SettingData {
  tvipCount?: number;
  tvipUnit?: string;
  vipCount?: number;
  vipUnit?: string;
  vipMaxNum?: number;
  vipStatus?: number;
}

export interface SettingSystemProps {
  SettingData?: List;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: SettingData = {
  vipCount: 1,
  vipUnit: 'YEAR',
  tvipCount: 11,
  tvipUnit: 'DAY',
  vipMaxNum:10,
  vipStatus:0
}




const DEFAULT_ON_SUBMIT = (values: SettingSystemProps, errors: []): void => {
  if (errors) {
    console.log('errors', errors);
    return;
  }
  console.log('values:', values);
  Message.success('更新成功');
};

const SettingSystemBlock: React.SFC<SettingSystemProps> = (props): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSubmit = DEFAULT_ON_SUBMIT,
  } = props;

  const [vipList, setVipList] = useState([]);
  const [applyData, setApplyData] = useState([]);
  const [inited, setInited] = useState(false);
  const [postData, setValue] = useState<SettingSystemProps>(dataSource);

  useEffect(() => {
    setVipList(MockData);
    setApplyData(MockApplyData)
    setInited(true);
  }, [inited]);


  //查询vip申请
  const refreshVipData=()=>{
    axios.get('/manage/vipApply')
    .then(function (response) {
      setVipList(response.data.data.vipApplyList);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  refreshVipData()

  //查询加入申请
  const refreshJoinData=()=>{
    axios.get('/manage/joinList')
    .then(function (response) {
      setApplyData(response.data.data.joinList);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  refreshJoinData()


  //查询系统初始设置
  const getSettingData=()=>{
    axios.get('/manage/sysSetting')
    .then(function (response) {
      setValue({
        vipStatus:response.data.data.list.find(d=>d.id==1)?.value,
        tvipCount:response.data.data.list.find(d=>d.id==2)?.value,
        tvipUnit:response.data.data.list.find(d=>d.id==2)?.unit,
        vipCount:response.data.data.list.find(d=>d.id==3)?.value,
        vipUnit:response.data.data.list.find(d=>d.id==3)?.unit,
        vipMaxNum:response.data.data.list.find(d=>d.id==4)?.value,
      });
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  getSettingData()



  const formChange = (values: SettingSystemProps): void => {
    setValue(values);
  };

  //vip审核通过
  const handleSubmit =(id,role)=>{
    axios.get('/manage/dealVipApply',{
       params:{
          flag:1,
          role:role,
          id:id,
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleReject =(id,role)=>{
    axios.get('/manage/dealVipApply', 
      {
        params:{
          flag:2,
          role:role,
          id:id,
        }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //信息已促成
  const handleJoinSubmit =(id,role)=>{
    axios.get('/manage/dealJoin', {
      params:
      {
        id:id,
      }
    }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  //确定设置数值
  const submitBasic =()=>{
    axios.get('/manage/vipOpenSetting', 
      {
        params:{
          flag:postData.vipStatus
        }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


    axios.get('/manage/vipOpenDaysSetting', 
      {
        params:{
          days: postData.tvipCount,
          unit: postData.tvipUnit,
        }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/manage/vipOpenMonthsSetting', 
      {
        params:{
          month: postData.vipCount,
          unit: postData.vipUnit,
        }}
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


    axios.get('/manage/InfoUpNumSetting', 
      {
        params:{
          num: postData.vipMaxNum
        }
      }
    )
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  if(userType != 'manager'){
    return <p>当前用户无后台管理权限!</p>
  }

  else return (
    <div className={styles.SettingPersonBlock}>
      <Tab className={styles.customTab} navClassName={styles.customTabHead}>
    
             
      <Tab.Item title="基础设置" key="basic">
          <Card free>
            <Card.Content>
              <Box className={styles.baseSettingContainer}>
                <Form
                  className={styles.baseSetting}
                  value={postData}
                  labelAlign="left"
                  onChange={formChange}
                  // responsive
                >
                  
                  <FormItem label="招商信息发布条数上限" colSpan={12}>
                      <NumberPicker name="vipMaxNum" type="inline" step={1} min={0} max={30} defaultValue={postData.vipMaxNum} ></NumberPicker>
                      &nbsp;&nbsp;条
                  </FormItem>
                  <FormItem label="会员体验" colSpan={12}>
                      <NumberPicker name="tvipCount" type="inline" step={1} min={0} max={30} defaultValue={postData.tvipCount} ></NumberPicker>
                      <Select
                          name="tvipUnit"
                          defaultValue={postData.tvipUnit}
                          aria-label="unit is"
                      >
                        <Option value="DAY">天</Option>
                        <Option value="MONTH">月</Option>
                        <Option value="YEAR">年</Option>
                      </Select>
                      {/* <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit> */}
                  </FormItem>
                  <FormItem label="正式会员" colSpan={12}>
                      <NumberPicker name="vipCount" type="inline" step={1} min={0} max={30} defaultValue={postData.vipCount} ></NumberPicker>
                      <Select
                          name="vipUnit"
                          defaultValue={postData.vipUnit}
                          aria-label="unit is"
                      >
                        <Option value="DAY">天</Option>
                        <Option value="MONTH">月</Option>
                        <Option value="YEAR">年</Option>
                      </Select>
                      {/* <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit> */}
                  </FormItem>
                  <FormItem colSpan={12} label="VIP板块开启状态" >
                    <Radio.Group name="vipStatus" defaultValue={postData.vipStatus}>
                      <Radio id="open" value={1}>开启</Radio>
                      <Radio id="close" value={0}>关闭</Radio>
                    </Radio.Group>
                  </FormItem>

                  <FormItem colSpan={12}>
                    <Box spacing={8} direction="row">
                      <Form.Submit
                        type="primary"
                        onClick={submitBasic}
                        validate
                      >保存
                      </Form.Submit>
                    </Box>
                  </FormItem>
                </Form>
              </Box>
            </Card.Content>
          </Card>
        </Tab.Item>

      <Tab.Item title="会员审核" key="check">
          <Card free contentHeight={600}>
            <Card.Header
              title="会员申请"
            //   extra={
            //     <Box spacing={10} direction="row">
            //       <Button type="secondary">设置角色 1 权限</Button>
            //       <Button type="primary">新增</Button>
            //     </Box>
            // }
            />
            <Card.Content>
              <Table dataSource={vipList}  hasBorder={false}>
                {/* <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} /> */}
                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="applyUserId" title="用户ID" />
                <Table.Column dataIndex="applyUserName" title="姓名"/>
                <Table.Column dataIndex="vipType" title="会员类型"/>
                {/* <Table.Column dataIndex="period" /> */}
                <Table.Column dataIndex="applyTime"  title="申请时间"/>
                <Table.Column cell={(value,index,record) => {
                    if(record.verifyFlag){
                      return <>
                                <Button type="secondary" onClick={handleSubmit.bind(this, record.id,record.vipType)}>通过</Button>
                                <Button onClick={handleReject.bind(this, record.id,record.vipType)}>拒绝</Button>
                            </>
                    }
                    else{
                      return <Button disabled>已审核</Button>
                    }
                  }}>

                </Table.Column>
                  
                  
              </Table>
            </Card.Content>
          </Card>
        </Tab.Item>
   
      <Tab.Item title="信息促成" key="help">
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
              <Table dataSource={applyData} hasBorder={false}>
                <Table.Column title="序号" dataIndex="id" />
                <Table.Column title="申请人" dataIndex="username" />
                <Table.Column title="项目名称" dataIndex="title" />
                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="电话号码" dataIndex="telephone" />
                {/* <Table.Column dataIndex="period" /> */}
                <Table.Column title="申请时间" dataIndex="joinTime" />
                <Table.Column cell={(value,index,record) => {
                    if(record.dealFlag){
                      return <>
                                <Button type="secondary" onClick={handleJoinSubmit.bind(this, record.id)}>已促成</Button>
                             </>
                    }
                    else{
                      return <Button disabled>已促成</Button>
                    }
                }}></Table.Column>
                    
              </Table>
            </Card.Content>
          </Card>
        </Tab.Item>
   

        {/* <Tab.Item title="更多设置" key="more">
          <Card free>
            <Card.Content>
              <Box spacing={12}>
                <Typography.H3 className={styles.h3}>退出项目</Typography.H3>
                <Typography.Text className={styles.p}>一旦你退出这个项目，你将无法访问这个项目的任何内容。</Typography.Text>
                <span>
                  <Button type="normal" warning onClick={onExitButtonClicked}>退出项目</Button>
                </span>
              </Box>
            </Card.Content>
          </Card>
        </Tab.Item> */}
      </Tab>
    </div>
  );
};

export default SettingSystemBlock;

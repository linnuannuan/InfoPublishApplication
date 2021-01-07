import React, { useState, useEffect } from 'react';
import {Upload, Input, Radio, Select, NumberPicker, Avatar, Card, Tab, ResponsiveGrid, Table, Typography,  Button, Form, Message, Box,  Dialog, List,  } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';
const Option = Select.Option;

const { Cell } = ResponsiveGrid;
const FormItem = Form.Item;

const userType = window.localStorage.getItem('type')

const MockData = [
  {
    id:1,
    name: '阿不思·布萊恩·鄧不利多',
    logo: 'https://img.alicdn.com/tfs/TB1WsE2n5_1gK0jSZFqXXcpaXXa-183-183.png',
    type: '正式',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    // period:'12个月'c
  },
  {
    id:2,
    name: '戒钱',
    logo: 'https://img.alicdn.com/tfs/TB1cjwYnVT7gK0jSZFpXXaTkpXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    // period:'3天'
  },
  {
    id:3,
    name: '格林德沃',
    logo: 'https://img.alicdn.com/tfs/TB1l7g0nYr1gK0jSZR0XXbP8XXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    // period:'15天'
  },
  {
    id:4,
    name: '哈利玻特',
    logo: 'https://img.alicdn.com/tfs/TB1WUurnubviK0jSZFNXXaApXXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    // period:'3个月'
  },
  {
    id:5,
    name: '小天狼星',
    logo: 'https://img.alicdn.com/tfs/TB10Ts2n1L2gK0jSZFmXXc7iXXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    // period:'3个月'
  },
  {
    id:6,
    name: '罗恩',
    logo: 'https://img.alicdn.com/tfs/TB1HHwYnVY7gK0jSZKzXXaikpXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    // period:'3个月'
  },
  {
    id:7,
    name: '伏地魔',
    logo: 'https://img.alicdn.com/tfs/TB1T_WrnubviK0jSZFNXXaApXXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
    //会员时长
    period:'3个月'
  },
  {
    id:8,
    name: '赫敏',
    logo: 'https://img.alicdn.com/tfs/TB1D_GrnubviK0jSZFNXXaApXXa-183-183.png',
    type: '体验',//  体验/正式
    //发起申请时间
    time:'2020-10-28',
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
  vipStatus?: boolean;
}

export interface SettingSystemProps {
  SettingData?: List;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const DEFAULT_DATA: SettingData = {
  vipCount: 1,
  vipUnit: 'year',
  tvipCount: 11,
  tvipUnit: 'day',
  vipMaxNum:10,
  vipStatus:false
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


  const formChange = (values: SettingSystemProps): void => {
    setValue(values);
  };

  //审核通过
  const handleSubmit =(id)=>{
    axios.post('/settingTime', 
      id
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
    axios.post('/settingData', 
      postData
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
                      <NumberPicker name="vipMaxNum" type="inline" step={1} min={0} max={30} defaultValue={0} ></NumberPicker>
                      &nbsp;&nbsp;条
                  </FormItem>
                  <FormItem label="会员体验" colSpan={12}>
                      <NumberPicker name="tvipCount" type="inline" step={1} min={0} max={30} defaultValue={0} ></NumberPicker>
                      <Select
                          name="tvipUnit"
                          defaultValue="day"
                          aria-label="unit is"
                      >
                        <Option value="day">天</Option>
                        <Option value="month">月</Option>
                        <Option value="year">年</Option>
                      </Select>
                      {/* <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit> */}
                  </FormItem>
                  <FormItem label="正式会员" colSpan={12}>
                      <NumberPicker name="vipCount" type="inline" step={1} min={0} max={30} defaultValue={0} ></NumberPicker>
                      <Select
                          name="vipUnit"
                          defaultValue="day"
                          aria-label="unit is"
                      >
                        <Option value="day">天</Option>
                        <Option value="month">月</Option>
                        <Option value="year">年</Option>
                      </Select>
                      {/* <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit> */}
                  </FormItem>
                  <FormItem colSpan={12} label="VIP板块开启状态" >
                    <Radio.Group name="vipStatus">
                      <Radio id="open" value={true}>开启</Radio>
                      <Radio id="close" value={false}>关闭</Radio>
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
                <Table.Column dataIndex="logo" cell={url => <Avatar src={url} />} width={50} />
                <Table.Column dataIndex="id" title="序号" />
                <Table.Column dataIndex="name" title="姓名"/>
                <Table.Column dataIndex="type" title="会员类型"/>
                {/* <Table.Column dataIndex="period" /> */}
                <Table.Column dataIndex="time"  title="申请时间"/>
                <Table.Column cell={(value,index,record) => <Button onClick={handleSubmit.bind(this, record.id)}>审核通过</Button>}></Table.Column>
                {/* <Table.Column cell={(value,index,record) => 
                  <Form
                    // className={styles.baseSetting}
                    value={postData[index]}
                    inline
                    onChange={formChange}
                    // responsive
                  >
                    <FormItem >
                      <NumberPicker name="count" type="inline" step={1} min={0} max={30} defaultValue={0} ></NumberPicker>
                    </FormItem>
                    <FormItem >
                      <Select
                          name="unit"
                          defaultValue="day"
                          aria-label="unit is"
                      >
                        <Option value="day">天</Option>
                        <Option value="month">月</Option>
                        <Option value="year">年</Option>
                      </Select>
                    </FormItem>
                    <FormItem label=" ">
                      <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit> 
                      <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit>
                  </FormItem>
                  </Form>
                } /> */}
                  
                  
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
                <Table.Column title="项目名称" dataIndex="title" />
                <Table.Column title="邮箱" dataIndex="email" />
                <Table.Column title="电话号码" dataIndex="telephone" />
                {/* <Table.Column dataIndex="period" /> */}
                <Table.Column title="申请时间" dataIndex="time" />
                {/* <Table.Column cell={(value,index,record) => <Button onClick={handleSubmit.bind(this, record.id)}>已促成</Button>}></Table.Column> */}
                {/* <Table.Column cell={(value,index,record) => 
                  <Form
                    // className={styles.baseSetting}
                    value={postData[index]}
                    inline
                    onChange={formChange}
                    // responsive
                  >
                    <FormItem >
                      <NumberPicker name="count" type="inline" step={1} min={0} max={30} defaultValue={0} ></NumberPicker>
                    </FormItem>
                    <FormItem >
                      <Select
                          name="unit"
                          defaultValue="day"
                          aria-label="unit is"
                      >
                        <Option value="day">天</Option>
                        <Option value="month">月</Option>
                        <Option value="year">年</Option>
                      </Select>
                    </FormItem>
                    <FormItem label=" ">
                      <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit> 
                      <Form.Submit onClick={handleSubmit.bind(this, record.id)}>设置</Form.Submit>
                  </FormItem>
                  </Form>
                } /> */}
                  
                  
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

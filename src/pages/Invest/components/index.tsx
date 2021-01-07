import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination, Message } from '@alifd/next';
import { Dialog, Form, Field, Input, Select, Upload } from '@alifd/next';
import axios from 'axios';

import styles from './index.module.scss';

const { Group: TagGroup, Selectable: SelectableTag } = Tag;

// 0普通用户 1VIP  2管理员manager 
const userType = window.localStorage.getItem('type')

export interface ICardItem {
  id?:string;
  title?: string;
  content?: string;
  subContent?: string;
  tel?: string;
  email?: string;
  date?: string;
  verify?:number;
  valid?:number
}
export interface InvestInfo {
  title:string,
  content: string,
  tel:string,
  email:string,
}

export interface DataSource {
  cards: ICardItem[];
  tagsA: object[];
  tagA: object;
  tagsB: string[];
  tagB: string;
  place:string
}

export interface ApplyInfo {
  email: string;
  tel: string;
}


// 用户数据
const DEFAULT_DATA: DataSource = {
  tagsA: [{ "i": "A", "data": ["安徽", "澳门"]}, { "i": "B", "data": ["北京"] }, { "i": "C", "data": ["重庆"] }, { "i": "F", "data": ["福建"] }, { "i": "G", "data": ["广东", "甘肃", "广西", "贵州"] }, { "i": "H", "data": ["海南", "河北", "河南", "黑龙江", "湖北", "湖南"] }, { "i": "J", "data": ["江苏", "吉林", "江西"] }, { "i": "L", "data": ["辽宁"] }, { "i": "N", "data": ["内蒙古", "宁夏"] }, { "i": "Q", "data": ["青海"] }, { "i": "S", "data": ["上海", "山东", "山西", "陕西", "四川"] }, { "i": "T", "data": ["天津", "台湾"] }, { "i": "X", "data": ["西藏", "新疆", "香港"] }, { "i": "Y", "data": ["云南"] }, { "i": "Z", "data": ["浙江"] }],
  tagA: { "i": "A", "data": ["安徽", "澳门"]},
  tagsB: ['全部','未审核','已审核', '已上架', '未上架'],
  tagB: '全部',
  place:'西安',
  cards: [
    {
      id:'1',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      tel:'15009265712',
      email:'dadas@mail.com',
      date:'2020-12-22',
      verify:0,
      valid:0
    },
    {
      id:'2',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      tel:'15009265712',
      email:'dadas@mail.com',
      date:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify:1,
      valid:0
    },
    {
      id:'3',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      tel:'15009265712',
      email:'dadas@mail.com',
      date:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify:0,
      valid:1
    },
    {
      id:'4',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      tel:'15009265712',
      email:'dadas@mail.com',
      date:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify:1,
      valid:1
    },
    {
      id:'5',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      tel:'15009265712',
      email:'dadas@mail.com',
      date:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify:0,
      valid:0
    },
  ]
};



const INPUT_DATA: InvestInfo={
  title:'',
  content: '',
  tel:'',
  email:'',
}

const APPLY_DATA: ApplyInfo={
  email:'',
  tel:''
}


const BasicList: React.FunctionComponent<BasicListProps> = (props: BasicListProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    applyInfo = APPLY_DATA,
    onSearch = (): void => { },
    investInfo = INPUT_DATA
  } = props;

  const [tagAValue, setTagAValue] = useState(dataSource.tagA);
  const [tagBValue, setTagBValue] = useState(dataSource.tagB);
  
  const [cards, setCardValue] = useState(dataSource.cards);
  const [loading, setLoading] = useState(true);

  var [visible, setVisible] = useState(false)
  var [joinVisible, setJoinVisible] = useState(false)

  const field = Field.useField({
    values: applyInfo,
  });

  const newInfoField = Field.useField({
    values: investInfo,
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onTagAValueChange = (v: string) => {
    setLoading(true);
    setTagAValue(v);

    axios.post('/search', {
      place: v,
    })
    .then(function (response) {
      setCardValue(response)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  };

  const onTagBValueChange = (v: string) => {
    setLoading(true);
    setTagBValue(v);
  };

  const onSearchClick = (value) => {
    setLoading(true);

    console.log(value)

    axios.post('/search', {
      name: value,
    })
    .then(function (response) {
      setCardValue(response)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  
    onSearch();
  };

  const onPaginationChange = (value) => {
    axios.post('/investData', {
      pageNum: value,
    })
    .then(function (response) {
      setCardValue(response)
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setLoading(true);
  };

  //更新审核
  const updateVerify =(id,status)=>{
    axios.post('/verify', {
      id: 2121,
      status: 1
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //更新上下架
  const updateValid =(id,status)=>{
    axios.post('/valid', {
      id: 2121,
      status: 0
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  const renderTagListA = () => {
    return dataSource.tagsA.map((place: Object) => (
      <div style={{'float':'left'}}>
        <span style={{color:'orange'}}>{place['i']}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        {
          place['data'].map(d=>(
            <SelectableTag
              key={d}
              checked={tagAValue === d}
              onChange={() => onTagAValueChange(d)}
              {...props}
            >{d}
            </SelectableTag>
          ))
        }
        
      </div>
    ));
  };

  const renderTagListB = () => {
    return dataSource.tagsB.map((name: string) => (
      <SelectableTag
        key={name}
        checked={tagBValue === name}
        onChange={() => onTagBValueChange(name)}
        {...props}
      >{name}
      </SelectableTag>
    ));
  };



  //提交招商信息
  const submit = async () => {
    // const { errors } = await field.validatePromise();
    // if (errors && errors.length > 0) {
    //   return;
    // }

    // 提交数据
    // field.getValues()
    // onSubmit(field.getValues());

    axios.post('/joinInvest', {
      id: window.localStorage.getItem('id'),
      data:newInfoField.getValues()
    })
    .then(function (response) {
      console.log(response);
      Message.success('已提交，请等待管理员审核');
    })
    .catch(function (error) {
      console.log(error);
    });

    setVisible(false);
  };

  //关闭弹窗
  const close = () => {
    setVisible(false);
  };

  const openDialog =()=>{
    // console.log('render')
    setVisible(true)
  };
  const openJoinDialog =()=>{
    setJoinVisible(true)
  }


  const submitJoin =()=>{
    setJoinVisible(false)

    if(!window.localStorage.getItem('id')){
      Message.warning('您尚未登陆，请先登录再操作');
      window.location.href="/user/login";
    }
    else{
      //申请参与招商接口

      axios.post('/joinInvest', {
        id: window.localStorage.getItem('id'),
        tel:field.getValues()?.tel,
        email: field.getValues()?.email
      })
      .then(function (response) {
        console.log(response);
        Message.success('已申请，请等待管理员审核');
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    // const id = window.localStorage.getItem('id')?

  }
  const closeJoin = () => {
    setJoinVisible(false);
    field.resetToDefault()
  };

  const beforeUpload=(info)=>{
    console.log('beforeUpload callback : ', info);
  }

  const onChange=(info)=>{
      console.log('onChange callback : ', info);
  }

  const renderOptions =(id, valid, verify)=>{
    if(userType == 'manager'){
      if(!valid){
        return(
          <Button type="normal" onClick={updateVerify(id,1)}>审核通过</Button>
        )  
      }
      else if (verify){
        return(
          <Button type="secondary" onClick={updateValid(id,2)}>下架信息</Button>
        )  
      }
      else if (!verify){
        return(
          <Button type="primary" onClick={updateValid(id,1)}>上架信息</Button>
        )  
      }
      
    }
    else {
      return(
        <div>
          <Button type="primary" onClick={openJoinDialog}>参与招商</Button>
          <Dialog
                visible={joinVisible}
                title="申请参与招商"
                style={{ width: '500px' }}
                onOk={submitJoin}
                onCancel={closeJoin}
              >
                <Form field={field} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                  <Form.Item format="tel" formatMessage="请输入正确的电话号码" label="电话号码" required requiredMessage="请输入电话">
                    <Input name="tel" placeholder="请输入电话号码" />
                  </Form.Item>
                  <Form.Item format="email"  formatMessage="请输入正确的邮箱" label="邮箱" required requiredMessage="请输入邮箱">
                    <Input name="email" placeholder="请输入邮箱" />
                  </Form.Item>
                </Form>
            </Dialog>
        </div>
      )
    }

  }
  const renderCards = () => {
    //若当前是普通用户
    return dataSource.cards.map((c: ICardItem, i: number) => (
      <div className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <div className={styles.left}>
            <img src="https://shadow.elemecdn.com/app/element/list.62a82841-1bcb-11ea-a71c-17428dec1b82.png" alt="img" />
            <div>
              <div className={styles.title}>
                {c.title}
              </div>
              <div className={styles.content}>
                招商简介：{c.content}
              </div>
              <div className={styles.subContent}>
                邮箱：{c.email}
              </div>
              <div className={styles.subContent}>
                电话号码：{c.tel}
              </div>
              <div className={styles.subContent}>
                发布时间: {c.date}
              </div>

              <div className={styles.subContent}>
                {c.subContent}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {renderOptions(c.id,c.valid,c.verify)}
          </div>
        </div>
      </div>
    ));
  };


  if(userType == "manager"){
    return(
      <>
      <Card free className={styles.BasicList}>
        <Box className={styles.TagBox} style={{"marginTop":'10px'}}>
          {/* <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>地区</Typography.Text>
            <TagGroup>{renderTagListA()}</TagGroup>
          </div> */}
          <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>名称</Typography.Text>
            <Search type="primary" hasIcon={false} searchText="搜索" onSearch={onSearchClick} />
          </div>
          <div className={styles.TagBoxItem} style={{marginTop: 10}}>
            <Typography.Text className={styles.TagTitleName}>状态</Typography.Text>
            <TagGroup>{renderTagListB()}</TagGroup>
          </div>
        </Box>

        <Loading visible={loading} className={styles.MainList}>
          <Box className={styles.MainContent} spacing={10}>
            <div className={styles.ListItem}>
              <div className={styles.add}>
                <Icon type="add" className={styles.icon} size="xs" />
                <div className={styles.addText} onClick={openDialog}>发布招商信息</div>
                  <Dialog
                    visible={visible}
                    title="招商信息发布"
                    style={{ width: '500px' }}
                    onOk={submit}
                    onCancel={close}
                  >
                    <Form field={newInfoField} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                      <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                        <Input name="title" placeholder="请输入公司名称" />
                      </Form.Item>
                      <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                        <Input name="content" placeholder="请输入公司简介" />
                      </Form.Item>
                      <Form.Item format="email" formatMessage="请输入正确的邮箱地址" label="邮箱" required requiredMessage="请输入邮箱">
                        <Input name="email" placeholder="请输入邮箱" />
                      </Form.Item>
                      <Form.Item format="tel" formatMessage="请输入正确的电话号码" label="电话号码" required requiredMessage="请输入电话">
                        <Input name="tel" placeholder="请输入电话号码" />
                      </Form.Item>
                      <Form.Item label="图片" requiredMessage="请上传图片">
                        <Upload
                          listType="image"
                          action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                          beforeUpload={beforeUpload}
                          onChange={onChange}
                           >
                          <Button type="primary" style={{margin: '0 0 10px'}}>Upload File</Button>
                        </Upload>
                      </Form.Item>
                    </Form>
                  </Dialog>
              </div>
              {/* {rende} */}
            </div>
            {renderCards()}
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}>
                共<span>200</span>条招商信息
              </div>
              <Pagination onChange={onPaginationChange} />
            </Box>
          </Box>
        </Loading>
      </Card>
      </>
    )

  }

  else return (
    <>
      <Card free className={styles.BasicList}>
        <Box className={styles.TagBox} style={{"marginTop":'10px'}}>
          <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>地区</Typography.Text>
            <TagGroup>{renderTagListA()}</TagGroup>
          </div>
          <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>名称</Typography.Text>
            <Search type="primary" hasIcon={false} searchText="搜索" onSearch={onSearchClick} />
          </div>
          <div style={{paddingTop:'18px'}}>
            <Typography.Text >当前位置: {dataSource.place}</Typography.Text>
            {/* <<Typography.Text>{dataSource.place}</span> */}
          </div>
        </Box>

        <Loading visible={loading} className={styles.MainList}>
          <Box className={styles.MainContent} spacing={10}>
            <div className={styles.ListItem}>
              <div className={styles.add}>
                <Icon type="add" className={styles.icon} size="xs" />
                <div className={styles.addText} onClick={openDialog}>发布招商信息</div>
                  <Dialog
                    visible={visible}
                    title="招商信息发布"
                    style={{ width: '500px' }}
                    onOk={submit}
                    onCancel={close}
                  >
                    <Form field={newInfoField} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                      <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                        <Input name="title" placeholder="请输入公司名称" />
                      </Form.Item>
                      <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                        <Input name="content" placeholder="请输入公司简介" />
                      </Form.Item>
                      <Form.Item format="email" formatMessage="请输入正确的邮箱地址" label="邮箱" required requiredMessage="请输入邮箱">
                        <Input name="email" placeholder="请输入邮箱" />
                      </Form.Item>
                      <Form.Item format="tel" formatMessage="请输入正确的电话号码" label="电话号码" required requiredMessage="请输入电话">
                        <Input name="tel" placeholder="请输入电话号码" />
                      </Form.Item>
                      <Form.Item label="图片" requiredMessage="请上传图片">
                        <Upload
                          listType="image"
                          action="https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload"
                          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                          beforeUpload={beforeUpload}
                          onChange={onChange}
                           >
                          <Button type="primary" style={{margin: '0 0 10px'}}>Upload File</Button>
                        </Upload>
                      </Form.Item>
                    </Form>
                  </Dialog>
              </div>
              {/* {rende} */}
            </div>
            {renderCards()}
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}>
                共<span>200</span>条招商信息
              </div>
              <Pagination onChange={onPaginationChange} />
            </Box>
          </Box>
        </Loading>
      </Card>
    </>
  );
};

export default BasicList;

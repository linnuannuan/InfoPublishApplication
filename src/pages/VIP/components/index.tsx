import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination } from '@alifd/next';
import { Dialog, Form, Field, Input, Select, Upload } from '@alifd/next';
import axios from 'axios';

import styles from './index.module.scss';
import { Row } from '@alifd/next/types/grid';

const { Group: TagGroup, Selectable: SelectableTag } = Tag;

// 0普通用户 1VIP  2管理员 
const userType = 0

export interface ICardItem {
  id?:string;
  title?: string;
  address?:string;
  content?: string;
  telephone?: string;
  email?: string;
  apply_time:string;
  picture_path?:string;
  verify_flag?:number;
  valid?:number
}
export interface InvestInfo {
  title:string,
  content: string,
  telephone:string,
  email:string,
}

export interface DataSource {
  cards: ICardItem[];
  tagsA: object[];
  tagA: object;
  tagsB: string[];
  tagB: string;
  place:string;
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
      telephone:'15009265712',
      email:'dadas@mail.com',
      apply_time:'2020-12-22',
      picture_path:'',
      verify_flag:0,
      valid:0
    },
    {
      id:'2',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      telephone:'15009265712',
      email:'dadas@mail.com',
      apply_time:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify_flag:1,
      valid:0
    },
    {
      id:'3',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      telephone:'15009265712',
      email:'dadas@mail.com',
      apply_time:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify_flag:0,
      valid:1
    },
    {
      id:'4',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      telephone:'15009265712',
      email:'dadas@mail.com',
      apply_time:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify_flag:1,
      valid:1
    },
    {
      id:'5',
      title: '上海一片天餐饮管理股份有限公司',
      content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
      telephone:'15009265712',
      email:'dadas@mail.com',
      apply_time:'2020-12-22',
      // 状态0表示未审核  1表示审核未上架  2表示审核已上架
      verify_flag:0,
      valid:0
    },
  ]
};



const INPUT_DATA: InvestInfo={
  title:'',
  content: '',
  telephone:'',
  email:'',
}



//申请VIP
const applyVIP=()=>{
  // axios.post()


}


//申请测试VIP
const applytVIP=()=>{



}


const BasicList: React.FunctionComponent<BasicListProps> = (props: BasicListProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    onSearch = (): void => { },
  } = props;

  const [tagAValue, setTagAValue] = useState(dataSource.tagA);
  const [tagBValue, setTagBValue] = useState(dataSource.tagB);
  const [loading, setLoading] = useState(true);

  var [visible, setVisible] = useState(false)
  var [joinVisible, setJoinVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  const onTagAValueChange = (v: string) => {
    setLoading(true);
    setTagAValue(v);
  };

  const onTagBValueChange = (v: string) => {
    setLoading(true);
    setTagBValue(v);
  };

  const onSearchClick = () => {
    setLoading(true);
    onSearch();
  };

  const onPaginationChange = () => {
    setLoading(true);
  };

  //更新审核
  const upapply_timeverify_flag =(id,status)=>{
    axios.post('/verify_flag', {
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
  const upapply_timeValid =(id,status)=>{
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
    // const { errors } = await field.valiapply_timePromise();
    // if (errors && errors.length > 0) {
    //   return;
    // }

    // 提交数据
    // field.getValues()
    // onSubmit(field.getValues());
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
  }
  const closeJoin = () => {
    setJoinVisible(false);
  };

  const beforeUpload=(info)=>{
    console.log('beforeUpload callback : ', info);
  }

  const onChange=(info)=>{
      console.log('onChange callback : ', info);
  }

  const renderOptions =(id, valid, verify_flag)=>{
    if(userType == 2){
      if(!valid){
        return(
          <Button type="normal" onClick={upapply_timeverify_flag(id,1)}>审核通过</Button>
        )  
      }
      else if (verify_flag){
        return(
          <Button type="secondary" onClick={upapply_timeValid(id,2)}>下架信息</Button>
        )  
      }
      else if (!verify_flag){
        return(
          <Button type="primary" onClick={upapply_timeValid(id,1)}>上架信息</Button>
        )  
      }
      
    }
    else {
      return(
        <div>
          <Button type="primary" onClick={openJoinDialog}>申请加入</Button>
          <Dialog
                visible={joinVisible}
                title="申请参与招商/加盟"
                style={{ width: '500px' }}
                onOk={submitJoin}
                onCancel={closeJoin}
              >
                <Form fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                  <Form.Item label="电话号码" required requiredMessage="请输入电话">
                    <Input name="email" placeholder="请输入电话号码" />
                  </Form.Item>
                  <Form.Item label="邮箱" required requiredMessage="请输入邮箱">
                    <Input name="email" placeholder="请输入邮箱" />
                  </Form.Item>
                </Form>
            </Dialog>
        </div>
      )
    }

  }

  const renderCards = () => {
    //普通用户界面
    return dataSource.cards.map((c: ICardItem, i: number) => (

      <div className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <div className={styles.left}>
            {/* <img src={"/"+c.picture_path} alt="img" /> */}
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
                电话号码：{c.telephone}
              </div>
              <div className={styles.subContent}>
                发布时间: {c.apply_time}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {renderOptions(c.id,c.valid,c.verify_flag)}
          </div>
        </div>
      </div>
    ));
  };


  //管理员界面
  if(userType == 2){
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
                    <Form fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                      <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                        <Input name="title" placeholder="请输入公司名称" />
                      </Form.Item>
                      <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                        <Input name="content" placeholder="请输入公司简介" />
                      </Form.Item>
                      <Form.Item label="邮箱" required requiredMessage="请输入邮箱">
                        <Input name="email" placeholder="请输入邮箱" />
                      </Form.Item>
                      <Form.Item label="电话号码" required requiredMessage="请输入电话">
                        <Input name="email" placeholder="请输入电话号码" />
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
        <hr/>
        <Card
            // className="free-card custom"
            free
        >
            <Card.Media style={{ width:"12em",height:'12em',float:'left',marginLeft:'20px'}} image="../public/qrcode.jpg" />
            {/* <Card.Media style={{ width:"200px",height: "200px",float:'left',paddingTop:'10px'}} image="../public/qrcode.jpg" /> */}
            <div style={{float:'left'}} className="free-card-main">
                <Card.Header title="VIP充值渠道" />
                <Card.Content>
                  <div>VIP 信息区只面向VIP用户开放， 不限制发布条数</div>
                  <div>VIP收费标准： 月费：10元/月   年费：200元/月</div>
                  <br/>
                  <Button type="primary" key="action1" onClick={applyVIP} text> 正式会员申请（已缴费）</Button>
                  <Button type="primary" key="action2" onClick={applytVIP} text> 体验会员申请</Button>
                </Card.Content>
            </div>
        </Card>

        <Loading visible={loading} className={styles.MainList}>
          <Box className={styles.MainContent} spacing={10}>
            <div className={styles.ListItem}>
              <div className={styles.add}>
                <Icon type="add" className={styles.icon} size="xs" />
                <div className={styles.addText} onClick={openDialog}>发布信息</div>
                  <Dialog
                    visible={visible}
                    title="VIP信息发布"
                    style={{ width: '500px' }}
                    onOk={submit}
                    onCancel={close}
                  >
                    <Form fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                      <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                        <Input name="title" placeholder="请输入公司名称" />
                      </Form.Item>
                      <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                        <Input name="content" placeholder="请输入公司简介" />
                      </Form.Item>
                      <Form.Item label="邮箱" required requiredMessage="请输入邮箱">
                        <Input name="email" placeholder="请输入邮箱" />
                      </Form.Item>
                      <Form.Item label="电话号码" required requiredMessage="请输入电话">
                        <Input name="email" placeholder="请输入电话号码" />
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

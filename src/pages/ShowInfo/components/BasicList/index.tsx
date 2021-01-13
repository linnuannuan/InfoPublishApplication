import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination, Message } from '@alifd/next';
import { Dialog, Form, Field, Input, Select, Upload, CascaderSelect } from '@alifd/next';
import { TabBar } from '@ant-design/react-native';

import axios from 'axios';

import styles from './index.module.scss';
import mock from '@/pages/MockData/mock';
import mockCard from '@/pages/MockData/card';


const { Group: TagGroup, Selectable: SelectableTag } = Tag;

// 0普通用户 1VIP  2管理员manager 

// const userType = sessionStorage.SPRING_SECURITY_CONTEXT.authentication.principal.roleList.indexOf("ADMIN")>-1 ? 'manager':(sessionStorage.SPRING_SECURITY_CONTEXT.authentication.principal.roleList.indexOf("VIP")>-1?'vip':'user')
const userType = 'user'

const isManager = (userType=='manager')
const url = (isManager?'/manage':'/user')

export interface ICardItem {
  id?:string;
  company?: string;
  content?: string;
  telephone?: string;
  email?: string;
  validTime?: string;
  verifyFlag?:number;
  validFlag?:number
  pic_path?:String
}
export interface InvestInfo {
  title:string,
  content: string,
  address: string,
  tel:string,
  email:string,
  filePathArray:Array<String>
}

export interface DataSource {
  cards: ICardItem[];
  tagsA: Object[];
  tagA: object;
  tagsB: string[];
  tagB: string;
  addressDataSource:Object;
}

export interface ApplyInfo {
  email: string;
  tel: string;
}


// 用户数据
var DEFAULT_DATA: DataSource = {
  tagsA: mock.address,
  tagA:{
      address:{}
   },
//   tagsB: ['全部','未审核','已审核', '已上架', '未上架'],
  tagsB: ['全部', '已上架', '未上架'],
  tagB: '全部',
  addressDataSource:[],
  cards: mockCard.cards
};

// 设备
const isPhone = typeof navigator !== 'undefined' &&
  navigator &&
  navigator.userAgent.match(/phone/gi);



const INPUT_DATA: InvestInfo={
  title:'',
  content: '',
  tel:'',
  email:'',
  filePathArray:[]
}

const APPLY_DATA: ApplyInfo={
  email:'',
  tel:''
}


var init = false

const checkLogin=(response)=>{
    console.log('check login', response)
    if(response.data.msg == "未登录"){
        Message.warning("请登录！")
        window.location.href='/#/user/login';
        return false
    }
    return true
}



const BasicList: React.FunctionComponent<BasicListProps> = (props: BasicListProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
    applyInfo = APPLY_DATA,
    onSearch = (): void => { },
    investInfo = INPUT_DATA,
  } = props;

  const [tagAValue, setTagAValue] = useState(dataSource.tagA);
  const [tagBValue, setTagBValue] = useState(dataSource.tagB);
  const [title, setTitleValue] = useState("");
  const [joinId, setJoinId] = useState(0);


  const [cards, setCardValue] = useState(dataSource.cards);
  const [loading, setLoading] = useState(true);

  var [visible, setVisible] = useState(false)
  var [joinVisible, setJoinVisible] = useState(false)
  
  var [total, setTotal] = useState(1)
  var [pageSize, setPageSize] = useState(1)


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
  
  console.log('render')

  const refreshData=()=>{
    axios.get(url+'/joinList')
    .then(function (response) {
        console.log(response)
        if(checkLogin(response)){
            setCardValue(response.data.data.list);
            setTotal(response.data.data.total)
            setPageSize(response.data.data.pageSize)
            setLoading(false);
        }

        console.log(response);
    })
    .catch(function (error) {

        console.log('error啦啦啦', error);
        console.log(error.response.msg);
        
        checkLogin(error.response)
    });

  }



  if(!init){
    refreshData()
    init=true
  }

  const onTagAValueChange = (value, data, extra) => {
    setLoading(true);
    //保存当前地址信息
    setTagAValue({
        province: extra.selectedPath[0]?.label,
        city:extra.selectedPath[1]?.label,
        region:extra.selectedPath[2]?.label,
    });

    axios.get(url+'/joinList', 
    {
        params:{
            address:{
            province: extra.selectedPath[0]?.label,
            city:extra.selectedPath[1]?.label,
            region:extra.selectedPath[2]?.label,
            },
            validFlag: isManager?tagBValue:null,
            title:title
        }
    })
    .then(function (response) {
        if(checkLogin(response)){
            setCardValue(response.data.data.list);
            setTotal(response.data.data.total)
            setPageSize(response.data.data.pageSize)
            setLoading(false);
        }
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
  };
  

  const onTagBValueChange = (v: string) => {
    setLoading(true);
    setTagBValue(v);
    axios.get(url+'/joinList', {
        params:{
            address:tagAValue,
            validFlag: tagBValue,
            title:title
        }
      })
      .then(function (response) {
        if(checkLogin(response)){
            setCardValue(response.data.data.list);
            setTotal(response.data.data.total)
            setPageSize(response.data.data.pageSize)
            setLoading(false);
        }
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  const onSearchClick = (value) => {
    setLoading(true);
    setTitleValue(value)
    console.log(value)
    axios.get(url+'/joinList', {
        params:{
            title: value,
            address: tagAValue
        }
    })
    .then(function (response) {
        if(checkLogin(response)){
            setCardValue(response.data.data.list);
            setTotal(response.data.data.total)
            setPageSize(response.data.data.pageSize)
            setLoading(false);
        }
        console.log(response);
    })
    .catch(function (error) {
    console.log(error);
    });
    onSearch();
  };

  const onPaginationChange = (value) => {
    setLoading(true);
    axios.get(url+'/joinList', {
        params:{
            pageNum: value,
            address:tagAValue,
            validFlag: tagBValue,
            title: title
        }
    })
    .then(function (response) {
        if(checkLogin(response)){
            setCardValue(response.data.data.list);
            setTotal(response.data.data.total)
            setPageSize(response.data.data.pageSize)
            setLoading(false);
        }
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
  };

  //更新审核
  const updateVerify =(id,status)=>{
    // axios.post('/verify', {
    //   id: 2121,
    //   status: 1
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }

   //更新上下架  1/0
   const updateValid =(id,status)=>{
    
    axios.get('/manage/validZhaoshangApply', {
        params:{
            id: id,
            flag: status
        }
    })
    .then(function (response) {
      if(response.data.msg=="sucesss"){
        Message.success('成功');
        refreshData()
        //刷新页面
        console.log(response);
      }
      else{
        Message.error(response.data.msg)
      }
    })
    .catch(function (error) {
      console.log(error);
      Message.error('更新失败')
    });
  }

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



  //普通用户提交加盟信息
  const submit = async () => {
      
    axios.post(url+'/applyJoin', {
        company:newInfoField.getValues().company,
        address:newInfoField.getValues().address,
        content:newInfoField.getValues().content,
        telephone:newInfoField.getValues().tel,
        email:newInfoField.getValues().email,
        filePathArray:newInfoField.getValues().filePathArray.toString()
    })
    .then(function (response) {
      console.log(response);
      if(response.data.msg=="sucesss"){
        Message.success('已提交，请等待管理员审核');
      }
      else{
        Message.error(response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error);
      Message.error("提交失败");
    });
    setVisible(false);
  };

  //管理员
  const submitManager = async () => {
    axios.post(url+'/applyJoin', {
                company:newInfoField.getValues().company,
                address:newInfoField.getValues().address,
                content:newInfoField.getValues().content,
                telephone:newInfoField.getValues().tel,
                email:newInfoField.getValues().email,
                filePathArray:newInfoField.getValues().filePathArray.toString()
            }
    )
    .then(function (response) {
      console.log(response);
      if(response.data.msg=="sucesss"){
        Message.success('已提交');
      }
      else{
        Message.error(response.data.msg);
      }
    })
    .catch(function (error) {
      console.log(error);
      Message.error("提交失败");
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
  const openJoinDialog =(id)=>{
    setJoinVisible(true)
    setJoinId(id)
    console.log('click id:', id)
  }


  const submitJoin =()=>{
    setJoinVisible(false)
    // if(!window.sessionStorage.getItem('id')){
    //   Message.warning('您尚未登陆，请先登录再操作');
    //   window.location.href="/user/login";
    // }
    // else{
      axios.get('/user/join', {
          params:{
            id: joinId,
            telephone:field.getValues()?.tel,
            email: field.getValues()?.email
          }
      })
      .then(function (response) {
        console.log(response);
        if(response.data.msg=="sucesss"){
            Message.success('已申请，请等待管理员审核');
        }
        else{
            Message.error(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        Message.error("提交失败");
      });
    // }
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
      if(info[info.length-1].error){
        Message.error(info[info.length-1].error.messsage)
      }
    //   newInfoField.getValue('filePathArray').push(info[info.length-1].uid)

      // newInfoField.getValue('filePathArray').push(info[info.length-1].uid)
      
      // let pic_path = newInfoField.getValue('filePathArray')
      // console.log('pic path',pic_path)
      // pic_path.push(info[info.length-1].uid)
      // console.log('new pic path',pic_path)
      // newInfoField.setValue('filePathArray',pic_path);  
  }


  function onSuccess(info) {
    console.log('onSuccess : ', info);
    console.log('before upload',newInfoField.getValue('filePathArray'))
    newInfoField.getValue('filePathArray').push(info.response.data.filePath)
    
    console.log('after upload',newInfoField.getValue('filePathArray'))
    Message.success('图片上传成功')
  }

  function onPublishPlaceChange(value, data, extra) {
    newInfoField.setValue('address',{
      province: extra.selectedPath[0]?.label,
      city:extra.selectedPath[1]?.label,
      region:extra.selectedPath[2]?.label,
    })
  }

  const renderOptions =(id, validFlag, verifyFlag)=>{
    console.log(id, validFlag)
    if(isManager){
    //   if(!validFlag){
    //     return(
    //       <Button type="normal" onClick={updateVerify.bind(id,1)}>审核通过</Button>
    //     )  
    //   }
      if (verifyFlag){
        return(
          <Button type="secondary" size={isPhone?"small":"medium"} onClick={updateValid.bind(id,0)}>下架信息</Button>
        )  
      }
      else if (!verifyFlag){
        return(
          <Button type="primary" size={isPhone?"small":"medium"} onClick={updateValid.bind(id,1)}>上架信息</Button>
        )  
      }
    }
    else {
      return(
        <div>
          <Button type="primary" size={isPhone?"small":"medium"} onClick={openJoinDialog.bind(this,id)}>参与加盟</Button>
          <Dialog
                visible={joinVisible}
                title="申请参与加盟"
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

  //信息展示
  const renderCards = () => {
    if(isPhone){
        return cards.map((c: ICardItem, i: number) => (
            <div className={styles.ListItem} key={i}>
              <div className={styles.main}>
                <div className={styles.left}>
                  <div>
                    <div className={styles.phoneTitle}>
                      {c.company}
                    </div>
                    {/* <div className={styles.content}>
                      加盟简介：{c.content}
                    </div>
                    <div className={styles.subContent}>
                      邮箱：{c.email}
                    </div>
                    <div className={styles.subContent}>
                      电话号码：{c.telephone}
                    </div> */}
                    <div style={{marginTop:'8px', color:'gray', fontSize:'12px'}}>
                      发布时间: {c.validTime}
                    </div>
                  </div>
                </div>
                <div className={styles.right}>
                  {renderOptions(c.id, c.validFlag, c.verifyFlag)}
                </div>
              </div>
            </div>
        ));
    }
    return cards.map((c: ICardItem, i: number) => (
      <div className={styles.ListItem} key={i}>
        <div className={styles.main}>
          <div className={styles.left}>
            <img src={"/"+c.picPath} alt="img" />
            <div>
              <div className={styles.title}>
                {c.company}
              </div>
              <div className={styles.content}>
                加盟简介：{c.content}
              </div>
              <div className={styles.subContent}>
                邮箱：{c.email}
              </div>
              <div className={styles.subContent}>
                电话号码：{c.telephone}
              </div>
              <div className={styles.subContent}>
                发布时间: {c.validTime}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            {renderOptions(c.id, c.validFlag, c.verifyFlag)}
          </div>
        </div>
      </div>
    ));
  };


  //筛选
  const renderBox =()=>{
    //管理员
    if(isManager){
        <Box className={isPhone? styles.TagPhoneBox:styles.TagBox } style={{"marginTop":'10px'}}>
          <div className={styles.TagBoxItem}>
            <Typography.Text className={isPhone?styles.TagTitlePhoneName:styles.TagTitleName}>地区</Typography.Text>
            <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onTagAValueChange} />
          </div>
          <div className={styles.TagBoxItem} style={{marginTop: 10}}>
            <Typography.Text className={isPhone?styles.TagTitlePhoneName:styles.TagTitleName}>状态</Typography.Text>
            <TagGroup>{renderTagListB()}</TagGroup>
          </div>
        </Box>
    }
    return <Box className={isPhone? styles.TagPhoneBox:styles.TagBox }>
        <div className={styles.TagBoxItem}>
            <Typography.Text className={isPhone?styles.TagTitlePhoneName:styles.TagTitleName}>地区</Typography.Text>
            <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onTagAValueChange} />
        </div>
        <div className={styles.TagBoxItem}>
            <Typography.Text className={isPhone?styles.TagTitlePhoneName:styles.TagTitleName}>名称</Typography.Text>
            <Search style={{ width: '302px' }} type={isPhone?"normal":"primary"} searchText={isPhone?"":"搜索"} onSearch={onSearchClick} />
        </div>
    </Box>
  }

  //渲染全部页面
  if(isManager){
    return(
      <>
      <Card free className={styles.BasicList}>
        {renderBox()}
        <Box className={styles.TagBox} style={{"marginTop":'10px'}}>
          <div className={styles.TagBoxItem}>
            
            <Typography.Text className={styles.TagTitleName}>地区</Typography.Text>
            <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onTagAValueChange} />
          </div>
          {/* <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>名称</Typography.Text>
            <Search type="primary" hasIcon={false} searchText="搜索" onSearch={onSearchClick} />
          </div> */}
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
                <div className={styles.addText} onClick={openDialog}>发布加盟信息</div>
                  <Dialog
                    visible={visible}
                    title="加盟信息发布"
                    style={{ width: '500px' }}
                    onOk={submitManager}
                    onCancel={close}
                  >
                    <Form field={newInfoField} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                      <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                        <Input name="company" placeholder="请输入公司名称" />
                      </Form.Item>
                      <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                        <Input name="content" placeholder="请输入公司简介" />
                      </Form.Item>
                      <Form.Item label="地址" required requiredMessage="请输入发布信息对应地区">
                        <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onPublishPlaceChange} />
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
                          action="/user/upload"
                          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                          beforeUpload={beforeUpload}
                          onChange={onChange}
                          onSuccess={onSuccess}
                        >
                          <Button type="primary" size={isPhone?"small":"medium"} style={{margin: '0 0 10px'}}>Upload File</Button>
                        </Upload>
                      </Form.Item>
                    </Form>
                  </Dialog>
              </div>
            </div>
            {renderCards()}
            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
              <div className={styles.total}>
                共<span>{total}</span>条加盟信息
              </div>
              <Pagination size={isPhone?"small":"medium"} onChange={onPaginationChange} total={total} pageSize={pageSize}/>
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
        {renderBox()}
        <Loading visible={loading} className={styles.MainList}>
          <Box className={styles.MainContent} spacing={10}>
            <div className={styles.ListItem}>
              <div className={styles.add}>
                <Icon type="add" className={styles.icon} size="xs" />
                <div className={styles.addText} onClick={openDialog}>发布加盟信息</div>
                  <Dialog
                    visible={visible}
                    title="加盟信息发布"
                    style={{ width: '500px' }}
                    onOk={submit}
                    onCancel={close}
                  >
                    <Form field={newInfoField} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                      <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                        <Input name="company" placeholder="请输入公司名称" />
                      </Form.Item>
                      <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                        <Input name="content" placeholder="请输入公司简介" />
                      </Form.Item>
                      <Form.Item label="地址" required requiredMessage="请输入发布信息对应地区">
                        <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onPublishPlaceChange} />
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
                          action="/user/upload"
                          accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                          beforeUpload={beforeUpload}
                          onChange={onChange}
                          onSuccess={onSuccess}
                        >
                          <Button type="primary" size={isPhone?"small":"medium"} style={{margin: '0 0 10px'}}>Upload File</Button>
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
                共<span>{total}</span>条加盟信息
              </div>
              <Pagination size={isPhone?"small":"medium"} onChange={onPaginationChange} total={total} pageSize={pageSize}/>
            </Box>
          </Box>
        </Loading>
      </Card>
    </>
  );
};

export default BasicList;

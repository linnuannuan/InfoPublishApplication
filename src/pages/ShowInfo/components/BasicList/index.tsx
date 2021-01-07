import React, { useState, useEffect } from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination } from '@alifd/next';
import { Dialog, Form, Field, Input, Select, Upload } from '@alifd/next';

import styles from './index.module.scss';

const { Group: TagGroup, Selectable: SelectableTag } = Tag;

export interface ICardItem {
  title?: string;
  content?: string;
  subContent?: string;
  tel?: string;
  email?: string;
  date?: string
}
export interface InvestInfo {
  title:string,
  content: string,
  tel:string,
  email:string,
}


export interface DataSource {
  cards: ICardItem[];
  tagsA: string[];
  tagA: string;
  tagsB: string[];
  tagB: string;
  place:string;
}



const DEFAULT_DATA: DataSource = {
  tagsA: [{ "i": "A", "data": ["安徽", "澳门"]}, { "i": "B", "data": ["北京"] }, { "i": "C", "data": ["重庆"] }, { "i": "F", "data": ["福建"] }, { "i": "G", "data": ["广东", "甘肃", "广西", "贵州"] }, { "i": "H", "data": ["海南", "河北", "河南", "黑龙江", "湖北", "湖南"] }, { "i": "J", "data": ["江苏", "吉林", "江西"] }, { "i": "L", "data": ["辽宁"] }, { "i": "N", "data": ["内蒙古", "宁夏"] }, { "i": "Q", "data": ["青海"] }, { "i": "S", "data": ["上海", "山东", "山西", "陕西", "四川"] }, { "i": "T", "data": ["天津", "台湾"] }, { "i": "X", "data": ["西藏", "新疆", "香港"] }, { "i": "Y", "data": ["云南"] }, { "i": "Z", "data": ["浙江"] }],
  tagA: '类目一',
  tagsB: ['不到一年', '一年以上三年以下', '三年以上五年以下', '五年以上'],
  tagB: '一年以上三年以下',
  place:'西安',
  cards: new Array(5).fill({
    title: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    tel:'15009265712',
    email:'dadas@mail.com',
    date:'2020-12-22'
  }),
};


const INPUT_DATA: InvestInfo={
  title:'',
  content: '',
  tel:'',
  email:'',
}


// const field = Field.useField({
//   values: INPUT_DATA,
// });



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



  //提交加盟信息
  const submit = async () => {
    // const { errors } = await field.validatePromise();
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

  const renderCards = () => {
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
                加盟简介：{c.content}
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
            <Button type="primary" onClick={openJoinDialog}>参与加盟</Button>
            <Dialog
                    visible={joinVisible}
                    title="申请参与加盟"
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
        </div>
      </div>
    ));
  };

  return (
    <>
      <Card free className={styles.BasicList}>
        <Box className={styles.TagBox} style={{"marginTop":'10px'}}>
          <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>地区</Typography.Text>
            <TagGroup>{renderTagListA()}</TagGroup>
          </div>
          {/* <div className={styles.TagBoxItem}>
            <Typography.Text className={styles.TagTitleName}>时间</Typography.Text>
            <TagGroup>{renderTagListB()}</TagGroup>
          </div> */}
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
                <div className={styles.addText} onClick={openDialog}>发布加盟信息</div>
                  <Dialog
                    visible={visible}
                    title="加盟信息发布"
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
                共<span>200</span>条加盟信息
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

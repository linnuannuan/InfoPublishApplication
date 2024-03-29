import React, { useState, useEffect, Children } from 'react';
import { Box, Search, Card, Tag, Divider, Typography, Icon, Loading, Button, Pagination, Message } from '@alifd/next';
import { Dialog, Form, Field, Input, Select, Upload, CascaderSelect } from '@alifd/next';

import axios from 'axios';

import styles from './index.module.scss';
//mock 地址
import mock from '@/pages/MockData/mock';
import mockCard from '@/pages/MockData/card';


const { Group: TagGroup, Selectable: SelectableTag } = Tag;

// 0普通用户 1VIP  2管理员manager 
const userType = window.sessionStorage.getItem('type')


const isManager = (userType == 'manager')
const url = (isManager ? '/manage' : '/vip')

export interface ICardItem {
    id?: string;
    company?: string;
    content?: string;
    telephone?: string;
    email?: string;
    applyTime?: string;
    verifyFlag?: number;
    validFlag?: number
    picturePath?: String;
    address?: String;
}
export interface InvestInfo {
    company: string,
    content: string,
    address: string,
    telephone: string,
    email: string,
    filePathArray: Array<String>,
    picturePath: string,
}

export interface DataSource {
    cards: ICardItem[];
    tagsA: Object[];
    tagA: string;
    tagsB: Number[];
    tagB: string;
    addressDataSource: Object;
}

export interface ApplyInfo {
    email: string;
    telephone: string;
}


// 用户数据
var DEFAULT_DATA: DataSource = {
    tagsA: mock.address,
    tagA: "",
    //   tagsB: ['全部','未审核','已审核', '已上架', '未上架'],
    tagsB: [null, 1, 0],
    tagB: null,
    addressDataSource: [],
    cards: mockCard.cards
};

// 设备
const mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry", "webos", "incognito", "webmate", "bada", "nokia", "lg", "ucweb", "skyfire");

const isPhone =
    (
        typeof navigator !== 'undefined' &&
        navigator &&
        (navigator.userAgent.match(/phone/gi) || !!mobileAgent.find(d => (navigator.userAgent.toLowerCase().indexOf(d) > -1)))
    ) || (window.innerWidth < 680)


const INPUT_DATA: InvestInfo = {
    company: '',
    content: '',
    telephone: '',
    email: '',
    filePathArray: [],
    address: ''
}

const APPLY_DATA: ApplyInfo = {
    email: '',
    telephone: ''
}


// var init = false
const checkLogin = (response) => {
    console.log('check login', response)
    if (response.data.msg == "未登录") {
        Message.warning("请登录！")
        window.location.href = '/#/user/login';
        return false
    }
    return true
}



let init = false
//申请VIP
const applyVIP = () => {
    // axios.post()
    axios.get('/user/applyVip', {
        params: {
            vipType: 0
        }
    })
        .then(function (response) {
            console.log(response);
            if (response.data.msg == 'success') {
                Message.success('已申请，请等待管理员审核');
            }
            else {
                Message.error('申请失败')
            }
        })
        .catch(function (error) {
            console.log(error);
        });



}


//申请测试VIP
const applytVIP = () => {
    axios.get('/user/applyVip', {
        params: {
            vipType: 1
        }
    })
        .then(function (response) {
            console.log(response);
            if (response.data.msg == 'success') {
                Message.success('已申请，请等待管理员审核');
            }
            else {
                Message.error('申请失败')
            }
        })
        .catch(function (error) {
            console.log(error);
        });
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
    const [inited, setInited] = useState(false);


    const [cards, setCardValue] = useState(dataSource.cards);
    const [loading, setLoading] = useState(true);

    var [visible, setVisible] = useState(false)
    var [joinVisible, setJoinVisible] = useState(false)
    var [modifyVisible, setModifyVisible] = useState(false)
    var [isVip, setIsVip] = useState(false)



    var [total, setTotal] = useState(0)
    var [pageSize, setPageSize] = useState(1)


    //申请加入
    const field = Field.useField({
        values: applyInfo,
    });

    //发布信息
    const newInfoField = Field.useField({
        values: investInfo,
    });

    //管理员修改发布信息
    const modifyField = Field.useField({
        values: investInfo,
    });

    const refreshData = () => {
        axios.get(url + '/vipInfoList')
            .then(function (response) {
                console.log(response)
                if (checkLogin(response)) {
                    setData(response)

                    if (response.data.msg !== "没有vip权限") {
                        setIsVip(true)
                    }
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log('error', error);
                console.log(error.response.msg);
                checkLogin(error.response)

            });
        setLoading(false)

    }

    const setData = (response) => {
        setCardValue(response.data.data.list);
        setTotal(response.data.data.total)
        setPageSize(response.data.data.pageSize)
        setLoading(false);
    }


    useEffect(() => {
        refreshData()
    }, [inited]);
    //   if(!init){
    //     refreshData()
    //     init = true
    //   }

    const onTagAValueChange = (value, data, extra) => {
        setLoading(true);
        //保存当前地址信息

        setTagAValue(extra.selectedPath[0]?.label + "," + extra.selectedPath[1]?.label + "," + extra.selectedPath[2]?.label)

        axios.get(url + '/vipInfoList',
            {
                params: {
                    address: extra.selectedPath[0]?.label + "," + extra.selectedPath[1]?.label + "," + extra.selectedPath[2]?.label,
                    validFlag: isManager ? tagBValue : null,
                    title: title
                }
            })
            .then(function (response) {
                if (checkLogin(response)) {

                    if (response.data.msg !== "没有vip权限") {
                        setIsVip(true)
                    }
                    else {
                        setCardValue(response.data.data.list);
                        setTotal(response.data.data.total)
                        setPageSize(response.data.data.pageSize)
                        setLoading(false);
                    }

                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    const onTagBValueChange = (v: string) => {
        console.log(v)
        setLoading(true);
        setTagBValue(v);
        axios.get(url + '/vipInfoList', {
            params: {
                address: tagAValue,
                validFlag: v,
                title: title
            }
        })
            .then(function (response) {
                if (checkLogin(response)) {
                    if (response.data.msg !== "没有vip权限") {
                        setIsVip(true)
                    }
                    else {
                        setCardValue(response.data.data.list);
                        setTotal(response.data.data.total)
                        setPageSize(response.data.data.pageSize)
                        setLoading(false);
                    }

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
        axios.get(url + '/vipInfoList', {
            params: {
                title: value,
                address: tagAValue
            }
        })
            .then(function (response) {
                if (checkLogin(response)) {
                    if (response.data.msg !== "没有vip权限") {
                        setIsVip(true)
                    }
                    else {
                        setCardValue(response.data.data.list);
                        setTotal(response.data.data.total)
                        setPageSize(response.data.data.pageSize)
                        setLoading(false);
                    }
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
        axios.get(url + '/vipInfoList', {
            params: {
                pageNum: value,
                address: tagAValue,
                validFlag: tagBValue,
                title: title
            }
        })
            .then(function (response) {
                if (checkLogin(response)) {
                    if (response.data.msg !== "没有vip权限") {
                        setIsVip(true)
                    }
                    else {
                        setCardValue(response.data.data.list);
                        setTotal(response.data.data.total)
                        setPageSize(response.data.data.pageSize)
                        setLoading(false);
                    }
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    //更新审核
    const updateVerify = (id, status) => {
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
    const updateValid = (id, status) => {

        axios.get('/manage/validVipInfoApply', {
            params: {
                id: id,
                flag: status
            }
        })
            .then(function (response) {
                if (response.data.msg == "success") {
                    Message.success('成功');
                    refreshData()
                    //刷新页面
                    console.log(response);
                }
                else {
                    Message.success(response.data.msg)
                }
            })
            .catch(function (error) {
                console.log(error);
                Message.error('更新失败')
            });
    }


    //修改信息
    const modifyInfo = (record) => {

        let province = record.address?.split(',')[0]
        let city = record.address?.split(',')[1]
        let region = record.address.split(',')[2] ? record.address.split(',')[2] : (record.address.split(',')[1] + "市")

        console.log(province, city, region)
        console.log('record', record)
        modifyField.setValues(
            {
                'id': record.id,
                'company': record.company,
                'address':
                {
                    province: province,
                    city: city,
                    region: region,
                    value: mock.address.find(d => d.label == province)
                        ?.children?.find(d => d.label == city)
                        ?.children?.find(d => (!!region) ? (d.label == region) : true)?.value
                },
                'content': record.content,
                'telephone': record.telephone,
                'email': record.email,
                'filePathArray': record.picturePath?.split(","),
                'oldPath': record.picturePath,
                'id': record.id,
            }
        )

        setModifyVisible(true)

    }

    const renderTagListB = () => {
        return dataSource.tagsB.map((name) => (
            <SelectableTag
                key={name}
                checked={tagBValue === name}
                onChange={() => onTagBValueChange(name)}
                {...props}
            >{name == 0 ? "未上架" : (name == 1 ? "已上架" : "全部")}
            </SelectableTag>
        ));
    };



    //普通用户提交VIP信息
    const submit = async () => {

        axios.post('/vip/applyVipInfo', {
            company: newInfoField.getValues().company,
            address: newInfoField.getValues().address,
            content: newInfoField.getValues().content,
            telephone: newInfoField.getValues().telephone,
            email: newInfoField.getValues().email,
            filePathArray: newInfoField.getValues().filePathArray.toString()
        })
            .then(function (response) {
                console.log(response);
                if (response.data.msg == "success") {
                    Message.success('已提交，请等待管理员审核');
                }
                else {
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

    const openDialog = () => {
        // console.log('render')
        setVisible(true)
    };
    const openJoinDialog = (id) => {
        setJoinVisible(true)
        setJoinId(id)
        console.log('click id:', id)
    }


    const submitJoin = () => {
        setJoinVisible(false)
        axios.get('/user/join', {
            params: {
                id: joinId,
                telephone: field.getValues()?.telephone,
                email: field.getValues()?.email
            }
        })
            .then(function (response) {
                console.log(response);
                if (response.data.msg == "success") {
                    Message.success('已申请，请等待管理员审核');
                }
                else {
                    Message.error(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
                Message.error("提交失败");
            });

    }
    const closeJoin = () => {
        setJoinVisible(false);
        field.resetToDefault()
    };


    const submitModify = () => {
        setModifyVisible(false)
        axios.post('/manage/modifyInfoApply', {
            company: modifyField.getValue('company'),
            content: modifyField.getValue('content'),
            telephone: modifyField.getValue('telephone'),
            email: modifyField.getValue('email'),
            filePathArray: modifyField.getValue('filePathArray')?.toString(),
            address: modifyField.getValue('address'),
            id: modifyField.getValue('id'),
            oldPath: modifyField.getValue('oldPath')
        })
            .then(function (response) {
                console.log(response);
                if (response.data.msg == "success") {
                    Message.success('已修改');                
                    refreshData()
                }
                else {
                    Message.error(response.data.msg);
                }
            })
            .catch(function (error) {
                console.log(error);
                Message.error("提交失败");
            });
    }

    const closeModify = () => {
        setModifyVisible(false);
        // field.resetToDefault()
    }

    const beforeUpload = (info) => {
        console.log('beforeUpload callback : ', info);
    }

    const onChange = (info) => {
        console.log('onChange callback : ', info);
        if (info[info.length - 1].error) {
            Message.error(info[info.length - 1].error.messsage)
        }
    }


    function onSuccess(info) {
        console.log('onSuccess : ', info);
        console.log('before upload', newInfoField.getValue('filePathArray'))
        newInfoField.getValue('filePathArray').push(info.response.data.filePath)
        console.log('after upload', newInfoField.getValue('filePathArray'))
        Message.success('图片上传成功')
    }

    function onPublishPlaceChange(value, data, extra) {
        newInfoField.setValue('address', {
            province: extra.selectedPath[0]?.label,
            city: extra.selectedPath[1]?.label,
            region: extra.selectedPath[2]?.label,
        })
    }


    function onModifySuccess(info) {
        console.log('onSuccess : ', info);
        console.log('before upload', modifyField.getValue('filePathArray'))
        modifyField.getValue('filePathArray').push(info.response.data.filePath)
        console.log('after upload', modifyField.getValue('filePathArray'))
        Message.success('图片上传成功')
    }

    function onModifyPlaceChange(value, data, extra) {
        modifyField.setValue('address', {
            province: extra.selectedPath[0]?.label,
            city: extra.selectedPath[1]?.label,
            region: extra.selectedPath[2]?.label,
        })
    }

    const renderOptions = (id, validFlag, verifyFlag, record) => {
        if (isManager) {
            //   if(!validFlag){
            //     return(
            //       <Button type="normal" onClick={updateVerify.bind(id,1)}>审核通过</Button>
            //     )  
            //   }
            return <div style={isPhone ? { 'display': 'inline-grid' } : {}}>
                <Button type="secondary" size={isPhone ? "small" : "medium"} onClick={updateValid.bind(this, id, validFlag ? 0 : 1)}> {validFlag ? "删除信息" : "上架信息"}</Button>
                <Button type="primary" size={isPhone ? "small" : "medium"} onClick={modifyInfo.bind(this, record)}>修改信息</Button>
            </div>
        }
        else {
            return (
                <div >
                    <Button type="primary" size={isPhone ? "small" : "medium"} onClick={openJoinDialog.bind(this, id)}>参与VIP</Button>
                    <Dialog
                        visible={joinVisible}
                        title="申请参与VIP"
                        style={{ width: '500px' }}
                        onOk={submitJoin}
                        onCancel={closeJoin}
                    >
                        <Form field={field} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                            <Form.Item format="tel" formatMessage="请输入正确的电话号码" label="电话号码" required requiredMessage="请输入电话">
                                <Input name="telephone" placeholder="请输入电话号码" />
                            </Form.Item>
                            <Form.Item format="email" formatMessage="请输入正确的邮箱" label="邮箱" required requiredMessage="请输入邮箱">
                                <Input name="email" placeholder="请输入邮箱" />
                            </Form.Item>
                        </Form>
                    </Dialog>
                </div>
            )
        }

    }


    //筛选
    const renderBox = () => {
        //管理员
        if (isManager) {
            return <Box className={isPhone ? styles.TagPhoneBox : styles.TagBox} >
                <div className={styles.TagBoxItem}>
                    <Typography.Text className={isPhone ? styles.TagTitlePhoneName : styles.TagTitleName}>地区</Typography.Text>
                    <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onTagAValueChange} />
                </div>
                <div className={styles.TagBoxItem} style={{ marginTop: 10 }}>
                    <Typography.Text className={isPhone ? styles.TagTitlePhoneName : styles.TagTitleName}>状态</Typography.Text>
                    <TagGroup>{renderTagListB()}</TagGroup>
                </div>
            </Box>
        }
        return <Box className={isPhone ? styles.TagPhoneBox : styles.TagBox}>
            <div className={styles.TagBoxItem}>
                <Typography.Text className={isPhone ? styles.TagTitlePhoneName : styles.TagTitleName}>地区</Typography.Text>
                <CascaderSelect style={{ width: '302px' }} dataSource={dataSource.tagsA} onChange={onTagAValueChange} />
            </div>
            <div className={styles.TagBoxItem}>
                <Typography.Text className={isPhone ? styles.TagTitlePhoneName : styles.TagTitleName}>名称</Typography.Text>
                <Search style={{ width: '302px' }} type={isPhone ? "normal" : "primary"} searchText={isPhone ? "" : "搜索"} onSearch={onSearchClick} />
            </div>
        </Box>
    }

    //渲染VIP信息
    const renderVIPCard = () => {
        return <Card
            // className="free-card custom"
            className={isPhone ? styles.cardPhone : ""}
            free
        >
            <Card.Media style={{ width: isPhone ? "8em" : "12em", height: isPhone ? "8em" : "12em", float: 'left', marginLeft: '20px' }} image="/file/index/qrcode.jpg" />
            {/* <Card.Media style={{ width:"200px",height: "200px",float:'left',paddingTop:'10px'}} image="../public/qrcode.jpg" /> */}
            <div style={{ float: 'left' }} className="free-card-main">
                {
                    isPhone ? <span className={styles.cardPhoneTitle}>VIP充值渠道</span>
                        : <Card.Header title="VIP充值渠道" />
                }

                <Card.Content className={isPhone ? styles.cardPhoneContent : ""}>
                    <div>VIP 信息区只面向VIP用户开放， 不限制发布条数</div>
                    <div>VIP收费标准： 月费：10元/月   年费：200元/月</div>
                    <br />
                    <Button size={isPhone ? "small" : "medium"} type="primary" key="action1" onClick={applyVIP} text> 正式会员申请（已缴费）</Button>
                    <Button size={isPhone ? "small" : "medium"} type="primary" key="action2" onClick={applytVIP} text> 体验会员申请</Button>
                </Card.Content>
            </div>
        </Card>

    }


    //渲染全部页面
    if (isVip) {
        return (
            <>
                <Card free className={styles.BasicList}>
                    {renderBox()}
                    {renderVIPCard()}
                    <Loading visible={loading} className={styles.MainList}>
                        <Box className={styles.MainContent} spacing={10}>
                            <div className={styles.ListItem}>
                                <div className={styles.add}>
                                    <Icon type="add" className={styles.icon} size="xs" />
                                    <div className={styles.addText} onClick={openDialog}>发布VIP信息</div>
                                    <Dialog
                                        visible={visible}
                                        title="VIP信息发布"
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
                                                <Input name="telephone" placeholder="请输入电话号码" />
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
                                                    <Button type="primary" size={isPhone ? "small" : "medium"} style={{ margin: '0 0 10px' }}>Upload File</Button>
                                                </Upload>
                                            </Form.Item>
                                        </Form>
                                    </Dialog>
                                </div>
                            </div>
                            {/* //信息展示 */}
                            {cards.map((c: ICardItem, i: number) => (
                                <div className={styles.ListItem} key={i}>
                                    <div className={styles.main}>
                                        <div className={styles.left}>
                                            <div>
                                                {isPhone ? '' : <img src={c.picturePath?.split(",")[0]} alt="img" />}
                                                <div className={isPhone ? styles.phoneTitle : ""}>
                                                    {c.company}
                                                </div>
                                                {isPhone ? "" : <><div className={styles.content}> VIP简介：{c.content}
                                                </div>
                                                    <div className={styles.subContent}>
                                                        邮箱：{c.email}
                                                    </div>
                                                    <div className={styles.subContent}>
                                                        地址: {c.address}
                                                    </div>
                                                    <div className={styles.subContent}>
                                                        电话号码：{c.telephone}
                                                    </div>
                                                </>
                                                }
                                                <div style={{ marginTop: '8px', color: 'gray', fontSize: '12px' }}>
                                                    发布时间: {c.applyTime}
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.right}>
                                            {renderOptions(c.id, c.validFlag, c.verifyFlag, c)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Box margin={[15, 0, 0, 0]} direction="row" align="center" justify="space-between">
                                <div className={styles.total}>
                                    共<span>{total}</span>条VIP信息
                                </div>
                                <Pagination size={isPhone ? "small" : "medium"} onChange={onPaginationChange} total={total} pageSize={pageSize} />
                            </Box>
                            <Dialog
                                visible={modifyVisible}
                                title="修改信息"
                                style={{ width: '500px' }}
                                onOk={submitModify}
                                onCancel={closeModify}
                            >
                                {/* modifyField */}
                                <Form field={modifyField} fullWidth style={{ paddingLeft: 40, paddingRight: 40 }}>
                                    <Form.Item label="公司名称" required requiredMessage="请输入公司名称">
                                        <Input defaultValue={modifyField.getValue("company")} name="company" placeholder="请输入公司名称" />
                                    </Form.Item>
                                    <Form.Item label="公司简介" required requiredMessage="请输入公司简介">
                                        <Input defaultValue={modifyField.getValue("content")} name="content" placeholder="请输入公司简介" />
                                    </Form.Item>

                                    <Form.Item label="地址" required requiredMessage="请输入发布信息对应地区">
                                        <CascaderSelect
                                            defaultValue={modifyField.getValue("address")?.value}
                                            style={{ width: '302px' }}
                                            dataSource={dataSource.tagsA}
                                            onChange={onModifyPlaceChange} />
                                    </Form.Item>
                                    <Form.Item format="email" formatMessage="请输入正确的邮箱地址" label="邮箱" required requiredMessage="请输入邮箱">
                                        <Input defaultValue={modifyField.getValue("email")} name="email" placeholder="请输入邮箱" />
                                    </Form.Item>
                                    <Form.Item format="tel" formatMessage="请输入正确的电话号码" label="电话号码" required requiredMessage="请输入电话">
                                        <Input defaultValue={modifyField.getValue("telephone")} name="telephone" placeholder="请输入电话号码" />
                                    </Form.Item>
                                    <Form.Item label="图片" requiredMessage="请上传图片">
                                        <Upload
                                            listType="image"
                                            action="/user/upload"
                                            accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                                            beforeUpload={beforeUpload}
                                            onChange={onChange}
                                            onSuccess={onModifySuccess}
                                            defaultValue={modifyField.getValue("picturePath")?.split(',').map((d, i) => { let c = {}; c.id = i; c.url = 'http://www.xycyzs.com/' + d; return c })}
                                        >
                                            <Button type="primary" size={isPhone ? "small" : "medium"} style={{ margin: '0 0 10px' }}>Upload File</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form>
                            </Dialog>
                        </Box>
                    </Loading>
                </Card>
            </>
        )
    }
    else {
        return (
            <>
                <Card free className={styles.BasicList}>
                    {renderBox()}
                    {renderVIPCard()}
                    <div className={styles.MainList}>
                        当前用户无VIP信息区权限，请申请会员后查看！
                                </div>
                </Card>
            </>
        )
    }

};

export default BasicList;

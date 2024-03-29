import React from 'react';
import { Avatar, Overlay, Menu, Icon, Button } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';

const { Item } = Menu;
const { Popup } = Overlay;

export interface Props {
  name: string;
  avatar: string;
  mail: string;
  isManager: boolean;
}

var loginStatus = !!window.sessionStorage.getItem("username")

var isManager = window.sessionStorage.getItem("type")=="manager"

const turnSetting=()=>{
  console.log('turn setting')
  window.location.href='#setting';
}

const turnLogin=()=>{
  window.location.href='/#/user/login';
}

const logOut=()=>{
  axios.get('/logout')
      .then((response)=>{
        window.sessionStorage.removeItem('username')
        window.sessionStorage.removeItem('type')
        // window.localStorage.removeItem('id')
        loginStatus = false
        window.location.reload()
      })
      .catch((error)=>{
        console.log(error)
      })

}

const turnVip=()=>{
  console.log('turn vip')
  window.location.href='#vip';
}

const turnPublish=()=>{
  console.log('turn publish')
  window.location.href='#check';
}


const UserProfile = ({ name, avatar, mail }) => {
  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>
        <Avatar src={avatar} alt="用户头像" />
      </div>
      <div className={styles.content}>
        <h4>{name}</h4>
        <span>{mail}</span>
      </div>
    </div>
  );
};

const HeaderAvatar = (props: Props) => {
  const {name, avatar } = props;


  //登录状态
  if(loginStatus){
    //用户是管理员，则有后台设置
    if(isManager){
      return (
        <>
        <Popup
          trigger={
            <div className={styles.headerAvatar}>
              {/* <Avatar size="small" src={avatar} alt="用户头像" /> */}
              <span style={{ marginLeft: 10 }}>{name}</span>
            </div>
          }
          triggerType="click"
        >
          <div className={styles.avatarPopup}>
            <UserProfile {...props} />
            <Menu className={styles.menu}>
              <Item onClick={turnPublish}><Icon size="small" type="account" />我的发布</Item>
              <Item onClick={turnSetting} ><Icon size="small" type="set" />后台设置</Item>
              <Item onClick={logOut}><Icon size="small" type="exit" />退出</Item>
            </Menu>
          </div>
        </Popup>
          &nbsp;| &nbsp;
          <span onClick={turnVip}>会员服务 </span>
      </>
      );
    }
    else return (
      <>
          <Popup
            trigger={
              <div className={styles.headerAvatar}>
                {/* <Avatar size="small" src={avatar} alt="用户头像" /> */}
                <span style={{ marginLeft: 10 }}>{name}</span>
              </div>
            }
            triggerType="click"
          >
            <div className={styles.avatarPopup}>
              <UserProfile {...props} />
              <Menu className={styles.menu}>
                <Item onClick={turnPublish}><Icon size="small" type="account" />我的发布</Item>
                <Item onClick={logOut}><Icon size="small" type="exit" />退出</Item>
              </Menu>
            </div>
          </Popup>
          &nbsp;| &nbsp;
          <span onClick={turnVip}>会员服务 </span>
      </>
    );
  }
  // 用户未登录
  else{
    return <>

      <span onClick={turnLogin}>登录</span>
       &nbsp;&nbsp;&nbsp; | &nbsp;&nbsp;&nbsp;
      <span onClick={turnVip}>会员服务 </span>
    </>
  }

};

HeaderAvatar.defaultProps = {
  // name:'用户',
  name: window.sessionStorage.getItem('username')?window.sessionStorage.getItem('username'):'用户',
  // mail: 'name@gmail.com',
  // avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
  isManager:false,//   1管理员/2用户
};

export default HeaderAvatar;

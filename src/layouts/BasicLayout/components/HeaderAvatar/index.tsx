import React from 'react';
import { Avatar, Overlay, Menu, Icon } from '@alifd/next';
import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

export interface Props {
  name: string;
  avatar: string;
  mail: string;
  userType: string;
}

const turnSetting=()=>{
  //
  console.log('turn setting')
  window.location.href='#setting';
}


const logOut=()=>{
  window.localStorage.removeItem('name')
  window.localStorage.removeItem('type')
  // window.localStorage.removeItem('id')
  window.location.reload()

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
  const { userType, name, avatar } = props;


  //用户是管理员
  if(userType == "1"){
    return (
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
            <Item><Icon size="small" type="account" />我的发布</Item>
            <Item onClick={turnSetting} ><Icon size="small" type="set" />后台设置</Item>
            <Item onClick={logOut}><Icon size="small" type="exit" />退出</Item>
          </Menu>
        </div>
      </Popup>
    );

  }



  else
    return (
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
          <Item><Icon size="small" type="account" />我的发布</Item>
          <Item><Icon size="small" type="set" />个人设置</Item>
          <Item><Icon size="small" type="exit" />退出</Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: window.localStorage.getItem('name')?window.localStorage.getItem('name'):'Not Defined',
  mail: 'name@gmail.com',
  // avatar: 'https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png',
  userType:'1',//   1管理员/2用户
};

export default HeaderAvatar;

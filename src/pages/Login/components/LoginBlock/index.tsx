import React, { useState } from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';

import { useInterval } from './utils';
import styles from './index.module.scss';
import axios from 'axios';
import cookie from 'cookie'

const { Item } = Form;

export interface IDataSource {
  username: string;
  password: string;
  autoLogin: boolean;
  phone: string;
  code: string;
  longitude: string;
  latitude: string;
  
}

const DEFAULT_DATA: IDataSource = {
  username: '',
  // eslint-disable-next-line @iceworks/best-practices/n'o-secret-info
  password: '',
  autoLogin: true,
  phone: '',
  code: '',
};

interface LoginProps {
  dataSource?: IDataSource;
}




var address, error;





const LoginBlock: React.FunctionComponent<LoginProps> = (
  props = { dataSource: DEFAULT_DATA },
): JSX.Element => {
  const { dataSource = DEFAULT_DATA } = props;

  const [postData, setValue] = useState(dataSource);

  const [isRunning, checkRunning] = useState(false);
  const [isPhone, checkPhone] = useState(false);
  const [second, setSecond] = useState(59);
  const [address, setAddress] = useState({})
  // const [addressMsg, setAddressMsg] = useState({})

  useInterval(
    () => {
      setSecond(second - 1);
      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : null,
  );

  //获取定位
  navigator.geolocation.getCurrentPosition(
      function (position) {
          var longitude = position.coords.longitude;
          var latitude = position.coords.latitude;
          setAddress({
            'longitude':longitude,
            'latitude':latitude
          })
          // alert(longitude);
          // alert(latitude);
      },
      function onError(errorMsg) {
          //alert(error.message);
          error = errorMsg
          switch (error.code) {
            case error.PERMISSION_DENIED:
                Message.error("您拒绝对获取地理位置的请求, 将无法为您自动定位")
                // alert("您拒绝对获取地理位置的请求");
                break;
            case error.POSITION_UNAVAILABLE:
                Message.error("位置信息是不可用的")
                // alert("位置信息是不可用的");


                break;
            case error.TIMEOUT:
                Message.error("请求您的地理位置超时")
                // alert("请求您的地理位置超时");
                break;
            case error.UNKNOWN_ERROR:
                Message.error("未知错误");
                break;
          }
      }
  );



  const formChange = (values: IDataSource) => {
    setValue(values);
  };

  //发送验证码
  const sendCode = (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    // get values.phone
    checkRunning(true);
  };

  const handleSubmit = (values: IDataSource, errors: []) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }
    console.log('values:', values);

    values.longitude = address.longitude
    values.latitude = address.latitude

    axios.post('/login', {
        username:values.username,
        password:values.password,
        autoLogin:values.autoLogin,
        phone:values.phone,
        code:values.code,
        longitude: values.longitude,
        latitude : values.latitude
      })
      .then(function (response) {
        console.log(response);

        if(response.status == 200){
          Message.success('登录成功');
          //跳转至首页
          window.location.href="/index";
        }
        if(response.status == 401){
          Message.error('密码错误');
        }

        //存cookie 用户名 类型 密码
      })
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log('error.response')
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          if(error.response.status == 401){
            Message.error('密码错误')
          }

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('error.request',error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
    });

  };

  // const phoneForm = (
  //   <>
  //     <Item format="tel" required requiredMessage="必填" asterisk={false}>
  //       <Input
  //         name="phone"
  //         innerBefore={
  //           <span className={styles.innerBeforeInput}>
  //             +86
  //             <span className={styles.line} />
  //           </span>
  //         }
  //         maxLength={20}
  //         placeholder="手机号"
  //       />
  //     </Item>
  //     <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
  //       <Input
  //         name="code"
  //         innerAfter={
  //           <span className={styles.innerAfterInput}>
  //             <span className={styles.line} />
  //             <Form.Submit
  //               text
  //               type="primary"
  //               style={{ width: 64 }}
  //               disabled={!!isRunning}
  //               validate={['phone']}
  //               onClick={sendCode}
  //               className={styles.sendCode}
  //             >
  //               {isRunning ? `${second}秒后再试` : '获取验证码'}
  //             </Form.Submit>
  //           </span>
  //         }
  //         maxLength={20}
  //         placeholder="验证码"
  //       />
  //     </Item>
  //   </>
  // );

  const accountForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="username" maxLength={20} placeholder="用户名" />
      </Item>
      <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
        <Input.Password name="password" htmlType="password" placeholder="密码" />
      </Item>
    </>
  );

  const byAccount = () => {
    checkPhone(false);
  };

  const byForm = () => {
    checkPhone(true);
  };

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        {/* <a href="#">
          <img
            className={styles.logo}
            src="https://img.alicdn.com/tfs/TB1KtN6mKH2gK0jSZJnXXaT1FXa-1014-200.png"
            alt="logo"
          />
        </a> */}
        <div className={styles.desc}>
          <span onClick={byAccount} className={isPhone ? undefined : styles.active}>
            账户密码登录
          </span>
          {/* <Divider direction="ver" />
          <span onClick={byForm} className={isPhone ? styles.active : undefined}>
            手机号登录
          </span> */}
        </div>

        <Form value={postData} onChange={formChange} size="large">
          {accountForm}
          {/* {isPhone ? phoneForm : accountForm} */}

          <div className={styles.infoLine}>
            <Item style={{ marginBottom: 0 }}>
              <Checkbox name="autoLogin" className={styles.infoLeft}>
                自动登录
              </Checkbox>
            </Item>
            <div>
              <a href="#/user/resetpassword/" className={styles.link}>
                忘记密码
              </a>
            </div>
          </div>

          <Item style={{ marginBottom: 10 }}>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              登录
            </Form.Submit>
          </Item>
          <div className={styles.infoLine}>
            {/* <div className={styles.infoLeft}>
              其他登录方式 <Icon type="atm" size="small" /> <Icon type="atm" size="small" />{' '}
              <Icon type="atm" size="small" />
            </div> */}
            <a href="#/user/register/" className={styles.link}>
              注册账号
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;

/* eslint-disable @iceworks/best-practices/no-secret-info */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Message, Form } from '@alifd/next';

import { useInterval } from './utils';
import styles from './index.module.scss';
import axios from 'axios'

const { Item } = Form;

export interface RegisterProps {
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  code: string;
}

export default function RegisterBlock() {
  const [postData, setValue] = useState({
    email: '',
    password: '',
    rePassword: '',
    phone: '',
    code: '',
  });

  const [isRunning, checkRunning] = useState(false);
  const [second, setSecond] = useState(59);

  useInterval(() => {
    setSecond(second - 1);
    if (second <= 0) {
      checkRunning(false);
      setSecond(59);
    }
  }, isRunning ? 1000 : null);

  const formChange = (value: RegisterProps) => {
    setValue(value);
  };

  const sendCode = (values: RegisterProps, errors: []) => {

    axios.get('/getSmsCode/register',
      {
        params: {
          telephone: values.telephone
        }
      }
    )
      .then(function (response) {
        console.log(response);
        Message.success('验证码已发送');

        //存cookie 用户名 类型 密码
        // storage.setItem('name', 'Tom');
        // storage.setItem('type','')
      })
      .catch(function (error) {
        console.log(error);
        return;
      });

    // get values.phone
    checkRunning(true);
  };

  const checkPass = (rule: any, values: string, callback: (errors?: string) => void) => {
    if (values && values !== postData.password) {
      return callback('密码不一致');
    } else {
      return callback();
    }
  };

  const checkUserName = (rule: any, values: string, callback: (errors?: string) => void) => {
    axios.get('/hasUsername', {
      params: {
        username: values
      }
    })
      .then((response) => {
        if (response.data.data.flag) {
          return callback('用户名已存在');
        }
        else {
          return callback();
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  };

  //telphone 一样
  // hasTelphone
  const checkTelExist = (rule: any, values: string, callback: (errors?: string) => void) => {
    axios.get('/hasTelephone', {
      params: {
        telephone: values
      }
    })
      .then((response) => {
        if (response.data.data.flag) {
          return callback('电话号码已注册');
        }
        else {
          return callback();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmit = (values: RegisterProps, errors: []) => {
    console.log(values)
    axios.post('/register', values)
      .then((response) => {
        if (response.data.msg == "success") {
          Message.success('注册成功')
          window.location.href="/user/login"
        }
        else {
          Message.error(response.data.msg);
        }
      })
      .catch(function (error) {
        console.log(error);
        Message.error(error)
      });
  };

  return (
    <div className={styles.RegisterBlock}>
      <div className={styles.innerBlock}>
        <p className={styles.desc}>注册账号</p>

        <Form value={postData} onChange={formChange} size="large">
          <Item validator={checkUserName}  validatorTrigger='onBlur' required requiredMessage="必填">
            <Input name="username" size="large" maxLength={20} placeholder="用户名" />
          </Item>
          <Item required requiredMessage="必填">
            <Input.Password
              name="password"
              size="large"
              htmlType="password"
              placeholder="至少六位密码，区分大小写"
            />
          </Item>
          <Item required requiredTrigger="onFocus" requiredMessage="必填" validator={checkPass} >
            <Input.Password
              name="rePassword"
              size="large"
              htmlType="password"
              placeholder="确认密码"
            />
          </Item>
          <Item format="tel" required requiredMessage="必填" asterisk={false} validator={checkTelExist} validatorTrigger='onBlur'>
            <Input
              name="telephone"
              size="large"
              innerBefore={
                <span className={styles.innerBeforeInput}>
                  +86
                  <span className={styles.line} />
                </span>
              }
              maxLength={20}
              placeholder="手机号"
            />
          </Item>
          <Item required requiredMessage="必填">
            <Input
              name="code"
              size="large"
              innerAfter={
                <span className={styles.innerAfterInput}>
                  <span className={styles.line} />
                  <Form.Submit
                    text
                    type="primary"
                    style={{ width: 64 }}
                    disabled={!!isRunning}
                    validate={['phone']}
                    onClick={sendCode}
                    className={styles.sendCode}
                  >
                    {isRunning ? `${second}秒后再试` : '获取验证码'}
                  </Form.Submit>
                </span>
              }
              maxLength={20}
              placeholder="验证码"
            />
          </Item>
          <Item>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
            // validate
            >
              注册账号
            </Form.Submit>
          </Item>
          <Item style={{ textAlign: 'center' }}>
            <a href="#/user/login/" className={styles.link}>
              使用已有账号登录
            </a>
          </Item>
        </Form>
      </div>
    </div>
  );
}

RegisterBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  value: PropTypes.object,
};

RegisterBlock.defaultProps = {
  value: {},
};

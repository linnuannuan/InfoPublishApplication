/* eslint-disable @iceworks/best-practices/no-secret-info */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Message, Form } from '@alifd/next';

import { useInterval } from './utils';
import styles from './index.module.scss';
import axios from 'axios'

const { Item } = Form;

export interface ResetProps {
  userName: string;
  password: string;
  rePassword: string;
  telephone: string;
  code: string;
}

export default function ResetBlock() {
  const [postData, setValue] = useState({
    password: '',
    rePassword: '',
    telephone: '',
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

  const formChange = (value: ResetProps) => {
    setValue(value);
  };

  const sendCode = (values: ResetProps, errors: []) => {

    axios.get('/getSmsCode/resetPassword', 
      {
        params:{
          telephone:values.telephone
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

  const checkTelExist = (rule: any, values: string, callback: (errors?: string) => void) => {
    axios.get('/hasTelephone', {
      params: {
        telephone: values
      }
    })
      .then((response) => {
        if (!response.data.data.flag) {
          return callback('不存在该账户');
        }
        else {
          return callback();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const checkPass = (rule: any, values: string, callback: (errors?: string) => void) => {
    if (values && values !== postData.password) {
      return callback('密码不一致');
    } else {
      return callback();
    }
  };





  const handleSubmit = (values: ResetProps, errors: []) => {

    axios.post('/resetPassword',values)
        .then((response)=>{


          Message.success('修改成功');

        })
        .catch((error)=>{
          console.log('errors', error);
          Message.error(error)
        })

  };

  return (
    <div className={styles.ResetBlock}>
      <div className={styles.innerBlock}>
        <p className={styles.desc}>忘记密码</p>

        <Form value={postData} onChange={formChange} size="large">
        <Item format="tel" validator={checkTelExist} validatorTrigger='onBlur'   required requiredMessage="必填" asterisk={false}>
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
                    validate={['telephone']}
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
          <Item required requiredMessage="必填">
            <Input.Password
              name="password"
              size="large"
              htmlType="password"
              placeholder="至少六位密码，区分大小写"
            />
          </Item>
          <Item required requiredTrigger="onFocus" requiredMessage="必填" validator={checkPass}>
            <Input.Password
              name="rePassword"
              size="large"
              htmlType="password"
              placeholder="确认密码"
            />
          </Item>
          <Item>
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              修改密码
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

ResetBlock.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  value: PropTypes.object,
};

ResetBlock.defaultProps = {
  value: {},
};

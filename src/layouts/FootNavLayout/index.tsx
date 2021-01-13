import React, { useState } from 'react';
import { Shell, ConfigProvider, Menu, Button } from '@alifd/next';
import PageNav from './components/PageNav';
import GlobalSearch from './components/GlobalSearch';
import Notice from './components/Notice';
import SolutionLink from './components/SolutionLink';
import HeaderAvatar from './components/HeaderAvatar';
import Logo from './components/Logo';
import Footer from './components/Footer';
import PhoneNav from './components/PhoneNav';
import { TabBar,Icon } from '@ant-design/react-native';

import styles from './index.module.scss';

//

(function () {
  const throttle = function (type: string, name: string, obj: Window = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

interface IGetDevice {
  (width: number): 'phone' | 'tablet' | 'desktop';
}
export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getDevice: IGetDevice = (width) => {
    const isPhone =
      typeof navigator !== 'undefined' &&
      navigator &&
      navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };
  const [device, setDevice] = useState(getDevice(NaN));


  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth =
        (e && e.target && (e.target as Window).innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }

  const turnVip=()=>{
    window.location.href = '/#/vip/'
  }

  const turnZhaoshang=()=>{
    window.location.href = '/#/invest'
  }

  const turnZhaobiao=()=>{
    window.location.href = '/#/zhaobiao'
  }

  const turnJoin=()=>{
    window.location.href = '/#/join'
  }


  if(device == 'phone'){
    return (
    <ConfigProvider device={device}>
    <Shell
      style={{
        minHeight: '100vh',
      }}
      type="brand"
      fixedHeader={false}
    >
      <Shell.Branding>
        <Logo
          image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
          text="同城信息平台"
        />
      </Shell.Branding>
      <Shell.Action>
        {/* <Notice /> */}
        {/* <SolutionLink /> */}
        <HeaderAvatar />
      </Shell.Action>
      <Shell.AppBar style={{'background':'transparent', 'marginTop':'10px'}}>
        <div style={{width:"100%"}}>
          <div className={styles.appBar} onClick={turnVip}>
            <img src="../public/vip.svg" alt="VIP" width="50%"></img>
            <div>VIP</div>
          </div>
          <div className={styles.appBar} onClick={turnJoin}> 
            <img src="../public/加盟.svg" alt="加盟" width="50%"></img>
            <div>加盟</div>
          </div>
          <div className={styles.appBar} onClick={turnZhaoshang}>
            <img src="../public/招商部.svg" alt="招商" width="50%"></img>
            <div>招商</div>
          </div>
          <div className={styles.appBar} onClick={turnZhaobiao}>
            <img src="../public/转让标签.svg" alt="转让" width="50%"></img>
            <div>转让</div>
          </div>
        </div>
        
      </Shell.AppBar>

      <Shell.Content>
      {children}
      </Shell.Content>
      <Shell.Footer>
        <Footer />
        
      </Shell.Footer>
    </Shell>
  </ConfigProvider>)

  }
  return (
    <ConfigProvider device={device}>
      <Shell
        type="brand"

        style={{
          minHeight: '100vh',
        }}
        fixedHeader={false}
      >
        <Shell.Branding>
          <Logo
            image="https://img.alicdn.com/tfs/TB1.ZBecq67gK0jSZFHXXa9jVXa-904-826.png"
            text="同城信息平台"
          />
        </Shell.Branding>
        <Shell.Action>
          {/* <Notice /> */}
          {/* <SolutionLink /> */}
          <HeaderAvatar />
        </Shell.Action>
        <Shell.Navigation
          align="left"
          direction="hoz"
          style={{
            display: 'contents',
            float:'left'
          }}
        >
        <PageNav />
          
        </Shell.Navigation>

        <Shell.Content>
        {children}
        </Shell.Content>
        <Shell.Footer>
          {/* <Footer /> */}
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="#f5f5f5"
          >
                <TabBar.Item
                  title="Life"
                  icon={<Icon name="home" />}
                  selected={this.state.selectedTab === 'blueTab'}
                  onPress={() => this.onChangeTab('blueTab')}
                >
                  {this.renderContent('Life Tab')}
                </TabBar.Item>
                <TabBar.Item
                  icon={<Icon name="ordered-list" />}
                  title="Koubei"
                  badge={2}
                  selected={this.state.selectedTab === 'redTab'}
                  onPress={() => this.onChangeTab('redTab')}
                >
                  {this.renderContent('Koubei Tab')}
                </TabBar.Item>
                <TabBar.Item
                  icon={<Icon name="like" />}
                  title="Friend"
                  selected={this.state.selectedTab === 'greenTab'}
                  onPress={() => this.onChangeTab('greenTab')}
                >
                  {this.renderContent('Friend Tab')}
                </TabBar.Item>
                <TabBar.Item
                  icon={<Icon name="user" />}
                  title="My"
                  selected={this.state.selectedTab === 'yellowTab'}
                  onPress={() => this.onChangeTab('yellowTab')}
                >
                  {this.renderContent('My Tab')}
                </TabBar.Item>
              </TabBar>
        </Shell.Footer>
      </Shell>
    </ConfigProvider>
  );

}

import React from 'react';
import { Button, ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import { Card } from '@alifd/next';
import styles from './index.module.scss';
import axios from 'axios';

const { Cell } = ResponsiveGrid;


export interface news {
  title?: string;
  validTime?: string;
  moduleFlag?: string;
}

const newInfo = [
  {
    moduleFlag: "招商",
    company: "四川学校食堂劳务承包公告",
    validTime: "1月4日"
  },
  {
    moduleFlag: "加盟",
    company: "北京阿松大餐饮管理有限公司",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "海南中学食堂托管服务招标公告",
    validTime: "1月4日"
  },
  {
    moduleFlag: "加盟",
    company: "北京金百禾餐饮管理有限公司",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  }, {
    moduleFlag: "招商",
    company: "四川学校食堂劳务承包公告",
    validTime: "1月4日"
  },
  {
    moduleFlag: "加盟",
    company: "北京阿松大餐饮管理有限公司",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "海南中学食堂托管服务招标公告",
    validTime: "1月4日"
  },
  {
    moduleFlag: "加盟",
    company: "北京金百禾餐饮管理有限公司",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  }, {
    moduleFlag: "招商",
    company: "四川学校食堂劳务承包公告",
    validTime: "1月4日"
  },
  {
    moduleFlag: "加盟",
    company: "北京阿松大餐饮管理有限公司",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "海南中学食堂托管服务招标公告",
    validTime: "1月4日"
  },
  {
    moduleFlag: "加盟",
    company: "北京金百禾餐饮管理有限公司",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  },
  {
    moduleFlag: "招商",
    company: "郑州金水区餐厅招商",
    validTime: "1月4日"
  }
]
const investData = [
  {
    id: '1',
    company: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email: 'dadas@mail.com',
    url: '(7)',
    applyTime: '2020-12-22',
  },
  {
    id: '2',
    company: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email: 'dadas@mail.com',
    url: '(8)',
    applyTime: '2020-12-22',
  },
  {
    id: '3',
    company: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email: 'dadas@mail.com',
    url: '(9)',
    applyTime: '2020-12-22',
  },
  {
    id: '4',
    company: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email: 'dadas@mail.com',
    url: '(10)',
    applyTime: '2020-12-22',
  },
  {
    id: '5',
    company: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email: 'dadas@mail.com',
    url: '(11)',
    applyTime: '2020-12-22',
  }
]

const mockData = {
  newInfo: newInfo,
  joinApplyList: investData,
  zhaoshangApplyList: investData,
  zhaobiaoApplyList: investData
}


const isPhone = typeof navigator !== 'undefined' &&
  navigator &&
  navigator.userAgent.match(/phone/gi);

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



const renderInfo=(d)=>{
  return (<Card
    className="free-card"
    style={{
      display: 'inline-block',
      width: '100%',
      verticalAlign: 'top',
      // padding: '10px',
      // display: 'flex',
      justifyContent: 'space-between',
      // width: '500px',
      // height: '200px',
    }}
    free
  >
    <Card.Media style={{ width:"20%",height: "50px", float:'left', marginTop: '50%',marginBottom: '-50%'}} image={"/" + d.picPath} />
    <Card.Header title={d.company} style={{ fontSize: 14, paddingRight:'0'}}/>
    <Card.Content>
      <div style={{ fontSize: 12, color: 'gray', float:'right'}}>
        发布时间: {d.applyTime}
      </div>
    </Card.Content>
    <Card.Divider />
  </Card>)

}



const renderContent = (dataSource) => {
  if (isPhone) {
    return (
      <ResponsiveGrid gap={20}>
        <Cell colSpan={12}>
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
        </Cell>
        
        <Cell colSpan={12}>
          <Card free>
            <Card.Header title={"最新公告"} />
            <Card.Divider />
            <Card.Content style={{paddingRight: "0px"}}>
              {dataSource.newInfo.map(d => {
                return <div style={{ width: "100%", float: "left" }}>
                  <span style={{ width: "10%", color: "orange" }}>[{d.moduleFlag == 0 ? "招商" : (d.moduleFlag == 1 ? "加盟" : "招标")}]</span>&nbsp;&nbsp;<span style={{ width: "70%" }}>{d.company}</span>&nbsp;&nbsp;<span style={{ width: "20%", color: "blue", float: "right"}}>{d.validTime}</span>
                </div>
              })}
              {/* </Cell> */}
            </Card.Content>
          </Card>
        </Cell>


        <Cell colSpan={12}>
          <Card free>
            <Card.Header title={"招商信息"} />
            <Card.Divider />
            <Card.Content>
              {
                dataSource.zhaoshangApplyList.map(d => {
                  return renderInfo(d)
                })
              }
            </Card.Content>
          </Card>
        </Cell>

        <Cell colSpan={12}>
          <Card free>
            <Card.Header title={"加盟信息"} />
            <Card.Divider />
            <Card.Content>
              {
                dataSource.joinApplyList.map(d => {
                  return renderInfo(d)
                })
              }
            </Card.Content>
          </Card>
        </Cell>

        <Cell colSpan={12}>
          <Card free>
            <Card.Header title={"转让及招标信息"} />
            <Card.Divider />
            <Card.Content>
              {
                dataSource.zhaobiaoApplyList.map(d => {
                  return renderInfo(d)
                })
              }
            </Card.Content>
          </Card>
        </Cell>

      </ResponsiveGrid>

    )
  }


  return (
    <ResponsiveGrid gap={20}>
      <Cell colSpan={12}>
        {/* <PageHeader
          title="首页"
        /> */}
        <Card free>
          {/* <Card.Header title={"推荐板块"} /> */}
          {/* <Card.Divider /> */}
          <Card.Content>
            <img src="../public/(6).jpg" alt="招商1" width="20%"></img>
            <img src="../public/(2).jpg" alt="招商2" width="20%"></img>
            <img src="../public/(3).jpg" alt="招商3" width="20%"></img>
            <img src="../public/(4).jpg" alt="招商4" width="20%"></img>
            <img src="../public/(5).jpg" alt="招商5" width="20%"></img>
          </Card.Content>
          <Card.Divider />
          {/* <Card.Actions style={{textAlign: 'right'}}>
            <Button type="primary" key="action2" text>更多推荐</Button>
          </Card.Actions> */}
        </Card>
      </Cell>
      <Cell colSpan={12}>
        <Card free>
          <Card.Header title={"最新公告"} />
          <Card.Divider />
          <Card.Content>
            {dataSource.newInfo.map(d => {
              return <div style={{ width: "25%", float: "left" }}>
                <span style={{ width: "15%", color: "orange" }}>[{d.moduleFlag == 0 ? "招商" : (d.moduleFlag == 1 ? "加盟" : "招标")}]</span>&nbsp;&nbsp;<span style={{ width: "60%" }}>{d.company}</span>&nbsp;&nbsp;<span style={{ width: "20%", color: "blue", float: "right", right: '5%' }}>{d.validTime}</span>
              </div>
            })}
            {/* </Cell> */}
          </Card.Content>
        </Card>
      </Cell>


      <Cell colSpan={12}>
        <Card free>
          <Card.Header title={"招商信息"} />
          <Card.Divider />
          <Card.Content>
            {
              dataSource.zhaoshangApplyList.map(d => {
                return <Card
                  className="free-card"
                  style={{
                    display: 'inline-block',
                    width: '20%',
                    verticalAlign: 'top',
                    padding: '10px',
                    // display: 'flex',
                    justifyContent: 'space-between',
                    // width: '500px',
                    // height: '200px',
                  }}
                  free
                >
                  <Card.Media style={{ height: "200px" }} image={"/" + d.picPath} />
                  <Card.Header title={d.company}
                  // subTitle="Sub Title" 
                  // extra={<Button moduleFlag="primary" text>Link</Button>} 
                  />
                  <Card.Divider />
                  <Card.Content>
                    <div>
                      招商简介：{d.content}
                    </div>
                    <div style={{ fontSize: 12, color: 'gray' }}>
                      发布时间: {d.applyTime}
                    </div>

                  </Card.Content>
                  {/* <Card.Actions>
                                <Button moduleFlag="primary" key="action1" text>Action 1</Button>
                                <Button moduleFlag="primary" key="action2" text>Action 2</Button>
                            </Card.Actions> */}
                </Card>
              })
            }
          </Card.Content>
        </Card>
      </Cell>

      <Cell colSpan={12}>
        <Card free>
          <Card.Header title={"加盟信息"} />
          <Card.Divider />
          <Card.Content>
            {
              dataSource.joinApplyList.map(d => {
                return <Card
                  className="free-card"
                  style={{
                    display: 'inline-block',
                    width: '20%',
                    verticalAlign: 'top',
                    padding: '10px',
                    // display: 'flex',
                    justifyContent: 'space-between',
                    // width: '500px',
                    // height: '200px',
                  }}
                  free
                >
                  <Card.Media style={{ height: "200px" }} image={"/" + d.picPath} />
                  <Card.Header title={d.company}
                  // subTitle="Sub Title" 
                  // extra={<Button moduleFlag="primary" text>Link</Button>} 
                  />
                  <Card.Divider />
                  <Card.Content>
                    <div>
                      招商简介：{d.content}
                    </div>
                    <div style={{ fontSize: 12, color: 'gray' }}>
                      发布时间: {d.applyTime}
                    </div>

                  </Card.Content>
                  {/* <Card.Actions>
                                <Button moduleFlag="primary" key="action1" text>Action 1</Button>
                                <Button moduleFlag="primary" key="action2" text>Action 2</Button>
                            </Card.Actions> */}
                </Card>
              })
            }
          </Card.Content>
        </Card>
      </Cell>

      <Cell colSpan={12}>
        <Card free>
          <Card.Header title={"转让及招标信息"} />
          <Card.Divider />
          <Card.Content>
            {
              dataSource.zhaobiaoApplyList.map(d => {
                return <Card
                  className="free-card"
                  style={{
                    display: 'inline-block',
                    width: '20%',
                    verticalAlign: 'top',
                    padding: '10px',
                    // display: 'flex',
                    justifyContent: 'space-between',
                    // width: '500px',
                    // height: '200px',
                  }}
                  free
                >
                  <Card.Media style={{ height: "200px" }} image={"/" + d.picPath} />
                  <Card.Header title={d.company}
                  // subTitle="Sub Title" 
                  // extra={<Button moduleFlag="primary" text>Link</Button>} 
                  />
                  <Card.Divider />
                  <Card.Content>
                    <div>
                      简介：{d.content}
                    </div>
                    <div style={{ fontSize: 12, color: 'gray' }}>
                      发布时间: {d.applyTime}
                    </div>

                  </Card.Content>
                  {/* <Card.Actions>
                                <Button moduleFlag="primary" key="action1" text>Action 1</Button>
                                <Button moduleFlag="primary" key="action2" text>Action 2</Button>
                            </Card.Actions> */}
                </Card>
              })
            }
          </Card.Content>
        </Card>
      </Cell>

    </ResponsiveGrid>
  );
}


const Index = () => {
  axios.post('/homeQuery')
    .then(function (response) {
      // dataSource = response
      console.log(response);
      response.data.newInfo = response.data.zhaoshangApplyList.concat(response.data.joinApplyList).concat(response.data.zhaobiaoApplyList).sort(function (a, b) {
        var x = a['time'];
        var y = b['time'];
        return x > y ? -1 : x < y ? 1 : 0;
      });
      return renderContent(response)
    })
    .catch(function (error) {
      console.log(error);
    });

  return renderContent(mockData)

};

export default Index;

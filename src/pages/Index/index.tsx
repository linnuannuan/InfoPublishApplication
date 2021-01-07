import React from 'react';
import { Button, ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import {Card } from '@alifd/next';
import FusionCardBarChart from './components/FusionCardBarChart';
import FusionCardAreaChart from './components/FusionCardAreaChart';
import FusionCardTypebarChart from './components/FusionCardTypebarChart';
import FusionCardLineChart from './components/FusionCardLineChart';
import FusionCardRankChart from './components/FusionCardRankChart';
import FusionCardPieChart from './components/FusionCardPieChart';
import FusionCardGroupBarChart from './components/FusionCardGroupBarChart';
import { gray } from 'colorette';

const { Cell } = ResponsiveGrid;


const newInfo = [
  {
    type:"招商",
    title:"四川学校食堂劳务承包公告",
    time:"2020-01-04"
  },
  {
    type:"加盟",
    title:"北京阿松大餐饮管理有限公司",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"海南中学食堂托管服务招标公告",
    time:"2020-01-04"
  },
  {
    type:"加盟",
    title:"北京金百禾餐饮管理有限公司",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },{
    type:"招商",
    title:"四川学校食堂劳务承包公告",
    time:"2020-01-04"
  },
  {
    type:"加盟",
    title:"北京阿松大餐饮管理有限公司",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"海南中学食堂托管服务招标公告",
    time:"2020-01-04"
  },
  {
    type:"加盟",
    title:"北京金百禾餐饮管理有限公司",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },{
    type:"招商",
    title:"四川学校食堂劳务承包公告",
    time:"2020-01-04"
  },
  {
    type:"加盟",
    title:"北京阿松大餐饮管理有限公司",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"海南中学食堂托管服务招标公告",
    time:"2020-01-04"
  },
  {
    type:"加盟",
    title:"北京金百禾餐饮管理有限公司",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  },
  {
    type:"招商",
    title:"郑州金水区餐厅招商",
    time:"2020-01-04"
  }
]
const investData= [
  {
    id:'1',
    title: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email:'dadas@mail.com',
    url:'(7)',
    date:'2020-12-22',
  },
  {
    id:'2',
    title: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email:'dadas@mail.com',
    url:'(8)',
    date:'2020-12-22',
  },
  {
    id:'3',
    title: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email:'dadas@mail.com',
    url:'(9)',
    date:'2020-12-22',
  },
  {
    id:'4',
    title: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email:'dadas@mail.com',
    url:'(10)',
    date:'2020-12-22',
  },
  {
    id:'5',
    title: '上海一片天餐饮管理股份有限公司',
    content: '经营地区：欢迎来电洽谈业务合作，上海、南京、长三角、全国。',
    email:'dadas@mail.com',
    url:'(11)',
    date:'2020-12-22',
  }
]

// const generateInfo=(info)=>{
//   let renderInfo = []
//   while(info.length){
//     renderInfo.push[info[0],info[1],info[2]]
//     info = info.slice(3,)
//   }
//   return renderInfo.map(d=>{
//     return <Cell colSpan={12}>
//             <Cell colSpan={4}>
//             </Cell>
//   })
// }

const Index = () => {
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
          <Card.Actions style={{textAlign: 'right'}}>
            <Button type="primary" key="action2" text>更多推荐</Button>
          </Card.Actions>
        </Card>
      </Cell>
      <Cell colSpan={12}>
        <Card free>
          <Card.Header title={"最新公告"} />
          <Card.Divider />
          <Card.Content>
              {newInfo.map(d=>{
                return <div style={{width:"25%", float:"left"}}>
                          <span style={{width:"15%", color:"orange"}}>[{d.type}]</span>&nbsp;&nbsp;<span style={{width:"60%"}}>{d.title}</span>&nbsp;&nbsp;<span style={{width:"20%",color:"blue", float:"right",right:'5%'}}>{d.time}</span>
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
              investData.map(d=>{
                return <Card
                            className="free-card"
                            style={{
                              display: 'inline-block',
                              width: '20%',
                              verticalAlign: 'top',
                              padding:'10px',
                              // display: 'flex',
                              justifyContent: 'space-between',
                              // width: '500px',
                              // height: '200px',
                            }}
                            free
                        >
                            <Card.Media style={{ height: "200px"}} image={"../public/"+d.url+".jpg"} />
                            <Card.Header title={d.title} 
                              // subTitle="Sub Title" 
                              // extra={<Button type="primary" text>Link</Button>} 
                            />
                            <Card.Divider />
                            <Card.Content>
                              <div>
                                招商简介：{d.content}
                              </div>
                              <div style={{fontSize:12,color:'gray'}}>
                                发布时间: {d.date}
                              </div>

                            </Card.Content>
                            {/* <Card.Actions>
                                <Button type="primary" key="action1" text>Action 1</Button>
                                <Button type="primary" key="action2" text>Action 2</Button>
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
              investData.map(d=>{
                return <Card
                            className="free-card"
                            style={{
                              display: 'inline-block',
                              width: '20%',
                              verticalAlign: 'top',
                              padding:'10px',
                              // display: 'flex',
                              justifyContent: 'space-between',
                              // width: '500px',
                              // height: '200px',
                            }}
                            free
                        >
                            <Card.Media style={{ height: "200px"}} image={"../public/"+d.url+".jpg"} />
                            <Card.Header title={d.title} 
                              // subTitle="Sub Title" 
                              // extra={<Button type="primary" text>Link</Button>} 
                            />
                            <Card.Divider />
                            <Card.Content>
                              <div>
                                招商简介：{d.content}
                              </div>
                              <div style={{fontSize:12,color:'gray'}}>
                                发布时间: {d.date}
                              </div>

                            </Card.Content>
                            {/* <Card.Actions>
                                <Button type="primary" key="action1" text>Action 1</Button>
                                <Button type="primary" key="action2" text>Action 2</Button>
                            </Card.Actions> */}
                        </Card>
              }) 
            }
          </Card.Content>
        </Card>
      </Cell>

      {/* <Cell colSpan={12}>
        <Card free>
          <Card.Header title={"VIP板块"} />
          <Card.Divider />
          <Card.Content>
            <img src="../public/vip.jpg" alt="招商" width="20%"></img>
          </Card.Content>
        </Card>
      </Cell> */}

    </ResponsiveGrid>
  );
};

export default Index;

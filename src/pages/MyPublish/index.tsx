import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import PageHeader from '@/components/PageHeader';
import SettingSystemBlock from './components/SettingSystemBlock';

const { Cell } = ResponsiveGrid;

const MyPublish = () => {
  return (
    <ResponsiveGrid>
      <Cell colSpan={12}>
        <PageHeader
          title="发布信息"
          // breadcrumbs={[{ name: '设置页面' }, { name: '系统设置' }]}
          // description="系统设置描述系统设置描述系统设置描述系统设置描述系统设置描述系统设置描述系统设置描述"
        />
      </Cell>

      <Cell colSpan={12}>
        <SettingSystemBlock />
      </Cell>
    </ResponsiveGrid>
  );
};

export default MyPublish;

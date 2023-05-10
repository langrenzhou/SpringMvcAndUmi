import styles from './index.less';
import {useModel} from 'umi';
import {Route,Switch} from 'react-router-dom'
import { Button, Space,Breadcrumb, Layout, Menu, theme } from 'antd';
import { history } from 'umi';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
  LineChartOutlined,
  EyeInvisibleOutlined,
  FolderOpenOutlined,
  DeploymentUnitOutlined,
  DropboxOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import Product_list  from '@/components/product_list';
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuItem[] = [
  getItem('首页', '1', <PieChartOutlined />),
  getItem('系统管理', '2', <DesktopOutlined />, [
    getItem('用户管理', '3',<UsergroupAddOutlined />),
    getItem('角色管理', '4',<UserSwitchOutlined />),
    getItem('资源权限管理', '5',<EyeInvisibleOutlined />),
    getItem('访问日志', '6',<FolderOpenOutlined />),
  ]),
  getItem('基础数据', 'sub1', <LineChartOutlined />, [
    getItem('产品管理', '/product',<DeploymentUnitOutlined />),
    getItem('订单管理', '8',<DropboxOutlined />),
  ]),
];

export default function IndexPage(_memo: any,props: any) {
  const { collapsed, setCollapsed,breadArr,setBreadArr} = useModel('product',model=>({collapsed:model.collapsed, setCollapsed:model.setCollapsed,breadArr:model.breadArr,setBreadArr:model.setBreadArr}));
  const menuClick=(e:any)=>{
    history.push(e.key);
    breadArr.pop()
    breadArr.push(e.key);
    console.log(breadArr)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
      <Menu theme="dark" defaultSelectedKeys={['1']} onClick={menuClick} mode="inline" items={items} />
    </Sider>
    <Layout className="site-layout">
      <Header style={{ padding: 0, background: "#3C8DBC" }} />
      <Content style={{ margin: '0 16px' }}>
       
        <div style={{ padding: 24,margin:'16px 0', minHeight: 580, background: "#F8F8F8" }}>
         <Switch>
           <Route path='/product' exact >
              <Product_list /> 
            </Route>
         </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>后台管理系统</Footer>
    </Layout>
  </Layout>
  );
}

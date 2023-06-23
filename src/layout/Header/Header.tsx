import { Layout, Menu } from "antd";

const { Header } = Layout;

const HeaderLayout = () => {
  const tempTheme = <Menu theme="dark" />;
  return <Header style={{ padding: 0 }}>{tempTheme}</Header>;
};

export default HeaderLayout;

import { Layout } from "antd";
import { ReactNode, useState } from "react";
import FooterLayout from "./Footer/Footer";
import HeaderLayout from "./Header/Header";
import SidebarLayout from "./Sidebar/Sidebar";

const { Content } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarLayout collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout>
        <HeaderLayout />
        <Content style={{ margin: 24 }}>{children}</Content>
        <FooterLayout />
      </Layout>
    </Layout>
  );
};

export default MainLayout;

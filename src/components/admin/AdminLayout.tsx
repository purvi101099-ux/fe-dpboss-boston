import React, { useState } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Avatar,
  Space,
  Button,
  theme,
  Grid,
  Drawer,
  ConfigProvider,
  message,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  BulbOutlined,
  BulbFilled,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { TOKEN } from "@/utils/constants";
import { COMMON_MESSAGES } from "@/utils/message-const";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const isMobile =
    screens.md === false || (Object.keys(screens).length > 0 && !screens.md);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: (
        <DashboardOutlined style={{ fontSize: isMobile ? "16px" : "18px" }} />
      ),
      label: (
        <Link
          to="/admin/dashboard"
          style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 500 }}
          onClick={() => isMobile && setDrawerVisible(false)}
        >
          Dashboard
        </Link>
      ),
    },
    {
      key: "/admin/bazar",
      icon: <ShopOutlined style={{ fontSize: isMobile ? "16px" : "18px" }} />,
      label: (
        <Link
          to="/admin/bazar"
          style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 500 }}
          onClick={() => isMobile && setDrawerVisible(false)}
        >
          Bazar Market
        </Link>
      ),
    },
    {
      key: "/admin/bazar-result",
      icon: (
        <UnorderedListOutlined
          style={{ fontSize: isMobile ? "16px" : "18px" }}
        />
      ),
      label: (
        <Link
          to="/admin/bazar-result"
          style={{ fontSize: isMobile ? "13px" : "14px", fontWeight: 500 }}
          onClick={() => isMobile && setDrawerVisible(false)}
        >
          Bazar Result
        </Link>
      ),
    },
  ];

  const profileMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: (
        <span style={{ fontSize: isMobile ? "12px" : "14px" }}>
          User Profile
        </span>
      ),
    },
    {
      key: "password",
      icon: <LockOutlined />,
      label: (
        <span style={{ fontSize: isMobile ? "12px" : "14px" }}>
          Change Password
        </span>
      ),
    },
    {
      type: "divider" as const,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: (
        <span style={{ fontSize: isMobile ? "12px" : "14px" }}>Logout</span>
      ),
      onClick: () => {
        localStorage.removeItem(TOKEN);
        message.success(COMMON_MESSAGES.LOGOUT_SUCCESS);
        navigate("/sign-in");
      },
    },
  ];

  const SideMenu = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          height: 64,
          margin: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <h2
          style={{
            color: "var(--pink-logo)",
            fontFamily: "Lobster, cursive",
            margin: 0,
            fontSize: isMobile ? "1.2rem" : collapsed ? "1.1rem" : "1.4rem",
            letterSpacing: "0.5px",
          }}
        >
          {isMobile ? "DPBOSS" : collapsed ? "DB" : "DPBOSS"}
        </h2>
      </div>
      <Menu
        theme={isDarkMode ? "dark" : "light"}
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        style={{ borderRight: 0, marginTop: 16, flex: 1 }}
      />
    </div>
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: "#1e40af",
          borderRadius: 6,
          fontSize: 13, // Standard small font for project
          fontSizeHeading1: 18,
          fontSizeHeading2: 17,
          fontSizeHeading4: 15,
        },
      }}
    >
      <Layout
        style={{
          minHeight: "100vh",
          background: isDarkMode ? "#000" : "#f5f7fa",
        }}
      >
        {!isMobile ? (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme={isDarkMode ? "dark" : "light"}
            width={250}
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              zIndex: 10,
              position: "sticky",
              top: 0,
              height: "100vh",
            }}
          >
            {SideMenu}
          </Sider>
        ) : (
          <Drawer
            placement="left"
            closable={true}
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            styles={{ body: { padding: 0 } }}
            width={250}
          >
            {SideMenu}
          </Drawer>
        )}

        <Layout>
          <Header
            style={{
              padding: isMobile ? "0 12px" : "0 24px",
              background: isDarkMode ? "#141414" : colorBgContainer,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,21,41,0.08)",
              zIndex: 9,
              position: "sticky",
              top: 0,
              width: "100%",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                type="text"
                icon={
                  isMobile ? (
                    <MenuUnfoldOutlined />
                  ) : collapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() =>
                  isMobile ? setDrawerVisible(true) : setCollapsed(!collapsed)
                }
                style={{
                  fontSize: "18px",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Button
                type="text"
                icon={
                  isDarkMode ? (
                    <BulbFilled style={{ color: "#fadb14" }} />
                  ) : (
                    <BulbOutlined />
                  )
                }
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                  fontSize: "18px",
                  width: 40,
                  height: 40,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
              <Dropdown
                menu={{ items: profileMenuItems }}
                placement="bottomRight"
                arrow={{ pointAtCenter: true }}
                trigger={["click"]}
              >
                <div
                  style={{
                    cursor: "pointer",
                    padding: isMobile ? "4px 8px" : "4px 12px",
                    borderRadius: borderRadiusLG,
                    transition: "all 0.3s",
                    display: "flex",
                    alignItems: "center",
                    gap: isMobile ? "8px" : "12px",
                  }}
                  onMouseEnter={(e) =>
                    !isMobile &&
                    (e.currentTarget.style.background = isDarkMode
                      ? "#333"
                      : "#f0f2f5")
                  }
                  onMouseLeave={(e) =>
                    !isMobile &&
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <Avatar
                    size={isMobile ? "small" : "middle"}
                    icon={<UserOutlined />}
                    style={{
                      backgroundColor: "var(--blue-btn)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      lineHeight: 1.2,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: isMobile ? "12px" : "14px",
                        color: isDarkMode ? "#fff" : "#141414",
                      }}
                    >
                      Admin
                    </span>
                    {!isMobile && (
                      <span style={{ fontSize: "11px", color: "#8c8c8c" }}>
                        Web Master
                      </span>
                    )}
                  </div>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content
            style={{
              margin: isMobile ? "12px 8px" : "24px",
              padding: isMobile ? "12px" : "24px",
              minHeight: "calc(100vh - 110px)",
              background: isDarkMode ? "#141414" : colorBgContainer,
              borderRadius: borderRadiusLG,
              boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;

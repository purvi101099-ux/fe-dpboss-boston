import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import {
  ArrowUpOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  DownloadOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import CommonPageHeader from "@/components/common/CommonPageHeader";

const Dashboard: React.FC = () => {
  return (
    <div>
      <CommonPageHeader
        title="Admin Dashboard"
        icon={<DashboardOutlined />}
        buttonLabel="Download Report"
        buttonIcon={<DownloadOutlined />}
      />
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Total Users"
              value={112893}
              precision={0}
              valueStyle={{ color: "#3f51b5" }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Active Sessions"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3fcf8e" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Daily Transactions"
              value={93}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} hoverable>
            <Statistic
              title="Revenue"
              value={12034}
              precision={2}
              valueStyle={{ color: "#f5222d" }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <div style={{ marginTop: 24 }}>
        <Card title="Quick Stats" bordered={false}>
          <p>
            Welcome to the admin panel. Here you can manage your application
            settings and users.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

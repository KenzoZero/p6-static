import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import { withRouter } from "react-router-dom";

const { Header } = Layout;

const logo = {
  width: "35px",
  height: "35px",
  margin: "14px 5px 14px 5px",
  float: "left"
};

class AppHeader extends Component {
  state = {
    activeMenu: "dashboard"
  };

  onClick = ({ key }) => {
    const { history } = this.props;
    history.push(`/${key}`);
    return false;
  };

  render() {
    return (
      <Header>
        <img
          style={logo}
          src={`${process.env.PUBLIC_URL}/logo.png`}
          title="PicoSix Static"
          alt="PicoSix Static"
        />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.state.activeMenu]}
          style={{ lineHeight: "64px" }}
          onClick={this.onClick}
        >
          <Menu.Item key="dashboard">
            <Icon type="dashboard" /> Dashboard
          </Menu.Item>
          <Menu.Item key="images">
            <Icon type="database" /> Images
          </Menu.Item>
          <Menu.Item key="users">
            <Icon type="user" /> Users
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon type="setting" /> Settings
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default withRouter(AppHeader);
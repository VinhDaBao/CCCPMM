import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

import {
  UsergroupAddOutlined,
  HomeOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const [current, setCurrent] = useState("home");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  const cartCount = cart?.items?.length || 0;

  const items = [
    {
      label: <Link to="/">Home Page</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },

    {
      label: (
        <span
          onClick={() => navigate("/cart")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            cursor: "pointer",
          }}
        >
          <ShoppingCartOutlined />
          Cart

          <span
            style={{
              background: "red",
              color: "white",
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            {cartCount}
          </span>
        </span>
      ),
      key: "cart",
    },

    ...(auth.isAuthenticated
      ? [
        {
          label: <Link to="/user">Users</Link>,
          key: "user",
          icon: <UsergroupAddOutlined />,
        },
      ]
      : []),

      {
        label: `Welcome ${auth?.user?.email ?? ""}`,
        key: "submenu",
        icon: <SettingOutlined />,

        children: auth.isAuthenticated
          ? [
            {
        label: (
          <Link to="/my-orders">
            Đơn hàng của bạn
          </Link>
        ),
        key: "orders",
      },
            {
              label: (
                <span
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    dispatch(logout());
                    navigate("/login");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              ),
              key: "logout",
            },
          ]
          : [
             
            {
              label: <Link to="/login">Đăng nhập</Link>,
              key: "login",
            },
          ],
      },
    ];

  return (
    <div style={{ marginBottom: 20 }}>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default Header;
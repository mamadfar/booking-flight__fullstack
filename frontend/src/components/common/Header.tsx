import React, {useState} from 'react';
import {Layout, Menu, MenuProps} from "antd";
import {AppstoreOutlined, MailOutlined} from "@ant-design/icons";
import {Link, NavLink} from "react-router-dom";

const { Header: AntHeader } = Layout;

const items: MenuProps['items'] = [
    {
        key: 'home',
        icon: <MailOutlined />,
        label: (
            <Link to="/">Home</Link>
        ),
    },
    {
        key: 'about',
        icon: <AppstoreOutlined />,
        label: (
            <Link to="/about">About</Link>
        ),
    },
];

const Header = () => {

    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <AntHeader className="flex bg-cyan-800 sticky top-0 z-10 w-full">
            <div
                className="w-32 h-7 my-auto bg-slate-300/60 rounded-sm"
            />
            <Menu theme="dark" onClick={onClick} className="bg-inherit ml-auto" selectedKeys={[current]} mode="horizontal" items={items} />
        </AntHeader>
    );
};

export default Header;

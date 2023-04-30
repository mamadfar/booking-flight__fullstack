import React, {FC, ReactNode} from 'react';
import {Layout} from "antd";
// import dayjs from "dayjs";
import {Header} from "../components";

const {Content, Footer} = Layout;

interface IMainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<IMainLayoutProps> = ({children}) => {
    return (
        <Layout className="min-h-screen">
            <Header/>
            <Content className="site-layout p-10">
                <div className="">
                    {children}
                </div>
            </Content>
            <Footer className="text-center">
                {/*{dayjs().format("DD/MM/YYYY").toString()}*/}
                ❤
            </Footer>
        </Layout>
    );
};

export default MainLayout;

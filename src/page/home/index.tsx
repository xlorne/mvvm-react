import React from 'react';
import {Button, Space} from "antd";
import {useNavigate} from "react-router";
import {PageContainer} from "@ant-design/pro-components";

const Home = () => {

    const navigate = useNavigate();

    const goPage = (page:string) => {
        navigate(page);
    }

    return (
        <PageContainer
            title="Home"
        >
            <div>
                <Space>
                    <Button onClick={()=>goPage('/about')} type="primary">About</Button>

                    <Button onClick={()=>goPage('/user')} type="primary">User</Button>
                </Space>
            </div>

        </PageContainer>
    );
}

export default Home;

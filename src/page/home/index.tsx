import React from 'react';
import {Button, Space} from "antd";
import {useNavigate} from "react-router";
import {PageContainer} from "@ant-design/pro-components";

const Home = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/about');
    }
    return (
        <PageContainer>
            <h1>Home</h1>

            <div>
                <Space>
                    <Button onClick={handleClick} type="primary">About</Button>
                </Space>
            </div>

        </PageContainer>
    );
}

export default Home;

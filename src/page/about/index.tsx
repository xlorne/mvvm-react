import React from 'react';
import {Button, Space} from "antd";
import {useNavigate} from "react-router";
import {PageContainer} from "@ant-design/pro-components";

const About = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }
    return (
        <PageContainer
            title="About"
        >
            <div>
                <Space>
                    <Button onClick={handleClick} type="primary">Home</Button>
                </Space>
            </div>

        </PageContainer>
    );
}

export default About;

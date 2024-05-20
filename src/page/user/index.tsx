import React from "react";
import {UserComponent} from "../../component/user";
import userPresenter from "../../presenter/user";
import {PageContainer} from "@ant-design/pro-components";

const User  =() => {
    return (
        <PageContainer
            title={'用户管理'}
        >
            <UserComponent userPresenter={()=>userPresenter()}/>
        </PageContainer>
    )
}

export default User;

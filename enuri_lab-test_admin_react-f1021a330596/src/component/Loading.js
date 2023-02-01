/* eslint-disable */

import React from 'react';
import {Background, LoadingText} from '../Styles';
import Loading_Spinner from '../img/Loading_Spinner.gif';

export const Loading = () => {
    return(
        <Background>
            <LoadingText>로딩 중 입니다.</LoadingText>
            <img src={Loading_Spinner} alt='로딩중' width='5%' />
        </Background>
    );
};

export default Loading;
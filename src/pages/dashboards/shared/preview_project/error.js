import React from 'react';
import style from 'styled-components';

const WrapError = style.div`
.top{
    height: 300px;
    background: #f5f5f5;
    h1{
        font-weight: 400;
        color: #464646;
    }
    p{
        font-weight: 300;
        color: #666;
    }
}
`;

const Error = ()=> {
        return <WrapError className="xs-12">
            <div className="top xs-12">
                <div className='c-w i-h'>
                    <div className='c i-h t-c'>
                        <h1>Server Error</h1>
                        <p>I cant find this project's data for some reason</p>
                    </div> 
                </div>
            </div>

        </WrapError>
}

export default Error;


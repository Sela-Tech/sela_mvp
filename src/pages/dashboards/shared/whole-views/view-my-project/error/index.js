import React from 'react';
import styled from 'styled-components';

const ErrorWrap = styled.div`
height: calc(100vh - 70px);
h1{
    font-weight: 300;
}
`;

class Error extends React.Component{
    render(){
        return <ErrorWrap className='xs-12'>
            <div className='xs-12 c-w i-h'>
                <div className='c t-c'>
                    <h1>You cannot see this page because you did not create the project.</h1>            
                </div>
            </div>
        </ErrorWrap>;
    }
}

export default Error;
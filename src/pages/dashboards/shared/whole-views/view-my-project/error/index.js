import React from 'react';
import styled from 'styled-components';

const ErrorWrap = styled.div``;

class Error extends React.Component{
    render(){
        return <ErrorWrap className='xs-12'>
            <h1>You cannot see this page because you did not create the project.</h1>
        </ErrorWrap>;
    }
}

export default Error;
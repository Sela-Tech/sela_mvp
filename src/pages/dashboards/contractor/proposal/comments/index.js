import React from 'react';
import styled from 'styled-components';

const CommentWrap = styled.div`
background: white;
height: calc(100% - 70px);
border-left: 1px solid #eee;
`;

class Comments extends React.Component{
    render(){
        return <CommentWrap className='xs-12'>
        </CommentWrap>
    }
}

export default Comments;

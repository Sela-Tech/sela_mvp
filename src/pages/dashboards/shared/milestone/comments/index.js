import React from 'react';
import styled from 'styled-components';
import arrow from "../../../../../assets/icons/arrow.svg";
import { create_comment } from '../../../../../store/action-creators/milestone';
import {connect} from 'react-redux';

const CommentWrap = styled.div`
    
    background: white;
    height: calc(100% - 208px);
    border-left: 1px solid #eee;
    padding: 1em 0 0 0;
    
    h2{
        margin: 0 0 1em;
        line-height: 29px;
        font-size: 16.5px;
        font-weight: 500;
        color: #201D41;
    }

    .comments{
        height: calc(100vh - (80px + 290px));
        position: relative;  
        width: calc(100% + 100px);
        padding-right: 100px;
       
        @media(min-width: 768px){
            overflow: auto;
        }
        .comment{
            margin: 15px 0;

            .img-c{
                width: 60px;
                float: left;
            }

            img{
                height: 45px;
                width: 45px;
                object-fit: contain;
                object-position: center;
                background: #eee;
                border-radius: 35px;
                text-align: center;
                margin: auto;
            }

            h4{
                line-height: 16px;
                font-size: 14px;
                color: #3D4851;
                margin:0 0 10px 0;
                font-weight: 400;
                display: inline-block;
            }

            span{
                line-height: 16px;
                font-size: 10px;
                font-weight: 300;
                color: #696F74;
                margin-left: 5px;
                display: inline-block;
            }

            p{
                margin: 0;
                line-height: 17px;
                font-size: 12px;
                font-weight: 300;
                color: #3D4851;
            }
        }
    }

    .text-place {
        position: absolute;
        bottom: 70px;
        background: white;
        width: 100%;
        left: 0;
        right: 0;
        padding: 1em 2em;
        border-left: 1px solid #eee;

        @media(max-width: 768px){
            position: fixed;
            bottom: 0px;
            height: 80px;
            background: white;
            width: 100%;
            left: 0;
            right: 0;
            padding: 1em 2em 0;
        }

        textarea{
            background: #FFFFFF;
            border: 1px solid #B1BAD2;
            box-sizing: border-box;
            border-radius: 4px;
            padding: 0.5em;
            font-size: 0.95em;
            font-weight: 300;
            height: 4em;
            resize: none;
            width: 100%;
        }

        button{
            height: 50px;
            width: 50px;
            margin-left: 15px;
            border-radius: 50px;
            border: 0;
            background: #1f1e42;
            &:hover{
                filter: contrast(85%);
            }
            img{
                height: 1.5em;
                width: 1.5em;
                object-fit: contain;
                margin-top: 0.5em;
                filter: invert(100%);
            }
        }
    }
`;

class Comments extends React.Component{
    state= {
        comment: ""
    }

    handleChange = (e)=>{
        e.persist();
        this.setState({
            comment: e.target.value
        })
    }
    componentWillReceiveProps(nextProps){
        if( this.props.myComments !== nextProps.myComments ){
            var objDiv = this.refs.comments;
            objDiv.scrollTop = objDiv.scrollHeight + 500000;
        }
    }

    submitComment = () => {
        this.props.create_comment(this.state.comment);
        setTimeout(()=>{
                this.setState({comment: ''})
        },0)
    }
    
    render(){
        const { comment } = this.state;
        const {comments} = this.props;
        
        return <CommentWrap className='xs-12'>
            <div className='xs-10 xs-off-1'>
                <h2>Comments</h2>
            {comments && Boolean(comments.length) ?
            <div className='xs-12 comments' ref="comments">
                {comments.map((comment_data,i)=>{
                    return <div className='xs-12 comment' key={i}>
                        <div className="img-c t-c">
                        <img src={comment_data.actor.profilePhoto} alt=""/>
                    </div>
                    <div className="xs-9">
                        <h4>{comment_data.actor.firstName + " " + comment_data.actor.lastName}</h4> 
                        <p>
                            {comment_data.comment}
                        </p>
                    </div>
                    </div>
                })}
            </div>     
        :
            <div className='xs-12 comments' ref="comments">
                { Boolean(this.props.myComments.length) ?
                this.props.myComments.map((comment_data,index)=>{
                    return <div className='xs-12 comment' key={index}>
                    <div className="img-c t-c">
                        <img src={comment_data.profilePhoto} alt=""/>
                    </div>
                    <div className="xs-9">
                        <h4>{comment_data.fullName}</h4> 
                        <p>
                            {comment_data.comment}
                        </p>
                    </div>
                </div>
                }) : 
                <div className='xs-12 comment'>
                    <h4>No Comments</h4>
                </ div>
                }
            </div>
            }
            {this.props.isNotEditable !== true &&
                <div className='xs-12 text-place'>
                    <div className='xs-9'>
                        <textarea name="text" value={comment} onChange={this.handleChange}></textarea>
                    </div>
                    <div className='xs-3 t-c'>
                        <button onClick={this.submitComment}><img src={arrow} alt='arrow'/></button>
                    </div>
                </div>
            }
            </div>
            
        </CommentWrap>
    }
}

const mapStateToProps = state => {
    const {firstName, lastName, profilePhoto} = state.auth.credentials;

    return {
        myComments: state.milestone.comments.map(comment=>{
            return {
                profilePhoto,
                fullName: firstName + " " + lastName,
                comment
            }
        })
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        create_comment: text => dispatch(create_comment(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)( Comments );

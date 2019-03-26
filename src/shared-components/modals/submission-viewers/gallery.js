import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const GalleryViewerStyled = styled.div`
    height: 100%;

    #blow-up, #big-view{
        height: 80%;
        margin-top: 5%;
        width: 100%;
        display:  block;
        object-fit: contain;
        object-position: center;
    }

    .bg{
        background-color: #fcfcfc;
    }
    .selecter{
        height: 100%;
        overflow: auto;
        border-right: 1px solid #fafafa;

        .row{
            padding: 1em;
            cursor: pointer;
            & + .row{
                border-top: 1px solid #fafafa;
            }
            &:hover, &.active{
                background: #fcfcfc;
            }
            *{
                text-align: left;
            }
            .media{
                img{
                    margin-right: 1em;
                    height: 4em;
                    width: 4em;
                    background: gray;
                    display: block;
                }
            }
            .text{
                
                label{
                    font-size: 0.75em;
                    color: #aaa;
                    display: block;
                    margin-bottom: 0.15em;
                    padding: 0;
                }
                h3{
                    font-size: 0.9em;
                    color: #141414;
                    display: block;
                    padding: 0;
                    margin: 0;
                }
            }

        }
    }
`

class GalleryViewer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            focus: ''
        }
    }

    focusOn = reference => {
        this.setState({
            focus: this.props.data.submissions.filter(submission=>{
                return submission.evidence === reference
            })[0].evidence
        })
    }

    render(){
        const { data } = this.props;
        const { submissions } = data;  
        const {focus} = this.state;      
        
        return <GalleryViewerStyled className='xs-12'>
            
            <div className='xs-3 i-h selecter'>
                {submissions && submissions.map((sub,i)=>{
                    return <div className={`xs-12 row ${focus === sub.evidence ? 'active':'' }`} 
                    key={i} onClick={()=>this.focusOn(sub.evidence)}>

                    <div className='media f-l'>
                        <img src={sub.evidence} alt=""/>
                    </div>

                    <div className='text f-l'>
                        <label>Submitted By</label>
                        <h3>{sub.user.fullName}</h3>
                        <label>{moment(sub.Date).format("DD MMMM YYYY")}</label>  
                    </div>
                </div>
                
                })}
                
            </div>
            
            <div className='xs-9 i-h bg'>
                {focus ? 
                    <img src = {focus} alt = "" id='blow-up'  />
                :
                    <div className='c-w i-h'>
                        <div className='c t-c'>
                            <p>No Submission Selected.</p>
                        </div>
                    </div>
            }
            </div>


        </GalleryViewerStyled>
    }
}

export default GalleryViewer
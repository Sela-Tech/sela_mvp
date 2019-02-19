import React from "react";
import styled from "styled-components";
import {connect} from 'react-redux';
import moment from "moment";

const DocWrapper = styled.div`
h3,p{
    margin: 0;
}
h3,p{
    font-weight: 300;
}
.doc{
    margin: 1.25em 0;
}

    .doc-download{
        padding: 0.75em 1.25em;
        border: 1.5px solid rgba(242,153,74,0.97);
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 15px;
        text-align: center;
        font-weight: 300;
        color: rgba(242,153,74,0.97);
    }

    .date{
        margin-top: 15px;
        color: #666;
        font-size: 14px;   
    }
}
`;

class Docum extends React.Component{
    render(){
        return <DocWrapper className='xs-12'>
            <div className='xs-10 xs-off-1'>
                {this.props.project.documents && this.props.project.documents.map((doc,i)=>{
                    return <div className='xs-12 doc'>
                        <div className='xs-12 sm-7'>
                            <h3>{doc.name}</h3>
                            <p>{doc.filetype}</p>
                            <p className='date'>{moment(doc.createdAt).format("YYYY-MM-DD")}</p>

                        </div>
                        <div className='xs-12 sm-5'>
                            <a className='doc-download' href={doc.doc} target="_blank" rel='noopenner noreferrer'>Download</a>
                        </div>
                    </div>
                })}
            </div>
        </DocWrapper>
    }
}

const mapStateToProps = state=>{

}

export default connect(mapStateToProps)(Docum)
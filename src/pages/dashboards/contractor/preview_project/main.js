import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import WrapStyle from "./main.style";
// import moment from 'moment';
import mapping from "../../../../mapping";
import { withRouter, Link } from 'react-router-dom';

class MainViewForPreviewingProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            info: props.info
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(Boolean(nextProps.info)){
                this.setState({
                    info: nextProps.info
                })
            }
        }
    }
    
    render(){

        const { info } = this.state,
        splited_description = info.description.split(".");
        const { sdgs, hasSubmitted, documents } = info;


        const project_id = this.props.match.params.id, contractor_id = this.props.my_id;
        
        const withBreaks = splited_description.map((text,i)=>{
            return <Fragment key={i}>
            {`${text}${ i !== splited_description.length - 1  ? ".": ""}`} 
            {  i % 2 === 0 && <Fragment><br/><br/></Fragment>}
             </Fragment>
        });

        const Boxes = sdgs.map((sdg,i)=>{
            return <div key={i} className={'xs-4 sm-3 md-4'}>
                <button className={`${'xs-10 xs-off-1 '} sdg-btn`}>
                    <img src={mapping[sdg]} alt="sdg"/>
                </button>
            </div>
        });

        return <WrapStyle className='xs-12'>
            <div className='xs-12'>
                <img id='header' src={info.image} alt={info.image} />
            </div>
            <div className='xs-12 contain'>
                <div className='xs-12 md-6 pad'>
                    <div className="xs-12 sm-9 text">
                        <h2>{info.title}</h2> 
                    </div>
                    <div className="xs-12 sm-3">
                        <button id='status'> {info.status} </button>                    
                    </div>
                    <div className='xs-12 bg-text'>
                    <p>{withBreaks}</p>
                    </div>
                    <div className='xs-12 add-doc'>
                        <h5>Additional documents</h5>
                        
                        <div className='xs-12 sm-10 document'>
                            {
                                documents.map((doc,i)=>{
                                return <div className='xs-12 inner' key={i}>
                                    <div className={`img preview-${doc.type} xs-3 sm-2`}/>
                                    <div className='text xs-6 sm-7'>
                                    <h4>{doc.name}</h4>
                                        <p>{doc.size}</p>
                                    </div>
                                    <div className='download xs-2 sm-2'>
                                        <a href={doc.url} rel='noopenner noreferrer' target="_blank"> Download</a>
                                    </div>
                                </div>
                                })
                            }
                        </div>

                    </div>
                </div>

                <div className='xs-12 md-4 pad' id='initiated'>
                    <h3>Initiated By</h3>
                    <div className='xs-12 border-top-bottom'>
                        <div className='xs-4 sm-3 md-2'>
                            <img src={ Boolean(info.initiated_by.avatar) ? info.initiated_by.avatar: "https://placehold.it/50"} alt='avatar'/>
                        </div>
                        <div className='xs-8 sm-9 md-10'>
                            <h5>{info.initiated_by.name}</h5>
                            <span>{info.initiated_by.user_type}</span>
                        </div>
                    </div>
                    <div className='xs-12 p-text'>
                        <div className='xs-12'>
                            <span id="location"/><p>{info.location}</p>
                        </div>
                        <div className='xs-12'>
                            <span id="money"/><p>{info.goal}</p>
                        </div>
                        <div className='xs-12'>
                            <span id="duration"/><p>{info.expected_duration}</p>
                        </div>
                    </div>
                    <div className='xs-12'>
                        {Boxes}
                    </div>
                </div>
                
                <div className='xs-12 md-2 pad'>
                { hasSubmitted ?
                    <Link to={`/dashboard/proposal/${project_id}/${contractor_id}/view`} className='btn-proposal inverse'>View Proposal</Link>
                : 
                    <Link to={`/dashboard/proposal/${project_id}/${contractor_id}`} className='btn-proposal'>Submit Proposal</Link>
                }
                </div>
            </div>
        </WrapStyle>
    }
}

const mapStateToProps = state=>{
    const { preview_info } = state.contractor;
    
    let obj = {
        info: preview_info,
        my_id: state.auth.credentials.id
    }
    return obj;
}

export default withRouter(connect(mapStateToProps)(MainViewForPreviewingProject))
import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import WrapStyle from "./main.style";
import moment from 'moment';

class MainViewForPreviewingProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            info: {
                image: "http://placehold.it/250",
                title: "World Bank Rural Electrification Project",
                documents: [{
                    name: "Project scope-final verson.pdf",
                    id:"",
                    size: "122 KB",
                    url:"",
                    type: "pdf"
                }],
                status:"Proposed",
                description: `Energy is at the heart of development.  Without energy, communities live in darkness, essential services such as clinics and schools suffer, and businesses operate under crippling constraints. Because the process is taking longer than expected and will not be completed by the original closing date a one year extension is being requested. 

                Without energy, communities live in darkness, essential services such as clinics and schools suffer, and businesses operate under crippling constraints. Because the process is taking longer than expected and will not be completed by the original closing date a one year extension is being requested. 
                
                Communities live in darkness, essential services such as clinics and schools suffer, and businesses operate under crippling constraints.`,
                submitted: false,
                extra:{
                    initiated_by: {
                        id:"",
                        name: "Mohammed Kane",
                        user_type: "funder",
                        avatar: "http://placehold.it/100"
                    },
                    expected_duration: `${moment(new Date()).format("DD MMM YY")} - ${moment(new Date()).format("DD MMM YY")}`,
                    sdgs: []
                }
            }
        }
    }
    
    render(){
        const {info} = this.state,
        splited_description = info.description.split(".");

        const withBreaks = splited_description.map((text,i)=>{
            return <Fragment key={i}>
            {`${text}${ i !== splited_description.length - 1  ? ".": ""}`} 
            {  i % 2 === 0 && <Fragment><br/><br/></Fragment>}
             </Fragment>
        });

        return <WrapStyle className='xs-12'>
            <div className='xs-12'>
                <img id='header' src={info.image} alt={info.image} />
            </div>
            <div className='xs-12 contain'>
                <div className='xs-12 md-6 pad'>
                    <div className="xs-9 text">
                        <h2>{info.title}</h2> 
                    </div>
                    <div className="xs-3">
                        <button id='status'> {info.status} </button>                    
                    </div>
                    <div className='xs-12 text'>
                    <p>{withBreaks}</p>
                    </div>
                </div>
                <div className='xs-12 md-4 pad' id='initiated'>
                    <h3>Initiated By</h3>
                    <div className='xs-12 border-top-bottom'>
                        <div className='xs-4 sm-3'>
                            <img src={info.extra.initiated_by.avatar} alt='avatar'/>
                        </div>
                        <div className='xs-8 sm-9'>
                            <h5>{info.extra.initiated_by.name}</h5>
                            <span>{info.extra.initiated_by.user_type}</span>
                        </div>
                        
                    </div>
                </div>
                <div className='xs-12 md-2 pad'></div>
            </div>
        </WrapStyle>
    }
}

const mapStateToProps = state=>{
return {
    info: state.contractor.preview_info
}
}

export default connect(mapStateToProps)(MainViewForPreviewingProject)
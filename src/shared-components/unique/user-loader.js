import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Icon from "react-fa";
 import { fetchProject } from "../../store/action-creators/project";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
// import { fetchPossibleStakeholders } from "../../store/action-creators/project-funder/stakeholder";

const L = styled.div`
    #f{
        font-weight: 500;
        font-size: 1em;
        color: #201D41;
    }
    .container{
    background: #FFFFFF;
    border: 1px solid #DDDDDD;
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 40px;
    padding: 2px 0;
    max-height: 400px;
    overflow: auto;
    margin-bottom: 7.5px;
   
    .s{
        p{
            font-size: 0.85em;
            color: #AAAAAA;
            margin: 0;
            padding: 1em 1.1em 0;
            text-align: left;
            font-weight: 300;
        }
  >  div{
            background: #EFF5FB;
            border-radius: 5px;
            font-family: Acumin Pro;
            font-size: 0.95em;
            color: #156EDC;
            display: inline-block;
            min-height: 35px;
            line-height: 35px;
            margin: 3% 0% 3% 3%;
            width: auto;
            text-transform: capitalize;
            float: left;
            padding-left: 3%;
            overflow-wrap: break-word;

           
        }
    }

    .t-c{
        color: #2196f3;
        cursor: pointer;
        padding: 0 10px;
    }
    }

    .chev{
        button{
            background: transparent;
            border: 0;
            height: 40px;
            line-height: 40px;
            width: 100%;
            cursor: pointer;
        }

        span{
            font-size: 0.9em;
            color: #F2994A;
        }
    }

    .result {

        .o{
            overflow: auto;
        }
        
        border-radius: 5px;
        padding: 3%;
        transition: 300ms;

        .sin{
            cursor:pointer;
            
            & + .sin{
                border-top: 1px solid #F1F2F4;
            }

            padding: 6px 0;

            img{
                height: 35px;
                width: 35px;
                border-radius: 35px;
                margin-top: 7px;
                background: silver;
                border: 0;
                display: block;
                margin: auto;
            }

            .t{
                margin-top: 7px;
            }
            h4,p{
                margin: 0;
            }

            h4{
                margin: 0;
                text-align: left;
                font-size: 14px;
                font-weight: 300;
                color: #53627C;
            }

            p{
                text-align: left;
                font-weight: 100;

                font-family: Acumin Pro;
                line-height: 20px;
                font-size: 12px;
                color: #ADB5BD;


            }

        }

        .search-wrapper{
            background: #F2F2F2;
            border-radius: 3px;
            height: 40px;

            input{
                height: 100%;
                display: block;
                background:transparent;
                color: #444;
                font-size: 15px;
                border: 0;
                text-indent: 15px;
                width: 83.3%;
                padding: 0.85em;
            }

            button{
                background: transparent;
                border: 0;
                height: 40px;
                line-height: 40px;
                > * {
                    font-size: 14px;
                }
            }
        }
    }
}

.em-desc{
    font-weight: 400;
    font-size: 0.8em;
    margin-bottom: 0.5em;
    display: block;
    color: #555;
    a{
        font-weight: 500;
        color: orange;
    }
}
`;

const mapStateToProps = state => {
  return {
    stakeholders: state.projects.single.info.stakeholders,
    projectId: state.modal.projectId
  };
};

const mapDispatchToProps = dispatch => {
  return {
     fetchProject: id => dispatch(fetchProject(id))
  };
};

class StakeHolderLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        valuesSelected: [
        ],
        options: []
    }
    this.props.fetchProject(props.match.params.project_id || props.projectId);
    }

    static defaultProps = {
        single: true
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            
            let options = nextProps.stakeholders, untouched;
            // console.log(options)

            if(nextProps.stakeholders){

                if(Boolean(nextProps.proposalMode) === true){
                    console.log('here')
                    options = nextProps.stakeholders.filter( s => s.user.agreed === true );
                }

                if(nextProps.limitTo === 'contractor'){
                    options = options.filter(stakeholder=>{
                        return stakeholder.user.information.isContractor === true
                    });
                }

                options = options.map(option=>{
                    return option.user.information
                });

                console.log(options)
            }
        
            untouched = options;

            let obj = {
                options, untouched
            };

            if(nextProps.defaultValue){
                obj.valuesSelected = [{ value: nextProps.defaultValue._id, label: nextProps.defaultValue.fullName }]
            }

            this.setState(obj);
        }
    }    

    addToSelected = o =>{
        if(this.props.single === true){
            let valuesSelected = [
                { value: o._id, label: `${o.firstName} ${o.lastName}` }
            ]
            this.setState({
                valuesSelected
            },()=>{
                this.props.addStakeholders(this.state.valuesSelected.map(v=>{
                    return v.value
                }))
            })
        }else{
            this.setState(p => {
                let found = 0;
                p.valuesSelected.map( v => {
                    if(v.value === o._id)  {
                        found = found + 1;
                        
                    }
                    return null;
                })

                if( Boolean(found) === false ) {
                    let valuesSelected =  [
                        { value: o._id, label: `${o.firstName} ${o.lastName}` },
                        ...p.valuesSelected,
                    ]
                    
                    return{
                        valuesSelected
                    }
                }
            
            },()=>{
                this.props.addStakeholders(this.state.valuesSelected.map(v=>{
                    return v.value
                }))
            })
        }

        this.setState(p=>{
            return{
                options: p.options.filter(user=>{
                    return user._id !== o._id
                })
           }
        })
    }

    removeFromSelected = (o)=>{
        if(!this.props.defaultValue)
        this.setState(p=>{
            let fullData = p.untouched.filter(sth=>{
                return sth._id === o.value
            })[0];

            return {
                options: [...p.options, fullData],
                valuesSelected: p.valuesSelected.filter(v=>{
                    return v !== o
                })
            }    
        },()=>{
            this.props.addStakeholders(this.state.valuesSelected.map(v=>{
                return v.value
            }))
        })
    }

    toggle = ()=>{
        this.setState((p)=>{
            return {
                open: !p.open
            }
        })
    }

    filter = e => {

        const {value} = e.target;
        const f = this.state.untouched;

        const search = () => {
            if( Boolean(f)){
                if(Boolean(f.length)){

                    let SearchByName = f.filter(o=>{
                        let name = `${o.firstName} ${o.lastName}`;
                        return name.toLowerCase().indexOf(value.toLowerCase()) !== -1
                    })
            
                    if( Boolean(SearchByName) === false ) return []; 

                    return [ ...SearchByName ];

                }
            }
        }

        this.setState(p => {
            return {
                options:  value !== "" ? search() : this.state.untouched || []
            }
        })
    }

    render(){

        const { isNotEditable, limitTo } = this.props;

        const { valuesSelected, options, open } = this.state;

        return <L className='xs-12'>
            { this.props.hideText !== true && 
                <Fragment>
                <h3 id='f'>{limitTo === "contractor" ? "Contractor": "Stakeholder"}</h3>
                <span className='em-desc'> If you cannot find a particular contractor in the dropbox, <Link to={`/dashboard/project/${this.props.match.params.project_id}/stakeholders`}>Click Here</Link></span>
            </Fragment>
            }
        <div className="xs-12 container">
            <div className="s xs-10">
                { 
                    Boolean(valuesSelected.length) ?
                    valuesSelected.map((v,i)=>{
                    return <div key={i} >
                        <div className="f-l">{v.label}</div>
                        <div className="f-r t-c" onClick={()=>this.removeFromSelected(v)}>&times;</div>
                    </div>
                }): <p>Select stakeholder</p> }
            </div>

            <div className="xs-2 chev t-c">
                <button type="button" onClick={ isNotEditable === true ?()=>{}:this.toggle}>
                {
                    open ?
                        <Icon name="chevron-up"/>
                        :
                        <Icon name="chevron-down"/>
                }
                </button>
            </div>

            <div className="xs-12 result" style={{display: open ? "block": "none"}}>  
                <div className="xs-12 o">
                    <div className="search-wrapper xs-12">
                        <div className='xs-12'>
                            <input name="search" placeholder='Search' className="xs-10" onChange={this.filter}/>
                            <div className="xs-2 t-c">
                                <button><Icon name="search"/></button>
                            </div>
                        </div>
                    </div>
                    <div className='xs-12'>
                        { options && options.map((o,i)=>{
                                return <div className="xs-12 sin" onClick={()=> this.addToSelected(o)} key={i}>
                                    <div className="xs-3">
                                        <img src={ o.profilePhoto} alt=""/>
                                    </div>
                                    <div className="xs-9 t">
                                        <h4>{`${o.firstName} ${o.lastName}` } </h4>
                                        <p><strong>{o.organization ? o.organization.name: ""}</strong></p>
                                    </div>
                                    
                                </div>
                            })
                        }
                    </div>  
                </div>
            </div>
        </div>
              
        </L>
        
    }
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
  )(StakeHolderLoader))
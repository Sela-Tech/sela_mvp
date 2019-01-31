import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Icon from "react-fa";
import { selectFunders } from "../../../store/action-creators/project-funder/project";
import { fetchPossibleStakeholders } from "../../../store/action-creators/project-funder/stakeholder";

const L = styled.div`
    background: #FFFFFF;
    border: 1.5px solid #f1f3f5
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 40px;
    padding: 2px 0;
    max-height: 400px;
    overflow: auto;

    &:focus, &:active {
        // border-color: #156EDC;
    }

    .s{
  >  div{
            background: #EFF5FB;
            border-radius: 5px;
            font-family: ProximaNova;
            font-size: 13px;
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
            height: 45px;
            line-height: 45px;
            width: 100%;
            cursor: pointer;
        }

        span{
            font-size: 15px;
        }
    }

    .result {
        
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

                font-family: ProximaNova;
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
`;

const mapStateToProps = state => {
  return {
    funders: state.projects.funders.options,
    projectId: state.dashboard.projectId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPossibleStakeholders: id => dispatch(fetchPossibleStakeholders(id)),
    selectFunders: selected => dispatch(selectFunders(selected))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class FunderLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false,
        valuesSelected: [
        ],
        options: []
    }
      this.props.fetchPossibleStakeholders(this.props.projectId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
          this.setState({
            options: nextProps.funders
          });
        }
      }
    

    addToSelected = o =>{
       
        this.setState(p => {

            let found = 0;
            p.valuesSelected.map( v => {
                if(v.value === o.id)  {
                    found = found + 1;
                    
                }
                return null;
            })

            if( Boolean(found) === false ) {
                let valuesSelected =  [
                    { value: o.id, label: o.name},
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

    removeFromSelected = (o)=>{
        this.setState(p=>{
            return {
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
        const f = this.props.funders;

        const search = () => {
            if( Boolean(f)){
                if(Boolean(f.length)){
            let SearchByName = f.filter(o=>{
                return o.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
            })
       
            let SearchByOrg = f.filter(o=>{
                return o.company.toLowerCase().indexOf(value.toLowerCase()) !== -1
            })

            if( Boolean(SearchByName) === false && Boolean(SearchByOrg) === false) return []; 

            return [
                ...SearchByName,...SearchByOrg
            ]
        }
    }

        }
        
        this.setState(p=>{
            return {
                options:  value !== "" ? search(): this.props.funders || []
            }
        })
    }

    render(){
        const { valuesSelected, options, open } = this.state;

        return <React.Fragment>
                  <label>
            Add contractors, team members, and other funders to your project
          </label>

        <L className="xs-12">

            <div className="s xs-10">
            { 
                valuesSelected.map((v,i)=>{
                return <div key={i} >
                    <div className="f-l">{v.label}</div>
                    <div className="f-r t-c" onClick={()=>this.removeFromSelected(v)}>&times;</div>
                </div>
            })}
            </div>

            <div className="xs-2 chev t-c">
                <button type="button" onClick={this.toggle}>
                {
                    open ?
                        <Icon name="chevron-up"/>
                        :
                        <Icon name="chevron-down"/>
                }
                </button>
            </div>

            <div className="xs-12 result" style={{display: open ? "block": "none"}}>
            <div className="xs-12">
                <div className="search-wrapper xs-12">
                    <input name="search" placeholder='Search' className="xs-10" onChange={this.filter}/>
                    <div className="xs-2 t-c">
                        <button><Icon name="search"/></button>
                    </div>
                </div>

                <div className='xs-12'>
                    { options && options.map((o,i)=>{
                            return <div className="xs-12 sin" onClick={()=> this.addToSelected(o)} key={i}>
                                <div className="xs-3">
                                    <img src={ o.img} alt=""/>
                                </div>
                                <div className="xs-9 t">
                                    <h4>{o.name} </h4>
                                    <p><strong>{o.type}</strong> | {o.company}</p>
                                </div>
                                
                            </div>
                        })
                    }
            </div>  
            </div>
        </div>
    
        </L>

        </React.Fragment>
        
    }
})
import React,{Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateInterests } from '../../store/action-creators/project';
import mapping from "../../mapping";

const InterestWrapper = styled.div`
.grayed{
    background: #F5F5F8;
}
.white{
    background: white;
    padding: 1em 0;

}
border-radius: 5px 5px 0px 0px;

h3{
    margin: 0;
    padding: 10px;
    line-height: 29px;
    font-size: 18px;
    text-align: center;
    color: #201D41;
    font-weight: 400;
}

p{
    line-height: 21px;
    font-size: 15px;
    text-align: center;
    color: #222829;
    font-weight: 300;
    padding: 0;
    margin-top: 0;

}

.sdg-btn{

    padding: 0;
    background: transparent;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border: 0;
    box-sizing: border-box;
    border-radius: 5px;
    font-weight: 300;
    text-align: center;
    color: #201D41;
    filter: grayscale(100);
    transition: 150ms;

    img{
        height: 100px;
        width: 100%;
        object-fit: contain;
        object-position: center;
    }

    &:hover{
        filter:grayscale(0.5) !important;
        color: white;
    }

    &.selected{
        filter: grayscale(0) !important;
        color: white;
        
    }
}

@media(max-width: 1240px){
    .sdg-btn{
        min-height: 60px;
    }
}

#save{
    background: #F2994A;
    border-radius: 5px;
    padding: 1.15em 2.5em;
    border: 0;
    color: white;
    font-weight: 300;
    font-size: 13.5px;
    margin-bottom: 20px;
}

`;
 class SetInterestsModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected: new Set(props.user_interests)
        }
    }

    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            if(Boolean(nextProps.user_interests.length)){
                this.setState({
                    selected: new Set(nextProps.user_interests)
                })
            }
        }
    }

    handleClick = (name)=>{
        this.setState(p=>{
            let selected = p.selected;
            selected.has(name) ? selected.delete(name): selected.add(name);
            return {
                selected 
            }
        },()=>{
             console.log( this.state.selected )
        })
    }

    handleSubmit = ()=>{
        let arr = Array.from(this.state.selected);
        this.props.dispatch(updateInterests({areasOfInterest: arr}))
    }

    render(){
        const { sdgs } = this.props;

        const Boxes = sdgs.map((sdg,i)=>{
            let is_selected = this.state.selected.has(sdg) ? "selected": "";
            return <div key={i} className={'xs-4  md-3'}>
                <button className={`${'xs-10 xs-off-1 ' + is_selected } sdg-btn`} onClick={() => this.handleClick(sdg)}>
                    <img src={mapping[sdg]} alt="sdg"/>
                </button>
            </div>
        });
        
        return (
            <InterestWrapper className="xs-12">
                <div className="xs-12 t-c grayed">
                    <h3>Interests</h3>
                    <p>Select the SDG you are interested so you can see relevant projects </p>
                </div>
                <div className='xs-12 white'>
                    <div className='xs-10 xs-off-1'>
                        {Boxes}
                    </div>

                    <div className='xs-12'>
                        <button id='save' onClick={this.handleSubmit}> Save</button>
                    </div>
                </div>
            </InterestWrapper>
        )
    }

}

const mapStateToProps = state=>{
    return {
        sdgs: state.app.sdgs,
        user_interests: state.auth.user_interests
    }
}

export default connect(mapStateToProps)(SetInterestsModal)
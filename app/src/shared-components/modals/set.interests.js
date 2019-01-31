import React,{Component} from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

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
    padding: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
    border: 1px solid #B1BAD2;
    box-sizing: border-box;
    border-radius: 5px;;
    font-size: 13px;
    font-weight: 300;
    text-align: center;
    color: #201D41;

    &:hover{
        background: rgba(31, 30, 66,0.8);
        color: white;
    }

    &.selected{
        background: rgba(31, 30, 66,1);
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
            selected: new Set([])
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

    handleClick = (e)=>{
        const {name} = e.target;
        this.setState(p=>{
            let selected = p.selected;
            selected.has(name) ? selected.delete(name): selected.add(name);
            return {
                selected 
            }
        })
    }

    handleSubmit = ()=>{
        let arr = Array.from(this.state.selected);
        console.log(arr)
        // this.props.dispatch(submit_user_interests(arr))
    }

    render(){
        const {sdgs} = this.props;
        const Boxes = sdgs.map((sdg,i)=>{
            let is_selected = this.state.selected.has(sdg) ? "selected": "";
            return <div key={i} className={ 
                i > sdgs.length - 4 ? 
               'xs-12 sm-6 md-4':'xs-6 md-4'}>
                <button className={`${'xs-10 xs-off-1 ' + is_selected } sdg-btn`} onClick={this.handleClick} name={sdg}>{sdg}</button>
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
        user_interests: []
    }
}

export default connect(mapStateToProps)(SetInterestsModal)
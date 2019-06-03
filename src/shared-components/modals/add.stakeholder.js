import React from "react";
import { connect } from "react-redux";
import dashboard from "../../store/actions/dashboard";
import styled from 'styled-components';
import FormWrapper from "./styles.modals/new.standard";
import Icon from 'react-fa';

import { SharedCloseButton } from "./styles.modals/main";
import { addStakeholder,  fetchPossibleStakeholders } from "../../store/action-creators/project-funder/stakeholder";

const AddWrapper = styled.div`
background: rgba(0,0,0,0.5);
position: fixed;
top: 0;
left: 0;
bottom: 0;
right: 0;
height: 100vh;
width: 100vw;
overflow: hidden;
z-index: 100;


#close-button{
  margin: 1.5em;
  position: absolute;
  right: 0;
}
.container{ 
  background: white;
}

.form-group label {
  font-size: 0.8em;
  color: #3D4851;
  margin-bottom: 0.5em;
}

.selected-box{
  background: white;
  padding: 1em;
  border-radius: 4px;
  margin: 1em 0;
  .inner{
    padding: 1em;
    border-radius: 4px;
    border: 1px solid #eee;
    background: #F5F5F8;

    .selected{
      .single{
        margin: 0.25em;
        float: left;
        background: white;
        border: 1px solid orange;
        height: 30px;
        line-height: 30px;
        p{
          margin: 0;
          display: inline-block;
          font-size: 0.85em;
          height: 95%;
          float: left;
          padding: 0 1em;
        }
        button{
          padding: 0 1em;
          border: 0;
          height: 100%;
          background: white;
          float: left;
          color: tomato;
          border-left: 1px solid orange;
        }
      }
    }
  }
}

#search-input{
  background: #FFFFFF;
  border: 1.5px solid #DDDDDD;
  box-sizing: border-box;
  border-radius: 4px;
}

#line{
  display: block;
  margin: 1em 0;
  border: 1px solid rgba(105, 111, 116, 0.1);
}

.white{
  background: white;
  padding: 1em 0;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.stakes{
  overflow: auto;
  .left{
    .filters{
      border-right: 1.5px solid rgba(177, 186, 210, 0.1);
      h4{
        font-size: 0.9em;
        font-weight: 500;
        margin-bottom: 1em;
        color: #201D41;
      }
      button.select{ 
        border: 1.5px solid #B1BAD2;
        box-sizing: border-box;
        border-radius: 2px;
        height: 20px;
        width: 20px;
        display: inline-block;
        margin-right: 0.5em;

        &.active{
          background: #201D41;
        }
      }

      p{
        display: inline-block;
        padding: 0;
        color:#3D4851;
        font-size: 0.8em;
      }
    }
  }
  .right{
    height: 31.35em;
    overflow: auto;
    .list{
      padding: 0 1em;
      .single{
        padding: 0.5em 0.5em 0.25em;
        border-bottom: 1.5px solid rgba(177, 186, 210, 0.1);

        .add{
          padding: 0;
          color: white;
          border-radius: 4px;
          background: #F2994A;
          font-size: 0.8em;
          font-weight: 200;
          border: 0;
          line-height: 2.25em;
          height: 2em;
          width: 4.5em;
          margin-top: 1em;
        }
        .remove{
          padding: 0;
          color: white;
          border-radius: 4px;
          background: #C13C1E;
          font-size: 0.8em;
          font-weight: 200;
          border: 0;
          line-height: 2.25em;
          height: 2em;
          width: 4.5em;
          margin-top: 1em;
        }
        
        img{
          height: 2.85em;
          width: 2.85em;
          border-radius: 2.85em;
        }
        h3,p{
          margin: 0;
          padding: 0;
          text-align: left;
          text-transform: capitalize;
        }
        h3{
          font-size: 0.9em;
          font-weight: 400;
          color: #3D4851;
        }
        p{
          font-size: 0.8em;
          color: #939ea7;
        }
      }
    }
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

const mapStateToProps = state => {
  return {
    projectId: state.modal.projectId,
    type: state.projects.stakeholders.action.type,
    users: state.projects.stakeholders.options,
    selected: state.projects.stakeholders.selected,
    in_progress:
      state.projects.stakeholder.action.type ===
      dashboard.ADD_STAKEHOLDER_R
  };
};

export default connect(mapStateToProps)(
  class AddStakeholderModal extends React.Component {
    constructor(props) {
      super(props);
      props.dispatch(fetchPossibleStakeholders())
      this.state = {
        type: "",
        selected_role: '',
        selected: [],
        users: []
      };
    }

    obtainValues = values => {
      this.setState({ values });
    };

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        let obj = {
          type: nextProps.type
        }
       
        if(this.state.users){
          if(Boolean(this.state.users.length) === false ){
            obj.users = nextProps.users;
          }
        }

        this.setState(obj);
      }
    }

    selectRole = e => {
      e.persist();
      this.setState(p => {
        let value = p.role === e.target.name ? "": e.target.name;
        return {
          role: value,
          users: Boolean(p.searchValue) ? this.applySearch(p.searchValue, value) : this.applyFilters(value) 
        }
      })
    }

    applyFilters = (role)=>{
      if( Boolean(role) ){
          return this.props.users.filter(user=>{
              return user.type ? user.type.toLowerCase() === role.toLowerCase(): false
          });
        }
      return this.props.users
    }

    applySearch = (value,role) => {
      return Boolean(value) ?
      this.applyFilters(role).filter(v => {
        if( value.indexOf("@") !== -1 ){ 
          return v.email.indexOf(value) !== -1 
        }
        return v.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      }) 
      : this.applyFilters(role);
    }

    addUser = id => {
      this.setState(p=>{
        return {
          selected: [ 
            ...p.selected, this.props.users.filter(user=>{
            return user.id === id
          })[0]
        ]
        }
      })
    }

    removeUser = id => {
      this.setState(p=>{
        return {
          selected: p.selected.filter(user=>{
              return user.id !== id
            })
        }
      })
    }
    
    search = e => {
      let { value } = e.target;
      this.setState(p => {
        return {
        searchValue: value,
        users: this.applySearch(value, p.role)
      }})
    }

    sendInvites = () => {
      let obj = { 
        id: this.props.projectId, stakeholders: this.state.selected.map(v=>{
          return v.id
        }) 
      };
      this.props.dispatch( addStakeholder(obj) );
    };

    render() {

      const { close, stop } = this.props;
      const { role, users, selected, type } = this.state;

      const disabled = selected.length === 0 || this.props.type === dashboard.ADD_STAKEHOLDER_R;
      console.log(this.props.type)
      
      return (
      <AddWrapper className='xs-12' onClick={close}>
        <div className='xs-12 i-h' onClick={stop}>

        <SharedCloseButton id="close-button" onClick={close}>
          &times;
        </SharedCloseButton>

        <div className='xs-12 sm-6 i-h'>
          <div className='xs-12 i-h container'>
            <FormWrapper className='xs-12'>

              <div className="xs-12 t-c grayed">
                <h3>Add Stakeholders</h3>
              </div>

              <div className='xs-12 white'>

                <div className='xs-10 xs-off-1'>
                  <div className='xs-12'>
                    <form onSubmit={e=> e.preventDefault()} className="xs-12">
                      <div className="form-group">
                        <label>Search</label>
                        <input onChange={this.search} placeholder = "Enter name of stakeholder to search" id='search-input'/>
                      </div>       
                    </form>
                    <span className='xs-12' id='line'/>
                  </div>

                  <div className='xs-12 stakes'>
                    <div className='xs-4 left'>

                    <div className='filters xs-12'>
                        <h4>Role</h4>

                        <div className='xs-12'>
                          <button name='Project Funder' className={`select ${role === 'Project Funder' ? 'active':''}`} onClick={this.selectRole}></button>
                          <p>Funders</p>
                        </div>

                        <div className='xs-12'>
                        <button name='Contractor' className={`select ${role === 'Contractor' ? 'active':''}`} onClick={this.selectRole}></button>
                          <p>Contractors</p>
                        </div>

                        <div className='xs-12'>
                        <button name='Evaluation Agent' className={`select ${role === 'Evaluation Agent' ? 'active':''}`} onClick={this.selectRole}></button>
                          <p>Evaluation agents</p>
                        </div>

                      </div>
                    </div>

                    <div className='xs-8 right'>
                      <div className='xs-12 list'>
                      { type === dashboard.GET_P_STAKEHOLDERS_R && <p style={{color: 'black'}}>Loading...</p> }
                        {  users.map((user,i )=>{
                          return <div className='single xs-12' key={i}>
                          <div className='xs-3 t-c'>
                            <img src={user.img} alt="100"/>
                          </div>

                          <div className='xs-7'>
                            <h3>{user.name}</h3>
                            <p>{user.type}</p>
                          </div>

                          <div className='xs-2'>
                            { 
                              selected.some(selected_user=>( selected_user.id === user.id )) 
                              ?
                              <button className='remove' onClick={()=>this.removeUser(user.id)}>Remove</button>
                              :
                              <button className='add' onClick={()=>this.addUser(user.id)}>Add</button>
                        
                            } 
                          </div>

                        </div>
                        })
                      }
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </FormWrapper>
          </div>
        </div>

        <div className='xs-12 sm-6 i-h'>
          <div className='c-w xs-12'>
            <div className='c t-c'>
              <div className='xs-10 xs-off-1'>
                      <div className='xs-12 selected-box'>
                        <div className='xs-12 inner'>
                          { Boolean(selected.length) ?
                           selected.map((selected_user, i)=>{
                            return <div className='selected' key={i}>
                              <div className='single'>
                                <p>{selected_user.name}</p>
                                <button onClick={()=>this.removeUser(selected_user.id)}>&times;</button>
                              </div>
                            </div>
                          })
                          :
                          <p>You haven't selected any stakeholders. </p>
                        }
                        </div>
                      </div>
                      <div className='xs-12 t-c'>
                      <button id='save' disabled={disabled} onClick={this.sendInvites}>
                        {
                           this.props.type === dashboard.ADD_STAKEHOLDER_R ?
                           <Icon name='spinner' spin/>
                            : 'Send Invites'
                           }
                      </button>
                      </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </AddWrapper>

     );
    }
  }
);

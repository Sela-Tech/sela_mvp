import React from "react";

import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { showDeleteModal } from "../../../../store/action-creators/project-funder/modal";

import ProjectTemplate from './dara.design/card';
import NotEmptyWrapper from "./dara.design/card.style";
import Slider from "react-slick";

import BomaWrapper from "./boma.design/main.style";

const mode = 'boma';
let exportMe = null;

if(mode === "dara"){

  exportMe = ({ dispatch, projects, history }) => {
  const go = id => history.push("/dashboard/project/" + id + "/overview");

  return (
    <NotEmptyWrapper className="xs-12">
      <div id="bottom" className="xs-12">
        {projects.map((p, i) => {
          return (
            <ProjectTemplate
              history={history}
              key={i}
              c={p.tasks}
              t={p.name}
              p={p["project-avatar"]}
              o={p.owner.organization.name}
              id={p._id}
              goal={p.goal}
              tasks={p.tasks}
              raised={p.raised}
              go={() => go(p._id)}
              activated={p.activated}
              triggerDeleteModal={() => dispatch(showDeleteModal(p._id))}
              triggerToggleModal={() =>
                dispatch(showDeleteModal(p._id, p.activated))
              }
            />
          );
        })}
      </div>
    </NotEmptyWrapper>
  );
};


}else{

  exportMe = class extends React.Component{

    constructor(props){
      super(props);
      this.state={
        projects: this.props.projects || [],
        settings:{
          infinite: false,
          slidesToShow: 4,
          spaceBetween: 5,
          clientXonMouseDown: null,
          clientYonMouseDown: null
        }
      }
    }
    
    handleOnClick (e) {
      e.stopPropagation()
      if (this.state.clientXonMouseDown !== e.clientX || 
          this.state.clientYonMouseDown !== e.clientY) {
        // prevent link click if the element was dragged
        e.preventDefault()
      }
    }

    handleOnMouseDown (e) {
      this.setState({
        clientXonMouseDown: e.clientX,
        clientYonMouseDown: e.clientY
      })
      e.preventDefault() // stops weird link dragging effect
    }

    componentWillMount() {
       this.resizer();
      window.addEventListener("resize", this.resizer);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.resizer);
    }

    componentWillReceiveProps(nextProps){
      if(this.props !== nextProps){
        this.setState({
          projects: nextProps.projects || []
        })
      }
    }
  
    resizer = () => {
      let temp;
      if (window.innerWidth > 768 && window.innerWidth < 1023) {
        temp = 3;
      } else if (window.innerWidth > 1024) {
        temp = 4;
      } else if (window.innerWidth < 767) {
        temp = 2;
      }
  
      this.setState({
        settings: {
          ...this.state.settings,
          slidesToShow: temp
        }
      });
    };

    go = id => this.props.history.push("/dashboard/project/" + id + "/overview");

    render(){

      const {settings, projects }= this.state;
      
     return <BomaWrapper className="xs-12">
     <section className='xs-12'>
      <label>Projects you created</label>
      
      <Slider 
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

       {projects.filter((p,i)=>(i < 2 )).map((p,i)=>{
         return <div className="xs-12 sm-3" key={i}>
         <Link className="xs-12 inner"
          onMouseDown={e => this.handleOnMouseDown(e)}
          onClick={e => this.handleOnClick(e)}

         to={`/dashboard/project/${p._id}/overview`}>
           <p> {p.name} </p>
           <img src={p["project-avatar"]} alt=""/>
         </Link>
       </div>
       
       })}
        
      </Slider>

     </section>

     <section className='xs-12'>
      <label>Projects you funded</label>
      <Slider 
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

       {projects.filter((p,i)=>(i === 2 )).map((p,i)=>{
         return <div className="xs-12 sm-3" key={i}>
         <Link className="xs-12 inner"
          onMouseDown={e => this.handleOnMouseDown(e)}
          onClick={e => this.handleOnClick(e)}

         to={`/dashboard/project/${p._id}/overview`}>
           <p> {p.name} </p>
           <img src={p["project-avatar"]} alt=""/>
         </Link>
       </div>
       
       })}
        
      </Slider>

     </section>

     <section className='xs-12'>
      <label>Projects in your areas of interest</label>
      <Slider 
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

       {projects.filter((p,i)=>(i >= 3  )).map((p,i)=>{
         return <div className="xs-12 sm-3" key={i}>
         <Link className="xs-12 inner"
          onMouseDown={e => this.handleOnMouseDown(e)}
          onClick={e => this.handleOnClick(e)}

         to={`/dashboard/project/${p._id}/overview`}>
           <p> {p.name} </p>
           <img src={p["project-avatar"]} alt=""/>
         </Link>
       </div>
       
       })}
        
      </Slider>
     </section>

     <section className='xs-12'>
      <label>Saved projects</label>
       <p>No Saved Projects</p> 
     </section>
     
     
     
     </BomaWrapper>
    }
  }
}

export default connect()(withRouter(exportMe));

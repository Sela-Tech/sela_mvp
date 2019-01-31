import React from "react";

import { connect } from "react-redux";
import withRouter from "react-router-dom/withRouter";
import Link from "react-router-dom/Link";

import Slider from "react-slick";
import { showSetInterestsModal } from "../../../../store/action-creators/modal";

import SharedViewWrapper from "../../shared/styling/projects.view";

  let exportMe = null;

  exportMe = class extends React.Component{

    constructor(props){
      super(props);
      this.state={
        projects_you_joined: this.props.projects_you_joined,
        projects_you_proposed: this.props.projects_you_proposed,
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
      // this.resizer();
      window.addEventListener("resize", this.resizer);
    }
  
    componentWillUnmount() {
      window.removeEventListener("resize", this.resizer);
    }

    componentWillReceiveProps(nextProps){
      if(this.props !== nextProps){
        const { projects_you_joined,projects_you_proposed} = nextProps
        this.setState({
          projects_you_joined, projects_you_proposed
        })
      }
    }
    
    launch_edit_interest_modal = ()=>this.props.dispatch(showSetInterestsModal())
    
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

      const {settings,  projects_you_joined,projects_you_proposed }= this.state;
      
     return <SharedViewWrapper className="xs-12">
     <section className='xs-12'>
      <label>Projects you initiated</label>
      
      <Slider 
       ref={slider => (this.one_slider = slider)}
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

       {
         Boolean(projects_you_proposed.length) ?
         projects_you_proposed.map((p,i)=>{
         return <div className="xs-12 sm-3" key={i}>
         <Link className="xs-12 inner"
          onMouseDown={e => this.handleOnMouseDown(e)}
          onClick={e => this.handleOnClick(e)}

         to={`/dashboard/project/${p._id}/overview`}>
           <p> {p.name} </p>
           <img src={p["project-avatar"]} alt=""/>
         </Link>
       </div>
       
       })
      :
      <div className='xs-12 sm-3'>
      <div className='empty-box inner'>
        <div className='c-w xs-12'>
          <div className='c t-c'>
            <p>You have no saved projects</p>
          </div>
        </div>
      </div>
      </div> }
        
      </Slider>

     </section>

     <section className='xs-12'>
     {
      
      Boolean(projects_you_joined.length) ?
      <Slider 
       ref={slider => (this.one_slider = slider)}
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

        { projects_you_joined.map((p,i)=>{
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
      :

      <div className='xs-12 sm-3'>
      <div className='empty-box inner'>
        <div className='c-w xs-12'>
          <div className='c t-c'>
            <p>You have not joined any project.</p>
          </div>
        </div>
      </div>
      </div>

     }
     </section>

     <section className='xs-12'>
      <label>Projects in your areas of interest</label>
      <div className='xs-12 sm-3 edit-interest' onClick={this.launch_edit_interest_modal}>
          <div className='empty-box inner'>
            <div className='c-w xs-12'>
              <div className='c t-c'>
                <p><strong>+</strong>Edit Interests</p>
              </div>
            </div>
          </div>
        </div>
     </section>

     <section className='xs-12'>
      <label>Saved projects</label>
      <div className='xs-12 sm-3'>
      <div className='empty-box inner'>
        <div className='c-w xs-12'>
          <div className='c t-c'>
            <p>You have no saved projects</p>
          </div>
        </div>
      </div>
      </div>

     </section>
     
     </SharedViewWrapper>
    }
  }

export default connect()(withRouter(exportMe));

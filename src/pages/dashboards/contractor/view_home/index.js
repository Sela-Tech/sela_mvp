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
        projects: props.projects,
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
        const { projects} = nextProps
        this.setState({
          projects
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
      const {settings, projects }= this.state;      
      const {createdProjects, joinedProjects,savedProjects, areasOfInterest} = projects;

     return <SharedViewWrapper className="xs-12">
     <section className='xs-12'>
      <label>Projects you initiated</label>
      
      { 
          createdProjects && createdProjects.docs.length > 0 ?
     
      <Slider 
       ref={slider => (this.one_slider = slider)}
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

        { createdProjects.docs.map((p,i)=>{
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
          <p>You have not initiated any project</p>
          </div>
        </div>
      </div>
      </div> 
      }
     </section>

     <section className='xs-12'>
     
     { 
          joinedProjects && joinedProjects.docs.length > 0 ?
          <Slider 
          ref={slider => (this.one_slider = slider)}
          {...settings}
          containerClass="xs-12"
          className="xs-12 slider">

            { joinedProjects.docs.map((p,i)=>{
            return <div className="xs-12 sm-3" key={i}>
            <Link className="xs-12 inner"
              onMouseDown={e => this.handleOnMouseDown(e)}
              onClick={e => this.handleOnClick(e)}

            to={`/dashboard/project/preview/${p._id}`}>
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
          <p>You have not joined any project</p>
          </div>
        </div>
      </div>
      </div>

     }
     </section>

     <section className='xs-12'>
      <label>Projects in your areas of interest</label>
    
            <Slider 
            {...settings}
            containerClass="xs-12"
            className="xs-12 slider">
   
             <div className='xs-12 sm-3 edit-interest' onClick={this.launch_edit_interest_modal}>
              <div className='empty-box inner-not-proj'>
                <div className='c-w xs-12'>
                  <div className='c t-c'>
                    <p><strong>+</strong>Edit Interests</p>
                  </div>
                </div>
              </div>
            </div>
            
            { areasOfInterest && areasOfInterest.docs.length > 0 ?
              areasOfInterest.docs.map((p,i)=>{
              return <div className="xs-12 sm-3" key={i}>
                <Link className="xs-12 inner"
                onMouseDown={e => this.handleOnMouseDown(e)}
                onClick={e => this.handleOnClick(e)}
                to={`/dashboard/project/preview/${p._id}`}>
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
                    <p>There are no projects in your area of interest</p>
                  </div>
                </div>
              </div>
            </div>
            }
            </Slider>
     </section>

     <section className='xs-12'>
        <label>Saved projects</label>

        { 
          savedProjects && savedProjects.docs.length > 0 ?
            <Slider 
            {...settings}
            containerClass="xs-12"
            className="xs-12 slider">
            { 
            savedProjects.docs.map((p,i)=>{
              return <div className="xs-12 sm-3" key={i}>
                <Link className="xs-12 inner"
                onMouseDown={e => this.handleOnMouseDown(e)}
                onClick={e => this.handleOnClick(e)}
                to={`/dashboard/project/preview/${p._id}`}>
                <p> {p.name} </p>
                  <img src={p["project-avatar"]} alt=""/>
                </Link>
              </div>
            })
            }
            </Slider>
          :
        <div className='xs-12 sm-3'>
          <div className='empty-box inner'>
            <div className='c-w xs-12'>
              <div className='c t-c'>
                <p>You have no saved projects</p>
              </div>
            </div>
          </div>
          </div>
        }
      </section>
     
     
     </SharedViewWrapper>
    }
  }


  const mapStateToProps = state => {
    let projects = state.projects.all.collection;
    return {
      projects
    }
  };
export default connect(mapStateToProps)(withRouter(exportMe));

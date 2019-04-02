import React, { Fragment } from "react";
import connect  from "react-redux/lib/connect/connect";
import withRouter from "react-router-dom/withRouter";
// import Link from "react-router-dom/Link";
import { showModal } from "../../../../store/action-creators/modal";
import Slider from "react-slick";
import SharedViewWrapper from "../../shared/styling/projects.view";
import HomeCard from "../../shared/card.dashboard";
import { SHOW_INTERESTS_MODAL } from "../../../../store/actions/modal";
import Joyride from 'react-joyride';


let exportMe = null;
exportMe = class extends React.Component{
    constructor(props){
      super(props);
      this.state={
        steps: [
          {
            target: '#add',
            content: <p>Loads up a view that allows you to create a project on the sela platform. We are deeply integrated with the stellar network's blockchain, so project creation is known to take a couple of seconds <strong>:)</strong></p>,
          },
          {
            target: '#initiated',
            content: <div>
              <p>When you create a project, it appears as a singular <strong>card</strong> of information (Project name, budget summation, location} </p>
              <br/>
              <p>To see more cards,<br/><strong>Drag any card left or right.</strong></p>
              </div>,
          },
          {
            target: '#interest-selector',
            content: <p>Clicking on this loads up a view that lets you specify the types of projects existing on the Sela platform you'd like to be aware of.<br/> Projects on the Sela Platform are classfied by the <strong>Sustainable Development Goal(s)</strong> they fall under.</p>,
          },
          {
            target: '#notifications',
            content: <Fragment>
            <p>Clicking on this loads up a view showing:<br/></p> 
              <ul>
                <li>Activities such as the status of requests made to your projects as well as the status of requests you've made to projects belonging to others on the platform i.e.<br/><br/> <em><strong>Contractor X</strong> Accepted To Join Your Project: <strong>Project Y</strong></em><br/></li>
              
                <li><br/> <strong>Prompts</strong> for you to perform an action also appear in the view</li>
              </ul>
            </Fragment>
          },
          {
            target: '#wallet',
            content: <p>Your Platform Currency Balance in <strong>Lumens</strong>,  And <strong>Project Based Token (PST)</strong> Balance(s) for projects you've created and/or been involved with can be found here, as well as tables of transactional data about your expenditure for the projects.</p>,
          },
          {
            target: ".inner.xs-12native",
            content: <p>This represents the base balance of the currency used by the sela system to perform actions on the platform, actions range from simple project creation to transfering tokens between stakeholders on a project etc.</p>
        }],
        projects: this.props.projects || {},
        settings:{
          infinite: false,
          slidesToShow: 4,
          spaceBetween: 5,
          clientXonMouseDown: null,
          clientYonMouseDown: null
        }
      }
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
          projects: nextProps.projects
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

    launch_edit_interest_modal = () => this.props.dispatch(showModal(
      SHOW_INTERESTS_MODAL
    ));
    
    go = id => this.props.history.push("/dashboard/project/" + id + "/overview");

    render(){
      const { steps } = this.state;

      const { settings, projects }= this.state;      
      const { createdProjects, fundedProjects,savedProjects, 
         areasOfInterest
       } = projects;

     return <SharedViewWrapper className="xs-12">
      <Joyride steps={steps} />
      <section className='xs-12'>
        <label>Projects you initiated</label>
        { 
          createdProjects && createdProjects.docs.length > 0 ?
            <Slider 
            {...settings}
            containerClass="xs-12"
            className="xs-12 slider">
            { 
              createdProjects.docs.map((p,i)=>{
                return <div className="xs-12 sm-3" key={i}>
                <HomeCard info={p} type='mine'/>
                </div>
              })
            }
            </Slider>
          :
          <div className='xs-12 sm-3' id="initiated">
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
        <label>Projects you got invited to</label>


        { 
          fundedProjects && fundedProjects.docs.length > 0 ?
            <Slider 
            {...settings}
            containerClass="xs-12"
            className="xs-12 slider">
            { 
            fundedProjects.docs.map((p,i)=>{
              return <div className="xs-12 sm-3" key={i}>
                <HomeCard info={p} type="joined" />
              </div>
            })
            }
            </Slider>
          :
        <div className='xs-12 sm-3'>
          <div className='empty-box inner-not-proj'>
            <div className='c-w xs-12'>
              <div className='c t-c'>
                <p>You have not funded any project yet</p>
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
   
             <div className='xs-12 sm-3 edit-interest' id='interest-selector' onClick={this.launch_edit_interest_modal}>
              <div className='empty-box inner-not-proj'>
                <div className='c-w xs-12'>
                  <div className='c t-c'>
                    <p><strong>+</strong>Edit Interests</p>
                  </div>
                </div>
              </div>
            </div>
            
            { areasOfInterest 
              && areasOfInterest.docs.length > 0 ?
              areasOfInterest.docs.map((p,i)=>{
                return <div className="xs-12 sm-3" key={i}>
                <HomeCard info={p} type="interests" />
                </div>
            })
            :        
            <div className='xs-12 sm-3'>
              <div className='empty-box inner-not-proj'>
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
                <HomeCard info={p} type="not-mine" />
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

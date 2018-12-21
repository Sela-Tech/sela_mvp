// import React from "react";

// import { connect } from "react-redux";
// import { Line } from "rc-progress";
// import { withRouter } from "react-router-dom";
// import NotEmptyWrapper from "./not-empty.style";
// import { showDeleteModal } from "../../../../store/action-creators/project-funder/modal";

// class ProjectTemplate extends React.Component {
//   state = {
//     hidden: true
//   };

//   toggle = () => {
//     this.setState(p => {
//       return {
//         hidden: !p.hidden
//       };
//     });
//   };

//   render() {
//     const {
//         t,
//         o,
//         p,
//         go,
//         triggerDeleteModal,
//         triggerToggleModal,
//         activated,
//         goal,
//         raised,
//         tasks
//       } = this.props,
//       { hidden } = this.state;

//     return (
//       <div className="container xs-12 sm-6 md-4">
//         <div className="box xs-12 md-11 sm-11">
//           <img src={p} alt={""} onClick={go} />
//           <div className="inner">
//             <div className="text">
//               <h3>{t}</h3>
//               <p> {o} </p>
//             </div>

//             <div className="tasks xs-12">
//               <Line
//                 percent={(raised / goal) * 100}
//                 strokeWidth="4"
//                 trailWidth="4"
//                 strokeColor="#156EDC"
//                 trailColor="#F2F2F2"
//               />
//               <div className="xs-12 dw">
//                 <p className="xs-9">{tasks.length} Tasks</p>

//                 <div className="xs-3">
//                   <button
//                     className="ellipsis"
//                     onClick={this.toggle}
//                     type="button"
//                   >
//                     <span />
//                     <span />
//                     <span />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {!hidden && (
//           <div className="options xs-6">
//             <ul>
//               <li onClick={go}> View</li>

//               <li
//                 className={activated ? "de" : "re"}
//                 onClick={() => {
//                   triggerToggleModal();
//                   this.toggle();
//                 }}
//               >
//                 {activated ? "Hide From Public" : "Show Public"}
//               </li>

//               <li
//                 className="delete"
//                 onClick={() => {
//                   triggerDeleteModal();
//                   this.toggle();
//                 }}
//               >
//                 Delete
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// const NotEmptyHomeView = ({ dispatch, projects, history }) => {
//   const go = id => history.push("/dashboard/project/" + id + "/overview");

//   return (
//     <NotEmptyWrapper className="xs-12">
//       {/*     
//       <div id="top" className="xs-12">
//         <div className="xs-12 sm-6 f-l">
//           <label>Showing </label>
//           <p>All Projects</p>
//         </div>

//         <div className="xs-12 sm-6">
//           <div className=" xs-12 sm-6 f-r" id="select-showing">
//             <select>
//               <option value="all">All Projects</option>
//               <option value="associated-with"> Projects Associated With</option>
//             </select>
//           </div>
//         </div>
//       </div> */}

//       <div id="bottom" className="xs-12">
//         {projects.map((p, i) => {
//           return (
//             <ProjectTemplate
//               history={history}
//               key={i}
//               c={p.tasks}
//               t={p.name}
//               p={p["project-avatar"]}
//               o={p.owner.organization.name}
//               id={p._id}
//               goal={p.goal}
//               tasks={p.tasks}
//               raised={p.raised}
//               go={() => go(p._id)}
//               activated={p.activated}
//               triggerDeleteModal={() => dispatch(showDeleteModal(p._id))}
//               triggerToggleModal={() =>
//                 dispatch(showDeleteModal(p._id, p.activated))
//               }
//             />
//           );
//         })}
//       </div>
//     </NotEmptyWrapper>
//   );
// };

// export default connect()(withRouter(NotEmptyHomeView));







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
      // this.resizer();
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
       ref={slider => (this.one_slider = slider)}
       {...settings}
       containerClass="xs-12"
       className="xs-12 slider">

       {projects.map((p,i)=>{
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
      <label>Projects you joined</label>
      <p>None Found.</p>
     </section>

     <section className='xs-12'>
      <label>Projects in your areas of interest</label>
      <p>None Found.</p>

     </section>

     <section className='xs-12'>
      <label>Saved projects</label>
      <p>None Found.</p>

     </section>
     
     
     
     </BomaWrapper>
    }
  }
}

export default connect()(withRouter(exportMe));

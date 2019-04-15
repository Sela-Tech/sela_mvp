import React from "react";
import styled from "styled-components";
import mapping from "../../../../../../mapping";
import { ShowDisclaimer } from "../../../../../../startupMode.config";
import Map from "../map";
import {connect} from 'react-redux';
import { SHOW_STAKEHOLDER_MODAL, LAUNCH_SDG } from "../../../../../../store/actions/modal";
import { showModal } from "../../../../../../store/action-creators/modal";

const DescriptionWrapper = styled.div`
  p {
    line-height: 1.85em;
    font-size: 1em;
    color: #3d4851;
    font-weight: 200; 
  }

  #loading {
    span {
      display: block;
      height: 15px;
      margin: 10px 0;
      background: #ddd;
      &:nth-child(1) {
        width: 80%;
      }
      &:nth-child(2) {
        width: 70%;
      }
      &:nth-child(3) {
        width: 60%;
      }
      &:nth-child(4) {
        width: 50%;
      }
    }
  }

  #initiated-section {
    .card {
      margin: 0;
      padding: 1em 1.5em;
      border: 1px solid #eaeaea;
      box-sizing: border-box;
      border-radius: 5px;
      background: white;
      width: 100% !important;
      margin-bottom: 1em;

      img {
        height: 3em;
        width: 3em;
        border-radius: 3em;
        display: block;
        background: silver;
        object-fit: cover;
        object-position: center;
      }
      h4,
      p,
      span,
      a {
        margin: 0;
        margin-bottom: 0.25em;
        font-family: Acumin Pro;
      }

      h4 {
        font-size: 1em;
        font-weight: 300;
      }

      p {
        font-size: 1em;
        color: #3d4851;
      }

      span {
        font-size: 1em;
        color: #8795a1;
        font-weight: 100;
      }
    }
  }

  #see-all {
    line-height: normal;
    font-size: 1em;
    margin: 1em 0;
    display: block;
    color: #156edc;

    img {
      position: relative;
      top: 5px;
      left: 5px;
    }
  }

  .extra{
    label{
    display: block;
    font-size: 1em;
    font-weight: 500;
    }
    p,strong,span,label{
      text-transform: capitalize;
    }
    span{
      display: inline-block;
      padding: 1em;
    }
  }


  .document{
    .inner{
        margin-bottom: 7px;
        border-top: 1px solid #eee;  
    }
    .text{
        display: block;
        float: left;
        padding-top: 6px;

        h4,p{
            margin:0;
        }
        h4{
            font-weight: 300;
            line-height: 20px;
            font-size: 14px;
            color: #222829;
        }
        p{
            font-size: 10px;
            color: #696F74;
            font-weight: 200;
        }
    }
    .download{
            display: block;
            height: 100%;
            float: right;
            padding-top: 15px;
        a{
            font-size: 10px;
            font-weight: 300;
            text-align: right;
            color: #696F74;
            display: block;

            &:hover{
                color: green ;
            }
        }
    }
}

#init-h4{
  background: #FFFFFF;
  border-bottom: 1px solid #F2F2F2;
  box-sizing: border-box;
  font-weight: 500 !important;
  line-height: 2em !important;
  margin-bottom: 1em !important;
  text-align: left;
  color: #0a1f46 ;
}

#init-by-h4{
  margin-top: 1em !important;
  color: #555 !important;
  font-weight: 500 !important;
  font-size: 1em !important;
}

.pad-white{
  padding: 1.5em;
  border-radius: 3px;
  background: white;
  margin-bottom: 1em;

  @media(min-width: 768px){
    width: 95%;
  }

  p,label{
    color: #666;
    font-weight: 400;
  }
}

#sdgs{
  width: 100% !important;
}
`;

const DescriptionSub =  ({ id, project, dispatch }) => {
  
  const displayStakeholder =  id =>{
    dispatch(
      showModal( SHOW_STAKEHOLDER_MODAL, { stakeholder: id })
    );
  };

  const displaySDGInfo =  sdg => dispatch(showModal( LAUNCH_SDG, { sdg } ));

  const { extra } = project;
  let size;
  
  if(extra && extra.length > 0){
    size = extra.filter(obj=> { return Object.keys(obj)[0] === 'size' })[0].size;
  };

  return (
    <DescriptionWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
          

        <div className="xs-12 md-8">
          { ShowDisclaimer(id) && 
            <div className='xs-12 disclaimer pad-white'>
              <h3 style={{color: "tomato"}} >Disclaimer</h3>
              <p>This is a historical project backfilled with data from a previous version of the platform.</p>
            </div>
          }

          <div className='xs-12'>
            <div className='xs-12 pad-white'>
              <h3> Project Description </h3>
              <div className="xs-12 sm-10">       
                {project.description ? (
                  <p>{project.description}</p>
                ) : (
                  <React.Fragment>
                    <p id="loading">
                      <span />
                      <span />
                      <span />
                      <span />
                    </p>
                  </React.Fragment>
                )}
                </div>
              </div>
              
              {size && 
                <div className='extra xs-12 pad-white'>
                  <div className='xs-3'>
                    <h5>Unit</h5>
                    <p>{size.unit}</p>
                  </div>
                  <div className='xs-3'>
                    <h5>Length</h5>
                    <p>{size.length}</p>
                  </div>
                  <div className='xs-3'>
                    <h5>Width</h5>
                    <p>{size.width}</p>
                  </div>
                  <div className='xs-3'>
                    <h5>Depth</h5>
                    <p>{size.depth}</p>
                  </div>
                </div>
              }

              <div className='xs-12 add-doc pad-white'>
                <h5>Additional documents</h5>
                
                <div className='xs-12 sm-10 document'>
                    {project.documents && project.documents.length === 0 && <label>No Documents Found.</label>}
                    {
                        project.documents && project.documents.map((doc,i)=>{
                        let type = doc.filetype.split("/")[0];
                        if(type !== 'image' && type !== 'video' && type !== 'audio'){
                            type = 'document';
                        }
                        return <div className='xs-12 inner' key={i}>
                            <div className={`img preview-${type} xs-3 sm-2`}/>
                            <div className='text xs-6 sm-7'>
                            <h4>{doc.name}</h4>
                                <p>{doc.size}</p>
                            </div>
                            <div className='download xs-2 sm-2'>
                                <a href={doc.doc} target="_blank" rel="noopener noreferrer"> Download</a>
                            </div>
                        </div>
                        })
                        
                    }
                </div>

            </div>

          </div>

        </div>

        <div className="xs-12 md-4" id="initiated-section">
          <div className="card xs-12">
            <h4 id='init-h4'>Initiated By</h4>
            <div className='xs-12' onClick={() => displayStakeholder(project.owner._id)}>
              <div className="xs-3">
                <img src={project.owner.profilePhoto} alt="" />
              </div>

              <div className="xs-9">
                <h4 id='init-by-h4'>
                  {project.owner.firstName} {project.owner.lastName}
                </h4>
                <span>{project.owner.organization && project.owner.organization.name}</span>
              </div>
            </div>

          </div>

          <div className='xs-12'>
            <Map project={project} id={id}/>
          </div>
          
          <div className='xs-12 t-l pad-white' id='sdgs'>
          <h4>Sustainable Development Goals (SDGs)</h4>

              {project.tags && project.tags.map((tag,i)=>{
                return <img key={i} src={mapping[tag]} alt={i} onClick={()=>displaySDGInfo(tag)} />
              })}
          </div>
        </div>

      </div>
    </DescriptionWrapper>
  );
};

export default connect()(DescriptionSub);

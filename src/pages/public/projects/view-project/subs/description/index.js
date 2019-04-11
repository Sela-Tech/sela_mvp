import React, { Fragment } from "react";
import styled from "styled-components";
// import arrow from "./arrow.svg";
// import Link from "react-router-dom/Link";
import mapping from "../../../../../../mapping";

const DescriptionWrapper = styled.div`
  p {
    line-height: 24px;
    font-size: 16px;
    color: #3d4851;
    font-weight: 100;
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
    h4 {
      font-family: Acumin Pro;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      font-size: 18px;
      color: #3d4851;
    }

    .card {
      margin-top: 16px;
      padding: 1em;
      border: 1px solid rgba(135, 149, 161, 0.25);
      box-sizing: border-box;
      border-radius: 5px;

      img {
        height: 60px;
        width: 60px;
        border-radius: 60px;
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
        font-size: 17px;
        color: #156edc;
        font-weight: 300;
      }

      p {
        font-size: 15px;
        color: #3d4851;
      }

      span {
        font-size: 15px;
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

`;
export default ({ id, project }) => {

  return (
    <DescriptionWrapper className="xs-12">
      <div className="xs-10 xs-off-1">
        <div className="xs-12 md-8">
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

            <div className='extra xs-12'>
            {project.extra ? 
              Boolean(project.extra.length) ?
                project.extra.map((v,y)=>{
                  return <Fragment key={y}>
                    <p>{
                      Object.keys(v).map((k)=>{
                      return (
                        <Fragment>
                        <label>{k}</label>
                        { 
                          Object.keys(v[k]).map((key, i) => {
                        return <Fragment key={i}> 
                          <strong>{key}:</strong>
                          <span>{ v[k][key] }</span>
                          {i % 2 === 0 ? <br/>: null }
                        </Fragment> })
                        }
                      </Fragment>
                      )
                    })
                  }
                  </p>
                  </Fragment>
                }): null: null  
            }
            </div>

            <div className='xs-12 add-doc'>
              <h5>Additional documents</h5>
              
              <div className='xs-12 sm-10 document'>
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
          <h4>Initiated By</h4>

          <div className="card xs-12">
            <div className="xs-3">
              <img src={project.owner.profilePhoto} alt="" />
            </div>

            <div className="xs-9">
              <h4>
                {project.owner.firstName} {project.owner.lastName}
              </h4>
              {/* <p>Reputation Score: {project.owner.reputationScore}</p> */}
              <span>{project.owner.organization && project.owner.organization.name}</span>
            </div>
          </div>

          <div className='xs-12 t-l' id='sdgs'>
          <h4>Sustainable Development Goals (SDGs)</h4>

              {project.tags && project.tags.map((tag,i)=>{
                return <img key={i} src={mapping[tag]} alt={i} onClick={()=>this.props.displaySDGInfo(tag)} />
              })}
          </div>
{/* 
          <div className="xs-12">
            <Link to={`/projects/${id}/stakeholders`} id="see-all">
              Sell All Stakeholders
              <img src={arrow} alt="arrow" />
            </Link>
          </div> */}

        </div>

      </div>
    </DescriptionWrapper>
  );
};

import styled from 'styled-components';

export default styled.div`
&.full{
  height: 100vh;
  .white{
    height: calc(100vh - 81px);
    form{
      height: 100%;
    }
  }
}
.grayed{
    background: #F5F5F8;
    padding: 1em 2em;
  }
  .white{
    background: white;
  }

  border-radius: 5px 5px 0px 0px;
  
  em{
    font-size: 0.75em;
    text-align: left;
    font-weight: 200;
    display: block;
  }

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

  form{

    .form-group{
      padding: 0.5em 0;
    }

    label,input {
      text-align: left;
      display: block;
    }

    label{
      margin-bottom: 0px;
      font-size: 0.95em;
      color: #3D4851;
    }

    select{
      height: 42.5px;
    }

    input, textarea, select{
      background: #FFFFFF;
      border: 1px solid #DDDDDD;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      padding: 1em;
      font-size: 0.8em;
      font-weight: 200;
      margin-bottom: 7.5px;
      resize: none;
      min-height: 2em;
    }
  
    #slant{
      font-weight: 300;
      font-style:italic;
      font-size: 12px;
      text-align: left;
      color: #555;
    }

  }

  #label-image {
    height: 12em;
    width: 100%;
    background: #ADB5BD;
    cursor: pointer;
    position: relative;
    padding: 0;
    border-radius: 4px;

    img {
      position: absolute;
      background: transparent;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }

    p {
      font-size: 2em;
      color: white;
      font-weight: 900;
      margin: 0;
      line-height: 0;
    }
  }
  
  .with-preview input[type="file"] {
    height: 0.1px;
    width: 0.1px;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }


  .react-datepicker-wrapper, .react-datepicker__input-container{
    width:100%;
  }
  @media(min-width: 768px){
    .pad-right{
      padding-right: 1em;
    }
    .pad-left{
      padding-left: 1em;
    }
  }

  .crowdfund{
    text-align: left;

    .req-checkbox{
      height: 1.5em;
      width: 1.5em;
      border-radius: 4px;
      border: 2px solid #3D4851;
      background: white;
      display: inline-block;
      position: relative;
      top: 0.1em;
      padding: 0;
    }

    #crowdfund-checkbox{
      height: 25px;
      width: 25px;
      border-radius: 4px;
      border: 2px solid #3D4851;
      background: white;
      display: inline-block;
      position: relative;
      top: 0.5em;
      padding: 0;
    } 

    .req-checkbox, #crowdfund-checkbox{
      &.active{
        span{
          background: #3D4851;
          height: 12.5px;
          width: 12.5px;
          display: block;
          margin: auto;
          border-radius: 2px;
        }
      }
    }

    label{
      display: inline-block;
      margin-left: 1em;
    }

  }
  
  .react-datepicker__input-container{
    input{
      border: 0;
      margin: 0;
    }
  }

  .date-wrpr.show{
    position: relative;
    margin-bottom: 1em;

    .border{
      border: 1px solid #DDDDDD; 
      border-radius: 4px;  
    }

    img{
      position: relative;
      top: 0.5em;
      right: 0.5em;  
    }
   }


   #transaction-proof{
    height: 43px;
    width: 100%;
    position: relative;
    z-index: 0;
   
   }

`;

export const RequestWrapper = styled.div`
   margin-bottom: 1.25em;
  background: #F5F5F8;
  padding: 1.25em;

  h3{
    text-align: left;
    padding: 0 0 1em 0;
    font-size: 1em;
    font-weight: 400;
  }
  .pad-left{
    padding-left: 1em !important;
  }
  .pad-right{
    padding-right: 1em !important;
  }

  .new-field{
    width: 100%;
    border: 2px dashed #eee;
    background: transparent;
    font-size: 0.85em;
    padding: 1em;
  }

  .delete-btn{
    height: 43px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1.25em;
  }
  

`;
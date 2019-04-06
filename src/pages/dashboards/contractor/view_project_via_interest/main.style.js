import styled from 'styled-components';
import calendar from "../../../../assets/preview/calendar.svg";
import money from "../../../../assets/preview/money.svg";
import location from "../../../../assets/preview/location.svg";

import doc from "../../../../assets/icons/preview-doc.svg";
import pdf from "../../../../assets/icons/preview-pdf.svg";
import img from "../../../../assets/icons/preview-img.svg";
import vid from "../../../../assets/icons/preview-video.svg";
import audio from "../../../../assets/icons/preview-audio.svg";

export default styled.div`
    img#header{
        height: 25em;
        width: 100%;
        object-fit:cover;
        object-position:0 33%;
        background: #f5f5f5;
    }
    .pad{
        padding: 15px;
    }
    .contain{
        padding: 1.5em;
        .bg-text{
            p{
                line-height: 21px;
                font-size: 14px;
                color: #222829;
                font-weight: 300;
            }
        }
        h2{
            margin: 0;
            line-height: 21px;
            font-size: 19px;
            font-weight: 500;
            color: #201D41;
        }
        #status{
            line-height: 15px;
            font-size: 10px;
            text-align: center;
            color: #201D41;
            padding: 7px 18px;
            background: rgba(32,29,65,0.05);
            border-radius: 50px;
            border: 0;
            font-weight: 400;
            margin: 10px 0 0;
        }
    }
    #initiated{
        h3{
            line-height: 21px;
            font-size: 16px;
            color: #222829;
        }
        .border-top-bottom{
            border-top: 1px solid;
            border-bottom: 1px solid;
            border-color: #F2F2F2;
            padding: 6px 0;
            img{
                height: 40px;
                width: 40px;
                border-radius: 40px;
                object-fit: cover;
                object-position:center;
            }
            h5{
                padding-top: 5px;
                font-size: 14px;
                color: #222829;
                margin: 0;
                font-weight: 400;
            }
            span{
                display: block;
                font-size: 10px;
                color: #696F74;
            }
        }
    }

    .p-text{
        span{
            background-repeat:no-repeat !important;
            background-position: center !important;
            background-size: contain !important;
            height: 20px;
            width: 20px;
            display: inline-block;
            margin-right: 15px;
            position: relative;
            top: 5px;
        }
        span#location{
            background: url(${location});
        }
        span#money{
            background: url(${money});
        }
        span#duration{
            background: url(${calendar});
        }

        p{
            font-size: 15px;
            font-weight: 300;
            color: #222829;
            display: inline-block;
        }
    }

    .btn-proposal{ 
        border:0;
        padding: 1.25em 0;
        width: 100%;
        font-size: 0.95em;
        font-weight: 300;
        color: white;
        background: #201D41;
        border-radius: 5px;
        display: block;
        text-align:center;

        &.inverse{
            background: transparent;
            color: #201D41;
            border: 1px solid #201D41;
            &:hover{
                background: #201D41;
                color: white;        
            }
        }

    }

    .img{
        height: 35px;
        min-width: 50px;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-size: contain !important;
        margin-right: 10px;
        position: relative;
        top: 5px;
        display: block;
        float:left;

        &.preview-image{
            background: url(${img});
        }
        &.preview-video{
            background: url(${vid});
        }
        &.preview-audio{
            background: url(${audio});
        }
        &.preview-pdf{
            background: url(${pdf});
        }
        &.preview-document{
            background: url(${doc});
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

    .sdg-btn{
    
        width: 100%;
        background: transparent;
        border: 0;
        text-align: left;
        
        img{
            width: 100%;
            height: 100px;
            object-fit: contain;
            object-position: left;
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
    
`
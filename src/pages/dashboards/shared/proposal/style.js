import styled from 'styled-components';
import calendar from "../../../../assets/icons/calendar-icon.svg";
import money from '../../../../assets/icons/money-icon.svg';
import btn from '../../../../assets/icons/button.svg';
import edit from '../../../../assets/icons/edit.svg';

export default styled.div`
    .p-t{
        padding-top: 1.5em;
    }
    #proposal-name{
        height: 40px;
        width: 80%;
        border-radius: 4px;
        border: 1px solid #eee;
        text-indent: 15px;
        font-size: 0.85em;
        font-weight: 400;
    }

    height: 100vh;
    
    @media(min-width: 1024px){
        overflow: hidden;
    }

    .proposal-left{
        padding: 1em;
        overflow: auto;
        padding-bottom: 5em;
        
        
        h5{
            margin: 5px 0 0 0;
            font-weight: 400;
            font-size: 16px;
            text-align: left;
            color: #201D41;
            line-height: 40px;
        }
    }

    #new-task{
        width: 100%;
        padding: 1.25em;
        border: 1px dashed #B1BAD2;
        color: #F2994A;
        background: transparent;
        font-size: 14px;
        border-radius: 5px;
        margin-top: 1em;

        &:hover{
            background: white;
            box-shadow: 0px 0px 3px 0px #eee;
        }
    }

    #create-milestone{
        float: right;
        border: 0.5px solid #B1BAD2;
        box-sizing: border-box;
        border-radius: 5px;
        height: 40px;
        background: transparent;
        font-weight:300;
        width: 125px;
        font-size: 13px;
        text-align: center;
        
        &.active{
            color: white;
            background:#201D41;
            border: 0;
        }
        &.not-active{
            color: rgba(105, 111, 116, 0.5);
            cursor: not-allowed;
        }

    }

    .trash{ 
        button{
            margin: 20px 0 0;
            background: transparent;
            border: 0;
            font-size: 14px;
            font-weight: 300;
            color: #d21e1e;
            display: block;
            padding: 0;
            text-align: right;
            opacity: 0.8;
            float: right;
            img{
                height: 20px;
                width: 20px;
                object-fit: contain;
                margin-right: 10px;
                display: inline-block;
            }
            label{
                font-weight: 200;
                font-size: 13px;
                font-style: italic;
                display: block;
                margin: 0;
                color: #e91e63;
            }
        }
    }
    
    .single-task{
        background: white;
        padding: 1em;
        margin: 1em 0 0;
        border-radius: 5px;
        
        .menu{
            background: url(${btn});
        }
        .edit{
            background: url(${edit});
        }
        
        .menu, .edit{
            height: 25px;
            width: 25px;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
            border: 0;
            margin: 0.5em 1em 0 0em;
            display: inline-block;
            float: right;
            opacity: 0.5;

            &:hover{
                filter: contrast(0%);
            }
        }
        h3{
            line-height: 15px;
            font-size: 14px;
            color: #3D4851;
            font-weight: 200;
            margin: 0;
            margin-bottom: 5px;
        }
        span{
            display: inline-block;
            line-height: 15px;
            font-size: 13px;
            color: #696F74;
            font-weight: 300;
            margin-right: 5px;
        }
        .money-icon, .calendar-icon{
            position: relative;
            top: 3px;
        }
        .money-icon{
            background: url(${money});
            height: 14px;
            width: 14px;
            background-position: center;
            background-size: contain;
        }
        .calendar-icon{
            background: url(${calendar});
            height: 14px;
            width: 14px;
            background-position: center;
            background-size: contain;
        }
    }

    .select{
        border: 2px solid #ccc;
        border-radius: 2px;
        height: 18px;
        width: 18px;
        margin-top: 8px;
        padding: 1px;
        display: block;
        background: white;
       &.selected{
            background: #201D41;
        }
    }

    .single-milestone{
        background: white;
        margin: 1em 0;
        padding: 1em;
        .single-task{
            background:#FAFAFA;
        }
        .milestone-name{
            border:0;
            font-weight: 300;
            border-bottom: 2px solid #201D41;
            height: 50px;
            background: transparent;
            font-size:15px;
        }
        .milestone-amount{
            text-align: right;
            font-weight: 300;
            color: #F2994A;
        }
    }

    .milestone-id{
        margin-right: 1em;
        height: 25px;
        width: 25px;
        background: #eee;
        border-radius: 5px;
        float: left;
        padding: 0;
        font-weight: 300;
        color: #848484;
        background: white;
        border: 1px solid #babaeb;
        position:relative;
        top: 10px;
    }

    .stakeholder-bit{
        padding: 1em 0 0 0;
        background: white; 
        border-left: 1px solid #eee;
        min-height: 130px;

        label{
            line-height: 1em;
            font-size: 0.9em;
            padding: 0 0 0.5em 0;
            display: block;
            color: #8a94a6;
            text-align: left;
            font-weight: 300;
        }
        em{
            font-size: 0.75em;
            text-align: left;
            font-weight: 200;
            display: block;
        }
    }


    input:disabled, textarea:disabled {
        background: transparent !important;
        color: #444 !important;
    }

    .stakeholder-bit{
        h4{
            margin:0;
            margin-bottom: 0.5em;
            font-weight: 400;
            font-size: 1em;
        }
        #contractor{
            font-size: 0.85em;
            border: 0;
            width: 100%;
            padding: 0.5em 0;
            border: 1px solid #eae9ff;
            border-radius: 5px;
            text-align: center;
            font-weight: 300;
            color: #7d7b7b !important;
        }
    }

    .line{
        border-bottom: 1px solid rgba(105, 111, 116, 0.1);
        padding-top: 1em;
        display: block;
    }

    #comments{
        position: relative;
    }

    #prop-name{
        display: block;
        font-size: 0.8em;
        margin-bottom: 0.8em;

    }
`;

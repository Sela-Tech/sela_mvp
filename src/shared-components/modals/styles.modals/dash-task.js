import styled from 'styled-components';

export default styled.div`
    .grayed{
        background: #F5F5F8;
        padding: 0 2em;
    }
    .white{
        background: white;
        padding: 1em 0;

    }
    border-radius: 5px 5px 0px 0px;

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

    #delete{
    background: #f44336;
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
    label,input, select {
        text-align: left;
        display: block;
    }
    label{
        margin-bottom: 0px;
        font-size: 13px;
        color: #7b8c9a;
    }
    input, textarea, select{
        background: #FFFFFF;
        border: 1px solid #DDDDDD;
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        padding: 1em;
        font-size: 14px;
        font-weight: 300;
        margin-bottom: 7.5px;
    }
    #slant{
    font-weight: 300;
    font-style:italic;
    font-size: 12px;
    text-align: left;
    color: #555;
    }
    }

    .react-datepicker-wrapper, .react-datepicker__input-container{
    width:100%;
    }

    select{
    height: 45px;
    }

    input:disabled{
        background: transparent !important;
        color: #555 !important;
    }
`
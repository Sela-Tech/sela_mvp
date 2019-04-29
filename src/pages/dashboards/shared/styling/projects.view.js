import styled from 'styled-components';

export default styled.div`

.wrap-img{
    width: 100%;
    width: 100%;
    height: 10em; 
    position: relative;

    button{
        position: absolute;
        bottom: 8px;
        left: 8px;
        border-radius: 0.25em;
        height: 2.5em;
        width: 100px;
        color: white;
        text-transform: Capitalize;
        font-weight:300;
        border: 1px solid white;

        &.proposed, &.dormant{
            background: #0000008a;
        }
        &.in-progress{
            background: #0c9864d4;
        }
        &.completed{
            background: #156edccc;
        }
        &.terminated{
            background: #BC1717;
        }
    }
}

section{
    padding-bottom: 50px;
}
padding: 3%;
label{
    font-weight: 500;
    font-family: Acumin Pro;
    line-height: 22px;
    font-size: 15px;
    color: #4d6273;
    padding-bottom: 5px;
    display: block;
}

.slider{

    .inner-not-proj{
        width: 95% !important;
    }
    .inner{
        cursor: pointer;
        background: rgba(10, 44, 86, 0.5);
        box-shadow: 0px 5px 10px rgba(34, 40, 41, 0.15);
        border-radius: 5px;
        height: 200px;
        width: 95% !important;
        position: relative;

        p{
            font-family: Acumin Pro;
            line-height: 20px;
            font-weight: 300;
            font-size: 14px;
            color: #FFFFFF;
            padding: .5em 1em;
            position: absolute;
            z-index: 1;
            top: 0;

        }
        img{
            height: 200px;
            width: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            opacity: 0.3;
        }
    }
}


.empty-box{
    border: 1px dashed #B1BAD2;
    box-sizing: border-box;
    border-radius: 5px;
    height: 272px;
    line-height: 21px;
    font-size: 14px;
    text-align: center; 
    color: #696F74;
    &.inner{
        width: 95% !important;
        strong{
            display: block;
            font-weight: 500;
            margin: 0;
            font-size: 35px;
        }
    }
    p{
        font-weight: 300;
        padding: 0 2em;
    }
}
`;
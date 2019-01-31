import styled from 'styled-components';

export default styled.div`

section{
    padding-bottom: 50px;
}
padding: 3%;
label{
    font-weight: 300;
    font-family: ProximaNova;
    line-height: 22px;
    font-size: 15px;
    color: #696F74;
    padding-bottom: 5px;
    display: block;
}

.slider{
    .inner{
        cursor: pointer;
        background: rgba(10, 44, 86, 0.5);
        box-shadow: 0px 5px 10px rgba(34, 40, 41, 0.15);
        border-radius: 5px;
        height: 200px;

        @media(min-width: 425px){
            width: 95% !important;
        }

        position: relative;

        p{
            font-family: ProximaNova;
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
`;
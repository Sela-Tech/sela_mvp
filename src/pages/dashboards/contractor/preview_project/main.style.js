import styled from 'styled-components';

export default styled.div`
    img#header{
        height: 300px;
        width: 100%;
        object-fit:cover;
        object-position:center;
        background: #f5f5f5;
    }
    .pad{
        padding: 15px;
    }
    .contain{
        padding: 1.5em;
        .text{
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
            font-size: 13px;
            text-align: center;
            color: #201D41;
            padding: 7px 18px;
            background: rgba(32,29,65,0.05);
            border-radius: 50px;
            border: 0;
            font-weight: 300;
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
`
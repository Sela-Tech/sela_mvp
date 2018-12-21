import styled from 'styled-components';

export default styled.div`
.white{
    background: white;
    margin-top: 6%;
    background: #FFFFFF;
    border: 1px solid #EAEDF3;
    box-sizing: border-box;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    h3{
        padding: 1.25em;
        margin:0;
        border-bottom: 1px solid #F5F5F8;
        font-family: ProximaNova;
        font-weight: 400;
        line-height: 22px;
        font-size: 17px;
        color: #222829;

    }

    .row{
        padding: 1em;
        &+.row{
            border: 1px solid #F5F5F8;
        }
        img{
            height: 50px;
            width: 50px;
            border-radius: 50px;
        }
        

        p,a{
            font-family: ProximaNova;
            line-height: 20px;
            font-size: 15px;
            color: #201D41;
            font-weight: 300;
            margin-top: 0px;
            margin-left: 5px;
            margin-bottom: 5px;
        }

        a{
            color: #FFC107;
            margin: 0;
        }

        span{
            font-family: ProximaNova;
            line-height: 14px;
            font-size: 12px;
            font-weight: 300;
            display: block;
            color: #696F74;
            margin-left: 5px;
        
        }

    }
}`;
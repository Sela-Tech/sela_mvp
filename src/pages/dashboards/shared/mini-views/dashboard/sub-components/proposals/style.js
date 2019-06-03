import styled from 'styled-components';

export default styled.div`

.t-r{
    text-align: right;
    margin: 1em 0;
    a{
        margin: 0.25em;
    }
}
.empty p {
    font-size: 15px;
    color: #717171;
    font-weight: 200;
    line-height: 22px;
}

.empty a{
    margin: 0.25em;
}

#create-milestone{
    text-align: center;
    padding: 0 1.5em;
    height: 45px;
    line-height: 45px;
    color: white;
    font-weight: 300;
    font-size: 14px;
    background: linear-gradient(151.17deg,#C13C1E 0%,#F2994A 100%);
    border-radius: 5px;
    border: 0;
    display: inline-block;
}

#add-stakeholder{
    height: 45px;
    width: 175px;
    background: linear-gradient(0deg,#156EDC 2.22%,#1F6FE5 98.44%);
    border: 1px solid #1461D2;
    box-sizing: border-box;
    box-shadow: 0px 1px 1px rgba(22,29,37,0.1), inset 0px 2px 0px rgba(255,255,255,0.06);
    border-radius: 4px;
    font-family: Acumin Pro;
    font-weight: 300;
    line-height: 45px;
    font-size: 14px;
    text-align: center;
    color: #FFFFFF;
    display: inline-block;
}

.prop{
    .inner{
            
        background: #FFFFFF;
        box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.04);
        border-radius: 5px;
        padding: 1em;
        cursor: pointer;
        h4{
            line-height: 21px;
            font-size: 1em;
            color: #3D4851;
            margin: 0;
            font-weight: 300;
            text-transform: capitalize;
        }

        span{
            letter-spacing: 0.25px;
            line-height: 1.85em;
            font-size: 0.8em;
            color: #696F74;
            font-weight: 300;
        }

        h3{
            line-height: 1em;
            font-size: 1em;
            color: #F2994A;
            margin: 0;
            font-weight: 400;
            margin: 0.5em 0;
        
        }
    }
}
`;
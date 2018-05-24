import homeActions from "../actions/home";
const initstate = {

}

export default (state=initstate,payload)=>{
    switch(payload.type){
        case homeActions.doSomething:
        return state
        default:
        return state
    }
}
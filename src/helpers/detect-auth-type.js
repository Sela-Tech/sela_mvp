export default (match)=> {
    switch(match.path){
      case "/signin":
      return "Signin"
      case "/signup":
      return "Signup"
      default:
      return "Login"
  }
}
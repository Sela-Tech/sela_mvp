export default (match)=> {
    switch(match.path){
      case "/login":
      return "Login"
      case "/signup":
      return "Signup"
      default:
      return "Login"
  }
}
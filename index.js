const path = require("path");
const express = require("express");

const app = express();

//don't forget to npm install -s path
app.use(express.static(path.resolve(__dirname, "app", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "app", "build", "index.html"));
}); 


app.listen(process.env.PORT || 4000 ,()=>{
    console.log('LISTENING')
})
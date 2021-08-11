const express = require('express');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 8080
const cors = require('cors');
app.use(cors());


app.get('/', (req, res) => {
    res.send("oioi")
})

app.post('/make-new-snack', (req, res) => {
    
    //parse request req.body
    let newSnack = JSON.parse(req)
    //check to make to sure its correct 

    //send it to snacks array
    snacks.push(newSnack)
})

app.get('/get-all-snacks', (req, res) =>{

})

app.listen(port, () => {
    console.log("app is running");
})



let snacks = {};
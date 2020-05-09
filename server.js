const express = require('express');
const port = 8000
const server = express();





server.get('/',(req,res)=>{
res.send('Hello World from Express!')
})


server.listen(port,()=>{
    console.log(`server listening on port ${port}`)
})
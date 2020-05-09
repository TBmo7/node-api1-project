const express = require('express')
const shortid = require('shortid');
const server = express()

server.use(express.json())

 let users = [
    {
        id: "1",
        name:"River Tam",
        bio:"I swallowed a bug."
    },
    {
        id:"2",
        name:"Malcom Reynolds",
        bio:"Still flying."
    },
    {
        id:"3",
        name:"Jayne Cobb",
        bio:"Dash cunning, huh?"
    }
]


server.get('/',(req,res)=>{
    res.send('Hello World ')
});

/**--------------GETS--------------------------------------- */
server.get('/api/users', (req,res)=>{
    
    // users.find(req.query)
   
        if(!users){
            res.status(500).json({errorMessage:"error retrieving users"})
        }
        res.status(200).json(users)
    })

server.get('/api/users/:id',(req,res)=>{
    const {id} = req.params
    const found = users.find(user=>user.id === id)
    
    let index = users.findIndex(user=>user.id ===id)

    if(found){
        res.status(200).json(users[index])
    }
    else{
        res.status(404).json({errorMessage:"error, user not found"})
    }
})    
    
    

/**-----------------------POSTS--------------------- */
server.post('/api/users', (req,res)=>{
    const userInfo = req.body;
    console.log(userInfo)
    if(!userInfo.bio || !userInfo.name){
        res.status(400).json({errorMessage:"Please provide name and bio for the user"})
    }
    else{
    userInfo.id = shortid.generate();
    users.push(userInfo);
    if(!users.includes(userInfo)){
        res.status(500).json({errorMessage:"There was an error while saving the user to the database"})
    }
    else{
    res.status(201).json(userInfo)
    }
    }
})

/**------------------DELETE-------------------- */

server.delete(`/api/users/:id`,(req,res)=>{
const {id} = req.params;
const found = users.find(user => user.id === id);
console.log(id)
if (found){
    users = users.filter(user=> user.id !== id)
    res.status(200).json(found)
}
else {
    res.status(404).json({message: "user not found"})
}


})

/**-------------------UPDATE---------------------- */

// server.patch('/api/users/:id',(req,res)=>{
//     const {id} = req.params
//     const changes = req.body
//     let found = users.find(user=>user.id ===id)

//     if(found){
//         Object.assign(found,changes);
//         res.status(200).json(found)
//     }
//     else{
//         res.status(404).json({message:"user not found"})
//     }
// })

server.put('/api/users/:id', (req,res)=>{
    const {id} = req.params
    const changes = req.body
    
    let index = users.findIndex(user=>user.id ===id)
    console.log(index)
    if(!changes.bio||!changes.name){
        res.status(400).json({message:"Please provide name and bio for the user"})
    }
    else{
    if(index !== -1){
        changes.id = id
        users[index] = changes
        if(!users[index]){
            res.status(500),json({message:"User information was not modified"})
        }
        else{
        res.status(200).json(users[index])
        }
    }
    else{
        res.status(404).json({message:"user not found"})
    }
}
})





server.listen(8000,()=>console.log('API running on port 8000 '))
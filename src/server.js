const express = require("express")
const server = express()
const db = require("./database/db.js")
server.use(express.static("public"))
server.use(express.urlencoded({extended:true}))
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express:server,
    noCache: true

})
function pagePush(page,value) {
    server.get(`${value}`,(req,res)=>{
        return res.render(`${page}`)  
    }) 
}
pagePush("index.html","/")
//pagePush("creat-point.html","/create-point")
//pagePush("search-results.html","/search-results")
server.get("/search-results",(req,res)=>{
        const search = req.query.search
        if(search==""){
            return res.render("search-results.html",{total:0}) 
        }



    db.all(`SELECT * FROM places WHERE city LIKE'%${search}%'`,function(err, rows){
        if(err){
            return console.log(err)
        }
         const total = rows.length
        return res.render("search-results.html",{places: rows,total:total})  
    })
    

}) 
server.get("/create-point",(req,res)=>{
    
        return res.render("creat-point.html")  
    
    

}) 
server.post("/savepoint",(req,res)=>{
   
   
   const query = `
   INSERT INTO places (
       name,
       image,
       address,
       address2,
       state,
       city,
       items
       ) VALUES (?,?,?,?,?,?,?)

`
   const values=[
       req.body.name,
       "https://images.unsplash.com/photo-1612965110642-d2ed35011901?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
       req.body.address,
       req.body.address2,
       req.body.state,
       req.body.city,
       req.body.items
       
       
   ]
   function afterInsertData(err){
       if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
       }
       console.log("cadastrado com sucesso")
       console.log(this)
       return res.render("creat-point.html",{saved:true})

   }
   db.run( query, values, afterInsertData)
    

})


server.listen(3000)

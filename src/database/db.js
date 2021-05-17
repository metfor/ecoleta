const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database("./src/database/database.db")
module.exports=db
/*db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
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
        "Coletoria",
        "https://images.unsplash.com/photo-1612965110642-d2ed35011901?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80",
        "Guilherme Gemballa, Jardim América",
        "Nº260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos, Eletrônicos, lãmpadas"
    ]
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }
        console.log("cadastrado com sucesso")
        console.log(this)

    }
    db.all(`SELECT * FROM places`,function(err, rows){
        if(err){
            return console.log(err)
        }
        console.log(rows)
    })
   // db.run(`DELETE FROM places WHERE id= ?`,[1])
   db.run( query, values, afterInsertData)
})*/
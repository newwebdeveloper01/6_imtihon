const {read ,write ,hashPassword}=require('../utils/model.js');
const crypto=require('crypto');

crypto.createHash('sha256').update('olma').digest('hex');

module.exports={



/*
{
        "username": "salim",
        "password": "olma" 
    }

*/



    POST: async ( req  , res)=>{
        try {
            
        let {username , password}=await req.body;
        password=crypto.createHash('sha256').update(password).digest('hex');
        const admin=read('admin');
        const filtered=admin.find( data=>data.username==username && data.password==password);
        if(!filtered){
            throw new Error("username yoki password xato")
        }
        res.json(200 , {massage: "ok" })
        } catch (Error) {
            res.json(400 , {Error:"username yoki password xato"})
        }
        

    }


}
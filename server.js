 const http=require('http');
 const fs=require('fs');
 const Express=require('./lib/express.js');
 const {read ,write ,hashPassword}=require('./utils/model.js');
const categories=require('./controllers/categories.js');
const subCategories = require('./controllers/subCategories.js');
const product = require('./controllers/product.js');
const admin=require('./controllers/admin.js'); 

function httpServer(req , res){

    const app= new Express(req , res);

    app.get('/categories' , categories.GET )
    app.get('/subCategories' , subCategories.GET)
    app.get('/products' , product.GET)
    app.post('/categories', categories.POST)
    app.post('/subCategories' , subCategories.POST)
    app.post('/product' , product.POST)
    app.put('/categories', categories.PUT)
    app.put('/subCategories' , subCategories.PUT)
    app.put('/product' , product.PUT)
    app.delete('/categories' , categories.DELETE)
    app.delete('/subCategories' , subCategories.DELETE)
    app.delete('/product' , product.DELETE)
    app.post('/sigin', admin.POST)




}

http.createServer(httpServer).listen(5005 , ()=> console.log("server ishladi "));










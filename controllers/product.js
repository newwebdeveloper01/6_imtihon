const {read ,write ,hashPassword}=require('../utils/model.js');


module.exports={

/*

    /products -> []

    /products?categoryId=1
    /products?subCategoryId=2
    /products?subCategoryId=1&model=samsung
    /products?model=samsung



*/

  
    GET:(req , res)=>{
        const data=read('products')
        const {product_id , subCategoryId , model } = req.query;
        const filtered = data.filter(user =>{
          if(product_id){
            return  user.product_id==product_id ;
          }
          else if( subCategoryId  && !model  ){
             return user.sub_category_id==subCategoryId
          }
          else if( model  && !subCategoryId ){
            return user.model==model
          }
          else if ( subCategoryId && model  ){
            return (user.model==model && user.sub_category_id==subCategoryId);
          }
        } )
        console.log(filtered);
        if (filtered.length) {
          res.json(200 , filtered);
      } 
       else{
          res.json(200 , []);
       }
    },


    //subCategoryId, productName
    /*
    
     {
        
        "sub_category_id": 1,
        "model": "samsung",
        "product_name": "galaxy 7",
        "color": "red",
        "price": "190"
    }
    
    */
    POST: async (req, res) => {
        const {sub_category_id, product_name } = await req.body;
        let subCategories=read('subCategories');
        let product= read('products');
        try {
            let productIdTest=subCategories.find(cate=>cate.sub_category_id==sub_category_id)
            
          if (!(product_name.length > 2 && product_name.trim() && productIdTest)) {
            throw new Error('no such id found');
          }
          
          
    
          const newproduct = {
            product_id: product.at(-1).product_id + 1 || 1,
            sub_category_id,
            "model": "samsung",
            product_name,
            "color": "red",
            "price": "190",
            
          };
          product.push(newproduct);
          write('products', product);
          res.json(201, { status: 201, message: 'new user added' });
        } catch (error) {
          res.json(400, { status: 400, message: error.message });
        }
      },

/*
       productId productName price
       {
        "product_id": 8,
        "product_name": "14 pro max",
        "price": "190"
    }


*/

      PUT:async (req , res )=>{
        const {product_id , product_name , price}= await req.body;
        let  products=read('products');
        try {
          
          const changeData=products.find(data=>data.product_id==product_id);
          if (!changeData) {
            throw new Error('no such id found');
          }
          changeData.product_name=product_name || changeData.product_name;
          changeData.price=price || changeData.price;

          write('products', products);
          res.json(201, { status: 201, message: 'new user added' });

        } catch (error) {
          res.json(400, { status: 400, message: error.message });
        }

      },

      
/*

  DELETE
    /product
        productId

{
        "product_id": 8,
        
}



*/

      DELETE:  async(req , res )=>{
        const {product_id} = await req.body;
        let product=read('products');

        try {
          const deleteId=product.findIndex(data=> data.product_id==product_id);
          if (!deleteId) {
            throw new Error('no such id found');
          }
          product.splice(deleteId , 1)
          write('products', product)
          res.json(204 , {status:204})


        } catch (Error) {
          res.json(500 , {status:500 , massage:Error})
        }
      }
}









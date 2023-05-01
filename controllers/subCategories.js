const {read ,write ,hashPassword}=require('../utils/model.js');


module.exports={


    GET:(req , res)=>{
        let product=read('products');
        let subCategories=read('subCategories');
        subCategories.filter(obj=>{
            obj.products=[]
            for(let obj1 of  product){
                
                if(obj.sub_category_id == obj1.sub_category_id){
                    obj.products.push(obj1)
                    
                }
            }
        })
        

       

        res.json(200,subCategories); 
    },

    //  categoryId, subCategoryName
    /*
    {
        "category_id": 3,
        "sub_category_name": "Hamsa"
    }
    
    */
    POST: async (req, res) => {
        const {category_id, sub_category_name } = await req.body;
        let subCategories=read('subCategories');
        let categories = read('categories');
        try {
            let categoriesIdTest=categories.find(cate=>cate.category_id==category_id)
            
          if (!(sub_category_name.length > 2 && sub_category_name.trim() && categoriesIdTest)) {
            throw new Error('no such id found');
          }
          
          
    
          const newSubCategories = {
            sub_category_id: subCategories.at(-1).sub_category_id + 1 || 1,
            category_id,
            sub_category_name,
            
            
          };
          subCategories.push(newSubCategories);
          write('subCategories', subCategories);
          res.json(201, { status: 201, message: 'new user added' });
        } catch (error) {
          res.json(400, { status: 400, message: error.message });
        }
      },



      /*
       subCategoryId subCategoryName

      {
        "sub_category_id": 8,
        "category_id": 4,
        "sub_category_name": "Spark"
    }
      
      
      */

      PUT:async (req , res )=>{
        const {sub_category_id , sub_category_name}= await req.body;
        let  subCategories=read('subCategories');
        try {
          
          const changeData=subCategories.find(data=>data.sub_category_id==sub_category_id);
          if (!changeData) {
            throw new Error('no such id found');
          }
          changeData.sub_category_name=sub_category_name || changeData.sub_category_name;

          write('subCategories', subCategories);
          res.json(201, { status: 201, message: 'new user added' });

        } catch (error) {
          res.json(400, { status: 400, message: error.message });
        }

      },



/*


DELETE
    /subCategories
        subCategoryId
    {
        "sub_category_id": 9
    }


*/


      DELETE:  async(req , res )=>{
        const {sub_category_id} = await req.body;
        let subCategories=read('subCategories');

        try {
          const deleteId=subCategories.findIndex(data=> data.sub_category_id==sub_category_id);
          if (!deleteId) {
            throw new Error('no such id found');
          }
          subCategories.splice(deleteId , 1)
          write('subCategories', subCategories)
          res.json(204 , {status:204})


        } catch (Error) {
          res.json(500 , {status:500 , massage:Error})
        }
      }

}





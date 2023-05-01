const {
    read,
    write,
    hashPassword
} = require('../utils/model.js');


module.exports = {


    GET: (req, res) => {
        let categories = read('categories');
        let subCategories = read('subCategories');
        categories.filter(obj => {
            obj.subCategorie = []
            for (let obj1 of subCategories) {
                if (obj.category_id == obj1.category_id) {
                    obj.subCategorie.push(obj1)
                }
            }
        })
        res.json(200, categories);
    },


/*
{
        "category_name": "cars"
}
*/

    POST: async (req, res) => {
        const {category_name } = await req.body;
        let categories = read('categories');
        try {
          if (!(category_name.length > 2 && category_name.trim())) {
            throw new Error('no such id found');
          }
         
    
          const newCategories = {
            category_id: categories.at(-1).category_id + 1 || 1,
            category_name,
            
          };
          categories.push(newCategories);
          write('categories', categories);
          res.json(201, { status: 201, message: 'new user added' });
        } catch (error) {
          res.json(400, { status: 400, message: error.message });
        }
      },


/*

{
        "category_id": 1,
        "category_name": "electronics"
    }

*/

      PUT:async (req , res )=>{
        const {category_id , category_name}= await req.body;
        let  categories=read('categories');
        try {
          
          const changeData=categories.find(data=>data.category_id==category_id);
          if (!changeData) {
            throw new Error('no such id found');
          }
          changeData.category_name=category_name || changeData.category_name;

          write('categories', categories);
          res.json(201, { status: 201, message: 'new user added' });

        } catch (error) {
          res.json(400, { status: 400, message: error.message });
        }

      },



      /*
      
       productId

       {
        "category_id": 4,
        
      }
      
      */

      DELETE:  async(req , res )=>{
        const {category_id} = await req.body;
        console.log(category_id);
        let categories=read('categories');

        try {
          const deleteId=categories.findIndex(data=> data.category_id==category_id);
          if (!deleteId) {
            throw new Error('no such id found');
          }
          categories.splice(deleteId , 1)
          write('categories', categories)
          res.json(204 , {status:204})


        } catch (Error) {
          res.json(500 , {status:500 , massage:Error})
        }
      }

}
const Dog = require('../models/Dog');
const Category2 = require('../models/Category-2');
const Category = require('../models/Category');
const User = require('../models/UserN');


exports.getProductForIndexPage = async (req, res) => {
  try 
  {
    const dog_cate = await Category.findOne({"title": "Dogs"}).lean() ;
    const cat_cate =await Category.findOne({"title": "Cats"}).lean();
    const other_cate =await Category.findOne({"title": "Others Pet"}).lean();
  
    const dog_subcate =await Category2.find({"category": "5d725a4a7b292f5f8ceff789"}).lean();
    const cat_subcate =await Category2.find({"category": "5d725c84c4ded7bcb480eaa0"}).lean();
    const other_subcate =await Category2.find({ "category": "5d725cb9c4ded7bcb480eaa1"}).lean();

    const dogs = await Dog.find({"categoryid":"5d725a4a7b292f5f8ceff789"}).limit(4).lean();
    const cats = await Dog.find({"categoryid":"5d725c84c4ded7bcb480eaa0"}).limit(4).lean();   
    res.render('index', { dogs, cats,dog_subcate,cat_subcate,other_subcate,dog_cate,cat_cate,other_cate,title: 'Pet Friends | All About Your Pets'});
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

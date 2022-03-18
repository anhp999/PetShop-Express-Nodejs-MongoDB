const Category = require('../models/Category');
const Message = require('../models/Message');

exports.setBooking = async (req, res) => {
  try 
  {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    let errors = [];
    if(errors.length > 0) res.render('petspa',{name, email,message})
    else {
      const newPostMessage = {name, email,message}
      const newMessage = new Message(newPostMessage)
      //đưa vào csdl
      await newMessage.save((err) =>{
        if (err) 
        {
          req.session.message = {
            type: 'danger',
            intro: 'Could Not Send Your Booking',
            message: 'Please Try Again.'
        }
        res.redirect('/booking')
        }
        else
        {
          req.session.message = {
            type: 'success',
            intro: 'Successfully Sent',
            message: ''
        }                     
        res.redirect('/booking');
        }
      })
  }
  
  } catch (error) {
    console.error(error);
    //res.status(500).json({ message: "Server Error" });
    res.render('500', {layout:'blank.handlebars',title: '500 Not Found'})
  }
};

exports.getBooking = async (req, res) => {
  try 
  {
    var categories =await Category.find({}).populate('subcategory').lean();
    res.render('petspa', {title: 'Booking Services',categories});
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

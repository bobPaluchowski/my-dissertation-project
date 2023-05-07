import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';



/// new user register
/// public route
/// post req
/// api/user/

export const userRegister = ('/', asyncHandler(async(req, res) =>{
    
    const {firstname,lastname, email, role} = req.body
 
   
const salt = await bcrypt.genSalt(10);
const password = await bcrypt.hash(req.body.password, salt);

const user= await User.create({firstname, lastname, email, password, role})

if (user) {
    // emailVerification(user.email, user._id)
    // const token = jwt.sign({ id: user._id , email: user.email, role: user.role}, process.env.JWT_SECRET, {
    //                 expiresIn: '30d'
    //             });
    res.json({
                    id: user._id,
                    
                    
                })
    
}

   
}))

/// user login auth 
/// public route
/// api/user/login
export const userAuth= ('/login', asyncHandler(async (req, res)=> {
    const {email, password} = req.body
    try {
        const user=await User.findOne({email})
        bcrypt.compare(password, user.password, (err, response) => {
            if (response) {
    
                if (user) {
                //     if (!user.isVerified) {
                // res.json('Account not verified')
                // return;
                //     }
                    const token = jwt.sign({ id: user._id , email: user.email, role: user.role,}, process.env.JWT_SECRET, {
                        expiresIn: '90d'
                    });
                    res.json({
                        id: user._id,
                        firstname: user.firstname,
                        lastname:user.lastname,
                        email: user.email,
                        holiday_entitlement: user.holiday_entitlement,
                        location: user.location,
                        site: user.site,
                        isAdmin: user.isAdmin,
                        role: user.role,
                        token : token
                        
                    })
                    
                }else{
                    throw new Error('Invalid email or password')
                    
                }
            }else{
                res.status(401)
                console.error('Invalid email or password')
                res.json('invalid email or password')
                

            }
         }) 
       
    } catch (error) {
        throw new Error('invalid email or password')
    }
    
    
}))

/// add new employee
export const addEmployee= ('/add', asyncHandler(async (req, res)=>{
    let {
      firstname,
      lastname,
      email,
      location,
       site,
       holiday_entitlement
    } = req.body;

location.trim().toLowerCase()
site.trim().toLowerCase()
    const salt = await bcrypt.genSalt(10);
const password = await bcrypt.hash(req.body.password, salt);
  
    const user = new User({
       firstname,
       lastname,
       email,
       password,
       location,
       site,
       holiday_entitlement
      
      })
  
    const employeeDone= await user.save()

    if (employeeDone) {
        res.json(employeeDone)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with creating employee')
    }


}))


/// update Employee 
/// private route
/// api/user/update/:id
export const updateEmployee = ("/update/:id", asyncHandler(async (req, res) => {

    try {
      const employee = await User.findOneAndUpdate({_id:req.params.id}, req.body.changedField);
    if (employee) {
      res.json({success: true, message:'Employee updated successfully'});
    } else {
      res.status(500);
      throw new Error("Internal error");
    }
    } catch (error) {
      res.status(404);
      res.json({success: false, message:'Employee not found'})
    }
  }));

  
/// delete Employee 
/// private route
/// api/user/delete/:id
export const deleteEmployee =
("/delete/:id",
asyncHandler(async (req, res) => {
  const employee = await User.deleteOne({_id:req.params.id});
 
  if (employee.deletedCount !==0 ) {
    res.json({success: true, message:'Employee deleted successfully'});
  } else {
    res.status(404);
    throw new Error("Employee Not Found...");
  }
}));


/// get logged in user profile
/// private route
/// api/user/profile

export const getUser = ('/profile', asyncHandler(async(req, res) =>{

    const user= await User.findById(req.user._id, '-password')
   
    if (user) {
       
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// get users list by admin
/// private route
/// get req
/// api/user/

export const getUsersList = ('/', asyncHandler(async(req, res) =>{
    
if (!req.user.isAdmin) {
    res.statusCode(401).json({success:false})
    return
}

    const users= await User.find({isAdmin: {$ne: req.user.isAdmin}}).select('-password')
   
    if (users) {
       
        res.json(users)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// logged in user profile update
/// private route
/// api/user/profile/update

export const updateMyProfile = ('/profile/update', asyncHandler(async(req, res) =>{

    const user= await User.findOneAndUpdate({_id:req.user._id}, req.body )
   
    if (user) {
        res.json({success: true})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


///  user profile update by admin
/// private route
/// api/user/roleupdate

export const userUpdate = ('/roleupdate/:id', asyncHandler(async(req, res) =>{
 
    const user= await User.findOneAndUpdate({_id:req.params.id}, {role: req.body.role} )
   
    if (user) {
        res.json({success: true})
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))


/// get  user profile by id
/// public route
/// api/user/:id

export const getProfileById = ('/:id', asyncHandler(async(req, res) =>{
    
    const user= await User.findById(req.params.id,'-password');
   
    if (user) {
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User not found')
    }
}))

/// fetching all employee
/// public route
/// api/business
export const getAllBusiness= ('/employee',  asyncHandler(async (req, res)=> {
    try {
        const employees= await User.find({role:'user'})

    res.json(employees)
        
    } catch (error) {
        res.json( error.message)
    }
}))


///  business profile approved by admin
/// private route
/// api/user/business/approve/:id

export const businessApprove = ('/business/approve/:id', asyncHandler(async(req, res) =>{
 let rndstring= uuidv4()
    try {
        const business = await User.findOneAndUpdate({_id:req.params.id}, {txtdnsverifystring:true, txtdnsrndstring:rndstring});
      if (business) {
        res.json({success: true, message:'Business approved successfully'});
      } else {
        res.status(500);
        throw new Error("Internal error");
      }
      } catch (error) {
        res.status(404);
        res.json({success: false, message:'business account not found'})
      }
}))


///  business profile update by admin
/// private route
/// api/user/business/update/:id

export const businessUpdate = ('/business/update/:id', asyncHandler(async(req, res) =>{
 
    try {
        const business = await User.findOneAndUpdate({_id:req.params.id}, req.body.changedField);
      if (business) {
        res.json({success: true, message:'business updated successfully'});
      } else {
        res.status(500);
        throw new Error("Internal error");
      }
      } catch (error) {
        res.status(404);
        res.json({success: false, message:'business account not found'})
      }
}))


/// delete business 
/// private route
/// api/user/business/delete/:id

export const businessDelete = ("/business/delete/:id", asyncHandler(async (req, res) => {
    try {
        const business = await User.deleteOne({_id:req.params.id});
   
    if (business.deletedCount !==0 ) {
      res.json({success: true, message:'business deleted successfully'});
    } else {
        res.status(500);
        throw new Error("Internal error");
      }
    } catch (error) {
        res.status(404);
      throw new Error("business Not Found...");
    }
  }));


  
  /// add selected template
/// api/user/template/select/:id
export const selectTemplate =
("/template/select", asyncHandler(async (req, res) => {
  
const { title, templateid}= req.body

 try {
   await User.findOneAndUpdate({ _id: req.user._id }, 
    { $push: { selectedTemplate: {title, templateid}  }}, 
    
    );
    res.json({success: true, message:'template selected successfully'});
  
 } catch (error) {
  
  throw new Error("template Not Found....");
 }
}));


  /// remove selected template
/// api/user/template/remove/:id
export const removeselectTemplate =
("/template/remove:id", asyncHandler(async (req, res) => {
  
// const {  templateid}= req.body

 try {
   await User.findOneAndUpdate({ _id: req.user._id}, 
    { $pull: { selectedTemplate: { templateid: req.params.id}  }}, 
    
    );
    res.json({success: true, message:'template removed successfully'});
  
 } catch (error) {
  
  throw new Error("template Not Found....");
 }
}));



import asyncHandler from 'express-async-handler'

import Holiday from '../Models/holidayModel.js';
import * as dns from "dns";



/// fetching holidays
/// private route
/// api/holiday
export const getHoliday= ('/',  asyncHandler(async (req, res)=> {
    if (req.user.role==='admin') {
      try {
        const holidays= await Holiday.find({}).populate('employee', {firstname:1, lastname:1, holiday_entitlement:1})

    res.json(holidays)
        
    } catch (error) {
        res.json( error.message)
    }
    }else{
      try {
        const holidays= await Holiday.find({'employee': req.user._id}).populate('employee', {firstname:1, lastname:1, holiday_entitlement:1})

    res.json(holidays)
        
    } catch (error) {
        res.json( error.message)
    }
    }
}))


/// add new holiday
/// private route
/// api/holiday/add
export const createHoliday= ('/add', asyncHandler(async (req, res)=>{
    const {
      dates,
      
    } = req.body;
    
    let totalDays= dates.length;
    const holiday = new Holiday({
       employee: req.user._id,
       dates,
       totalDays
        
      })
  
    const holidayDone= await holiday.save()

    if (holidayDone) {
        res.json(holidayDone)
        
    }
    else {
        res.status(404)
        throw new Error('Problem with creating holiday')
    }


}))




/// update holiday 
/// private route
/// api/holiday/update/:id
export const updateHoliday = ("/update/:id", asyncHandler(async (req, res) => {

    try {
      const holiday = await Holiday.findOneAndUpdate({_id:req.params.id}, {isVerifyReqSent: true});
    if (holiday) {

      dns.resolveTxt(holiday.holidayName, async (err, addresses) => {
        const checkDNS= addresses.filter(e=>{
          return e.includes(holiday.txtrecord) 
        })

        if (checkDNS.length>0) {
          const holiday = await Holiday.findOneAndUpdate({_id:req.params.id}, {isVerified: true});

          
      res.json({success: true, message:'DNS TXT verify successfull!'});
        }else{res.json({success: true, message:'TXT record not found! Please try again after 15 minutes'});}
    });
     
    } else {
      res.status(500);
      throw new Error("Internal error");
    }
    } catch (error) {
      res.status(404);
      res.json({success: false, message:'holiday not found'})
    }
  }));

/// delete holiday 
/// private route
/// api/holiday/delete/:id
export const deleteHoliday =
  ("/delete/:id",
  asyncHandler(async (req, res) => {
    const holiday = await Holiday.deleteOne({_id:req.params.id});
   
    if (holiday.deletedCount !==0 ) {
      res.json({success: true, message:'holiday deleted successfully'});
    } else {
      res.status(404);
      throw new Error("holiday Not Found...");
    }
  }));


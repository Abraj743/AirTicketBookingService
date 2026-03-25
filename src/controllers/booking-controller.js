const {StatusCodes} = require('http-status-codes')
const {BookingService} = require('../services/index')

const bookingService = new BookingService();

const create = async(req,res) =>{
    try {
           const response = await bookingService.createBooking(req.body);
           return res.status(StatusCodes.OK).json({
            message:"Successfully booked the flight",
            data:response,
            err:{},
            success:true
           })
    } catch (error) {
        return res.status(error.statusCode).json({
            message:error.message,
            data:{},
            err:error.explanation,
            success:false
           })
        
    }
}



module.exports = {
   create
}
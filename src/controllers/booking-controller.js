const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../services/index");
const {createChannel,publishMessage} = require('../utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('../config/serverConfig')

const bookingService = new BookingService();

class BookingController {
    constructor(){

    }

 async sendMessageToQueue (req,res) {
     const channel = await createChannel();
     const payload = {
      data:{
        subject:'This is a noti from queue',
        content:'Some queue will subscribe this',
        recepientEmail:'abraj.singh743@gmail.com',
        notificationTime:'2026-03-31T09:49:00'
      },
      service:'CREATE_TICKET'
     }
     publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(payload));
     return res.status(200).json({
        message:'Successfully published the event'
     });

 }

  async create (req, res){
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully booked the flight",
        data: response,
        err: {},
        success: true,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        data: {},
        err: error.explanation,
        success: false,
      });
    }
  };

}

module.exports = BookingController;

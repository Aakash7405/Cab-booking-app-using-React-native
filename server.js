require("dotenv").config();
const http=require('http')
const express = require("express");
const mongo = require("mongoose");
const errorMiddleWare = require("./errorhandling/errorMiddleWare");
const router = require("./SignupFolder/router");
const socketIO=require('socket.io')
const cors=require('cors');

//initializing the application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//cross-origin resource sharing configuration


const server=http.createServer(app)

const io=socketIO(server);


//database connected
const connectdb = async () => {
  try {
    await mongo.connect(process.env.MONGO_URL)
    .then(()=>{
      console.log('connected data base')
    }).catch((error)=>{
      console.log(error);
    })
  } catch (error) {
    console.log("fails to connect");
    process.exit(0);
  }
};

//socket connection
const car={
  Standard:'Wagonr',
  Deluxe:'Swift Dzire',
  Premium:'Innova',
  Motor:"super Splendor",
  Auto:'Auto',
}
function generateOTP()
{
  const number='0123456789';
  let otp='';
  for(let i=0;i<4;i++)
    {
      otp+=number[Math.floor(Math.random()*10)]
    }
    return otp.split('');
}
io.on('connection',(socket)=>{
  console.log(`⚡: ${socket.id} user just connected!`);

  
  
  socket.on('bookRide',(riderDetails)=>{
    console.log(riderDetails);
    const type=riderDetails.carType;
    const OTP=generateOTP();
    // setTimeout(()=>{
      // socket.emit('connectRider',{name:'Satyendra goyal',ratings:4.7,car:car[type],carNo:'UP14 EC 9715',OTP:OTP,description:'Sector 62, Noida, Uttar Pradesh,India',driverLocation:{latitude:28.627981,longitude:77.3648567}});
    // },5000)
    
    socket.broadcast.emit('connectDriver',{riderDetails})
  })

  // socket.emit('connectDriver',{price:214,origin:'ABES ENGINEERING COLLEGE, NH 24, Chipiyana Buzurg, Ghaziabad, Uttar Pradesh,India',destination:'sector 52, Noida, Uttar Pradesh, India',time:'27 min'});
  

  socket.on('rideAccepted',(driverDetails)=>{
    socket.broadcast.emit('connectRider',{...driverDetails,OTP:OTP})
    console.log(driverDetails);
  })
  socket.on('disconnect', () => {
    console.log(`: A user disconnected`);
    
  });``
})


//router routes
app.route("/signup").get((req, res) => {
  res.status(200).send("hello statusc");
});


app.use(errorMiddleWare);
app.use("/home", router);

//server is being executed
connectdb().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT ${process.env.PORT} `);
  });
});

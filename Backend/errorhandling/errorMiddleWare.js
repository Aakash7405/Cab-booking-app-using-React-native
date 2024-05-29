const errorMiddleWare=async( err, req, res,next)=>{
    const status=err.status || 500;
    const message=err.message || 'Backend Error';
    const extraDetails=err.extraDetails || 'Error in Backend';

    return res.status(status).json({message,extraDetails});
}
module.exports=errorMiddleWare;
// const asyncHandler= (fn) => {() => {} } //higher order function

const asyncHandler= (requestHandler) =>{
  return (req,res, next) => {
    Promise.resolve(requestHandler(req,res, next)).catch((err) => next(err))
  }
}

export {asyncHandler};













// const asyncHandler = (fn) => async (req, res, next) => {
//   try{
//     await fn(req, res, next);
//   } catch(error){
//     req.status(error.code || 500).json({
//       sucess:false,
//       message: error.message || 'Internal Server Error',
//     });
//   }
// }
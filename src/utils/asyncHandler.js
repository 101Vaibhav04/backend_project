// const asyncHandler= (fn) => {() => {} } //higher order function


const asyncHandler = (fn) => async (req, res, next) => {
  try{
    await fn(req, res, next);
  } catch(error){
    req.status(error.code || 500).json({
      sucess:false,
      message: error.message || 'Internal Server Error',
    });
  }
}
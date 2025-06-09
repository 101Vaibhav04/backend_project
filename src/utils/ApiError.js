class ApiError extends Error{
  constructor(    statusCode,
    message= "Internal Server Error",
    errors=[],
    stack = "") {

      super(message);
      this.ststusCode = statusCode
      this.errors = errors
      this.data = null //study
      this.message = message
      this.sucess =false



      if(stack){
        this.stack = stack;
      } else{
        Error.captureStackTrace(this, this.constructor)
      }

  }
}
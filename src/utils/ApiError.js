class ApiError extends Error{
  constructor(    statusCode,
    message= "Internal Server Error",
    errors=[],
    statck = "") {

      super(message);
      this.ststusCode = statusCode
      this.errors = errors
      this.data = null //study
      this.message = message
      this.sucess =false



      if(statck){
        this.stack = statck;
      } else{
        Error.captureStackTrace(this, this.constructor)
      }

  }
}
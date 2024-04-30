const asyncHanlder = (requestedFunc)=>{
    return (req,res,next)=>{
         Promise.resolve(requestedFunc(req,res)).
        catch((err)=>next(err))
    }
}

export default asyncHanlder
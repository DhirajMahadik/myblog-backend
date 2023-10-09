
const verifyUser = (req,res,next) =>{
    const headers = req.headers['authorization']
    if(typeof headers === 'undefined') res.status(409).send({error:'Unauthorized'})
    const token = headers.split(" ")
    req.token = token[1]
    next()
    
}

export default verifyUser
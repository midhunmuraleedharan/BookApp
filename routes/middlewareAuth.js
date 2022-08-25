module.exports=function authentication(req, res, next) {    
    const token = req.headers['authorization'];
    console.log(token);
    if (token) {
        if(token.split(' ')[1]=='#testpass'){
        next();
        }else{
        res.status(401).send({
            message: 'Unauthorized'
        });}
    }else{
        res.status(401).send({
            message: 'Unauthorized'
        });
    }

    }
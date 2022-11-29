const db = require("../model");
const {ReasonPhrases, StatusCodes} = require("http-status-codes");
const authConfig = require("../config/auth.config")

exports.signup = (req, res) =>{
    const userObj = {
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile
    }

    let sql = `INSERT INTO user (name, email, mobile) VALUES (?,?,?)`
    let values = [userObj.name, userObj.email, userObj.mobile];

    db.all(sql, values, function(err, result){
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }
        else{
            console.log('User Created', result);
            res.status(StatusCodes.CREATED).send({
                message : "User has been created successfully",
                status : StatusCodes.CREATED,
                response : ReasonPhrases.CREATED,
                data : userObj
            })
        }
    })
}

exports.getAllUser = (req, res) =>{
    let sql = `SELECT * FROM user`;
    let params = [];
    db.all(sql, params, (err, users) => {
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(users){
                res.status(StatusCodes.OK).send({
                    message : "List of all the users",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : users
                });
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}


exports.getUser = (req, res) => {
    let sql = `SELECT * FROM user WHERE id = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err, user) =>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            if(user){
                res.status(StatusCodes.OK).send({
                    message : "Single User",
                    status : StatusCodes.OK,
                    response : ReasonPhrases.OK,
                    data : user
                })
                return;
            }else{
                res.status(StatusCodes.NOT_FOUND).send({
                    status : StatusCodes.NOT_FOUND,
                    response : ReasonPhrases.NOT_FOUND
                })
                return;
            }
        }
    })
}

exports.updateUser = (req, res)=>{

    let userObj = {
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile
    }

    let sql = `UPDATE user set
                name = coalesce(?, name),
                email = coalesce(?, email),
                mobile = coalesce(?, mobile)
                WHERE id = ?`;
    let params = [userObj.name, userObj.email, userObj.mobile, req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.ACCEPTED).send({
                message : "User has been updated successfully",
                status : StatusCodes.ACCEPTED,
                response : ReasonPhrases.ACCEPTED
            })
            return;
        }
    })
}

exports.deleteUser = (req, res) =>{

    let sql = `DELETE FROM user WHERE id = ?`;
    let params = [req.params.id];
    db.get(sql, params, (err)=>{
        if(err){
            res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
            return;
        }else{
            res.status(StatusCodes.OK).send({
                message : "User has been removed",
                status : StatusCodes.OK,
                response : ReasonPhrases.OK
            })
            return;
        }
    })
}

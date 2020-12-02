const User = require("../models/user");


exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if(err || !user){
            return res.status(400).json({
                error: "NO USER WAS FOUND IN DB"
            })
        }
        req.profile = user;
        next();
    });
};

exports.getUser = (req, res) => {
    //TODO : GET BACK HERE FOR PASSWORD
    req.profile.salt = undefined;
    req.profile.password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if(err || !users){
            return res.status(400).json({
                error: "NO USERS WAS FOUND IN DB"
            })
        }
        res.json(users);
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$push : req.body},
        {new : true, useFindAndModify : false},
        (err, user)  => {
            if(err){
                return res.status(400).json({
                    error: "YOU ARE NOT AUTHORIZED TO UPDATE THIS USER"
                })
            }
            user.password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }   
    )
}




 

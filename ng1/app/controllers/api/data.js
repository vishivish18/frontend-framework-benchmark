var router = require('express').Router()
var Customer = require('../../models/customer')
var data


data = {
    create: function(req, res, next) {
        console.log(req.auth.username)
        var data = new Data({
            username: req.auth.username,
            field1: req.body.field1,
            field2: req.body.field2,
            field3: req.body.field3,
            field4: req.body.field4

        })

        data.save(function(err, data) {
            if (err) {
                return res.status(500).send(err);
            }
            // res.send(201)
            res.json(data);

        })
    },
    index: function(req, res, next) {
        console.log("here")
        Customer.find({})
            .limit(20)
            .exec(function(err, cust) {
                res.json(cust)
            });
    }
}




module.exports = data

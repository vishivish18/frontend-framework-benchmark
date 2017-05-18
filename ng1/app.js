/**
 * Module dependencies.
 */
"use-strict"

var express = require('express')
var mongoose = require("mongoose")
var bodyParser = require('body-parser')
var routes = require("./app/routes")
var Customer = require('./app/models/customer')


var app = express();
var router = require('express').Router()
var path = require('path')

app.use(bodyParser.json({ limit: 153791147 }));
app.use(bodyParser.urlencoded({
    extended: true,
    limit: 153791147
}));

app.get('/data/list', function(req, res) {
    Customer.find({})
        .limit(500)
        .exec(function(err, cust) {
            res.json(cust)
        });
})

app.get('/data/show/:id', function(req, res) {
	console.log("in here NOW")
    Customer.find({ _id: req.params.id }, function(err, client) {
        if (err) {
            return next(err)
        }
        res.json(client)
    })
})


var port = process.env.PORT || 1818

var server = app.listen(port, function() {
    console.log('Magic begins at port ', port);
});
console.log(routes.apiBaseUri);

app.use(routes.apiBaseUri, routes.api(app));

app.use(express.static(path.resolve('public/assets/')))
app.use(express.static(path.resolve('public/app/views')))
app.get('*', function(req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

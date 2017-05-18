var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customer_db',function(){
	console.log('mongodb connected');
})

module.exports = mongoose;



const 	config = require('./config'),
		mysql  = require('mysql'),
		conn   = mysql.createConnection(config)

conn.connect( err => {
	return err ? console.log(err.stack) : console.log('Conectado a la base de datos')
}) 


module.exports = conn
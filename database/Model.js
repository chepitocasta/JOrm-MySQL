const 	conn = require('./connection/connection')
		JOrm = require('./orm/JOrm')


class Model extends JOrm{

	constructor(){
		super(conn)
		
	}

}

module.exports = Model 
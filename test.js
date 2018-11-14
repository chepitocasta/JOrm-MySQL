const 	Model = require('./database/Model')
		
const	UserModel = new Model()
		
let 	sentence  = 	UserModel.all('usuario')
							.exec()

		sentence.then( res => console.log( res ))
				.catch( err => console.log( err.stack ))
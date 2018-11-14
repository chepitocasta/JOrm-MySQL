/*
 * @Autor: José Manuel Castañeda Reyes
 * @Creado: 11/11/2018
 * @Actualizado: 11/11/2018
 * @Descripcion: Clase para realizar consultas SQL a traves JavaScript.
 * @Nombre Calse: JOrm
 */

const mysql = require('mysql')

class JOrm {

	constructor(connection){
		this.conn = connection
		this._query = ''
		this._arrValues = []
		this._arrIdentifiers = []
	}

	all(table){

		if (typeof table === 'string' && table) {

			this._query = `SELECT * FROM ${table}`

			return this
		}

		return null

	}

	select(...values){
		
		if (values) {

			if (typeof values[0] === 'object' ) {

			}else if(values[0] === '*') {

				this._query = `SELECT * `

				return this

			}

			this._query = `SELECT ?? `

			this._arrIdentifiers.push(...values)

			this._arrValues.push(this._arrIdentifiers)

			return this
		}

		return null

	}

	from(table){

			if (typeof table === 'string' && table ) {

				this._query += `FROM ${this.conn.escapeId(table)}`

				return this

			}

			return null

	} 

	where(campo, valor, operador = "=" ){

			if (typeof campo === 'string' && campo  && valor) {

				this._query += ` WHERE ${campo} ${operador} ${this.conn.escape(valor)}`

				return this

			}

			return null

	}

	and(campo, valor, operador = "=" ){

		if (typeof campo === 'string' && campo && valor) {

			this._query += ` AND ${campo} ${operador} ${this.conn.escape(valor)}`

			return this

		}

		return null
	}

	or(campo, valor, operador = "="){

			if (typeof campo === 'string' && campo && valor) {

				this._query += ` OR ${campo} ${operador} ${this.conn.escape(valor)}`

				return this

			}

			return null

	}

	isNull(campo){

		if (typeof campo === 'string' && campo) {

			this._query += ` AND ${campo} IS NULL`

			return this

		}

		return null

	}

	isNotNull(campo){

		if (typeof campo === 'string' && campo) {

			this._query += ` AND ${campo} IS NOT NULL`

			return this

		}

		return null

	}

	between(campo, valorI, valorF){

		if ( typeof campo === 'string' && campo  && valorI  && valorF ) {

			this._query += ` AND ${campo} BETWEEN ${this.conn.escape(valorI)} AND ${this.conn.escape(valorF)} `

			return this

		}

		return null

	}

	notBetween(campo, valorI, valorF){

		if ( typeof campo === 'string' && campo  && valorI  && valorF ) {

			this._query += ` AND ${campo} NOT BETWEEN ${this.conn.escape(valorI)} AND ${this.conn.escape(valorF)} `

			return this

		}

		return null

	}

	orderBy(campo, order = "ASC"){

		if (typeof campo === 'string' && campo) {

			if (this._query.indexOf("ORDER BY") === -1) {

				this._query += ` ORDER BY ${campo} ${order}`

				return this
					
			}else{

				this._query += `, ${campo} ${order}`

				return this
			}

		}

		return null		

	}


	in(campo, valor){

		if (typeof campo === 'string' && Array.isArray(valor) && campo && valor ) {

			this._query += ` AND ${campo} IN (  ${this.conn.escape(valor)} ) `

			return this

		}

		return null

	}

	notIn(campo, valor){

		if (typeof campo === 'string' && Array.isArray(valor) && campo && valor ) {

			this._query += ` AND ${campo} NOT IN (  ${this.conn.escape(valor)} ) `

			return this

		}

		return null

	}

/*
 * @Autor: José Manuel Castañeda Reyes
 * @Creado: 11/11/2018
 * @Actualizado: 11/11/2018
 * @Nombre funcion: insert 
 * @Parametros: tabla String, data Objesto
 * @Descripcion: funcion para insertar registros a la base de datos.
 * @Nombre calse: JOrm
 */

	insert(tabla, data){

		if (typeof tabla === 'string' && typeof data === 'object' &&  tabla && data) {

			this._query = ` INSERT INTO ${tabla} SET ? `

			this._arrValues.push(data)

			return this

		}

		//Prueba de pasar this para el retorno de un error SQL y no de javaScript
		return this 

	}
	
/*
 * @Autor: José Manuel Castañeda Reyes
 * @Creado: 11/11/2018
 * @Actualizado: 11/11/2018
 * @Nombre funcion: update 
 * @Parametros: tabla String, data Objesto
 * @Descripcion: funcion para Actualiza registros a la base de datos.
 * @Nombre calse: JOrm
 */

	update(tabla, data){

		if (typeof tabla === 'string' && typeof data === 'object' &&  tabla && data) {

			this._query = ` UPDATE ${tabla} SET ? `

			this._arrValues.push(data)

			return this

		}

		//Prueba de pasar this para el retorno de un error SQL y no de javaScript
		return this 

	}

	exec(){

		const result = new Promise( (resolve,  reject) => {

			let sql = mysql.format(`${this._query}`, this._arrValues)

			console.log(sql)

			this.conn.query( sql, this._arrValues, (err,  rows, fields ) => {

				return  (err) ? reject(err) : resolve(rows)

			})
		})

		return result
	}

}

module.exports = JOrm
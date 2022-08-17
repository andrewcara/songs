const { connect } = require('cookies')

const MongoClient = require('mongodb').MongoClient

class Connection {

    static async open() {
        if (this.db) return this.db
        this.db = await MongoClient.connect(this.url, this.options) //sets the Connection.db attribute to the mongo client response which can then be used for queries in the future
        console.log('connected')
        return this.db
    }

}

Connection.db = null
Connection.url = 'mongodb+srv://acarava3:Tottenh%40m124@cluster0.ojpaa.mongodb.net/?retryWrites=true&w=majority'
Connection.options = {
    useNewUrlParser:    true,
    useUnifiedTopology: true,
}

module.exports = { Connection }
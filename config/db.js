const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
​
/*topology and createIndex is for 
the new mongo engine*/
​
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
​
        console.log('MongoDB connected...')
    } catch (err) {
        console.error(err.message);
        //exit process w/failure
        process.exit(1);
    }
}
​
module.exports = connectDB;

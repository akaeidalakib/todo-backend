require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000
const dbUrl = process.env.DB_URL

const connectDB = async () => {
    try {
        mongoose.connect(dbUrl).then((data) => {
            console.log(`database connected with ${data.connection.host}`)
        })
    } catch (error) {
        console.log("console from server", error.message);
        setTimeout(connectDB, 5000)
    }
}
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
    connectDB();
})
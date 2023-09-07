const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
// doesnt log - why?
db.on('connected', () => {
    console.log(`Conected to ${db.name} at ${db.host}: ${db.port}.`
)});
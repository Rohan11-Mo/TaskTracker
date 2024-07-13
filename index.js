require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb+srv://new-user:user@cluster0.not2ozv.mongodb.net/Employee';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000, // 30 seconds
    serverSelectionTimeoutMS: 30000, // 30 seconds
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with an error code
    });

const server = http.createServer((req, res) => {
    userRoutes(req, res);
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

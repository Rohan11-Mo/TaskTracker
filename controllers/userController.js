const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    } catch (err) {
        console.error('Error fetching users:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

exports.createUser = async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        const { firstName, lastName, email, employeeId } = JSON.parse(body);
        const newUser = new User({ firstName, lastName, email, employeeId });

        try {
            const savedUser = await newUser.save();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(savedUser));
        } catch (err) {
            console.error('Error creating user:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal Server Error' }));
        }
    });
};

exports.deleteUser = async (req, res) => {
    const id = req.url.split('/')[2];

    try {
        await User.findByIdAndDelete(id);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
        console.error('Error deleting user:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal Server Error' }));
    }
};

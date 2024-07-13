const userController = require('../controllers/userController');

const userRoutes = (req, res) => {
    const { method, url } = req;

    switch (true) {
        case url === '/users' && method === 'GET':
            userController.getUsers(req, res);
            break;
        case url === '/users' && method === 'POST':
            userController.createUser(req, res);
            break;
        case url.startsWith('/users/') && method === 'DELETE':
            userController.deleteUser(req, res);
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Route Not Found' }));
            break;
    }
};

module.exports = userRoutes;

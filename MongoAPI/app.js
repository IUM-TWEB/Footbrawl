const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const appearances = require('./routes/appearances_routes');
const games = require('./routes/games_routes');
const club_games = require('./routes/clubgames_routes');
const lineups = require('./routes/game_lineups_routes');
const events = require('./routes/game_events_routes');
const news = require('./routes/news_routes');
const user = require('./routes/user_routes');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Initialize connection with MongoDB
mongoose.connect('mongodb://localhost:27017/footbrawl')
  .then(() => console.log('Connected to MongoDB/footbrawl'))
  .catch(err => console.error(err));

const db = mongoose.connection;
db.once('connection', () => {
    console.log('Connected to MongoDB');
});
db.on('error', (e) => {
    console.error(e);
});

const server = express();

// Body parser middleware for handling JSON and urlencoded data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Swagger configuration (replace with your API information, paths, and definitions)
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Foot Brawl API',
            description: 'API for Foot Brawl application',
            version: '1.0.0',
            groups: [{
              name: 'Appearance Routes',
              description: 'Routes related to appearances',
              paths: ['/app/appearances'] // Paths to appearance routes
            },
              {
                name: 'User Routes',
                description: 'Routes related to user management',
                paths: ['/app/users'] // Paths to user routes
              }]
        },
        servers: ['http://localhost:3001'], // Update with your server URL if needed
    },
    apis: [
        './routes/*.js', // Scan all route files for API definitions (assuming Swagger comments)
    ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger specification (optional)
server.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocs);
});

// Serve Swagger UI (optional)
server.use('/api-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Mount your route handlers here
server.use('/app', appearances);
server.use('/games', games);
server.use('/clubgames', club_games);
server.use('/lineups', lineups);
server.use('/events', events);
server.use('/news', news);
server.use('/user', user);

// Start the server
server.listen(3001, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Server Listening on port 3001');
    }
});

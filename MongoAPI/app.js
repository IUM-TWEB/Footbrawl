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
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (e) => {
  console.error(e);
});

const server = express();

// Body parser middleware for handling JSON and urlencoded data
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Foot Brawl API',
      description: 'API for Foot Brawl application',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
    components: {
      schemas: {
        AppearanceResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the request was successful',
            },
            status: {
              type: 'integer',
              description: 'The status code of the request',
            },
            message: {
              type: 'string',
              description: 'A message describing the result',
            },
            data: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  description: 'The unique identifier of the appearance',
                },
                game_id: {
                  type: 'number',
                  description: 'The ID of the game',
                },
                player_id: {
                  type: 'number',
                  description: 'The ID of the player',
                },
                player_club_id: {
                  type: 'number',
                  description: 'The ID of the player\'s club',
                },
                player_current_club_id: {
                  type: 'number',
                  description: 'The current club ID of the player',
                },
                date: {
                  type: 'string',
                  format: 'date-time',
                  description: 'The date of the appearance',
                },
                player_name: {
                  type: 'string',
                  description: 'The name of the player',
                },
                competition_id: {
                  type: 'string',
                  description: 'The competition ID',
                },
                yellow_cards: {
                  type: 'number',
                  description: 'Number of yellow cards received',
                },
                red_cards: {
                  type: 'number',
                  description: 'Number of red cards received',
                },
                goals: {
                  type: 'number',
                  description: 'Number of goals scored',
                },
                assists: {
                  type: 'number',
                  description: 'Number of assists',
                },
                minutes_played: {
                  type: 'number',
                  description: 'Minutes played in the game',
                },
              }
            }
          }
        },
        ClubGameResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Indicates if the request was successful',
            },
            status: {
              type: 'integer',
              description: 'The HTTP status code',
            },
            message: {
              type: 'string',
              description: 'A message describing the status',
            },
            data: {
              type: 'object',
              properties: {
                ciao: { type: 'string' },
                ciao2: { type: 'integer' },
                game_id: { type: 'integer' },
                club_id: { type: 'integer' },
                own_goals: { type: 'integer' },
                own_position: { type: 'integer' },
                own_manager_name: { type: 'string' },
                opponent_id: { type: 'integer' },
                opponent_goals: { type: 'integer' },
                opponent_position: { type: 'integer' },
                opponent_manager_name: { type: 'string' },
                hosting: { type: 'string' },
                is_win: { type: 'integer' },
              }
            }
          }
        },
        EventResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            status: { type: 'integer' },
            message: { type: 'string' },
            data: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                date: { type: 'string', format: 'date-time' },
                game_id: { type: 'integer' },
                minute: { type: 'integer' },
                type: { type: 'string' },
                club_id: { type: 'integer' },
                player_id: { type: 'integer' },
                description: { type: 'string' },
                player_in_id: { type: 'integer' },
                player_assist_id: { type: 'integer' },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'string',
              description: 'The competition ID',
            },
            status: {
              type: 'number',
              description: 'Number of yellow cards received',
            },
            message: {
              type: 'number',
              description: 'Number of red cards received',
            },
            data: {
              type: 'object',
              description: 'Number of red cards received',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Scan all route files for API definitions (assuming Swagger comments)
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

const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const playerRoutes = require('./routes/player');
const clubRoutes = require('./routes/club');

const app = express();

const corsOption = {
  origin: 'http://localhost:5173',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

const swaggerOptions = {
  definition: {
    openapi: '3.0.0', // Assicurati di usare OpenAPI 3.0
    info: {
      title: 'Foot Brawl API',
      description: 'API for Foot Brawl application',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Local server'
      }
    ]
  },
  apis: ['../routes/index.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI (optional)
app.use('/api-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/player', playerRoutes);
app.use('/club', clubRoutes);

module.exports = app;

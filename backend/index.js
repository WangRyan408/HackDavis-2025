import express from 'express';
//import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { auth } from 'express-oauth2-jwt-bearer';
dotenv.config({path: './.env'});


const app = express();

// More permissive CORS configuration for development
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', '*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


// Body parser setup - needs to be before route handlers
app.use(express.json());  
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files
app.use('/public', express.static(`${process.cwd()}/public`));

const auth0IssuerBaseUrl= process.env.ISSUER_BASE_URL;
const auth0Audience = process.env.AUDIENCE;

const jwtCheck = auth({
  audience: auth0Audience,
  issuerBaseURL: auth0IssuerBaseUrl,
  tokenSigningAlg: 'RS256'
});

// Apply JWT check to all routes except uploadthing
app.use((req, res, next) => {
  if (req.path.startsWith('/api/uploadthing')) {
    return next();
  }
  jwtCheck(req, res, next);
});


//Routes
import uploadAPI from './routes/uploadAPI.js';
app.use('/', uploadAPI);


const port = process.env.PORT || 3000;

// Apply the uploadthing handler middleware to the /api/uploadthing route


// General error handler
app.use(function(err, req, res, next) {
  console.error('Error:', err.stack);
  res.status(500).json({
    error: 'Something broke!',
    message: err.message
  });
});

//connectDB();

app.listen(port, function() {
    console.log(`Listening on port ${port}`);   
  });

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handler for everything else
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // send the error response
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});     
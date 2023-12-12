import express from 'express'
import { engine } from 'express-handlebars';
import morgan from 'morgan'
import dotenv from 'dotenv'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import methodOverride from 'method-override';
import flash from 'connect-flash';
import Router from './routes/index.js';
import connectDB from './db/db.js'
import verify from './config/passport.js'
import helpers from './helper/helper.js';
import { sureGuest, isPresent, idTest } from './middleware/check.js';

// init application
const app = express();

// config path in ES6
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// config env
dotenv.config({ path: path.join(__dirname, `./config/config.env`) });

// set folder static
app.use(express.static(path.join(__dirname, 'public')));

// overide method
app.use(methodOverride('_method'));

// config body request
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// // verify
verify(passport);

// config session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: 'strict' },
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// set ext engine, custom 
app.engine('hbs', engine({
  extname: 'hbs',
  helpers
}));

// check authencation
app.use(sureGuest);
app.use(isPresent);

//loger
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// connect DB
connectDB();

//Router
Router(app);

// start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`app listening on mode ${process.env.NODE_ENV} in http://127.0.0.1:${port}`));
const express = require('express'),
    path = require('path'),
    morgan = require('morgan'),
    mysql = require('mysql'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    myConnection = require('express-myconnection'),
    { engine } = require('express-handlebars');


const app = express();

// import routes
const appRoutes = require('./routes/app');
const loginRoutes = require('./routes/login');
const loginRoutes_Mobile = require('./routes/mobile/login');
const loginRoutes_API = require('./routes/loginAPI');
const foodsRoutes = require('./routes/foods');
const foodsRoutes_Mobile = require('./routes/mobile/foodsMobile');
const foodsRoutes_API = require('./routes/foodsAPI');
// // routes for react native
// const mobileRoutes = require('./routes/mobile');
// const apiRoutes = require('./routes/api');

// cài đặt path
// app.set('port', 3001);
// app.set('view engine', 'ejs');

app.engine('.html', engine({ extname: '.html', defaultLayout: "main" }));
app.set('view engine', '.html');
app.set('views', path.join(__dirname, 'views'));

// để post data json
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
// cors
app.use(cors());
app.use(morgan('dev'));

// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ limit: '100mb' }));

app.use(express.limit(100000000))

// kết nối database
app.use(myConnection(mysql, {
    host: '37.59.55.185',
    user: 'JnWiETIzRg',
    password: '47tKHpVqR3',
    port: 3306,
    database: 'JnWiETIzRg'
}, 'request'));

// express
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', appRoutes);
app.use('/', loginRoutes);
app.use('/', loginRoutes_Mobile);
app.use('/', loginRoutes_API);
app.use('/', foodsRoutes);
app.use('/', foodsRoutes_Mobile);
app.use('/', foodsRoutes_API);
// app.use('/', mobileRoutes);
// app.use('/', apiRoutes);

// static file
app.use(express.static(path.join(__dirname, 'public')));

// khởi động server
// const ipAdress = '192.168.43.190';
const ipAdress = '192.168.1.13';
const cong = process.env.PORT || 3001;

app.listen(cong, () => {
    // console.log("Khởi động server tại http://" + ipAdress + ":" + app.get('port'));
    // console.log("Khởi động server tại http://" + 'http://127.0.0.1' +  ":" + app.get('port') );    
    // console.log("Khởi động server tại http://localhost" + ":" + app.get('port') );    
    console.log("Khởi động server tại http://localhost" + ":" + cong);
});
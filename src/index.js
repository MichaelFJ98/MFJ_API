let teamRoute = require('./routes/team');
let playerRoute = require('./routes/player');

let express = require('express')
const mongoose = require('mongoose');
let app = express();
const PORT = 3000;

//.ENV
require("dotenv").config();

app.use(express.static('public'));
app.use(express.json());

//ROUTES
app.use('/team',teamRoute);
app.use('/player',playerRoute);

//KEY
const MONG0_KEY = 'mongodb+srv://MFJ_API:qc6PxYWe02qy3FSS@mfjapi.8hnsj5a.mongodb.net/';

mongoose.connect( MONG0_KEY ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`));
}).catch((err)=> console.log (`${err} did not connect`));
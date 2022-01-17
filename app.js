import express, { json, urlencoded } from 'express';
const app = express();
import { config } from 'dotenv';
config({path:'./.env'});
import './utils/db_connection.js';
const PORT = process.env.PORT;
import cors from 'cors';
import { corsFunction } from './utils/cors.js';
import production from './utils/production.js';


app.use(cors());
app.use(corsFunction);
production(app);
app.use(json());
app.use(urlencoded({extended: true}));

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
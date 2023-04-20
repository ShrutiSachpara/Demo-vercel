const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser"); 
const logger = require("./app/logger/logger");

const db = require("./app/model/sequelize");
db.sequelize.sync();
const cors = require("cors");
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: "50mb",
    })
    );

app.use('/',express.static('app/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("./app/route/route"));
app.use(require("./app/helper/response"));
app.use(require("./app/helper/error").handleJoiErrors);
app.use(require("./app/helper/error").handleErrors);

app.listen(port, () => {
    logger.info(`Server running on.. :${port}`);
});
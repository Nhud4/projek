const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./routes/product");
const migration = require("./migration/migration");
const ketentuan = require("./migration/ketentuan");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server berjalan di port", port);
});

migration.migration();
migration.perhitungan();
ketentuan.KA();
ketentuan.KB();
ketentuan.KC();

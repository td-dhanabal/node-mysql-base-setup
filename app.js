const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require("./config/db");
const app = express();
const cors = require("cors");
const port = process.env.DOMAIN_URL || 3002;

app.use(cors());

// const customerRoutes = require("./routes/customer");
// const invoiceRoutes = require("./routes/invoice");
const userRoutes = require("./routes/user");
const vendorRoutes = require("./routes/vendor");

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Expose-Headers", "Auth-Token");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


// app.use("/customers", customerRoutes);
// app.use("/invoices", invoiceRoutes);
app.use("/", userRoutes);
// app.use("/organizations", organizationRoutes);
app.use("/vendors", vendorRoutes);

app.listen(port, () => console.log(`Listen on port ${port}`))
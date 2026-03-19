const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const {engine} = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 3000;

app.engine("handlebars", engine({
    helpers: {
        cancel: () => {
            return '<a href="/"><button>Отказаться</button></a>'
        }
    }
}));

app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const FILE = "./phonebook.json";

function readData() {
    return JSON.parse(fs.readFileSync(FILE));
}

function writeData (data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/", (_, res) => {
    const data = readData();
    res.render("home", {rows: data});
});

app.get("/Add", (_, res) => {
    const data = readData();
    res.render("add", {rows: data});
});

app.post("/Add", (req, res) => {
    const data = readData();

    const newRow = {
        id: Date.now(),
        name: req.body.name,
        phone: req.body.phone
    };

    data.push(newRow);
    writeData(data);

    res.redirect("/");
});

app.get("/Update", (req, res) => {
    const data = readData();
    const id = req.query.id;

    const row = data.find(r => r.id == id);

    res.render("update", {
        rows: data, 
        row: row
    });
});

app.post("/Update", (req, res) => {
    let data = readData();
    const id = req.body.id;

    let row = data.find(r => r.id == id);

    row.name = req.body.name;
    row.phone = req.body.phone;

    writeData(data);

    res.redirect("/");
});

app.post("/Delete", (req, res) => {
    let data = readData();
    const id = req.body.id;

    data = data.filter(r => r.id != id);

    writeData(data);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log("http://localhost:3000");
});
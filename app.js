import express from 'express';
import path from "path";
import { fileURLToPath } from 'url';
import { setupDatabase, getDbConnection, popDatabase } from './database.js';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs')

setupDatabase()
.then((msg) => {
    console.log(msg);
})
.catch((mishap) => {
    console.error(mishap);
})
.finally(() => {
    console.log("Finished setup.");
})


popDatabase()
.then((msg) => {
    console.log(msg);
})
.catch((mishap) => {
    console.error(mishap);
})
.finally(() => {
    console.log("Finished population of db");
})


global.param1 = null;


app.get('/', (req, res) => {
    res.render('pages/index', {title: "Home"});
});

app.get('/products', (req, res) => {
    getDbConnection()
        .then((db) => {
            return db.all('SELECT * FROM supplies');
        })
        .then((products) => {
            res.render("pages/products", {
                data: products,
                title: "Products",
            });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: "About Us" });
});

app.get('/contact', (req, res) => {
    res.render('pages/contact', { title: "Contact Us" });
});


app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});
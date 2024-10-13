import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

function createTable(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS supplies (
            id INTEGER UNIQUE,
            imgFolderPath VARCHAR(1000),
            product_name TEXT,
            category TEXT,
            price VARCHAR,
            quantity_stock INTEGER,
            supplier TEXT,
            tag_line TEXT
        )
    `);
};

function insertInfo(db) {
    return db.run(`
        INSERT INTO supplies (id, imgFolderPath, product_name, category, price, quantity_stock, supplier, tag_line)
        VALUES
            (020,
            '/images/organizer.png',
            'Embroidery Floss Organizer', 
            'Accessories', 
            '8.00', 
            55,
            'CraftTools',
            'Keep your embroidery threads tangle-free and beautifully organized with our stylish and functional embroidery floss organizer!'),

            (003, 
            '/images/needles.png',
            'Embroidery Needles 10pc', 
            'Needles', 
            '5.00', 
            100,
            'NeedleWorks',
            'Achieve precision in every stitch with our high-quality embroidery needles, designed for smooth threading and effortless work on all fabric types.'),

            (015, 
            '/images/plastichoop.png',
            'Plastic Embroidery Hoop 8in', 
            'Embroidery Hoops', 
            '9.00', 
            50, 
            'HoopMakers',
            'Elevate your stitching experience with our durable plastic embroidery hoops, perfect for keeping your fabric taut and your designs flawless!'),

            (016,
            '/images/transferpen.png',
            'Embroidery Transfer Pen',
            'Tools',
            '3.00',
            75,
            'CraftTools',
            'Effortlessly transfer your designs with our precision embroidery transfer pen, featuring a smooth ink flow and easy wash-out for perfect results every time.'),

            (018,
            '/images/embroiderykit.png',
            'Embroidery Pattern Kit',
            'Kits',
            '25.00',
            40,
            'PatternPress',
            'Unlock your creativity with our all-in-one embroidery transfer kit, complete with everything you need to easily transfer designs onto fabric for stunning results!'),

            (005,
            '/images/woodenhoop.png',
            'Wooden Embroidery Hoop 6in',
            'Embroidery Hoops',
            '7.00',
            80,
            'HoopMakers',
            'Add a touch of rustic charm to your crafting with our sturdy wooden embroidery hoop, perfect for framing your stitches with style and elegance.'),

            (007,
            '/images/scissors.png',
            'Embroidery Scissors',
            'Tools',
            '10.00',
            50,
            'CraftTools',
            'Craft with precision using our finely crafted embroidery scissors, designed for effortless cutting and intricate detail in every project.'),

            (008,
            '/images/stabilizer.png',
            'Fabric Stabilizer',
            'Accessories',
            '12.00',
            70,
            'StabilizeIt',
            'Enhance your embroidery projects with our versatile fabric stabilizer, providing the perfect support for crisp designs and preventing puckering.'),

            (009,
            '/images/book.png',
            'Embroidery Pattern Book',
            'Books',
            '15.00',
            30,
            'PatternPress',
            'Inspire your creativity with our comprehensive embroidery pattern book, featuring a variety of designs and step-by-step instructions for all skill levels!'),

            (010,
            '/images/floss.png',
            'Embroidery Floss Pack',
            'Embroidery Thread',
            '20.00',
            40,
            'ThreadCo',
            'Unleash your creativity with our vibrant embroidery floss variety pack, featuring a stunning selection of colors to bring your projects to life!'),

            (022,
            '/images/bobbins.png',
            'Embroidery Thread Bobbins',
            'Accessories',
            '4.00',
            85,
            'ThreadCo',
            'Keep your embroidery threads neat and organized with our convenient pack of embroidery floss bobbins, designed for easy storage and quick access.'),

            (011,
            '/images/thimbles.png',
            'Rubber Sewing Thimbles',
            'Accessories',
            '6.00',
            65,
            'CraftTools',
            'Protect your fingers and enhance your stitching comfort with our pack of flexible rubber thimbles, perfect for precision and ease in every project.')
    `);
};

export const getDbConnection = () => {
    return open({
        filename: './public/database/products.db',
        driver: sqlite3.Database
    });
};

export const setupDatabase = () => {
    return new Promise((resolve, reject) => {
        getDbConnection()
            .then(db => {
                console.log("Creating Database Table");
                return createTable(db);
            })
            .then(() => {
                resolve("Database setup complete.");
            })
            .catch(error => {
                console.error("Error setting up database:", error);
                reject(error);
            });
    });
};

export const popDatabase = () => {
    return new Promise((resolve, reject) => {
        getDbConnection()
            .then(db => {
                console.log("Populating DB");
                return insertInfo(db);
            })
            .then(() => {
                console.log("Info Population complete");
                resolve("Info population complete.");
            })
            .catch(error => {
                console.error("Error populating database:", error);
                reject(error);
            });
    });
};
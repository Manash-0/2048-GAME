const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const port = 8000;

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Running on http://localhost:${port}`));

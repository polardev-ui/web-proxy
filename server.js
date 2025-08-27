const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/proxy', (req, res) => {
    const url = req.query.url;
    if (url) {
        res.send(`<iframe src="${url}" style="width: 100%; height: 800px; border: none;"></iframe>`);
    } else {
        res.send('<p>No URL provided.</p>');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
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

app.use('/proxy', createProxyMiddleware({
    target: 'https://soundcloud.com', // Change this to the target URL you want to proxy
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('Host', 'soundcloud.com'); // Set the Host header to the target domain
    },
    onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

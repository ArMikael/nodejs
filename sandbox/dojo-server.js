const http = require('http');

const html = `
    <!doctype>
    <html>
        <head>
            <meta charset="utf-8">
            <title>Dojo NodeJS Server</title>
            <link rel="stylesheet" href="/app.css">
            <script src="/app.js"></script>
        </head>
        <body>
            <h1>Dojo NodeJS Server</h1>
        </body>
    </html>
`;

const css = `
    body {
        margin: 0;
        padding: 0;
        background-color: Ivory;
    }
    
    h1  {
        padding: 20px;
        background-color: Maroon;
        color: white;
    }
`;

const js = `
    console.log('Dojo Server is up and running!');
`;

http.createServer(function (req, res) {
    switch (req.url) {
        case '/':
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(html);

        case '/app.css':
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(css);

        case '/app.js':
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.end(js);

        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Page not found.');
    }
}).listen(3000, ()=> console.log('Dojo is up and running!'));
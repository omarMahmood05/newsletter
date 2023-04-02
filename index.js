const http = require("http");
const PORT = 3000;

// const app = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World!');
// });
const app = express();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

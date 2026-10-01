const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC = path.join(__dirname, 'public');
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
};

// Read the real Jenkinsfile and pull out its stages and shell commands.
function readPipeline() {
  const text = fs.readFileSync(path.join(__dirname, 'Jenkinsfile'), 'utf8');
  const stages = [];
  const re = /stage\('([^']+)'\)\s*{([\s\S]*?)\n        }/g;
  let m;
  while ((m = re.exec(text))) {
    const cmd = /(?:sh|checkout)\s+'?([^'\n]+)'?/.exec(m[2]);
    stages.push({ name: m[1], command: cmd ? cmd[1].trim() : '' });
  }
  return { stages, source: text };
}

const server = http.createServer((req, res) => {
  if (req.url === '/api/pipeline') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(readPipeline()));
  }
  const file = req.url === '/' ? 'index.html' : path.basename(req.url);
  const full = path.join(PUBLIC, file);
  fs.readFile(full, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(full)] || 'text/plain' });
    res.end(data);
  });
});

server.listen(PORT, () => console.log(`deepanath running at http://localhost:${PORT}`));

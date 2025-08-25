const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

let items = [];
let idCounter = 1;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const pathname = parsedUrl.pathname;

  // Serve index.html at root
  if (pathname === "/" && method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.createReadStream(path.join(__dirname, "index.html")).pipe(res);
    return;
  }

  // API routes
  res.setHeader("Content-Type", "application/json");

  if (pathname === "/items" && method === "GET") {
    res.writeHead(200);
    res.end(JSON.stringify(items));

  } else if (pathname === "/items" && method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { name } = JSON.parse(body);
        if (!name) {
          res.writeHead(400);
          return res.end(JSON.stringify({ error: "Item name is required" }));
        }
        const newItem = { id: idCounter++, name };
        items.push(newItem);
        res.writeHead(201);
        res.end(JSON.stringify(newItem));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

  } else if (pathname.startsWith("/items/") && method === "PUT") {
    const id = parseInt(pathname.split("/")[2]);
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { name } = JSON.parse(body);
        const item = items.find(i => i.id === id);
        if (!item) {
          res.writeHead(404);
          return res.end(JSON.stringify({ error: "Item not found" }));
        }
        item.name = name || item.name;
        res.writeHead(200);
        res.end(JSON.stringify(item));
      } catch {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

  } else if (pathname.startsWith("/items/") && method === "DELETE") {
    const id = parseInt(pathname.split("/")[2]);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) {
      res.writeHead(404);
      return res.end(JSON.stringify({ error: "Item not found" }));
    }
    const deletedItem = items.splice(index, 1)[0];
    res.writeHead(200);
    res.end(JSON.stringify(deletedItem));

  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

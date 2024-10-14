const http = require("http");
const fs = require("fs");
const path = require("path");

// Create a server
const server = http.createServer((req, res) => {
  // Set the default file to serve
  let filePath = "./index.html";

  // Determine the file type based on the URL
  if (req.url !== "/") {
    filePath = `.${req.url}`;
  }

  // Get the file extension
  const extname = String(path.extname(filePath)).toLowerCase();

  // Map extensions to MIME types
  const mimeTypes = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".wav": "audio/wav",
    ".mp4": "video/mp4",
    ".woff": "application/font-woff",
    ".ttf": "application/font-ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "application/font-sfnt",
    ".txt": "text/plain",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
  };

  // Get the MIME type for the requested file
  const contentType = mimeTypes[extname] || "application/octet-stream";

  // Read the requested file and respond
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        // File not found
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404 Not Found</h1>", "utf-8");
      } else {
        // Internal server error
        res.writeHead(500);
        res.end("Sorry, there was an error: " + error.code + " ..\n");
      }
    } else {
      // Successfully serve the file
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

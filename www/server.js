#!/usr/bin/env node
import http from 'http';
import { createHash } from "crypto";

const server = http.createServer(function (request, response) {
    let body = '';
    request.on('data', chunk => {
        body += chunk;
    });

    request.on('end', () => {
        response.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });

        const r = {
            "agent": "NGINX Unit 1.30.0",
            "message": "Unit reporting!"
        };

        r["headers"] = request.headers;
        r["body"] = body;
        r["sha256"] = createHash("sha256").update(r["body"]).digest("hex");

        response.end(JSON.stringify(r, null, "    "));
    });
});

server.listen();
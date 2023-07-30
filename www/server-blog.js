#!/usr/bin/env node

import http from "http";
import { requestHandlerHTTP } from "#request-handler-blog";

const server = http.createServer(requestHandlerHTTP);

server.listen();

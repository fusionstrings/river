#!/usr/bin/env node

import http from "http";
import { requestHandlerHTTP } from "#request-handler";

const server = http.createServer(requestHandlerHTTP);

server.listen();

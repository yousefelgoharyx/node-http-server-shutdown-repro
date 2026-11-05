# Node HTTP server shutdown repro

`@effect/platform-node@4.1.2` does not exit on Ctrl+C while a WebSocket client stays connected. `server.close()` waits for every connection, and Node removes a socket from that list once the request is upgraded.

## Steps

1. `npm install`
2. `npm start`
3. In another terminal, `node client.mjs`
4. Ctrl+C the server. It stays up until the client process is stopped.
5. The same server exits on Ctrl+C once it is run against the patched `NodeHttpServer.ts` in `/Users/yousef/Desktop/effect`.

import net from "node:net"

const keys = ["dGhlIHNhbXBsZSBub25jZQ==", "AQIDBAUGBwgJCgsMDQ4PEC=="]

for (const key of keys) {
  const socket = net.connect(8090, "127.0.0.1", () => {
    socket.write(
      "GET /ws HTTP/1.1\r\n" +
        "Host: 127.0.0.1\r\n" +
        "Upgrade: websocket\r\n" +
        "Connection: Upgrade\r\n" +
        `Sec-WebSocket-Key: ${key}\r\n` +
        "Sec-WebSocket-Version: 13\r\n\r\n",
    )
  })
  socket.once("data", () => {
    socket.pause()
    console.log(`connected ${key}`)
  })
  socket.on("error", (error) => {
    console.error(error)
    process.exitCode = 1
  })
}

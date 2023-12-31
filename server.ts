type WebSocketData = {
    createdAt: number,
    name: string,
    room: string,
};

let server = Bun.serve<WebSocketData>({
    port: 3000,
    fetch(req, server) {
        const url = new URL(req.url)
        if (server.upgrade(req, {
            data: {
                createdAt: Date.now(),
                room: url.searchParams.get('room'),
                name: req.headers.get("sec-websocket-protocol")
            }
        })) {
            return;
        }
        return new Response('Server running!')
    },
    websocket: {
        open(ws) {
            const msg = `${ws.data.name} has entered the chat`;
            const roomName = `${ws.data.room}`
            ws.subscribe(roomName);
            ws.publish(roomName, msg);
        },
        message(ws, message) {
            const roomName = `${ws.data.room}`
            ws.publish(roomName, `${ws.data.name}: ${message}`);
        },
        close(ws, code, reason) {
            ws.publish(`${ws.data.room}`, `${ws.data.name} has left the chat`);
            ws.close()
        },
    }
})
console.log(`Server running on ${server.port}!`)
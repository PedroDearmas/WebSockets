import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:19006", // Substitua pelo endereço do seu frontend
        methods: ["GET", "POST"],
    },
});

app.use(cors());

interface User {
    id: string;
    name: string;
}

const rooms: { [key: string]: User[] } = {};

io.on('connection', (socket) => {
    console.log(`Usuário conectado: ${socket.id}`);

    socket.on('entraSala', ({ room, name }) => {
        socket.join(room);
        if (!rooms[room]) rooms[room] = [];
        rooms[room].push({ id: socket.id, name });
        console.log(`${name} entrou na sala: ${room}`);
        io.to(room).emit('message', { remetente: "Sistema", text: `${name} entrou na sala.` });
    });

    socket.on('enviaMsg', ({ room, message, remetente }) => {
        io.to(room).emit('message', { remetente, text: message });
    });

    socket.on('sairSala', ({ room, name }) => {
        socket.leave(room);
        if (rooms[room]) {
            rooms[room] = rooms[room].filter((user) => user.id !== socket.id);
        }
        console.log(`${name} saiu da sala: ${room}`);
        io.to(room).emit('message', { remetente: "Sistema", text: `${name} saiu da sala.` });
    });

    socket.on('disconnect', () => {
        let userRoom = "";
        let userName = "";

        // Encontrar o usuário que desconectou e sua sala
        for (const room in rooms) {
            const user = rooms[room].find((user) => user.id === socket.id);
            if (user) {
                userRoom = room;
                userName = user.name;
                rooms[room] = rooms[room].filter((user) => user.id !== socket.id);
                break;
            }
        }

        if (userRoom && userName) {
            console.log(`${userName} saiu da sala: ${userRoom}`);
            io.to(userRoom).emit('message', { remetente: "Sistema", text: `${userName} saiu da sala.` });
        }
    });
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});

export async function RegisterSocket(io) {
    io.on('connection', socket => {
        socket.on(`home`, data => {
            if (data.action === 'join') {
                socket.join(`home`);
            } else {
                socket.leave(`home`);
            }
        });

        socket.on(`spread`, data => {
            if (data.action === 'join') {
                socket.join(`spread-${data.id}`);
            } else {
                socket.leave(`spread-${data.id}`);
            }
        });

        socket.on(`symbol`, data => {
            if (data.action === 'join') {
                socket.join(`symbol-${data.id}`);
            } else {
                socket.leave(`symbol-${data.id}`);
            }
        });
    });
}

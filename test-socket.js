import { io } from ('socket.io-client');

console.log('🔌 Conectando ao WebSocket...');

const socket = io('http://localhost:3334', {
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('✅ Conectado! Socket ID:', socket.id);
  console.log('👥 Total de clientes conectados: 1');
  
  // Desconectar após 5 segundos
  setTimeout(() => {
    console.log('❌ Desconectando...');
    socket.disconnect();
  }, 5000);
});

socket.on('disconnect', (reason) => {
  console.log('❌ Desconectado:', reason);
  process.exit(0);
});

socket.on('connect_error', (error) => {
  console.log('❌ Erro de conexão:', error.message);
  process.exit(1);
});

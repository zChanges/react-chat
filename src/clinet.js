import io from 'socket.io-client'
import config from './config';

const Chat = {
    init(userName) {
        //连接websocket后端服务器
        this.socket = io.connect(config.socket,{'force new connection': true})
            this.socket.on('open', function() {
            console.log('已连接')
        });
        console.log(userName)
        this.socket.emit('addUser', 'aaa')
        this.socket.emit('addUser', 'bbb')
    },

    sendMsg(obj){
        this.socket.emit('sendMsg', obj);
    }
}

export default Chat;
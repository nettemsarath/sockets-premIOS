const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors')
const helmet = require('helmet')
const port = process.env.PORT || 5000

app.use(cors())
app.use(helmet())


app.get('/', function(req, res){
    res.send('HIIII prem..')
    
});

const io = require('socket.io')(http);
io.set('origins', '*:*');

const nsp = io.of('/random');
nsp.on('connection',(socket)=>{
    console.log('user connected..')
    socket.emit('status',{ message:"User connected premsai" })
    socket.on('capture',()=>{
        setInterval(()=>{
            let random_Number= getRandomInt(10) 
            socket.emit('capture',random_Number)
        },1000)
    })
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }
})

http.listen(port, function(){
    console.log('listening on *:5000');
});
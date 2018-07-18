const Logger = require('./logger');

logger = new Logger();

logger.on('messageLogged', (arg)=> {
    console.log('Listener called', arg);
});

logger.log('message');
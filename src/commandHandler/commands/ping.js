module.exports = {
    name: 'ping',
    needsArgs: false,
    execute(message, args) {
        message.channel.send('pong');
    }
}
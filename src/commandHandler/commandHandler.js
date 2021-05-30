module.exports = {
    handleCommand(client, command, message, args) {
        if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            message.reply('there was an error trying to execute that command!');
        }
    }
}
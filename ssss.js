const { Client, LocalAuth } = require('whatsapp-web.js'); 
const qrcode = require('qrcode-terminal');                 

const client = new Client({                                
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {                                   
    qrcode.generate(qr, { small: true });                   
}); 

client.on('ready', () => {                                  
    console.log('Client is ready!');                        
    const number = '9779843617676';                        
    const chatId = `${number}@c.us`;

    client.sendMessage(chatId, 'Hello from the bot!');      

    // Example usage of broadcastMessage
    const broadcastNumbers = ['9779843617676', '9779800000000']; 
    broadcastMessage(broadcastNumbers, 'Hello, this is a broadcast message from the bot!');
});

//Broadcasting Messages 
function broadcastMessage(numbers, messageText) {
    numbers.forEach(number => {
        const chatId = `${number}@c.us`;
        client.sendMessage(chatId, messageText);
    });
}

function handleIndividualMessages(message, lowerCaseMessage) {
    const quickReplies = {
        'hello': 'Hi there! How can I help you today?',
        'hi': 'Hello! What can I do for you?',
        'how are you': 'I am just a bot, but I am here to help you!',
        'thank you': 'You’re welcome! Happy to help.',
        'goodbye': 'Goodbye! Have a great day!'
    };

    // Basic greetings
    if (quickReplies[lowerCaseMessage]) {
        message.reply(quickReplies[lowerCaseMessage]);
    }

    // Respond with the current date and time
    else if (lowerCaseMessage.includes('what time is it') || lowerCaseMessage.includes('current time') || lowerCaseMessage.includes('current date')) {
        const currentDateTime = new Date().toLocaleString(); 
        message.reply(`The current date and time is: ${currentDateTime}`);
    }

    // Echo the received message
    else if (lowerCaseMessage.includes('echo')) {           
        const response = message.body.replace(/echo/i, '').trim(); 
        message.reply(response || 'Please provide a message to echo.'); 
    }

    // Provide information based on commands
    else if (lowerCaseMessage.startsWith('!info')) {
        const infoCommand = lowerCaseMessage.split(' ')[1]; 

        if (infoCommand === 'help') {
            message.reply('Available commands:\n!info help - Show this help message\n!info bot - Information about the bot');
        } else if (infoCommand === 'bot') {
            message.reply('This bot is built using whatsapp-web.js and can respond to various commands.');
        } else {
            message.reply('Unknown command. Type !info help for a list of available commands.');
        }
    }

    // Default response for unrecognized messages
    else {
        message.reply('I did not understand that. Can you please rephrase?');
    }
}

//Business Automation
const businessHours = {
    start: 9,
    end: 17
};

client.on('message', message => {
    const currentHour = new Date().getHours();

    if (currentHour < businessHours.start || currentHour >= businessHours.end) {
        message.reply('Our business hours are from 9 AM to 5 PM. Please leave a message, and we will get back to you during our business hours.');
    } else {
        const lowerCaseMessage = message.body.toLowerCase(); 
        handleIndividualMessages(message, lowerCaseMessage);
    }
});

client.initialize();         
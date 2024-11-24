const { Client, LocalAuth } = require('whatsapp-web.js'); //whatsapp-web.js: This library is used to interact with WhatsApp Web programmatically.
const qrcode = require('qrcode-terminal');                 //qrcode-terminal: This library helps to generate and display QR codes in the terminal.

const client = new Client({                                //LocalAuth: This strategy saves your session locally so you don't have to log in every time.
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {                                   //'qr' Event: This event is triggered when a QR code is generated(via initialization). The bot uses this QR code for authentication.
    qrcode.generate(qr, { small: true });                   //qrcode.generate: This function displays the QR code in the terminal.
}); 

client.on('ready', () => {                                  //.on method is used to listen for various events such as messages, authentication, etc.
    console.log('Client is ready!');                        //The .on method in your code is from the whatsapp-web.js library, not standard JavaScript.
    const number = '9779843617676';                         // Replace with your phone number (Phone A)
    const chatId = `${number}@c.us`;

    client.sendMessage(chatId, 'Hello from the bot!');      //In summary, this code waits for the WhatsApp client to be ready and then sends a message to a specific phone number on WhatsApp.

    // Example usage of broadcastMessage
    const broadcastNumbers = ['9779843617676', '9779800000000']; // Add more numbers as needed
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
        const currentDateTime = new Date().toLocaleString(); //new Date().toLocaleString(): standard JavaScript method used to get the current date and time in a human-readable format.
        message.reply(`The current date and time is: ${currentDateTime}`);
    }

    // Echo the received message
    else if (lowerCaseMessage.includes('echo')) {           //if the text was "Echo this", it would change to "this".
        const response = message.body.replace(/echo/i, '').trim(); // If you had " hello ", .trim() would turn it into "hello" by removing the extra spaces at the start and end.
        message.reply(response || 'Please provide a message to echo.'); //It removes "echo" from the text and cleans up any extra spaces around it.
    }

    // Provide information based on commands
    else if (lowerCaseMessage.startsWith('!info')) {
        const infoCommand = lowerCaseMessage.split(' ')[1]; //lowerCaseMessage.split(' ') splits the message into an array of words. For example, if lowerCaseMessage is !info details, it becomes ['!info', 'details'].

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
        const lowerCaseMessage = message.body.toLowerCase(); //toLowerCase(): A standard JavaScript string method used to convert text to lowercase for case-insensitive comparisons.
        handleIndividualMessages(message, lowerCaseMessage);
    }
});

client.initialize();                                        //Initializes the client to start the bot.

//These elements are based on the whatsapp-web.js documentation for client interaction, message handling, and event management, as well as standard JavaScript methods for date handling and string manipulation.


// //mero primary number yo code ma halyo vaney that'll be the client
// //qr scan garne phone number chai bot apparently
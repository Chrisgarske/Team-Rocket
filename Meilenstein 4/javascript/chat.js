const socket = io();

socket.on('connect', () => {

    function joinServer() {
        let userName = prompt('Username');
        socket.emit('join', userName);
    }

    socket.on('name_clash', (name) => {
        alert(`Der Benutzername ${name} ist bereits in Benutzung. Bitte wähle einen anderen.`);
        joinServer();
    });

    joinServer();

    socket.on('joined', ([history, name]) => {


        let messages = $('#messages');

        function appendMessage(msg) {
            messages.append($('<div class="message">').append(msg));
        }

        function appendTextMessage(name, text) {
            let el = $('<div class="text">');
            el.append($('<span class="name">').text(name));
            el.append($('<span class="text">').text(text));
            appendMessage(el);
        }

        function appendJoinMessage(name) {
            appendMessage($('<div class="join">').text(`Benutzer ist beigetreten: ${name}`));
        }

        function appendLeaveMessage(name) {
            appendMessage($('<div class="leave">').text(`Benutzer hat die Runde verlassen: ${name}`));
        }

        function appendWelcomeMessage(name) {
            appendMessage($('<div class="welcome">').text(`Herzlich Willkommen: ${name}`));
        }

        history.forEach(([name, message]) => appendMessage(name, message));
        appendWelcomeMessage(name);

        let messageField = $('#text');
        function sendMessage() {
            let message = messageField.val().trim();
            if (message) {
                socket.emit('message', message);
                messageField.val('')
            }
        }
        $('#senden').on('click', () => sendMessage());
        messageField.on('keypress', ({which}) => {
            const EnterKey = 13;
            if (which == EnterKey) {
                sendMessage();
            }
        });

        socket.on('message', ([name, message]) => {
            appendTextMessage(name, message);
        });

        socket.on('join', (name) => {
            appendJoinMessage(name);
        });

        socket.on('leave', (name) => {
            appendLeaveMessage(name);
        })
    });
});


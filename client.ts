
import blessed from 'blessed';


const screen = blessed.screen({
    smartCSR: true,
});

const messageBox = blessed.Box({
    content: 'Welcome to Terminal UI!',
    top: 0,
    tags: true,
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
        ch: ' ',
        style: {
            bg: 'yellow',
        },
        track: {
            bg: 'black',
        }
    },
    keys: true,
    vi: true,
    height: '80%',
    left: 'center',
    width: '100%',
    align: 'left',
    style: {
        fg: 'black',
        bg: 'white',
    },
});
const input = blessed.textbox({
    bottom: 0,
    height: 3,
    width: '100%',
    inputOnFocus: true,
    style: {
        fg: 'white',
        bg: 'black',
        scrollbar: {
            bg: 'blue'
        },
    },
});
const label = blessed.text({
    top: 0,
    content: "<NAME>:<ROOM ID> :->",
    left: 'center',
    height: 1,
    width: '100%',
    inputOnFocus: true,
    style: {
        fg: 'white',
        bg: 'black',
        scrollbar: {
            bg: 'blue'
        },
    },
})
const unameForm = blessed.textbox({
    top: 1,
    content: "Name:Room ID",
    left: 'center',
    height: 3,
    width: '100%',
    inputOnFocus: true,
    style: {
        fg: 'white',
        bg: 'black',
        scrollbar: {
            bg: 'blue'
        },
    },
});

screen.append(unameForm);
screen.append(label);

unameForm.on('submit', function () {
    const ip = unameForm.getValue()?.split(":")
    const socket = new WebSocket(`wss://PATH-TO-SERVER?room=${ip[1]}`, [ip[0]]); // PATH-TO-SERVER here
    screen.remove(unameForm);
    screen.remove(label)
    screen.append(messageBox);
    screen.append(input);
    screen.render()
    socket.addEventListener("message", (event: any) => {
        messageBox.pushLine(event.data);
        screen.render()
    })
    input.on('keypress', (ch, key) => {
        if (key.full === 'enter') {
            const inputValue: string = input.getValue();
            if (inputValue.trim() !== '') {
                messageBox.pushLine(`You entered: ${inputValue}`);
                socket.send(inputValue)
                messageBox.setScrollPerc(100);
                input.clearValue();
                screen.render();
                input.focus();
            }
        }
    });
    input.on('click', (ch, key) => {
        screen.render();
    })
});

screen.key(['escape', 'C-c'], function (ch, key) {
    return process.exit(0);
});
screen.key('insert', () => {
    input.focus()
})
screen.render();




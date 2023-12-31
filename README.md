
# TerminalTalk Documentation

TerminalTalk is a command-line decentralized chat application that allows users to host their own server and communicate with friends via shared links.

## Description

TerminalTalk provides a seamless chatting experience directly through the terminal. Users can set up their server using tools like ngrok, creating a decentralized environment for secure and private conversations.

## Tools Required

To use TerminalTalk, you'll need:
- [Bun](https://bun.sh/)
- [Ngrok](https://ngrok.com) or similar tools for creating tunnels to host your server
- A terminal or command line interface

## Installation

### Prerequisites
Ensure you have [Bun](https://bun.sh/) installed.

### Steps
1. Clone the repository from [GitHub](https://github.com/terminaltalk/terminaltalk).
2. Navigate to the TerminalTalk directory.
3. Install dependencies by running:
   ```bash
   bun install
   ```

## Usage

### Hosting the Server
1. run the ```server.ts``` file
   ```bash
   bun run server.ts
   ```
2. In another window/tab run Ngrok or a similar tool to expose your local server to the internet:
   ```bash
   ngrok http 3000 // default is 3000
   ```
   or you can change the port by changing it on ```line 8``` in ```server.ts``` file
3. Copy the generated URL and share it with your friends.


### Joining the Chat
1. Edit the ```client.ts``` file and replace *'PATH-TO-SERVER'* in **line 84** with the URL generated in the aforementioned step
2. Run the ```client.ts``` file:
   ```bash
   bun run client.ts
   ```

3. Enter your name and room id separated by a "__:__"
    ```
    <NAME>:<ROOM ID>
    ```
    and hit enter
5. Start chatting!
   
### Chatting Window

1. Hitting ```insert``` key focuses the inputbox
2. Hitting ```enter``` sends the text
3. You can exit the _insert_ mode by hitting ```escape``` key, pressing ```escape``` one more time will stop the program




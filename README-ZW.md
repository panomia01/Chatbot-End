# Local hosted

Chatbot which uses Lex from Amazon Web services. The Chatbot is a web-based app running on react

# Features

Create a conversation with the user with the intent instill into the bot
Showing the conversation with the Chatbot
Pop-up map of Jurong Lake Park with markers 

## Flow of the program

The whole application is one standard flow

Trigger(button) -> User speaks -> User stop speaking -> infomation send to lex -> response from lex -> output response

This is so that it is easy to add more intent from lex, just by adding the additional intent in the AWS console but
no changes to the codes

Program can be cloned from https://github.com/panomia01/Chatbot-End.git as it is still currently public, I will probably 
shift it somewhere else if need be as it is not secure this way. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Before running the program straight, please run the command 'npm install' first before running 'npm start'.
This is to install the various node modules required for the program to your computer.

### Issues faced

8/6/2021: there is currently two main issues for the codes, which is when the users stops speaking, there are
error code popping out so you might want to take a look. The other issue would be the popping of google  maps as it is 
not consistent.

Although it is a localhosted web-based app, the app uses amazon web services which requires internet unless you decided to 
create your own chatbot


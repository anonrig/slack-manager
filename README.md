# Agile Development tool for Slack.
Basically, "**Standup meetings for Slack**"

Slack Manager allows teams to monitor employees on a daily basis. You can start a meeting by inviting your bot to your current channel and just write "start meeting".

Advantages of Slack Manager from other services:
  - Free and easy to use.
  - Configurable mail settings.
  - Configurable questions.

![alt text](http://new.tinygrab.com/783f33d7b18d7bcd72f1de9785bcbf86e10c3eb82a.png "Slack-Manager")

### Create your Slack bot.

  - First make a bot integration inside of your Slack channel. Go here: `https://my.slack.com/services/new/bot`
  - Enter a name for your bot. Make it something fun and friendly, but avoid a single task specific name. Bots can do lots! Let's not pigeonhole them.
  - When you click "Add Bot Integration", you are taken to a page where you can add additional details about your bot, like an avatar, as well as customize its name & description.

Copy the API token that Slack gives you. You'll need it in the next step.

### Installation

Clone the repository by:
```
git clone https://github.com/anonrig/slack-manager
```

Install from NPM
```
npm install slack-manager --save
```

Create your settings file.

```
touch config/production.json
```

Mailer service uses nodemailer's transport methods. Therefore, for better understanding please read nodemailer's [available transports ](https://github.com/andris9/Nodemailer#available-transports).

For example for Gmail settings: change your settings file by:
```
{
    "token": "YOUR SLACK TOKEN HERE",
    "mailer": {
        "service": "Gmail",
        "email": "email@address.com",
        "password": "mySuperFancyPassword"
    }
}
```

## Usage

### Start your bot.

```
npm start
```

### Commands

- ``` start meeting ```

    Starts meeting. To be able to start meeting with this command your bot should be invited to the channel.

- ``` skip ```

    Skips the current user's turn. Asks/Returns to the skipped users again at the end of the meeting. Can be skipped more than once.

- ``` dismiss ```

    Dismisses the current user, in other words kicks the current user out of the meeting. Useful in case of an absence.

- ``` quit ```

    Ends the meeting. Meeting can be restarted by typing ``` start meeting ``` again.

### Tech

Slack-Manager uses a number of open source projects to work properly:

* [Botkit](https://github.com/howdyai/botkit) - Botkit - Building Blocks for Building Bots
* [Node-mailer](https://github.com/andris9/Nodemailer) - Send e-mails with Node.JS – easy as cake! E-mail made in Estonia.
* [Lodash](https://github.com/lodash/lodash) - A JavaScript utility library delivering consistency, modularity, performance, & extras.
* [Async](https://github.com/caolan/async) - Async utilities for node and the browser.
* [Nconf](https://github.com/indexzero/nconf) - Hierarchical node.js configuration with files, environment variables, command-line arguments, and atomic object merging.

### Development

Want to contribute? Great! Feel free to submit bugs, and open pull requests.

License
----

MIT

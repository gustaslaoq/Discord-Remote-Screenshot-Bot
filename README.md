# Discord Remote Screenshot Bot

A professional Node.js Discord bot designed to remotely capture screenshots of the host computer. This bot allows an authorized user to request a screen capture via a simple slash command (`/screenshot`) from anywhere.

![Node.js](https://img.shields.io/badge/Node.js-14.0+-green)
![Discord.js](https://img.shields.io/badge/Discord.js-14.14+-blue)

## ⚠️ Disclaimer

This tool is intended for **educational purposes and personal remote administration only**. Ensure you have authorization to monitor the computer where this bot is running. Never share your Bot Token with anyone.

---

## 🌟 Features

-   **Remote Access:** Request screenshots from any Discord server where the bot is added.
-   **Auto-Installation:** Includes an intelligent installer (`START.bat`) that handles dependencies and configuration automatically.
-   **Security Lock:** Restricted to a specific User ID. Only you can use the command.
-   **Background Mode:** Runs silently in the background without interrupting your work.
-   **Auto-Cleanup:** Option to automatically delete temporary screenshots after sending them.

## 📋 Prerequisites

-   **Node.js** (v14 or higher) installed on the target computer.
    -   Download here: [nodejs.org](https://nodejs.org/)

---

## 🚀 Setup Guide

Follow these steps carefully to set up your bot.

### Step 1: Create a Discord Application

1.  Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2.  Click on **"New Application"** (top right).
3.  Give it a name (e.g., "My Screenshot Bot") and click **Create**.

### Step 2: Get the Bot Token

1.  In the left sidebar, click on **Bot**.
2.  Click **"Add Bot"** then confirm by clicking **"Yes, do it!"**.
3.  Under the **"Token"** section, click **"Reset Token"**.
4.  **Copy this Token.** You will need it for the configuration.
    *   *Warning: Keep this secret. Do not share it.*

### Step 3: Invite the Bot to a Server

1.  In the left sidebar, click on **OAuth2** -> **URL Generator**.
2.  Under **Scopes**, check the box **`bot`**.
3.  Under **Bot Permissions**, check the following:
    -   `Send Messages`
    -   `Attach Files`
    -   `Use Slash Commands`
    -   *(Optional: `Administrator` makes setup easier, but is not required)*
4.  Scroll down to the **"Generated URL"** box at the bottom.
5.  Copy the URL and open it in your browser.
6.  Select the server where you want to add the bot and click **Authorize**.

### Step 4: Get Your User ID

To secure the bot so only *you* can use it, you need your Discord User ID.

1.  Open Discord.
2.  Go to **User Settings** (the gear icon near your username).
3.  Go to **Advanced** (under App Settings).
4.  Toggle **"Developer Mode"** to ON.
5.  Close settings and right-click on your username in any chat.
6.  Select **"Copy User ID"**.

---

## 💻 Installation & Usage

1.  **Download** this project and extract it to a folder on the computer you want to monitor.
2.  Double-click the file **`START.bat`**.
3.  The installer will run automatically:
    -   It will install required dependencies (takes a moment on the first run).
    -   It will ask you to paste the **Bot Token**, **Client ID** (found in "General Information" tab of Developer Portal), and **User ID**.
    -   It will save this configuration to a `.env` file.
4.  Once finished, the bot will start running in the **background**.
    -   You can close the installer window. The bot stays active.
5.  Go to Discord and type `/screenshot`.

---

## ⚙️ Configuration (.env)

If you need to change settings later, you can edit the `.env` file created by the installer:

```env
TOKEN=your_bot_token_here
CLIENT_ID=your_application_id_here
USER_ID=your_discord_user_id_here
SAVE_SCREENSHOTS=false
```

-   **SAVE_SCREENSHOTS**: Set to `true` if you want to keep the images saved in the `screenshots` folder. Set to `false` to delete them immediately after sending.

---

## 🛠️ Troubleshooting

**"Access denied: You are not authorized"**
-   Check your `.env` file. Ensure your `USER_ID` matches exactly the ID you copied from Discord (no extra spaces).

**Command `/screenshot` does not appear**
-   Global commands can take up to **1 hour** to register. If you are in a hurry, restart the bot or wait a few minutes.
-   Ensure you actually invited the bot to the server with the correct permissions.

**How do I stop the bot?**
-   Since it runs in the background, open **Task Manager** (Ctrl + Shift + Esc), look for `node.exe`, and end the task.

---

## 📝 License

This project is open source and available for educational purposes.

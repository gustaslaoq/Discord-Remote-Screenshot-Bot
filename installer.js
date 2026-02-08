const fs = require('fs');
const path = require('path');
const { spawn, execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (prompt) => {
    return new Promise((resolve) => {
        rl.question(prompt, resolve);
    });
};

async function main() {
    console.log('   DISCORD BOT INSTALLER   ');

    // 1. Check Dependencies
    const nodeModulesPath = path.join(__dirname, 'node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
        console.log('[SETUP] Dependencies not found. Installing...');
        try {
            execSync('npm install', { stdio: 'inherit' });
            console.log('[SETUP] Dependencies installed successfully.');
        } catch (err) {
            console.error('[ERROR] Failed to install dependencies.');
            rl.close();
            return;
        }
    } else {
        console.log('[SETUP] Dependencies found.');
    }

    // 2. Check .env Configuration
    const envPath = path.join(__dirname, '.env');
    
    if (!fs.existsSync(envPath)) {
        console.log('\n[CONFIG] First time setup detected.');
        console.log('Please enter the following details:\n');

        const token = await question('Enter BOT TOKEN: ');
        const clientId = await question('Enter CLIENT ID (Application ID): ');
        
        console.log('\n[INFO] Since the bot can now be added to ANY server,');
        console.log('[INFO] we need your Discord User ID to secure the command.');
        const userId = await question('Enter YOUR USER ID (Right click your profile -> Copy ID): ');
        
        const envContent = `TOKEN=${token}\nCLIENT_ID=${clientId}\nUSER_ID=${userId}\nSAVE_SCREENSHOTS=false`;
        
        fs.writeFileSync(envPath, envContent);
        console.log('\n[SUCCESS] Configuration saved to .env');
    } else {
        console.log('[CONFIG] .env file found. Skipping setup.');
    }

    // 3. Start Bot in Background
    console.log('\n[SYSTEM] Starting bot in background...');
    
    const botProcess = spawn('node', ['index.js'], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true
    });

    botProcess.unref();

    console.log('[SUCCESS] Bot is now running in the background.');
    console.log('[INFO] You can add this bot to any server, but only you can use /screenshot.');
    console.log('[INFO] To stop the bot, use Task Manager and end "node.exe".');
    
    rl.close();
}

main();
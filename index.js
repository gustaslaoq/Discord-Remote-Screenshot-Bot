const { Client, GatewayIntentBits, EmbedBuilder, AttachmentBuilder, REST, Routes, SlashCommandBuilder } = require('discord.js');
const dotenv = require('dotenv');
const screenshot = require('screenshot-desktop');
const fs = require('fs');
const path = require('path');
dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const USER_ID = process.env.USER_ID; 
const SAVE_SCREENSHOTS = process.env.SAVE_SCREENSHOTS === 'true';
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');

// Ensure screenshots directory exists
if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
});

// Function to register slash commands automatically
// Since the bot can be anywhere, we register global commands.
async function registerCommands() {
    const commands = [
        new SlashCommandBuilder()
            .setName('screenshot')
            .setDescription('Takes a screenshot of the current screen.')
    ].map(command => command.toJSON());

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        console.log(`[SYSTEM] Registering GLOBAL commands... (May take up to 1 hour to update)`);

        await rest.put(
            Routes.applicationCommands(CLIENT_ID),
            { body: commands }
        );
        
        console.log('[SYSTEM] Global commands registered successfully.');
    } catch (error) {
        console.error('[ERROR] Failed to register commands:', error);
    }
}

client.once('ready', async () => {
    console.log(`[SYSTEM] Bot logged in as ${client.user.tag}`);
    
    // Register commands on startup
    await registerCommands();
    console.log(`[SYSTEM] Security Mode: Restricted to User ID ${USER_ID}`);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName !== 'screenshot') return;
    if (interaction.user.id !== USER_ID) {
        return interaction.reply({ 
            content: 'Access denied: You do not have permission to use this command.', 
            ephemeral: true 
        });
    }

    await interaction.deferReply();
    const timestamp = Date.now();
    const filename = `print-${timestamp}.png`;
    const filepath = path.join(SCREENSHOTS_DIR, filename);

    try {
        console.log(`[ACTION] Screenshot requested by ${interaction.user.tag} in ${interaction.guild.name}`);
        await screenshot({ filename: filepath });

        const attachment = new AttachmentBuilder(filepath, { name: filename });
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Screen Capture')
            .setDescription('Current state of the computer.')
            .setImage(`attachment://${filename}`)
            .setFooter({ text: `Requested by: ${interaction.user.tag}` })
            .setTimestamp();

        await interaction.editReply({ 
            embeds: [embed], 
            files: [attachment] 
        });

        console.log('[SUCCESS] Screenshot sent successfully.');

        if (!SAVE_SCREENSHOTS) {
            setTimeout(() => {
                fs.unlinkSync(filepath);
                console.log(`[SYSTEM] Temporary file ${filename} deleted.`);
            }, 2000);
        }

    } catch (error) {
        console.error('[ERROR]', error);
        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({ content: 'An error occurred while capturing the screen.' });
        } else {
            await interaction.editReply({ content: 'An error occurred while capturing the screen.' });
        }
    }
});

client.login(TOKEN);
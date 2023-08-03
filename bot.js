const { Client, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { UIDCommand } = require('./commands/UIDCommand');
const { EventScheduleCommand } = require('./commands/EventScheduleCommand');
const { GachaCommand } = require('./commands/GachaCommand');
require('dotenv').config();

const clientId = '1134608096065499176'; // Replace this with your Discord bot's client ID
const guildId = '1121694836664307742'; // Replace this with your Discord server's ID

// Define your command data here
const commands = [
  UIDCommand.data.toJSON(),
  EventScheduleCommand.data.toJSON(),
  new GachaCommand().toJSON(),
  {
    name: 'gachahistory',
    description: 'See your gacha history and the prizes you won',
  },
  // Add other commands here as needed
];

const client = new Client({
  intents: [
    'GUILDS', // Receive information about guilds
    'GUILD_MESSAGES', // Receive messages in guilds
  ],
});

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

// Register the interactionCreate event listener here
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'help') {
    // ... (existing code)
  } else if (commandName === 'events') {
    const eventScheduleCommand = new EventScheduleCommand();
    try {
      await eventScheduleCommand.execute(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  } else if (commandName === 'gacha') {
    const gachaCommand = new GachaCommand();
    try {
      await gachaCommand.execute(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  } else if (commandName === 'gachahistory') {
    const gachaCommand = new GachaCommand();
    const userId = interaction.user.id;
    try {
      const userGachaHistory = await gachaCommand.getUserGachaHistory(userId);
      if (userGachaHistory.length === 0) {
        await interaction.reply("You have not won any prizes in the gacha yet.");
        return;
      }

      const embed = new MessageEmbed()
        .setTitle('Gacha History')
        .setColor('#0099ff');

      userGachaHistory.forEach((prize) => {
        embed.addFields(
          { name: prize.title, value: prize.description },
          { name: 'Image URL', value: prize.imageURL }
        );
      });

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching gacha history:', error);
      await interaction.reply({
        content: 'An error occurred while fetching gacha history.',
        ephemeral: true,
      });
    }
  } else if (commandName === 'adduid' || commandName === 'myuid' || commandName === 'changeuid') {
    const uidCommand = new UIDCommand();
    try {
      await uidCommand.execute(interaction);
    } catch (error) {
      console.error('Error executing command:', error);
      await interaction.reply({
        content: 'An error occurred while executing the command.',
        ephemeral: true,
      });
    }
  }
});

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }

  // Once the commands are registered, login to Discord
  client.login(process.env.DISCORD_TOKEN);
})();


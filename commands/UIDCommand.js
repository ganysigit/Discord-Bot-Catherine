const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const sqlite3 = require('sqlite3').verbose();

class UIDCommand {
  static data = new SlashCommandBuilder()
    .setName('uid')
    .setDescription('Manage user UIDs')
    .addSubcommand(subcommand =>
      subcommand
        .setName('adduid')
        .setDescription('Add a new UID for a specific type')
        .addStringOption(option =>
          option
            .setName('type')
            .setDescription('The type of UID (e.g., Valorant, Minecraft)')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('uid')
            .setDescription('The UID to add')
            .setRequired(true)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('myuid')
        .setDescription('Show all saved UIDs')
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName('changeuid')
        .setDescription('Change an existing UID for a specific type')
        .addStringOption(option =>
          option
            .setName('type')
            .setDescription('Select a type from the dropdown to change the UID')
            .setRequired(true)
        )
        .addStringOption(option =>
          option
            .setName('uid')
            .setDescription('The new UID to set')
            .setRequired(true)
        )
    );

  async execute(interaction) {
    const userId = interaction.user.id;
    const subcommand = interaction.options.getSubcommand();

    // Connect to the database
    const db = new sqlite3.Database('./uid_data.db', (err) => {
      if (err) {
        console.error('Error opening database:', err);
      } else {
        console.log('Connected to the SQLite database.');
        if (subcommand === 'adduid') {
          const type = interaction.options.getString('type');
          const uid = interaction.options.getString('uid');
          // Implement the code to add the UID to the database
          db.run('INSERT INTO uids (user_id, type, uid) VALUES (?, ?, ?)', [userId, type, uid], (err) => {
            if (err) {
              console.error('Error adding UID:', err);
              interaction.reply('Error adding UID.');
            } else {
              interaction.reply(`Successfully added ${type}: ${uid}`);
            }
          });

        } else if (subcommand === 'myuid') {
          // Implement the code to retrieve and show all saved UIDs for the user
          db.all('SELECT type, uid FROM uids WHERE user_id = ?', [userId], (err, rows) => {
            if (err) {
              console.error('Error fetching UID data:', err);
              interaction.reply('Error fetching UID data.');
            } else {
              const embed = new MessageEmbed()
                .setTitle('My UIDs')
                .setColor('#0099ff');

              rows.forEach(row => {
                embed.addField(`↳ ${row.type}`, row.uid); // Add ↳ icon in front of each UID
              });

              interaction.reply({ embeds: [embed] });
            }
          });

        } else if (subcommand === 'changeuid') {
          const type = interaction.options.getString('type');
          const uid = interaction.options.getString('uid');
          // Implement the code to change the UID in the database
          db.run('UPDATE uids SET uid = ? WHERE user_id = ? AND type = ?', [uid, userId, type], function(err) {
            if (err) {
              console.error('Error changing UID:', err);
              interaction.reply('Error changing UID.');
            } else {
              if (this.changes > 0) {
                interaction.reply(`Successfully changed ${type} to ${uid}`);
              } else {
                interaction.reply(`No matching UID found for type: ${type}`);
              }
            }
          });

        }
      }
    });
  }
}

module.exports = {
  UIDCommand,
};

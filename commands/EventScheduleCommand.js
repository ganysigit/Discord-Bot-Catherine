const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

class EventScheduleCommand {
  static data = new SlashCommandBuilder()
    .setName('events')
    .setDescription('Show the weekly event schedule');

  async execute(interaction) {
    // Your existing event schedule data here
    const schedule = {
      monday: [
        { time: 'Reset 04.00 AM', event: 'Duty Mission' },
        { time: '08.00 PM - 08.25 PM', event: 'Assault on the Eagles' },
        { time: '04.00 AM - 11.59 PM', event: 'Our Regular Supplier' },
      ],
      tuesday: [
        { time: '08.00 PM - 08.25 PM', event: 'District 13' },
        { time: '08.30 PM', event: 'Camp Patrol' },
      ],
      wednesday: [
        { time: '04:00 AM - 11.59 PM', event: 'Our Regular Supplier' },
        { time: '08:00 AM - 08.25 PM', event: 'Camp Competition' },
      ],
      thursday: [
        { time: '08.00 AM - 08.25 PM', event: 'Fishing Competition' },
        { time: '08.30 AM - 09.00 PM', event: 'Radiation Island Zombies' },
      ],
      friday: [
        { time: '04.00 AM - 11.59 PM', event: 'Our Regular Supplier' },
        { time: '08.00 AM - 08.25 PM', event: 'Camp Competition' },
      ],
      saturday: [
        { time: '08.00 AM - 08.25 PM', event: 'Guard Noah' },
        { time: '08.30 AM - 09.00 PM', event: 'Supply Van' },
      ],
      sunday: [
        { time: '07.55 AM - 08.25 PM', event: 'Giant Aberration' },
      ],
      // Add the schedule for other days as needed
    };

    const embed = new MessageEmbed()
      .setTitle('Weekly Event Schedule')
      .setColor('#0099ff');

    for (const day in schedule) {
      let dayEvents = '';

      for (const event of schedule[day]) {
        dayEvents += `**${event.time}**: ${event.event}\n`;
      }

      if (dayEvents.trim() !== '') {
        embed.addField(day.charAt(0).toUpperCase() + day.slice(1), dayEvents);
      }
    }

    await interaction.reply({ embeds: [embed] });
  }
}

module.exports = {
  EventScheduleCommand,
};

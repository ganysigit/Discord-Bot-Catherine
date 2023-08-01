const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const prizes = [
  {
    title: 'GAY, si paling sosor sana sini',
    description: 'kalo ketemu gepukin bae',
    winnerTag: '',
    imageURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Gay_Pride_Flag.svg/1200px-Gay_Pride_Flag.svg.png',
  },
  {
    title: 'PEDOFIL',
    description: 'pukulin dah ni orang',
    winnerTag: '',
    imageURL: 'https://tec.com.pe/wp-content/uploads/2022/06/ddf881284adeef13ce709124735c0e01.jpg',
  },
  {
    title: 'PEDOGAY',
    description: 'dah pedo gay lagi',
    winnerTag: '',
    imageURL: 'https://i.pinimg.com/280x280_RS/52/be/c8/52bec89b66bb518cbe60957ef422d311.jpg',
  },
  {
    title: 'NORMAL',
    description: 'Si paling normal',
    winnerTag: '',
    imageURL: 'https://i.pinimg.com/236x/d9/c6/07/d9c607ee83a07dcf91e14050cee9170b.jpg',
  },
  {
    title: 'Freyanisme',
    description: 'Hanya pengagum mbak mbak satu ini',
    winnerTag: '',
    imageURL: 'https://assets.ayobandung.com/crop/0x0:0x0/750x500/webp/photo/2023/04/06/Member-JKT48-2819971253.jpg',
  },
  // Add more prizes if needed
];

class GachaCommand {
  constructor() {
    this.data = new SlashCommandBuilder()
      .setName('gacha')
      .setDescription('Play the gacha and win a prize!');
  }

  async execute(interaction) {
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[randomIndex];

    const embed = new MessageEmbed()
      .setTitle(prize.title)
      .setDescription(prize.description)
      .setImage(prize.imageURL);

    const winnerTag = interaction.user.toString();
    prize.winnerTag = winnerTag;

    await interaction.reply({
      content: `Wah ternyata si, ${winnerTag}!`,
      embeds: [embed],
    });
  }

  // New method to get a user's gacha history
  getUserGachaHistory(userId) {
    return prizes.filter((prize) => prize.winnerTag === userId);
  }

  toJSON() {
    return this.data.toJSON();
  }
}

module.exports = {
  GachaCommand,
};

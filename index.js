// Constante
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();

//JSON Files
let experience = JSON.parse(fs.readFileSync('JSON/experience.json', 'utf8'));

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'bienvenue');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Pseudo : ', `${member}`)
        .addField(':microphone2: | Bienvenue!', `Bienvenue sur le discord du Projet "Die Glocke", ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Nous sommes à présent', `${member.guild.memberCount}`)
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('ready', () => {
    bot.user.setActivity("Garry's Mod");
    console.log('Je suis En Ligne.')
});

bot.on('message', msg => {
    //Constante en lien avec les messages
    const guildMember = msg.member;
    
    // Créer l'accès au nombre d'experience de la Die Glocke
    if (!experience['Experience']) experience['Experience'] = {}
    if (!experience['Experience'].experience) experience['Experience'].experience = 0.

    let prefix = "!";

    fs.writeFile('JSON/experience.json', JSON.stringify(experience), (err) => {
        if (err) console.error (err);
    })

    if (msg.content === prefix + "experience") {
        if(msg.member.roles.get(process.env.DIEGLOCKE)) {
            msg.reply(`Vous n'avez pas accès à la commande du Die Glocke`);
            console.log(`Une personne non-conviée a essayée d'utiliser la commande !experience.`)
        }
        else
        {
            msg.reply("Nombres d'experiences :" + experience['Experience'].experience);
            console.log(`Une personne a pu voir le nombre d'experience faites pas la Die Glocke.`)
        }

    }

    if (msg.content === "+1") {
        if(msg.member.roles.get(process.env.DIEGLOCKE)) {
            msg.reply(`Vous n'avez pas accès à la commande du Die Glocke`);
            console.log(`Une personne non-conviée a essayée d'utiliser la commande +1.`)
        }
        else
        {
            msg.reply('1 Experience a bien été ajouté au nombre total.')
            experience['Experience'].experience += 1;
            msg.reply("Nombres d'experiences :" + experience['Experience'].experience);
        }
    }

});

bot.login(process.env.TOKEN);
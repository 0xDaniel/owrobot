const Discord = require('discord.js');
const OverwatchAPI = require('./overwatch.js');
const fs = require('fs');

const bot = new Discord.Client();



bot.on('ready', () => {
  console.log('Cheers Love, The Cavalry`s Here');
});

bot.on('message', message => {
  if (message.author.bot) return;

  if (message.content === 'ping') {
    message.reply('pong');
  }

  if (message.content.startsWith('ow!rank')) {
    if (message.content.indexOf('#') > -1) {
      OverwatchAPI(message.content, (err, data) => {
        if (err) {
          message.channel.send({
            embed: {
              color: 15158332,
              description: "Am intampinat o eroare :((Battle tag inexistent verifica daca nu cumva ai uitat majusculele)",
            }
          });
          return console.error(err + ': ' + data);
        }

        var rankint = parseInt(data);
        let myRole = "";
        var st = "";
        if (rankint < 1500) {
          st += "Bronze";
          let myRole = message.guild.roles.find("name", "Bronze");
        } else if (rankint < 2000) {
          st += "Silver";
          let myRole = message.guild.roles.find("name", "Silver");
        } else if (rankint < 2500) {
          st += "Gold";
          let myRole = message.guild.roles.find("name", "Gold");
        } else if (rankint < 3000) {
          st += "Platinum";
          let myRole = message.guild.roles.find("name", "Platinum");
        } else if (rankint < 3500) {
          st += "Diamond";
          let myRole = message.guild.roles.find("name", "Diamond");
        } else if (rankint < 4000) {
          st += "Master";
          let myRole = message.guild.roles.find("name", "Master");
        } else {
          st += "Grandmaster";
          let myRole = message.guild.roles.find("name", "Grandmaster");
        }
        let user = message.member;
        let gradrole = message.guild.roles.find(r => r.name === st);

        let b = message.guild.roles.find(r => r.name === "Bronze");
        let s = message.guild.roles.find(r => r.name === "Silver");
        let g = message.guild.roles.find(r => r.name === "Gold");
        let p = message.guild.roles.find(r => r.name === "Platinum");
        let d = message.guild.roles.find(r => r.name === "Diamond");
        let m = message.guild.roles.find(r => r.name === "Master");
        let gm = message.guild.roles.find(r => r.name === "Grandmaster");
        let b1 = message.guild.member(user).roles.has(b.id);
        let s1 = message.guild.member(user).roles.has(s.id);
        let g1 = message.guild.member(user).roles.has(g.id);
        let p1 = message.guild.member(user).roles.has(p.id);
        let d1 = message.guild.member(user).roles.has(d.id);
        let m1 = message.guild.member(user).roles.has(m.id);
        let gm1 = message.guild.member(user).roles.has(gm.id);

        if (message.guild.member(user).roles.has(gradrole.id)) {
          message.channel.send({
            embed: {
              color: 15158332,
              description: "Deja esti " + st,
            }
          });
        } else {
          if (b1) {
            message.guild.member(user).removeRole(b.id);
          } else if (s1) {
            message.guild.member(user).removeRole(s.id);
          } else if (g1) {
            message.guild.member(user).removeRole(g.id);
          } else if (p1) {
            message.guild.member(user).removeRole(p.id);
          } else if (d1) {
            message.guild.member(user).removeRole(d.id);
          } else if (m1) {
            message.guild.member(user).removeRole(m.id);
          } else if (gm1) {
            message.guild.member(user).removeRole(gm.id);
          }
          message.channel.send({
              embed: {
                color: 3066993,
                description: "Rolul de " + st + " a fost adaugat.Si sr-ul tau curent este " + data + ".",
              }
            });
            message.guild.member(user).addRole(gradrole.id);
        }

      });
    } else {
      showHelp(message);
    }
  }
});

bot.login(process.env.BOT_TOKEN);

let showHelp = (message) => {
  const helpText = '\n Verifica daca ti-ai scris battle tag-ul corect si daca ai majuscule folosestele. \n Daca esti in alta regiune sau pe alta platforma adauga dupa battle tag  \n\n  p=[platform] \n Options: pc, xbl, psn \n\n Region: r=[region] \n Options: us, eu, kr, cn, global \n\n Toata chestia ar trebuii sa arate: ow!rank FallenAngel#2765 p=pc r=us';
  message.reply(helpText);
};
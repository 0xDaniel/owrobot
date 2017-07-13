const Discord = require('discord.js');
const OverwatchAPI = require('./overwatch.js');
const fs = require('fs');

const bot = new Discord.Client();



bot.on('ready', () => {
  console.log('Cheers Love, The Cavalry`s Here');
});


bot.on('guildMemberRemove', member => {
  member.guild.defaultChannel.sendMessage(`Ⅎ`);
});
bot.on('guildMemberAdd', member => {
  member.guild.defaultChannel.sendMessage(`Bine ai venit **${member.user.username}** pe **Overwatch Romania**.`);
});

let responseObject = {
  "#pray4Andrei": "https://i.imgur.com/ENYmCb8.png",
  "wat": "Say what?",
  "ping": "pong"
};

bot.on('message', message => {
  if (message.author.bot) return;


  if (responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }

  if (message.content.startsWith('!nsfw')) {
    let user = message.member;
    let n = message.guild.roles.find(r => r.name === "18+ nsfw");
    let n1 = message.guild.member(user).roles.has(n.id);
    if (n1) {
      message.channel.send({
        embed: {
          color: 15158332,
          description: "Deja esti in haita noastra.",
        }
      });
    } else {
      message.guild.member(user).addRole(n.id);
      message.channel.send({
        embed: {
          color: 3066993,
          description: "Welcome to the dark side.",
        }
      });
    }
  }


  if (message.content.startsWith('!delnsfw')) {
    let user = message.member;
    let n = message.guild.roles.find(r => r.name === "18+ nsfw");
    let n1 = message.guild.member(user).roles.has(n.id);
    if (n1) {
      message.guild.member(user).removeRole(n.id);
      message.channel.send({
        embed: {
          color: 3066993,
          description: "bye bye...",
        }
      });
    } else {
      message.channel.send({
        embed: {
          color: 15158332,
          description: "Cum sa te scot daca nici macar nu erai in haita.",
        }
      });
    }
  }

  if (message.content.startsWith('ow!gr')) {
    const args = message.content.split(/\s+/g).slice(1);
    let gr = args[0];
    let user = message.member;
    let s = message.guild.roles.find(r => r.name === "Support");
    let d = message.guild.roles.find(r => r.name === "DPS");
    let t = message.guild.roles.find(r => r.name === "Tank");
    let f = message.guild.roles.find(r => r.name === "Flex");
    let s1 = message.guild.member(user).roles.has(s.id);
    let d1 = message.guild.member(user).roles.has(d.id);
    let t1 = message.guild.member(user).roles.has(t.id);
    let f1 = message.guild.member(user).roles.has(f.id);
    if (s1) {
      message.guild.member(user).removeRole(s.id);
    } else if (d1) {
      message.guild.member(user).removeRole(d.id);
    } else if (t1) {
      message.guild.member(user).removeRole(t.id);
    } else if (f1) {
      message.guild.member(user).removeRole(f.id);
    }

    if (gr == "Support" || gr == "support") {
      message.guild.member(user).addRole(message.guild.roles.find(r => r.name === "Support").id);
      message.channel.send({
        embed: {
          color: 3066993,
          description: "Rolul de **support** a fost adaugat.",
        }
      });
    } else if (gr == "Dps" || gr == "dps") {
      message.guild.member(user).addRole(message.guild.roles.find(r => r.name === "DPS").id);
      message.channel.send({
        embed: {
          color: 3066993,
          description: "Rolul de **DPS** a fost adaugat.",
        }
      });
    } else if (gr == "Tank" || gr == "tank") {
      message.guild.member(user).addRole(message.guild.roles.find(r => r.name === "Tank").id);
      message.channel.send({
        embed: {
          color: 3066993,
          description: "Rolul de **tank** a fost adaugat.",
        }
      });
    } else if (gr == "Flex" || gr == "flex") {
      message.guild.member(user).addRole(message.guild.roles.find(r => r.name === "Flex").id);
      message.channel.send({
        embed: {
          color: 3066993,
          description: "Rolul de **Flex** a fost adaugat.",
        }
      });
    } else {
      message.channel.send({
        embed: {
          color: 15158332,
          description: "Trebuie sa alegi unul dintre rolurile de DPS, TANK, SUPPORT, FLEX",
        }
      });
    }
  }

  if (message.content.startsWith('ow!rank')) {
    if (message.content.indexOf('#') > -1) {
      OverwatchAPI(message.content, (err, data) => {
        if (err) {
          message.channel.send({
            embed: {
              color: 15158332,
              description: "Am intampinat o eroare :( (Battle tag inexistent verifica daca nu cumva ai uitat majusculele)",
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
        } else if (rankint < 5000) {
          st += "Grandmaster";
          let myRole = message.guild.roles.find("name", "Grandmaster");
        } else {
          message.channel.send({
            embed: {
              color: 15158332,
              description: "Am intampinat o eroare :( (Nu ai rank. Asta inseamna ca nu ai facut meciurile de plasament...cel mai probabil)",
            }
          });
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
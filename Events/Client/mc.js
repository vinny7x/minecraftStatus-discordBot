const client = require("../../index");
const Discord = require("discord.js");
const config = require("../../config.json");  
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Evitar responder a mensagens de outros bots

  // Verificar se a mensagem é uma menção direta ao bot na DM

  const botMentions = [`<@!${client.user.id}>`, `<@${client.user.id}>`];

  // Verificar se a mensagem começa com o prefixo definido
  const prefixUsed = message.content.startsWith(config.prefix); 

  // Se a mensagem não começar com um prefixo, verifica se é uma menção direta ao bot
  if (!prefixUsed) {
    prefixUsed = botMentions.find((mention) =>
      message.content.startsWith(mention),
    );
  }

  if (!prefixUsed) return;

  // Verificar se a mensagem foi enviada em uma guild (servidor)
  if (!message.guild) {
    return message.reply(
      `**${message.author.displayName}** Desculpe, não é possível usar comandos em mensagens diretas.`,
    );
  }

  const args = message.content.slice(prefixUsed.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const cmd =
    client.prefix.get(commandName) ||
    client.prefix.find(
      (als) => als.aliases && als.aliases.includes(commandName),
    );

  if (cmd) {
    await cmd.run(client, message, args);
  }

  // Verificar se o bot tem permissão para enviar mensagens no canal
  if (
    !message.guild.members.me.permissionsIn(message.channel).has("SendMessages")
  ) {
    return;
  }

  if (
    !message.guild.members.me.permissionsIn(message.channel).has("EmbedLinks")
  ) {
    return;
  }
});

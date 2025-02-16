const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
  
    console.log(
      ` ${client.user.tag} está online em ${client.guilds.cache.size} servers! `,
    );

    let s = 30; // Intervalo de atualização em segundos
    let canalLog = client.channels.cache.get(config.statusChannel);
    if (!canalLog) return console.error("Canal não encontrado.");
    let mensagem = await canalLog.send("Iniciando novo painel...");
    await atualizarStatus(mensagem, s, client);

    setInterval(async () => {
      await atualizarStatus(mensagem, s, client);
    }, s * 1000);
  },
};

async function atualizarStatus(mensagem, intervalo, client) {
  try {
    let dados = await obterStatusServidor();
    let timestampAtualizacao = Math.floor(Date.now() / 1000); // Timestamp atual
    let timestampCache = dados.debug?.cachetime

    // Verifica se a porta está definida e cria a descrição dinâmica
    let descricaoServidor = `\nIP: ${config.server.ip}`;
    if (config.server.port) {
      descricaoServidor += `\nPORTA: ${config.server.port}`;
    }
    let embed = new Discord.EmbedBuilder()
      .setTitle("Servidor")
      .setDescription("```" + descricaoServidor + "```\n" + `⏳ Próxima atualização <t:${timestampAtualizacao + intervalo}:R>`)
      .setColor("Blue");
    let embed2 = new Discord.EmbedBuilder()
      .setTitle("Status")
      .setTimestamp()
      .setFooter({ text: "Atualizado" });
    if(dados.icon) {
      const iconBuffer = Buffer.from(dados.icon.split(',')[1], 'base64');
      
     attachment = new Discord.AttachmentBuilder(iconBuffer, { name: 'server-icon.png' });
      embed.setThumbnail(`attachment://${attachment.name}`);

  }
    if (dados.online) {
      embed2.setColor("Green")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1061402699276484629/1256753112849453180/discotools-xyz-icon_3.png",
        )
        .addFields(
          { name: "📡 Status", value: " `[🟢]` Online", inline: true },
          { name: "👥 Players online", value: ` \`\`\`${dados.players.online}/${dados.players.max} \`\`\``, inline: true  },
          { name: "💿 Versão", value: `\`\`\`${dados.version}\`\`\``, inline: true  },
          { name: "📅 Dados obtidos em", value: `<t:${timestampCache}:f> (<t:${timestampCache}:R>)`, inline: true  },
        );

      client.user.setPresence({
        status: "online",
        activities: [
          {
            name: "customname",
            type: Discord.ActivityType.Custom,
            state: `[👥] ${dados.players.online} Jogadores online!`,
          },
        ],
      });
    } else {
      embed2.setColor("Red")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/1061402699276484629/1256753149772042411/discotools-xyz-icon_2.png",
        )
        .addFields(
          { name: "📡 Status", value: "\`[🔴]\` Offline", inline: true },
          { name: "📅 Dados obtidos em", value: `<t:${timestampCache}:f> (<t:${timestampCache}:R>)`, inline: true },
        );

      client.user.setPresence({
        status: "online",
        activities: [
          {
            name: "customname",
            type: Discord.ActivityType.Custom,
            state: "[🔴] Servidor off, volte mais tarde para jogar!",
          },
        ],
      });
    }

    // Editando a mensagem e enviando o ícone do servidor como anexo, se houver
    await mensagem.edit({ content: "", embeds: [embed, embed2], files: [attachment]  });
  } catch (error) {
    console.error("Erro ao atualizar status:", error);
  }
}

async function obterStatusServidor() {
  try {
    let baseUrl = "https://api.mcsrvstat.us";
    let { ip, port, serverType } = config.server;
    
    let url = serverType === "java" && !port
      ? `${baseUrl}/2/${ip}` 
      : `${baseUrl}/${serverType === "java" ? "3" : "bedrock/3"}/${ip}:${port}`;

    let r = await fetch(url)
    let res = await r.json()
    console.log(res)
    return await res;
  } catch (error) {
    console.error("Erro ao obter status do servidor:", error);
    return { online: false };
  }
}

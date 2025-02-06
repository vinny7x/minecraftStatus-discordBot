const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const Discord = require("discord.js");
const { loadEvents } = require("./Handlers/eventHandler");
const { loadPrefix } = require("./Handlers/prefixHandler");
const colors = require("colors");


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
  ],
  partials: [Object.keys(Partials)],
});

client.config = require("./config.json");
client.prefix = new Discord.Collection();
module.exports = client;
client.login(client.config.token).then(() => {
  loadEvents(client);
  loadPrefix(client);
});

process.on("unhandledRejection", (error) => {
  console.log(
    colors.red.bold("Erro de Rejeição Não Tratada:"),
    colors.red(error),
  );
});

process.on("uncaughtException", (error, origin) => {
  console.log(colors.red.bold("Erro Não Capturado:"), colors.red(error));
  console.log(colors.yellow.bold("Origem do Erro:"), colors.yellow(origin));
});

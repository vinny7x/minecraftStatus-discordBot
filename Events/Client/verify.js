const Discord = require("discord.js");
const config = require("../../config.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    if (!config.server.ip) {
      console.log("Por favor, configure o IP do servidor no arquivo config.json");
      return;
    }

    if (!config.server.serverType) {
      console.log("Por favor, configure o tipo do servidor (serverType) no arquivo config.json");
      return;
    }

    if (config.server.serverType !== "java" && config.server.serverType !== "bedrock") {
      console.log("O tipo de servidor deve ser 'java' ou 'bedrock'.");
      return;
    }
 },
};

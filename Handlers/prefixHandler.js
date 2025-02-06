function loadPrefix() {
  const fs = require("fs");
  const client = require("../index");

  // to load folders with subfolders
  fs.readdir(`./Commands/prefix`, (error, subfolders) => {
    if (error) {
      console.error(error);
      return;
    }

    subfolders.forEach((subfolder) => {
      const subfolderPath = `./Commands/prefix/${subfolder}`;

      fs.readdir(subfolderPath, (error, files) => {
        if (error) {
          console.error(error);
          return;
        }

        files.forEach((file) => {
          if (!file.endsWith(".js")) return;

          const command = require(`../Commands/prefix/${subfolder}/${file}`);
          if (!command?.name) return;

          client.prefix.set(command.name, command);
        });
      });
    });
  });
  return console.log("[+]".green + " Comandos carregados (PREFIX)");
}

module.exports = {
  loadPrefix,
};

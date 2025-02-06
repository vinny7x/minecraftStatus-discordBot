# minecraftStatus-discordBot
## Um bot para o Discord que monitora o status do seu servidor

---

### Como instalar:
1. Clone o projeto, usando o comando:
> `git clone https://github.com/vinny7x/minecraftStatus-discordBot.git`
2. Instale as dependências necessárias com:
> `npm install`
3. Após configurar o bot conforme as instruções abaixo, inicie-o com:  
> `node .`
Se tudo estiver configurado corretamente, o bot iniciará e enviará o status do servidor no canal escolhido.  

---

### ⚙️ Como configurar:  

1. Acesse o arquivo `config-tamplate.json` na raiz do projeto e renomeie-o para `config.json`.  
2. Insira as informações necessárias conforme o exemplo abaixo:  

```json
{
  "token": "xxxxxxxxxxxxx", // insira aqui o token do seu bot
  "statusChannel": "123456789101112", // insira aqui o canal em que o bot enviará o status do servidor
  "server": {
    "ip": "hypixel.net", // ip do servidor
    "port": 25565, // porta do servidor
    "serverType": "java" // tipo do servidor, java ou bedrock
  }
}

```

Após isso, o bot já estará funcionando perfeitamente. Caso tenha gostado do projeto, deixe uma ⭐ no projeto :D
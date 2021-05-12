const client = global.client;

client.on("ready", () => {
    console.log("Rhode Was Here Bot Çalışıyor Dayıcım");
});

client.login(process.env.token);
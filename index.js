require("dotenv/config");
const discord =require("discord.js");
const {GoogleGenerativeAI} =require("@google/generative-ai");

const MODEL ="gemini-pro";
const API_KEY =process.env.API_KEY;
const BOT_TOKEN =process.env.BOT_TOKEN;
const CHANNEL_ID =process.env.CHANNEL_ID;

const ai =new GoogleGenerativeAI(API_KEY);
const model =ai.getGenerativeModel({
    model:MODEL
});

const client = new discord.Client({
    intents:Object.keys(discord.GatewayIntentBits),
});

client.on("ready",()=>{
    console.log("BOT is ONLINE");
})

client.login(BOT_TOKEN);

client.on("messageCreate",async (message)=>{
    try{
        if(message.author.bot) return ;
        if(message.channel.id!==CHANNEL_ID) return;

        const {response} =await model.generateContent(message.cleanContent);

        await message.reply({
            content:response.text(),
        });

    }catch(e){
        console.log(e);
    }
})



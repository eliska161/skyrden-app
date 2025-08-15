const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.DirectMessages] })
client.login(process.env.DISCORD_BOT_TOKEN)

export async function sendResult(discordId, status, feedback) {
  try {
    const user = await client.users.fetch(discordId)
    if(status === 'pass') {
      await user.send(`Congratulations! Your application has passed! 🎉`)
    } else {
      await user.send(`Unfortunately, your application failed. Type /feedback for feedback.`)
    }
  } catch(err) {
    console.error('Failed to send DM:', err)
  }
}

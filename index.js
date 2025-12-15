import { Telegraf } from 'telegraf';
import 'dotenv/config';

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// logger
bot.use(async (ctx, next) => {
  const user = ctx.from?.username || ctx.from?.id;
  console.log(`[${new Date().toISOString()}]`, user);
  await next();
});

// commands
bot.start((ctx) => {
  ctx.reply('سلام 👋\nربات فعال است');
});

bot.command('ping', (ctx) => {
  ctx.reply('pong ✅');
});

bot.on('text', (ctx) => {
  ctx.reply('دستور نامعتبر است');
});

// error handler
bot.catch((err) => {
  console.error('Bot error:', err);
});

// start
bot.launch();
console.log('Bot is running...');

// import { Telegraf } from 'telegraf';
// import 'dotenv/config';

// if (!process.env.BOT_TOKEN) {
//   throw new Error('BOT_TOKEN is not defined');
// }

// const bot = new Telegraf(process.env.BOT_TOKEN);

// // logger
// bot.use(async (ctx, next) => {
//   const user = ctx.from?.username || ctx.from?.id;
//   console.log(`[${new Date().toISOString()}]`, user);
//   await next();
// });

// // commands
// bot.start((ctx) => {
//   ctx.reply('سلام 👋\nربات فعال است');
// });

// bot.command('ping', (ctx) => {
//   ctx.reply('pong ✅');
// });

// bot.on('text', (ctx) => {
//   ctx.reply('دستور نامعتبر است');
// });

// // error handler
// bot.catch((err) => {
//   console.error('Bot error:', err);
// });

// // start
// bot.launch();
// console.log('Bot is running...');







import { Telegraf, Markup } from 'telegraf';
import 'dotenv/config';

// =====================
// Check BOT_TOKEN
// =====================
if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined');
}

const bot = new Telegraf(process.env.BOT_TOKEN);

// =====================
// Logger Middleware
// =====================
bot.use(async (ctx, next) => {
  const user = ctx.from?.username || ctx.from?.id;
  console.log(`[${new Date().toISOString()}]`, user);
  await next();
});

// =====================
// /start Command + Menu
// =====================
bot.start((ctx) => {
  ctx.reply(
    'سلام 👋\nبه ربات خوش آمدید.\nیکی از سوالات زیر را انتخاب کنید:',
    Markup.inlineKeyboard([
      [Markup.button.callback('❓ این ربات چیکار می‌کنه؟', 'Q_ABOUT')],
      [Markup.button.callback('🛠 چطور از ربات استفاده کنم؟', 'Q_HELP')],
      [Markup.button.callback('📞 راه ارتباطی', 'Q_CONTACT')],
    ])
  );
});

// =====================
// Handle Button Clicks
// =====================
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;

  switch (data) {
    case 'Q_ABOUT':
      await ctx.reply(
        'این ربات برای پاسخ به سوالات متداول کاربران طراحی شده است.'
      );
      break;

    case 'Q_HELP':
      await ctx.reply(
        'برای استفاده از ربات کافی است روی دکمه‌ها کلیک کنید و پاسخ را دریافت کنید.'
      );
      break;

    case 'Q_CONTACT':
      await ctx.reply(
        'برای ارتباط با پشتیبانی:\n@YourUsername'
      );
      break;

    default:
      await ctx.reply('گزینه نامعتبر است.');
  }

  // بستن حالت loading دکمه
  await ctx.answerCbQuery();
});

// =====================
// Other Commands
// =====================
bot.command('ping', (ctx) => {
  ctx.reply('pong ✅');
});

// =====================
// Text Messages (Fallback)
// =====================
bot.on('text', (ctx) => {
  ctx.reply(
    'لطفاً از منوی دکمه‌ای استفاده کنید.\n/start'
  );
});

// =====================
// Error Handling
// =====================
bot.catch((err) => {
  console.error('Bot error:', err);
});

// =====================
// Launch Bot
// =====================
bot.launch();
console.log('Bot is running...');

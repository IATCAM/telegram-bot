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







// import { Telegraf, Markup } from 'telegraf';
// import 'dotenv/config';

// // =====================
// // Check BOT_TOKEN
// // =====================
// if (!process.env.BOT_TOKEN) {
//   throw new Error('BOT_TOKEN is not defined');
// }

// const bot = new Telegraf(process.env.BOT_TOKEN);

// // =====================
// // Logger
// // =====================
// bot.use(async (ctx, next) => {
//   const user = ctx.from?.username || ctx.from?.id;
//   console.log(`[${new Date().toISOString()}]`, user);
//   await next();
// });

// // =====================
// // Main Menu (Reply Keyboard)
// // =====================
// const mainMenu = Markup.keyboard([
//   ['❓ این ربات چیکار می‌کنه؟'],
//   ['🛠 چطور از ربات استفاده کنم؟'],
//   ['📞 راه ارتباطی']
// ])
//   .resize()
//   .persistent(); // دکمه‌ها همیشه پایین بمانند

// // =====================
// // /start
// // =====================
// bot.start((ctx) => {
//   ctx.reply(
//     '👋 سلام\nبه ربات خوش آمدید.\nیکی از گزینه‌های زیر را انتخاب کنید:',
//     mainMenu
//   );
// });

// // =====================
// // Handle Text Messages
// // =====================
// bot.on('text', (ctx) => {
//   const text = ctx.message.text.trim();

//   switch (text) {
//     case '❓ این ربات چیکار می‌کنه؟':
//       return ctx.reply(
//         'این ربات برای پاسخ به سوالات متداول کاربران طراحی شده است.'
//       );

//     case '🛠 چطور از ربات استفاده کنم؟':
//       return ctx.reply(
//         'کافی است از دکمه‌های پایین صفحه استفاده کنید و پاسخ را دریافت کنید.'
//       );

//     case '📞 راه ارتباطی':
//       return ctx.reply(
//         'برای ارتباط با پشتیبانی:\n@IATCAM'
//       );

//     default:
//       return ctx.reply(
//         'لطفاً از دکمه‌های پایین صفحه استفاده کنید 👇',
//         mainMenu
//       );
//   }
// });

// // =====================
// // Error Handling
// // =====================
// bot.catch((err) => {
//   console.error('Bot error:', err);
// });

// // =====================
// // Launch
// // =====================
// bot.launch();
// console.log('Bot is running...');






// import { Telegraf, Markup } from 'telegraf';
// import 'dotenv/config';

// // =====================
// // Check BOT_TOKEN
// // =====================
// if (!process.env.BOT_TOKEN) {
//   throw new Error('BOT_TOKEN is not defined');
// }

// const bot = new Telegraf(process.env.BOT_TOKEN);

// // =====================
// // Logger
// // =====================
// bot.use(async (ctx, next) => {
//   const user = ctx.from?.username || ctx.from?.id;
//   console.log(`[${new Date().toISOString()}]`, user);
//   await next();
// });

// // =====================
// // Main Menu (Reply Keyboard)
// // =====================
// const mainMenu = Markup.keyboard([
//   ['❓ این ربات چیکار می‌کنه؟'],
//   ['🛠 چطور از ربات استفاده کنم؟'],
//   ['📞 راه ارتباطی'],
//   ['❌ مخفی کردن منو']
// ])
//   .resize()
//   .persistent();

// // =====================
// // /start
// // =====================
// bot.start((ctx) => {
//   ctx.reply(
//     '👋 سلام\nبه ربات خوش آمدید.\nیکی از گزینه‌های زیر را انتخاب کنید:',
//     mainMenu
//   );
// });

// // =====================
// // /menu (show menu again)
// // =====================
// bot.command('menu', (ctx) => {
//   ctx.reply('📋 منوی اصلی نمایش داده شد:', mainMenu);
// });

// // =====================
// // Handle Text Messages
// // =====================
// bot.on('text', (ctx) => {
//   const text = ctx.message.text.trim();

//   switch (text) {
//     case '❓ این ربات چیکار می‌کنه؟':
//       return ctx.reply(
//         'این ربات برای پاسخ به سوالات متداول کاربران طراحی شده است.'
//       );

//     case '🛠 چطور از ربات استفاده کنم؟':
//       return ctx.reply(
//         'کافی است از دکمه‌های پایین صفحه استفاده کنید و پاسخ را دریافت کنید.'
//       );

//     case '📞 راه ارتباطی':
//       return ctx.reply(
//         'برای ارتباط با پشتیبانی:\n@IATCAM'
//       );

//     case '❌ مخفی کردن منو':
//       return ctx.reply(
//         'منوی پایین صفحه مخفی شد.\nبرای نمایش دوباره /menu را بزنید.',
//         Markup.removeKeyboard()
//       );

//     default:
//       return ctx.reply(
//         'لطفاً از منوی پایین صفحه استفاده کنید 👇\nیا دستور /menu را بزنید.'
//       );
//   }
// });

// // =====================
// // Error Handling
// // =====================
// bot.catch((err) => {
//   console.error('Bot error:', err);
// });

// // =====================
// // Launch
// // =====================
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
// Logger
// =====================
bot.use(async (ctx, next) => {
  const user = ctx.from?.username || ctx.from?.id;
  console.log(`[${new Date().toISOString()}]`, user);
  await next();
});

// =====================
// Keyboards
// =====================
const mainMenu = Markup.keyboard([
  ['❓ سوالات متداول'],
  ['📞 راه ارتباطی'],
  ['❌ مخفی کردن منو']
]).resize().persistent();

const faqMenu = Markup.keyboard([
  ['🔹 سوال ۱'],
  ['🔹 سوال ۲'],
  ['🔙 بازگشت به منوی اصلی']
]).resize().persistent();

// =====================
// /start
// =====================
bot.start((ctx) => {
  ctx.reply('👋 خوش آمدید\nیکی از گزینه‌ها را انتخاب کنید:', mainMenu);
});

// =====================
// /menu
// =====================
bot.command('menu', (ctx) => {
  ctx.reply('📋 منوی اصلی:', mainMenu);
});

// =====================
// Text Handler
// =====================
bot.on('text', (ctx) => {
  const text = ctx.message.text.trim();

  switch (text) {

    // ===== MAIN MENU =====
    case '❓ سوالات متداول':
      return ctx.reply('یکی از سوالات را انتخاب کنید:', faqMenu);

    case '📞 راه ارتباطی':
      return ctx.reply('ارتباط با پشتیبانی:\n@YourUsername');

    case '❌ مخفی کردن منو':
      return ctx.reply(
        'منو مخفی شد.\nبرای بازگشت /menu را بزنید.',
        Markup.removeKeyboard()
      );

    // ===== FAQ MENU =====
    case '🔹 سوال ۱':
      return ctx.reply('پاسخ سوال شماره ۱ اینجاست.');

    case '🔹 سوال ۲':
      return ctx.reply('پاسخ سوال شماره ۲ اینجاست.');

    case '🔙 بازگشت به منوی اصلی':
      return ctx.reply('بازگشت به منوی اصلی:', mainMenu);

    // ===== FALLBACK =====
    default:
      return ctx.reply(
        'لطفاً از دکمه‌های پایین صفحه استفاده کنید 👇',
        mainMenu
      );
  }
});

// =====================
// Error Handling
// =====================
bot.catch((err) => {
  console.error('Bot error:', err);
});

// =====================
// Launch
// =====================
bot.launch();
console.log('Bot is running...');

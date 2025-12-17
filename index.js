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
// // Keyboards
// // =====================
// const mainMenu = Markup.keyboard([
//   ['❓ سوالات متداول'],
//   ['📞 راه ارتباطی'],
//   ['❌ مخفی کردن منو']
// ]).resize().persistent();

// const faqMenu = Markup.keyboard([
//   ['🔹 سوال ۱'],
//   ['🔹 سوال ۲'],
//   ['🔙 بازگشت به منوی اصلی']
// ]).resize().persistent();

// // =====================
// // /start
// // =====================
// bot.start((ctx) => {
//   ctx.reply('👋 خوش آمدید\nیکی از گزینه‌ها را انتخاب کنید:', mainMenu);
// });

// // =====================
// // /menu
// // =====================
// bot.command('menu', (ctx) => {
//   ctx.reply('📋 منوی اصلی:', mainMenu);
// });

// // =====================
// // Text Handler
// // =====================
// bot.on('text', (ctx) => {
//   const text = ctx.message.text.trim();

//   switch (text) {

//     // ===== MAIN MENU =====
//     case '❓ سوالات متداول':
//       return ctx.reply('یکی از سوالات را انتخاب کنید:', faqMenu);

//     case '📞 راه ارتباطی':
//       return ctx.reply('ارتباط با پشتیبانی:\n@YourUsername');

//     case '❌ مخفی کردن منو':
//       return ctx.reply(
//         'منو مخفی شد.\nبرای بازگشت /menu را بزنید.',
//         Markup.removeKeyboard()
//       );

//     // ===== FAQ MENU =====
//     case '🔹 سوال ۱':
//       return ctx.reply('پاسخ سوال شماره ۱ اینجاست.');

//     case '🔹 سوال ۲':
//       return ctx.reply('پاسخ سوال شماره ۲ اینجاست.');

//     case '🔙 بازگشت به منوی اصلی':
//       return ctx.reply('بازگشت به منوی اصلی:', mainMenu);

//     // ===== FALLBACK =====
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







import { Telegraf, Markup } from 'telegraf';
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// =====================
// ENV CHECK
// =====================
if (!process.env.BOT_TOKEN) throw new Error('BOT_TOKEN missing');
if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL missing');
if (!process.env.SUPABASE_ANON_KEY) throw new Error('SUPABASE_ANON_KEY missing');

// =====================
// INIT
// =====================
const bot = new Telegraf(process.env.BOT_TOKEN);
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// =====================
// HELPERS
// =====================
async function saveUser(ctx) {
  const u = ctx.from;
  await supabase.from('users').upsert({
    telegram_id: u.id,
    username: u.username,
    first_name: u.first_name,
    last_name: u.last_name,
    last_seen: new Date()
  }, { onConflict: 'telegram_id' });
}

async function getCategories(parentId = null) {
  let q = supabase
    .from('categories')
    .select('id,title')
    .eq('is_active', true)
    .order('sort_order');

  if (parentId === null) q = q.is('parent_id', null);
  else q = q.eq('parent_id', parentId);

  const { data } = await q;
  return data || [];
}

async function getQuestions(categoryId) {
  const { data } = await supabase
    .from('faq_questions')
    .select('id,title,answer')
    .eq('is_active', true)
    .eq('category_id', categoryId);

  return data || [];
}

function inlineKeyboard(items, prefix, extraButtons = []) {
  const rows = items.map(i => [
    Markup.button.callback(i.title, `${prefix}:${i.id}`)
  ]);

  extraButtons.forEach(b =>
    rows.push([Markup.button.callback(b.text, b.data)])
  );

  return Markup.inlineKeyboard(rows);
}

// =====================
// /start
// =====================
bot.start(async (ctx) => {
  await saveUser(ctx);

  const cats = await getCategories(null);
  const kb = inlineKeyboard(cats, 'CAT');

  ctx.reply('👋 خوش آمدید\nیکی از گزینه‌ها را انتخاب کنید:', kb);
});

// =====================
// CALLBACK HANDLER (CORE)
// =====================
bot.on('callback_query', async (ctx) => {
  const data = ctx.callbackQuery.data;
  const userId = ctx.from.id;

  // -------- BACK TO MAIN --------
  if (data === 'BACK:MAIN') {
    const cats = await getCategories(null);
    const kb = inlineKeyboard(cats, 'CAT');
    await ctx.editMessageText('📋 منوی اصلی:', kb);
    return ctx.answerCbQuery();
  }

  // -------- CATEGORY / SUBCATEGORY --------
  if (data.startsWith('CAT:')) {
    const categoryId = data.split(':')[1];

    const subs = await getCategories(categoryId);
    if (subs.length > 0) {
      const kb = inlineKeyboard(subs, 'CAT', [
        { text: '🔙 بازگشت', data: 'BACK:MAIN' }
      ]);

      await ctx.editMessageText('یکی را انتخاب کنید:', kb);
      return ctx.answerCbQuery();
    }

    const questions = await getQuestions(categoryId);
    if (questions.length === 0) {
      await ctx.answerCbQuery('سؤالی ثبت نشده');
      return;
    }

    const kb = inlineKeyboard(questions, 'Q', [
      { text: '🔙 بازگشت', data: 'BACK:MAIN' }
    ]);

    await ctx.editMessageText('سوالات:', kb);
    return ctx.answerCbQuery();
  }

  // -------- QUESTION --------
  if (data.startsWith('Q:')) {
    const questionId = data.split(':')[1];

    const { data: q } = await supabase
      .from('faq_questions')
      .select('answer')
      .eq('id', questionId)
      .single();

    await supabase.from('user_actions').insert({
      telegram_id: userId,
      question_id: questionId
    });

    await ctx.reply(q.answer);
    return ctx.answerCbQuery();
  }
});

// =====================
// ERROR HANDLER
// =====================
bot.catch(err => {
  console.error('Bot error:', err);
});

// =====================
// LAUNCH
// =====================
bot.launch();
console.log('Bot is running...');

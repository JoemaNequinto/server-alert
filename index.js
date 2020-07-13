import 'dotenv/config';
import pm2 from 'pm2';
import { IncomingWebhook } from '@slack/webhook';

const url = process.env.SLACK_WEBHOOK_URL;
const env = process.env.NODE_ENV;
if (!url) throw new Error('SLACK_WEBHOOK_URL not specified in .env');
if (!env) throw new Error('NODE_ENV not specified in .env');

const webhook = new IncomingWebhook(url);

/**
 * Send a slack message through incoming web hook
 */
async function sendSlackMessage(e) {
  const text = 
    e.event === 'exit' 
    ? `:x: ${e.process.name} *${env.toUpperCase()}* server crashed (${e.event}) :x:` 
    : `:seedling: ${e.process.name} *${env.toUpperCase()}* server restart (${e.event}) :seedling:`;

  await webhook.send({
    text,
  });
}

pm2.launchBus((err, bus) => {
  if (err) throw err;

  bus.on('process:event', async e => {
    if (e.manually) return;

    if (e.event === 'exit' || e.event === 'online') {
      await sendSlackMessage(e);
    }
  });

  bus.on('pm2:kill', () => {
    console.error('PM2 is being killed!');
  });
});
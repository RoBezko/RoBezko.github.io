const axios = require('axios');

// Your Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1320461959937658952/L2mQrX88Ip_tVWgHHnmPcg_haFIlnXXBIuHvcjJqtjdD9Caw4F_Lebjl0_uMQu7Rqk-h';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { location } = req.body;

    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    try {
      // Send the report to Discord
      await axios.post('https://discord.com/api/webhooks/1320461959937658952/L2mQrX88Ip_tVWgHHnmPcg_haFIlnXXBIuHvcjJqtjdD9Caw4F_Lebjl0_uMQu7Rqk-h', {
        content: `New Missing Person Report:\nLocation: ${location}`,
      });

      return res.status(200).json({ message: 'Report submitted successfully!' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to send report to Discord.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.send('No code provided');
  }

  try {
    const response = await axios.post('const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.send('No code provided');
  }

  try {
    const response = await axios.post('https://accounts.salla.sa/oauth2/token', {
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID, 7e42b932-6690-477d-aba0-a9fca78047e5
      client_secret: process.env.CLIENT_SECRET, 500e2b09edadf85df68b8b4b70dffabb60a81474007a5a32f801b825716b6c32
      redirect_uri: process.env.REDIRECT_URI,https://rexo-markitng.onrender.com/callback/
      code: code
    });

    const data = response.data;

    // 🔹 هنا تحفظ البيانات في قاعدة البيانات
    console.log('Access Token:', data.access_token);
    console.log('Refresh Token:', data.refresh_token);
    console.log('Store ID:', data.merchant);

    res.send('تم ربط المتجر بنجاح ✅');

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.send('حدث خطأ أثناء الربط ❌');
  }
});

app.listen(3000, () => console.log('Server running...'));oauth2/token', {
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
      code: code
    });

    const data = response.data;

    // 🔹 هنا تحفظ البيانات في قاعدة البيانات
    console.log('Access Token:', data.access_token);
    console.log('Refresh Token:', data.refresh_token);
    console.log('Store ID:', data.merchant);

    res.send('تم ربط المتجر بنجاح ✅');

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.send('حدث خطأ أثناء الربط ❌');
  }
});

app.listen(3000, () => console.log('Server running...'));

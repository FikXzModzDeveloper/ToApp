const express = require('express');
const axios   = require('axios');
const cors    = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/build', async (req, res) => {
  const { url, email, name } = req.body;
  const apiKey = 'bagus';
  const target = `https://web2apk-cg.zone.id/tools/web2app?apikey=${apiKey}&url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;

  try {
    const { data } = await axios.get(target, { timeout: 300000 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ status: false, message: err.message || 'Gagal membangun APK' });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Local server on port ${PORT}`));
}

module.exports = app;  

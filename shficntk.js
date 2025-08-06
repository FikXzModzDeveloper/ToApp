const express = require('express');
const cors    = require('cors');
const axios   = require('axios');
const app     = express();
const PORT    = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public')); 

app.post('/api/build', async (req, res) => {
  const { url, email, name } = req.body;
  const apiKey = 'bagus';
  const apiURL = `https://web2apk-cg.zone.id/tools/web2app?apikey=${apiKey}&url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;

  try {
    const { data } = await axios.get(apiURL, { timeout: 300000 }); 
    res.json(data); 
  } catch (err) {
    res.status(500).json({ status: false, message: err.message || 'Server Error' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

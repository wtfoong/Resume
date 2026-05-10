const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, // ← required for cookies to work cross-origin
}));
app.use(cookieParser());
app.use(express.json());
// health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api', require('./routes/index'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.json({ status: 'ok', message: 'Backend server is running' });
});

// Optional: connect to MongoDB if MONGO_URL is provided
const mongoUrl = process.env.MONGO_URL || process.env.MONGO_URI;
if (mongoUrl) {
	mongoose
		.connect(mongoUrl)
		.then(() => console.log('Connected to MongoDB'))
		.catch(err => console.error('MongoDB connection error:', err));
} else {
	console.log('No MongoDB URL provided; skipping DB connection.');
}

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

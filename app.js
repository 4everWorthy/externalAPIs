const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/search', async (req, res) => {
  const query = req.query.query;
  
  if (!query) {
    console.log('Query parameter is required');
    return res.json({ error: 'Query parameter is required' });
  }

  try {
    console.log(`Fetching data for query: ${query}`);
    const response = await axios.get(`https://api.jikan.moe/v4/anime`, {
      params: { q: query }
    });

    console.log('API response:', response.data);

    // Assuming the API returns a structure like { data: [...] }
    const results = response.data.data;

    // Format the data as needed
    const formattedResults = results.map(item => ({
      name: item.title, // Adjust according to the API response structure
      // Add more fields if needed
    }));

    console.log('Formatted results:', formattedResults);
    res.json({ results: formattedResults });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.json({ error: 'Failed to fetch data from the API. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

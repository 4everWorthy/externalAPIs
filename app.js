const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// Serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;  // Get the city parameter from the URL
    const apiKey = '36df668149msh64c7912d18b7e59p1b029ejsn6b3b543035e5';
    const apiUrl = `https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`;

    try {
        const response = await axios.get(apiUrl, {
            headers: {
                'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data from API');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

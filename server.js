const path = require('path');
const https = require('https');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname));

const apiEndPoints = {
	getTestData: 'https://www.mrsoft.by/data.json',
};

app.get('/api/test-data', (req, res) => {
	https
		.get(apiEndPoints.getTestData, (resp) => {
	  		let data = '';
		
				resp.on('data', (chunk) => data += chunk);
	  		resp.on('end', () => {
	  			try {
			  		const dataToSend = JSON.parse(data);
			  		
			  		res.status(200).send(dataToSend);
		  		} catch(err) {
	  				res.status(500).send({ err: err.message });
		  		}
			})
		})
		.on('error', (err) => res.status(500).send({ err }));
});

app.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, 'index.html'))
);


app.listen(PORT, () =>
	console.log('Server is running on port ' + PORT)
);
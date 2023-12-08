const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;
const remoteServerUrl = 'https://bpay.binanceapi.com'; // Replace with the actual remote server URL

app.use(express.json());

app.all('*', async (req, res) => {
  try {
    const { method, headers, body, originalUrl } = req;
    const remoteUrl = `${remoteServerUrl}${originalUrl}`;
    const selectedHeaders = {
      'Content-Type': headers['content-type'],
      'BinanePay-Certificate-SN': headers['BinanePay-Certificate-SN'],
      'BinancePay-Timestamp': headers['BinancePay-Timestamp'],
      'BinancePay-Nonce': headers['BinancePay-Nonce'],
      'BinancePay-Signature': headers['BinancePay-Signature'],
    };

    const remoteResponse = await axios({
      method: method.toLowerCase(),
      url: remoteUrl,
      headers: selectedHeaders,
      data: body,
    });

    res.status(remoteResponse.status).json(remoteResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

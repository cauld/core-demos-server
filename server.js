const express = require('express');
const cors = require('cors');

const port = process.env.PORT || 4000;
const app = express();
app.use(cors()); // All cors always for demo
app.use('/api', require('./routes'));

app.listen(port, () => console.log(`Demo server listening on port ${port}!`));

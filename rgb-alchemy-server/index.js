const express = require('express');
const cors = require('cors');
const app = express();

const port = 9876;

app.use(cors());

app.get('/init/user/:userId', (req, res) => {
    const userId = req.params.userId;
    res.json({
        "userId": userId,
        "width": 10,
        "height": 4,
        "maxMoves": 10,
        "target": [0,255,255]
    });
});

app.get('/init', (req, res) => {
    res.json({
        "userId": "774b31",
        "width": 10,
        "height": 4,
        "maxMoves": 8,
        "target": [0,255,255]
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});
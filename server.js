const express = require('express');
const app = express();
const APIKEY = 'a739ecf8-5d6c-443a-9ab9-1e730582aaa3';
app.get('/login',(req,res) => {
    res.send('Hello World');
});
const port = process.env.PORT || 3131;
app.listen(port,() => console.log(`Listening on port ${port}.....`));
const express = require('express');
const cors = require('cors');
const app = express();
const linkController = require('./controllers/linkController');
const userRoutes = require('./routes/userRoutes'); 
const initDb = require('./scripts/initDb'); // Import the initDb function

initDb();

app.use(cors());
app.use(express.json());

app.use('/links', linkController);
app.use('/auth', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

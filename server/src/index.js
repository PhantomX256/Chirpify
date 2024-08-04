// Importing necessary modules
import app from './app.js';

// Starting port
const port = 5000;

// Starting the server
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
});
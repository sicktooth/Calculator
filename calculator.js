import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Create __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
    res.sendFile( __dirname + "/index.html");
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/bmicalculator", /**
 * Handles the GET request for the BMI calculator page.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 *
 * @returns {undefined} - This function does not return anything.
 */
    (req, res) => {
        res.sendFile(path.join( __dirname , 'public' , "/bmicalculator.html"));
    }
);

app.post("/bmicalculator", /**
 * Calculates the BMI (Body Mass Index) and provides an interpretation based on the result.
 *
 * @param {Object} req - The request object containing the form data.
 * @param {Object} res - The response object to send the result.
 *
 * @returns {undefined} - This function does not return anything.
 */
    (req, res) => {
        var weight = Number(req.body.weight);  // Get the weight from the form data.
        var height = Number(req.body.height);  // Get the height from the form data.

        // Calculate the BMI using the formula: weight / (height * height).
        var bmi = (weight / (height * height)).toFixed(2);

        var interpretation = "";  // Initialize the interpretation string.

        // Determine the interpretation based on the BMI value.
        function getResults() {
            if (bmi < 18.5) {
            interpretation = "Your BMI is " + bmi + ", so you are underweight.";
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                interpretation = "Your BMI is " + bmi + ", so you are normal.";
            } else {
                interpretation = "Your BMI is " + bmi + ", so you are overweight.";
            }
        }
        getResults();
        
        // Send the result to the client.
        res.send(interpretation);
    }
);

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var results = num1 + num2;
    res.send("Your answer: " + results);
});

app.listen(port, () => {
    console.log('Server running on port' + port);
});

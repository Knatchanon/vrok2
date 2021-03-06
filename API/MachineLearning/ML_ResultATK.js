const readFileSync = require('fs');
const express = require('express')
const app = express()
const cors = require('cors')
const bodyparser = require( 'body-parser')
app.use(cors())
app.use(bodyparser.urlencoded({extended: true }))
app.use(bodyparser.json({ type:'*/*'}))

const util = require('util');
const fs = require('fs');
const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

// const trainingKey = "PASTE_YOUR_CUSTOM_VISION_TRAINING_SUBSCRIPTION_KEY_HERE";1
// const trainingEndpoint = "PASTE_YOUR_CUSTOM_VISION_TRAINING_ENDPOINT_HERE";
const predictionKey = "d22d4e8a21814a4cb44cba126ebba65a";
const predictionResourceId = "/subscriptions/53952dfb-8218-4d31-8adf-60d350a31c4c/resourceGroups/CustomVisionWebcasts/providers/Microsoft.CognitiveServices/accounts/CustomVisionVROK-Prediction";
const predictionEndpoint = "https://customvisionvrok-prediction.cognitiveservices.azure.com/";

//Authenticate the client
//const credentials = new msRest.ApiKeyCredentials({ inHeader: { "Training-key": trainingKey } });
//const trainer = new TrainingApi.TrainingAPIClient(credentials, trainingEndpoint);
const predictor_credentials = new msRest.ApiKeyCredentials({ inHeader: { "Prediction-key": predictionKey } });
const predictor = new PredictionApi.PredictionAPIClient(predictor_credentials, predictionEndpoint);

const publishIterationName = "Iteration4";
const setTimeoutPromise = util.promisify(setTimeout);

const testFile = fs.readFileSync(`./Picture/images.jpg`);

async function main() {
    try {
    const results = await predictor.detectImage("82841321-2493-42c9-a7f4-55bd255771fc", publishIterationName, testFile);
      console.log(results);
      console.log("------------------ Pass ------------------");
        results.predictions.forEach(predictedResult => {
        console.log(`\t ${predictedResult.tagName}: ${(predictedResult.probability * 100.0).toFixed(2)}%`);
    });
    } catch (error) {
      console.log(error);
      console.log("------------------ Error ------------------");
      console.error('Error with the request:', error);  
    }
  }
  
  main().then();
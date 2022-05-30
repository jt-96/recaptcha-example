const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Personal Secret Key
const secretKey = "***REMOVED***";

app.post('/post', async (req, res) => {

    //Checking if body is empty
    if (
        req.body.captcha === undefined ||
        req.body.captcha === "" ||
        req.body.captcha === null
    ) {
        return res.status(403).json({ msg: 'Please complete the captcha' });
    }

    //We save the result of the verification here.
    const verificationResult = await getVerification(req.body.captcha);

    //If the assessment is true, we respond to the front with this JSON.
    if (verificationResult.success) {
        res.status(200).json(verificationResult);
    } else {
        res.status(403).json({ msg: 'Failed Captcha' });
    }

})

async function getVerification(captcha) {

    //This URL is provided by Google, needs our Secret Key and the captcha from frontend.
    const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

    //Post to that URL, the response it's a JSON with the assessment and a timestamp.
    const response = await fetch(verifyURL, {method: 'POST'});
    const data = await response.json();
    // console.log(data);

    return data;
}

app.listen(3000, () => {
    console.log('Server running on port 3000.');
})
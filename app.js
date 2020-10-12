const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { error } = require("console");



const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName

                }
            }

        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us2.api.mailchimp.com/3.0/lists/e0b5aed90f";
    const options = {
        method: "POST",
        auth: "payal105:02a85db6473e26a95bead05710f2fa8d-us2"
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }
    

        response.on("data", function (data) {
            console.log(JSON.parse(data));

        });

    })

    request.write(jsonData);
    request.end();
});


app.post ("/failure", function(req, res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, function () {
    console.log("server is running in port 3000");
});


//api key
// 02a85db6473e26a95bead05710f2fa8d-us2

//unique id
// e0b5aed90f


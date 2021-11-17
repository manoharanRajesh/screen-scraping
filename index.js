const express = require('express')
const puppeteer = require("puppeteer");
const moment = require("moment");
var serveIndex = require('serve-index');
var path = require('path');
require('dotenv').config();

const app = express();
app.set('view engine', 'pug');
//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/images', express.static(path.join(__dirname, 'public', 'screenshots')))
var serveIndex = require('serve-index');
app.use('/images', serveIndex(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public')));
app.all('/capture', express.json({type: '*/*'}), (req, res) => {
    var url = req.body.pageUrl;
    if(url === undefined ||
        url.trim() === ''){
        url = process.env.DEV_PORTAL_URL;
    }
    Promise.all([captureMain(url)])
        .then(() => {
            console.log('successfully');
            res.status(200).send('successfully');
        })
        .catch(err => {
            console.log(err);
            res.status(500).send(err);
        });
    console.log('Completed');
});


const captureMain = async (url) => {
    console.log('launch capture screen');
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        console.log('open screen' + url);
        await page.goto(url);
        console.log('taking screen shot: ' + "./screenshot"+moment().format('YYYY-MM-DD-HH-mm-ss')+".png");
        await page.screenshot({ path: "./public/screenshots/screenshot"+moment().format('YYYY-MM-DD-HH-mm-ss')+".png", fullPage: true });
        await browser.close();
    } catch (e) {
        console.log(e);
    }
};

app.listen(process.env.PORT || 3000)

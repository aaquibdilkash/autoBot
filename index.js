//using puppeteer
const puppeteer = require('puppeteer-extra')

//using puppeteer-extra plugin to mimic as a human
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


//defining a scrape function to surf the webpage
let scrape = async () => {

    //setting launch options to start with
    let launchOptions = {
        headless: false //setting browser to open normally i.e. not in background
        // , executablePath: 'C://Program Files/Google/Chrome/Application/chrome.exe' //for using chrome instead of chromium
        , userDataDir: "./user_data" //telling browser to store user data so don't have to login or set something everytime
    };


    //opening browser
    var browser = await puppeteer.launch(launchOptions);

    //opening a new page
    const page = await browser.newPage();

    //navigation to webpage which we wanna surf
    await page.goto('https://www.youtube.com/watch?v=xzoKOw00RMI', {
        waitUntil: 'networkidle0',
        referer: 'https://www.google.com/'
    });

    //defining a delay function to move on to next line of code after some specified time
    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        });
    }

    //waiting for required element to load which we wanna click
    await page.waitForSelector('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > span:nth-child(2) > button').then(() => {
        page.click('#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > span:nth-child(2) > button')
    }).catch(() => {

            //catch fuction incase above page.click promise don't resolve
            page.click('#movie_player > div.ytp-cued-thumbnail-overlay > button')
        })

    //using delay function to stay on a page for a specified time
    console.log('before waiting');
    await delay(240000)
    console.log('after waiting');

    //closing browser
    await browser.close();

};


//defining a loop function to tell how many time we need to call the scrape function
async function loop() {
    for (let i = 0; i < 1; i++) {
        console.log(i + 1);

        // using await so that only one instance of browser open at a time otherwise it'll keep opening the new instances before closing the last one first
        await scrape().catch(() => {
            //incase the above promise didn't resolve
            browser.close()
        })

    }

}

// calling the loop function
loop()






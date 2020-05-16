let fs = require("fs");
let puppeteer = require('puppeteer');
// node twitterwithpup.js credentials_tweet.json "satya nadella" 10 
let cfile = process.argv[2];
let pagename = process.argv[3];
let numFollow = parseInt(process.argv[4]);

(async function () {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        slowMo: 20,
        args: ['--start-maximized', '--disable-notifications', '--incognito']
    });

    let contents = await fs.promises.readFile(cfile, 'utf-8');
    let obj = JSON.parse(contents);
    let user = obj.user;
    let pwd = obj.pwd;
    console.log(user + "-------------- useranme");

    let pages = await browser.pages();
    let page = pages[0];
    page.goto('https://www.twitter.com/login', {
        waitUntil: 'networkidle2'
    });

    await page.waitForSelector('.r-30o5oe.r-1niwhzg.r-17gur6a.r-1yadl64.r-deolkf.r-homxoj.r-poiln3.r-7cikom.r-1ny4l3l.r-1inuy60.r-utggzx.r-vmopo1.r-1w50u8q.r-1swcuj1.r-1dz5y72.r-1ttztb7.r-13qz1uu', {
        visible: true
    });
    // name="session[username_or_email]"
    
    await page.type('[name="session[username_or_email]"]',user);
    await page.type('[name="session[password]"]',pwd);
    await page.click('[data-testid="LoginForm_Login_Button"]');

    // viewBox="0 0 24 24"
    await page.waitForSelector('[aria-label="Search and explore"]', {
        visible: true
    });
    await page.click('[aria-label="Search and explore"]');

    // aria-label="Search query"
    await page.waitForSelector('[aria-label="Search query"]', {
        visible: true
    });
    await page.type('[aria-label="Search query"]',pagename);
    await page.keyboard.press("Enter")

    await page.waitForSelector('[href="/satyanadella"]', {
        visible: true
    });
    await page.click('[href="/satyanadella"]');

    
    await page.waitForSelector('[href="/satyanadella/following"]', {
        visible: true
    });
    await page.click('[href="/satyanadella/following"]');


    await page.waitForSelector('[class="css-1dbjc4n r-yfoy6g r-18bvks7 r-1ljd8xs r-13l2t4g r-1phboty r-1jgb5lz r-11wrixw r-61z16t r-1ye8kvj r-13qz1uu r-184en5c"] [class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vsu8ta r-aj3cln r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]')
    // await page.waitForSelector('[class="css-901oao css-16my406 css-bfa6kz r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]')
    // await page.waitForSelector('[class="css-1dbjc4n r-1ila09b r-qklmqi r-1adg3ll"]')
    
    let idx = 0;
    do{
        
        // let elements = await page.$$('[class="css-1dbjc4n r-1ila09b r-qklmqi r-1adg3ll"]')
        // let elements = await page.$$('[class="css-1dbjc4n r-yfoy6g r-18bvks7 r-1ljd8xs r-13l2t4g r-1phboty r-1jgb5lz r-11wrixw r-61z16t r-1ye8kvj r-13qz1uu r-184en5c"] [class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vsu8ta r-aj3cln r-1fneopy r-o7ynqc r-6416eg r-lrvibr"] [class="css-901oao r-1awozwy r-13gxpu9 r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-vw2c0b r-1777fci r-eljoum r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0"]')
        let elements = await page.$$('[class="css-1dbjc4n r-yfoy6g r-18bvks7 r-1ljd8xs r-13l2t4g r-1phboty r-1jgb5lz r-11wrixw r-61z16t r-1ye8kvj r-13qz1uu r-184en5c"] [class="css-18t94o4 css-1dbjc4n r-1niwhzg r-p1n3y5 r-sdzlij r-1phboty r-rs99b7 r-1w2pmg r-1vsu8ta r-aj3cln r-1fneopy r-o7ynqc r-6416eg r-lrvibr"]')
        console.log(elements.length + elements[0])
        await elements[idx].click();
        // await serveElement(elements[idx],page)
        idx++;
        await page.waitForSelector('.css-1dbjc4n.r-1omma8c',{
            hidden:true
        })
    }while(idx<numFollow)


})();
async function serveElement(el,page){
    
    
    let toClick = await el.$('[class="css-901oao r-1awozwy r-13gxpu9 r-6koalj r-18u37iz r-16y2uox r-1qd0xha r-a023e6 r-vw2c0b r-1777fci r-eljoum r-dnmrzs r-bcqeeo r-q4m81j r-qvutc0"]');
    // let toClick = await el.$('[class="css-901oao css-16my406 css-bfa6kz r-1qd0xha r-ad9z0x r-bcqeeo r-qvutc0"]');
    
    await toClick.click();
}
let puppeteer = require("puppeteer");
let fs = require("fs");
let file = process.argv[2];
let search = process.argv[3];
let message = process.argv[4];
let msg = process.argv[5];
let song = process.argv[6];

(async function () {
    try {
        let data = await fs.promises.readFile(file);
        let { password, id, pwd } = JSON.parse(data);
        let browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized", "--disable-notifications"]
        })
        // load pages
        let tabs = await browser.pages()
        let insta = tabs[0]
        let yt = await browser.newPage()

        //  SAVAN

        await yt.goto("https://www.jiosaavn.com/")
        await yt.waitFor(1000)
        await yt.waitForSelector(".text.typeahead.tt-input")
        await yt.click(".text.typeahead.tt-input")
        await yt.type(".text.typeahead.tt-input", song, { delay : 120 })
        await yt.waitFor(1500)
        await yt.keyboard.press('ArrowDown');
        await yt.keyboard.press('ArrowDown');
        await yt.keyboard.press('Enter');
        await yt.waitFor(1500)
        // play song
        await yt.evaluate(()=>document.querySelector("[title='Play Now']").click())
        // await yt.waitForSelector("[title='Play Now']");
        // let eles = await yt.$$("[title='Play Now']")
        // let ele = eles[0]
        // await ele.click({ delay : 100 })
        await yt.waitFor(10000)
        // pause song
        await yt.evaluate(()=>document.querySelector("[title='Play Now']").click())
        // take screenshot and copy link
        await yt.screenshot({ path: './image.jpg', type: 'jpeg' })
        let link = yt.url();
        await yt.waitFor(5000)
        await yt.close()

        // await yt.screenshot({ path: './image.jpg', type: 'jpeg' })
        // await wiki.waitForSelector(".wyq.Hsu.tBJ.dyH.iFc.yTZ.L4E.unP.iyn.Pve.pBj.qJc.aKM.xD34", { waitUntil : "networkidle2" })
        // await wiki.type(".wyq.Hsu.tBJ.dyH.iFc.yTZ.L4E.unP.iyn.Pve.pBj.qJc.aKM.xD34", id, { delay: 120 })
        // await wiki.waitForSelector(".wyq.Hsu.tBJ.dyH.iFc.yTZ.L4E.unP.iyn.Pve.pBj.qJc.aKM.xD4")
        // await wiki.type(".wyq.Hsu.tBJ.dyH.iFc.yTZ.L4E.unP.iyn.Pve.pBj.qJc.aKM.xD4", pwd, { delay: 120 })
        // await wiki.click(".red.SignupButton.active")
        // await wiki.waitForNavigation({ waitUntil: "networkidle2" })
        // await wiki.waitFor(3000)
        
        // INSTAGRAM

        await insta.goto("https://www.instagram.com/")
        // input userid
        await insta.waitForSelector("[name='username']")
        await insta.type("[name='username']", id, { delay: 120 })
        // input pwd
        await insta.waitForSelector("[name='password']")
        await insta.type("[name='password']", password, { delay: 120 })
        // click login
        await insta.click(".sqdOP.L3NKy.y3zKF")
        await insta.waitForNavigation({ waitUntil: "networkidle2" })
        // search
        await insta.click(".XTCLo.x3qfX")
        await insta.type(".XTCLo.x3qfX", search, { delay: 120 })
        await insta.waitFor(2000)
        await insta.keyboard.press('ArrowDown');
        await insta.keyboard.press('Enter');
        await insta.waitForNavigation({ waitUntil: "networkidle2" })
        // scroll profile
        await insta.waitFor(3000)
        await autoScroll(insta)
        // follow
        await insta.waitFor(3000)
        await insta.click("._5f5mN.jIbKX._6VtSN.yZn4P", { waitUntil : "networkidle2" })
        // await insta.click("[aria-label='Add Photo or Video']", { waitUntil : "networkidle2" })
        
        // message
        await insta.waitFor(3000)
        await insta.click(".fAR91.sqdOP.L3NKy._4pI4F._8A5w5", { waitUntil: "networkidle2" })
        await insta.waitForNavigation({ waitUntil: "networkidle2" })
        await insta.waitForSelector(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi")
        await insta.click(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi")
        await insta.type(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi", message, { delay: 120 })
        await insta.waitFor(1000)
        await insta.keyboard.press('Enter');
        await insta.waitForSelector(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi", { waitUntil: "networkidle2" } )
        await insta.click(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi")
        await insta.type(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi", msg, { delay: 120 })
        await insta.waitFor(1000)
        await insta.keyboard.press('Enter');
        await insta.waitForSelector(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi", { waitUntil: "networkidle2" } )
        await insta.click(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi")
        await insta.type(".Igw0E.IwRSH.eGOV_.vwCYk.ItkAi", link, { delay : 60})
        await insta.waitFor(1000)
        await insta.keyboard.press('Enter');
        await insta.waitFor(5000);
        //  go to home
        await insta.click("[aria-label='Home']")
        await insta.waitFor(2000)
        //  select settings
        await insta.waitForSelector(".Fifk5 ._2dbep.qNELH.kIKUG")
        await insta.click(".Fifk5 ._2dbep.qNELH.kIKUG")
        await insta.waitForNavigation({ waitUntil: "networkidle2" })
        await insta.click(".wpO6b")
        await insta.waitFor(2000)
        // logout
        await insta.waitForSelector(".aOOlW.HoLwm");
        let elements = await insta.$$(".aOOlW.HoLwm")
        let element = elements[8]
        await element.click({ delay : 100 })
        // close page
        await insta.waitFor(3000)
        await insta.close()

    } catch (err) {
        console.log(err)
    }
})()

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 300);
        });
    });
}
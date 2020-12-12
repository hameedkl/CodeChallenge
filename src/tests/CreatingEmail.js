const chromeDriver = require("../drivers/chrome");

const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

const getElementById = async (driver, id, timeout = 2000) => {
 const el = await driver.wait (until.elementLocated(By.id(id)), timeout);
 return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 2000) => {
 const el = await driver.wait (until.elementLocated(By.name(name)), timeout);
 return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 5000) => {
 const el = await driver.wait (until.elementLocated(By.xpath(xpath)), timeout);
 return await driver.wait(until.elementIsVisible(el), timeout);
};




describe("Aura Code Challenge - Create User Account Tests", () => {
  let driver;

  beforeAll(() => {
    driver = chromeDriver();
  });

 // afterAll(async () => {
 //   await driver.quit();
 // });


  test("Test 1: Load Home page", async () => {
    await driver.get("http://automationpractice.com/index.php?controller=authentication&back=my-account");
    const title = await driver.getTitle();
    expect(title).toBe("Login - My Store");
  });




  test("Test 2: Entering Value in Email field", async () => {
    const emailAddress = await getElementById(driver, 'email_create');
     await emailAddress.clear();
    //await emailAddress.sendKeys("Hameed_kl@rediffmail.com");
	await emailAddress.sendKeys("abc143@gmail.com");
  });

// working test 2

test("Test 3: Clicking Create an account link ", async () => {
    const btnCrtAcc = await getElementById(driver, 'SubmitCreate');
     await btnCrtAcc.click();

const txtSubHeading = await getElementByXpath(driver, '//html/body/div/div[2]/div/div[3]/div/div/form/div[1]/h3');
 const txtSubHeadingValue = await txtSubHeading.getText();

expect(txtSubHeadingValue ).toBe("YOUR PERSONAL INFORMATION");
// for blank or invalid email address message is : Invalid email address.
// for already existing address message is : An account using this email address has already been registered. Please enter a valid password or request a new // one.
  });


});

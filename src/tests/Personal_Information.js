const chromeDriver = require("../drivers/chrome");
const { until } = require('selenium-webdriver');
const { By } = require('selenium-webdriver');

const getElementById = async (driver, id, timeout = 4000) => {
  const el = await driver.wait (until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByName = async (driver, name, timeout = 4000) => {
  const el = await driver.wait (until.elementLocated(By.name(name)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

const getElementByXpath = async (driver, xpath, timeout = 5000) => {
  const el = await driver.wait (until.elementLocated(By.xpath(xpath)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};


const fillAllFields = async (driver) => {

  const fName = await getElementById(driver, 'customer_firstname');
  await fName.clear();
  await fName.sendKeys("Abc");

  const lName = await getElementById(driver, 'customer_lastname');
  await lName.clear();
  await lName.sendKeys("pqr");

  const pwd = await getElementById(driver, 'passwd');
  await pwd.clear();
  await pwd.sendKeys("pqr$1234");

  const add1 = await getElementById(driver, 'address1');
  await add1.clear();
  await add1.sendKeys("Broad shaw road");

  const city = await getElementById(driver, 'city');
  await city.clear();
  await city.sendKeys("Bangalore");

  const pc = await getElementById(driver, 'postcode');
  await pc.clear();
  await pc.sendKeys("11111");

  const pm = await getElementById(driver, 'phone_mobile');
  await pm.clear();
  await pm.sendKeys("9876543211");

};



describe("Aura Code Challenge - Test Suite for Personal Information functionality", () => {
  let driver;

  beforeAll(() => {
    driver = chromeDriver();


  });

  afterAll(async () => {
    await driver.quit();
  });

  test("Test 1: Set Application State by loading required page", async () => {
    await driver.get("http://automationpractice.com/index.php?controller=authentication&back=my-account");
    const emailAddress = await getElementById(driver, 'email_create');
    await emailAddress.clear();
    await emailAddress.sendKeys("abc143@gmail.com");
    const btnCrtAcc = await getElementById(driver, 'SubmitCreate');
    await btnCrtAcc.click();

  });



  test("Test 2: Registering Without State", async() => {


    await fillAllFields (driver);
    const btnSbtAcc = await getElementById(driver, 'submitAccount');
    await btnSbtAcc.click();
    const errMsg = await getElementByXpath(driver, '//html/body/div/div[2]/div/div[3]/div/div/ol/li');
    const msgActual = await errMsg.getText();

    expect(msgActual ).toBe("This country requires you to choose a State.");

  });


});

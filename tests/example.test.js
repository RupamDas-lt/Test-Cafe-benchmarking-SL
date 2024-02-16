// This test is from TestCafe example
// https://github.com/DevExpress/testcafe-examples/tree/8f4a2e3556d410d8ffe865bf06b9b887b79b7d0e/examples/change-element-style
import { ClientFunction, Selector } from 'testcafe';

// fixture `Change Element Style`
//     .page `https://devexpress.github.io/testcafe/example`;

// test('Hide an element', async t => {
//     const populateButton     = Selector('#populate');
//     const hidePopulateButton = ClientFunction(() => {
//         document.getElementById('populate').style.display = 'none';
//     });

//     await t.expect(populateButton.visible).ok();

//     await hidePopulateButton();

//     await t.expect(populateButton.visible).notOk();
// });

// test('Change header color', async t => {
//     const header            = Selector('h1');
//     const removeHeaderColor = ClientFunction(() => {
//         document.querySelector('h1').style.color = '#111';
//     });

//     await t.expect(header.getStyleProperty('color')).eql('rgb(47, 164, 207)');

//     await removeHeaderColor();

//     await t.expect(header.getStyleProperty('color')).eql('rgb(17, 17, 17)');
// });

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const filePath = path.join("/Users/rupamd/testcafe-sample/", 'times.txt');
function appendStringToFile(filePath, stringToAppend) {
  fs.appendFile(filePath, stringToAppend, (err) => {
      if (err) {
          console.error('Error appending to the file:', err);
          return;
      }
      console.log('String appended successfully or file created if it did not exist.');
  });
}

let startTime, endTime = 0;
let driverSetupStart,driverSetupEnd = 0;
let testExecutionStart = 0;
let testExecutionEnd = 0;

startTime = new Date();
driverSetupStart = new Date();

const label = Selector('label');

class Feature {
    constructor (text) {
        this.label    = label.withText(text);
        this.checkbox = this.label.find('input[type=checkbox]');
    }
}

let nameInput             = Selector('#developer-name');
let triedTestCafeCheckbox = Selector('#tried-test-cafe');
let populateButton        = Selector('#populate');
let submitButton          = Selector('#submit-button');
let results               = Selector('.result-content');
let macOSRadioButton      = Selector('input[type=radio][value=MacOS]');
let commentsTextArea      = Selector('#comments');

let featureList = [
    new Feature('Support for testing on remote devices'),
    new Feature('Re-using existing JavaScript code for testing'),
    new Feature('Easy embedding into a Continuous integration system')
];

let slider = {
    handle: Selector('.ui-slider-handle'),
    tick:   Selector('.slider-value')
};

let interfaceSelect       = Selector('#preferred-interface');
let interfaceSelectOption = interfaceSelect.find('option');
let userNameInputHA       = Selector('[id=username]');
let passInputHA           = Selector('[id=password]');
let loginButtonHA         = Selector('[type=submit]');
let loginSuccessHeaderHA  = Selector('#flash');
let checkbox1HA           = Selector('#checkboxes>input:nth-of-type(1)');
let checkbox2HA           = Selector('#checkboxes>input:nth-of-type(2)');

fixture `A set of examples that illustrate how to use TestCafe API`
    .page `https://devexpress.github.io/testcafe/example/`;

// Tests
test('Small test', async t => {
    await t
        .getCookies();
    driverSetupEnd = new Date();
    testExecutionStart = new Date();
    let setuptime = (driverSetupEnd.getTime() - driverSetupStart.getTime()) / 1000;
    console.log("First command finished in: ",driverSetupEnd.getTime());
    console.log("Driver setup time is: ",setuptime);
    global.globalJsonObject = { setuptime: setuptime };
});


test('Text typing basics', async t => {

    await t
        .typeText(nameInput, 'Peter') // Type name
        .typeText(nameInput, 'Paker', { replace: true }) // Replace with last name
        .typeText(nameInput, 'r', { caretPos: 2 }) // Correct last name
        .expect(nameInput.value).eql('Parker'); // Check result
});

test('Click an array of labels and then check their states', async t => {
    for (const feature of featureList) {
        await t
            .click(feature.label)
            .expect(feature.checkbox.checked).ok();
    }
});

test('Dealing with text using keyboard', async t => {
    await t
        .typeText(nameInput, 'Peter Parker') // Type name
        .click(nameInput, { caretPos: 5 }) // Move caret position
        .pressKey('backspace') // Erase a character
        .expect(nameInput.value).eql('Pete Parker') // Check result
        .pressKey('home right . delete delete delete') // Pick even shorter form for name
        .expect(nameInput.value).eql('P. Parker'); // Check result
});

test('Moving the slider', async t => {
    const initialOffset = await slider.handle.offsetLeft;

    await t
        .click(triedTestCafeCheckbox)
        .dragToElement(slider.handle, slider.tick.withText('9'));
        // .expect(page.slider.handle.offsetLeft).gt(initialOffset);
});


test('Dealing with text using selection', async t => {
    await t
        .typeText(nameInput, 'Test Cafe')
        .selectText(nameInput, 7, 1)
        .pressKey('delete');
        // .expect(page.nameInput.value).eql('Tfe'); // Check result
});

test('Handle native confirmation dialog', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click(populateButton);

    const dialogHistory = await t.getNativeDialogHistory();

    await t.expect(dialogHistory[0].text).eql('Reset information before proceeding?');

    await t
        .click(submitButton)
        .expect(results.innerText).contains('Peter Parker');
});

test('Pick option from select', async t => {
    await t
        .click(interfaceSelect)
        .click(interfaceSelectOption.withText('Both'))
        .expect(interfaceSelect.value).eql('Both');
});

test('Filling a form', async t => {
    // Fill some basic fields
    await t
        .typeText(nameInput, 'Bruce Wayne')
        .click(macOSRadioButton)
        .click(triedTestCafeCheckbox);

    // Let's leave a comment...
    await t
        .typeText(commentsTextArea, "It's...")
        .wait(500)
        .typeText(commentsTextArea, '\ngood');

    // I guess, I've changed my mind
    await t
        .wait(500)
        .selectTextAreaContent(commentsTextArea, 1, 0)
        .pressKey('delete')
        .typeText(commentsTextArea, 'awesome!!!');

    // Let's submit our form
    await t
        .wait(500)
        .click(submitButton);
        // .expect(results.innerText).contains('Bruce Wayne');
});


fixture `2nd webpage`
    .page `https://the-internet.herokuapp.com/login`;


test('Open Internet Heroku APP Login Page', async t => {
    await t
        .click(userNameInputHA)
        .typeText(userNameInputHA, 'tomsmith')
        .click(passInputHA)
        .typeText(passInputHA, 'SuperSecretPassword!')
        .click(loginButtonHA);
        // .expect(loginSuccessHeaderHA.value).contains('logged into a secure area'); // Check result
});

test('Open Internet Heroku APP Login Page for 2nd time', async t => {
    await t
        .click(userNameInputHA)
        .typeText(userNameInputHA, 'tomsmith')
        .click(passInputHA)
        .typeText(passInputHA, 'SuperSecretPassword!')
        .click(loginButtonHA);
        // .expect(loginSuccessHeaderHA.value).contains('logged into a secure area'); // Check result
});

fixture `3rd webpage`
    .page `https://the-internet.herokuapp.com/checkboxes`;

test('Open Internet Heroku APP Check boxes', async t => {
    await t
        .click(checkbox1HA)
        .wait(1800)
        .click(checkbox2HA)
        .wait(1800)
        .click(checkbox1HA)
        .wait(1800)
        .click(checkbox2HA)
        .wait(1800)
        .click(checkbox1HA)
        .wait(1800)
        .click(checkbox2HA)
        .wait(1800);
});

test('Open Internet Heroku APP Check boxes 2nd time', async t => {
    await t
        .click(checkbox1HA)
        .wait(1800)
        .click(checkbox2HA)
        .wait(1800)
        .click(checkbox1HA)
        .wait(1800)
        .click(checkbox2HA)
        .wait(1800)
        .click(checkbox1HA)
        .wait(1800)
        .click(checkbox2HA)
        .wait(1800);
    endTime = new Date();
    const seconds = (endTime.getTime() - testExecutionStart.getTime()) / 1000;
    console.log("Test Execution time:  ", seconds);
    let startTimeString = "Test Execution time: "+String(seconds);
    // appendStringToFile(filePath, startTimeString);    


    global.globalJsonObject.executionTime = seconds;
    global.globalJsonObject.buildName = 'Testcafe_Sample_build_SL';
    console.log(global.globalJsonObject);

    (async () => {
        try{
            const uri = 'https://endpoint4.collection.sumologic.com/receiver/v1/http/ZaVnC4dhaV1cpd9ZEWxreFfcRJfASW7-kRZSAa2s36JCq6g1B0qRlSaqzhHJlPsJvl7UXIT_qhwXy-ICJbiGwyt2AuNbRouTzhXurWMLQXTHa8Em8nKkRw==';
            const body = global.globalJsonObject;
            const headers = null;
            const expectedStatusCode = 200;
            const response = await pushDataToSumo(uri, body, headers, expectedStatusCode);
            console.log('Response body: ', response.body);
        }catch(error){
            console.error('An error occurred while pushing data to Sumo:', error);
        }
    })();
});

async function pushDataToSumo(uri, body, headers, expectedStatusCode) {
    try {
      // Perform the PUT request using Axios
      const response = await axios.put(uri, body, { headers });
  
      // Check if the response status matches the expected status code
      if (response.status === expectedStatusCode) {
        console.log(`Request successful with status code: ${response.status}`);
      } else {
        console.error(`Expected status code ${expectedStatusCode}, but got ${response.status}`);
      }
  
      // Return the response for further processing or verification
      return response;
    } catch (error) {
      // Handle errors, including cases where the server responds with a status code outside the 2xx range
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`Server responded with status code ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response was received');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
      }
  
      throw error; // Rethrow the error for further handling if necessary
    }
  }
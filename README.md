# saucectl testcafe example

Example running saucectl with testcafe.

**Note**: If all you want is to publish your TestCafe test results to Sauce Labs (but not run on Sauce Labs), please check out our [TestCafe reporter](https://github.com/saucelabs/testcafe-reporter)!

## What You'll Need

The steps below illustrate one of the quickest ways to get set up. If you'd like a more in-depth guide, please check out
our [documentation](https://docs.saucelabs.com/dev/cli/saucectl/#installing-saucectl).

### Install `saucectl`

```shell
npm install -g saucectl
```

### Set Your Sauce Labs Credentials

```shell
saucectl configure
```

## Running The Examples

Simply check out this repo and run the command below :rocket:

```shell
saucectl run
```

![running example](assets/testcafe-example.gif)

## The Config

[Follow me](.sauce/config.yml) if you'd like to see how saucectl is configured for this repository. 

Our IDE Integrations (e.g. [Visual Studio Code](https://docs.saucelabs.com/dev/cli/saucectl/usage/ide/vscode/)) can help you out by validating the YAML files and provide handy suggestions, so make sure to check them out!

## Alternative

As an alternative solution, you can use TestCafe's [Sauce Labs provider](https://github.com/DevExpress/testcafe-browser-provider-saucelabs).

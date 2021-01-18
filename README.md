# EisBuk

## Booking management for ice skating lessons

## Enabling alpha auth emulation

Make sure you have the latest firebase-tools installed (>=8.11.0)

    firebase --version
    8.12.0

Enable the expreimental auth emulator:

    firebase --open-sesame authemulator

## Working locally on eisbuk-admin

Enter the eisbuk-admin directory:

    cd eisbuk-admin

# Important (for the http functions to work)

Make sure you set the name of your firebase project:

    npx firebase use eisbuk-e6b2a

Start the firebase emulators:

    firebase emulators:start --inspect-functions 9229

The `--inspect-functions` allows you to connect with a debugger, for instance chrome from chrome://inspect/#devices or from the VSCode debugger.

Start the webpack development server as usual:

    yarn start

Head your browser to http://localhost:3000/debug and click the "Create admin test users" button.

## Create new React components

We use [PLOP](https://plopjs.com/) to scaffold components.
For easy access, install plop globally:

    npm install -g plop

Then `cd` into `eisbuk-admin` directory and create new component(s) with (guess what):

    plop

## Deploying

make sure you have the firebase client installed:

    npm install -g firebase

and login:

    firebase login

To deploy assets you can run:

    make deploy-site

To run tests for functions run:

    make test-functions

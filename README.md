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

Start the firebase emulators:

    firebase emulators:start --inspect-functions 9229

The `--inspect-functions` allows you to connect with a debugger, for instance chrome from chrome://inspect/#devices or from the VSCode debugger.

Start the webpack development server as usual:

    yarn start

Head your browser to http://localhost:3000/debug and click the "Create admin test users" button.

## Deploying

make sure you have the firebase client installed:

    npm install -g firebase

and login:

    firebase login

To deploy assets you can run:

    make deploy-site

To run tests for functions run:

    make test-functions

# EisBuk

## Booking management for ice skating lessons

## Enabling alpha auth emulation

Make sure you have the latest firebase-tools installed (>=8.11.0)

    firebase --version
    8.12.0

Enable the expreimental auth emulator:

    firebase --open-sesame authemulator

## Deploying

make sure you have the firebase client installed:

    npm install -g firebase

and login:

    firebase login

To deploy assets you can run:

    make deploy-site

To run tests for functions run:

    make test-functions

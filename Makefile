.PHONY: build deploy-site test-functions help

build: eisbuk-admin/public/index.html ## Build the react admin app

eisbuk-admin/public/index.html: $(wildcard eisbuk-admin/src/**/*)
	cd eisbuk-admin/ && yarn build

deploy-site:
	rm -rf firebase/public && cp -r eisbuk-admin/build firebase/public
	cd firebase && firebase deploy --only hosting

test-functions: firebase/functions/node_modules/mocha/bin/mocha
	cd firebase && firebase emulators:exec --only database "functions/node_modules/mocha/bin/mocha functions/test/customers.js"

firebase/functions/node_modules/mocha/bin/mocha: firebase/functions/package.json firebase/functions/package-lock.json
	# For some reason the mocha/bin/mocha file has a date in 1985
	cd firebase/functions && npm install && touch node_modules/mocha/bin/mocha

help: ## display this help message
	@echo "Please use \`make <target>' where <target> is one of"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | sort | awk -F ':.*?## ' 'NF==2 {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'

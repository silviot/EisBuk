build: eisbuk-admin/public/index.html ## Build the react admin app

eisbuk-admin/public/index.html: $(wildcard eisbuk-admin/src/**/*)
	cd eisbuk-admin/ && yarn build

deploy-site:
	rm -rf firebase/public && cp -r eisbuk-admin/build firebase/public
	cd firebase && firebase deploy --only hosting

help: ## display this help message
	@echo "Please use \`make <target>' where <target> is one of"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | sort | awk -F ':.*?## ' 'NF==2 {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'

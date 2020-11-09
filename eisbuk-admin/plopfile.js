module.exports = function (plop) {
    // create your generators here
    plop.setGenerator('component', {
        description: 'Create component',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'Component name'
        },{
            // Raw text input
            type: "confirm",
            // Variable name for this input
            name: "isMUI",
            // Prompt to display on command line
            message: "Is it a MaterialUI component?",
        },
        {
            // Raw text input
            type: "confirm",
            // Variable name for this input
            name: "isParent",
            // Prompt to display on command line
            message: "Is it a parent component? (If yes, it will be wrapped in a component folder)",
        }],
        actions: (data) => {
            if (data.isParent) {
                return [{
                    type: 'add',
                    path: 'src/components/{{name}}/{{pascalCase name}}.js',
                    templateFile: data.isMUI ? 'plop-templates/MUIComponent.js.hbs' : 'plop-templates/Component.js.hbs'
                },{
                    type: 'add',
                    path: 'src/components/{{name}}/index.js',
                    templateFile: 'plop-templates/ComponentIndex.js.hbs'
                }]
            }
            else {
                return [{
                    type: 'add',
                    path: 'src/components/{{pascalCase name}}.js',
                    templateFile: data.isMUI ? 'plop-templates/MUIComponent.js.hbs' : 'plop-templates/Component.js.hbs'
                }]
            }
        }
    })
};

module.exports = function (plop) {
  plop.setGenerator('module', {
    description: 'Create a Module',
    prompts: [{
      type: 'input',
      name: 'name',
      message: 'Module name please'
    }],
    actions: [
      {
        type: 'add',
        path: '../../components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.hbs'
      },
      {
        type: 'add',
        path: '../../components/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.hbs'
      }
    ]
  })
}

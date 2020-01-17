var Generator = require('yeoman-generator');

module.exports = class extends Generator {
      // note: arguments and options should be defined in the constructor.
    constructor(args, opts) {
        super(args, opts);

        // This makes `appname` a required argument.
        this.argument("component", { type: String, required: false });
        this.name = this.options.component;
    }

    async prompting() {
        if (this.options.component) {
            this.log(this.options.component)
            return;
        }

        this.answers = await this.prompt([
          {
            type: "input",
            name: "name",
            message: "Your component name",
            default: this.appname // Default to current folder name
          },
        //   {
        //     type: "confirm",
        //     name: "cool",
        //     message: "Would you like to enable the Cool feature?"
        //   }
        ]);

        this.name = this.answers.name;
      }
      
      writing() {
        this.fs.copyTpl(
          this.templatePath('component.html'),
          this.destinationPath(`${this.name}/${this.name}.tsx`),
          { title: this.name }
        );

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath(`${this.name}/index.ts`),
            { title: this.name }
          );

        this.log('Wrote')
      }
};

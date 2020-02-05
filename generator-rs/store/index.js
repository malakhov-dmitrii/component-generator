var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // note: arguments and options should be defined in the constructor.
    constructor(args, opts) {
        super(args, opts);

        // This makes `appname` a required argument.
        this.argument("component", {type: String, required: false});
        this.argument("async", {type: String, required: false});
        this.name = this.options.component;
        this.async = this.options.async;
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
                message: "Your store entity name",
                default: "Test" // Default to current folder name
            },
            {
                type: "confirm",
                name: "async",
                message: "Do you need to use side-effects?"
            }
        ]);

        this.name = this.answers.name;
        this.async = this.answers.async;
    }

    writing() {
        const n = capitalize(this.name);

        this.fs.copyTpl(
            this.templatePath('actions.html'),
            this.destinationPath(`${n}/${n}.actions.ts`),
            {title: n}
        );

        this.fs.copyTpl(
            this.templatePath('reducer.html'),
            this.destinationPath(`${n}/${n}.reducer.ts`),
            {title: n}
        );

        if (this.async) {
            this.fs.copyTpl(
                this.templatePath('effects.html'),
                this.destinationPath(`${n}/${n}.effect.ts`),
                {title: n}
            );

            this.fs.copyTpl(
                this.templatePath('service.html'),
                this.destinationPath(`${n}/${n}.service.ts`),
                {title: n}
            );
        }

    }
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
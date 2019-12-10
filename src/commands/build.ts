import { Command, flags } from '@oclif/command';

export default class Build extends Command {
    static description = 'Creata a new tapjaw project';

    static examples = ['$ tapjaw build'];

    static flags = {
        help: flags.help({ char: 'h' })
    };

    static args = [
        // {
        //     name: 'country',
        //     default: '',
        //     description: 'Filter vouchers by ISO-3122 Alpha-2 country code.'
        // }
    ];

    async run() {
        // @ts-ignore
        const { args, flags } = this.parse(Build);

        this.log('hi');
    }
}

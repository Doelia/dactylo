export class Input {

    constructor() {
        this.callback = function() {};

        var stdin = process.openStdin();
        var stdin = process.stdin;

        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding('utf8');

        var that = this;
        stdin.on('data', function(key) {
            if (key === '\u0003') { // Ctrl + C
                process.exit();
            }
            that.callback(key);
        });

    }

    onKey(f) {
        this.callback = f;
    }
}

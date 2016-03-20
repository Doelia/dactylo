var colors = require('colors');

class Dactylo {


    constructor() {
        this.text = `
        On parle de suggestion. C'en est là de la plus naturelle et de la plus croyable.
        Je me méfie un peu, malgré tout, de celle qui est préparée dans les cliniques.
        Mais qu'un être chez qui la volonté est morte obéisse à toutes les excitations extérieures,
        c'est une vérité que la raison admet et que démontre l'expérience. L'exemple que vous
        en apportez m'en rappelle un autre assez analogue. C'est celui de mon malheureux camarade
        Alexandre Le Mansel. Un vers de Sophocle tua votre héroïne. Une phrase de Lampride perdit l'ami...
        `

        this.cursor = 0;
    }

    startListen() {
        var stdin = process.openStdin();
        var stdin = process.stdin;

        stdin.setRawMode(true);
        stdin.resume();
        stdin.setEncoding( 'utf8' );

        var that = this;
        stdin.on( 'data', function( key ){
            if ( key === '\u0003' ) {
                process.exit();
            }
            that.onType(key);
        });
    }

    onType(character) {
        var c = this.text.charAt(this.cursor);
        console.log("Need "+c);
        if (c == '\r' || c == '\n'| c == '\t') {
            this.cursor++;
            this.onType(character);
            return;
        }
        if (c == character) {
            this.cursor++;
        }
        this.displayText();
    }

    displayText() {
        for (var i = 0; i < this.text.length; i++) {
            var c = this.text[i];
            if (i < this.cursor) {
                process.stdout.write(c.green);
            } else {
                process.stdout.write(c);
            }
        }
    }
}

var d = new Dactylo();
//d.displayText();
d.startListen();

var colors = require('colors');
var util = require('util');
var exec = require('child_process').exec;

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
        this.badCpt = 0;

        this.displayText();
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
        if (character == 'z') {
            this.badCpt--;
            this.displayText();
            return;
        }
        if (c == '\r' || c == '\n'| c == '\t') {
            this.cursor++;
            this.onType(character);
            return;
        }
        if (c == character && this.badCpt == this.cursor) {
            this.cursor++;
            this.badCpt = this.cursor;
        } else {
            this.badCpt++;
        }
        this.displayText();
    }

    displayText() {
        'use strict';
        var out = "";

        process.stdout.write('\x1B[2J');
        for (var i = 0; i < this.text.length; i++) {
            var c = this.text[i];
            if (i == this.cursor && i == this.badCpt) {
                out += c.green;
            } else if (i == this.badCpt) {
                out += c.red;
            } else if (i < this.cursor) {
                out += c.yellow;
            } else {
                out += c;
            }
        }

        out += '\n\nActual char : '+this.cursor;
        out += '\n\nRed cursor : '+this.badCpt;
        out += '\n';

        process.stdout.write(out);
    }
}

var d = new Dactylo();
//d.displayText();
d.startListen();

var colors = require('colors');
var util = require('util');
var exec = require('child_process').exec;
import {Text} from './text';
import {Timer} from './timer';
import {Input} from './input';

class Dactylo {

    constructor() {
        this.text = Text.buildRadom();
        this.cursor = 0;
        this.badCpt = 0;
        this.timer = new Timer();
    }

    startListen() {
        var input = new Input();
        var that = this;
        input.onKey(function(i) { that.onType(i) });
    }

    onType(character) {
        if (!this.timer.isStarted() && this.cursor > 0) {
            this.timer.startTimer();
        }

        var c = this.text.charAt(this.cursor);
        if (character.charCodeAt(0) === 127) { // Backspace
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

    getWordsTyped() {
        return this.cursor / 5;
    }


    getWordPerMinuts() {
        var score = this.getWordsTyped() * 60 / this.timer.getSecondPassed();
        return Math.round(score*100)/100;
    }

    displayText() {
        'use strict';
        var out = "";

        for (var i = 0; i < this.text.length(); i++) {
            var c = this.text.charAt(i);
            if (i == this.cursor && i == this.badCpt) {
                out += c.bgGreen;
            } else if (i == this.badCpt) {
                out += c.bgRed;
            } else if (i < this.cursor) {
                out += c.green;
            } else {
                out += c;
            }
        }

        out += '\n\nActual char : '+this.cursor;
        out += '\n'+this.getWordPerMinuts()+" W/M";

        out += '\n\n';

        process.stdout.write('\x1B[2J'); // Clear console
        process.stdout.write(out);
    }
}

var d = new Dactylo();
d.displayText();
d.startListen();

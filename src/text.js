

export class Text {

    static buildRadom() {
        var texts = JSON.parse(require('fs').readFileSync('./texts.json', 'utf8'));
        var text = this.getRandomText(texts);
        var t = new Text(text);
        return t;
    }

    static getRandomText(texts) {
        var nTexts = texts.length;
        var i = Math.floor(Math.random() * nTexts);
        return texts[i];
    }

    constructor(text) {
        this.text = text;
        this.addBackspace(80);
    }

    addBackspace(maxRows) {
        var text = this.text;
        this.text = "";
        var needCut = false;
        for (var i = 0; i < text.length; i++) {
            var c = text[i];
            this.text += c;
            if (i % maxRows == 0 && i > maxRows-10) {
                needCut = true;
            }
            if (needCut && c == ' ') {
                needCut = false;
                this.text += "\n";
            }
        }
    }

    charAt(i) {
        return this.text[i];
    }

    length() {
        return this.text.length;
    }
}

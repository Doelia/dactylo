

export class Text {

    static buildRadom() {
        var text = "Vous êtes sorti sain et sauf des basses calomnies, vous avez conquis les coeurs. Vous apparaissez rayonnant dans l'apothéose de cette fête patriotique que l'alliance russe a été pour la France, et vous vous préparez à présider au solennel triomphe de notre Exposition Universelle, qui couronnera notre grand siècle de travail, de vérité et de liberté. Mais quelle tache de boue sur votre nom - j'allais dire sur votre règne - que cette abominable affaire Dreyfus ! Un conseil de guerre vient, par ordre, d'oser acquitter un";
        var t = new Text(text);
        return t;
    }

    constructor(text) {
        this.text = "";
        var needCut = false;
        for (var i = 0; i < text.length; i++) {
            var c = text[i];
            this.text += c;
            if (i % 80 == 0 && i > 70) {
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

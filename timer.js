export class Timer {
    contructor() {
        this.startTime = null;
    }

    startTimer() {
        this.startTime = new Date();
    }

    getSecondPassed() {
        if (this.startTime == null) {
            return -1;
        }
        var now = new Date();
        var offset = now.getTime() - this.startTime.getTime();
        return offset / 1000;
    }

    isStarted() {
        return this.startTime != null;
    }
}

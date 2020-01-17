var colors = require('colors');
var util = require('util');
var exec = require('child_process').exec;

import {Dactylo} from './dactylo';

var d = new Dactylo();
d.displayText();
d.startListen();

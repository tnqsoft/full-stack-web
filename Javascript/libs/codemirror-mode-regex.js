(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("regex", function() {
    var otherChar = /^[\^\$\.\+\?\*]/;
    var g = 0;

    var tokenBase = function(stream) {
        var ch = stream.next();

        if (ch == "\\" && stream.match(/./, false)) {
            if (stream.match(/u\w{4}/)) return "a";
            if (stream.match(/u/)) return "err";

            if (stream.match(/x\w{2}/)) return "a";
            if (stream.match(/x/)) return "err";

            if (stream.match(/./)) return "a";

            return "a";
        }


        if (ch == "{") {
            if (stream.match(/(\d|\d,\d?)\}/)) return "a";
        }

        if (ch == "[" && stream.match(/[^\]]+\]/)) {
            return "b";
        }

        if (ch == "|") {
            return "g" + g;
        }

        if (ch == "(") {
            stream.match(/[\?\!\:]+/);
            return "g" + (++g % 5);
        }

        if (ch == ")") {
            if (g - 1 < 0) return "err";
            return "g" + (g-- % 5);
        }

        if (otherChar.test(ch)) {
            return "a";
        }
    };

    return {
        startState: function(base) {
            g = 0;
        },
        token: tokenBase
    };
});

CodeMirror.defineMIME("text/x-regex", "regex");

});

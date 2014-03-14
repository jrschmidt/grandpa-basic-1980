// Generated by CoffeeScript 1.7.1
var BasicProgram, BasicProgramLine, KeyHelper, LineBuffer, LineParser, NumericExpressionParser,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

BasicProgram = (function() {
  function BasicProgram() {
    this.lines = [];
  }

  BasicProgram.prototype.addline = function(n, text) {
    var existing;
    existing = this.lines.filter(function(ln) {
      return ln.ln_no === n;
    });
    if (existing.length === 0) {
      return this.lines.push({
        "ln_no": n,
        "text": text
      });
    } else {
      return existing[0].text = text;
    }
  };

  BasicProgram.prototype.fetch = function(line_no) {
    var existing;
    existing = this.lines.filter(function(ln) {
      return ln.ln_no === line_no;
    });
    if (existing.length === 0) {
      return {};
    } else {
      return existing[0];
    }
  };

  BasicProgram.prototype.remove = function(line_no) {
    var line;
    line = this.fetch(line_no);
    if (line !== {}) {
      line.ln_no = null;
      return line.text = null;
    }
  };

  return BasicProgram;

})();

BasicProgramLine = (function() {
  function BasicProgramLine(n, str) {
    this.ln_no = n;
    this.text = str;
    this.tokens = [];
  }

  return BasicProgramLine;

})();

LineParser = (function() {
  function LineParser() {}

  LineParser.prototype.parse = function(string) {
    var line, ln, look_for, original_string, token1, x;
    original_string = string;
    line = [];
    x = this.look_for_command(string);
    if (x !== null) {
      line = [x];
    } else {
      look_for = this.look_for_line_number(string);
      ln = look_for[0];
      string = look_for[1];
      line[0] = "<line_number>";
      line[1] = ln;
      token1 = this.look_for_numeric_identifier(string);
      if (token1 !== null) {
        line[2] = "<numeric_identifier>";
        line[3] = token1;
        line[4] = "<equals_sign>";
        line[5] = "<numeric_expression>";
      }
    }
    return line;
  };

  LineParser.prototype.look_for_command = function(string) {
    var cmd;
    cmd = null;
    if (string === "CLEAR") {
      cmd = "<clear>";
    }
    if (string === "RUN") {
      cmd = "<run>";
    }
    if (string === "INFO") {
      cmd = "<info>";
    }
    if (string === "LIST") {
      cmd = "<list>";
    }
    return cmd;
  };

  LineParser.prototype.look_for_line_number = function(string) {
    var n;
    n = parseInt(string);
    if (n > 0) {
      string = string.slice(String(n).length + 1);
    } else {
      n = 0;
    }
    return [n, string];
  };

  LineParser.prototype.look_for_numeric_identifier = function(string) {
    var find, id, size;
    id = null;
    size = 0;
    find = string.search(/[A-Z][0-9]?=/);
    if (find === 0) {
      size = string.indexOf("=");
      id = string.slice(0, size);
      string = string.slice(size + 1);
    }
    return id;
  };

  return LineParser;

})();

NumericExpressionParser = (function() {
  function NumericExpressionParser() {
    this.num_exp_chars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "(", ")", "+", "-", "*", "/", "^"];
    this.delimiters = ["(", ")", "+", "-", "*", "/", "^"];
    this.symbols = ["<left>", "<right>", "<plus>", "<minus>", "<times>", "<divide>", "<power>"];
  }

  NumericExpressionParser.prototype.numeric_parse = function(string) {
    var bad_chars, ok, po, tk, val, _i, _len;
    bad_chars = string.search(/[^A-Z0-9\.+\-*/\^()]/);
    if (bad_chars === -1) {
      po = this.tokenize(string);
      ok = "yes";
      for (_i = 0, _len = po.length; _i < _len; _i++) {
        tk = po[_i];
        if (!(!(__indexOf.call(this.symbols, tk) >= 0))) {
          continue;
        }
        val = this.numeric_value(tk);
        if (val === "bad") {
          ok = "no";
        }
      }
      if (ok === "no") {
        po = "<not_a_numeric_expression>";
      }
      return po;
    } else {
      return "<not_a_numeric_expression>";
    }
  };

  NumericExpressionParser.prototype.tokenize = function(string) {
    var buffer, ch, tokens, _i, _len;
    tokens = [];
    buffer = "";
    for (_i = 0, _len = string.length; _i < _len; _i++) {
      ch = string[_i];
      if (__indexOf.call(this.delimiters, ch) >= 0) {
        if (buffer !== "") {
          tokens.push(buffer);
          buffer = "";
        }
        tokens.push(this.symbols[this.delimiters.indexOf(ch)]);
      } else {
        buffer = buffer + ch;
      }
    }
    if (buffer !== "") {
      tokens.push(buffer);
    }
    return tokens;
  };

  NumericExpressionParser.prototype.numeric_value = function(string) {
    var ch, non_numerics, val, _i, _len, _ref, _ref1;
    val = [];
    if (_ref = string[0], __indexOf.call("ABCDEFGHIJKLMNOPQRSTUVWXYZ", _ref) >= 0) {
      if ((string.length === 1) || (string.length === 2 && (_ref1 = string[1], __indexOf.call("0123456789", _ref1) >= 0))) {
        val[0] = "<number_variable>";
        val[1] = string;
      } else {
        val = ["bad", "bad"];
      }
    } else {
      non_numerics = "none";
      for (_i = 0, _len = string.length; _i < _len; _i++) {
        ch = string[_i];
        if (!(__indexOf.call("0123456789", ch) >= 0)) {
          if (ch === ".") {
            if (non_numerics === "one_period") {
              non_numerics = "bad";
            }
            if (non_numerics === "none") {
              non_numerics = "one_period";
            }
          } else {
            non_numerics = "bad";
          }
        }
      }
      if (non_numerics !== "bad") {
        val[0] = "<numeric_literal>";
        val[1] = Number(string);
      } else {
        val = ["bad", "bad"];
      }
    }
    return val;
  };

  return NumericExpressionParser;

})();

KeyHelper = (function() {
  function KeyHelper() {
    this.code = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126];
    this.chars = ["!", "DOUBLE QUOTE", "#", "$", "%", "&", "SINGLE QUOTE", "(", ")", "*", "+", ",", "-", ".", "/", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "BACK SLASH", "^", "_", "`", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "{", "|", "}", "~"];
    this.xy = [[99, 72], [33, 72], [33, 90], [77, 72], [88, 72], [44, 90], [22, 72], [66, 54], [77, 54], [33, 54], [11, 54], [55, 72], [22, 54], [44, 72], [44, 54], [0, 36], [11, 36], [22, 36], [33, 36], [44, 36], [55, 36], [66, 36], [77, 36], [88, 36], [99, 36], [0, 72], [11, 72], [88, 54], [0, 54], [99, 54], [66, 72], [22, 90], [88, 90], [55, 54], [55, 90], [0, 90], [0, 0], [11, 0], [22, 0], [33, 0], [44, 0], [55, 0], [66, 0], [77, 0], [88, 0], [99, 0], [110, 0], [121, 0], [132, 0], [0, 18], [11, 18], [22, 18], [33, 18], [44, 18], [55, 18], [66, 18], [77, 18], [88, 18], [99, 18], [110, 18], [121, 18], [132, 18], [66, 90], [99, 90], [77, 90], [11, 90]];
  }

  KeyHelper.prototype.char = function(n) {
    var ch, i;
    if (__indexOf.call(this.code, n) >= 0) {
      i = this.code.indexOf(n);
      ch = this.chars[i];
    } else {
      ch = null;
    }
    return ch;
  };

  KeyHelper.prototype.sprite_xy = function(n) {
    var i;
    if (__indexOf.call(this.code, n) >= 0) {
      i = this.code.indexOf(n);
      return this.xy[i];
    }
  };

  return KeyHelper;

})();

LineBuffer = (function() {
  function LineBuffer() {
    this.text = "";
  }

  LineBuffer.prototype.set_text = function(string) {
    return this.text = string;
  };

  LineBuffer.prototype.get_text = function() {
    return this.text;
  };

  return LineBuffer;

})();

// Generated by CoffeeScript 1.7.1
describe("Parser helper methods", function() {
  beforeEach(function() {
    return this.helpers = new ParseHelpers;
  });
  it("should correctly parse line numbers", function() {
    var result;
    result = this.helpers.look_for_line_number('10 REM WELCOME TO GRANDPA BASIC 80');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(10);
    expect(result.remainder).toEqual(' REM WELCOME TO GRANDPA BASIC 80');
    result = this.helpers.look_for_line_number('20 $T = "JOHN R SCHMIDT"');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(20);
    expect(result.remainder).toEqual(' $T = "JOHN R SCHMIDT"');
    result = this.helpers.look_for_line_number('30 INPUT "DISPLAY NAME (Y/N)?";$Y');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(30);
    expect(result.remainder).toEqual(' INPUT "DISPLAY NAME (Y/N)?";$Y');
    result = this.helpers.look_for_line_number('40 IF $Y<>"Y" THEN 100');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(40);
    expect(result.remainder).toEqual(' IF $Y<>"Y" THEN 100');
    result = this.helpers.look_for_line_number('50 PRINT "WRITTEN BY "+$T');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(50);
    expect(result.remainder).toEqual(' PRINT "WRITTEN BY "+$T');
    result = this.helpers.look_for_line_number('100 PRINT "OK BYE"');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(100);
    expect(result.remainder).toEqual(' PRINT "OK BYE"');
    result = this.helpers.look_for_line_number('999 END');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<line_number>");
    expect(result.parse_object[1]).toEqual(999);
    expect(result.remainder).toEqual(' END');
    result = this.helpers.look_for_line_number('LIST');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_line_number('REM WELCOME TO GRANDPA BASIC 80');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_line_number('Z3=900*W-144*M1');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_line_number('IF H<20 THEN 1140');
    return expect(result.match).toEqual("no");
  });
  it("should correctly parse numeric identifiers", function() {
    var result;
    result = this.helpers.look_for_numeric_identifier('X');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<number_variable>");
    expect(result.parse_object[1]).toEqual("X");
    expect(result.remainder).toEqual('');
    result = this.helpers.look_for_numeric_identifier('H1');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<number_variable>");
    expect(result.parse_object[1]).toEqual("H1");
    expect(result.remainder).toEqual('');
    result = this.helpers.look_for_numeric_identifier('B+27');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<number_variable>");
    expect(result.parse_object[1]).toEqual("B");
    expect(result.remainder).toEqual('+27');
    result = this.helpers.look_for_numeric_identifier('Q0=Q9+Q8+Q3');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<number_variable>");
    expect(result.parse_object[1]).toEqual("Q0");
    expect(result.remainder).toEqual('=Q9+Q8+Q3');
    result = this.helpers.look_for_numeric_identifier('M9/(27*S)+0.91');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<number_variable>");
    expect(result.parse_object[1]).toEqual("M9");
    expect(result.remainder).toEqual('/(27*S)+0.91');
    result = this.helpers.look_for_numeric_identifier('4892');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_numeric_identifier('3X');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_numeric_identifier('PI');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_numeric_identifier('2+K');
    return expect(result.match).toEqual("no");
  });
  return it("should correctly parse string identifiers", function() {
    var result;
    result = this.helpers.look_for_string_identifier('$Q');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<string_variable>");
    expect(result.parse_object[1]).toEqual("Q");
    expect(result.remainder).toEqual('');
    result = this.helpers.look_for_string_identifier('$V1');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<string_variable>");
    expect(result.parse_object[1]).toEqual("V1");
    expect(result.remainder).toEqual('');
    result = this.helpers.look_for_string_identifier('$F="HELLO, MY NAME IS JAMES"');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<string_variable>");
    expect(result.parse_object[1]).toEqual("F");
    expect(result.remainder).toEqual('="HELLO, MY NAME IS JAMES"');
    result = this.helpers.look_for_string_identifier('$T6+$T7');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<string_variable>");
    expect(result.parse_object[1]).toEqual("T6");
    expect(result.remainder).toEqual('+$T7');
    result = this.helpers.look_for_string_identifier('$U+" HAS NO MORE DATA."');
    expect(result.match).toEqual("yes");
    expect(result.parse_object[0]).toEqual("<string_variable>");
    expect(result.parse_object[1]).toEqual("U");
    expect(result.remainder).toEqual('+" HAS NO MORE DATA."');
    result = this.helpers.look_for_string_identifier('R');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('Z9');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('$TOTAL');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('$42.36');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('"PLEASE INPUT YOUR ID NUMBER"');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('Z9');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('"+ IS EMPTY"');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('NAME');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('=$I6');
    expect(result.match).toEqual("no");
    result = this.helpers.look_for_string_identifier('+$V');
    return expect(result.match).toEqual("no");
  });
});

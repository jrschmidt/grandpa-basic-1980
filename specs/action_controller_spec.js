// Generated by CoffeeScript 1.7.1
describe("Action Controller - build object", function() {
  beforeEach(function() {
    return this.controller = new ActionController;
  });
  it("should build a valid console command object from a console command string", function() {
    var result;
    result = this.controller.build_line_object("CLEAR");
    expect(result.command).toEqual("<clear_command>");
    result = this.controller.build_line_object("RUN");
    expect(result.command).toEqual("<run_command>");
    result = this.controller.build_line_object("INFO");
    expect(result.command).toEqual("<info_command>");
    result = this.controller.build_line_object("LIST");
    return expect(result.command).toEqual("<list_command>");
  });
  it("should build a valid program line object from a line with a REM statement", function() {
    var result;
    result = this.controller.build_line_object('10 REM');
    expect(result.line_no).toEqual(10);
    expect(result.command).toEqual("<remark>");
    expect(result.text).toEqual('10 REM');
    result = this.controller.build_line_object('20 REM WELCOME TO GRANDPA BASIC 1980');
    expect(result.line_no).toEqual(20);
    expect(result.command).toEqual("<remark>");
    return expect(result.text).toEqual('20 REM WELCOME TO GRANDPA BASIC 1980');
  });
  it("should build a valid program line object from a line with a numeric assignment statement", function() {
    var expr, result;
    result = this.controller.build_line_object('30 D=477+B');
    expect(result.line_no).toEqual(30);
    expect(result.command).toEqual("<numeric_assignment>");
    expect(result.text).toEqual('30 D=477+B');
    expect(result.operand).toEqual("D");
    expr = result.expression;
    expect(expr.exp).toEqual("<plus>");
    expect(expr.op1.exp).toEqual("<num>");
    expect(expr.op1.value).toEqual(477);
    expect(expr.op2.exp).toEqual("<var>");
    return expect(expr.op2.name).toEqual("B");
  });
  it("should build a valid program line object from a line with a string assignment statement", function() {
    var result;
    result = this.controller.build_line_object('40 $E=$M+" IS NOT COMPLETE"');
    expect(result.line_no).toEqual(40);
    expect(result.command).toEqual("<string_assignment>");
    expect(result.text).toEqual('40 $E=$M+" IS NOT COMPLETE"');
    expect(result.operand).toEqual("E");
    expect(result.expression[0][0]).toEqual("<var>");
    expect(result.expression[0][1]).toEqual("M");
    expect(result.expression[1][0]).toEqual("<str>");
    return expect(result.expression[1][1]).toEqual(" IS NOT COMPLETE");
  });
  it("should build a valid program line object from a line with a GOTO statement", function() {
    var result;
    result = this.controller.build_line_object('520 GOTO 880');
    expect(result.line_no).toEqual(520);
    expect(result.command).toEqual("<goto>");
    expect(result.text).toEqual('520 GOTO 880');
    return expect(result.dest).toEqual(880);
  });
  it("should build a valid program line object from a line with a GOSUB statement", function() {
    var result;
    result = this.controller.build_line_object('320 GOSUB 1200');
    expect(result.line_no).toEqual(320);
    expect(result.command).toEqual("<gosub>");
    expect(result.text).toEqual('320 GOSUB 1200');
    return expect(result.dest).toEqual(1200);
  });
  it("should build a valid program line object from a line with a RETURN statement", function() {
    var result;
    result = this.controller.build_line_object('1299 RETURN');
    expect(result.line_no).toEqual(1299);
    expect(result.command).toEqual("<return>");
    return expect(result.text).toEqual('1299 RETURN');
  });
  it("should build a valid program line object from a line with an IF statement", function() {
    var result;
    result = this.controller.build_line_object('150 IF Z<0 THEN 340');
    expect(result.line_no).toEqual(150);
    expect(result.command).toEqual("<if>");
    expect(result.text).toEqual('150 IF Z<0 THEN 340');
    expect(result.cond.exp).toEqual("<num_lesser_than>");
    expect(result.cond["var"]).toEqual("Z");
    expect(result.cond.num_exp.exp).toEqual("<num>");
    expect(result.cond.num_exp.value).toEqual(0);
    expect(result.dest).toEqual(340);
    result = this.controller.build_line_object('610 IF $T="INCOMPLETE" THEN 1680');
    expect(result.line_no).toEqual(610);
    expect(result.command).toEqual("<if>");
    expect(result.text).toEqual('610 IF $T="INCOMPLETE" THEN 1680');
    expect(result.cond.exp).toEqual("<str_equals>");
    expect(result.cond["var"]).toEqual("T");
    expect(result.cond.str_exp[0][0]).toEqual("<str>");
    expect(result.cond.str_exp[0][1]).toEqual("INCOMPLETE");
    return expect(result.dest).toEqual(1680);
  });
  it("should build a valid program line object from a line with an INPUT statement", function() {
    var result;
    result = this.controller.build_line_object('110 INPUT R');
    expect(result.line_no).toEqual(110);
    expect(result.command).toEqual("<input_numeric>");
    expect(result.text).toEqual('110 INPUT R');
    expect(result.operand).toEqual("R");
    result = this.controller.build_line_object('120 INPUT $V');
    expect(result.line_no).toEqual(120);
    expect(result.command).toEqual("<input_string>");
    expect(result.text).toEqual('120 INPUT $V');
    expect(result.operand).toEqual("V");
    result = this.controller.build_line_object('130 INPUT "HOW MANY?";M');
    expect(result.line_no).toEqual(130);
    expect(result.command).toEqual("<input_numeric>");
    expect(result.text).toEqual('130 INPUT "HOW MANY?";M');
    expect(result.operand).toEqual("M");
    expect(result.prompt).toEqual("HOW MANY?");
    result = this.controller.build_line_object('140 INPUT "LAST NAME?";$N2');
    expect(result.line_no).toEqual(140);
    expect(result.command).toEqual("<input_string>");
    expect(result.text).toEqual('140 INPUT "LAST NAME?";$N2');
    expect(result.operand).toEqual("N2");
    return expect(result.prompt).toEqual("LAST NAME?");
  });
  it("should build a valid program line object from a line with a PRINT statement", function() {
    var result;
    result = this.controller.build_line_object('340 PRINT "WELCOME TO GRANDPA BASIC 1980"');
    expect(result.line_no).toEqual(340);
    expect(result.command).toEqual("<print>");
    expect(result.text).toEqual('340 PRINT "WELCOME TO GRANDPA BASIC 1980"');
    expect(result.expression[0][0]).toEqual("<str>");
    expect(result.expression[0][1]).toEqual("WELCOME TO GRANDPA BASIC 1980");
    result = this.controller.build_line_object('350 PRINT $Z1');
    expect(result.line_no).toEqual(350);
    expect(result.command).toEqual("<print>");
    expect(result.text).toEqual('350 PRINT $Z1');
    expect(result.expression[0][0]).toEqual("<var>");
    expect(result.expression[0][1]).toEqual("Z1");
    result = this.controller.build_line_object('360 PRINT "LAST NAME = "+$N4');
    expect(result.line_no).toEqual(360);
    expect(result.command).toEqual("<print>");
    expect(result.text).toEqual('360 PRINT "LAST NAME = "+$N4');
    expect(result.expression[0][0]).toEqual("<str>");
    expect(result.expression[0][1]).toEqual("LAST NAME = ");
    expect(result.expression[1][0]).toEqual("<var>");
    return expect(result.expression[1][1]).toEqual("N4");
  });
  it("should build a valid program line object from a line with a PRINTLN statement", function() {
    var result;
    result = this.controller.build_line_object('470 PRINTLN');
    expect(result.line_no).toEqual(470);
    expect(result.command).toEqual("<print_line>");
    expect(result.text).toEqual('470 PRINTLN');
    expect(result.expression[0][0]).toEqual("<str>");
    expect(result.expression[0][1]).toEqual("");
    result = this.controller.build_line_object('480 PRINTLN "WELCOME TO GRANDPA BASIC 1980"');
    expect(result.line_no).toEqual(480);
    expect(result.command).toEqual("<print_line>");
    expect(result.text).toEqual('480 PRINTLN "WELCOME TO GRANDPA BASIC 1980"');
    expect(result.expression[0][0]).toEqual("<str>");
    expect(result.expression[0][1]).toEqual("WELCOME TO GRANDPA BASIC 1980");
    result = this.controller.build_line_object('490 PRINTLN $Z1');
    expect(result.line_no).toEqual(490);
    expect(result.command).toEqual("<print_line>");
    expect(result.text).toEqual('490 PRINTLN $Z1');
    expect(result.expression[0][0]).toEqual("<var>");
    return expect(result.expression[0][1]).toEqual("Z1");
  });
  it("should build a valid program line object from a line with a CLEARSCRN statement", function() {
    var result;
    result = this.controller.build_line_object('940 CLEARSCRN');
    expect(result.line_no).toEqual(940);
    expect(result.command).toEqual("<clear_screen>");
    return expect(result.text).toEqual('940 CLEARSCRN');
  });
  it("should build a valid program line object from a line with a TAB statement", function() {
    var result;
    result = this.controller.build_line_object('870 TAB 28');
    expect(result.line_no).toEqual(870);
    expect(result.command).toEqual("<tab_col>");
    expect(result.text).toEqual('870 TAB 28');
    expect(result.col).toEqual(28);
    result = this.controller.build_line_object('880 TAB 12,44');
    expect(result.line_no).toEqual(880);
    expect(result.command).toEqual("<tab_line_col>");
    expect(result.text).toEqual('880 TAB 12,44');
    expect(result.line).toEqual(12);
    return expect(result.col).toEqual(44);
  });
  return it("should build a valid program line object from a line with an END statement", function() {
    var line_text, result;
    line_text = '999 END';
    result = this.controller.build_line_object('999 END');
    expect(result.line_no).toEqual(999);
    expect(result.command).toEqual("<end>");
    return expect(result.text).toEqual('999 END');
  });
});

describe("Action Controller - add line", function() {
  beforeEach(function() {
    this.controller = new ActionController;
    return this.lines = this.controller.line_listing;
  });
  it("should parse, build and add a REM statement program line object", function() {
    var line;
    this.controller.handle_line_entry('20 REM WELCOME TO GRANDPA BASIC 1980');
    line = this.lines.get_line(20);
    return expect(line.command).toEqual("<remark>");
  });
  it("should parse, build and add a numeric assignment program line object", function() {
    var line;
    this.controller.handle_line_entry('30 D=477+B');
    line = this.lines.get_line(30);
    return expect(line.command).toEqual("<numeric_assignment>");
  });
  it("should parse, build and add a string assignment program line object", function() {
    var line;
    this.controller.handle_line_entry('40 $E=$M+" IS NOT COMPLETE"');
    line = this.lines.get_line(40);
    return expect(line.command).toEqual("<string_assignment>");
  });
  it("should parse, build and add a GOTO statement program line object", function() {
    var line;
    this.controller.handle_line_entry('520 GOTO 880');
    line = this.lines.get_line(520);
    return expect(line.command).toEqual("<goto>");
  });
  it("should parse, build and add a GOSUB statement program line object", function() {
    var line;
    this.controller.handle_line_entry('320 GOSUB 1200');
    line = this.lines.get_line(320);
    return expect(line.command).toEqual("<gosub>");
  });
  it("should parse, build and add a RETURN statement program line object", function() {
    var line;
    this.controller.handle_line_entry('1299 RETURN');
    line = this.lines.get_line(1299);
    return expect(line.command).toEqual("<return>");
  });
  it("should parse, build and add an IF statement program line object", function() {
    var line;
    this.controller.handle_line_entry('150 IF Z<0 THEN 340');
    line = this.lines.get_line(150);
    return expect(line.command).toEqual("<if>");
  });
  it("should parse, build and add an INPUT statement program line object", function() {
    var line;
    this.controller.handle_line_entry('130 INPUT "HOW MANY?";M');
    line = this.lines.get_line(130);
    return expect(line.command).toEqual("<input_numeric>");
  });
  it("should parse, build and add a PRINT statement program line object", function() {
    var line;
    this.controller.handle_line_entry('340 PRINT "WELCOME TO GRANDPA BASIC 1980"');
    line = this.lines.get_line(340);
    return expect(line.command).toEqual("<print>");
  });
  it("should parse, build and add a PRINTLN statement program line object", function() {
    var line;
    this.controller.handle_line_entry('490 PRINTLN $Z1');
    line = this.lines.get_line(490);
    return expect(line.command).toEqual("<print_line>");
  });
  it("should parse, build and add a CLEARSCRN statement program line object", function() {
    var line;
    this.controller.handle_line_entry('940 CLEARSCRN');
    line = this.lines.get_line(940);
    return expect(line.command).toEqual("<clear_screen>");
  });
  it("should parse, build and add a TAB statement program line object", function() {
    var line;
    this.controller.handle_line_entry('870 TAB 28');
    line = this.lines.get_line(870);
    return expect(line.command).toEqual("<tab_col>");
  });
  return it("should parse, build and add an END statement program line object", function() {
    var line;
    this.controller.handle_line_entry('999 END');
    line = this.lines.get_line(999);
    return expect(line.command).toEqual("<end>");
  });
});

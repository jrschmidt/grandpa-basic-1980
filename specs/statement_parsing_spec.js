// Generated by CoffeeScript 1.9.2
describe("Statement parsing", function() {
  beforeEach(function() {
    this.parser = new LineParser;
    return this.syntax = new SyntaxRules;
  });
  it("should correctly parse REM statements", function() {
    var po, result;
    result = this.parser.look_for("REM", this.syntax.line_number_rules[1]);
    po = result.parse_object;
    expect(po[0]).toEqual("<remark>");
    result = this.parser.look_for("REM WELCOME TO GRANDPA BASIC 1980", this.syntax.line_number_rules[0]);
    po = result.parse_object;
    expect(po[0]).toEqual("<remark>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<characters>");
    expect(po[3]).toEqual('WELCOME TO GRANDPA BASIC 1980');
    result = this.parser.look_for("REM **** - - - ****", this.syntax.line_number_rules[0]);
    po = result.parse_object;
    expect(po[0]).toEqual("<remark>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<characters>");
    expect(po[3]).toEqual('**** - - - ****');
    result = this.parser.look_for("REM PARSE LEFT SIDE BEFORE RIGHT SIDE", this.syntax.line_number_rules[0]);
    po = result.parse_object;
    expect(po[0]).toEqual("<remark>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<characters>");
    return expect(po[3]).toEqual('PARSE LEFT SIDE BEFORE RIGHT SIDE');
  });
  it("should correctly parse numeric assignment statements", function() {
    var po, result;
    result = this.parser.look_for("A0=X", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("A0");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<number_variable>");
    expect(po[5]).toEqual("X");
    expect(po[6]).toEqual("<num_exp_end>");
    result = this.parser.look_for("B=42", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("B");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<numeric_literal>");
    expect(po[5]).toEqual(42);
    expect(po[6]).toEqual("<num_exp_end>");
    result = this.parser.look_for("Z7=13.477", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("Z7");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<numeric_literal>");
    expect(po[5]).toEqual(13.477);
    expect(po[6]).toEqual("<num_exp_end>");
    result = this.parser.look_for("E=12/3", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("E");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<numeric_literal>");
    expect(po[5]).toEqual(12);
    expect(po[6]).toEqual("<divide>");
    expect(po[7]).toEqual("<numeric_literal>");
    expect(po[8]).toEqual(3);
    expect(po[9]).toEqual("<num_exp_end>");
    result = this.parser.look_for("D=477+B", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("D");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<numeric_literal>");
    expect(po[5]).toEqual(477);
    expect(po[6]).toEqual("<plus>");
    expect(po[7]).toEqual("<number_variable>");
    expect(po[8]).toEqual("B");
    expect(po[9]).toEqual("<num_exp_end>");
    result = this.parser.look_for("F1=C^2", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("F1");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<number_variable>");
    expect(po[5]).toEqual("C");
    expect(po[6]).toEqual("<power>");
    expect(po[7]).toEqual("<numeric_literal>");
    expect(po[8]).toEqual(2);
    expect(po[9]).toEqual("<num_exp_end>");
    result = this.parser.look_for("W=X*Y*Z", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("W");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<number_variable>");
    expect(po[5]).toEqual("X");
    expect(po[6]).toEqual("<times>");
    expect(po[7]).toEqual("<number_variable>");
    expect(po[8]).toEqual("Y");
    expect(po[9]).toEqual("<times>");
    expect(po[10]).toEqual("<number_variable>");
    expect(po[11]).toEqual("Z");
    expect(po[12]).toEqual("<num_exp_end>");
    result = this.parser.look_for("E3=RND*256", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("E3");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<random>");
    expect(po[5]).toEqual("<times>");
    expect(po[6]).toEqual("<numeric_literal>");
    expect(po[7]).toEqual(256);
    expect(po[8]).toEqual("<num_exp_end>");
    result = this.parser.look_for("M=28*(J+2)", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("M");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<numeric_literal>");
    expect(po[5]).toEqual(28);
    expect(po[6]).toEqual("<times>");
    expect(po[7]).toEqual("<left>");
    expect(po[8]).toEqual("<number_variable>");
    expect(po[9]).toEqual("J");
    expect(po[10]).toEqual("<plus>");
    expect(po[11]).toEqual("<numeric_literal>");
    expect(po[12]).toEqual(2);
    expect(po[13]).toEqual("<right>");
    expect(po[14]).toEqual("<num_exp_end>");
    result = this.parser.look_for("L3=W5+W7-4*(J^2+K^3)", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("L3");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<number_variable>");
    expect(po[5]).toEqual("W5");
    expect(po[6]).toEqual("<plus>");
    expect(po[7]).toEqual("<number_variable>");
    expect(po[8]).toEqual("W7");
    expect(po[9]).toEqual("<minus>");
    expect(po[10]).toEqual("<numeric_literal>");
    expect(po[11]).toEqual(4);
    expect(po[12]).toEqual("<times>");
    expect(po[13]).toEqual("<left>");
    expect(po[14]).toEqual("<number_variable>");
    expect(po[15]).toEqual("J");
    expect(po[16]).toEqual("<power>");
    expect(po[17]).toEqual("<numeric_literal>");
    expect(po[18]).toEqual(2);
    expect(po[19]).toEqual("<plus>");
    expect(po[20]).toEqual("<number_variable>");
    expect(po[21]).toEqual("K");
    expect(po[22]).toEqual("<power>");
    expect(po[23]).toEqual("<numeric_literal>");
    expect(po[24]).toEqual(3);
    expect(po[25]).toEqual("<right>");
    expect(po[26]).toEqual("<num_exp_end>");
    result = this.parser.look_for("G=(18-Q7)/(2.108*(14*M+17*X))", this.syntax.line_number_rules[2]);
    po = result.parse_object;
    expect(po[0]).toEqual("<number_variable>");
    expect(po[1]).toEqual("G");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<numeric_expression>");
    expect(po[4]).toEqual("<left>");
    expect(po[5]).toEqual("<numeric_literal>");
    expect(po[6]).toEqual(18);
    expect(po[7]).toEqual("<minus>");
    expect(po[8]).toEqual("<number_variable>");
    expect(po[9]).toEqual("Q7");
    expect(po[10]).toEqual("<right>");
    expect(po[11]).toEqual("<divide>");
    expect(po[12]).toEqual("<left>");
    expect(po[13]).toEqual("<numeric_literal>");
    expect(po[14]).toEqual(2.108);
    expect(po[15]).toEqual("<times>");
    expect(po[16]).toEqual("<left>");
    expect(po[17]).toEqual("<numeric_literal>");
    expect(po[18]).toEqual(14);
    expect(po[19]).toEqual("<times>");
    expect(po[20]).toEqual("<number_variable>");
    expect(po[21]).toEqual("M");
    expect(po[22]).toEqual("<plus>");
    expect(po[23]).toEqual("<numeric_literal>");
    expect(po[24]).toEqual(17);
    expect(po[25]).toEqual("<times>");
    expect(po[26]).toEqual("<number_variable>");
    expect(po[27]).toEqual("X");
    expect(po[28]).toEqual("<right>");
    expect(po[29]).toEqual("<right>");
    return expect(po[30]).toEqual("<num_exp_end>");
  });
  it("should correctly parse string assignment statements", function() {
    var po, result;
    result = this.parser.look_for('$L="HAPPY THURSDAY!"', this.syntax.line_number_rules[3]);
    po = result.parse_object;
    expect(po[0]).toEqual("<string_variable>");
    expect(po[1]).toEqual("L");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<string_expression>");
    expect(po[4]).toEqual("<string_literal>");
    expect(po[5]).toEqual("HAPPY THURSDAY!");
    expect(po[6]).toEqual("<str_exp_end>");
    result = this.parser.look_for('$U7=$U0+" AND ANY "+$U1+" THAT DOES NOT INCLUDE "+$U4', this.syntax.line_number_rules[3]);
    po = result.parse_object;
    expect(po[0]).toEqual("<string_variable>");
    expect(po[1]).toEqual("U7");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<string_expression>");
    expect(po[4]).toEqual("<string_variable>");
    expect(po[5]).toEqual("U0");
    expect(po[6]).toEqual("<plus>");
    expect(po[7]).toEqual("<string_literal>");
    expect(po[8]).toEqual(" AND ANY ");
    expect(po[9]).toEqual("<plus>");
    expect(po[10]).toEqual("<string_variable>");
    expect(po[11]).toEqual("U1");
    expect(po[12]).toEqual("<plus>");
    expect(po[13]).toEqual("<string_literal>");
    expect(po[14]).toEqual(" THAT DOES NOT INCLUDE ");
    expect(po[15]).toEqual("<plus>");
    expect(po[16]).toEqual("<string_variable>");
    expect(po[17]).toEqual("U4");
    expect(po[18]).toEqual("<str_exp_end>");
    result = this.parser.look_for('$B=$C', this.syntax.line_number_rules[3]);
    po = result.parse_object;
    expect(po[0]).toEqual("<string_variable>");
    expect(po[1]).toEqual("B");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<string_expression>");
    expect(po[4]).toEqual("<string_variable>");
    expect(po[5]).toEqual("C");
    expect(po[6]).toEqual("<str_exp_end>");
    result = this.parser.look_for('$E=$M+" IS NOT COMPLETE"', this.syntax.line_number_rules[3]);
    po = result.parse_object;
    expect(po[0]).toEqual("<string_variable>");
    expect(po[1]).toEqual("E");
    expect(po[2]).toEqual("<equals>");
    expect(po[3]).toEqual("<string_expression>");
    expect(po[4]).toEqual("<string_variable>");
    expect(po[5]).toEqual("M");
    expect(po[6]).toEqual("<plus>");
    expect(po[7]).toEqual("<string_literal>");
    expect(po[8]).toEqual(" IS NOT COMPLETE");
    return expect(po[9]).toEqual("<str_exp_end>");
  });
  it("should correctly parse GOTO statements", function() {
    var po, result;
    result = this.parser.look_for("GOTO 40", this.syntax.line_number_rules[4]);
    po = result.parse_object;
    expect(po[0]).toEqual("<goto>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<line_number>");
    expect(po[3]).toEqual(40);
    result = this.parser.look_for("GOTO 880", this.syntax.line_number_rules[4]);
    po = result.parse_object;
    expect(po[0]).toEqual("<goto>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<line_number>");
    expect(po[3]).toEqual(880);
    result = this.parser.look_for("GOTO 2470", this.syntax.line_number_rules[4]);
    po = result.parse_object;
    expect(po[0]).toEqual("<goto>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<line_number>");
    return expect(po[3]).toEqual(2470);
  });
  it("should correctly parse GOSUB statements", function() {
    var po, result;
    result = this.parser.look_for("GOSUB 60", this.syntax.line_number_rules[5]);
    po = result.parse_object;
    expect(po[0]).toEqual("<gosub>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<line_number>");
    expect(po[3]).toEqual(60);
    result = this.parser.look_for("GOSUB 200", this.syntax.line_number_rules[5]);
    po = result.parse_object;
    expect(po[0]).toEqual("<gosub>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<line_number>");
    expect(po[3]).toEqual(200);
    result = this.parser.look_for("GOSUB 2300", this.syntax.line_number_rules[5]);
    po = result.parse_object;
    expect(po[0]).toEqual("<gosub>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<line_number>");
    return expect(po[3]).toEqual(2300);
  });
  it("should correctly parse return from GOSUB statements", function() {
    var po, result;
    result = this.parser.look_for("RETURN", this.syntax.line_number_rules[6]);
    po = result.parse_object;
    return expect(po[0]).toEqual("<return>");
  });
  it("should correctly parse IF statements", function() {
    var po, result;
    result = this.parser.look_for("IF Z<0 THEN 340", this.syntax.line_number_rules[7]);
    po = result.parse_object;
    expect(po[0]).toEqual("<if>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<boolean_expression>");
    expect(po[3]).toEqual("<number_variable>");
    expect(po[4]).toEqual("Z");
    expect(po[5]).toEqual("<lesser_than>");
    expect(po[6]).toEqual("<numeric_expression>");
    expect(po[7]).toEqual("<numeric_literal>");
    expect(po[8]).toEqual(0);
    expect(po[9]).toEqual("<num_exp_end>");
    expect(po[10]).toEqual("<bool_exp_end>");
    expect(po[11]).toEqual("<sp>");
    expect(po[12]).toEqual("<then>");
    expect(po[13]).toEqual("<sp>");
    expect(po[14]).toEqual("<line_number>");
    expect(po[15]).toEqual(340);
    result = this.parser.look_for('IF $T="INCOMPLETE" THEN 1680', this.syntax.line_number_rules[7]);
    po = result.parse_object;
    expect(po[0]).toEqual("<if>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<boolean_expression>");
    expect(po[3]).toEqual("<string_variable>");
    expect(po[4]).toEqual("T");
    expect(po[5]).toEqual("<equals>");
    expect(po[6]).toEqual("<string_expression>");
    expect(po[7]).toEqual("<string_literal>");
    expect(po[8]).toEqual("INCOMPLETE");
    expect(po[9]).toEqual("<str_exp_end>");
    expect(po[10]).toEqual("<bool_exp_end>");
    expect(po[11]).toEqual("<sp>");
    expect(po[12]).toEqual("<then>");
    expect(po[13]).toEqual("<sp>");
    expect(po[14]).toEqual("<line_number>");
    expect(po[15]).toEqual(1680);
    result = this.parser.look_for('IF $R4<>"RRRR" THEN 570', this.syntax.line_number_rules[7]);
    po = result.parse_object;
    expect(po[0]).toEqual("<if>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<boolean_expression>");
    expect(po[3]).toEqual("<string_variable>");
    expect(po[4]).toEqual("R4");
    expect(po[5]).toEqual("<not_equal>");
    expect(po[6]).toEqual("<string_expression>");
    expect(po[7]).toEqual("<string_literal>");
    expect(po[8]).toEqual("RRRR");
    expect(po[9]).toEqual("<str_exp_end>");
    expect(po[10]).toEqual("<bool_exp_end>");
    expect(po[11]).toEqual("<sp>");
    expect(po[12]).toEqual("<then>");
    expect(po[13]).toEqual("<sp>");
    expect(po[14]).toEqual("<line_number>");
    expect(po[15]).toEqual(570);
    result = this.parser.look_for("IF A>B THEN 750", this.syntax.line_number_rules[7]);
    po = result.parse_object;
    expect(po[0]).toEqual("<if>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<boolean_expression>");
    expect(po[3]).toEqual("<number_variable>");
    expect(po[4]).toEqual("A");
    expect(po[5]).toEqual("<greater_than>");
    expect(po[6]).toEqual("<numeric_expression>");
    expect(po[7]).toEqual("<number_variable>");
    expect(po[8]).toEqual("B");
    expect(po[9]).toEqual("<num_exp_end>");
    expect(po[10]).toEqual("<bool_exp_end>");
    expect(po[11]).toEqual("<sp>");
    expect(po[12]).toEqual("<then>");
    expect(po[13]).toEqual("<sp>");
    expect(po[14]).toEqual("<line_number>");
    expect(po[15]).toEqual(750);
    result = this.parser.look_for("IF N>=1000 THEN 930", this.syntax.line_number_rules[7]);
    po = result.parse_object;
    expect(po[0]).toEqual("<if>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<boolean_expression>");
    expect(po[3]).toEqual("<number_variable>");
    expect(po[4]).toEqual("N");
    expect(po[5]).toEqual("<greater_equal>");
    expect(po[6]).toEqual("<numeric_expression>");
    expect(po[7]).toEqual("<numeric_literal>");
    expect(po[8]).toEqual(1000);
    expect(po[9]).toEqual("<num_exp_end>");
    expect(po[10]).toEqual("<bool_exp_end>");
    expect(po[11]).toEqual("<sp>");
    expect(po[12]).toEqual("<then>");
    expect(po[13]).toEqual("<sp>");
    expect(po[14]).toEqual("<line_number>");
    return expect(po[15]).toEqual(930);
  });
  it("should correctly parse INPUT statements", function() {
    var po, result;
    result = this.parser.look_for("INPUT R", this.syntax.line_number_rules[8]);
    po = result.parse_object;
    expect(po[0]).toEqual("<input>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<number_variable>");
    expect(po[3]).toEqual("R");
    result = this.parser.look_for("INPUT $V", this.syntax.line_number_rules[8]);
    po = result.parse_object;
    expect(po[0]).toEqual("<input>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string_variable>");
    expect(po[3]).toEqual("V");
    result = this.parser.look_for('INPUT "HOW MANY?";M', this.syntax.line_number_rules[8]);
    po = result.parse_object;
    expect(po[0]).toEqual("<input>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string>");
    expect(po[3]).toEqual("HOW MANY?");
    expect(po[4]).toEqual("<semicolon>");
    expect(po[5]).toEqual("<number_variable>");
    expect(po[6]).toEqual("M");
    result = this.parser.look_for('INPUT "LAST NAME?";$N2', this.syntax.line_number_rules[8]);
    po = result.parse_object;
    expect(po[0]).toEqual("<input>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string>");
    expect(po[3]).toEqual("LAST NAME?");
    expect(po[4]).toEqual("<semicolon>");
    expect(po[5]).toEqual("<string_variable>");
    return expect(po[6]).toEqual("N2");
  });
  return it("should correctly parse PRINT statements", function() {
    var po, result;
    result = this.parser.look_for('PRINT X', this.syntax.line_number_rules[9]);
    po = result.parse_object;
    expect(po[0]).toEqual("<print>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<number_variable>");
    expect(po[3]).toEqual("X");
    result = this.parser.look_for('PRINT "WELCOME TO GRANDPA BASIC 1980"', this.syntax.line_number_rules[10]);
    po = result.parse_object;
    expect(po[0]).toEqual("<print>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string_expression>");
    expect(po[3]).toEqual("<string_literal>");
    expect(po[4]).toEqual("WELCOME TO GRANDPA BASIC 1980");
    expect(po[5]).toEqual("<str_exp_end>");
    result = this.parser.look_for("PRINT $Z1", this.syntax.line_number_rules[10]);
    po = result.parse_object;
    expect(po[0]).toEqual("<print>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string_expression>");
    expect(po[3]).toEqual("<string_variable>");
    expect(po[4]).toEqual("Z1");
    expect(po[5]).toEqual("<str_exp_end>");
    result = this.parser.look_for('PRINT "LAST NAME = "+$N4', this.syntax.line_number_rules[10]);
    po = result.parse_object;
    expect(po[0]).toEqual("<print>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string_expression>");
    expect(po[3]).toEqual("<string_literal>");
    expect(po[4]).toEqual("LAST NAME = ");
    expect(po[5]).toEqual("<plus>");
    expect(po[6]).toEqual("<string_variable>");
    expect(po[7]).toEqual("N4");
    expect(po[8]).toEqual("<str_exp_end>");
    result = this.parser.look_for('PRINT $T+" : "+$T8+"/"+$T9', this.syntax.line_number_rules[10]);
    po = result.parse_object;
    expect(po[0]).toEqual("<print>");
    expect(po[1]).toEqual("<sp>");
    expect(po[2]).toEqual("<string_expression>");
    expect(po[3]).toEqual("<string_variable>");
    expect(po[4]).toEqual("T");
    expect(po[5]).toEqual("<plus>");
    expect(po[6]).toEqual("<string_literal>");
    expect(po[7]).toEqual(" : ");
    expect(po[8]).toEqual("<plus>");
    expect(po[9]).toEqual("<string_variable>");
    expect(po[10]).toEqual("T8");
    expect(po[11]).toEqual("<plus>");
    expect(po[12]).toEqual("<string_literal>");
    expect(po[13]).toEqual("/");
    expect(po[14]).toEqual("<plus>");
    expect(po[15]).toEqual("<string_variable>");
    expect(po[16]).toEqual("T9");
    return expect(po[17]).toEqual("<str_exp_end>");
  });
});

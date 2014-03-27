describe "Program line formatting", ->


  xit "should correctly format a program line with a REM statement", ->

    parse_object = [
      "<line_number>"
      10
      "<sp>"
      "<remark>" ]

    expected = {
      line_no: 10
      type:  "<remark>"
      text: '10 REM' }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      20
      "<sp>"
      "<remark>"
      "<characters>"
      "WELCOME TO GRANDPA BASIC 1980" ]

    expected = {
      line_no: 20
      type:  "<remark>"
      text: '20 REM WELCOME TO GRANDPA BASIC 1980' }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a numeric assignment statement", ->

    parse_object = [
      "<line_number>"
      30
      "<sp>"
      "<numeric_assignment>"
      "<numeric_variable"
      "D"
      "<equals>"
      "<numeric_expression>"
      "numeric_literal>"
      477
      "<plus>"
      "<numeric_variable>"
      "B" ]

    expected = {
      line_no: 30
      type:  "<numeric_assignment>"
      text: '30 D=477+B'
      operand: "D"
      expression: jasmine.any(NumericExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a string assignment statement", ->

    parse_object = [
      "<line_number>"
      40
      "<sp>"
      "<string_variable>"
      "E"
      "<equals>"
      "<string_expression>"
      "<string_variable>"
      "M"
      "<plus>"
      "<string_literal>"
      " IS NOT COMPLETE"
      "<str_exp_end>" ]

    expected = {
      line_no: 40
      type:  "<string_assignment>"
      text: '40 $E=$M+" IS NOT COMPLETE"'
      operand: "E"
      expression: jasmine.any(StringExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a GOTO statement", ->

    parse_object = [
      "<line_number>"
      520
      "<sp>"
      "<goto>"
      "<sp>"
      "<line_number>"
      880 ]

    expected = {
      line_no: 520
      type:  "<goto>"
      text: '520 GOTO 880'
      dest: 880 }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a GOSUB statement", ->

    parse_object = [
      "<line_number>"
      320
      "<sp>"
      "<gosub>"
      "<sp>"
      "<line_number>"
      1200 ]

    expected = {
      line_no: 320
      type:  "<gosub>"
      text: '320 GOSUB 1200'
      dest: 1200 }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a RETURN statement", ->

    parse_object = [
      "<line_number>"
      1299
      "<sp>"
      "<return>" ]

    expected = {
      line_no: 1299
      type:  "<return>"
      text: '1299 RETURN' }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with an IF statement", ->

    parse_object = [
      "<line_number>"
      150
      "<sp>"
      "<if>"
      "<sp>"
      "<boolean_expression>"
      "<numeric_variable>"
      "Z"
      "<lesser_than>"
      "numeric_literal>"
      0
      "<bool_exp_end>"
      "<sp>"
      "<then>"
      "<sp>"
      "<line_number>"
      340 ]

    expected = {
      line_no: 150
      type:  "<if>"
      text: '150 IF Z<0 THEN 340'
      cond: jasmine.any(BooleanExpression)
      dest: 340 }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      610
      "<sp>"
      "<if>"
      "<sp>"
      "<boolean_expression>"
      "<string_variable>"
      "T"
      "<equals>"
      "<string_literal>"
      "INCOMPLETE"
      "<bool_exp_end>"
      "<sp>"
      "<then>"
      "<sp>"
      "<line_number>"
      1680 ]

    expected = {
      line_no: 610
      type:  "<if>"
      text: '610 IF $T="INCOMPLETE" THEN 1680'
      cond: jasmine.any(BooleanExpression)
      dest: 1680 }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with an INPUT statement", ->

    parse_object = [
      "<line_number>"
      110
      "<sp>"
      "<input>"
      "<sp>"
      "<number_variable>"
      "R" ]

    expected = {
      line_no: 110
      type:  "<input_numeric>"
      text: '110 INPUT R'
      operand: "R" }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      120
      "<sp>"
      "<input>"
      "<sp>"
      "<string_variable>"
      "V" ]

    expected = {
      line_no: 120
      type:  "<input_string>"
      text: '120 INPUT $V'
      operand: "V" }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      130
      "<sp>"
      "<input>"
      "<sp>"
      "<string>"
      "HOW MANY?"
      "<semicolon>"
      "<number_variable>"
      "M" ]

    expected = {
      line_no: 130
      type:  "<input_numeric_prompt>"
      text: '130 INPUT "HOW MANY?";M'
      operand: "M"
      prompt: "HOW MANY?" }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result



  xit "should correctly format a program line with a  statement", ->

    parse_object = [
      "<line_number>"
      140
      "<sp>"
      "<input>"
      "<sp>"
      "<string>"
      "LAST NAME?"
      "<semicolon>"
      "<string_variable>"
      "N2" ]

    expected = {
      line_no: 140
      type:  "<input_string_prompt>"
      text: '140 INPUT "LAST NAME?";$N2'
      operand: "N2"
      prompt: "LAST NAME?" }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a PRINT statement", ->

    parse_object = [
      "<line_number>"
      340
      "<sp>"
      "<print>"
      "sp>"
      "<string_expression>"
      "<string_literal>"
      "WELCOME TO GRANDPA BASIC 1980"
      "<str_exp_end>" ]

    expected = {
      line_no: 340
      type:  "<print>"
      text: '340 PRINT "WELCOME TO GRANDPA BASIC 1980"'
      expression: jasmine.any(StringExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      350
      "<sp>"
      "<print>"
      "sp>"
      "<string_expression>"
      "<string_variable>"
      "Z1"
      "<str_exp_end>" ]

    expected = {
      line_no: 350
      type:  "<print>"
      text: '350 PRINT $Z1'
      expression: jasmine.any(StringExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      360
      "<sp>"
      "<print>"
      "sp>"
      "<string_expression>"
      "<string_literal>"
      "LAST NAME = "
      "<plus>"
      "<string_variable>"
      "N4"
      "<str_exp_end>" ]

    expected = {
      line_no: 360
      type:  "<print>"
      text: '360 PRINT "LAST NAME = "+$N4'
      expression: jasmine.any(StringExpression) }


    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a PRINTLN statement", ->

    parse_object = [
      "<line_number>"
      470
      "<sp>"
      "<print_line>" ]

    expected = {
      line_no: 470
      type:  "<print_line>"
      text: '470 PRINTLN'
      expression: jasmine.any(StringExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      480
      "<sp>"
      "<print_line>"
      "sp>"
      "<string_expression>"
      "<string_literal>"
      "WELCOME TO GRANDPA BASIC 1980"
      "<str_exp_end>" ]

    expected line_480 = {
      line_no: 480
      type:  "<print_line>"
      text: '480 PRINTLN "WELCOME TO GRANDPA BASIC 1980"'
      expression: jasmine.any(StringExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      490
      "<sp>"
      "<print_line>"
      "sp>"
      "<string_expression>"
      "<string_variable>"
      "Z1"
      "<str_exp_end>" ]

    expected = {
      line_no: 490
      type:  "<print_line>"
      text: '490 PRINTLN $Z1'
      expression: jasmine.any(StringExpression) }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a CLEARSCRN statement", ->

    parse_object = [
      "<line_number>"
      940
      "<sp>"
      "<clear_screen>" ]

    expected = {
      line_no: 940
      type:  "<clear_screen>"
      text: '940 CLEARSCRN' }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with a TAB statement", ->

    parse_object = [
      "<line_number>"
      870
      "<sp>"
      "<tab>"
      "<sp>"
      "<integer>"
      28 ]

    expected = {
      line_no: 870
      type:  "<tab_col>"
      text: '870 TAB 28'
      col: 28 }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


    parse_object = [
      "<line_number>"
      880
      "<sp>"
      "<tab>"
      "<sp>"
      "<integer>"
      12
      "<comma>"
      "<integer>"
      44 ]

    expected = {
      line_no: 880
      type:  "<tab_line_col>"
      text: '880 TAB 12,44'
      line: 12
      col: 44 }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result


  xit "should correctly format a program line with an END statement", ->

    parse_object = [
      "<line_number>"
      999
      "<sp>"
      "<end>" ]

    expected = {
      line_no: 999
      type:  "<end>"
      text: '999 END' }

    bpl = new BasicProgramLine(parse_object)
    result = bpl.components
    expect(val).toEqual(expected[key]) for key,val of result



describe "BASIC program line parser", ->

  beforeEach ->
    @parser = new LineParser


  it "should correctly parse a terminal command", ->
    po = @parser.parse("CLEAR")
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(1)
    expect(po[0]).toEqual("<clear_command>")

    po = @parser.parse("RUN")
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(1)
    expect(po[0]).toEqual("<run_command>")

    po = @parser.parse("INFO")
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(1)
    expect(po[0]).toEqual("<info_command>")


    po = @parser.parse("LIST")
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(1)
    expect(po[0]).toEqual("<list_command>")


  it "should correctly parse line numbers in program lines", ->

    po = @parser.parse('10 REM WELCOME TO GRANDPA BASIC 80')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(10)
    expect(po[2]).toEqual("<sp>")

    po = @parser.parse('20 $T="JOHN R SCHMIDT"')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(20)
    expect(po[2]).toEqual("<sp>")

    po = @parser.parse('30 INPUT "DISPLAY NAME (Y/N)?";$Y')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(30)
    expect(po[2]).toEqual("<sp>")

    po = @parser.parse('40 IF $Y<>"Y" THEN 100')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(40)
    expect(po[2]).toEqual("<sp>")

    po = @parser.parse('50 PRINT "WRITTEN BY "+$T')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(50)
    expect(po[2]).toEqual("<sp>")

    po = @parser.parse('100 PRINT "OK BYE"')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(100)
    expect(po[2]).toEqual("<sp>")

    po = @parser.parse('999 END')
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(999)
    expect(po[2]).toEqual("<sp>")


  it "should correctly parse a valid program line number with nothing following it", ->

    po = @parser.parse('440')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(2)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(440)

    po = @parser.parse('1280')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(2)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(1280)


  it "should correctly parse a REM program line", ->

    po = @parser.parse('100 REM')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(4)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(100)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<remark>")

    po = @parser.parse('110 REM WELCOME TO GRANDPA BASIC 1980')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(7)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(110)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<remark>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<characters>")
    expect(po[6]).toEqual('WELCOME TO GRANDPA BASIC 1980')


  it "should correctly parse a numeric assignment program line", ->

    po = @parser.parse('180 X=77')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(10)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(180)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("X")
    expect(po[5]).toEqual("<equals>")
    expect(po[6]).toEqual("<numeric_expression>")
    expect(po[7]).toEqual("<numeric_literal>")
    expect(po[8]).toEqual(77)
    expect(po[9]).toEqual("<num_exp_end>")

    po = @parser.parse('320 K5=K2*K3+(2*K4)')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(21)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(320)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("K5")
    expect(po[5]).toEqual("<equals>")
    expect(po[6]).toEqual("<numeric_expression>")
    expect(po[7]).toEqual("<number_variable>")
    expect(po[8]).toEqual("K2")
    expect(po[9]).toEqual("<times>")
    expect(po[10]).toEqual("<number_variable>")
    expect(po[11]).toEqual("K3")
    expect(po[12]).toEqual("<plus>")
    expect(po[13]).toEqual("<left>")
    expect(po[14]).toEqual("<numeric_literal>")
    expect(po[15]).toEqual(2)
    expect(po[16]).toEqual("<times>")
    expect(po[17]).toEqual("<number_variable>")
    expect(po[18]).toEqual("K4")
    expect(po[19]).toEqual("<right>")
    expect(po[20]).toEqual("<num_exp_end>")

    po = @parser.parse('660 R=1+(B^2-4*A*C)/(2*A)')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(35)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(660)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("R")
    expect(po[5]).toEqual("<equals>")
    expect(po[6]).toEqual("<numeric_expression>")
    expect(po[7]).toEqual("<numeric_literal>")
    expect(po[8]).toEqual(1)
    expect(po[9]).toEqual("<plus>")
    expect(po[10]).toEqual("<left>")
    expect(po[11]).toEqual("<number_variable>")
    expect(po[12]).toEqual("B")
    expect(po[13]).toEqual("<power>")
    expect(po[14]).toEqual("<numeric_literal>")
    expect(po[15]).toEqual(2)
    expect(po[16]).toEqual("<minus>")
    expect(po[17]).toEqual("<numeric_literal>")
    expect(po[18]).toEqual(4)
    expect(po[19]).toEqual("<times>")
    expect(po[20]).toEqual("<number_variable>")
    expect(po[21]).toEqual("A")
    expect(po[22]).toEqual("<times>")
    expect(po[23]).toEqual("<number_variable>")
    expect(po[24]).toEqual("C")
    expect(po[25]).toEqual("<right>")
    expect(po[26]).toEqual("<divide>")
    expect(po[27]).toEqual("<left>")
    expect(po[28]).toEqual("<numeric_literal>")
    expect(po[29]).toEqual(2)
    expect(po[30]).toEqual("<times>")
    expect(po[31]).toEqual("<number_variable>")
    expect(po[32]).toEqual("A")
    expect(po[33]).toEqual("<right>")
    expect(po[34]).toEqual("<num_exp_end>")

    po = @parser.parse('940 F=20*RND')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(12)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(940)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("F")
    expect(po[5]).toEqual("<equals>")
    expect(po[6]).toEqual("<numeric_expression>")
    expect(po[7]).toEqual("<numeric_literal>")
    expect(po[8]).toEqual(20)
    expect(po[9]).toEqual("<times>")
    expect(po[10]).toEqual("<random>")
    expect(po[11]).toEqual("<num_exp_end>")


  it "should correctly parse a string assignment program line", ->

    po = @parser.parse('820 $V="HOY ES VIERNES"')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(10)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(820)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<string_variable>")
    expect(po[4]).toEqual("V")
    expect(po[5]).toEqual("<equals>")
    expect(po[6]).toEqual("<string_expression>")
    expect(po[7]).toEqual("<string_literal>")
    expect(po[8]).toEqual("HOY ES VIERNES")
    expect(po[9]).toEqual("<str_exp_end>")

    po = @parser.parse('1370 $T2=$T4+" IS PART OF "+$T6')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(16)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(1370)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<string_variable>")
    expect(po[4]).toEqual("T2")
    expect(po[5]).toEqual("<equals>")
    expect(po[6]).toEqual("<string_expression>")
    expect(po[7]).toEqual("<string_variable>")
    expect(po[8]).toEqual("T4")
    expect(po[9]).toEqual("<plus>")
    expect(po[10]).toEqual("<string_literal>")
    expect(po[11]).toEqual(" IS PART OF ")
    expect(po[12]).toEqual("<plus>")
    expect(po[13]).toEqual("<string_variable>")
    expect(po[14]).toEqual("T6")
    expect(po[15]).toEqual("<str_exp_end>")


  it "should correctly parse GOTO, GOSUB and RETURN program lines", ->

    po = @parser.parse('1840 GOTO 2100')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(7)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(1840)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<goto>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<line_number>")
    expect(po[6]).toEqual(2100)

    po = @parser.parse('630 GOSUB 1400')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(7)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(630)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<gosub>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<line_number>")
    expect(po[6]).toEqual(1400)

    po = @parser.parse('1499 RETURN')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(4)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(1499)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<return>")


  it "should correctly parse IF statement program lines", ->

    po = @parser.parse('340 IF N>0 THEN 200')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(19)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(340)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<if>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<boolean_expression>")
    expect(po[6]).toEqual("<number_variable>")
    expect(po[7]).toEqual("N")
    expect(po[8]).toEqual("<greater_than>")
    expect(po[9]).toEqual("<numeric_expression>")
    expect(po[10]).toEqual("<numeric_literal>")
    expect(po[11]).toEqual(0)
    expect(po[12]).toEqual("<num_exp_end>")
    expect(po[13]).toEqual("<bool_exp_end>")
    expect(po[14]).toEqual("<sp>")
    expect(po[15]).toEqual("<then>")
    expect(po[16]).toEqual("<sp>")
    expect(po[17]).toEqual("<line_number>")
    expect(po[18]).toEqual(200)

    po = @parser.parse('570 IF $Z="EXTRA" THEN 700')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(19)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(570)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<if>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<boolean_expression>")
    expect(po[6]).toEqual("<string_variable>")
    expect(po[7]).toEqual("Z")
    expect(po[8]).toEqual("<equals>")
    expect(po[9]).toEqual("<string_expression>")
    expect(po[10]).toEqual("<string_literal>")
    expect(po[11]).toEqual("EXTRA")
    expect(po[12]).toEqual("<str_exp_end>")
    expect(po[13]).toEqual("<bool_exp_end>")
    expect(po[14]).toEqual("<sp>")
    expect(po[15]).toEqual("<then>")
    expect(po[16]).toEqual("<sp>")
    expect(po[17]).toEqual("<line_number>")
    expect(po[18]).toEqual(700)


  it "should correctly parse INPUT program lines", ->

    po = @parser.parse('820 INPUT R')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(7)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(820)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<input>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<number_variable>")
    expect(po[6]).toEqual("R")

    po = @parser.parse('410 INPUT $V')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(7)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(410)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<input>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<string_variable>")
    expect(po[6]).toEqual("V")

    po = @parser.parse('750 INPUT "HOW MANY?";M')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(10)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(750)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<input>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<string>")
    expect(po[6]).toEqual("HOW MANY?")
    expect(po[7]).toEqual("<semicolon>")
    expect(po[8]).toEqual("<number_variable>")
    expect(po[9]).toEqual("M")

    po = @parser.parse('1740 INPUT "LAST NAME?";$N2')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(10)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(1740)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<input>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<string>")
    expect(po[6]).toEqual("LAST NAME?")
    expect(po[7]).toEqual("<semicolon>")
    expect(po[8]).toEqual("<string_variable>")
    expect(po[9]).toEqual("N2")


  it "should correctly parse PRINT and PRINTLN program lines", ->

    po = @parser.parse('110 PRINT "WELCOME TO GRANDPA BASIC 1980"')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(9)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(110)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<print>")
    expect(po[4]).toEqual("<sp>")
    expect(po[5]).toEqual("<string_expression>")
    expect(po[6]).toEqual("<string_literal>")
    expect(po[7]).toEqual("WELCOME TO GRANDPA BASIC 1980")
    expect(po[8]).toEqual("<str_exp_end>")

    # po = @parser.parse('820 PRINTLN "INPUT DATA BELOW:"')
    # expect(po).toEqual(jasmine.any(Array))
    # expect(po.length).toEqual(9)
    # expect(po[0]).toEqual("<line_number>")
    # expect(po[1]).toEqual(820)
    # expect(po[2]).toEqual("<sp>")
    # expect(po[3]).toEqual("<print_line>")
    # expect(po[4]).toEqual("<sp>")
    # expect(po[5]).toEqual("<string_expression>")
    # expect(po[6]).toEqual("<string_literal>")
    # expect(po[7]).toEqual("INPUT DATA BELOW:")
    # expect(po[8]).toEqual("<str_exp_end>")


  # it "should correctly parse TAB and CLEARSCRN program lines", ->
  #
  #   po = @parser.parse('1780 TAB 16')
  #   expect(po).toEqual(jasmine.any(Array))
  #   expect(po.length).toEqual(7)
  #   expect(po[0]).toEqual("<line_number>")
  #   expect(po[1]).toEqual(1780)
  #   expect(po[2]).toEqual("<sp>")
  #   expect(po[3]).toEqual("<tab>")
  #   expect(po[4]).toEqual("<sp>")
  #   expect(po[5]).toEqual("<integer>")
  #   expect(po[6]).toEqual(16)
  #
  #   po = @parser.parse('670 TAB 4,20')
  #   expect(po).toEqual(jasmine.any(Array))
  #   expect(po.length).toEqual(10)
  #   expect(po[0]).toEqual("<line_number>")
  #   expect(po[1]).toEqual(670)
  #   expect(po[2]).toEqual("<sp>")
  #   expect(po[3]).toEqual("<tab>")
  #   expect(po[4]).toEqual("<sp>")
  #   expect(po[5]).toEqual("<integer>")
  #   expect(po[6]).toEqual(4)
  #   expect(po[7]).toEqual("<comma>")
  #   expect(po[8]).toEqual("<integer>")
  #   expect(po[9]).toEqual(20)
  #
  #   po = @parser.parse('660 CLEARSCRN')
  #   expect(po).toEqual(jasmine.any(Array))
  #   expect(po.length).toEqual(4)
  #   expect(po[0]).toEqual("<line_number>")
  #   expect(po[1]).toEqual(660)
  #   expect(po[2]).toEqual("<sp>")
  #   expect(po[3]).toEqual("<clear_screen>")


  it "should correctly parse an END program line", ->

    po = @parser.parse('1599 END')
    expect(po).toEqual(jasmine.any(Array))
    expect(po.length).toEqual(4)
    expect(po[0]).toEqual("<line_number>")
    expect(po[1]).toEqual(1599)
    expect(po[2]).toEqual("<sp>")
    expect(po[3]).toEqual("<end>")


  it "should reject any otherwise valid line with extra characters at the end", ->

    po = @parser.parse('CLEAR ALL DATA')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('RUN PROGRAM GB80.BAS')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('INFO FOR GB80')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('LIST PROGRAM')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('1180 X=77 OR Z=77')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('330 $W="TOTAL WEIGHT" =40-3')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('650 GOTO 990 && CONTINUE')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('410 GOSUB 960 RETURN')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('1199 RETURN 870')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('690 IF T>100 THEN 1600 ELSE 1800')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('1290 INPUT X,Y,Z')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('2860 INPUT $V,$V2,$V7')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('1350 INPUT "ENTER VALUE";H;"ENTER QUANTITY";Q')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('840 PRINT "THIS IS IT" X=Y')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('720 PRINTLN; PRINTLN "SUMMARY"')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('890 PRINTLN $R+$U6+" IS "+$I4 AND RETURN')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('140 TAB 16,18,42')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('460 CLEARSCRN & TAB 10,14')
    expect(po).toEqual("<parse_error>")

    po = @parser.parse('1990 END PROGRAM')
    expect(po).toEqual("<parse_error>")

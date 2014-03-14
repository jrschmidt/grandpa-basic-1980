describe "Test numeric expression parser", ->

  beforeEach ->
    @parser = new NumericExpressionParser


  it "should create a NumericExpressionParser object", ->
    expect(@parser).toBeDefined
    expect(@parser).toEqual(jasmine.any(NumericExpressionParser))


  it "should split string at delimiters and tokenize the delimiters", ->

    str = "X"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("X")

    str = "42"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("42")

    str = "13.477"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("13.477")

    str = "12/3"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("12")
    expect(tokens[1]).toEqual("<divide>")
    expect(tokens[2]).toEqual("3")

    str = "477+B"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("477")
    expect(tokens[1]).toEqual("<plus>")
    expect(tokens[2]).toEqual("B")

    str = "C^2"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("C")
    expect(tokens[1]).toEqual("<power>")
    expect(tokens[2]).toEqual("2")

    str = "X*Y*Z"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("X")
    expect(tokens[1]).toEqual("<times>")
    expect(tokens[2]).toEqual("Y")
    expect(tokens[3]).toEqual("<times>")
    expect(tokens[4]).toEqual("Z")

    str = "28*(J+2)"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("28")
    expect(tokens[1]).toEqual("<times>")
    expect(tokens[2]).toEqual("<left>")
    expect(tokens[3]).toEqual("J")
    expect(tokens[4]).toEqual("<plus>")
    expect(tokens[5]).toEqual("2")
    expect(tokens[6]).toEqual("<right>")

    str = "W5+W7-4*(J^2+K^3)"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("W5")
    expect(tokens[1]).toEqual("<plus>")
    expect(tokens[2]).toEqual("W7")
    expect(tokens[3]).toEqual("<minus>")
    expect(tokens[4]).toEqual("4")
    expect(tokens[5]).toEqual("<times>")
    expect(tokens[6]).toEqual("<left>")
    expect(tokens[7]).toEqual("J")
    expect(tokens[8]).toEqual("<power>")
    expect(tokens[9]).toEqual("2")
    expect(tokens[10]).toEqual("<plus>")
    expect(tokens[11]).toEqual("K")
    expect(tokens[12]).toEqual("<power>")
    expect(tokens[13]).toEqual("3")
    expect(tokens[14]).toEqual("<right>")

    str = "(18-Q7)/(2.108*(14*M+17*X))"
    tokens = @parser.tokenize(str)
    expect(tokens).toEqual(jasmine.any(Array))
    expect(tokens[0]).toEqual("<left>")
    expect(tokens[1]).toEqual("18")
    expect(tokens[2]).toEqual("<minus>")
    expect(tokens[3]).toEqual("Q7")
    expect(tokens[4]).toEqual("<right>")
    expect(tokens[5]).toEqual("<divide>")
    expect(tokens[6]).toEqual("<left>")
    expect(tokens[7]).toEqual("2.108")
    expect(tokens[8]).toEqual("<times>")
    expect(tokens[9]).toEqual("<left>")
    expect(tokens[10]).toEqual("14")
    expect(tokens[11]).toEqual("<times>")
    expect(tokens[12]).toEqual("M")
    expect(tokens[13]).toEqual("<plus>")
    expect(tokens[14]).toEqual("17")
    expect(tokens[15]).toEqual("<times>")
    expect(tokens[16]).toEqual("X")
    expect(tokens[17]).toEqual("<right>")
    expect(tokens[18]).toEqual("<right>")


  it "should parse properly formed strings into numeric variables or literals", ->

    result = @parser.numeric_value("0")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("<numeric_literal>")
    expect(result[1]).toEqual(0)

    result = @parser.numeric_value("6")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("<numeric_literal>")
    expect(result[1]).toEqual(6)

    result = @parser.numeric_value("967")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("<numeric_literal>")
    expect(result[1]).toEqual(967)

    result = @parser.numeric_value("428.17")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("<numeric_literal>")
    expect(result[1]).toEqual(428.17)

    result = @parser.numeric_value("X")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("<number_variable>")
    expect(result[1]).toEqual("X")

    result = @parser.numeric_value("K7")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("<number_variable>")
    expect(result[1]).toEqual("K7")

    result = @parser.numeric_value("1,420,366")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("bad")
    expect(result[1]).toEqual("bad")

    result = @parser.numeric_value("$10")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("bad")
    expect(result[1]).toEqual("bad")

    result = @parser.numeric_value("18 737")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("bad")
    expect(result[1]).toEqual("bad")

    result = @parser.numeric_value("PI")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("bad")
    expect(result[1]).toEqual("bad")

    result = @parser.numeric_value("67.40.11")
    expect(result).toEqual(jasmine.any(Array))
    expect(result.length).toEqual(2)
    expect(result[0]).toEqual("bad")
    expect(result[1]).toEqual("bad")


  it "should return a 'not a numeric expression' token for any string that won't parse into a numeric expression", ->

    result = @parser.numeric_parse('"33-7"')
    expect(result).toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('617.42.9')
    expect(result).toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('180-45DEGREES')
    expect(result).toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('"NOTHING PARSEABLE AS A NUMERIC EXPRESSION"')
    expect(result).toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('2*PI')
    expect(result).toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('22,348,507')
    expect(result).toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('45507')
    expect(result).not.toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('102.54')
    expect(result).not.toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('800/37')
    expect(result).not.toEqual("<not_a_numeric_expression>")

    result = @parser.numeric_parse('(66*A)-Z^4')
    expect(result).not.toEqual("<not_a_numeric_expression>")


  it "should parse any properly formed numeric expression", ->

    po = @parser.numeric_parse("X")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<number_variable>")
    expect(po[1]).toEqual("X")

    po = @parser.numeric_parse("42")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<numeric_literal>")
    expect(po[1]).toEqual(42)

    po = @parser.numeric_parse("13.477")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<numeric_literal>")
    expect(po[1]).toEqual(13.477)

    po = @parser.numeric_parse("12/3")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<numeric_literal>")
    expect(po[1]).toEqual(12)
    expect(po[2]).toEqual("<divide>")
    expect(po[3]).toEqual("<numeric_literal>")
    expect(po[4]).toEqual(3)

    po = @parser.numeric_parse("477+B")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<numeric_literal>")
    expect(po[1]).toEqual(477)
    expect(po[2]).toEqual("<plus>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("B")

    po = @parser.numeric_parse("C^2")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<number_variable>")
    expect(po[1]).toEqual("C")
    expect(po[2]).toEqual("<power>")
    expect(po[3]).toEqual("<numeric_literal>")
    expect(po[4]).toEqual(2)

    po = @parser.numeric_parse("X*Y*Z")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<number_variable>")
    expect(po[1]).toEqual("X")
    expect(po[2]).toEqual("<times>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("Y")
    expect(po[5]).toEqual("<times>")
    expect(po[6]).toEqual("<number_variable>")
    expect(po[7]).toEqual("Z")

    po = @parser.numeric_parse("28*(J+2)")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<numeric_literal>")
    expect(po[1]).toEqual(28)
    expect(po[2]).toEqual("<times>")
    expect(po[3]).toEqual("<left>")
    expect(po[4]).toEqual("<number_variable>")
    expect(po[5]).toEqual("J")
    expect(po[6]).toEqual("<plus>")
    expect(po[7]).toEqual("<numeric_literal>")
    expect(po[8]).toEqual(2)
    expect(po[9]).toEqual("<right>")

    po = @parser.numeric_parse("W5+W7-4*(J^2+K^3)")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<number_variable>")
    expect(po[1]).toEqual("W5")
    expect(po[2]).toEqual("<plus>")
    expect(po[3]).toEqual("<number_variable>")
    expect(po[4]).toEqual("W7")
    expect(po[5]).toEqual("<minus>")
    expect(po[6]).toEqual("<numeric_literal>")
    expect(po[7]).toEqual(4)
    expect(po[8]).toEqual("<times>")
    expect(po[9]).toEqual("<left>")
    expect(po[10]).toEqual("<number_variable>")
    expect(po[11]).toEqual("J")
    expect(po[12]).toEqual("<power>")
    expect(po[13]).toEqual("<numeric_literal>")
    expect(po[14]).toEqual(2)
    expect(po[15]).toEqual("<plus>")
    expect(po[16]).toEqual("<number_variable>")
    expect(po[17]).toEqual("K")
    expect(po[18]).toEqual("<power>")
    expect(po[19]).toEqual("<numeric_literal>")
    expect(po[20]).toEqual(3)
    expect(po[21]).toEqual("<right>")

    po = @parser.numeric_parse("(18-Q7)/(2.108*(14*M+17*X))")
    expect(po).toEqual(jasmine.any(Array))
    expect(po[0]).toEqual("<left>")
    expect(po[1]).toEqual("<numeric_literal>")
    expect(po[2]).toEqual(18)
    expect(po[3]).toEqual("<minus>")
    expect(po[4]).toEqual("<number_variable>")
    expect(po[5]).toEqual("Q7")
    expect(po[6]).toEqual("<right>")
    expect(po[7]).toEqual("<divide>")
    expect(po[8]).toEqual("<left>")
    expect(po[9]).toEqual("<numeric_literal>")
    expect(po[10]).toEqual(2.108)
    expect(po[11]).toEqual("<times>")
    expect(po[12]).toEqual("<left>")
    expect(po[13]).toEqual("<numeric_literal>")
    expect(po[14]).toEqual(14)
    expect(po[15]).toEqual("<times>")
    expect(po[16]).toEqual("<number_variable>")
    expect(po[17]).toEqual("M")
    expect(po[18]).toEqual("<plus>")
    expect(po[19]).toEqual("<numeric_literal>")
    expect(po[20]).toEqual(17)
    expect(po[21]).toEqual("<times>")
    expect(po[22]).toEqual("<number_variable>")
    expect(po[23]).toEqual("X")
    expect(po[24]).toEqual("<right>")
    expect(po[25]).toEqual("<right>")





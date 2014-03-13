describe "Test numeric expression parser", ->

  beforeEach ->
    @parser = new NumericExpressionParser


  describe "Test numeric expression parser object", ->

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



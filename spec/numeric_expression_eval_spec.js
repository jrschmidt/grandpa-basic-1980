GB80 = require('../gb80');
NumericExpressionEvaluator = GB80.NumericExpressionEvaluator;
NumericVariableRegister = GB80.NumericVariableRegister;

describe("Numeric expression evaluator", function() {

  beforeEach(function() {
    this.register = new NumericVariableRegister;
    this.evaluator = new NumericExpressionEvaluator(this.register);
  });


  it("should evaluate a numeric literal", function() {
    var expression, expected;

    expression = {
      tag: "<numeric_literal>",
      value: 42
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(42);

    expression = {
      tag: "<numeric_literal>",
      value: 0
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(0);

    expression = {
      tag: "<numeric_literal>",
      value: 6
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(6);

    expression = {
      tag: "<numeric_literal>",
      value: 3.1416
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(3.1416);

  });


  it("should evaluate a reference to a number variable", function() {
    var expression, expected;

    expression = {
      tag: "<numeric_variable>",

      name: "Y"
    };

    this.register.set("Y", 7);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(7);

    expression = {
      tag: "<numeric_variable>",
      name: "A8"
    };

    this.register.set("A8", 0);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(0);

    expression = {
      tag: "<numeric_variable>",
      name: "E"
    };

    this.register.set("E", 944.67);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(944.67);

  });


  it("should evaluate a reference to an RND keyword", function() {
    var expression, expected;

    expression = {
      tag: "<random>"
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toBeGreaterThan(0);
    expect(expected).toBeLessThan(1);

  });


  it("should evaluate a simple binary expression", function() {
    var expression, expected;

    // EVALUATE: 440 + 16

    expression = {
      tag: "<plus>",
      op1: {
        tag: "<numeric_literal>",
        value: 440
      },
      op2: {
        tag: "<numeric_literal>",
        value: 16
      }
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(456);


    // EVALUATE: 888 - 555

    expression = {
      tag: "<minus>",
      op1: {
        tag: "<numeric_literal>",
        value: 888
      },
      op2: {
        tag: "<numeric_literal>",
        value: 555
      }
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(333);


    // EVALUATE: 3 * 17

    expression = {
      tag: "<times>",
      op1: {
        tag: "<numeric_literal>",
        value: 3
      },
      op2: {
        tag: "<numeric_literal>",
        value: 17
      }
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(51);


    // EVALUATE: 8 * RND

    // expression = {
    //   tag: "<times>",
    //   op1: {
    //     tag: "<numeric_literal>",
    //     value: 8
    //   },
    //   op2: {
    //     tag: "<random>"
    //   }
    // };
    //
    // expected = this.evaluator.evaluate(expression);
    // expect(expected).toBeGreaterThan(0);
    // expect(expected).toBeLessThan(8);


    // EVALUATE: 1024 / 256

    expression = {
      tag: "<divide>",
      op1: {
        tag: "<numeric_literal>",
        value: 1024
      },
      op2: {
        tag: "<numeric_literal>",
        value: 256
      }
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(4);


    // EVALUATE: 2 ^ 5

    expression = {
      tag: "<power>",
      op1: {
        tag: "<numeric_literal>",
        value: 2
      },
      op2: {
        tag: "<numeric_literal>",
        value: 5
      }
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(32);

  });


  it("should evaluate compound expressions", function() {
    var expression, op2, expected;

    // EVALUATE: X * Y * Z

    op2 = {
      tag: "<times>",
      op1: {
        tag: "<numeric_variable>",
        name: "Y"
      },
      op2: {
        tag: "<numeric_variable>",
        name: "Z"
      }
    };

    expression = {
      tag: "<times>",
      op1: {
        tag: "<numeric_variable>",
        name: "X"
      },
      op2: op2
    };

    this.register.set("X", 2);
    this.register.set("Y", 3);
    this.register.set("Z", 5);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(30);

    this.register.set("X", 11);
    this.register.set("Y", 3);
    this.register.set("Z", 100);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(3300);


    // EVALUATE: 800 + 12 - 4

    op2 = {
      tag: "<minus>",
      op1: {
        tag: "<numeric_literal>",
        value: 12
      },
      op2: {
        tag: "<numeric_literal>",
        value: 4
      }
    };

    expression = {
      tag: "<plus>",
      op1: {
        tag: "<numeric_literal>",
        value: 800
      },
      op2: op2
    };

    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(808);

  });


  it("should evaluate numeric expressions with parentheses", function() {
    var expression, op1, op1_2, op1_2_2, op2, expected;

    // EVALUATE: (A - B) / 3

    op1 = {
      tag: "<minus>",
      op1: {
        tag: "<numeric_variable>",
        name: "A"
      },
      op2: {
        tag: "<numeric_variable>",
        name: "B"
      }
    };

    expression = {
      tag: "<divide>",
      op1: op1,
      op2: {
        tag: "<numeric_literal>",
        value: 3
      }
    };

    this.register.set("A", 555);
    this.register.set("B", 222);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(111);

    this.register.set("A", 71);
    this.register.set("B", 20);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(17);


    // EVALUATE: W * (40 + L)

    op2 = {
      tag: "<plus>",
      op1: {
        tag: "<numeric_literal>",
        value: 40
      },
      op2: {
        tag: "<numeric_variable>",
        name: "L"
      }
    };

    expression = {
      tag: "<times>",
      op1: {
        tag: "<numeric_variable>",
        name: "W"
      },
      op2: op2
    };

    this.register.set("W", 100);
    this.register.set("L", 28);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(6800);

    this.register.set("W", 7);
    this.register.set("L", 30);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(490);


    // EVALUATE: (14 + M1) / (11 + M2)

    op1 = {
      tag: "<plus>",
      op1: {
        tag: "<numeric_literal>",
        value: 14
      },
      op2: {
        tag: "<numeric_variable>",
        name: "M1"
      }
    };

    op2 = {
      tag: "<plus>",
      op1: {
        tag: "<numeric_literal>",
        value: 11
      },
      op2: {
        tag: "<numeric_variable>",
        name: "M2"
      }
    };

    expression = {
      tag: "<divide>",
      op1: op1,
      op2: op2
    };

    this.register.set("M1", 28);
    this.register.set("M2", 3);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(3);

    this.register.set("M1", 16);
    this.register.set("M2", 9);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(1.5);


    // EVALUATE: (201 - (3 * (L - 7))) / 9

    op1_2_2 = {
      tag: "<minus>",
      op1: {
        tag: "<numeric_variable>",
        name: "L"
      },
      op2: {
        tag: "<numeric_literal>",
        value: 7
      }
    };

    op1_2 = {
      tag: "<times>",
      op1: {
        tag: "<numeric_literal>",
        value: 3
      },
      op2: op1_2_2
    };

    op1 = {
      tag: "<minus>",
      op1: {
        tag: "<numeric_literal>",
        value: 201
      },
      op2: op1_2
    };

    expression = {
      tag: "<divide>",
      op1: op1,
      op2: {
        tag: "<numeric_literal>",
        value: 9
      }
    };

    this.register.set("L", 14);
    expected = this.evaluator.evaluate(expression);
    expect(expected).toEqual(20);

  });


});

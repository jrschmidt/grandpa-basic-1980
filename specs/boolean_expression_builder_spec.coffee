describe "Boolean expression builder", ->

  it "should build a usable boolean expression object from the 'parse object' array", ->

    @builder = new ProgramLineBuilder
    @helper = @builder.bool_exp


    #  TEST:  Z<0
    stack = [
      "<boolean_expression>"
      "<number_variable>"
      "Z"
      "<lesser_than>"
      "<numeric_expression>"
      "<numeric_literal>"
      0
      "<num_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<num_lesser_than>")
    expect(result.var).toEqual("Z")
    expect(result.num_exp.exp).toEqual("<num>")
    expect(result.num_exp.value).toEqual(0)


    #  TEST:  $W="TOMORROW"
    stack = [
      "<boolean_expression>"
      "<string_variable>"
      "W"
      "<equals>"
      "<string_expression>"
      "<string_literal>"
      "TOMORROW"
      "<str_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<str_equals>")
    expect(result.var).toEqual("W")
    expect(result.str_exp[0][0]).toEqual("<str>")
    expect(result.str_exp[0][1]).toEqual("TOMORROW")


    #  TEST:  N>=20
    stack = [
      "<boolean_expression>"
      "<number_variable>"
      "N"
      "<greater_equal>"
      "<numeric_expression>"
      "<numeric_literal>"
      20
      "<num_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<num_greater_equal>")
    expect(result.var).toEqual("N")
    expect(result.num_exp.exp).toEqual("<num>")
    expect(result.num_exp.value).toEqual(20)


    #  TEST:  Q=7
    stack = [
      "<boolean_expression>"
      "<number_variable>"
      "Q"
      "<equals>"
      "<numeric_expression>"
      "<numeric_literal>"
      7
      "<num_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<num_equals>")
    expect(result.var).toEqual("Q")
    expect(result.num_exp.exp).toEqual("<num>")
    expect(result.num_exp.value).toEqual(7)


    #  TEST:  L4>L5
    stack = [
      "<boolean_expression>"
      "<number_variable>"
      "L4"
      "<greater_than>"
      "<numeric_expression>"
      "<number_variable>"
      "L5"
      "<num_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<num_greater_than>")
    expect(result.var).toEqual("L4")
    expect(result.num_exp.exp).toEqual("<var>")
    expect(result.num_exp.name).toEqual("L5")


    #  TEST:  V<=P+4
    stack = [
      "<boolean_expression>"
      "<number_variable>"
      "V"
      "<lesser_equal>"
      "<numeric_expression>"
      "<number_variable>"
      "P"
      "<plus>"
      "<numeric_literal>"
      4
      "<num_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<num_lesser_equal>")
    expect(result.var).toEqual("V")
    expect(result.num_exp.exp).toEqual("<plus>")
    expect(result.num_exp.op1.exp).toEqual("<var>")
    expect(result.num_exp.op1.name).toEqual("P")
    expect(result.num_exp.op2.exp).toEqual("<num>")
    expect(result.num_exp.op2.value).toEqual(4)


    #  TEST:  $H<>"YES"
    stack = [
      "<boolean_expression>"
      "<string_variable>"
      "H"
      "<not_equal>"
      "<string_expression>"
      "<string_literal>"
      "YES"
      "<str_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<str_not_equal>")
    expect(result.var).toEqual("H")
    expect(result.str_exp[0][0]).toEqual("<str>")
    expect(result.str_exp[0][1]).toEqual("YES")


    #  TEST:  A<>B
    stack = [
      "<boolean_expression>"
      "<number_variable>"
      "A"
      "<not_equal>"
      "<numeric_expression>"
      "<number_variable>"
      "B"
      "<num_exp_end>"
      "<bool_exp_end>" ]

    result = @helper.build_bool_exp(stack)

    expect(result.exp).toEqual("<num_not_equal>")
    expect(result.var).toEqual("A")
    expect(result.num_exp.exp).toEqual("<var>")
    expect(result.num_exp.name).toEqual("B")



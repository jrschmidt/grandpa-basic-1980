// Generated by CoffeeScript 1.7.1
xdescribe("String expression concatenator", function() {
  beforeEach(function() {
    var hh;
    this.str_vars = new StringVariableRegister;
    hh = {
      str_vars: this.str_vars
    };
    return this.str_concat = new StringExpressionConcatenator(hh);
  });
  it("should evaluate a string literal", function() {
    var str, value;
    str = [["<str>", "HELLO"]];
    value = this.str_concat.val(str);
    expect(value).toEqual("HELLO");
    str = [["<str>", "THE SUM IS "]];
    value = this.str_concat.val(str);
    expect(value).toEqual("THE SUM IS ");
    str = [["<str>", "JAMES"]];
    value = this.str_concat.val(str);
    return expect(value).toEqual("JAMES");
  });
  it("should evaluate a reference to a string variable", function() {
    var str, value;
    str = [["<var>", "Q4"]];
    this.str_vars.set("Q4", "BRANCHES");
    value = this.str_concat.val(str);
    expect(value).toEqual("BRANCHES");
    str = [["<var>", "D"]];
    this.str_vars.set("D", "FRIDAY");
    value = this.str_concat.val(str);
    expect(value).toEqual("FRIDAY");
    str = [["<var>", "Y8"]];
    this.str_vars.set("Y8", "TURTLES AND RABBITS");
    value = this.str_concat.val(str);
    return expect(value).toEqual("TURTLES AND RABBITS");
  });
  return it("should evaluate a multi-part string expression", function() {
    var str, value;
    str = [["<var>", "Z"], ["<str>", "BYTES IN FILE"]];
    this.str_vars.set("Z", "NO ");
    value = this.str_concat.val(str);
    expect(value).toEqual("NO BYTES IN FILE");
    str = [["<var>", "C1"], ["<str>", " WITH "], ["<var>", "C2"], ["<str>", " OR "], ["<var>", "C3"]];
    this.str_vars.set("C1", "POLYGONS");
    this.str_vars.set("C2", "DOTS");
    this.str_vars.set("C3", "TINY CIRCLES");
    value = this.str_concat.val(str);
    return expect(value).toEqual("POLYGONS WITH DOTS OR TINY CIRCLES");
  });
});
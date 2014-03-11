// Generated by CoffeeScript 1.7.1
describe("Test Basic program line parser", function() {
  beforeEach(function() {
    return this.parser = new LineParser;
  });
  return describe("Test line parser object", function() {
    it("should create a LineParser object", function() {
      expect(this.parser).toBeDefined;
      return expect(this.parser).toEqual(jasmine.any(LineParser));
    });
    return it("should parse a valid string into a parse object", function() {
      var po;
      po = this.parser.parse("CLEAR");
      expect(po).toEqual(jasmine.any(Array));
      return expect(po[0]).toEqual("<clear>");
    });
  });
});
// Generated by CoffeeScript 1.6.3
describe("Test GB80 Console functions", function() {
  beforeEach(function() {
    this.console = new Gb80Console;
    return this.clean_console = {
      "status": "clean",
      "lines": []
    };
  });
  describe("Test console object", function() {
    return it("should create a Gb80Console object", function() {
      expect(this.console).toBeDefined;
      expect(this.console).toEqual(jasmine.any(Gb80Console));
      expect(this.console.status).toEqual("clean");
      return expect(this.console.lines).toEqual([]);
    });
  });
  describe("Test console line fetch", function() {
    it("should fetch lines from console", function() {
      this.console.lines.push('10 REM WELCOME TO GRANDPA BASIC 80');
      return expect(this.console.fetch(0)).toEqual('10 REM WELCOME TO GRANDPA BASIC 80');
    });
    return it("should add lines to console", function() {
      this.console.addline('10 REM WELCOME TO GRANDPA BASIC 80');
      this.console.addline('20 $T = "JOHN R SCHMIDT"');
      this.console.addline('30 INPUT "DISPLAY NAME (Y/N)?";$Y');
      this.console.addline('40 IF $Y<>"Y" THEN 100');
      this.console.addline('50 PRINT "WRITTEN BY "+$T');
      this.console.addline('100 PRINT "OK BYE"');
      this.console.addline('999 END');
      expect(this.console.fetch(0)).toEqual('10 REM WELCOME TO GRANDPA BASIC 80');
      expect(this.console.fetch(1)).toEqual('20 $T = "JOHN R SCHMIDT"');
      expect(this.console.fetch(2)).toEqual('30 INPUT "DISPLAY NAME (Y/N)?";$Y');
      expect(this.console.fetch(3)).toEqual('40 IF $Y<>"Y" THEN 100');
      expect(this.console.fetch(4)).toEqual('50 PRINT "WRITTEN BY "+$T');
      expect(this.console.fetch(5)).toEqual('100 PRINT "OK BYE"');
      return expect(this.console.fetch(6)).toEqual('999 END');
    });
  });
  return describe("Test console line object", function() {
    beforeEach(function() {
      return this.c_line = this.console.line;
    });
    it("should create a ConsoleLine object", function() {
      expect(this.c_line).toBeDefined;
      expect(this.c_line).toEqual(jasmine.any(ConsoleLine));
      return expect(this.c_line.get_text()).toEqual("");
    });
    it("should fetch the console line text", function() {
      this.c_line.text = '10 REM WELCOME TO GRANDPA BASIC 80';
      return expect(this.c_line.get_text()).toEqual('10 REM WELCOME TO GRANDPA BASIC 80');
    });
    return it("should set the console line text", function() {
      this.c_line.set_text('10 REM WELCOME TO GRANDPA BASIC 80');
      return expect(this.c_line.get_text()).toEqual('10 REM WELCOME TO GRANDPA BASIC 80');
    });
  });
});

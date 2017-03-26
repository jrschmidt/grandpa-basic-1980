// Generated by CoffeeScript 1.7.1
xdescribe("BASIC Console", function() {
  beforeEach(function() {
    this.console = new BasicConsole;
    return this.console.log_chars = true;
  });
  afterEach(function() {
    this.console.clear_all();
    return this.console.log_chars = true;
  });
  it("should print a character at a given location", function() {
    this.console.ch_ln_col("A", 1, 0);
    expect(this.console.line_text).toEqual("A [1,0]");
    this.console.ch_ln_col("B", 1, 10);
    expect(this.console.line_text).toEqual("B [1,10]");
    this.console.ch_ln_col("C", 1, 20);
    expect(this.console.line_text).toEqual("C [1,20]");
    this.console.ch_ln_col("D", 1, 30);
    expect(this.console.line_text).toEqual("D [1,30]");
    this.console.ch_ln_col("E", 1, 40);
    expect(this.console.line_text).toEqual("E [1,40]");
    this.console.ch_ln_col("F", 1, 50);
    expect(this.console.line_text).toEqual("F [1,50]");
    this.console.ch_ln_col("G", 1, 60);
    expect(this.console.line_text).toEqual("G [1,60]");
    this.console.ch_ln_col("H", 2, 5);
    expect(this.console.line_text).toEqual("H [2,5]");
    this.console.ch_ln_col("I", 2, 15);
    expect(this.console.line_text).toEqual("I [2,15]");
    this.console.ch_ln_col("J", 2, 25);
    expect(this.console.line_text).toEqual("J [2,25]");
    this.console.ch_ln_col("K", 2, 35);
    expect(this.console.line_text).toEqual("K [2,35]");
    this.console.ch_ln_col("L", 2, 45);
    expect(this.console.line_text).toEqual("L [2,45]");
    this.console.ch_ln_col("M", 2, 55);
    expect(this.console.line_text).toEqual("M [2,55]");
    this.console.ch_ln_col("N", 3, 0);
    expect(this.console.line_text).toEqual("N [3,0]");
    this.console.ch_ln_col("O", 3, 10);
    expect(this.console.line_text).toEqual("O [3,10]");
    this.console.ch_ln_col("P", 3, 20);
    expect(this.console.line_text).toEqual("P [3,20]");
    this.console.ch_ln_col("Q", 3, 30);
    expect(this.console.line_text).toEqual("Q [3,30]");
    this.console.ch_ln_col("R", 3, 40);
    expect(this.console.line_text).toEqual("R [3,40]");
    this.console.ch_ln_col("S", 3, 50);
    expect(this.console.line_text).toEqual("S [3,50]");
    this.console.ch_ln_col("T", 3, 60);
    expect(this.console.line_text).toEqual("T [3,60]");
    this.console.ch_ln_col("U", 4, 5);
    expect(this.console.line_text).toEqual("U [4,5]");
    this.console.ch_ln_col("V", 4, 15);
    expect(this.console.line_text).toEqual("V [4,15]");
    this.console.ch_ln_col("W", 4, 25);
    expect(this.console.line_text).toEqual("W [4,25]");
    this.console.ch_ln_col("X", 4, 35);
    expect(this.console.line_text).toEqual("X [4,35]");
    this.console.ch_ln_col("Y", 4, 45);
    expect(this.console.line_text).toEqual("Y [4,45]");
    this.console.ch_ln_col("Z", 4, 55);
    expect(this.console.line_text).toEqual("Z [4,55]");
    this.console.ch_ln_col("0", 5, 20);
    expect(this.console.line_text).toEqual("0 [5,20]");
    this.console.ch_ln_col("1", 6, 21);
    expect(this.console.line_text).toEqual("1 [6,21]");
    this.console.ch_ln_col("2", 7, 22);
    expect(this.console.line_text).toEqual("2 [7,22]");
    this.console.ch_ln_col("3", 8, 23);
    expect(this.console.line_text).toEqual("3 [8,23]");
    this.console.ch_ln_col("4", 9, 24);
    expect(this.console.line_text).toEqual("4 [9,24]");
    this.console.ch_ln_col("5", 10, 25);
    expect(this.console.line_text).toEqual("5 [10,25]");
    this.console.ch_ln_col("6", 11, 26);
    expect(this.console.line_text).toEqual("6 [11,26]");
    this.console.ch_ln_col("7", 12, 27);
    expect(this.console.line_text).toEqual("7 [12,27]");
    this.console.ch_ln_col("8", 13, 28);
    expect(this.console.line_text).toEqual("8 [13,28]");
    this.console.ch_ln_col("9", 14, 29);
    return expect(this.console.line_text).toEqual("9 [14,29]");
  });
  it("should print a string of characters", function() {
    this.console.print("10 REM - WELCOME TO GRANDPA BASIC 1980");
    return expect(this.console.line_text).toEqual("10 REM - WELCOME TO GRANDPA BASIC 1980");
  });
  it("should clear the screen of text", function() {
    this.console.clear_all();
    return expect(this.console.line_text).toEqual("");
  });
  return it("should print multiple lines of text", function() {
    this.console.println('10 REM - WELCOME TO GRANDPA BASIC 1980');
    expect(this.console.line_text).toEqual('10 REM - WELCOME TO GRANDPA BASIC 1980');
    this.console.println('20 $T = "JOHN"');
    expect(this.console.line_text).toEqual('20 $T = "JOHN"');
    this.console.println('30 INPUT "DISPLAY NAME (Y/N)?";$Y');
    expect(this.console.line_text).toEqual('30 INPUT "DISPLAY NAME (Y/N)?";$Y');
    this.console.println('40 IF $Y<>"Y" THEN 100');
    expect(this.console.line_text).toEqual('40 IF $Y<>"Y" THEN 100');
    this.console.println('50 PRINT "WRITTEN BY "+$T');
    expect(this.console.line_text).toEqual('50 PRINT "WRITTEN BY "+$T');
    this.console.println('100 PRINT "OK BYE"');
    expect(this.console.line_text).toEqual('100 PRINT "OK BYE"');
    this.console.println('999 END');
    return expect(this.console.line_text).toEqual('999 END');
  });
});

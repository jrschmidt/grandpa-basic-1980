class BasicProgram

  constructor: () ->
    @lines = []


  addline: (n, text) ->
    existing = @lines.filter( (ln) -> ln.ln_no == n )
    if existing.length == 0
      @lines.push( { "ln_no" : n, "text" : text } )
    else
      existing[0].text = text


  fetch: (line_no) ->
    existing = @lines.filter( (ln) -> ln.ln_no == line_no )
    if existing.length == 0
      return {}
    else
      return existing[0]


  remove: (line_no) ->
    line = @fetch(line_no)
    if line != {}
      line.ln_no = null
      line.text = null



class BasicProgramLine

  constructor: (n,str) ->
    @ln_no = n
    @text = str
    @tokens = []



class LineParser

  parse: (string) ->
    original_string = string
    line = []

    x = @look_for_command(string)
    if x != null
      line = [x]
    else
      look_for = @look_for_line_number(string)
      ln = look_for[0]
      string = look_for[1]
      line[0] = "<line_number>"
      line[1] = ln
      token1 = @look_for_numeric_identifier(string)
      if token1 != null
        line[2] = "<numeric_identifier>"
        line[3] = token1
        line[4] = "<equals_sign>"

    return line


  look_for_command: (string) ->
    cmd = null
    cmd = "<clear>" if string == "CLEAR"
    cmd = "<run>" if string == "RUN"
    cmd = "<info>" if string == "INFO"
    cmd = "<list>" if string == "LIST"
    return cmd


  look_for_line_number: (string) ->
    n = parseInt(string)
    if n>0
      string = string.slice(String(n).length+1)
    else
      n = 0
    return [n,string]


  look_for_numeric_identifier: (string) ->
    id = null
    size = 0
    find = string.search(/[A-Z][0-9]?=/)
    if find == 0
      size = string.indexOf("=")
      id = string.slice(0,size)
      string = string.slice(size+1)
    return id



class NumericExpressionParser



class KeyHelper

  constructor: () ->
    @code = [33,34,35,36,37,38,39,
             40,41,42,43,44,45,46,47,48,49,
             50,51,52,53,54,55,56,57,58,59,
             60,61,62,63,64,
             92,94,95,96,97,98,99,
             100,101,102,103,104,105,106,107,108,109,
             110,111,112,113,114,115,116,117,118,119,
             120,121,122,123,124,125,126]

    @chars = [ "!", "DOUBLE QUOTE", "#", "$", "%", "&", "SINGLE QUOTE",
               "(", ")", "*", "+", ",", "-", ".", "/", "0", "1",
               "2", "3", "4", "5", "6", "7", "8", "9", ":", ";",
               "<", "=", ">", "?", "@",
               "BACK SLASH", "^", "_", "`", "A", "B", "C",
               "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
               "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W",
               "X", "Y", "Z", "{", "|", "}","~" ]

    @xy = [ [99,72], [33,72], [33,90], [77,72], [88,72], [44,90], [22,72],
            [66,54], [77,54], [33,54], [11,54], [55,72], [22,54], [44,72], [44,54], [0,36], [11,36],
            [22,36], [33,36], [44,36], [55,36], [66,36], [77,36], [88,36], [99,36], [0,72], [11,72],
            [88,54], [0,54], [99,54], [66,72], [22,90],
            [88,90], [55,54], [55,90], [0,90], [0,0], [11,0], [22,0],
            [33,0], [44,0], [55,0], [66,0], [77,0], [88,0], [99,0], [110,0], [121,0], [132,0],
            [0,18], [11,18], [22,18], [33,18], [44,18], [55,18], [66,18], [77,18], [88,18], [99,18],
            [110,18], [121,18], [132,18], [66,90], [99,90], [77,90],[11,90] ]


  char: (n) ->
    if n in @code
      i = @code.indexOf(n)
      return @chars[i]


  sprite_xy: (n) ->
    if n in @code
      i = @code.indexOf(n)
      return @xy[i]



class LineBuffer

  constructor: () ->
    @text = ""


  set_text: (string) ->
    @text = string


  get_text: () ->
    return @text



class logLevel {
  static DEBUG = new logLevel("DEBUG", 0);
  static FINE = new logLevel("FINE", 100);
  static INFO = new logLevel("INFO", 200);
  static STATUS = new logLevel("STATUS", 300);
  static WARN = new logLevel("WARN", 400);
  static ERROR = new logLevel("ERROR", 500);

  constructor(def, value) {
    this.def = def;
    this.value = value;
  }

  getLevel(level) {
    if (Symbol(level) instanceof logLevel) {
      return level.value;
    } else {
      // Custom or Wrong level
      return 1000;
    }
  }
}

module.exports = logLevel;

//eLog(logLevel.SEVERITY, "SCOPE", "MESSAGE")
//eLog(logLevel.SEVERITY, "SCOPE", "MESSAGE", true)
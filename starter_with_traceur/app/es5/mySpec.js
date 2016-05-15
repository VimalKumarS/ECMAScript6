"use strict";
describe("how to run a test", function() {
  it("should work...", function() {
    var add = (function(x, y) {
      return x + y;
    });
    expect(add(5, 3)).toBe(8);
  });
  it("will provide block scoping, unlike var", function() {
    var doWork = function(flag) {
      if (flag) {
        try {
          throw undefined;
        } catch (x) {
          x = 3;
        }
      }
      return x;
    };
    var result = doWork(false);
    expect(result).toBe(3);
  });
  it("will provide block scoping, for", function() {
    var doWork = function() {
      {
        try {
          throw undefined;
        } catch ($i) {
          $i = 0;
          for (; $i < 10; $i++) {
            try {
              throw undefined;
            } catch (i) {
              i = $i;
              try {} finally {
                $i = i;
              }
            }
          }
        }
      }
      return i;
    };
    var result = doWork();
    expect(result).toThrow(new Error("i is not defined"));
  });
  it("Read only variable", function() {
    var Max_Size = 10;
    expect(Max_Size).toBe(10);
  });
  it("Read only variable", function() {
    var x = 12;
    var doWork = function() {
      var x = 10;
      return x;
    };
    var result = doWork();
    expect(result).toBe(10);
    expect(x).toBe(12);
  });
  it("destructuring", function() {
    var x = 2;
    var y = 3;
    var $__1 = $traceurRuntime.assertObject($traceurRuntime.setProperty([1, 2, 3, 4], x, y, [y, x])),
        p = $__1[1],
        q = $__1[2],
        r = $__1[3],
        s = $__1[4];
    expect(x).toBe(3);
    expect(y).toBe(2);
    expect(s).toBeUndefined();
  });
  it("work with parameters", function() {
    var doWork = function(url, $__1) {
      var data = $__1.data,
          cache = $__1.cache,
          header = $__1.header;
      return data;
    };
    var result = doWork("api/test", {
      data: "test",
      cahce: false
    });
    expect(result).toBe("test");
  });
  it("Provide defaults", function() {
    var doWork = function() {
      var name = arguments[0] !== (void 0) ? arguments[0] : "vimal";
      return name;
    };
    var result = doWork();
    expect(result).toBe("vimal");
  });
  it("Rest Paramters", function() {
    var doWork = function(name) {
      for (var numbers = [],
          $__0 = 1; $__0 < arguments.length; $__0++)
        $traceurRuntime.setProperty(numbers, $__0 - 1, arguments[$traceurRuntime.toProperty($__0)]);
      var result = 0;
      numbers.forEach(function(n) {
        result += n;
      });
    };
    var result = doWork("vimal", 1, 6, 3, 4);
    expect(result).toBe();
  });
});

//# sourceMappingURL=mySpec.js.map

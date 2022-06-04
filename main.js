function lookup(vars, path) {
  var result;
  var parts = path.split(".");
  if (parts.length === 1) {
      var key = parts[0];
      if (key in vars)
        result = vars[parts[0]];
  } else {
      if (parts[0] in vars)
        result = lookup(vars[parts[0]], parts.slice(1).join('.'));
  }

  return result;
}

function replace(input, vars, log) {
  var result = {};

  for (var key in input) {
    if (log) {
      console.log(input, key);
    }
    if (typeof input[key] === "object") {
      result[key] = replace(input[key], vars);
    } else {
      if (input[key].startsWith("$")) {
        result[key] = lookup(vars, input[key].slice(1));
      } else {
        result[key] = input[key];
      }
    }
  }

  return result;
}

exports.replace = replace;
exports.lookup = lookup;

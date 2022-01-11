(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');
		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $author$project$Definition$Blair = {$: 'Blair'};
var $author$project$Definition$Click1 = {$: 'Click1'};
var $author$project$Definition$Doherty = {$: 'Doherty'};
var $author$project$Definition$GetSize = function (a) {
	return {$: 'GetSize', a: a};
};
var $author$project$Definition$Gorman = {$: 'Gorman'};
var $author$project$Definition$Lance = {$: 'Lance'};
var $author$project$Definition$LetUsStart = {$: 'LetUsStart'};
var $author$project$Definition$Medium = {$: 'Medium'};
var $author$project$Definition$NoActionDice = {$: 'NoActionDice'};
var $author$project$Definition$NoDice = {$: 'NoDice'};
var $author$project$Definition$NoSide = {$: 'NoSide'};
var $author$project$Definition$NoTop = {$: 'NoTop'};
var $author$project$Definition$NotShowDice = {$: 'NotShowDice'};
var $author$project$Definition$Play = {$: 'Play'};
var $author$project$Definition$PreparationPhase = {$: 'PreparationPhase'};
var $author$project$Definition$StartGameMessage = F3(
	function (a, b, c) {
		return {$: 'StartGameMessage', a: a, b: b, c: c};
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Model$aiAction = {
	add: _List_fromArray(
		[
			_Utils_Tuple2(0, 0),
			_Utils_Tuple2(0, 0),
			_Utils_Tuple2(0, 0)
		]),
	count: _Utils_Tuple2(0, 0),
	fight: _List_fromArray(
		[
			_Utils_Tuple3(-1, 0, true),
			_Utils_Tuple3(-1, 0, true),
			_Utils_Tuple3(-1, 0, true)
		]),
	move: 0,
	order: -1,
	upgrade: -1
};
var $rtfeldman$elm_css$VirtualDom$Styled$Node = F3(
	function (a, b, c) {
		return {$: 'Node', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$VirtualDom$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$Node;
var $rtfeldman$elm_css$Html$Styled$node = $rtfeldman$elm_css$VirtualDom$Styled$node;
var $rtfeldman$elm_css$Html$Styled$button = $rtfeldman$elm_css$Html$Styled$node('button');
var $rtfeldman$elm_css$Css$Preprocess$ExtendSelector = F2(
	function (a, b) {
		return {$: 'ExtendSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$PseudoClassSelector = function (a) {
	return {$: 'PseudoClassSelector', a: a};
};
var $rtfeldman$elm_css$Css$pseudoClass = function (_class) {
	return $rtfeldman$elm_css$Css$Preprocess$ExtendSelector(
		$rtfeldman$elm_css$Css$Structure$PseudoClassSelector(_class));
};
var $rtfeldman$elm_css$Css$active = $rtfeldman$elm_css$Css$pseudoClass('active');
var $rtfeldman$elm_css$Css$Structure$PseudoElement = function (a) {
	return {$: 'PseudoElement', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$WithPseudoElement = F2(
	function (a, b) {
		return {$: 'WithPseudoElement', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$pseudoElement = function (element) {
	return $rtfeldman$elm_css$Css$Preprocess$WithPseudoElement(
		$rtfeldman$elm_css$Css$Structure$PseudoElement(element));
};
var $rtfeldman$elm_css$Css$after = $rtfeldman$elm_css$Css$pseudoElement('after');
var $rtfeldman$elm_css$Css$Preprocess$AppendProperty = function (a) {
	return {$: 'AppendProperty', a: a};
};
var $rtfeldman$elm_css$Css$property = F2(
	function (key, value) {
		return $rtfeldman$elm_css$Css$Preprocess$AppendProperty(key + (':' + value));
	});
var $rtfeldman$elm_css$Css$prop1 = F2(
	function (key, arg) {
		return A2($rtfeldman$elm_css$Css$property, key, arg.value);
	});
var $rtfeldman$elm_css$Css$animationDuration = function (arg) {
	return A2($rtfeldman$elm_css$Css$prop1, 'animation-duration', arg);
};
var $rtfeldman$elm_css$Css$Preprocess$WithKeyframes = function (a) {
	return {$: 'WithKeyframes', a: a};
};
var $rtfeldman$elm_css$Css$animationName = function (arg) {
	return ((arg.value === 'none') || ((arg.value === 'inherit') || ((arg.value === 'unset') || (arg.value === 'initial')))) ? A2($rtfeldman$elm_css$Css$prop1, 'animation-name', arg) : $rtfeldman$elm_css$Css$Preprocess$WithKeyframes(arg.value);
};
var $rtfeldman$elm_css$Css$before = $rtfeldman$elm_css$Css$pseudoElement('before');
var $rtfeldman$elm_css$VirtualDom$Styled$Attribute = F3(
	function (a, b, c) {
		return {$: 'Attribute', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence = function (a) {
	return {$: 'UniversalSelectorSequence', a: a};
};
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$core$Basics$not = _Basics_not;
var $elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			$elm$core$List$any,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, isOkay),
			list);
	});
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $rtfeldman$elm_css$Css$Structure$compactHelp = F2(
	function (declaration, _v0) {
		var keyframesByName = _v0.a;
		var declarations = _v0.b;
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var _v2 = declaration.a;
				var properties = _v2.c;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'MediaRule':
				var styleBlocks = declaration.b;
				return A2(
					$elm$core$List$all,
					function (_v3) {
						var properties = _v3.c;
						return $elm$core$List$isEmpty(properties);
					},
					styleBlocks) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'SupportsRule':
				var otherDeclarations = declaration.b;
				return $elm$core$List$isEmpty(otherDeclarations) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'DocumentRule':
				return _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'PageRule':
				var properties = declaration.b;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'FontFace':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'Keyframes':
				var record = declaration.a;
				return $elm$core$String$isEmpty(record.declaration) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					A3($elm$core$Dict$insert, record.name, record.declaration, keyframesByName),
					declarations);
			case 'Viewport':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			case 'CounterStyle':
				var properties = declaration.a;
				return $elm$core$List$isEmpty(properties) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
			default:
				var tuples = declaration.a;
				return A2(
					$elm$core$List$all,
					function (_v4) {
						var properties = _v4.b;
						return $elm$core$List$isEmpty(properties);
					},
					tuples) ? _Utils_Tuple2(keyframesByName, declarations) : _Utils_Tuple2(
					keyframesByName,
					A2($elm$core$List$cons, declaration, declarations));
		}
	});
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $rtfeldman$elm_css$Css$Structure$Keyframes = function (a) {
	return {$: 'Keyframes', a: a};
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations = F2(
	function (keyframesByName, compactedDeclarations) {
		return A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				function (_v0) {
					var name = _v0.a;
					var decl = _v0.b;
					return $rtfeldman$elm_css$Css$Structure$Keyframes(
						{declaration: decl, name: name});
				},
				$elm$core$Dict$toList(keyframesByName)),
			compactedDeclarations);
	});
var $rtfeldman$elm_css$Css$Structure$compactStylesheet = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	var _v1 = A3(
		$elm$core$List$foldr,
		$rtfeldman$elm_css$Css$Structure$compactHelp,
		_Utils_Tuple2($elm$core$Dict$empty, _List_Nil),
		declarations);
	var keyframesByName = _v1.a;
	var compactedDeclarations = _v1.b;
	var finalDeclarations = A2($rtfeldman$elm_css$Css$Structure$withKeyframeDeclarations, keyframesByName, compactedDeclarations);
	return {charset: charset, declarations: finalDeclarations, imports: imports, namespaces: namespaces};
};
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $rtfeldman$elm_css$Css$Structure$Output$charsetToString = function (charset) {
	return A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			function (str) {
				return '@charset \"' + (str + '\"');
			},
			charset));
};
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString = function (expression) {
	return '(' + (expression.feature + (A2(
		$elm$core$Maybe$withDefault,
		'',
		A2(
			$elm$core$Maybe$map,
			$elm$core$Basics$append(': '),
			expression.value)) + ')'));
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString = function (mediaType) {
	switch (mediaType.$) {
		case 'Print':
			return 'print';
		case 'Screen':
			return 'screen';
		default:
			return 'speech';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString = function (mediaQuery) {
	var prefixWith = F3(
		function (str, mediaType, expressions) {
			return str + (' ' + A2(
				$elm$core$String$join,
				' and ',
				A2(
					$elm$core$List$cons,
					$rtfeldman$elm_css$Css$Structure$Output$mediaTypeToString(mediaType),
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions))));
		});
	switch (mediaQuery.$) {
		case 'AllQuery':
			var expressions = mediaQuery.a;
			return A2(
				$elm$core$String$join,
				' and ',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaExpressionToString, expressions));
		case 'OnlyQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'only', mediaType, expressions);
		case 'NotQuery':
			var mediaType = mediaQuery.a;
			var expressions = mediaQuery.b;
			return A3(prefixWith, 'not', mediaType, expressions);
		default:
			var str = mediaQuery.a;
			return str;
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString = F2(
	function (name, mediaQuery) {
		return '@import \"' + (name + ($rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString(mediaQuery) + '\"'));
	});
var $rtfeldman$elm_css$Css$Structure$Output$importToString = function (_v0) {
	var name = _v0.a;
	var mediaQueries = _v0.b;
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			$rtfeldman$elm_css$Css$Structure$Output$importMediaQueryToString(name),
			mediaQueries));
};
var $rtfeldman$elm_css$Css$Structure$Output$namespaceToString = function (_v0) {
	var prefix = _v0.a;
	var str = _v0.b;
	return '@namespace ' + (prefix + ('\"' + (str + '\"')));
};
var $rtfeldman$elm_css$Css$Structure$Output$spaceIndent = '    ';
var $rtfeldman$elm_css$Css$Structure$Output$indent = function (str) {
	return _Utils_ap($rtfeldman$elm_css$Css$Structure$Output$spaceIndent, str);
};
var $rtfeldman$elm_css$Css$Structure$Output$noIndent = '';
var $rtfeldman$elm_css$Css$Structure$Output$emitProperty = function (str) {
	return str + ';';
};
var $rtfeldman$elm_css$Css$Structure$Output$emitProperties = function (properties) {
	return A2(
		$elm$core$String$join,
		'\n',
		A2(
			$elm$core$List$map,
			A2($elm$core$Basics$composeL, $rtfeldman$elm_css$Css$Structure$Output$indent, $rtfeldman$elm_css$Css$Structure$Output$emitProperty),
			properties));
};
var $elm$core$String$append = _String_append;
var $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString = function (_v0) {
	var str = _v0.a;
	return '::' + str;
};
var $rtfeldman$elm_css$Css$Structure$Output$combinatorToString = function (combinator) {
	switch (combinator.$) {
		case 'AdjacentSibling':
			return '+';
		case 'GeneralSibling':
			return '~';
		case 'Child':
			return '>';
		default:
			return '';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString = function (repeatableSimpleSelector) {
	switch (repeatableSimpleSelector.$) {
		case 'ClassSelector':
			var str = repeatableSimpleSelector.a;
			return '.' + str;
		case 'IdSelector':
			var str = repeatableSimpleSelector.a;
			return '#' + str;
		case 'PseudoClassSelector':
			var str = repeatableSimpleSelector.a;
			return ':' + str;
		default:
			var str = repeatableSimpleSelector.a;
			return '[' + (str + ']');
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString = function (simpleSelectorSequence) {
	switch (simpleSelectorSequence.$) {
		case 'TypeSelectorSequence':
			var str = simpleSelectorSequence.a.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
		case 'UniversalSelectorSequence':
			var repeatableSimpleSelectors = simpleSelectorSequence.a;
			return $elm$core$List$isEmpty(repeatableSimpleSelectors) ? '*' : A2(
				$elm$core$String$join,
				'',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors));
		default:
			var str = simpleSelectorSequence.a;
			var repeatableSimpleSelectors = simpleSelectorSequence.b;
			return A2(
				$elm$core$String$join,
				'',
				A2(
					$elm$core$List$cons,
					str,
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$repeatableSimpleSelectorToString, repeatableSimpleSelectors)));
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString = function (_v0) {
	var combinator = _v0.a;
	var sequence = _v0.b;
	return A2(
		$elm$core$String$join,
		' ',
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$Output$combinatorToString(combinator),
				$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(sequence)
			]));
};
var $rtfeldman$elm_css$Css$Structure$Output$selectorToString = function (_v0) {
	var simpleSelectorSequence = _v0.a;
	var chain = _v0.b;
	var pseudoElement = _v0.c;
	var segments = A2(
		$elm$core$List$cons,
		$rtfeldman$elm_css$Css$Structure$Output$simpleSelectorSequenceToString(simpleSelectorSequence),
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$selectorChainToString, chain));
	var pseudoElementsString = A2(
		$elm$core$String$join,
		'',
		_List_fromArray(
			[
				A2(
				$elm$core$Maybe$withDefault,
				'',
				A2($elm$core$Maybe$map, $rtfeldman$elm_css$Css$Structure$Output$pseudoElementToString, pseudoElement))
			]));
	return A2(
		$elm$core$String$append,
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$filter,
				A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
				segments)),
		pseudoElementsString);
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock = F2(
	function (indentLevel, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		var selectorStr = A2(
			$elm$core$String$join,
			', ',
			A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Structure$Output$selectorToString,
				A2($elm$core$List$cons, firstSelector, otherSelectors)));
		return A2(
			$elm$core$String$join,
			'',
			_List_fromArray(
				[
					selectorStr,
					' {\n',
					indentLevel,
					$rtfeldman$elm_css$Css$Structure$Output$emitProperties(properties),
					'\n',
					indentLevel,
					'}'
				]));
	});
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration = function (decl) {
	switch (decl.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = decl.a;
			return A2($rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock, $rtfeldman$elm_css$Css$Structure$Output$noIndent, styleBlock);
		case 'MediaRule':
			var mediaQueries = decl.a;
			var styleBlocks = decl.b;
			var query = A2(
				$elm$core$String$join,
				',\n',
				A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$mediaQueryToString, mediaQueries));
			var blocks = A2(
				$elm$core$String$join,
				'\n\n',
				A2(
					$elm$core$List$map,
					A2(
						$elm$core$Basics$composeL,
						$rtfeldman$elm_css$Css$Structure$Output$indent,
						$rtfeldman$elm_css$Css$Structure$Output$prettyPrintStyleBlock($rtfeldman$elm_css$Css$Structure$Output$spaceIndent)),
					styleBlocks));
			return '@media ' + (query + (' {\n' + (blocks + '\n}')));
		case 'SupportsRule':
			return 'TODO';
		case 'DocumentRule':
			return 'TODO';
		case 'PageRule':
			return 'TODO';
		case 'FontFace':
			return 'TODO';
		case 'Keyframes':
			var name = decl.a.name;
			var declaration = decl.a.declaration;
			return '@keyframes ' + (name + (' {\n' + (declaration + '\n}')));
		case 'Viewport':
			return 'TODO';
		case 'CounterStyle':
			return 'TODO';
		default:
			return 'TODO';
	}
};
var $rtfeldman$elm_css$Css$Structure$Output$prettyPrint = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var declarations = _v0.declarations;
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2(
			$elm$core$List$filter,
			A2($elm$core$Basics$composeL, $elm$core$Basics$not, $elm$core$String$isEmpty),
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Output$charsetToString(charset),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$importToString, imports)),
					A2(
					$elm$core$String$join,
					'\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$namespaceToString, namespaces)),
					A2(
					$elm$core$String$join,
					'\n\n',
					A2($elm$core$List$map, $rtfeldman$elm_css$Css$Structure$Output$prettyPrintDeclaration, declarations))
				])));
};
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$core$List$concatMap = F2(
	function (f, list) {
		return $elm$core$List$concat(
			A2($elm$core$List$map, f, list));
	});
var $rtfeldman$elm_css$Css$Structure$CounterStyle = function (a) {
	return {$: 'CounterStyle', a: a};
};
var $rtfeldman$elm_css$Css$Structure$FontFace = function (a) {
	return {$: 'FontFace', a: a};
};
var $rtfeldman$elm_css$Css$Structure$PageRule = F2(
	function (a, b) {
		return {$: 'PageRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Selector = F3(
	function (a, b, c) {
		return {$: 'Selector', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$Css$Structure$SupportsRule = F2(
	function (a, b) {
		return {$: 'SupportsRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$Viewport = function (a) {
	return {$: 'Viewport', a: a};
};
var $rtfeldman$elm_css$Css$Structure$MediaRule = F2(
	function (a, b) {
		return {$: 'MediaRule', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$mapLast = F2(
	function (update, list) {
		if (!list.b) {
			return list;
		} else {
			if (!list.b.b) {
				var only = list.a;
				return _List_fromArray(
					[
						update(only)
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$mapLast, update, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$withPropertyAppended = F2(
	function (property, _v0) {
		var firstSelector = _v0.a;
		var otherSelectors = _v0.b;
		var properties = _v0.c;
		return A3(
			$rtfeldman$elm_css$Css$Structure$StyleBlock,
			firstSelector,
			otherSelectors,
			_Utils_ap(
				properties,
				_List_fromArray(
					[property])));
	});
var $rtfeldman$elm_css$Css$Structure$appendProperty = F2(
	function (property, declarations) {
		if (!declarations.b) {
			return declarations;
		} else {
			if (!declarations.b.b) {
				switch (declarations.a.$) {
					case 'StyleBlockDeclaration':
						var styleBlock = declarations.a.a;
						return _List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
								A2($rtfeldman$elm_css$Css$Structure$withPropertyAppended, property, styleBlock))
							]);
					case 'MediaRule':
						var _v1 = declarations.a;
						var mediaQueries = _v1.a;
						var styleBlocks = _v1.b;
						return _List_fromArray(
							[
								A2(
								$rtfeldman$elm_css$Css$Structure$MediaRule,
								mediaQueries,
								A2(
									$rtfeldman$elm_css$Css$Structure$mapLast,
									$rtfeldman$elm_css$Css$Structure$withPropertyAppended(property),
									styleBlocks))
							]);
					default:
						return declarations;
				}
			} else {
				var first = declarations.a;
				var rest = declarations.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendToLastSelector = F2(
	function (f, styleBlock) {
		if (!styleBlock.b.b) {
			var only = styleBlock.a;
			var properties = styleBlock.c;
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, only, _List_Nil, properties),
					A3(
					$rtfeldman$elm_css$Css$Structure$StyleBlock,
					f(only),
					_List_Nil,
					_List_Nil)
				]);
		} else {
			var first = styleBlock.a;
			var rest = styleBlock.b;
			var properties = styleBlock.c;
			var newRest = A2($elm$core$List$map, f, rest);
			var newFirst = f(first);
			return _List_fromArray(
				[
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, rest, properties),
					A3($rtfeldman$elm_css$Css$Structure$StyleBlock, newFirst, newRest, _List_Nil)
				]);
		}
	});
var $rtfeldman$elm_css$Css$Structure$applyPseudoElement = F2(
	function (pseudo, _v0) {
		var sequence = _v0.a;
		var selectors = _v0.b;
		return A3(
			$rtfeldman$elm_css$Css$Structure$Selector,
			sequence,
			selectors,
			$elm$core$Maybe$Just(pseudo));
	});
var $rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector = F2(
	function (pseudo, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$applyPseudoElement(pseudo),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Structure$CustomSelector = F2(
	function (a, b) {
		return {$: 'CustomSelector', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$TypeSelectorSequence = F2(
	function (a, b) {
		return {$: 'TypeSelectorSequence', a: a, b: b};
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatable = F2(
	function (selector, sequence) {
		switch (sequence.$) {
			case 'TypeSelectorSequence':
				var typeSelector = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$TypeSelectorSequence,
					typeSelector,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			case 'UniversalSelectorSequence':
				var list = sequence.a;
				return $rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
			default:
				var str = sequence.a;
				var list = sequence.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$CustomSelector,
					str,
					_Utils_ap(
						list,
						_List_fromArray(
							[selector])));
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator = F2(
	function (selector, list) {
		if (!list.b) {
			return _List_Nil;
		} else {
			if (!list.b.b) {
				var _v1 = list.a;
				var combinator = _v1.a;
				var sequence = _v1.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						combinator,
						A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, selector, sequence))
					]);
			} else {
				var first = list.a;
				var rest = list.b;
				return A2(
					$elm$core$List$cons,
					first,
					A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, selector, rest));
			}
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableSelector = F2(
	function (repeatableSimpleSelector, selector) {
		if (!selector.b.b) {
			var sequence = selector.a;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatable, repeatableSimpleSelector, sequence),
				_List_Nil,
				pseudoElement);
		} else {
			var firstSelector = selector.a;
			var tuples = selector.b;
			var pseudoElement = selector.c;
			return A3(
				$rtfeldman$elm_css$Css$Structure$Selector,
				firstSelector,
				A2($rtfeldman$elm_css$Css$Structure$appendRepeatableWithCombinator, repeatableSimpleSelector, tuples),
				pseudoElement);
		}
	});
var $rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector = F2(
	function (selector, styleBlock) {
		return A2(
			$rtfeldman$elm_css$Css$Structure$appendToLastSelector,
			$rtfeldman$elm_css$Css$Structure$appendRepeatableSelector(selector),
			styleBlock);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors = function (declarations) {
	collectSelectors:
	while (true) {
		if (!declarations.b) {
			return _List_Nil;
		} else {
			if (declarations.a.$ === 'StyleBlockDeclaration') {
				var _v1 = declarations.a.a;
				var firstSelector = _v1.a;
				var otherSelectors = _v1.b;
				var rest = declarations.b;
				return _Utils_ap(
					A2($elm$core$List$cons, firstSelector, otherSelectors),
					$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(rest));
			} else {
				var rest = declarations.b;
				var $temp$declarations = rest;
				declarations = $temp$declarations;
				continue collectSelectors;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$DocumentRule = F5(
	function (a, b, c, d, e) {
		return {$: 'DocumentRule', a: a, b: b, c: c, d: d, e: e};
	});
var $rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock = F2(
	function (update, declarations) {
		_v0$12:
		while (true) {
			if (!declarations.b) {
				return declarations;
			} else {
				if (!declarations.b.b) {
					switch (declarations.a.$) {
						case 'StyleBlockDeclaration':
							var styleBlock = declarations.a.a;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration,
								update(styleBlock));
						case 'MediaRule':
							if (declarations.a.b.b) {
								if (!declarations.a.b.b.b) {
									var _v1 = declarations.a;
									var mediaQueries = _v1.a;
									var _v2 = _v1.b;
									var styleBlock = _v2.a;
									return _List_fromArray(
										[
											A2(
											$rtfeldman$elm_css$Css$Structure$MediaRule,
											mediaQueries,
											update(styleBlock))
										]);
								} else {
									var _v3 = declarations.a;
									var mediaQueries = _v3.a;
									var _v4 = _v3.b;
									var first = _v4.a;
									var rest = _v4.b;
									var _v5 = A2(
										$rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock,
										update,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Structure$MediaRule, mediaQueries, rest)
											]));
									if ((_v5.b && (_v5.a.$ === 'MediaRule')) && (!_v5.b.b)) {
										var _v6 = _v5.a;
										var newMediaQueries = _v6.a;
										var newStyleBlocks = _v6.b;
										return _List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$Structure$MediaRule,
												newMediaQueries,
												A2($elm$core$List$cons, first, newStyleBlocks))
											]);
									} else {
										var newDeclarations = _v5;
										return newDeclarations;
									}
								}
							} else {
								break _v0$12;
							}
						case 'SupportsRule':
							var _v7 = declarations.a;
							var str = _v7.a;
							var nestedDeclarations = _v7.b;
							return _List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Css$Structure$SupportsRule,
									str,
									A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, nestedDeclarations))
								]);
						case 'DocumentRule':
							var _v8 = declarations.a;
							var str1 = _v8.a;
							var str2 = _v8.b;
							var str3 = _v8.c;
							var str4 = _v8.d;
							var styleBlock = _v8.e;
							return A2(
								$elm$core$List$map,
								A4($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4),
								update(styleBlock));
						case 'PageRule':
							var _v9 = declarations.a;
							return declarations;
						case 'FontFace':
							return declarations;
						case 'Keyframes':
							return declarations;
						case 'Viewport':
							return declarations;
						case 'CounterStyle':
							return declarations;
						default:
							return declarations;
					}
				} else {
					break _v0$12;
				}
			}
		}
		var first = declarations.a;
		var rest = declarations.b;
		return A2(
			$elm$core$List$cons,
			first,
			A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, update, rest));
	});
var $elm$core$String$cons = _String_cons;
var $Skinney$murmur3$Murmur3$HashData = F4(
	function (shift, seed, hash, charsProcessed) {
		return {charsProcessed: charsProcessed, hash: hash, seed: seed, shift: shift};
	});
var $Skinney$murmur3$Murmur3$c1 = 3432918353;
var $Skinney$murmur3$Murmur3$c2 = 461845907;
var $elm$core$Bitwise$and = _Bitwise_and;
var $elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var $elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var $Skinney$murmur3$Murmur3$multiplyBy = F2(
	function (b, a) {
		return ((a & 65535) * b) + ((((a >>> 16) * b) & 65535) << 16);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$core$Bitwise$or = _Bitwise_or;
var $Skinney$murmur3$Murmur3$rotlBy = F2(
	function (b, a) {
		return (a << b) | (a >>> (32 - b));
	});
var $elm$core$Bitwise$xor = _Bitwise_xor;
var $Skinney$murmur3$Murmur3$finalize = function (data) {
	var acc = (!(!data.hash)) ? (data.seed ^ A2(
		$Skinney$murmur3$Murmur3$multiplyBy,
		$Skinney$murmur3$Murmur3$c2,
		A2(
			$Skinney$murmur3$Murmur3$rotlBy,
			15,
			A2($Skinney$murmur3$Murmur3$multiplyBy, $Skinney$murmur3$Murmur3$c1, data.hash)))) : data.seed;
	var h0 = acc ^ data.charsProcessed;
	var h1 = A2($Skinney$murmur3$Murmur3$multiplyBy, 2246822507, h0 ^ (h0 >>> 16));
	var h2 = A2($Skinney$murmur3$Murmur3$multiplyBy, 3266489909, h1 ^ (h1 >>> 13));
	return (h2 ^ (h2 >>> 16)) >>> 0;
};
var $elm$core$String$foldl = _String_foldl;
var $Skinney$murmur3$Murmur3$mix = F2(
	function (h1, k1) {
		return A2(
			$Skinney$murmur3$Murmur3$multiplyBy,
			5,
			A2(
				$Skinney$murmur3$Murmur3$rotlBy,
				13,
				h1 ^ A2(
					$Skinney$murmur3$Murmur3$multiplyBy,
					$Skinney$murmur3$Murmur3$c2,
					A2(
						$Skinney$murmur3$Murmur3$rotlBy,
						15,
						A2($Skinney$murmur3$Murmur3$multiplyBy, $Skinney$murmur3$Murmur3$c1, k1))))) + 3864292196;
	});
var $Skinney$murmur3$Murmur3$hashFold = F2(
	function (c, data) {
		var res = data.hash | ((255 & $elm$core$Char$toCode(c)) << data.shift);
		var _v0 = data.shift;
		if (_v0 === 24) {
			return {
				charsProcessed: data.charsProcessed + 1,
				hash: 0,
				seed: A2($Skinney$murmur3$Murmur3$mix, data.seed, res),
				shift: 0
			};
		} else {
			return {charsProcessed: data.charsProcessed + 1, hash: res, seed: data.seed, shift: data.shift + 8};
		}
	});
var $Skinney$murmur3$Murmur3$hashString = F2(
	function (seed, str) {
		return $Skinney$murmur3$Murmur3$finalize(
			A3(
				$elm$core$String$foldl,
				$Skinney$murmur3$Murmur3$hashFold,
				A4($Skinney$murmur3$Murmur3$HashData, 0, seed, 0, 0),
				str));
	});
var $rtfeldman$elm_css$Hash$murmurSeed = 15739;
var $elm$core$String$fromList = _String_fromList;
var $elm$core$Basics$modBy = _Basics_modBy;
var $rtfeldman$elm_hex$Hex$unsafeToDigit = function (num) {
	unsafeToDigit:
	while (true) {
		switch (num) {
			case 0:
				return _Utils_chr('0');
			case 1:
				return _Utils_chr('1');
			case 2:
				return _Utils_chr('2');
			case 3:
				return _Utils_chr('3');
			case 4:
				return _Utils_chr('4');
			case 5:
				return _Utils_chr('5');
			case 6:
				return _Utils_chr('6');
			case 7:
				return _Utils_chr('7');
			case 8:
				return _Utils_chr('8');
			case 9:
				return _Utils_chr('9');
			case 10:
				return _Utils_chr('a');
			case 11:
				return _Utils_chr('b');
			case 12:
				return _Utils_chr('c');
			case 13:
				return _Utils_chr('d');
			case 14:
				return _Utils_chr('e');
			case 15:
				return _Utils_chr('f');
			default:
				var $temp$num = num;
				num = $temp$num;
				continue unsafeToDigit;
		}
	}
};
var $rtfeldman$elm_hex$Hex$unsafePositiveToDigits = F2(
	function (digits, num) {
		unsafePositiveToDigits:
		while (true) {
			if (num < 16) {
				return A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(num),
					digits);
			} else {
				var $temp$digits = A2(
					$elm$core$List$cons,
					$rtfeldman$elm_hex$Hex$unsafeToDigit(
						A2($elm$core$Basics$modBy, 16, num)),
					digits),
					$temp$num = (num / 16) | 0;
				digits = $temp$digits;
				num = $temp$num;
				continue unsafePositiveToDigits;
			}
		}
	});
var $rtfeldman$elm_hex$Hex$toString = function (num) {
	return $elm$core$String$fromList(
		(num < 0) ? A2(
			$elm$core$List$cons,
			_Utils_chr('-'),
			A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, -num)) : A2($rtfeldman$elm_hex$Hex$unsafePositiveToDigits, _List_Nil, num));
};
var $rtfeldman$elm_css$Hash$fromString = function (str) {
	return A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2($Skinney$murmur3$Murmur3$hashString, $rtfeldman$elm_css$Hash$murmurSeed, str)));
};
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$last = function (list) {
	last:
	while (true) {
		if (!list.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!list.b.b) {
				var singleton = list.a;
				return $elm$core$Maybe$Just(singleton);
			} else {
				var rest = list.b;
				var $temp$list = rest;
				list = $temp$list;
				continue last;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration = function (declarations) {
	lastDeclaration:
	while (true) {
		if (!declarations.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			if (!declarations.b.b) {
				var x = declarations.a;
				return $elm$core$Maybe$Just(
					_List_fromArray(
						[x]));
			} else {
				var xs = declarations.b;
				var $temp$declarations = xs;
				declarations = $temp$declarations;
				continue lastDeclaration;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf = function (maybes) {
	oneOf:
	while (true) {
		if (!maybes.b) {
			return $elm$core$Maybe$Nothing;
		} else {
			var maybe = maybes.a;
			var rest = maybes.b;
			if (maybe.$ === 'Nothing') {
				var $temp$maybes = rest;
				maybes = $temp$maybes;
				continue oneOf;
			} else {
				return maybe;
			}
		}
	}
};
var $rtfeldman$elm_css$Css$Structure$FontFeatureValues = function (a) {
	return {$: 'FontFeatureValues', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues = function (tuples) {
	var expandTuples = function (tuplesToExpand) {
		if (!tuplesToExpand.b) {
			return _List_Nil;
		} else {
			var properties = tuplesToExpand.a;
			var rest = tuplesToExpand.b;
			return A2(
				$elm$core$List$cons,
				properties,
				expandTuples(rest));
		}
	};
	var newTuples = expandTuples(tuples);
	return _List_fromArray(
		[
			$rtfeldman$elm_css$Css$Structure$FontFeatureValues(newTuples)
		]);
};
var $elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var $rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule = F2(
	function (mediaQueries, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var styleBlock = declaration.a;
			return A2(
				$rtfeldman$elm_css$Css$Structure$MediaRule,
				mediaQueries,
				_List_fromArray(
					[styleBlock]));
		} else {
			return declaration;
		}
	});
var $elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(xs);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2($elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var $elm$core$List$takeTailRec = F2(
	function (n, list) {
		return $elm$core$List$reverse(
			A3($elm$core$List$takeReverse, n, list, _List_Nil));
	});
var $elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _v0 = _Utils_Tuple2(n, list);
			_v0$1:
			while (true) {
				_v0$5:
				while (true) {
					if (!_v0.b.b) {
						return list;
					} else {
						if (_v0.b.b.b) {
							switch (_v0.a) {
								case 1:
									break _v0$1;
								case 2:
									var _v2 = _v0.b;
									var x = _v2.a;
									var _v3 = _v2.b;
									var y = _v3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_v0.b.b.b.b) {
										var _v4 = _v0.b;
										var x = _v4.a;
										var _v5 = _v4.b;
										var y = _v5.a;
										var _v6 = _v5.b;
										var z = _v6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _v0$5;
									}
								default:
									if (_v0.b.b.b.b && _v0.b.b.b.b.b) {
										var _v7 = _v0.b;
										var x = _v7.a;
										var _v8 = _v7.b;
										var y = _v8.a;
										var _v9 = _v8.b;
										var z = _v9.a;
										var _v10 = _v9.b;
										var w = _v10.a;
										var tl = _v10.b;
										return (ctr > 1000) ? A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A2($elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											$elm$core$List$cons,
											x,
											A2(
												$elm$core$List$cons,
												y,
												A2(
													$elm$core$List$cons,
													z,
													A2(
														$elm$core$List$cons,
														w,
														A3($elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _v0$5;
									}
							}
						} else {
							if (_v0.a === 1) {
								break _v0$1;
							} else {
								break _v0$5;
							}
						}
					}
				}
				return list;
			}
			var _v1 = _v0.b;
			var x = _v1.a;
			return _List_fromArray(
				[x]);
		}
	});
var $elm$core$List$take = F2(
	function (n, list) {
		return A3($elm$core$List$takeFast, 0, n, list);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule = F5(
	function (str1, str2, str3, str4, declaration) {
		if (declaration.$ === 'StyleBlockDeclaration') {
			var structureStyleBlock = declaration.a;
			return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
		} else {
			return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule = F2(
	function (mediaQueries, declaration) {
		switch (declaration.$) {
			case 'StyleBlockDeclaration':
				var structureStyleBlock = declaration.a;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					mediaQueries,
					_List_fromArray(
						[structureStyleBlock]));
			case 'MediaRule':
				var newMediaQueries = declaration.a;
				var structureStyleBlocks = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$MediaRule,
					_Utils_ap(mediaQueries, newMediaQueries),
					structureStyleBlocks);
			case 'SupportsRule':
				var str = declaration.a;
				var declarations = declaration.b;
				return A2(
					$rtfeldman$elm_css$Css$Structure$SupportsRule,
					str,
					A2(
						$elm$core$List$map,
						$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
						declarations));
			case 'DocumentRule':
				var str1 = declaration.a;
				var str2 = declaration.b;
				var str3 = declaration.c;
				var str4 = declaration.d;
				var structureStyleBlock = declaration.e;
				return A5($rtfeldman$elm_css$Css$Structure$DocumentRule, str1, str2, str3, str4, structureStyleBlock);
			case 'PageRule':
				return declaration;
			case 'FontFace':
				return declaration;
			case 'Keyframes':
				return declaration;
			case 'Viewport':
				return declaration;
			case 'CounterStyle':
				return declaration;
			default:
				return declaration;
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet = function (_v0) {
	var declarations = _v0.a;
	return declarations;
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast = F4(
	function (nestedStyles, rest, f, declarations) {
		var withoutParent = function (decls) {
			return A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$elm$core$List$tail(decls));
		};
		var nextResult = A2(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
			rest,
			A2(
				$elm$core$Maybe$withDefault,
				_List_Nil,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		var newDeclarations = function () {
			var _v14 = _Utils_Tuple2(
				$elm$core$List$head(nextResult),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$last(declarations));
			if ((_v14.a.$ === 'Just') && (_v14.b.$ === 'Just')) {
				var nextResultParent = _v14.a.a;
				var originalParent = _v14.b.a;
				return _Utils_ap(
					A2(
						$elm$core$List$take,
						$elm$core$List$length(declarations) - 1,
						declarations),
					_List_fromArray(
						[
							(!_Utils_eq(originalParent, nextResultParent)) ? nextResultParent : originalParent
						]));
			} else {
				return declarations;
			}
		}();
		var insertStylesToNestedDecl = function (lastDecl) {
			return $elm$core$List$concat(
				A2(
					$rtfeldman$elm_css$Css$Structure$mapLast,
					$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles(nestedStyles),
					A2(
						$elm$core$List$map,
						$elm$core$List$singleton,
						A2($rtfeldman$elm_css$Css$Structure$concatMapLastStyleBlock, f, lastDecl))));
		};
		var initialResult = A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2(
				$elm$core$Maybe$map,
				insertStylesToNestedDecl,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$lastDeclaration(declarations)));
		return _Utils_ap(
			newDeclarations,
			_Utils_ap(
				withoutParent(initialResult),
				withoutParent(nextResult)));
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles = F2(
	function (styles, declarations) {
		if (!styles.b) {
			return declarations;
		} else {
			switch (styles.a.$) {
				case 'AppendProperty':
					var property = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, property, declarations));
				case 'ExtendSelector':
					var _v4 = styles.a;
					var selector = _v4.a;
					var nestedStyles = _v4.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendRepeatableToLastSelector(selector),
						declarations);
				case 'NestSnippet':
					var _v5 = styles.a;
					var selectorCombinator = _v5.a;
					var snippets = _v5.b;
					var rest = styles.b;
					var chain = F2(
						function (_v9, _v10) {
							var originalSequence = _v9.a;
							var originalTuples = _v9.b;
							var originalPseudoElement = _v9.c;
							var newSequence = _v10.a;
							var newTuples = _v10.b;
							var newPseudoElement = _v10.c;
							return A3(
								$rtfeldman$elm_css$Css$Structure$Selector,
								originalSequence,
								_Utils_ap(
									originalTuples,
									A2(
										$elm$core$List$cons,
										_Utils_Tuple2(selectorCombinator, newSequence),
										newTuples)),
								$rtfeldman$elm_css$Css$Preprocess$Resolve$oneOf(
									_List_fromArray(
										[newPseudoElement, originalPseudoElement])));
						});
					var expandDeclaration = function (declaration) {
						switch (declaration.$) {
							case 'StyleBlockDeclaration':
								var _v7 = declaration.a;
								var firstSelector = _v7.a;
								var otherSelectors = _v7.b;
								var nestedStyles = _v7.c;
								var newSelectors = A2(
									$elm$core$List$concatMap,
									function (originalSelector) {
										return A2(
											$elm$core$List$map,
											chain(originalSelector),
											A2($elm$core$List$cons, firstSelector, otherSelectors));
									},
									$rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations));
								var newDeclarations = function () {
									if (!newSelectors.b) {
										return _List_Nil;
									} else {
										var first = newSelectors.a;
										var remainder = newSelectors.b;
										return _List_fromArray(
											[
												$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
												A3($rtfeldman$elm_css$Css$Structure$StyleBlock, first, remainder, _List_Nil))
											]);
									}
								}();
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, nestedStyles, newDeclarations);
							case 'MediaRule':
								var mediaQueries = declaration.a;
								var styleBlocks = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
							case 'SupportsRule':
								var str = declaration.a;
								var otherSnippets = declaration.b;
								return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, otherSnippets);
							case 'DocumentRule':
								var str1 = declaration.a;
								var str2 = declaration.b;
								var str3 = declaration.c;
								var str4 = declaration.d;
								var styleBlock = declaration.e;
								return A2(
									$elm$core$List$map,
									A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
									$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
							case 'PageRule':
								var str = declaration.a;
								var properties = declaration.b;
								return _List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
									]);
							case 'FontFace':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$FontFace(properties)
									]);
							case 'Viewport':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$Viewport(properties)
									]);
							case 'CounterStyle':
								var properties = declaration.a;
								return _List_fromArray(
									[
										$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
									]);
							default:
								var tuples = declaration.a;
								return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
						}
					};
					return $elm$core$List$concat(
						_Utils_ap(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations)
								]),
							A2(
								$elm$core$List$map,
								expandDeclaration,
								A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets))));
				case 'WithPseudoElement':
					var _v11 = styles.a;
					var pseudoElement = _v11.a;
					var nestedStyles = _v11.b;
					var rest = styles.b;
					return A4(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyNestedStylesToLast,
						nestedStyles,
						rest,
						$rtfeldman$elm_css$Css$Structure$appendPseudoElementToLastSelector(pseudoElement),
						declarations);
				case 'WithKeyframes':
					var str = styles.a.a;
					var rest = styles.b;
					var name = $rtfeldman$elm_css$Hash$fromString(str);
					var newProperty = 'animation-name:' + name;
					var newDeclarations = A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						rest,
						A2($rtfeldman$elm_css$Css$Structure$appendProperty, newProperty, declarations));
					return A2(
						$elm$core$List$append,
						newDeclarations,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Css$Structure$Keyframes(
								{declaration: str, name: name})
							]));
				case 'WithMedia':
					var _v12 = styles.a;
					var mediaQueries = _v12.a;
					var nestedStyles = _v12.b;
					var rest = styles.b;
					var extraDeclarations = function () {
						var _v13 = $rtfeldman$elm_css$Css$Preprocess$Resolve$collectSelectors(declarations);
						if (!_v13.b) {
							return _List_Nil;
						} else {
							var firstSelector = _v13.a;
							var otherSelectors = _v13.b;
							return A2(
								$elm$core$List$map,
								$rtfeldman$elm_css$Css$Structure$styleBlockToMediaRule(mediaQueries),
								A2(
									$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
									nestedStyles,
									$elm$core$List$singleton(
										$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
											A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil)))));
						}
					}();
					return _Utils_ap(
						A2($rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles, rest, declarations),
						extraDeclarations);
				default:
					var otherStyles = styles.a.a;
					var rest = styles.b;
					return A2(
						$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
						_Utils_ap(otherStyles, rest),
						declarations);
			}
		}
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock = function (_v2) {
	var firstSelector = _v2.a;
	var otherSelectors = _v2.b;
	var styles = _v2.c;
	return A2(
		$rtfeldman$elm_css$Css$Preprocess$Resolve$applyStyles,
		styles,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$Structure$StyleBlockDeclaration(
				A3($rtfeldman$elm_css$Css$Structure$StyleBlock, firstSelector, otherSelectors, _List_Nil))
			]));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$extract = function (snippetDeclarations) {
	if (!snippetDeclarations.b) {
		return _List_Nil;
	} else {
		var first = snippetDeclarations.a;
		var rest = snippetDeclarations.b;
		return _Utils_ap(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations(first),
			$rtfeldman$elm_css$Css$Preprocess$Resolve$extract(rest));
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule = F2(
	function (mediaQueries, styleBlocks) {
		var handleStyleBlock = function (styleBlock) {
			return A2(
				$elm$core$List$map,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$toMediaRule(mediaQueries),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		};
		return A2($elm$core$List$concatMap, handleStyleBlock, styleBlocks);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule = F2(
	function (str, snippets) {
		var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
			A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
		return _List_fromArray(
			[
				A2($rtfeldman$elm_css$Css$Structure$SupportsRule, str, declarations)
			]);
	});
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toDeclarations = function (snippetDeclaration) {
	switch (snippetDeclaration.$) {
		case 'StyleBlockDeclaration':
			var styleBlock = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock);
		case 'MediaRule':
			var mediaQueries = snippetDeclaration.a;
			var styleBlocks = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveMediaRule, mediaQueries, styleBlocks);
		case 'SupportsRule':
			var str = snippetDeclaration.a;
			var snippets = snippetDeclaration.b;
			return A2($rtfeldman$elm_css$Css$Preprocess$Resolve$resolveSupportsRule, str, snippets);
		case 'DocumentRule':
			var str1 = snippetDeclaration.a;
			var str2 = snippetDeclaration.b;
			var str3 = snippetDeclaration.c;
			var str4 = snippetDeclaration.d;
			var styleBlock = snippetDeclaration.e;
			return A2(
				$elm$core$List$map,
				A4($rtfeldman$elm_css$Css$Preprocess$Resolve$toDocumentRule, str1, str2, str3, str4),
				$rtfeldman$elm_css$Css$Preprocess$Resolve$expandStyleBlock(styleBlock));
		case 'PageRule':
			var str = snippetDeclaration.a;
			var properties = snippetDeclaration.b;
			return _List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$Structure$PageRule, str, properties)
				]);
		case 'FontFace':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$FontFace(properties)
				]);
		case 'Viewport':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$Viewport(properties)
				]);
		case 'CounterStyle':
			var properties = snippetDeclaration.a;
			return _List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$CounterStyle(properties)
				]);
		default:
			var tuples = snippetDeclaration.a;
			return $rtfeldman$elm_css$Css$Preprocess$Resolve$resolveFontFeatureValues(tuples);
	}
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure = function (_v0) {
	var charset = _v0.charset;
	var imports = _v0.imports;
	var namespaces = _v0.namespaces;
	var snippets = _v0.snippets;
	var declarations = $rtfeldman$elm_css$Css$Preprocess$Resolve$extract(
		A2($elm$core$List$concatMap, $rtfeldman$elm_css$Css$Preprocess$unwrapSnippet, snippets));
	return {charset: charset, declarations: declarations, imports: imports, namespaces: namespaces};
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp = function (sheet) {
	return $rtfeldman$elm_css$Css$Structure$Output$prettyPrint(
		$rtfeldman$elm_css$Css$Structure$compactStylesheet(
			$rtfeldman$elm_css$Css$Preprocess$Resolve$toStructure(sheet)));
};
var $rtfeldman$elm_css$Css$Preprocess$Resolve$compile = function (styles) {
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Preprocess$Resolve$compileHelp, styles));
};
var $rtfeldman$elm_css$Css$Preprocess$Snippet = function (a) {
	return {$: 'Snippet', a: a};
};
var $rtfeldman$elm_css$Css$Preprocess$StyleBlock = F3(
	function (a, b, c) {
		return {$: 'StyleBlock', a: a, b: b, c: c};
	});
var $rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration = function (a) {
	return {$: 'StyleBlockDeclaration', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$makeSnippet = F2(
	function (styles, sequence) {
		var selector = A3($rtfeldman$elm_css$Css$Structure$Selector, sequence, _List_Nil, $elm$core$Maybe$Nothing);
		return $rtfeldman$elm_css$Css$Preprocess$Snippet(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Preprocess$StyleBlockDeclaration(
					A3($rtfeldman$elm_css$Css$Preprocess$StyleBlock, selector, _List_Nil, styles))
				]));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$murmurSeed = 15739;
var $rtfeldman$elm_css$Css$Preprocess$stylesheet = function (snippets) {
	return {charset: $elm$core$Maybe$Nothing, imports: _List_Nil, namespaces: _List_Nil, snippets: snippets};
};
var $rtfeldman$elm_css$VirtualDom$Styled$getClassname = function (styles) {
	return $elm$core$List$isEmpty(styles) ? 'unstyled' : A2(
		$elm$core$String$cons,
		_Utils_chr('_'),
		$rtfeldman$elm_hex$Hex$toString(
			A2(
				$Skinney$murmur3$Murmur3$hashString,
				$rtfeldman$elm_css$VirtualDom$Styled$murmurSeed,
				$rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
					$elm$core$List$singleton(
						$rtfeldman$elm_css$Css$Preprocess$stylesheet(
							$elm$core$List$singleton(
								A2(
									$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
									styles,
									$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(_List_Nil)))))))));
};
var $elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$json$Json$Encode$string = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Internal$css = function (styles) {
	var classname = $rtfeldman$elm_css$VirtualDom$Styled$getClassname(styles);
	var classProperty = A2(
		$elm$virtual_dom$VirtualDom$property,
		'className',
		$elm$json$Json$Encode$string(classname));
	return A3($rtfeldman$elm_css$VirtualDom$Styled$Attribute, classProperty, styles, classname);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$css = $rtfeldman$elm_css$Html$Styled$Internal$css;
var $rtfeldman$elm_css$Css$Internal$Property = function (a) {
	return {$: 'Property', a: a};
};
var $rtfeldman$elm_css$Css$Animations$custom = F2(
	function (name, value) {
		return $rtfeldman$elm_css$Css$Internal$Property(name + (':' + value));
	});
var $rtfeldman$elm_css$Css$hover = $rtfeldman$elm_css$Css$pseudoClass('hover');
var $rtfeldman$elm_css$Css$Structure$Compatible = {$: 'Compatible'};
var $rtfeldman$elm_css$Css$Internal$printKeyframeSelector = function (_v0) {
	var percentage = _v0.a;
	var properties = _v0.b;
	var propertiesStr = A2(
		$elm$core$String$join,
		'',
		A2(
			$elm$core$List$map,
			function (_v1) {
				var prop = _v1.a;
				return prop + ';';
			},
			properties));
	var percentageStr = $elm$core$String$fromInt(percentage) + '%';
	return percentageStr + (' {' + (propertiesStr + '}'));
};
var $rtfeldman$elm_css$Css$Internal$compileKeyframes = function (tuples) {
	return A2(
		$elm$core$String$join,
		'\n\n',
		A2($elm$core$List$map, $rtfeldman$elm_css$Css$Internal$printKeyframeSelector, tuples));
};
var $rtfeldman$elm_css$Css$Animations$keyframes = function (tuples) {
	return $elm$core$List$isEmpty(tuples) ? {keyframes: $rtfeldman$elm_css$Css$Structure$Compatible, none: $rtfeldman$elm_css$Css$Structure$Compatible, value: 'none'} : {
		keyframes: $rtfeldman$elm_css$Css$Structure$Compatible,
		none: $rtfeldman$elm_css$Css$Structure$Compatible,
		value: $rtfeldman$elm_css$Css$Internal$compileKeyframes(tuples)
	};
};
var $elm$core$String$fromFloat = _String_fromNumber;
var $rtfeldman$elm_css$Css$sec = function (amount) {
	return {
		duration: $rtfeldman$elm_css$Css$Structure$Compatible,
		value: $elm$core$String$fromFloat(amount) + 's'
	};
};
var $author$project$Style$buttonYes = $rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2($rtfeldman$elm_css$Css$property, 'width', '220px'),
			A2($rtfeldman$elm_css$Css$property, 'height', '50px'),
			A2($rtfeldman$elm_css$Css$property, 'border', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'outline', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'color', '#fff'),
			A2($rtfeldman$elm_css$Css$property, 'background', '#111'),
			A2($rtfeldman$elm_css$Css$property, 'position', 'relative'),
			A2($rtfeldman$elm_css$Css$property, 'z-index', '0'),
			A2($rtfeldman$elm_css$Css$property, 'border-radius', '10px'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'url(./src/img/cursor.cur),move'),
			$rtfeldman$elm_css$Css$before(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'content', '\'\''),
					A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)'),
					A2($rtfeldman$elm_css$Css$property, 'position', 'absolute'),
					A2($rtfeldman$elm_css$Css$property, 'top', '-2px'),
					A2($rtfeldman$elm_css$Css$property, 'left', '-2px'),
					A2($rtfeldman$elm_css$Css$property, 'background-size', '400%'),
					A2($rtfeldman$elm_css$Css$property, 'z-index', '-1'),
					A2($rtfeldman$elm_css$Css$property, 'filter', 'blur(5px)'),
					A2($rtfeldman$elm_css$Css$property, 'width', 'calc(100% + 4px)'),
					A2($rtfeldman$elm_css$Css$property, 'height', 'calc(100% + 4px)'),
					$rtfeldman$elm_css$Css$animationName(
					$rtfeldman$elm_css$Css$Animations$keyframes(
						_List_fromArray(
							[
								_Utils_Tuple2(
								0,
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0 0')
									])),
								_Utils_Tuple2(
								50,
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '400% 0')
									])),
								_Utils_Tuple2(
								100,
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0 0')
									]))
							]))),
					$rtfeldman$elm_css$Css$animationDuration(
					$rtfeldman$elm_css$Css$sec(30)),
					A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
					A2($rtfeldman$elm_css$Css$property, 'opacity', '0'),
					A2($rtfeldman$elm_css$Css$property, 'transition', 'opacity .3s ease-in-out'),
					A2($rtfeldman$elm_css$Css$property, 'border-radius', '10px')
				])),
			$rtfeldman$elm_css$Css$active(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'color', '#000')
				])),
			$rtfeldman$elm_css$Css$active(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$after(
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Css$property, 'background', 'transparent')
						]))
				])),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$before(
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Css$property, 'opacity', '1')
						]))
				])),
			$rtfeldman$elm_css$Css$after(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'z-index', '-1'),
					A2($rtfeldman$elm_css$Css$property, 'content', '\'\''),
					A2($rtfeldman$elm_css$Css$property, 'position', 'absolute'),
					A2($rtfeldman$elm_css$Css$property, 'width', '100%'),
					A2($rtfeldman$elm_css$Css$property, 'height', '100%'),
					A2($rtfeldman$elm_css$Css$property, 'background', '#111'),
					A2($rtfeldman$elm_css$Css$property, 'left', '0'),
					A2($rtfeldman$elm_css$Css$property, 'top', '0'),
					A2($rtfeldman$elm_css$Css$property, 'border-radius', '10-px')
				]))
		]));
var $elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var $author$project$Definition$Block = {$: 'Block'};
var $author$project$Definition$BoxingGym = function (a) {
	return {$: 'BoxingGym', a: a};
};
var $author$project$Definition$Casino = function (a) {
	return {$: 'Casino', a: a};
};
var $author$project$Definition$Disco = function (a) {
	return {$: 'Disco', a: a};
};
var $author$project$Definition$Jail = {$: 'Jail'};
var $author$project$Definition$NightMarket = function (a) {
	return {$: 'NightMarket', a: a};
};
var $author$project$Definition$NotSelf = {$: 'NotSelf'};
var $author$project$Definition$PoliceStation = {$: 'PoliceStation'};
var $author$project$Definition$Tile = F9(
	function (stability, familyMember, building, position, index, owner, direction, status, score) {
		return {building: building, direction: direction, familyMember: familyMember, index: index, owner: owner, position: position, score: score, stability: stability, status: status};
	});
var $elm$core$Tuple$mapFirst = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var $elm$core$Tuple$mapSecond = F2(
	function (func, _v0) {
		var x = _v0.a;
		var y = _v0.b;
		return _Utils_Tuple2(
			x,
			func(y));
	});
var $author$project$Map$generateLine = F4(
	function (startPos, startIndex, length, direction) {
		var width = ((direction === 1) || (direction === 2)) ? 5 : 10;
		var single = F2(
			function (thisPos, thisIndex) {
				return {
					building: $author$project$Definition$Block,
					direction: direction,
					familyMember: _List_fromArray(
						[0, 0, 0, 0]),
					index: thisIndex,
					owner: $elm$core$Maybe$Nothing,
					position: thisPos,
					score: _List_fromArray(
						[-1, -1, -1]),
					stability: 2,
					status: $author$project$Definition$NotSelf
				};
			});
		var indexList = A2($elm$core$List$range, startIndex, (startIndex + length) - 1);
		var height = ((direction === 1) || (direction === 2)) ? 10 : 5;
		var posList = function () {
			var widthSpaceRight = A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(width),
				A2($elm$core$List$range, 0, length - 1));
			var widthSpaceLeft = A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(width),
				$elm$core$List$reverse(
					A2($elm$core$List$range, 1 - length, 0)));
			var heightSpaceUp = A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(height),
				$elm$core$List$reverse(
					A2($elm$core$List$range, 1 - length, 0)));
			var heightSpaceDown = A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(height),
				A2($elm$core$List$range, 0, length - 1));
			switch (direction) {
				case 1:
					return A2(
						$elm$core$List$map,
						function (a) {
							return A2(
								$elm$core$Tuple$mapFirst,
								function (b) {
									return b + a;
								},
								startPos);
						},
						widthSpaceRight);
				case 2:
					return A2(
						$elm$core$List$map,
						function (a) {
							return A2(
								$elm$core$Tuple$mapFirst,
								function (b) {
									return b + a;
								},
								startPos);
						},
						widthSpaceLeft);
				case 3:
					return A2(
						$elm$core$List$map,
						function (a) {
							return A2(
								$elm$core$Tuple$mapSecond,
								function (b) {
									return b + a;
								},
								startPos);
						},
						heightSpaceUp);
				default:
					return A2(
						$elm$core$List$map,
						function (a) {
							return A2(
								$elm$core$Tuple$mapSecond,
								function (b) {
									return b + a;
								},
								startPos);
						},
						heightSpaceDown);
			}
		}();
		return A3($elm$core$List$map2, single, posList, indexList);
	});
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? $elm$core$Maybe$Nothing : $elm$core$List$head(
			A2($elm$core$List$drop, idx, xs));
	});
var $author$project$Definition$get = F2(
	function (index, list) {
		get:
		while (true) {
			var _v0 = A2($elm_community$list_extra$List$Extra$getAt, index, list);
			if (_v0.$ === 'Just') {
				var current = _v0.a;
				return current;
			} else {
				var $temp$index = 1,
					$temp$list = list;
				index = $temp$index;
				list = $temp$list;
				continue get;
			}
		}
	});
var $author$project$Map$initMember = function (map) {
	var memberList = _List_fromArray(
		[
			_List_fromArray(
			[10, 0, 0, 0]),
			_List_fromArray(
			[4, 2, 1, 1]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[2, 0, 2, 0]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[1, 2, 3, 2]),
			_List_fromArray(
			[2, 0, 1, 1]),
			_List_fromArray(
			[0, 0, 3, 0]),
			_List_fromArray(
			[1, 2, 2, 0]),
			_List_fromArray(
			[1, 3, 0, 2]),
			_List_fromArray(
			[1, 0, 4, 2]),
			_List_fromArray(
			[1, 2, 1, 0]),
			_List_fromArray(
			[2, 2, 0, 1]),
			_List_fromArray(
			[1, 2, 0, 0]),
			_List_fromArray(
			[2, 3, 1, 1]),
			_List_fromArray(
			[2, 4, 1, 0]),
			_List_fromArray(
			[0, 10, 0, 0]),
			_List_fromArray(
			[2, 1, 1, 1]),
			_List_fromArray(
			[1, 0, 2, 1]),
			_List_fromArray(
			[1, 0, 1, 2]),
			_List_fromArray(
			[2, 1, 0, 2]),
			_List_fromArray(
			[0, 2, 1, 2]),
			_List_fromArray(
			[3, 0, 1, 1]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[1, 1, 1, 0]),
			_List_fromArray(
			[2, 1, 2, 1]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[3, 1, 1, 0]),
			_List_fromArray(
			[2, 4, 1, 0]),
			_List_fromArray(
			[1, 1, 1, 0]),
			_List_fromArray(
			[2, 3, 2, 0]),
			_List_fromArray(
			[3, 2, 1, 1]),
			_List_fromArray(
			[1, 1, 3, 0]),
			_List_fromArray(
			[0, 0, 10, 0]),
			_List_fromArray(
			[1, 0, 3, 0]),
			_List_fromArray(
			[2, 0, 2, 2]),
			_List_fromArray(
			[2, 1, 1, 0]),
			_List_fromArray(
			[2, 3, 2, 0]),
			_List_fromArray(
			[1, 1, 1, 0]),
			_List_fromArray(
			[2, 4, 1, 0]),
			_List_fromArray(
			[1, 2, 2, 2]),
			_List_fromArray(
			[1, 0, 2, 1]),
			_List_fromArray(
			[0, 2, 1, 0]),
			_List_fromArray(
			[0, 2, 1, 0]),
			_List_fromArray(
			[4, 1, 3, 2]),
			_List_fromArray(
			[2, 3, 2, 2]),
			_List_fromArray(
			[3, 2, 1, 2]),
			_List_fromArray(
			[2, 0, 3, 2]),
			_List_fromArray(
			[1, 2, 1, 3]),
			_List_fromArray(
			[1, 3, 2, 3]),
			_List_fromArray(
			[0, 0, 0, 10]),
			_List_fromArray(
			[2, 1, 2, 5]),
			_List_fromArray(
			[1, 1, 1, 3]),
			_List_fromArray(
			[3, 2, 1, 4]),
			_List_fromArray(
			[1, 0, 3, 0]),
			_List_fromArray(
			[0, 2, 1, 1]),
			_List_fromArray(
			[0, 2, 2, 0]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[2, 1, 1, 0]),
			_List_fromArray(
			[1, 0, 1, 3]),
			_List_fromArray(
			[2, 0, 1, 0]),
			_List_fromArray(
			[0, 0, 0, 0]),
			_List_fromArray(
			[1, 1, 1, 1]),
			_List_fromArray(
			[1, 1, 2, 1]),
			_List_fromArray(
			[1, 1, 1, 1]),
			_List_fromArray(
			[2, 1, 4, 0]),
			_List_fromArray(
			[1, 2, 2, 1])
		]);
	var resetMap = F2(
		function (index, tile) {
			return _Utils_update(
				tile,
				{
					familyMember: A2($author$project$Definition$get, index, memberList)
				});
		});
	return A2($elm$core$List$indexedMap, resetMap, map);
};
var $author$project$Map$initStability = function (map) {
	var stabilityList = _List_fromArray(
		[2, 4, 3, 4, 3, 3, 7, 2, 3, 5, 4, 5, 3, 3, 4, 4, 3, 2, 4, 5, 6, 5, 2, 5, 100, 3, 3, 4, 3, 2, 3, 3, 2, 5, 2, 2, 4, 6, 3, 4, 7, 3, 3, 3, 4, 4, 2, 4, 5, 5, 3, 2, 4, 4, 7, 4, 2, 5, 100, 3, 3, 4, 2, 2, 7, 2, 3, 6]);
	var resetMap = F2(
		function (index, tile) {
			return _Utils_update(
				tile,
				{
					stability: A2($author$project$Definition$get, index, stabilityList)
				});
		});
	return A2($elm$core$List$indexedMap, resetMap, map);
};
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Map$initMap = function () {
	var player4spawn = _List_fromArray(
		[
			A9(
			$author$project$Definition$Tile,
			2,
			_List_fromArray(
				[0, 0, 0, 0]),
			$author$project$Definition$Block,
			_Utils_Tuple2(0, 90),
			51,
			$elm$core$Maybe$Nothing,
			3,
			$author$project$Definition$NotSelf,
			_List_fromArray(
				[-1, -1, -1]))
		]);
	var player3spawn = _List_fromArray(
		[
			A9(
			$author$project$Definition$Tile,
			2,
			_List_fromArray(
				[0, 0, 0, 0]),
			$author$project$Definition$Block,
			_Utils_Tuple2(90, 90),
			34,
			$elm$core$Maybe$Nothing,
			2,
			$author$project$Definition$NotSelf,
			_List_fromArray(
				[-1, -1, -1]))
		]);
	var player2spawn = _List_fromArray(
		[
			A9(
			$author$project$Definition$Tile,
			2,
			_List_fromArray(
				[0, 0, 0, 0]),
			$author$project$Definition$Block,
			_Utils_Tuple2(90, 0),
			17,
			$elm$core$Maybe$Nothing,
			4,
			$author$project$Definition$NotSelf,
			_List_fromArray(
				[-1, -1, -1]))
		]);
	var player1spawn = _List_fromArray(
		[
			A9(
			$author$project$Definition$Tile,
			2,
			_List_fromArray(
				[10, 0, 0, 0]),
			$author$project$Definition$Block,
			_Utils_Tuple2(0, 0),
			0,
			$elm$core$Maybe$Nothing,
			1,
			$author$project$Definition$NotSelf,
			_List_fromArray(
				[-1, -1, -1]))
		]);
	var mapWithoutBuilding = _Utils_ap(
		player1spawn,
		_Utils_ap(
			A4(
				$author$project$Map$generateLine,
				_Utils_Tuple2(10, 0),
				1,
				16,
				1),
			_Utils_ap(
				player2spawn,
				_Utils_ap(
					A4(
						$author$project$Map$generateLine,
						_Utils_Tuple2(90, 10),
						18,
						16,
						4),
					_Utils_ap(
						player3spawn,
						_Utils_ap(
							A4(
								$author$project$Map$generateLine,
								_Utils_Tuple2(85, 90),
								35,
								16,
								2),
							_Utils_ap(
								player4spawn,
								A4(
									$author$project$Map$generateLine,
									_Utils_Tuple2(0, 85),
									52,
									16,
									3))))))));
	var addBuilding = function (thisTile) {
		return A2(
			$elm$core$List$member,
			thisTile.index,
			_List_fromArray(
				[3, 15, 20, 32, 37, 49, 54, 66])) ? _Utils_update(
			thisTile,
			{
				building: $author$project$Definition$Casino(1)
			}) : (A2(
			$elm$core$List$member,
			thisTile.index,
			_List_fromArray(
				[6, 23, 40, 57])) ? _Utils_update(
			thisTile,
			{
				building: $author$project$Definition$Disco(1)
			}) : (A2(
			$elm$core$List$member,
			thisTile.index,
			_List_fromArray(
				[9, 26, 43, 60])) ? _Utils_update(
			thisTile,
			{
				building: $author$project$Definition$BoxingGym(1)
			}) : (A2(
			$elm$core$List$member,
			thisTile.index,
			_List_fromArray(
				[12, 29, 46, 63])) ? _Utils_update(
			thisTile,
			{
				building: $author$project$Definition$NightMarket(1)
			}) : ((thisTile.index === 24) ? _Utils_update(
			thisTile,
			{building: $author$project$Definition$Jail}) : ((thisTile.index === 58) ? _Utils_update(
			thisTile,
			{building: $author$project$Definition$PoliceStation}) : _Utils_update(
			thisTile,
			{building: $author$project$Definition$Block}))))));
	};
	var newTiles = A2($elm$core$List$map, addBuilding, mapWithoutBuilding);
	var tiles1 = $author$project$Map$initMember(newTiles);
	return $author$project$Map$initStability(tiles1);
}();
var $author$project$Model$judgeFlag = function (flag) {
	switch (flag) {
		case 'Lance':
			return $author$project$Definition$Lance;
		case 'Gorman':
			return $author$project$Definition$Gorman;
		case 'Doherty':
			return $author$project$Definition$Doherty;
		case 'Blair':
			return $author$project$Definition$Blair;
		default:
			return $author$project$Definition$Lance;
	}
};
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $rtfeldman$elm_css$VirtualDom$Styled$on = F2(
	function (eventName, handler) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$on, eventName, handler),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Events$on = F2(
	function (event, decoder) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $rtfeldman$elm_css$Html$Styled$Events$onClick = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Event$Event1_10$optionFunc1_1_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.03, wealth: player.wealth - 1000});
};
var $author$project$Event$Event1_10$optionFunc1_1_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.07, wealth: player.wealth + 1000});
};
var $elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2($elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var $elm$core$List$repeat = F2(
	function (n, value) {
		return A3($elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $rtfeldman$elm_css$VirtualDom$Styled$style = F2(
	function (key, val) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$style, key, val),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$style = $rtfeldman$elm_css$VirtualDom$Styled$style;
var $rtfeldman$elm_css$VirtualDom$Styled$Unstyled = function (a) {
	return {$: 'Unstyled', a: a};
};
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $rtfeldman$elm_css$VirtualDom$Styled$text = function (str) {
	return $rtfeldman$elm_css$VirtualDom$Styled$Unstyled(
		$elm$virtual_dom$VirtualDom$text(str));
};
var $rtfeldman$elm_css$Html$Styled$text = $rtfeldman$elm_css$VirtualDom$Styled$text;
var $author$project$Model$init = function (flag) {
	var viewPopUp = {
		backgroundImage: 'url(./src/image/event.jpg)',
		buttons: _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click1)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Let\'s Go!!!')
					]))
			]),
		descriptionText: 'Welcome to Fortun! Since you have come here, there is no chance to escape, because you no longer represent yourself, but more represent the fate and future of your family. Defeat all your opponents and avenge our decades of suffering!',
		title: 'Welcome to  Fortun Chase'
	};
	var round = {index: 1, phase: $author$project$Definition$PreparationPhase, playerIndex: 0};
	var player4 = {
		character: $author$project$Definition$Blair,
		currentIndex: 51,
		currentPos: _Utils_Tuple2(0, 90),
		dice: 3,
		exist: true,
		family: 20,
		familyLevel: $author$project$Definition$Medium,
		frameList: _List_fromArray(
			[
				_Utils_Tuple2(
				0,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '0%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '90%')
					])),
				_Utils_Tuple2(
				100,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '0%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '90%')
					]))
			]),
		influence: 0.2,
		isHuman: false,
		jailRound: -1,
		order: 3,
		policeAttention: 0.1,
		policeReduceLevel: $author$project$Definition$Medium,
		popularWill: 0.2,
		prestige: 0.2,
		storyRound: 0,
		wealth: 20000
	};
	var player3 = {
		character: $author$project$Definition$Doherty,
		currentIndex: 34,
		currentPos: _Utils_Tuple2(90, 90),
		dice: 3,
		exist: true,
		family: 20,
		familyLevel: $author$project$Definition$Medium,
		frameList: _List_fromArray(
			[
				_Utils_Tuple2(
				0,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '90%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '90%')
					])),
				_Utils_Tuple2(
				100,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '90%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '90%')
					]))
			]),
		influence: 0.2,
		isHuman: false,
		jailRound: -1,
		order: 2,
		policeAttention: 0.1,
		policeReduceLevel: $author$project$Definition$Medium,
		popularWill: 0.2,
		prestige: 0.2,
		storyRound: 0,
		wealth: 20000
	};
	var player2 = {
		character: $author$project$Definition$Gorman,
		currentIndex: 17,
		currentPos: _Utils_Tuple2(90, 0),
		dice: 3,
		exist: true,
		family: 20,
		familyLevel: $author$project$Definition$Medium,
		frameList: _List_fromArray(
			[
				_Utils_Tuple2(
				0,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '90%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '0%')
					])),
				_Utils_Tuple2(
				100,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '90%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '0%')
					]))
			]),
		influence: 0.2,
		isHuman: false,
		jailRound: -1,
		order: 1,
		policeAttention: 0.1,
		policeReduceLevel: $author$project$Definition$Medium,
		popularWill: 0.2,
		prestige: 0.2,
		storyRound: 0,
		wealth: 20000
	};
	var player1 = {
		character: $author$project$Definition$Lance,
		currentIndex: 0,
		currentPos: _Utils_Tuple2(0, 0),
		dice: 3,
		exist: true,
		family: 20,
		familyLevel: $author$project$Definition$Medium,
		frameList: _List_fromArray(
			[
				_Utils_Tuple2(
				0,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '0%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '0%')
					])),
				_Utils_Tuple2(
				100,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '0%'),
						A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '0%')
					]))
			]),
		influence: 0.5,
		isHuman: false,
		jailRound: -1,
		order: 0,
		policeAttention: 0.1,
		policeReduceLevel: $author$project$Definition$Medium,
		popularWill: 0.2,
		prestige: 0.2,
		storyRound: 0,
		wealth: 20000
	};
	var initMap = $author$project$Map$initMap;
	var event = {
		description: '1_1',
		hint: _List_fromArray(
			['wowowo']),
		optionDescription: _List_fromArray(
			['I am lcf.', 'I am lllllcf.']),
		optionFunc: _List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_1_1, $author$project$Event$Event1_10$optionFunc1_1_2])
	};
	var model = {
		actionDice: _List_fromArray(
			[$author$project$Definition$NoActionDice, $author$project$Definition$NoActionDice, $author$project$Definition$NoActionDice]),
		actionDiceNumber: _List_fromArray(
			[-1, -1, -1]),
		addOrFight: 'no',
		addSE: false,
		aiAction: _List_fromArray(
			[$author$project$Model$aiAction, $author$project$Model$aiAction, $author$project$Model$aiAction]),
		aiRandomNumber: A2($elm$core$List$repeat, 10000, 0),
		aiRandomNumberIndex: 0,
		aiRecord: '',
		battleHighlight: false,
		bgm: false,
		canClick: true,
		canClickEndAction: true,
		canSelectTile: false,
		character: $author$project$Model$judgeFlag(flag),
		control: _List_Nil,
		currentPlayer: 0,
		detailTileIndex: 0,
		dice: 1,
		diceState: $author$project$Definition$NotShowDice,
		event: event,
		fightButtonNumber: -1,
		fightIndicator: -1,
		fightSE: false,
		highlight: false,
		isMoving: false,
		map: initMap,
		mapMoveX: 0,
		mapMoveY: 0,
		moveSE: false,
		players: _List_fromArray(
			[player1, player2, player3, player4]),
		randomNumber: 32,
		reformSE: false,
		round: round,
		selectedTileIndex: -1,
		showActionDice: false,
		showActionDiceRespectively: _List_fromArray(
			[false, false, false]),
		showDice: $author$project$Definition$NoDice,
		showEndButton: false,
		showPopUp: true,
		sideState: $author$project$Definition$NoSide,
		state: $author$project$Definition$Play,
		topState: $author$project$Definition$NoTop,
		totalPlayer: 4,
		viewDetailed: false,
		viewPopUp: viewPopUp,
		windowSize: _Utils_Tuple2(1920, 1080),
		winnerIndex: -1
	};
	return _Utils_Tuple2(
		model,
		A2($elm$core$Task$perform, $author$project$Definition$GetSize, $elm$browser$Browser$Dom$getViewport));
};
var $elm$json$Json$Decode$string = _Json_decodeString;
var $author$project$Definition$AddKey = function (a) {
	return {$: 'AddKey', a: a};
};
var $author$project$Definition$Frame = function (a) {
	return {$: 'Frame', a: a};
};
var $author$project$Definition$RemoveKey = function (a) {
	return {$: 'RemoveKey', a: a};
};
var $author$project$Definition$UpdateSize = F2(
	function (a, b) {
		return {$: 'UpdateSize', a: a, b: b};
	});
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Definition$Character = function (a) {
	return {$: 'Character', a: a};
};
var $author$project$Definition$Control = function (a) {
	return {$: 'Control', a: a};
};
var $elm$core$Debug$log = _Debug_log;
var $author$project$Definition$toKeyValue = function (string) {
	var _v0 = $elm$core$Debug$log(string);
	var _v1 = $elm$core$String$uncons(string);
	if ((_v1.$ === 'Just') && (_v1.a.b === '')) {
		var _v2 = _v1.a;
		var _char = _v2.a;
		return $author$project$Definition$Character(_char);
	} else {
		return $author$project$Definition$Control(string);
	}
};
var $author$project$Definition$keyDecoder = A2(
	$elm$json$Json$Decode$map,
	$author$project$Definition$toKeyValue,
	A2($elm$json$Json$Decode$field, 'key', $elm$json$Json$Decode$string));
var $elm$browser$Browser$AnimationManager$Delta = function (a) {
	return {$: 'Delta', a: a};
};
var $elm$browser$Browser$AnimationManager$State = F3(
	function (subs, request, oldTime) {
		return {oldTime: oldTime, request: request, subs: subs};
	});
var $elm$browser$Browser$AnimationManager$init = $elm$core$Task$succeed(
	A3($elm$browser$Browser$AnimationManager$State, _List_Nil, $elm$core$Maybe$Nothing, 0));
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$browser$Browser$AnimationManager$now = _Browser_now(_Utils_Tuple0);
var $elm$browser$Browser$AnimationManager$rAF = _Browser_rAF(_Utils_Tuple0);
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$browser$Browser$AnimationManager$onEffects = F3(
	function (router, subs, _v0) {
		var request = _v0.request;
		var oldTime = _v0.oldTime;
		var _v1 = _Utils_Tuple2(request, subs);
		if (_v1.a.$ === 'Nothing') {
			if (!_v1.b.b) {
				var _v2 = _v1.a;
				return $elm$browser$Browser$AnimationManager$init;
			} else {
				var _v4 = _v1.a;
				return A2(
					$elm$core$Task$andThen,
					function (pid) {
						return A2(
							$elm$core$Task$andThen,
							function (time) {
								return $elm$core$Task$succeed(
									A3(
										$elm$browser$Browser$AnimationManager$State,
										subs,
										$elm$core$Maybe$Just(pid),
										time));
							},
							$elm$browser$Browser$AnimationManager$now);
					},
					$elm$core$Process$spawn(
						A2(
							$elm$core$Task$andThen,
							$elm$core$Platform$sendToSelf(router),
							$elm$browser$Browser$AnimationManager$rAF)));
			}
		} else {
			if (!_v1.b.b) {
				var pid = _v1.a.a;
				return A2(
					$elm$core$Task$andThen,
					function (_v3) {
						return $elm$browser$Browser$AnimationManager$init;
					},
					$elm$core$Process$kill(pid));
			} else {
				return $elm$core$Task$succeed(
					A3($elm$browser$Browser$AnimationManager$State, subs, request, oldTime));
			}
		}
	});
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$browser$Browser$AnimationManager$onSelfMsg = F3(
	function (router, newTime, _v0) {
		var subs = _v0.subs;
		var oldTime = _v0.oldTime;
		var send = function (sub) {
			if (sub.$ === 'Time') {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(
						$elm$time$Time$millisToPosix(newTime)));
			} else {
				var tagger = sub.a;
				return A2(
					$elm$core$Platform$sendToApp,
					router,
					tagger(newTime - oldTime));
			}
		};
		return A2(
			$elm$core$Task$andThen,
			function (pid) {
				return A2(
					$elm$core$Task$andThen,
					function (_v1) {
						return $elm$core$Task$succeed(
							A3(
								$elm$browser$Browser$AnimationManager$State,
								subs,
								$elm$core$Maybe$Just(pid),
								newTime));
					},
					$elm$core$Task$sequence(
						A2($elm$core$List$map, send, subs)));
			},
			$elm$core$Process$spawn(
				A2(
					$elm$core$Task$andThen,
					$elm$core$Platform$sendToSelf(router),
					$elm$browser$Browser$AnimationManager$rAF)));
	});
var $elm$browser$Browser$AnimationManager$Time = function (a) {
	return {$: 'Time', a: a};
};
var $elm$browser$Browser$AnimationManager$subMap = F2(
	function (func, sub) {
		if (sub.$ === 'Time') {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Time(
				A2($elm$core$Basics$composeL, func, tagger));
		} else {
			var tagger = sub.a;
			return $elm$browser$Browser$AnimationManager$Delta(
				A2($elm$core$Basics$composeL, func, tagger));
		}
	});
_Platform_effectManagers['Browser.AnimationManager'] = _Platform_createManager($elm$browser$Browser$AnimationManager$init, $elm$browser$Browser$AnimationManager$onEffects, $elm$browser$Browser$AnimationManager$onSelfMsg, 0, $elm$browser$Browser$AnimationManager$subMap);
var $elm$browser$Browser$AnimationManager$subscription = _Platform_leaf('Browser.AnimationManager');
var $elm$browser$Browser$AnimationManager$onAnimationFrameDelta = function (tagger) {
	return $elm$browser$Browser$AnimationManager$subscription(
		$elm$browser$Browser$AnimationManager$Delta(tagger));
};
var $elm$browser$Browser$Events$onAnimationFrameDelta = $elm$browser$Browser$AnimationManager$onAnimationFrameDelta;
var $elm$browser$Browser$Events$Document = {$: 'Document'};
var $elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 'MySub', a: a, b: b, c: c};
	});
var $elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {pids: pids, subs: subs};
	});
var $elm$browser$Browser$Events$init = $elm$core$Task$succeed(
	A2($elm$browser$Browser$Events$State, _List_Nil, $elm$core$Dict$empty));
var $elm$browser$Browser$Events$nodeToKey = function (node) {
	if (node.$ === 'Document') {
		return 'd_';
	} else {
		return 'w_';
	}
};
var $elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			$elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {event: event, key: key};
	});
var $elm$browser$Browser$Events$spawn = F3(
	function (router, key, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var actualNode = function () {
			if (node.$ === 'Document') {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			$elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						$elm$core$Platform$sendToSelf,
						router,
						A2($elm$browser$Browser$Events$Event, key, event));
				}));
	});
var $elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3($elm$core$Dict$foldl, $elm$core$Dict$insert, t2, t1);
	});
var $elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _v6) {
				var deads = _v6.a;
				var lives = _v6.b;
				var news = _v6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						$elm$core$List$cons,
						A3($elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_v4, pid, _v5) {
				var deads = _v5.a;
				var lives = _v5.b;
				var news = _v5.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _v2, _v3) {
				var deads = _v3.a;
				var lives = _v3.b;
				var news = _v3.c;
				return _Utils_Tuple3(
					deads,
					A3($elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2($elm$core$List$map, $elm$browser$Browser$Events$addKey, subs);
		var _v0 = A6(
			$elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.pids,
			$elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, $elm$core$Dict$empty, _List_Nil));
		var deadPids = _v0.a;
		var livePids = _v0.b;
		var makeNewPids = _v0.c;
		return A2(
			$elm$core$Task$andThen,
			function (pids) {
				return $elm$core$Task$succeed(
					A2(
						$elm$browser$Browser$Events$State,
						newSubs,
						A2(
							$elm$core$Dict$union,
							livePids,
							$elm$core$Dict$fromList(pids))));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$sequence(makeNewPids);
				},
				$elm$core$Task$sequence(
					A2($elm$core$List$map, $elm$core$Process$kill, deadPids))));
	});
var $elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _v0 = f(mx);
		if (_v0.$ === 'Just') {
			var x = _v0.a;
			return A2($elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var $elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			$elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var $elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _v0, state) {
		var key = _v0.key;
		var event = _v0.event;
		var toMessage = function (_v2) {
			var subKey = _v2.a;
			var _v3 = _v2.b;
			var node = _v3.a;
			var name = _v3.b;
			var decoder = _v3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : $elm$core$Maybe$Nothing;
		};
		var messages = A2($elm$core$List$filterMap, toMessage, state.subs);
		return A2(
			$elm$core$Task$andThen,
			function (_v1) {
				return $elm$core$Task$succeed(state);
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Platform$sendToApp(router),
					messages)));
	});
var $elm$browser$Browser$Events$subMap = F2(
	function (func, _v0) {
		var node = _v0.a;
		var name = _v0.b;
		var decoder = _v0.c;
		return A3(
			$elm$browser$Browser$Events$MySub,
			node,
			name,
			A2($elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager($elm$browser$Browser$Events$init, $elm$browser$Browser$Events$onEffects, $elm$browser$Browser$Events$onSelfMsg, 0, $elm$browser$Browser$Events$subMap);
var $elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var $elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return $elm$browser$Browser$Events$subscription(
			A3($elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var $elm$browser$Browser$Events$onKeyDown = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keydown');
var $elm$browser$Browser$Events$onKeyUp = A2($elm$browser$Browser$Events$on, $elm$browser$Browser$Events$Document, 'keyup');
var $elm$browser$Browser$Events$Window = {$: 'Window'};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		$elm$browser$Browser$Events$on,
		$elm$browser$Browser$Events$Window,
		'resize',
		A2(
			$elm$json$Json$Decode$field,
			'target',
			A3(
				$elm$json$Json$Decode$map2,
				func,
				A2($elm$json$Json$Decode$field, 'innerWidth', $elm$json$Json$Decode$int),
				A2($elm$json$Json$Decode$field, 'innerHeight', $elm$json$Json$Decode$int))));
};
var $author$project$Main$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$elm$browser$Browser$Events$onAnimationFrameDelta($author$project$Definition$Frame),
				$elm$browser$Browser$Events$onKeyDown(
				A2($elm$json$Json$Decode$map, $author$project$Definition$AddKey, $author$project$Definition$keyDecoder)),
				$elm$browser$Browser$Events$onKeyUp(
				A2($elm$json$Json$Decode$map, $author$project$Definition$RemoveKey, $author$project$Definition$keyDecoder)),
				$elm$browser$Browser$Events$onResize(
				F2(
					function (w, h) {
						return A2($author$project$Definition$UpdateSize, w, h);
					}))
			]));
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles = F2(
	function (_v0, styles) {
		var newStyles = _v0.b;
		var classname = _v0.c;
		return $elm$core$List$isEmpty(newStyles) ? styles : A3($elm$core$Dict$insert, classname, newStyles, styles);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute = function (_v0) {
	var val = _v0.a;
	return val;
};
var $elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$keyedNodeNS = F2(
	function (namespace, tag) {
		return A2(
			_VirtualDom_keyedNodeNS,
			namespace,
			_VirtualDom_noScript(tag));
	});
var $elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var $elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml = F2(
	function (_v6, _v7) {
		var key = _v6.a;
		var html = _v6.b;
		var pairs = _v7.a;
		var styles = _v7.b;
		switch (html.$) {
			case 'Unstyled':
				var vdom = html.a;
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v9 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v9.a;
				var finalStyles = _v9.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v10 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v10.a;
				var finalStyles = _v10.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v11 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v11.a;
				var finalStyles = _v11.b;
				var vdom = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v12 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v12.a;
				var finalStyles = _v12.b;
				var vdom = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(key, vdom),
						pairs),
					finalStyles);
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml = F2(
	function (html, _v0) {
		var nodes = _v0.a;
		var styles = _v0.b;
		switch (html.$) {
			case 'Unstyled':
				var vdomNode = html.a;
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					styles);
			case 'Node':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v2 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v2.a;
				var finalStyles = _v2.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$node,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'NodeNS':
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v3 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v3.a;
				var finalStyles = _v3.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$nodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			case 'KeyedNode':
				var elemType = html.a;
				var properties = html.b;
				var children = html.c;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v4 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v4.a;
				var finalStyles = _v4.b;
				var vdomNode = A3(
					$elm$virtual_dom$VirtualDom$keyedNode,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
			default:
				var ns = html.a;
				var elemType = html.b;
				var properties = html.c;
				var children = html.d;
				var combinedStyles = A3($elm$core$List$foldl, $rtfeldman$elm_css$VirtualDom$Styled$accumulateStyles, styles, properties);
				var _v5 = A3(
					$elm$core$List$foldl,
					$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
					_Utils_Tuple2(_List_Nil, combinedStyles),
					children);
				var childNodes = _v5.a;
				var finalStyles = _v5.b;
				var vdomNode = A4(
					$elm$virtual_dom$VirtualDom$keyedNodeNS,
					ns,
					elemType,
					A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties),
					$elm$core$List$reverse(childNodes));
				return _Utils_Tuple2(
					A2($elm$core$List$cons, vdomNode, nodes),
					finalStyles);
		}
	});
var $elm$core$Dict$singleton = F2(
	function (key, value) {
		return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp = F2(
	function (candidate, properties) {
		stylesFromPropertiesHelp:
		while (true) {
			if (!properties.b) {
				return candidate;
			} else {
				var _v1 = properties.a;
				var styles = _v1.b;
				var classname = _v1.c;
				var rest = properties.b;
				if ($elm$core$String$isEmpty(classname)) {
					var $temp$candidate = candidate,
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				} else {
					var $temp$candidate = $elm$core$Maybe$Just(
						_Utils_Tuple2(classname, styles)),
						$temp$properties = rest;
					candidate = $temp$candidate;
					properties = $temp$properties;
					continue stylesFromPropertiesHelp;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties = function (properties) {
	var _v0 = A2($rtfeldman$elm_css$VirtualDom$Styled$stylesFromPropertiesHelp, $elm$core$Maybe$Nothing, properties);
	if (_v0.$ === 'Nothing') {
		return $elm$core$Dict$empty;
	} else {
		var _v1 = _v0.a;
		var classname = _v1.a;
		var styles = _v1.b;
		return A2($elm$core$Dict$singleton, classname, styles);
	}
};
var $rtfeldman$elm_css$Css$Structure$ClassSelector = function (a) {
	return {$: 'ClassSelector', a: a};
};
var $rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair = function (_v0) {
	var classname = _v0.a;
	var styles = _v0.b;
	return A2(
		$rtfeldman$elm_css$VirtualDom$Styled$makeSnippet,
		styles,
		$rtfeldman$elm_css$Css$Structure$UniversalSelectorSequence(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$Structure$ClassSelector(classname)
				])));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toDeclaration = function (dict) {
	return $rtfeldman$elm_css$Css$Preprocess$Resolve$compile(
		$elm$core$List$singleton(
			$rtfeldman$elm_css$Css$Preprocess$stylesheet(
				A2(
					$elm$core$List$map,
					$rtfeldman$elm_css$VirtualDom$Styled$snippetFromPair,
					$elm$core$Dict$toList(dict)))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode = function (styles) {
	return A3(
		$elm$virtual_dom$VirtualDom$node,
		'style',
		_List_Nil,
		$elm$core$List$singleton(
			$elm$virtual_dom$VirtualDom$text(
				$rtfeldman$elm_css$VirtualDom$Styled$toDeclaration(styles))));
};
var $rtfeldman$elm_css$VirtualDom$Styled$unstyle = F3(
	function (elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A3(
			$elm$virtual_dom$VirtualDom$node,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$containsKey = F2(
	function (key, pairs) {
		containsKey:
		while (true) {
			if (!pairs.b) {
				return false;
			} else {
				var _v1 = pairs.a;
				var str = _v1.a;
				var rest = pairs.b;
				if (_Utils_eq(key, str)) {
					return true;
				} else {
					var $temp$key = key,
						$temp$pairs = rest;
					key = $temp$key;
					pairs = $temp$pairs;
					continue containsKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey = F2(
	function (_default, pairs) {
		getUnusedKey:
		while (true) {
			if (!pairs.b) {
				return _default;
			} else {
				var _v1 = pairs.a;
				var firstKey = _v1.a;
				var rest = pairs.b;
				var newKey = '_' + firstKey;
				if (A2($rtfeldman$elm_css$VirtualDom$Styled$containsKey, newKey, rest)) {
					var $temp$default = newKey,
						$temp$pairs = rest;
					_default = $temp$default;
					pairs = $temp$pairs;
					continue getUnusedKey;
				} else {
					return newKey;
				}
			}
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode = F2(
	function (allStyles, keyedChildNodes) {
		var styleNodeKey = A2($rtfeldman$elm_css$VirtualDom$Styled$getUnusedKey, '_', keyedChildNodes);
		var finalNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(allStyles);
		return _Utils_Tuple2(styleNodeKey, finalNode);
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed = F3(
	function (elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A3(
			$elm$virtual_dom$VirtualDom$keyedNode,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS = F4(
	function (ns, elemType, properties, keyedChildren) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateKeyedStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			keyedChildren);
		var keyedChildNodes = _v0.a;
		var styles = _v0.b;
		var keyedStyleNode = A2($rtfeldman$elm_css$VirtualDom$Styled$toKeyedStyleNode, styles, keyedChildNodes);
		return A4(
			$elm$virtual_dom$VirtualDom$keyedNodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				keyedStyleNode,
				$elm$core$List$reverse(keyedChildNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$unstyleNS = F4(
	function (ns, elemType, properties, children) {
		var unstyledProperties = A2($elm$core$List$map, $rtfeldman$elm_css$VirtualDom$Styled$extractUnstyledAttribute, properties);
		var initialStyles = $rtfeldman$elm_css$VirtualDom$Styled$stylesFromProperties(properties);
		var _v0 = A3(
			$elm$core$List$foldl,
			$rtfeldman$elm_css$VirtualDom$Styled$accumulateStyledHtml,
			_Utils_Tuple2(_List_Nil, initialStyles),
			children);
		var childNodes = _v0.a;
		var styles = _v0.b;
		var styleNode = $rtfeldman$elm_css$VirtualDom$Styled$toStyleNode(styles);
		return A4(
			$elm$virtual_dom$VirtualDom$nodeNS,
			ns,
			elemType,
			unstyledProperties,
			A2(
				$elm$core$List$cons,
				styleNode,
				$elm$core$List$reverse(childNodes)));
	});
var $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled = function (vdom) {
	switch (vdom.$) {
		case 'Unstyled':
			var plainNode = vdom.a;
			return plainNode;
		case 'Node':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyle, elemType, properties, children);
		case 'NodeNS':
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleNS, ns, elemType, properties, children);
		case 'KeyedNode':
			var elemType = vdom.a;
			var properties = vdom.b;
			var children = vdom.c;
			return A3($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyed, elemType, properties, children);
		default:
			var ns = vdom.a;
			var elemType = vdom.b;
			var properties = vdom.c;
			var children = vdom.d;
			return A4($rtfeldman$elm_css$VirtualDom$Styled$unstyleKeyedNS, ns, elemType, properties, children);
	}
};
var $rtfeldman$elm_css$Html$Styled$toUnstyled = $rtfeldman$elm_css$VirtualDom$Styled$toUnstyled;
var $author$project$Definition$Restart = {$: 'Restart'};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $author$project$Update$lose = F2(
	function (msg, model) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Restart),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('I\'ll be back one day!')
						]))
				]),
			descriptionText: 'The enemy\'s power in the town obviously overthrew us. We had to choose to retreat. The car to the East is ready.',
			title: 'Lose'
		};
		return _Utils_Tuple2(
			_Utils_update(
				model,
				{showPopUp: true, state: $author$project$Definition$Play, viewPopUp: viewPopUp}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$name = function (_int) {
	switch (_int) {
		case 0:
			return 'Lance';
		case 1:
			return 'Gorman';
		case 2:
			return 'Doherty';
		case 3:
			return 'Blair';
		default:
			return 'Dummy';
	}
};
var $author$project$Update$over100 = F2(
	function (_v0, model) {
		var winner = A2($author$project$Definition$get, model.winnerIndex, model.players);
		var viewPopUp2 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Restart),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('I\'ll be back one day!')
						]))
				]),
			descriptionText: $author$project$Update$name(model.winnerIndex) + '\'s power in the town obviously overthrew us. We had to choose to retreat. The car to the East is ready.',
			title: 'Lose'
		};
		var viewPopUp1 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Restart),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('God bless us!')
						]))
				]),
			descriptionText: 'Under your wise leadership and hard work, we have defeated all the enemies and regained the leadership of the town. A new road is ahead!',
			title: 'Win!'
		};
		return winner.isHuman ? _Utils_Tuple2(
			_Utils_update(
				model,
				{showPopUp: true, state: $author$project$Definition$Play, viewPopUp: viewPopUp1}),
			$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
			_Utils_update(
				model,
				{showPopUp: true, state: $author$project$Definition$Play, viewPopUp: viewPopUp2}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Definition$AiRandomNumber = function (a) {
	return {$: 'AiRandomNumber', a: a};
};
var $author$project$Definition$Click6 = {$: 'Click6'};
var $author$project$Definition$CountWealth = {$: 'CountWealth'};
var $author$project$Definition$EndPhase = {$: 'EndPhase'};
var $author$project$Definition$FinalDice = {$: 'FinalDice'};
var $author$project$Definition$FinalMoreDice = {$: 'FinalMoreDice'};
var $author$project$Definition$HideSide = {$: 'HideSide'};
var $author$project$Definition$HideTop = {$: 'HideTop'};
var $author$project$Definition$ImplementationPhase = {$: 'ImplementationPhase'};
var $author$project$Definition$Move = {$: 'Move'};
var $author$project$Definition$MovePhase = {$: 'MovePhase'};
var $author$project$Definition$NewFace = function (a) {
	return {$: 'NewFace', a: a};
};
var $author$project$Definition$NewFaceAction = function (a) {
	return {$: 'NewFaceAction', a: a};
};
var $author$project$Definition$NotClick = {$: 'NotClick'};
var $author$project$Definition$RandomNumber = function (a) {
	return {$: 'RandomNumber', a: a};
};
var $author$project$Definition$RollingDice = {$: 'RollingDice'};
var $author$project$Definition$RollingMoreDice = {$: 'RollingMoreDice'};
var $andrewMacmurray$elm_delay$Delay$Second = {$: 'Second'};
var $author$project$Definition$ShowSide = {$: 'ShowSide'};
var $author$project$Definition$ShowTop = {$: 'ShowTop'};
var $author$project$Definition$StopRoll = {$: 'StopRoll'};
var $author$project$Definition$StopRollAction = {$: 'StopRollAction'};
var $author$project$Definition$UseActionDice = F2(
	function (a, b) {
		return {$: 'UseActionDice', a: a, b: b};
	});
var $andrewMacmurray$elm_delay$Delay$Duration = F2(
	function (a, b) {
		return {$: 'Duration', a: a, b: b};
	});
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$core$Process$sleep = _Process_sleep;
var $andrewMacmurray$elm_delay$Delay$after_ = F2(
	function (time, msg) {
		return A2(
			$elm$core$Task$perform,
			$elm$core$Basics$always(msg),
			$elm$core$Process$sleep(time));
	});
var $andrewMacmurray$elm_delay$Delay$Minute = {$: 'Minute'};
var $andrewMacmurray$elm_delay$Delay$toMillis = function (_v0) {
	var t = _v0.a;
	var u = _v0.b;
	switch (u.$) {
		case 'Millisecond':
			return t;
		case 'Second':
			return 1000 * t;
		case 'Minute':
			return $andrewMacmurray$elm_delay$Delay$toMillis(
				A2($andrewMacmurray$elm_delay$Delay$Duration, 60 * t, $andrewMacmurray$elm_delay$Delay$Second));
		default:
			return $andrewMacmurray$elm_delay$Delay$toMillis(
				A2($andrewMacmurray$elm_delay$Delay$Duration, 60 * t, $andrewMacmurray$elm_delay$Delay$Minute));
	}
};
var $andrewMacmurray$elm_delay$Delay$after = F3(
	function (time, unit, msg) {
		return A2(
			$andrewMacmurray$elm_delay$Delay$after_,
			$andrewMacmurray$elm_delay$Delay$toMillis(
				A2($andrewMacmurray$elm_delay$Delay$Duration, time, unit)),
			msg);
	});
var $author$project$Update$changeDice = F2(
	function (players, model) {
		return A2(
			$elm$core$List$map,
			function (player) {
				return _Utils_update(
					player,
					{dice: model.dice});
			},
			players);
	});
var $elm$core$String$fromChar = function (_char) {
	return A2($elm$core$String$cons, _char, '');
};
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $author$project$Animation$checkMap = function (model) {
	var control = $elm$core$List$head(model.control);
	var command = function () {
		if (control.$ === 'Just') {
			var value = control.a;
			if (value.$ === 'Control') {
				return '';
			} else {
				var _char = value.a;
				return $elm$core$String$fromChar(_char);
			}
		} else {
			return '';
		}
	}();
	switch (command) {
		case 'w':
			return _Utils_update(
				model,
				{
					mapMoveY: A2($elm$core$Basics$min, model.mapMoveY + 10, 0)
				});
		case 's':
			return _Utils_update(
				model,
				{
					mapMoveY: A2($elm$core$Basics$max, model.mapMoveY - 10, -(1440 - (0.8 * model.windowSize.b)))
				});
		case 'd':
			return _Utils_update(
				model,
				{
					mapMoveX: A2($elm$core$Basics$max, model.mapMoveX - 10, -(1440 - (0.8 * model.windowSize.a)))
				});
		case 'a':
			return _Utils_update(
				model,
				{
					mapMoveX: A2($elm$core$Basics$min, model.mapMoveX + 10, 0)
				});
		default:
			return model;
	}
};
var $author$project$Definition$MoveDice = {$: 'MoveDice'};
var $author$project$Definition$SpecialMoveNewFace = function (a) {
	return {$: 'SpecialMoveNewFace', a: a};
};
var $author$project$Definition$SpecialMoveStopRoll = {$: 'SpecialMoveStopRoll'};
var $elm$random$Random$Generate = function (a) {
	return {$: 'Generate', a: a};
};
var $elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 'Seed', a: a, b: b};
	});
var $elm$random$Random$next = function (_v0) {
	var state0 = _v0.a;
	var incr = _v0.b;
	return A2($elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var $elm$random$Random$initialSeed = function (x) {
	var _v0 = $elm$random$Random$next(
		A2($elm$random$Random$Seed, 0, 1013904223));
	var state1 = _v0.a;
	var incr = _v0.b;
	var state2 = (state1 + x) >>> 0;
	return $elm$random$Random$next(
		A2($elm$random$Random$Seed, state2, incr));
};
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$random$Random$init = A2(
	$elm$core$Task$andThen,
	function (time) {
		return $elm$core$Task$succeed(
			$elm$random$Random$initialSeed(
				$elm$time$Time$posixToMillis(time)));
	},
	$elm$time$Time$now);
var $elm$random$Random$step = F2(
	function (_v0, seed) {
		var generator = _v0.a;
		return generator(seed);
	});
var $elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return $elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a.a;
			var rest = commands.b;
			var _v1 = A2($elm$random$Random$step, generator, seed);
			var value = _v1.a;
			var newSeed = _v1.b;
			return A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2($elm$core$Platform$sendToApp, router, value));
		}
	});
var $elm$random$Random$onSelfMsg = F3(
	function (_v0, _v1, seed) {
		return $elm$core$Task$succeed(seed);
	});
var $elm$random$Random$Generator = function (a) {
	return {$: 'Generator', a: a};
};
var $elm$random$Random$map = F2(
	function (func, _v0) {
		var genA = _v0.a;
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v1 = genA(seed0);
				var a = _v1.a;
				var seed1 = _v1.b;
				return _Utils_Tuple2(
					func(a),
					seed1);
			});
	});
var $elm$random$Random$cmdMap = F2(
	function (func, _v0) {
		var generator = _v0.a;
		return $elm$random$Random$Generate(
			A2($elm$random$Random$map, func, generator));
	});
_Platform_effectManagers['Random'] = _Platform_createManager($elm$random$Random$init, $elm$random$Random$onEffects, $elm$random$Random$onSelfMsg, $elm$random$Random$cmdMap);
var $elm$random$Random$command = _Platform_leaf('Random');
var $elm$random$Random$generate = F2(
	function (tagger, generator) {
		return $elm$random$Random$command(
			$elm$random$Random$Generate(
				A2($elm$random$Random$map, tagger, generator)));
	});
var $elm$random$Random$peel = function (_v0) {
	var state = _v0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var $elm$random$Random$int = F2(
	function (a, b) {
		return $elm$random$Random$Generator(
			function (seed0) {
				var _v0 = (_Utils_cmp(a, b) < 0) ? _Utils_Tuple2(a, b) : _Utils_Tuple2(b, a);
				var lo = _v0.a;
				var hi = _v0.b;
				var range = (hi - lo) + 1;
				if (!((range - 1) & range)) {
					return _Utils_Tuple2(
						(((range - 1) & $elm$random$Random$peel(seed0)) >>> 0) + lo,
						$elm$random$Random$next(seed0));
				} else {
					var threshhold = (((-range) >>> 0) % range) >>> 0;
					var accountForBias = function (seed) {
						accountForBias:
						while (true) {
							var x = $elm$random$Random$peel(seed);
							var seedN = $elm$random$Random$next(seed);
							if (_Utils_cmp(x, threshhold) < 0) {
								var $temp$seed = seedN;
								seed = $temp$seed;
								continue accountForBias;
							} else {
								return _Utils_Tuple2((x % range) + lo, seedN);
							}
						}
					};
					return accountForBias(seed0);
				}
			});
	});
var $author$project$Update$chooseCmdMsgForImp = function (subRoundPhase) {
	return (_Utils_eq(
		subRoundPhase,
		A2($author$project$Definition$UseActionDice, $author$project$Definition$MoveDice, 0)) || (_Utils_eq(
		subRoundPhase,
		A2($author$project$Definition$UseActionDice, $author$project$Definition$MoveDice, 1)) || _Utils_eq(
		subRoundPhase,
		A2($author$project$Definition$UseActionDice, $author$project$Definition$MoveDice, 2)))) ? $elm$core$Platform$Cmd$batch(
		_List_fromArray(
			[
				A2(
				$elm$random$Random$generate,
				$author$project$Definition$SpecialMoveNewFace,
				A2($elm$random$Random$int, 1, 6)),
				A3($andrewMacmurray$elm_delay$Delay$after, 3, $andrewMacmurray$elm_delay$Delay$Second, $author$project$Definition$SpecialMoveStopRoll)
			])) : $elm$core$Platform$Cmd$batch(
		_List_fromArray(
			[
				A2(
				$elm$random$Random$generate,
				$author$project$Definition$RandomNumber,
				A2($elm$random$Random$int, 1, 100))
			]));
};
var $author$project$Definition$Click3 = {$: 'Click3'};
var $author$project$Definition$Click4 = {$: 'Click4'};
var $author$project$Definition$Click5 = {$: 'Click5'};
var $author$project$Update$chooseMsgForInit = F2(
	function (subPhase, clickState) {
		return (_Utils_eq(subPhase, $author$project$Definition$LetUsStart) && (_Utils_eq(clickState, $author$project$Definition$Click3) || (_Utils_eq(clickState, $author$project$Definition$Click4) || (_Utils_eq(clickState, $author$project$Definition$Click5) || _Utils_eq(clickState, $author$project$Definition$Click6))))) ? $elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2($elm$core$Task$perform, $author$project$Definition$GetSize, $elm$browser$Browser$Dom$getViewport),
					A2(
					$elm$random$Random$generate,
					$author$project$Definition$RandomNumber,
					A2($elm$random$Random$int, 1, 100))
				])) : $elm$core$Platform$Cmd$batch(
			_List_fromArray(
				[
					A2(
					$elm$random$Random$generate,
					$author$project$Definition$RandomNumber,
					A2($elm$random$Random$int, 1, 100))
				]));
	});
var $author$project$Definition$Click2 = {$: 'Click2'};
var $elm$core$Debug$toString = _Debug_toString;
var $author$project$Definition$buildingLevel = F2(
	function (map, index) {
		var tile = A2($author$project$Definition$get, index, map);
		var building = tile.building;
		switch (building.$) {
			case 'Casino':
				var level = building.a;
				return _Utils_Tuple2(
					'Casino',
					'Level ' + $elm$core$Debug$toString(level));
			case 'Disco':
				var level = building.a;
				return _Utils_Tuple2(
					'Disco',
					'Level ' + $elm$core$Debug$toString(level));
			case 'BoxingGym':
				var level = building.a;
				return _Utils_Tuple2(
					'Boxing Gym',
					'Level ' + $elm$core$Debug$toString(level));
			case 'NightMarket':
				var level = building.a;
				return _Utils_Tuple2(
					'Night Market',
					'Level ' + $elm$core$Debug$toString(level));
			case 'Block':
				return _Utils_Tuple2('Block', 'No level');
			case 'Jail':
				return _Utils_Tuple2('Jail', 'Public Space');
			default:
				return _Utils_Tuple2('Police Station', 'Public Space');
		}
	});
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $elm$core$Basics$ge = _Utils_ge;
var $author$project$Definition$playerName = function (player) {
	var _v0 = player.character;
	switch (_v0.$) {
		case 'Lance':
			return 'Lance';
		case 'Gorman':
			return 'Gorman';
		case 'Doherty':
			return 'Doherty';
		case 'Blair':
			return 'Blair';
		default:
			return 'Dummy';
	}
};
var $author$project$Ai$aiRecord = function (model) {
	var round = model.round.index;
	var roundRec = '----- ROUND ' + ($elm$core$Debug$toString(round) + ' -----\n');
	var parseRecord = function (aiAction) {
		var move = aiAction.move;
		var fightTimes = aiAction.count.b;
		var atTileIndex = aiAction.upgrade;
		var buildingName = _Utils_eq(atTileIndex, -1) ? '' : A2($author$project$Definition$buildingLevel, model.map, atTileIndex).a;
		var level = _Utils_eq(atTileIndex, -1) ? '' : A2($author$project$Definition$buildingLevel, model.map, atTileIndex).b;
		var aiPlayer = A2($author$project$Definition$get, aiAction.order, model.players);
		var aiName = $author$project$Definition$playerName(aiPlayer);
		var moveRec = aiName + (' moved ' + ($elm$core$Debug$toString(move) + ' tiles.\n'));
		var upgradeRec = _Utils_eq(aiAction.upgrade, -1) ? '' : (aiName + (' upgraded ' + (buildingName + (' to ' + (level + '.\n')))));
		var aiFight = A2(
			$elm$core$List$indexedMap,
			F2(
				function (index, x) {
					return (_Utils_cmp(index, fightTimes - 1) > 0) ? _Utils_Tuple3(100, 0, false) : x;
				}),
			aiAction.fight);
		var fightRec = function () {
			var single = function (_v1) {
				var place = _v1.a;
				var enemy = _v1.b;
				var result = _v1.c;
				var winLose = result ? 'won' : 'lost';
				return (place === 100) ? '' : ((!fightTimes) ? '' : (aiName + (' attacked ' + ($author$project$Definition$playerName(
					A2($author$project$Definition$get, enemy, model.players)) + (' on Tile No.' + ($elm$core$Debug$toString(place) + (' and ' + (winLose + '.\n'))))))));
			};
			return $elm$core$String$concat(
				A2($elm$core$List$map, single, aiFight));
		}();
		var addTimes = aiAction.count.a;
		var addRec = function () {
			var single = function (_v0) {
				var place = _v0.a;
				var quantity = _v0.b;
				return (place === 100) ? '' : (aiName + (' sent ' + ($elm$core$Debug$toString(quantity) + (' member(s) to Tile No.' + ($elm$core$Debug$toString(place) + '.\n')))));
			};
			var aiAdd = A2(
				$elm$core$List$indexedMap,
				F2(
					function (index, x) {
						return (_Utils_cmp(index, addTimes - 1) > 0) ? _Utils_Tuple2(100, 0) : x;
					}),
				aiAction.add);
			return (!addTimes) ? '' : $elm$core$String$concat(
				A2($elm$core$List$map, single, aiAdd));
		}();
		return aiPlayer.exist ? ((aiPlayer.jailRound >= 0) ? (aiName + ' is in jail...\n') : _Utils_ap(
			moveRec,
			_Utils_ap(
				upgradeRec,
				_Utils_ap(addRec, fightRec)))) : (aiName + ' has been kicked out from Fortun...\n');
	};
	var appended = _Utils_ap(
		roundRec,
		$elm$core$String$concat(
			A2($elm$core$List$map, parseRecord, model.aiAction)));
	return _Utils_update(
		model,
		{
			aiRecord: A2($elm$core$String$append, model.aiRecord, appended)
		});
};
var $author$project$Definition$Event = F4(
	function (description, optionDescription, optionFunc, hint) {
		return {description: description, hint: hint, optionDescription: optionDescription, optionFunc: optionFunc};
	});
var $author$project$Event$Event1_10$event_1_1 = function (model) {
	var optionDescription = _List_fromArray(
		['Turn a blind eye.', 'We can also corrupt together.']);
	var hint = _List_fromArray(
		['Wealth -1000, Popular Will -3%', 'Wealth +1000, Popular Will -7%']);
	var description = 'Because of our low prestige, we lost control of our family members, making the neighborhood under our protection full of corruption and extortion of local residents.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_1_1, $author$project$Event$Event1_10$optionFunc1_1_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_10_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (5 / 100), prestige: player.prestige + (3 / 100)});
};
var $author$project$Event$Event1_10$optionFunc1_10_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - (5 / 100), prestige: player.prestige + (2 / 100)});
};
var $author$project$Event$Event1_10$event_1_10 = function (model) {
	var optionDescription = _List_fromArray(
		['This is your own fault, explain it, and sincerely apologize', 'I am a big man, cannot be so humble, so I ignored that.']);
	var hint = _List_fromArray(
		['Popular Will +5%, Prestige +3%', 'Prestige +2%, Popular Will -5%']);
	var description = 'Poor business conditions make your heart irritable, with a cigarette end carelessly thrown on the head of other people. ';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_10_1, $author$project$Event$Event1_10$optionFunc1_10_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_11_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.05});
};
var $author$project$Event$Event11_20$optionFunc1_11_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + 0.05, wealth: player.wealth - 5000});
};
var $author$project$Event$Event11_20$event_1_11 = function (model) {
	var optionDescription = _List_fromArray(
		['I can\'t change existing policies.', 'Take money out of the tight coffers for a living allowance.']);
	var hint = _List_fromArray(
		['Popular Will -5%', 'Wealth -5000, Popular Will +5%']);
	var description = 'The impoverishment of the region made life miserable, and inflation and wages stagnated. ';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_11_1, $author$project$Event$Event11_20$optionFunc1_11_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_12_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.05});
};
var $author$project$Event$Event11_20$optionFunc1_12_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + 0.05, wealth: player.wealth - 5000});
};
var $author$project$Event$Event11_20$event_1_12 = function (model) {
	var optionDescription = _List_fromArray(
		['Stay out of the limelight', 'Try to make a change, but it won\'t work in the short term.']);
	var hint = _List_fromArray(
		['Popular Will -5%', 'Wealth -5000, Popular Will +5%']);
	var description = 'Your management makes people feel depressed and desperate, and finally they can\'t stand it anymore. They start to demonstrate and march, and things get worse and worse.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_12_1, $author$project$Event$Event11_20$optionFunc1_12_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_13_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + 0.05});
};
var $author$project$Event$Event11_20$optionFunc1_13_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.05, prestige: player.prestige + 0.02, wealth: player.wealth - 1000});
};
var $author$project$Event$Event11_20$event_1_13 = function (model) {
	var optionDescription = _List_fromArray(
		['Rectify the people\'s minds and educate them', 'I think this is a good change.']);
	var hint = _List_fromArray(
		['Popular Will +5%', 'Wealth -1000, Prestige +2%, Popular Will -5%']);
	var description = 'Your great prestige has also made your little brother swell and become aggressive to the people.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_13_1, $author$project$Event$Event11_20$optionFunc1_13_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_14_1 = function (player) {
	return _Utils_update(
		player,
		{influence: player.prestige + 0.03});
};
var $author$project$Event$Event11_20$optionFunc1_14_2 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 1500});
};
var $author$project$Event$Event11_20$event_1_14 = function (model) {
	var optionDescription = _List_fromArray(
		['Strongly in favor of.', 'Prefer to cooperate with them.']);
	var hint = _List_fromArray(
		['Prestige +3%', 'Wealth +2000']);
	var description = 'Your enormous prestige also causes the followers arrogant and begin to try to oust other family members in the area.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_14_1, $author$project$Event$Event11_20$optionFunc1_14_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_15_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 1000});
};
var $author$project$Event$Event11_20$event_1_15 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth +1000']);
	var description = 'Good weather for the crops, people live happily, and the economy has been rapid growth.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_15_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_16_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 3000});
};
var $author$project$Event$Event11_20$optionFunc1_16_2 = function (player) {
	return player;
};
var $author$project$Event$Event11_20$event_1_16 = function (model) {
	var optionDescription = _List_fromArray(
		['I\'m obsessed with puzzles.', 'Struggle for a period of time without a start, self-abandon.']);
	var hint = _List_fromArray(
		['Wealth -3000', 'Nothing happens']);
	var description = 'Nowadays, your business is good, and in your spare time you\'re hooked on puzzles. Today, you\'ve come across a very difficult puzzle.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_16_1, $author$project$Event$Event11_20$optionFunc1_16_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_17_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.05, wealth: player.wealth + 2500});
};
var $author$project$Event$Event11_20$optionFunc1_17_2 = function (player) {
	return player;
};
var $author$project$Event$Event11_20$event_1_17 = function (model) {
	var optionDescription = _List_fromArray(
		['Increase the intensity of the search for money.', 'Being frightened.']);
	var hint = _List_fromArray(
		['Wealth +2500, Police Attention +5%', 'Nothing happens']);
	var description = 'You\'re surprised at how little attention the police give you, and you\'re able to do both in black and white, and you decide...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_17_1, $author$project$Event$Event11_20$optionFunc1_17_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_18_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + 0.05, wealth: player.wealth - 2500});
};
var $author$project$Event$Event11_20$optionFunc1_18_2 = function (player) {
	return player;
};
var $author$project$Event$Event11_20$event_1_18 = function (model) {
	var optionDescription = _List_fromArray(
		['Strengthen welfare and treat the people well.', 'Don\'t be arrogant, as always is the best.']);
	var hint = _List_fromArray(
		['Wealth -2500, Popular Will +5%', 'Nothing happens']);
	var description = 'Everything is going so well that you feel like you\'ve become the uncrowned king.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_18_1, $author$project$Event$Event11_20$optionFunc1_18_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_19_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - 0.1});
};
var $author$project$Event$Event11_20$event_1_19 = function (model) {
	var optionDescription = _List_fromArray(
		['They go to people and finally believe that you are a good man.']);
	var hint = _List_fromArray(
		['Police Attention -10%']);
	var description = 'The police are paying close attention to you for a lot of recent activities, but your good opinion of the people makes them suspicious.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_19_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_2_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - (5 / 100), wealth: player.wealth - 2500});
};
var $author$project$Event$Event1_10$optionFunc1_2_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (3 / 100)});
};
var $author$project$Event$Event1_10$event_1_2 = function (model) {
	var optionDescription = _List_fromArray(
		['Bribed the director.', 'They\'re doing the same thing but they\'re keeping a low profile.']);
	var hint = _List_fromArray(
		['Wealth -2500, Police Attention -5%', 'Police Attention +3%']);
	var description = 'Because of the recent spate of activities, the police have been looking into all aspects of the legality of our actions.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_2_1, $author$project$Event$Event1_10$optionFunc1_2_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event11_20$optionFunc1_20_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + 0.05, wealth: player.wealth - 2500});
};
var $author$project$Event$Event11_20$optionFunc1_20_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - 0.03, wealth: player.wealth + 1500});
};
var $author$project$Event$Event11_20$event_1_20 = function (model) {
	var optionDescription = _List_fromArray(
		['Spending a lot of money at an auction.', 'Believe that the peak in a certain field will make you famous.']);
	var hint = _List_fromArray(
		['Wealth -2500, Prestige +5%', 'Wealth +1500, Prestige -3%']);
	var description = 'Even if you have good management skills, you are still unknown.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event11_20$optionFunc1_20_1, $author$project$Event$Event11_20$optionFunc1_20_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_21_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 1000});
};
var $author$project$Event$Event21_30$event_1_21 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth -1000']);
	var description = 'Tripped over a can on the way down, fell down the stairs and had to make a \'spending\' trip to the hospital.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_21_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_22_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - (2 / 100)});
};
var $author$project$Event$Event21_30$event_1_22 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Prestige -2%']);
	var description = 'You was unfortunately bitten by a dog, then you subconsciously hit it, and soon was mistaken for a dog abuser.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_22_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_23_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (1 / 100)});
};
var $author$project$Event$Event21_30$event_1_23 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Prestige +1%']);
	var description = 'Being threatened by a lunkhead, you called your followers to frighten him immediately, people who know you become more.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_23_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_24_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 500});
};
var $author$project$Event$Event21_30$event_1_24 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth +500']);
	var description = 'You won a small prize in the lottery.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_24_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_25_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 1000});
};
var $author$project$Event$Event21_30$event_1_25 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth +1000']);
	var description = 'There have been ups and downs in the stock market recently. You bought a piece of stock and make a lucky fortune.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_25_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_26_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 1000});
};
var $author$project$Event$Event21_30$event_1_26 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth -1000']);
	var description = 'The stock market has been up and down recently. You bought a stock to play, but lost your money.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_26_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_27_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (2 / 100), wealth: player.wealth - 1000});
};
var $author$project$Event$Event21_30$event_1_27 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth -1000, Prestige +2%']);
	var description = 'You were unfortunately bitten by a dog, and through careful observation of the dog tag, you found it was a big man\'s pet, so you succeeded in bonding with him.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_27_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_28_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - (2 / 100)});
};
var $author$project$Event$Event21_30$event_1_28 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Police Attention -2%']);
	var description = 'By chance, you make a good friend who turns out to be a policeman finally, and you can avoid the spots where the police have been searching recently.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_28_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_29_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 1500});
};
var $author$project$Event$Event21_30$event_1_29 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth -1500']);
	var description = 'By chance, you make a good friend who already knows who you are, he swindled you out of a sum of money and ran away.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_29_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_3_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (2 / 100)});
};
var $author$project$Event$Event1_10$optionFunc1_3_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (5 / 100), prestige: player.prestige - (5 / 100)});
};
var $author$project$Event$Event1_10$event_1_3 = function (model) {
	var optionDescription = _List_fromArray(
		['Punish someone as a warning to others.', 'Too busy to take care of it.']);
	var hint = _List_fromArray(
		['Prestige +2%', 'Prestige -5%, Popular Will +5%']);
	var description = 'A combination of recent business failures and a failure to establish enough prestige among followers has given followers an idea to take over.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_3_1, $author$project$Event$Event1_10$optionFunc1_3_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event21_30$optionFunc1_30_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 1000});
};
var $author$project$Event$Event21_30$event_1_30 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth -1000']);
	var description = 'You got a fever. When being given an injection, the nerve in your leg was hurt. It caused a short period of numbness in your leg. So you neglected managing during this time.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event21_30$optionFunc1_30_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_31_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 3000});
};
var $author$project$Event$Event31_40$optionFunc1_31_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.15});
};
var $author$project$Event$Event31_40$event_1_31 = function (model) {
	var optionDescription = _List_fromArray(
		['Fine, and get out of my face.', 'I don\'t give a care, police is nothing.']);
	var hint = _List_fromArray(
		['Wealth -3000', 'Police attention +15%']);
	var description = 'Mr.Sheriff said: \'Welcome to my place! If you want to continue to engage in your shameful activities, pay the hush fee obediently and I\'ll let you go.\'';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_31_1, $author$project$Event$Event31_40$optionFunc1_31_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_32_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + 0.02, wealth: player.wealth - 1000});
};
var $author$project$Event$Event31_40$optionFunc1_32_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.01, prestige: player.prestige + 0.02});
};
var $author$project$Event$Event31_40$event_1_32 = function (model) {
	var optionDescription = _List_fromArray(
		['Let\'s have a tea party.', 'Hey you! Go to the shooting range and keep practicing!']);
	var hint = _List_fromArray(
		['Wealth -1000, PopularWill +2%', 'Prestige +2%, PopularWill -1%']);
	var description = 'We are extremely proud of our current prosperity. Fifty years ago, we were just inconspicuous hooligans. Let us celebrate tonight!';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_32_1, $author$project$Event$Event31_40$optionFunc1_32_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_33_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + 0.03, wealth: player.wealth - 1500});
};
var $author$project$Event$Event31_40$optionFunc1_33_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.04, prestige: player.prestige + 0.04});
};
var $author$project$Event$Event31_40$event_1_33 = function (model) {
	var optionDescription = _List_fromArray(
		['Give out booklets to regain my prestige.', 'Help those in jails to escape.']);
	var hint = _List_fromArray(
		['Wealth -1500, Prestige +3%', 'PoliceAttention +4%, prestige +4%']);
	var description = 'The influence of our family is no longer powerful. Members of our family either died in battle, or betrayed and left us. It\'s time to do something to change this situation.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_33_1, $author$project$Event$Event31_40$optionFunc1_33_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_34_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.03, wealth: player.wealth + 1500});
};
var $author$project$Event$Event31_40$optionFunc1_34_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - 0.03, wealth: player.wealth + 1500});
};
var $author$project$Event$Event31_40$event_1_34 = function (model) {
	var optionDescription = _List_fromArray(
		['Plunder from our nice people.', 'Extort my beloved family members.']);
	var hint = _List_fromArray(
		['Wealth +1500, PopularWill -3%', 'Wealth +1500, prestige -3%']);
	var description = 'Even though I am the incarnation of God in the eyes of our members, there is still no way to change the fact that I am a leader of beggar gangs.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_34_1, $author$project$Event$Event31_40$optionFunc1_34_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_35_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.03});
};
var $author$project$Event$Event31_40$event_1_35 = function (model) {
	var optionDescription = _List_fromArray(
		['Fine, I\'ve well prepared for that']);
	var hint = _List_fromArray(
		['PoliceAttention +3%']);
	var description = 'We play such a decisive role in Fortun that the police are afraid of us. But there\'s a rumor that a rigorous chief will arrive this town very soon...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_35_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_36_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + 0.02, prestige: player.prestige - 0.01});
};
var $author$project$Event$Event31_40$optionFunc1_36_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.02, prestige: player.prestige + 0.01});
};
var $author$project$Event$Event31_40$event_1_36 = function (model) {
	var optionDescription = _List_fromArray(
		['Stop! Let him pass.', 'Turn a blind eye to that.']);
	var hint = _List_fromArray(
		['PopularWill +2%, Prestige -1%', 'Prestige +1%, PopularWill -2%']);
	var description = 'In the evening, you and your most trusted subordinates were walking down the street. In the dim light, a child bumped into you accidentally. Your subordinates were going to teach this careless boy a lesson.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_36_1, $author$project$Event$Event31_40$optionFunc1_36_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_37_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.01, popularWill: player.popularWill + 0.02});
};
var $author$project$Event$Event31_40$optionFunc1_37_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.03, prestige: player.prestige + 0.01});
};
var $author$project$Event$Event31_40$event_1_37 = function (model) {
	var optionDescription = _List_fromArray(
		['It\'s my pleasure and duty to help the weak.', 'How dare you ruin my day!? My brothers are watching!']);
	var hint = _List_fromArray(
		['PopularWill +2%, policeAttention +1%', 'PopularWill -3%, prestige +1%']);
	var description = 'Your nice afternoon tea time was broken by a strange middle-aged lady. She begged you to uphold justice for her husband who had been bullied to death.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_37_1, $author$project$Event$Event31_40$optionFunc1_37_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_38_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - 0.02});
};
var $author$project$Event$Event31_40$optionFunc1_38_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.02, prestige: player.prestige + 0.01});
};
var $author$project$Event$Event31_40$event_1_38 = function (model) {
	var optionDescription = _List_fromArray(
		['Tear down these notices and slip away.', 'Swagger and pretend nothing happens.']);
	var hint = _List_fromArray(
		['PoliceAttention -2%', 'PoliceAttention +2%, Prestige +1%']);
	var description = 'The streets are full of wanted notices of four big families in Fortun. You feel so much about it.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_38_1, $author$project$Event$Event31_40$optionFunc1_38_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_39_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - 0.01});
};
var $author$project$Event$Event31_40$optionFunc1_39_2 = function (player) {
	return player;
};
var $author$project$Event$Event31_40$event_1_39 = function (model) {
	var optionDescription = _List_fromArray(
		['Tell my brothers about it.', 'Write a diary.']);
	var hint = _List_fromArray(
		['I like it.', 'I love it.']);
	var description = 'You\'re tossing and turning in bed, filled with the face of your first love 20 years ago. You decide to get out of bed and do something.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_39_1, $author$project$Event$Event31_40$optionFunc1_39_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_4_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - (20 / 100), wealth: player.wealth - 10000});
};
var $author$project$Event$Event1_10$optionFunc1_4_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - (10 / 100)});
};
var $author$project$Event$Event1_10$event_1_4 = function (model) {
	var optionDescription = _List_fromArray(
		['To get away with using money and relationships.', 'Disappear, and work behind the scenes.']);
	var hint = _List_fromArray(
		['Wealth -10000, Police Attention -20%', 'Prestige -10%']);
	var description = 'Your extravagant actions have given the police the evidence they want and you are about to be arrested.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_4_1, $author$project$Event$Event1_10$optionFunc1_4_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event31_40$optionFunc1_40_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.02, popularWill: player.popularWill - 0.01, prestige: player.prestige + 0.02});
};
var $author$project$Event$Event31_40$optionFunc1_40_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.01, popularWill: player.popularWill - 0.02});
};
var $author$project$Event$Event31_40$event_1_40 = function (model) {
	var optionDescription = _List_fromArray(
		['Take this opportunity to propagate.', 'Tell these ignorant people Fortun is totally bullshit.']);
	var hint = _List_fromArray(
		['I like it.', 'I love it.']);
	var description = 'The monthly exhibition day of the town is coming, and a large number of tourists from inland come to visit this border town.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event31_40$optionFunc1_40_1, $author$project$Event$Event31_40$optionFunc1_40_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_41_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (1 / 100), wealth: player.wealth + 1500});
};
var $author$project$Event$Event41_50$event_1_41 = function (model) {
	var optionDescription = _List_fromArray(
		['Fine.']);
	var hint = _List_fromArray(
		['Wealth +1500, Police Attention +1%']);
	var description = 'Under your wise leadership, our family is prosperous and strong!';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_41_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_42_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (3 / 100)});
};
var $author$project$Event$Event41_50$optionFunc1_42_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - (2 / 100), wealth: player.wealth + 1200});
};
var $author$project$Event$Event41_50$event_1_42 = function (model) {
	var optionDescription = _List_fromArray(
		['Welcome! My faithful friend.', 'I hate the traitor. Get rid of him!']);
	var hint = _List_fromArray(
		['Prestige +3%', 'Prestige -2%, Wealth +1200']);
	var description = 'Brian Golman was in charge of the Golman family\'s Casino in the west of the town. A few days ago, his right leg was broken by the patriarch because he was found to be corrupt. Now he has come here secretly. What should we do with him?';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_42_1, $author$project$Event$Event41_50$optionFunc1_42_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_43_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (2 / 100), wealth: player.wealth - 2000});
};
var $author$project$Event$Event41_50$optionFunc1_43_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (3 / 100)});
};
var $author$project$Event$Event41_50$event_1_43 = function (model) {
	var optionDescription = _List_fromArray(
		['Find out the matter thoroughly.', 'Pretend to promise him.']);
	var hint = _List_fromArray(
		['Wealth -2000, Popular Will +2%', 'Police Attention +3%']);
	var description = 'An old man kneels in front of you, claiming that his son was killed without cause by one of your loyal member, who immediately denied it. You look at the old man\'s poor tears and decide...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_43_1, $author$project$Event$Event41_50$optionFunc1_43_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_44_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - (5 / 100), wealth: player.wealth - 600});
};
var $author$project$Event$Event41_50$event_1_44 = function (model) {
	var optionDescription = _List_fromArray(
		['Cuatro！']);
	var hint = _List_fromArray(
		['Wealth -600, Prestige -5%']);
	var description = 'A gambling game called ‘Cuatro‘ has sprung up in the town and you are addicted to it. Your loyal family members have tried to dissuade you many times, but you have never been able to get rid of it...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_44_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_45_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (1 / 100), wealth: player.wealth - 800});
};
var $author$project$Event$Event41_50$optionFunc1_45_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 1000});
};
var $author$project$Event$Event41_50$event_1_45 = function (model) {
	var optionDescription = _List_fromArray(
		['A good horse is born for hero.', 'My uncle is right']);
	var hint = _List_fromArray(
		['Wealth -800, Prestige +1%', 'Popular Will -1%']);
	var description = 'A young horse keeper brought an excellent horse from the West. The horse was tall and strong with smooth, shiny fur.You love the horse very much, but your uncle reminds you to focus on something more important.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_45_1, $author$project$Event$Event41_50$optionFunc1_45_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_46_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (2 / 100), popularWill: player.popularWill - (2 / 100), wealth: player.wealth - 1000});
};
var $author$project$Event$Event41_50$optionFunc1_46_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (3 / 100), wealth: player.wealth - 1000});
};
var $author$project$Event$Event41_50$event_1_46 = function (model) {
	var optionDescription = _List_fromArray(
		['If this can be tolerated, what cannot?', 'Use money to break up their relationship.']);
	var hint = _List_fromArray(
		['Prestige +3%, Police Attention +2%, Popular Will -2%', 'Wealth -1000, Popular Will +3%, prestige -2%']);
	var description = 'Gorman and Blair have been working together to make trouble in our protected neighborhood. Radical family members suggest that we should fight back immediately, but is it really a good idea to fight back against both families at the same time?';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_46_1, $author$project$Event$Event41_50$optionFunc1_46_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_47_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (2 / 100), popularWill: player.popularWill - (2 / 100), wealth: player.wealth - 1000});
};
var $author$project$Event$Event41_50$optionFunc1_47_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (3 / 100), wealth: player.wealth - 1000});
};
var $author$project$Event$Event41_50$event_1_47 = function (model) {
	var optionDescription = _List_fromArray(
		['If this can be tolerated, what cannot?', 'Use money to break up their relationship.']);
	var hint = _List_fromArray(
		['Prestige +3%, Police Attention +2%, Popular Will -2%', 'Wealth -1000, Popular Will +3%, prestige -2%']);
	var description = 'Lance and Doherty have been working together to make trouble in our protected neighborhood. Radical family members suggest that we should fight back immediately, but is it really a good idea to fight back against both families at the same time?';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_47_1, $author$project$Event$Event41_50$optionFunc1_47_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_48_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - (3 / 100), wealth: player.wealth + 1000});
};
var $author$project$Event$Event41_50$optionFunc1_48_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (1 / 100), prestige: player.prestige - (2 / 100)});
};
var $author$project$Event$Event41_50$event_1_48 = function (model) {
	var optionDescription = _List_fromArray(
		['Let me figure out how much Gorman\'s going to lose!', 'They may be able to improve the relationship between the two families.']);
	var hint = _List_fromArray(
		['Prestige -3%, Wealth +1000', 'Popular +1%, Prestige -2%']);
	var description = 'Your son is in love, but unfortunately, he is in love with the eldest daughter of the Gorman family. You feel sad for the trick of fate, but on second thought, is this an opportunity?';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_48_1, $author$project$Event$Event41_50$optionFunc1_48_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_49_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - (5 / 100), prestige: player.prestige - (3 / 100)});
};
var $author$project$Event$Event41_50$optionFunc1_49_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (3 / 100)});
};
var $author$project$Event$Event41_50$event_1_49 = function (model) {
	var optionDescription = _List_fromArray(
		['I should make good use of that.', 'I can\'t betray myself.']);
	var hint = _List_fromArray(
		['Police Attention -5%, Prestige -3%', 'Prestige +3%']);
	var description = 'Twenty years ago, you saved a child from the dock in port Nuren. It has already been forgotten by you, but when your family member brought a picture of the new police chief yesterday, you feel a little familiar...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_49_1, $author$project$Event$Event41_50$optionFunc1_49_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_5_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (5 / 100), prestige: player.prestige + (5 / 100)});
};
var $author$project$Event$Event1_10$optionFunc1_5_2 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 5000});
};
var $author$project$Event$Event1_10$event_1_5 = function (model) {
	var optionDescription = _List_fromArray(
		['Select fewer but better people.', 'Charging a large fee for registered permanent residence would also reduce the number of migrants.']);
	var hint = _List_fromArray(
		['Prestige +5%, Popular Will +5%', 'Wealth +5000']);
	var description = 'The region\'s affluence draws in people but squeezes out the locals.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_5_1, $author$project$Event$Event1_10$optionFunc1_5_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event41_50$optionFunc1_50_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (2 / 100)});
};
var $author$project$Event$Event41_50$optionFunc1_50_2 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth - 1000});
};
var $author$project$Event$Event41_50$event_1_50 = function (model) {
	var optionDescription = _List_fromArray(
		['What kind of fool would believe him?', 'Come in , please!']);
	var hint = _List_fromArray(
		['He left swearing.', 'Maybe you can learn some witchcraft someday']);
	var description = 'A man in black claims to be the devil\'s servant, and he says he can give you control of some supernatural power. This power sounds tempting, but what is the price?';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event41_50$optionFunc1_50_1, $author$project$Event$Event41_50$optionFunc1_50_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_51_1 = function (player) {
	return player;
};
var $author$project$Event$Event51_60$optionFunc1_51_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + 0.04, wealth: player.wealth - 2000});
};
var $author$project$Event$Event51_60$event_1_51 = function (model) {
	var optionDescription = _List_fromArray(
		['Who\'s that guy?', 'I want to bail him out.']);
	var hint = _List_fromArray(
		['', '']);
	var description = 'You pass by the gate of the jail and catch a glimpse of the brother who once fought with you. You insist on going forward and trying to talk to the security guard.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_51_1, $author$project$Event$Event51_60$optionFunc1_51_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_52_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - 0.02, wealth: player.wealth + 500});
};
var $author$project$Event$Event51_60$optionFunc1_52_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - 0.01});
};
var $author$project$Event$Event51_60$event_1_52 = function (model) {
	var optionDescription = _List_fromArray(
		['Got it.', 'Tear if off in his face.']);
	var hint = _List_fromArray(
		['Wealth +500, PopularWill -2%', 'Prestige -1%']);
	var description = 'You come across a diary belonged to your subordinate. It records a lot of trickery.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_52_1, $author$project$Event$Event51_60$optionFunc1_52_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_53_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - 0.04, wealth: player.wealth + 2000});
};
var $author$project$Event$Event51_60$optionFunc1_53_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + 0.03, popularWill: player.popularWill - 0.01, prestige: player.prestige + 0.03});
};
var $author$project$Event$Event51_60$event_1_53 = function (model) {
	var optionDescription = _List_fromArray(
		['Steal his property.', 'Call on brothers to ruin this feast.']);
	var hint = _List_fromArray(
		['Guess what', 'Guess what']);
	var description = 'The richest man in Fortun had a grand party, but your name wasn\'t on the invitation and you felt really angry at him.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_53_1, $author$project$Event$Event51_60$optionFunc1_53_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_54_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - 0.01, popularWill: player.popularWill + 0.01});
};
var $author$project$Event$Event51_60$optionFunc1_54_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - 0.02});
};
var $author$project$Event$Event51_60$event_1_54 = function (model) {
	var optionDescription = _List_fromArray(
		['Stop and kill that murderer.', 'Pretend nothing happens.']);
	var hint = _List_fromArray(
		['Wise choice', 'Wise choice']);
	var description = 'You are in the car, on the way to your noble residence. Suddenly, in a dark corner, a robber is committing murder.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_54_1, $author$project$Event$Event51_60$optionFunc1_54_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_55_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + 0.02});
};
var $author$project$Event$Event51_60$optionFunc1_55_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - 0.02, wealth: player.wealth + 1000});
};
var $author$project$Event$Event51_60$event_1_55 = function (model) {
	var optionDescription = _List_fromArray(
		['Tell him to take care of himself and come back.', 'Push him to a negotiation that is in our favor.']);
	var hint = _List_fromArray(
		['Prestige +2%', 'Prestige -2%, Wealth +1000']);
	var description = 'The storm is coming, but your eldest son is still negotiating with the enemy.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_55_1, $author$project$Event$Event51_60$optionFunc1_55_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_56_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (3 / 100)});
};
var $author$project$Event$Event51_60$event_1_56 = function (model) {
	var optionDescription = _List_fromArray(
		['Kill the traitor!']);
	var hint = _List_fromArray(
		['Police Attention + 3%']);
	var description = 'When you are enjoying the scenery on the balcony, a family member suddenly rushes in front of you and pushes you down. Fortunately, you caught hold of the railing and didn\'t fall down.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_56_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_57_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (5 / 100), wealth: player.wealth + 2000});
};
var $author$project$Event$Event51_60$optionFunc1_57_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (1 / 100)});
};
var $author$project$Event$Event51_60$event_1_57 = function (model) {
	var optionDescription = _List_fromArray(
		['Money is power!', 'Get out of here!']);
	var hint = _List_fromArray(
		['Wealth +2000, Police Attention +5%', 'Prestige +1%']);
	var description = 'The assistant of the minister in the town comes to your home late at night, and he comes up with a large sum of money for you to help kill the minister.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_57_1, $author$project$Event$Event51_60$optionFunc1_57_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_58_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - (5 / 100), wealth: player.wealth - 1800});
};
var $author$project$Event$Event51_60$optionFunc1_58_2 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (2 / 100)});
};
var $author$project$Event$Event51_60$event_1_58 = function (model) {
	var optionDescription = _List_fromArray(
		['Send them money.', 'This is a good opportunity to expand.']);
	var hint = _List_fromArray(
		['Wealth -1800, Police Attention -5%', 'Police Attention +2%']);
	var description = 'The police station has recently been in financial crisis, which is a good opportunity to infiltrate the police station.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_58_1, $author$project$Event$Event51_60$optionFunc1_58_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_59_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (2 / 100), wealth: player.wealth - 600});
};
var $author$project$Event$Event51_60$optionFunc1_59_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (4 / 100), wealth: player.wealth - 1100});
};
var $author$project$Event$Event51_60$event_1_59 = function (model) {
	var optionDescription = _List_fromArray(
		['Write a book about financial management', 'Write a book about the history of the family!']);
	var hint = _List_fromArray(
		['Wealth -600 Prestige +2%', 'Wealth -1100 Prestige +4%']);
	var description = 'A lot of things I\'ve been through recently have inspired me to publish a book.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_59_1, $author$project$Event$Event51_60$optionFunc1_59_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_6_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige - (3 / 100)});
};
var $author$project$Event$Event1_10$optionFunc1_6_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (3 / 100), wealth: player.wealth - 3000});
};
var $author$project$Event$Event1_10$event_1_6 = function (model) {
	var optionDescription = _List_fromArray(
		['Forbear to be calm for a while, lest things should go wrong.', 'Make an agreement with some celebrities to exchange goods in order to form the alliance.']);
	var hint = _List_fromArray(
		['Prestige -3%', 'Wealth -3000, Prestige +3%']);
	var description = 'The men you once befriended no longer show you respect as they look at your waning influence, and perhaps not relentlessly beating the dogs in the water is their greatest kindness...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_6_1, $author$project$Event$Event1_10$optionFunc1_6_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event51_60$optionFunc1_60_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - (2 / 100), prestige: player.prestige + (1 / 100)});
};
var $author$project$Event$Event51_60$optionFunc1_60_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.prestige - (1 / 100)});
};
var $author$project$Event$Event51_60$event_1_60 = function (model) {
	var optionDescription = _List_fromArray(
		['Get him out of there!', 'Persuading him as a father.']);
	var hint = _List_fromArray(
		['Will he be angry?', 'Will he listen to you?']);
	var description = 'My son has recently become addicted to alchemy. He keeps himself in his backyard hut all day, claiming that he will one day make a lot of gold.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event51_60$optionFunc1_60_1, $author$project$Event$Event51_60$optionFunc1_60_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_7_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (5 / 100), wealth: player.wealth - 2500});
};
var $author$project$Event$Event1_10$optionFunc1_7_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (5 / 100), wealth: player.wealth - 2500});
};
var $author$project$Event$Event1_10$event_1_7 = function (model) {
	var optionDescription = _List_fromArray(
		['Spend the money to get along with the celebrities.', 'Spend money to build up a good reward and punishment system within the gang.']);
	var hint = _List_fromArray(
		['Wealth -2500, Popular Will +5%', 'Wealth -2500, Prestige +5%']);
	var description = 'You have a lot of money, but you don\'t have enough influence.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_7_1, $author$project$Event$Event1_10$optionFunc1_7_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_8_1 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill - (3 / 100), prestige: player.prestige - (3 / 100), wealth: player.wealth + 4000});
};
var $author$project$Event$Event1_10$optionFunc1_8_2 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 1000});
};
var $author$project$Event$Event1_10$event_1_8 = function (model) {
	var optionDescription = _List_fromArray(
		['Put in all your troops to maximize your profits.', 'Fight and retreat in search of more.']);
	var hint = _List_fromArray(
		['Wealth +4000, Popular Will -3%, Prestige -3%', 'Wealth +1000']);
	var description = 'The lack of influence brought him into conflict with the local gangs, and a battle was imminent.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_8_1, $author$project$Event$Event1_10$optionFunc1_8_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event1_10$optionFunc1_9_1 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (3 / 100)});
};
var $author$project$Event$Event1_10$optionFunc1_9_2 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (5 / 100), wealth: player.wealth - 1000});
};
var $author$project$Event$Event1_10$event_1_9 = function (model) {
	var optionDescription = _List_fromArray(
		['Admonish them.', 'Invest money to create exclusive entertainment measures for them, but only open for fixed hours.']);
	var hint = _List_fromArray(
		['Prestige +3%', 'Wealth -1000, Prestige +5%']);
	var description = 'The wealth of assets has led many in the gang to indulge in entertainment.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event1_10$optionFunc1_9_1, $author$project$Event$Event1_10$optionFunc1_9_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Definition$toIntSure = function (string) {
	var _v0 = $elm$core$String$toInt(string);
	if (_v0.$ === 'Just') {
		var current = _v0.a;
		return current;
	} else {
		return 0;
	}
};
var $author$project$Event$Event$indicatorToEvent = F2(
	function (indicator, event) {
		var indicatorList = A2($elm$core$String$split, '_', indicator);
		var part2 = $author$project$Definition$toIntSure(
			A2($author$project$Definition$get, 1, indicatorList));
		return A2($author$project$Definition$get, part2 - 1, event);
	});
var $author$project$Event$Event1_10$judgeEvent_1_1 = function (player) {
	return (_Utils_cmp(player.prestige, 20 / 100) < 0) ? _Utils_Tuple2(true, '1_1') : _Utils_Tuple2(false, '1_1');
};
var $author$project$Event$Event1_10$judgeEvent_1_10 = function (player) {
	return (player.wealth < 10000) ? _Utils_Tuple2(true, '1_10') : _Utils_Tuple2(false, '1_10');
};
var $author$project$Event$Event11_20$judgeEvent_1_11 = function (player) {
	return ((player.wealth < 10000) && (player.wealth > 5000)) ? _Utils_Tuple2(true, '1_11') : _Utils_Tuple2(false, '1_11');
};
var $author$project$Event$Event11_20$judgeEvent_1_12 = function (player) {
	return (player.popularWill < 0.2) ? _Utils_Tuple2(true, '1_12') : _Utils_Tuple2(false, '1_12');
};
var $author$project$Event$Event11_20$judgeEvent_1_13 = function (player) {
	return (player.influence > 0.3) ? _Utils_Tuple2(true, '1_13') : _Utils_Tuple2(false, '1_13');
};
var $author$project$Event$Event11_20$judgeEvent_1_14 = function (player) {
	return (player.influence > 0.4) ? _Utils_Tuple2(true, '1_14') : _Utils_Tuple2(false, '1_14');
};
var $author$project$Event$Event11_20$judgeEvent_1_15 = function (player) {
	return (player.popularWill > 0.7) ? _Utils_Tuple2(true, '1_15') : _Utils_Tuple2(false, '1_15');
};
var $author$project$Event$Event11_20$judgeEvent_1_16 = function (player) {
	return (player.wealth > 50000) ? _Utils_Tuple2(true, '1_16') : _Utils_Tuple2(false, '1_16');
};
var $author$project$Event$Event11_20$judgeEvent_1_17 = function (player) {
	return (player.policeAttention < 0.2) ? _Utils_Tuple2(true, '1_17') : _Utils_Tuple2(false, '1_17');
};
var $author$project$Event$Event11_20$judgeEvent_1_18 = function (player) {
	return ((player.wealth > 40000) && ((player.popularWill > 0.6) && (player.prestige > 0.6))) ? _Utils_Tuple2(true, '1_18') : _Utils_Tuple2(false, '1_18');
};
var $author$project$Event$Event11_20$judgeEvent_1_19 = function (player) {
	return ((player.policeAttention > 0.8) && (player.popularWill > 0.7)) ? _Utils_Tuple2(true, '1_19') : _Utils_Tuple2(false, '1_19');
};
var $author$project$Event$Event1_10$judgeEvent_1_2 = function (player) {
	return (_Utils_cmp(player.policeAttention, 30 / 100) > 0) ? _Utils_Tuple2(true, '1_2') : _Utils_Tuple2(false, '1_2');
};
var $author$project$Event$Event11_20$judgeEvent_1_20 = function (player) {
	return ((player.prestige < 0.3) && (player.wealth > 30000)) ? _Utils_Tuple2(true, '1_20') : _Utils_Tuple2(false, '1_20');
};
var $author$project$Event$Event21_30$judgeEvent_1_21 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_21') : _Utils_Tuple2(false, '1_21');
};
var $author$project$Event$Event21_30$judgeEvent_1_22 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_22') : _Utils_Tuple2(false, '1_22');
};
var $author$project$Event$Event21_30$judgeEvent_1_23 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_23') : _Utils_Tuple2(false, '1_23');
};
var $author$project$Event$Event21_30$judgeEvent_1_24 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_24') : _Utils_Tuple2(false, '1_24');
};
var $author$project$Event$Event21_30$judgeEvent_1_25 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_25') : _Utils_Tuple2(false, '1_25');
};
var $author$project$Event$Event21_30$judgeEvent_1_26 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_26') : _Utils_Tuple2(false, '1_26');
};
var $author$project$Event$Event21_30$judgeEvent_1_27 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_27') : _Utils_Tuple2(false, '1_27');
};
var $author$project$Event$Event21_30$judgeEvent_1_28 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_28') : _Utils_Tuple2(false, '1_28');
};
var $author$project$Event$Event21_30$judgeEvent_1_29 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_29') : _Utils_Tuple2(false, '1_29');
};
var $author$project$Event$Event1_10$judgeEvent_1_3 = function (player) {
	return ((player.wealth < 5000) && (_Utils_cmp(player.prestige, 20 / 100) < 0)) ? _Utils_Tuple2(true, '1_3') : _Utils_Tuple2(false, '1_3');
};
var $author$project$Event$Event21_30$judgeEvent_1_30 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_30') : _Utils_Tuple2(false, '1_30');
};
var $author$project$Event$Event31_40$judgeEvent_1_31 = function (player) {
	return (player.currentIndex === 58) ? _Utils_Tuple2(true, '1_31') : _Utils_Tuple2(false, '1_31');
};
var $author$project$Event$Event31_40$judgeEvent_1_32 = function (player) {
	return (player.family > 200) ? _Utils_Tuple2(true, '1_32') : _Utils_Tuple2(false, '1_32');
};
var $author$project$Event$Event31_40$judgeEvent_1_33 = function (player) {
	return ((player.family < 120) && (player.prestige < 0.1)) ? _Utils_Tuple2(true, '1_33') : _Utils_Tuple2(false, '1_33');
};
var $author$project$Event$Event31_40$judgeEvent_1_34 = function (player) {
	return ((player.prestige > 0.7) && (player.wealth < 10000)) ? _Utils_Tuple2(true, '1_34') : _Utils_Tuple2(false, '1_34');
};
var $author$project$Event$Event31_40$judgeEvent_1_35 = function (player) {
	return ((player.policeAttention < 0.2) && (player.prestige > 0.7)) ? _Utils_Tuple2(true, '1_35') : _Utils_Tuple2(false, '1_35');
};
var $author$project$Event$Event31_40$judgeEvent_1_36 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_36') : _Utils_Tuple2(false, '1_36');
};
var $author$project$Event$Event31_40$judgeEvent_1_37 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_37') : _Utils_Tuple2(false, '1_37');
};
var $author$project$Event$Event31_40$judgeEvent_1_38 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_38') : _Utils_Tuple2(false, '1_38');
};
var $author$project$Event$Event31_40$judgeEvent_1_39 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_39') : _Utils_Tuple2(false, '1_39');
};
var $author$project$Event$Event1_10$judgeEvent_1_4 = function (player) {
	return (_Utils_cmp(player.policeAttention, 90 / 100) > 0) ? _Utils_Tuple2(true, '1_4') : _Utils_Tuple2(false, '1_4');
};
var $author$project$Event$Event31_40$judgeEvent_1_40 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_40') : _Utils_Tuple2(false, '1_40');
};
var $author$project$Event$Event41_50$judgeEvent_1_41 = function (player) {
	return (player.dice === 6) ? _Utils_Tuple2(true, '1_41') : _Utils_Tuple2(false, '1_41');
};
var $author$project$Event$Event41_50$judgeEvent_1_42 = function (player) {
	return ((player.dice < 4) && (!_Utils_eq(player.character, $author$project$Definition$Gorman))) ? _Utils_Tuple2(true, '1_42') : _Utils_Tuple2(false, '1_42');
};
var $author$project$Event$Event41_50$judgeEvent_1_43 = function (player) {
	return (player.dice < 3) ? _Utils_Tuple2(true, '1_43') : _Utils_Tuple2(false, '1_43');
};
var $author$project$Event$Event41_50$judgeEvent_1_44 = function (player) {
	return (player.dice === 1) ? _Utils_Tuple2(true, '1_44') : _Utils_Tuple2(false, '1_44');
};
var $author$project$Event$Event41_50$judgeEvent_1_45 = function (player) {
	return (player.dice < 7) ? _Utils_Tuple2(true, '1_45') : _Utils_Tuple2(false, '1_45');
};
var $author$project$Event$Event41_50$judgeEvent_1_46 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Lance) || _Utils_eq(player.character, $author$project$Definition$Doherty)) ? _Utils_Tuple2(true, '1_46') : _Utils_Tuple2(false, '1_46');
};
var $author$project$Event$Event41_50$judgeEvent_1_47 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Gorman) || _Utils_eq(player.character, $author$project$Definition$Blair)) ? _Utils_Tuple2(true, '1_47') : _Utils_Tuple2(false, '1_47');
};
var $author$project$Event$Event41_50$judgeEvent_1_48 = function (player) {
	return ((player.dice < 4) && (!_Utils_eq(player.character, $author$project$Definition$Gorman))) ? _Utils_Tuple2(true, '1_48') : _Utils_Tuple2(false, '1_48');
};
var $author$project$Event$Event41_50$judgeEvent_1_49 = function (player) {
	return (player.dice > 4) ? _Utils_Tuple2(true, '1_49') : _Utils_Tuple2(false, '1_49');
};
var $author$project$Event$Event1_10$judgeEvent_1_5 = function (player) {
	return (player.wealth > 30000) ? _Utils_Tuple2(true, '1_5') : _Utils_Tuple2(false, '1_5');
};
var $author$project$Event$Event41_50$judgeEvent_1_50 = function (player) {
	return (player.dice < 7) ? _Utils_Tuple2(true, '1_50') : _Utils_Tuple2(false, '1_50');
};
var $author$project$Event$Event51_60$judgeEvent_1_51 = function (player) {
	return (player.currentIndex === 24) ? _Utils_Tuple2(true, '1_51') : _Utils_Tuple2(false, '1_51');
};
var $author$project$Event$Event51_60$judgeEvent_1_52 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_52') : _Utils_Tuple2(false, '1_52');
};
var $author$project$Event$Event51_60$judgeEvent_1_53 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_53') : _Utils_Tuple2(false, '1_53');
};
var $author$project$Event$Event51_60$judgeEvent_1_54 = function (player) {
	return (player.dice < 4) ? _Utils_Tuple2(true, '1_54') : _Utils_Tuple2(false, '1_54');
};
var $author$project$Event$Event51_60$judgeEvent_1_55 = function (player) {
	return (player.dice > 3) ? _Utils_Tuple2(true, '1_55') : _Utils_Tuple2(false, '1_55');
};
var $author$project$Event$Event51_60$judgeEvent_1_56 = function (player) {
	return (player.dice < 3) ? _Utils_Tuple2(true, '1_56') : _Utils_Tuple2(false, '1_56');
};
var $author$project$Event$Event51_60$judgeEvent_1_57 = function (player) {
	return (player.dice > 4) ? _Utils_Tuple2(true, '1_57') : _Utils_Tuple2(false, '1_57');
};
var $author$project$Event$Event51_60$judgeEvent_1_58 = function (player) {
	return (player.dice > 4) ? _Utils_Tuple2(true, '1_58') : _Utils_Tuple2(false, '1_58');
};
var $author$project$Event$Event51_60$judgeEvent_1_59 = function (player) {
	return (player.dice < 6) ? _Utils_Tuple2(true, '1_59') : _Utils_Tuple2(false, '1_59');
};
var $author$project$Event$Event1_10$judgeEvent_1_6 = function (player) {
	return (_Utils_cmp(player.influence, 10 / 100) < 0) ? _Utils_Tuple2(true, '1_6') : _Utils_Tuple2(false, '1_6');
};
var $author$project$Event$Event51_60$judgeEvent_1_60 = function (player) {
	return (player.dice < 5) ? _Utils_Tuple2(true, '1_60') : _Utils_Tuple2(false, '1_60');
};
var $author$project$Event$Event1_10$judgeEvent_1_7 = function (player) {
	return ((_Utils_cmp(player.influence, 20 / 100) < 0) && (player.wealth > 30000)) ? _Utils_Tuple2(true, '1_7') : _Utils_Tuple2(false, '1_7');
};
var $author$project$Event$Event1_10$judgeEvent_1_8 = function (player) {
	return (_Utils_cmp(player.influence, 20 / 100) < 0) ? _Utils_Tuple2(true, '1_8') : _Utils_Tuple2(false, '1_8');
};
var $author$project$Event$Event1_10$judgeEvent_1_9 = function (player) {
	return (player.wealth > 40000) ? _Utils_Tuple2(true, '1_9') : _Utils_Tuple2(false, '1_9');
};
var $author$project$Event$Event$optionFuncNo = function (player) {
	return player;
};
var $author$project$Event$Event$noEvent = function (model) {
	var optionDescription = _List_fromArray(
		['Cheers!']);
	var hint = _List_fromArray(
		['No special effect.']);
	var description = 'Nothing happened in this round. Please cherish the rare peaceful days...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$Event$optionFuncNo]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$Event$chooseRandomEvent = F2(
	function (player, model) {
		var judgeEventList = _List_fromArray(
			[$author$project$Event$Event1_10$judgeEvent_1_1, $author$project$Event$Event1_10$judgeEvent_1_2, $author$project$Event$Event1_10$judgeEvent_1_3, $author$project$Event$Event1_10$judgeEvent_1_4, $author$project$Event$Event1_10$judgeEvent_1_5, $author$project$Event$Event1_10$judgeEvent_1_6, $author$project$Event$Event1_10$judgeEvent_1_7, $author$project$Event$Event1_10$judgeEvent_1_8, $author$project$Event$Event1_10$judgeEvent_1_9, $author$project$Event$Event1_10$judgeEvent_1_10, $author$project$Event$Event11_20$judgeEvent_1_11, $author$project$Event$Event11_20$judgeEvent_1_12, $author$project$Event$Event11_20$judgeEvent_1_13, $author$project$Event$Event11_20$judgeEvent_1_14, $author$project$Event$Event11_20$judgeEvent_1_15, $author$project$Event$Event11_20$judgeEvent_1_16, $author$project$Event$Event11_20$judgeEvent_1_17, $author$project$Event$Event11_20$judgeEvent_1_18, $author$project$Event$Event11_20$judgeEvent_1_19, $author$project$Event$Event11_20$judgeEvent_1_20, $author$project$Event$Event21_30$judgeEvent_1_21, $author$project$Event$Event21_30$judgeEvent_1_22, $author$project$Event$Event21_30$judgeEvent_1_23, $author$project$Event$Event21_30$judgeEvent_1_24, $author$project$Event$Event21_30$judgeEvent_1_25, $author$project$Event$Event21_30$judgeEvent_1_26, $author$project$Event$Event21_30$judgeEvent_1_27, $author$project$Event$Event21_30$judgeEvent_1_28, $author$project$Event$Event21_30$judgeEvent_1_29, $author$project$Event$Event21_30$judgeEvent_1_30, $author$project$Event$Event31_40$judgeEvent_1_31, $author$project$Event$Event31_40$judgeEvent_1_32, $author$project$Event$Event31_40$judgeEvent_1_33, $author$project$Event$Event31_40$judgeEvent_1_34, $author$project$Event$Event31_40$judgeEvent_1_35, $author$project$Event$Event31_40$judgeEvent_1_36, $author$project$Event$Event31_40$judgeEvent_1_37, $author$project$Event$Event31_40$judgeEvent_1_38, $author$project$Event$Event31_40$judgeEvent_1_39, $author$project$Event$Event31_40$judgeEvent_1_40, $author$project$Event$Event41_50$judgeEvent_1_41, $author$project$Event$Event41_50$judgeEvent_1_42, $author$project$Event$Event41_50$judgeEvent_1_43, $author$project$Event$Event41_50$judgeEvent_1_44, $author$project$Event$Event41_50$judgeEvent_1_45, $author$project$Event$Event41_50$judgeEvent_1_46, $author$project$Event$Event41_50$judgeEvent_1_47, $author$project$Event$Event41_50$judgeEvent_1_48, $author$project$Event$Event41_50$judgeEvent_1_49, $author$project$Event$Event41_50$judgeEvent_1_50, $author$project$Event$Event51_60$judgeEvent_1_51, $author$project$Event$Event51_60$judgeEvent_1_52, $author$project$Event$Event51_60$judgeEvent_1_53, $author$project$Event$Event51_60$judgeEvent_1_54, $author$project$Event$Event51_60$judgeEvent_1_55, $author$project$Event$Event51_60$judgeEvent_1_56, $author$project$Event$Event51_60$judgeEvent_1_57, $author$project$Event$Event51_60$judgeEvent_1_58, $author$project$Event$Event51_60$judgeEvent_1_59, $author$project$Event$Event51_60$judgeEvent_1_60]);
		var filteredList = A2(
			$elm$core$List$filter,
			function (func) {
				return func(player).a;
			},
			judgeEventList);
		var eventList = _List_fromArray(
			[$author$project$Event$Event1_10$event_1_1, $author$project$Event$Event1_10$event_1_2, $author$project$Event$Event1_10$event_1_3, $author$project$Event$Event1_10$event_1_4, $author$project$Event$Event1_10$event_1_5, $author$project$Event$Event1_10$event_1_6, $author$project$Event$Event1_10$event_1_7, $author$project$Event$Event1_10$event_1_8, $author$project$Event$Event1_10$event_1_9, $author$project$Event$Event1_10$event_1_10, $author$project$Event$Event11_20$event_1_11, $author$project$Event$Event11_20$event_1_12, $author$project$Event$Event11_20$event_1_13, $author$project$Event$Event11_20$event_1_14, $author$project$Event$Event11_20$event_1_15, $author$project$Event$Event11_20$event_1_16, $author$project$Event$Event11_20$event_1_17, $author$project$Event$Event11_20$event_1_18, $author$project$Event$Event11_20$event_1_19, $author$project$Event$Event11_20$event_1_20, $author$project$Event$Event21_30$event_1_21, $author$project$Event$Event21_30$event_1_22, $author$project$Event$Event21_30$event_1_23, $author$project$Event$Event21_30$event_1_24, $author$project$Event$Event21_30$event_1_25, $author$project$Event$Event21_30$event_1_26, $author$project$Event$Event21_30$event_1_27, $author$project$Event$Event21_30$event_1_28, $author$project$Event$Event21_30$event_1_29, $author$project$Event$Event21_30$event_1_30, $author$project$Event$Event31_40$event_1_31, $author$project$Event$Event31_40$event_1_32, $author$project$Event$Event31_40$event_1_33, $author$project$Event$Event31_40$event_1_34, $author$project$Event$Event31_40$event_1_35, $author$project$Event$Event31_40$event_1_36, $author$project$Event$Event31_40$event_1_37, $author$project$Event$Event31_40$event_1_38, $author$project$Event$Event31_40$event_1_39, $author$project$Event$Event31_40$event_1_40, $author$project$Event$Event41_50$event_1_41, $author$project$Event$Event41_50$event_1_42, $author$project$Event$Event41_50$event_1_43, $author$project$Event$Event41_50$event_1_44, $author$project$Event$Event41_50$event_1_45, $author$project$Event$Event41_50$event_1_46, $author$project$Event$Event41_50$event_1_47, $author$project$Event$Event41_50$event_1_48, $author$project$Event$Event41_50$event_1_49, $author$project$Event$Event41_50$event_1_50, $author$project$Event$Event51_60$event_1_51, $author$project$Event$Event51_60$event_1_52, $author$project$Event$Event51_60$event_1_53, $author$project$Event$Event51_60$event_1_54, $author$project$Event$Event51_60$event_1_55, $author$project$Event$Event51_60$event_1_56, $author$project$Event$Event51_60$event_1_57, $author$project$Event$Event51_60$event_1_58, $author$project$Event$Event51_60$event_1_59, $author$project$Event$Event51_60$event_1_60]);
		var _v0 = $elm$core$List$length(filteredList);
		if (!_v0) {
			return $author$project$Event$Event$noEvent(model);
		} else {
			var randomIndex = A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(filteredList),
				model.randomNumber);
			var randomEventJudge = A2($author$project$Definition$get, randomIndex, filteredList);
			var indicator = randomEventJudge(player).b;
			var event = A2($author$project$Event$Event$indicatorToEvent, indicator, eventList);
			return event(model);
		}
	});
var $author$project$Event$Event$aiChooseEvent = F2(
	function (player, model) {
		return A2($author$project$Event$Event$chooseRandomEvent, player, model);
	});
var $author$project$Map$assetBasicIncome = function (building) {
	switch (building.$) {
		case 'Casino':
			var level = building.a;
			switch (level) {
				case 1:
					return 50;
				case 2:
					return 100;
				case 3:
					return 150;
				default:
					return 150;
			}
		case 'Disco':
			var level = building.a;
			switch (level) {
				case 1:
					return 40;
				case 2:
					return 80;
				case 3:
					return 120;
				default:
					return 120;
			}
		case 'NightMarket':
			var level = building.a;
			switch (level) {
				case 1:
					return 30;
				case 2:
					return 60;
				case 3:
					return 100;
				default:
					return 100;
			}
		case 'BoxingGym':
			var level = building.a;
			switch (level) {
				case 1:
					return 30;
				case 2:
					return 60;
				case 3:
					return 100;
				default:
					return 100;
			}
		case 'Block':
			return 20;
		default:
			return 0;
	}
};
var $elm$core$Basics$sqrt = _Basics_sqrt;
var $elm$core$List$sum = function (numbers) {
	return A3($elm$core$List$foldl, $elm$core$Basics$add, 0, numbers);
};
var $author$project$Phase$Implementation$calculatePF = function (model) {
	var prestige = A2($author$project$Definition$get, model.currentPlayer, model.players).prestige;
	var prestigeAssetFactor = 0.5 + $elm$core$Basics$sqrt(prestige);
	var prestigeBlockFactor = (0.4 * prestige) + 0.8;
	var popular = A2($author$project$Definition$get, model.currentPlayer, model.players).popularWill;
	var popularFactor = 0.6 + $elm$core$Basics$sqrt(popular);
	var police = A2($author$project$Definition$get, model.currentPlayer, model.players).policeAttention;
	var judgeOwner = function (tile) {
		var _v1 = tile.owner;
		if (_v1.$ === 'Just') {
			var current = _v1.a;
			return _Utils_eq(
				current.character,
				A2($author$project$Definition$get, model.currentPlayer, model.players).character) ? true : false;
		} else {
			return false;
		}
	};
	var controlTile = A2($elm$core$List$filter, judgeOwner, model.map);
	var calculateBuildingPF = function (tile) {
		var _v0 = tile.building;
		if (_v0.$ === 'Block') {
			return ((popularFactor * prestigeBlockFactor) * $author$project$Map$assetBasicIncome(tile.building)) / (police + 1);
		} else {
			return (prestigeAssetFactor * $author$project$Map$assetBasicIncome(tile.building)) / (police + 1);
		}
	};
	return $elm$core$List$sum(
		A2($elm$core$List$map, calculateBuildingPF, controlTile));
};
var $author$project$Map$familyCost = function (player) {
	var costBonus = function () {
		var _v1 = player.character;
		if (_v1.$ === 'Blair') {
			return 1.3;
		} else {
			return 1;
		}
	}();
	var basic = (1.2 * player.family) / costBonus;
	var _v0 = player.familyLevel;
	switch (_v0.$) {
		case 'Low':
			return basic / 2;
		case 'Medium':
			return basic;
		default:
			return basic * 1.5;
	}
};
var $elm$core$Basics$pow = _Basics_pow;
var $elm$core$String$toFloat = _String_toFloat;
var $myrho$elm_round$Round$funNum = F3(
	function (fun, s, fl) {
		return A2(
			$elm$core$Maybe$withDefault,
			0 / 0,
			$elm$core$String$toFloat(
				A2(fun, s, fl)));
	});
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$foldr = _String_foldr;
var $elm$core$String$toList = function (string) {
	return A3($elm$core$String$foldr, $elm$core$List$cons, _List_Nil, string);
};
var $myrho$elm_round$Round$addSign = F2(
	function (signed, str) {
		var isNotZero = A2(
			$elm$core$List$any,
			function (c) {
				return (!_Utils_eq(
					c,
					_Utils_chr('0'))) && (!_Utils_eq(
					c,
					_Utils_chr('.')));
			},
			$elm$core$String$toList(str));
		return _Utils_ap(
			(signed && isNotZero) ? '-' : '',
			str);
	});
var $elm$core$Char$fromCode = _Char_fromCode;
var $myrho$elm_round$Round$increaseNum = function (_v0) {
	var head = _v0.a;
	var tail = _v0.b;
	if (_Utils_eq(
		head,
		_Utils_chr('9'))) {
		var _v1 = $elm$core$String$uncons(tail);
		if (_v1.$ === 'Nothing') {
			return '01';
		} else {
			var headtail = _v1.a;
			return A2(
				$elm$core$String$cons,
				_Utils_chr('0'),
				$myrho$elm_round$Round$increaseNum(headtail));
		}
	} else {
		var c = $elm$core$Char$toCode(head);
		return ((c >= 48) && (c < 57)) ? A2(
			$elm$core$String$cons,
			$elm$core$Char$fromCode(c + 1),
			tail) : '0';
	}
};
var $elm$core$Basics$isInfinite = _Basics_isInfinite;
var $elm$core$Basics$isNaN = _Basics_isNaN;
var $elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var $elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			$elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var $elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3($elm$core$String$repeatHelp, n, chunk, '');
	});
var $elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				$elm$core$String$repeat,
				n - $elm$core$String$length(string),
				$elm$core$String$fromChar(_char)));
	});
var $elm$core$String$reverse = _String_reverse;
var $myrho$elm_round$Round$splitComma = function (str) {
	var _v0 = A2($elm$core$String$split, '.', str);
	if (_v0.b) {
		if (_v0.b.b) {
			var before = _v0.a;
			var _v1 = _v0.b;
			var after = _v1.a;
			return _Utils_Tuple2(before, after);
		} else {
			var before = _v0.a;
			return _Utils_Tuple2(before, '0');
		}
	} else {
		return _Utils_Tuple2('0', '0');
	}
};
var $myrho$elm_round$Round$toDecimal = function (fl) {
	var _v0 = A2(
		$elm$core$String$split,
		'e',
		$elm$core$String$fromFloat(
			$elm$core$Basics$abs(fl)));
	if (_v0.b) {
		if (_v0.b.b) {
			var num = _v0.a;
			var _v1 = _v0.b;
			var exp = _v1.a;
			var e = A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(
					A2($elm$core$String$startsWith, '+', exp) ? A2($elm$core$String$dropLeft, 1, exp) : exp));
			var _v2 = $myrho$elm_round$Round$splitComma(num);
			var before = _v2.a;
			var after = _v2.b;
			var total = _Utils_ap(before, after);
			var zeroed = (e < 0) ? A2(
				$elm$core$Maybe$withDefault,
				'0',
				A2(
					$elm$core$Maybe$map,
					function (_v3) {
						var a = _v3.a;
						var b = _v3.b;
						return a + ('.' + b);
					},
					A2(
						$elm$core$Maybe$map,
						$elm$core$Tuple$mapFirst($elm$core$String$fromChar),
						$elm$core$String$uncons(
							_Utils_ap(
								A2(
									$elm$core$String$repeat,
									$elm$core$Basics$abs(e),
									'0'),
								total))))) : A3(
				$elm$core$String$padRight,
				e + 1,
				_Utils_chr('0'),
				total);
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				zeroed);
		} else {
			var num = _v0.a;
			return _Utils_ap(
				(fl < 0) ? '-' : '',
				num);
		}
	} else {
		return '';
	}
};
var $myrho$elm_round$Round$roundFun = F3(
	function (functor, s, fl) {
		if ($elm$core$Basics$isInfinite(fl) || $elm$core$Basics$isNaN(fl)) {
			return $elm$core$String$fromFloat(fl);
		} else {
			var signed = fl < 0;
			var _v0 = $myrho$elm_round$Round$splitComma(
				$myrho$elm_round$Round$toDecimal(
					$elm$core$Basics$abs(fl)));
			var before = _v0.a;
			var after = _v0.b;
			var r = $elm$core$String$length(before) + s;
			var normalized = _Utils_ap(
				A2($elm$core$String$repeat, (-r) + 1, '0'),
				A3(
					$elm$core$String$padRight,
					r,
					_Utils_chr('0'),
					_Utils_ap(before, after)));
			var totalLen = $elm$core$String$length(normalized);
			var roundDigitIndex = A2($elm$core$Basics$max, 1, r);
			var increase = A2(
				functor,
				signed,
				A3($elm$core$String$slice, roundDigitIndex, totalLen, normalized));
			var remains = A3($elm$core$String$slice, 0, roundDigitIndex, normalized);
			var num = increase ? $elm$core$String$reverse(
				A2(
					$elm$core$Maybe$withDefault,
					'1',
					A2(
						$elm$core$Maybe$map,
						$myrho$elm_round$Round$increaseNum,
						$elm$core$String$uncons(
							$elm$core$String$reverse(remains))))) : remains;
			var numLen = $elm$core$String$length(num);
			var numZeroed = (num === '0') ? num : ((s <= 0) ? _Utils_ap(
				num,
				A2(
					$elm$core$String$repeat,
					$elm$core$Basics$abs(s),
					'0')) : ((_Utils_cmp(
				s,
				$elm$core$String$length(after)) < 0) ? (A3($elm$core$String$slice, 0, numLen - s, num) + ('.' + A3($elm$core$String$slice, numLen - s, numLen, num))) : _Utils_ap(
				before + '.',
				A3(
					$elm$core$String$padRight,
					s,
					_Utils_chr('0'),
					after))));
			return A2($myrho$elm_round$Round$addSign, signed, numZeroed);
		}
	});
var $myrho$elm_round$Round$round = $myrho$elm_round$Round$roundFun(
	F2(
		function (signed, str) {
			var _v0 = $elm$core$String$uncons(str);
			if (_v0.$ === 'Nothing') {
				return false;
			} else {
				if ('5' === _v0.a.a.valueOf()) {
					if (_v0.a.b === '') {
						var _v1 = _v0.a;
						return !signed;
					} else {
						var _v2 = _v0.a;
						return true;
					}
				} else {
					var _v3 = _v0.a;
					var _int = _v3.a;
					return function (i) {
						return ((i > 53) && signed) || ((i >= 53) && (!signed));
					}(
						$elm$core$Char$toCode(_int));
				}
			}
		}));
var $myrho$elm_round$Round$roundNum = $myrho$elm_round$Round$funNum($myrho$elm_round$Round$round);
var $author$project$Map$policeReduceCost = function (player) {
	var bribeReduce = function () {
		var _v1 = player.character;
		if (_v1.$ === 'Doherty') {
			return 1.3;
		} else {
			return 1;
		}
	}();
	var basic = ((A2($elm$core$Basics$pow, 2, player.policeAttention) - 1) * 600) / bribeReduce;
	var _v0 = player.policeReduceLevel;
	switch (_v0.$) {
		case 'Low':
			return A2($myrho$elm_round$Round$roundNum, 0, basic / 2);
		case 'Medium':
			return A2($myrho$elm_round$Round$roundNum, 0, basic);
		default:
			return A2($myrho$elm_round$Round$roundNum, 0, basic * 1.5);
	}
};
var $author$project$Definition$refreshPlayer = function (player) {
	var pw = player.popularWill;
	var pwFresh = function (player0) {
		return (pw > 1) ? _Utils_update(
			player0,
			{prestige: 1}) : ((pw < 0) ? _Utils_update(
			player0,
			{prestige: 0}) : player0);
	};
	var pr = player.prestige;
	var prFresh = function (player0) {
		return (pr > 1) ? _Utils_update(
			player0,
			{popularWill: 1}) : ((pr < 0) ? _Utils_update(
			player0,
			{popularWill: 0}) : player0);
	};
	var pa = player.policeAttention;
	var paFresh = function (player0) {
		return (pa > 1) ? _Utils_update(
			player0,
			{policeAttention: 1}) : ((pa < 0) ? _Utils_update(
			player0,
			{policeAttention: 0}) : player0);
	};
	return paFresh(
		pwFresh(
			prFresh(player)));
};
var $elm_community$list_extra$List$Extra$updateAt = F3(
	function (index, fn, list) {
		if (index < 0) {
			return list;
		} else {
			var tail = A2($elm$core$List$drop, index, list);
			var head = A2($elm$core$List$take, index, list);
			if (tail.b) {
				var x = tail.a;
				var xs = tail.b;
				return _Utils_ap(
					head,
					A2(
						$elm$core$List$cons,
						fn(x),
						xs));
			} else {
				return list;
			}
		}
	});
var $elm_community$list_extra$List$Extra$setAt = F2(
	function (index, value) {
		return A2(
			$elm_community$list_extra$List$Extra$updateAt,
			index,
			$elm$core$Basics$always(value));
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Ai$convertToFrame0 = F2(
	function (indexList, map) {
		var length = $elm$core$List$length(indexList);
		var timeGap = $elm$core$Basics$round(100 / length);
		var getTuple = F2(
			function (percent, index) {
				var y = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						index,
						A2(
							$elm$core$List$map,
							function (_this) {
								return _this.position;
							},
							map))).b;
				var x = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						index,
						A2(
							$elm$core$List$map,
							function (_this) {
								return _this.position;
							},
							map))).a;
				return _Utils_Tuple2(
					percent,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Css$Animations$custom,
							'left',
							$elm$core$String$fromInt(x) + '%'),
							A2(
							$rtfeldman$elm_css$Css$Animations$custom,
							'top',
							$elm$core$String$fromInt(y) + '%')
						]));
			});
		var fullTimeList = A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(timeGap),
				A2($elm$core$List$range, 0, length - 2)),
			_List_fromArray(
				[100]));
		return A3($elm$core$List$map2, getTuple, fullTimeList, indexList);
	});
var $author$project$Definition$Dummy = {$: 'Dummy'};
var $author$project$Definition$dummyPlayer = {
	character: $author$project$Definition$Dummy,
	currentIndex: 0,
	currentPos: _Utils_Tuple2(0, 0),
	dice: 3,
	exist: false,
	family: 0,
	familyLevel: $author$project$Definition$Medium,
	frameList: _List_fromArray(
		[
			_Utils_Tuple2(
			0,
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '0%'),
					A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '0%')
				])),
			_Utils_Tuple2(
			100,
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$Animations$custom, 'left', '0%'),
					A2($rtfeldman$elm_css$Css$Animations$custom, 'top', '0%')
				]))
		]),
	influence: 0,
	isHuman: false,
	jailRound: -1,
	order: -1,
	policeAttention: 0,
	policeReduceLevel: $author$project$Definition$Medium,
	popularWill: 0,
	prestige: 0,
	storyRound: 0,
	wealth: 0
};
var $author$project$Ai$getCurrentPlayer0 = function (model) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Definition$dummyPlayer,
		A2($elm_community$list_extra$List$Extra$getAt, model.currentPlayer, model.players));
};
var $author$project$Ai$updatePlayerJail = function (model) {
	var currentPlayer = $author$project$Ai$getCurrentPlayer0(model);
	var modList = function () {
		var fun = function (num) {
			return A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				num);
		};
		return A2(
			$elm$core$List$map,
			fun,
			A2($elm$core$List$range, currentPlayer.currentIndex, currentPlayer.currentIndex));
	}();
	var frameList = A2($author$project$Ai$convertToFrame0, modList, model.map);
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(model.map),
		currentPlayer.currentIndex);
	var newPos = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(0, 0),
		A2(
			$elm_community$list_extra$List$Extra$getAt,
			newIndex,
			A2(
				$elm$core$List$map,
				function (_this) {
					return _this.position;
				},
				model.map)));
	var updated = _Utils_update(
		currentPlayer,
		{currentIndex: newIndex, currentPos: newPos, frameList: frameList});
	return _Utils_ap(
		A2($elm$core$List$take, model.currentPlayer, model.players),
		_Utils_ap(
			_List_fromArray(
				[updated]),
			A2($elm$core$List$drop, model.currentPlayer + 1, model.players)));
};
var $author$project$Ai$aiEnd = function (model) {
	var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
	var newPlayer = _Utils_update(
		player,
		{
			jailRound: player.jailRound - 1,
			wealth: ((player.wealth + $author$project$Phase$Implementation$calculatePF(model)) - ($author$project$Map$familyCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players)) / 3)) - $author$project$Map$policeReduceCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players))
		});
	var newModel = _Utils_update(
		model,
		{
			players: A3(
				$elm_community$list_extra$List$Extra$setAt,
				model.currentPlayer,
				$author$project$Definition$refreshPlayer(newPlayer),
				model.players)
		});
	var jailPlayer = _Utils_update(
		player,
		{
			currentIndex: 24,
			currentPos: _Utils_Tuple2(90, 40),
			jailRound: 2,
			policeAttention: 0.25,
			wealth: ((player.wealth + $author$project$Phase$Implementation$calculatePF(model)) - ($author$project$Map$familyCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players)) / 3)) - $author$project$Map$policeReduceCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players))
		});
	var jailModel = _Utils_update(
		model,
		{
			players: A3(
				$elm_community$list_extra$List$Extra$setAt,
				model.currentPlayer,
				$author$project$Definition$refreshPlayer(jailPlayer),
				model.players)
		});
	var finalPlayers = $author$project$Ai$updatePlayerJail(jailModel);
	return (player.policeAttention > 0.99) ? _Utils_update(
		jailModel,
		{players: finalPlayers}) : newModel;
};
var $author$project$Definition$AddDice = {$: 'AddDice'};
var $author$project$Definition$FightDice = {$: 'FightDice'};
var $author$project$Definition$Reform = {$: 'Reform'};
var $author$project$Ai$aiActionCount = F3(
	function (model, playerIndex, count) {
		var human = A2(
			$author$project$Definition$get,
			0,
			A2(
				$elm$core$List$filter,
				function (x) {
					return x.isHuman;
				},
				model.players));
		var humanIndex = human.order;
		var aiAction2 = A2($author$project$Definition$get, playerIndex, model.aiAction);
		var newAA2 = _Utils_update(
			aiAction2,
			{count: count});
		var aiAction1 = A2($author$project$Definition$get, playerIndex - 1, model.aiAction);
		var newAA1 = _Utils_update(
			aiAction1,
			{count: count});
		return (_Utils_cmp(playerIndex, humanIndex) > 0) ? _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex - 1, newAA1, model.aiAction)
			}) : _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex, newAA2, model.aiAction)
			});
	});
var $author$project$Ai$generateActionDice = function (list) {
	var judgeKind = function (_int) {
		switch (_int) {
			case 1:
				return $author$project$Definition$AddDice;
			case 2:
				return $author$project$Definition$FightDice;
			case 3:
				return $author$project$Definition$Reform;
			case 4:
				return $author$project$Definition$AddDice;
			case 5:
				return $author$project$Definition$FightDice;
			case 6:
				return $author$project$Definition$AddDice;
			default:
				return $author$project$Definition$AddDice;
		}
	};
	return A2($elm$core$List$map, judgeKind, list);
};
var $author$project$Ai$aiActionFight = F4(
	function (model, playerIndex, times, fight) {
		var human = A2(
			$author$project$Definition$get,
			0,
			A2(
				$elm$core$List$filter,
				function (x) {
					return x.isHuman;
				},
				model.players));
		var humanIndex = human.order;
		var aiAction2 = A2($author$project$Definition$get, playerIndex, model.aiAction);
		var newAA2 = _Utils_update(
			aiAction2,
			{
				fight: A3($elm_community$list_extra$List$Extra$setAt, times, fight, aiAction2.fight)
			});
		var aiAction1 = A2($author$project$Definition$get, playerIndex - 1, model.aiAction);
		var newAA1 = _Utils_update(
			aiAction1,
			{
				fight: A3($elm_community$list_extra$List$Extra$setAt, times, fight, aiAction1.fight)
			});
		return (_Utils_cmp(playerIndex, humanIndex) > 0) ? _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex - 1, newAA1, model.aiAction)
			}) : _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex, newAA2, model.aiAction)
			});
	});
var $elm_community$list_extra$List$Extra$findIndexHelp = F3(
	function (index, predicate, list) {
		findIndexHelp:
		while (true) {
			if (!list.b) {
				return $elm$core$Maybe$Nothing;
			} else {
				var x = list.a;
				var xs = list.b;
				if (predicate(x)) {
					return $elm$core$Maybe$Just(index);
				} else {
					var $temp$index = index + 1,
						$temp$predicate = predicate,
						$temp$list = xs;
					index = $temp$index;
					predicate = $temp$predicate;
					list = $temp$list;
					continue findIndexHelp;
				}
			}
		}
	});
var $elm_community$list_extra$List$Extra$findIndex = $elm_community$list_extra$List$Extra$findIndexHelp(0);
var $elm_community$list_extra$List$Extra$elemIndex = function (x) {
	return $elm_community$list_extra$List$Extra$findIndex(
		$elm$core$Basics$eq(x));
};
var $author$project$Definition$elemIndexSure = F2(
	function (a, listA) {
		var _v0 = A2($elm_community$list_extra$List$Extra$elemIndex, a, listA);
		if (_v0.$ === 'Just') {
			var current = _v0.a;
			return current;
		} else {
			return -100;
		}
	});
var $author$project$Ai$aiGenerateRandomNumber = function (model) {
	var usefulNumber = A2(
		$elm$core$List$filter,
		function (number) {
			return (_Utils_cmp(
				A2($author$project$Definition$elemIndexSure, number, model.aiRandomNumber),
				model.aiRandomNumberIndex) > -1) && (_Utils_cmp(
				A2($author$project$Definition$elemIndexSure, number, model.aiRandomNumber),
				model.aiRandomNumberIndex + 15) < 1);
		},
		model.aiRandomNumber);
	return $elm$core$List$sum(usefulNumber);
};
var $author$project$Phase$Implementation$calculateActionAttackResult = F5(
	function (model, enemyIndex, aiDice, tile0, buttonNumber) {
		var selectedTile = _Utils_eq(aiDice, -1) ? A2($author$project$Definition$get, model.selectedTileIndex, model.map) : tile0;
		var prestigeBonus = function (thisPlayer) {
			var _v6 = thisPlayer.character;
			if (_v6.$ === 'Gorman') {
				return 1.5;
			} else {
				return 1;
			}
		};
		var popularPoliceFactor = function (popular) {
			return (popular <= 0.3) ? ((((-10.0) / 3.0) * popular) + 2.0) : ((((-5.0) / 7.0) * popular) + (17.0 / 14.0));
		};
		var policeBonus = function (thisPlayer) {
			var _v5 = thisPlayer.character;
			if (_v5.$ === 'Doherty') {
				return 1.5;
			} else {
				return 1;
			}
		};
		var judgeOwner = F2(
			function (thisPlayer, thisTile) {
				var _v4 = thisTile.owner;
				if (_v4.$ === 'Just') {
					var aPlayer = _v4.a;
					return _Utils_eq(thisPlayer.character, aPlayer.character) ? true : false;
				} else {
					return false;
				}
			});
		var findRandom1 = function (num) {
			return _Utils_eq(num, -1) ? A2($elm$core$Basics$modBy, 10, model.randomNumber) : num;
		};
		var random1 = findRandom1(aiDice);
		var findRandom2 = function (num) {
			return _Utils_eq(num, -1) ? ((_Utils_eq(
				selectedTile.building,
				$author$project$Definition$BoxingGym(1)) || _Utils_eq(
				selectedTile.building,
				$author$project$Definition$BoxingGym(2))) ? ((((model.randomNumber - random1) / 10) | 0) + 1) : (_Utils_eq(
				selectedTile.building,
				$author$project$Definition$BoxingGym(3)) ? ((((model.randomNumber - random1) / 10) | 0) + 2) : (((model.randomNumber - random1) / 10) | 0))) : num;
		};
		var random2 = findRandom2(aiDice);
		var familyLevelFactor = function (level) {
			switch (level.$) {
				case 'Low':
					return 0.9;
				case 'Medium':
					return 1;
				default:
					return 1.1;
			}
		};
		var family2 = A2($author$project$Definition$get, enemyIndex, selectedTile.familyMember);
		var factorFromDice = function (diceNumber) {
			if (!diceNumber) {
				return 0.8;
			} else {
				return (0.05 * diceNumber) + 0.95;
			}
		};
		var factorFromAdjacentTiles = function (num) {
			switch (num) {
				case 1:
					return 1.1;
				case 2:
					return 1.3;
				default:
					return 1;
			}
		};
		var enemy = A2($author$project$Definition$get, enemyIndex, model.players);
		var familyBonus2 = familyLevelFactor(enemy.familyLevel);
		var police2 = enemy.policeAttention;
		var popular2 = enemy.popularWill;
		var policeDelta2 = (enemy.jailRound < 0) ? ((popularPoliceFactor(popular2) * 0.02) / policeBonus(enemy)) : 0;
		var prestige2 = enemy.prestige;
		var tilesOwned2 = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				judgeOwner(enemy),
				model.map));
		var currentPlayerIndex = model.currentPlayer;
		var family1 = A2($author$project$Definition$get, currentPlayerIndex, selectedTile.familyMember);
		var totalLoss = $elm$core$Basics$round(
			$elm$core$Basics$sqrt(family1 + family2));
		var currentPlayer = A2($author$project$Definition$get, currentPlayerIndex, model.players);
		var familyBonus1 = familyLevelFactor(currentPlayer.familyLevel);
		var police1 = currentPlayer.policeAttention;
		var popular1 = currentPlayer.popularWill;
		var prestige1 = currentPlayer.prestige;
		var tilesOwned1 = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				judgeOwner(currentPlayer),
				model.map));
		var countAdjacentTiles = function (player) {
			var judge = function (thisTile) {
				var _v0 = thisTile.owner;
				if (_v0.$ === 'Just') {
					var thisPlayer = _v0.a;
					return _Utils_eq(thisPlayer.character, player.character) ? 1 : 0;
				} else {
					return 0;
				}
			};
			var index = player.currentIndex;
			var adjacentIndex = _List_fromArray(
				[
					A2(
					$elm$core$Basics$modBy,
					$elm$core$List$length(model.map),
					index - 1),
					A2(
					$elm$core$Basics$modBy,
					$elm$core$List$length(model.map),
					index + 1)
				]);
			var adjacentTiles = A2(
				$elm$core$List$map,
				function (x) {
					return A2($author$project$Definition$get, x, model.map);
				},
				adjacentIndex);
			return $elm$core$List$sum(
				A2($elm$core$List$map, judge, adjacentTiles));
		};
		var point = F3(
			function (thisPlayer, thisTile, diceNumber) {
				var thisOrder = thisPlayer.order;
				var thisFamily = A2($author$project$Definition$get, thisOrder, thisTile.familyMember);
				return ((thisFamily * $elm$core$Basics$sqrt(thisPlayer.prestige)) * factorFromAdjacentTiles(
					countAdjacentTiles(thisPlayer))) * factorFromDice(diceNumber);
			});
		var point1 = A3(point, currentPlayer, selectedTile, random1);
		var point2 = A3(point, enemy, selectedTile, random2);
		var win = (_Utils_cmp(point1, point2) > 0) ? true : ((_Utils_cmp(point1, point2) < 0) ? false : ((_Utils_cmp(family1, family2) > 0) ? true : ((_Utils_cmp(family1, family2) < 0) ? false : ((_Utils_cmp(prestige1, prestige2) > -1) ? true : false))));
		var policeDelta1 = win ? ((popularPoliceFactor(popular1) * 0.04) / policeBonus(currentPlayer)) : ((popularPoliceFactor(popular1) * 0.02) / policeBonus(currentPlayer));
		var popularDelta1 = win ? 0.02 : (-A2($elm$core$Basics$min, 0.1, 0.01 * tilesOwned1));
		var popularDelta2 = win ? (-A2($elm$core$Basics$min, 0.1, 0.01 * tilesOwned2)) : 0.02;
		var prestigeDelta1 = win ? ((0.05 * prestige2) * prestigeBonus(currentPlayer)) : ((-0.05) * prestige2);
		var prestigeDelta2 = win ? ((-0.05) * prestige1) : ((0.05 * prestige1) * prestigeBonus(enemy));
		var combatEf2 = (((1 + $elm$core$Basics$sqrt(prestige2)) * familyBonus2) * factorFromDice(random2)) * factorFromAdjacentTiles(
			countAdjacentTiles(enemy));
		var combatEf1 = (((1 + $elm$core$Basics$sqrt(prestige1)) * familyBonus1) * factorFromDice(random1)) * factorFromAdjacentTiles(
			countAdjacentTiles(currentPlayer));
		var familyDelta1 = -$elm$core$Basics$round((totalLoss * combatEf2) / (combatEf1 + combatEf2));
		var familyDelta2 = -$elm$core$Basics$round((totalLoss * combatEf1) / (combatEf1 + combatEf2));
		var avoidOverflowInt = function (_int) {
			return A2($elm$core$Basics$max, 0, _int);
		};
		var updateFamily = A3(
			$elm_community$list_extra$List$Extra$setAt,
			enemyIndex,
			avoidOverflowInt(family2 + familyDelta2),
			A3(
				$elm_community$list_extra$List$Extra$setAt,
				currentPlayerIndex,
				avoidOverflowInt(family1 + familyDelta1),
				selectedTile.familyMember));
		var updateTile = _Utils_update(
			selectedTile,
			{familyMember: updateFamily});
		var judgeFamily = (family2 - A2($author$project$Definition$get, enemyIndex, updateTile.familyMember)) - (family1 - A2($author$project$Definition$get, model.currentPlayer, updateTile.familyMember));
		var updateMap = A3($elm_community$list_extra$List$Extra$setAt, selectedTile.index, updateTile, model.map);
		var avoidOverflowFloat = function (_float) {
			return (_float >= 1) ? 1 : A2($elm$core$Basics$max, 0, _float);
		};
		var updatePlayer1 = _Utils_update(
			currentPlayer,
			{
				family: avoidOverflowInt(currentPlayer.family + familyDelta1),
				policeAttention: avoidOverflowFloat(police1 + policeDelta1),
				popularWill: avoidOverflowFloat(popular1 + popularDelta1),
				prestige: avoidOverflowFloat(prestige1 + prestigeDelta1)
			});
		var updatePlayer2 = _Utils_update(
			enemy,
			{
				family: avoidOverflowInt(enemy.family + familyDelta2),
				policeAttention: avoidOverflowFloat(police2 + policeDelta2),
				popularWill: avoidOverflowFloat(popular2 + popularDelta2),
				prestige: avoidOverflowFloat(prestige2 + prestigeDelta2)
			});
		var updatePlayers = A3(
			$elm_community$list_extra$List$Extra$setAt,
			enemyIndex,
			updatePlayer2,
			A3($elm_community$list_extra$List$Extra$setAt, currentPlayerIndex, updatePlayer1, model.players));
		var viewPopUp1 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
								$author$project$Definition$NotClick)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Damn!')
						]))
				]),
			descriptionText: 'We lose ' + (A2($myrho$elm_round$Round$round, 0, (prestige1 - updatePlayer1.prestige) * 100) + ('% Prestige.' + ('\n' + ('We lose ' + ($elm$core$Debug$toString(
				family1 - avoidOverflowInt(family1 + familyDelta1)) + (' Family members.' + ('\n' + ('We get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer1.policeAttention - police1) * 100) + ('% Police Attention.' + ('\n' + ('\n' + ('Enemy get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer2.prestige - prestige2) * 100) + ('% Prestige.' + ('\n' + ('Enemy lose ' + ($elm$core$Debug$toString(
				family2 - avoidOverflowInt(family2 + familyDelta2)) + (' Family members.' + ('\n' + ('Enemy get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer2.policeAttention - police2) * 100) + '% Police Attention.')))))))))))))))))))))),
			title: 'LOSE'
		};
		var viewPopUp2 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
								$author$project$Definition$NotClick)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('God bless us!')
						]))
				]),
			descriptionText: 'We get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer1.prestige - prestige1) * 100) + ('% Prestige.' + ('\n' + ('We lose ' + ($elm$core$Debug$toString(
				family1 - avoidOverflowInt(family1 + familyDelta1)) + (' Family members.' + ('\n' + ('We get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer1.policeAttention - police1) * 100) + ('% Police Attention.' + ('\n' + ('\n' + ('Enemy lose ' + (A2($myrho$elm_round$Round$round, 0, (prestige2 - updatePlayer2.prestige) * 100) + ('% Prestige.' + ('\n' + ('Enemy lose ' + ($elm$core$Debug$toString(
				family2 - avoidOverflowInt(family2 + familyDelta2)) + (' Family members.' + ('\n' + ('Enemy get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer2.policeAttention - police2) * 100) + '% Police Attention.')))))))))))))))))))))),
			title: 'WIN!'
		};
		var viewPopUp = win ? viewPopUp2 : viewPopUp1;
		var updateModel = _Utils_update(
			model,
			{map: updateMap, players: updatePlayers, showPopUp: true, viewPopUp: viewPopUp});
		return _Utils_Tuple2(
			updateModel,
			_Utils_Tuple2(win, judgeFamily));
	});
var $author$project$Phase$Move$randOne = F2(
	function (model, index) {
		return A2(
			$author$project$Definition$get,
			A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.aiRandomNumber),
				model.aiRandomNumberIndex + index),
			model.aiRandomNumber);
	});
var $author$project$Phase$Move$getRandomNumber = F2(
	function (model, range) {
		var randomList = A2(
			$elm$core$List$map,
			function (x) {
				return A2($author$project$Phase$Move$randOne, model, x);
			},
			A2($elm$core$List$range, 0, 11));
		var randSum = $elm$core$List$sum(randomList);
		return A2($elm$core$Basics$modBy, range, randSum);
	});
var $elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$max, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Ai$maxSure = function (list) {
	var _v0 = $elm$core$List$maximum(list);
	if (_v0.$ === 'Just') {
		var a = _v0.a;
		return a;
	} else {
		return -1;
	}
};
var $author$project$Ai$randInt = function (model) {
	var dice = A2(
		$author$project$Definition$get,
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.aiRandomNumber),
			model.aiRandomNumberIndex),
		model.aiRandomNumber);
	return ((dice <= 0) || (dice > 6)) ? 1 : dice;
};
var $author$project$Ai$totals = F2(
	function (xs, ys) {
		return A3($elm$core$List$map2, $elm$core$Basics$add, xs, ys);
	});
var $author$project$Ai$chooseTileToFight = function (model) {
	var tiles = model.map;
	var resetScore = function (tile0) {
		return _Utils_update(
			tile0,
			{
				score: _List_fromArray(
					[-1, -1, -1])
			});
	};
	var playerIndex3 = A2($elm$core$Basics$modBy, 4, model.currentPlayer + 3);
	var playerIndex2 = A2($elm$core$Basics$modBy, 4, model.currentPlayer + 2);
	var playerIndex1 = A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1);
	var playerIndexList = _List_fromArray(
		[playerIndex1, playerIndex2, playerIndex3]);
	var newModel = _Utils_update(
		model,
		{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
	var generateScore = function (tile0) {
		var punishOnNoMember = F4(
			function (me, e1, e2, e3) {
				var tran = function (_int) {
					return ((!_int) || (!me)) ? (-1000000) : 0;
				};
				return _List_fromArray(
					[
						tran(e1),
						tran(e2),
						tran(e3)
					]);
			});
		var score5 = A4(
			punishOnNoMember,
			A2($author$project$Definition$get, model.currentPlayer, tile0.familyMember),
			A2($author$project$Definition$get, playerIndex1, tile0.familyMember),
			A2($author$project$Definition$get, playerIndex2, tile0.familyMember),
			A2($author$project$Definition$get, playerIndex3, tile0.familyMember));
		var owner = function () {
			var _v1 = tile0.owner;
			if (_v1.$ === 'Just') {
				var player = _v1.a;
				return player;
			} else {
				return $author$project$Definition$dummyPlayer;
			}
		}();
		var newModel1 = _Utils_update(
			newModel,
			{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
		var newModel2 = _Utils_update(
			newModel1,
			{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
		var newModel3 = _Utils_update(
			newModel2,
			{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
		var ifWin = function (list) {
			return A2(
				$elm$core$List$map,
				function (item) {
					return item.b.a ? 0 : (-500);
				},
				list);
		};
		var ifSafe = F4(
			function (me, e1, e2, e3) {
				var tran = function (_int) {
					return (_Utils_eq(_int, tile0.stability) || _Utils_eq(_int, tile0.stability + 1)) ? 10000 : (-10000);
				};
				return _Utils_eq(
					owner,
					A2($author$project$Definition$get, model.currentPlayer, model.players)) ? _List_fromArray(
					[
						tran(me - e1),
						tran(me - e2),
						tran(me - e3)
					]) : _List_fromArray(
					[0, 0, 0]);
			});
		var score3 = A4(
			ifSafe,
			A2($author$project$Definition$get, model.currentPlayer, tile0.familyMember),
			A2($author$project$Definition$get, playerIndex1, tile0.familyMember),
			A2($author$project$Definition$get, playerIndex2, tile0.familyMember),
			A2($author$project$Definition$get, playerIndex3, tile0.familyMember));
		var ifConquer = function (list) {
			var canConquer = function (modelc) {
				var newTile0 = A2(
					$author$project$Definition$get,
					A2($author$project$Definition$elemIndexSure, tile0, model.map),
					modelc.map);
				var ownerc = function () {
					var _v0 = newTile0.owner;
					if (_v0.$ === 'Just') {
						var playerc = _v0.a;
						return playerc;
					} else {
						return $author$project$Definition$dummyPlayer;
					}
				}();
				return _Utils_eq(ownerc, $author$project$Definition$dummyPlayer) ? true : false;
			};
			return A2(
				$elm$core$List$map,
				function (item) {
					return canConquer(item.a) ? 5000 : 0;
				},
				list);
		};
		var fightTry3 = A5(
			$author$project$Phase$Implementation$calculateActionAttackResult,
			newModel2,
			playerIndex3,
			$author$project$Ai$randInt(model),
			tile0,
			1);
		var fightTry2 = A5(
			$author$project$Phase$Implementation$calculateActionAttackResult,
			newModel1,
			playerIndex2,
			$author$project$Ai$randInt(model),
			tile0,
			1);
		var fightTry1 = A5(
			$author$project$Phase$Implementation$calculateActionAttackResult,
			newModel,
			playerIndex1,
			$author$project$Ai$randInt(model),
			tile0,
			1);
		var score1 = ifWin(
			_List_fromArray(
				[fightTry1, fightTry2, fightTry3]));
		var score4 = ifConquer(
			_List_fromArray(
				[fightTry1, fightTry2, fightTry3]));
		var familyLose = function (list) {
			return A2(
				$elm$core$List$map,
				function (item) {
					return item.b.b * 1000;
				},
				list);
		};
		var score2 = familyLose(
			_List_fromArray(
				[fightTry1, fightTry2, fightTry3]));
		return ((!_Utils_eq(
			owner,
			A2($author$project$Definition$get, model.currentPlayer, model.players))) && (!_Utils_eq(owner, $author$project$Definition$dummyPlayer))) ? _Utils_update(
			tile0,
			{
				score: A2(
					$author$project$Ai$totals,
					A2(
						$author$project$Ai$totals,
						A2($author$project$Ai$totals, score1, score2),
						A2($author$project$Ai$totals, score3, score4)),
					score5)
			}) : _Utils_update(
			tile0,
			{
				score: A2(
					$author$project$Ai$totals,
					A2(
						$author$project$Ai$totals,
						A2($author$project$Ai$totals, score1, score2),
						score3),
					score5)
			});
	};
	var canAttackTiles = A2(
		$elm$core$List$filter,
		function (tile) {
			return A2($author$project$Definition$get, model.currentPlayer, tile.familyMember) > 0;
		},
		tiles);
	var tiles0 = A2($elm$core$List$map, resetScore, canAttackTiles);
	var scoreList = A2($elm$core$List$map, generateScore, tiles0);
	var justScore = A2(
		$elm$core$List$map,
		function (x) {
			return x.score;
		},
		scoreList);
	var maxScoreEach = A2(
		$elm$core$List$map,
		function (x) {
			return $author$project$Ai$maxSure(x);
		},
		justScore);
	var maxScore = $author$project$Ai$maxSure(maxScoreEach);
	var tileHaveMax = A2(
		$elm$core$List$filter,
		function (x) {
			return _Utils_eq(
				$author$project$Ai$maxSure(x.score),
				maxScore);
		},
		scoreList);
	var randomInt = A2(
		$author$project$Phase$Move$getRandomNumber,
		newModel,
		$elm$core$List$length(tileHaveMax));
	var finalIndex = A2($author$project$Definition$get, randomInt, tileHaveMax).index;
	var playerIndex = function () {
		var tileScore = A2($author$project$Definition$get, finalIndex, scoreList).score;
		var maxSingle = $author$project$Ai$maxSure(tileScore);
		return A2($author$project$Definition$elemIndexSure, maxSingle, tileScore);
	}();
	return (maxScore > 0) ? _Utils_Tuple2(
		_Utils_Tuple2(
			finalIndex,
			A2($author$project$Definition$get, playerIndex, playerIndexList)),
		true) : _Utils_Tuple2(
		_Utils_Tuple2(
			finalIndex,
			A2($author$project$Definition$get, playerIndex, playerIndexList)),
		false);
};
var $author$project$Ai$judgeActionFight = F4(
	function (model, player, times, order) {
		judgeActionFight:
		while (true) {
			var newModel = _Utils_update(
				model,
				{
					aiRandomNumberIndex: model.aiRandomNumberIndex + 2000,
					randomNumber: $author$project$Ai$aiGenerateRandomNumber(model)
				});
			var chooseModel = $author$project$Ai$chooseTileToFight(model);
			var enemy = chooseModel.a.b;
			var aimedTile = A2($author$project$Definition$get, chooseModel.a.a, model.map);
			var attackNow = A5($author$project$Phase$Implementation$calculateActionAttackResult, newModel, enemy, 100, aimedTile, -1);
			var fight = _Utils_Tuple3(chooseModel.a.a, enemy, attackNow.b.a);
			var finalModel = attackNow.a;
			var aaModel = A4($author$project$Ai$aiActionFight, finalModel, player.order, order, fight);
			if (chooseModel.b) {
				if (times === 1) {
					return aaModel;
				} else {
					var $temp$model = aaModel,
						$temp$player = player,
						$temp$times = times - 1,
						$temp$order = order + 1;
					model = $temp$model;
					player = $temp$player;
					times = $temp$times;
					order = $temp$order;
					continue judgeActionFight;
				}
			} else {
				if (times === 1) {
					return A4(
						$author$project$Ai$aiActionFight,
						finalModel,
						player.order,
						order,
						_Utils_Tuple3(100, enemy, attackNow.b.a));
				} else {
					var $temp$model = A4(
						$author$project$Ai$aiActionFight,
						finalModel,
						player.order,
						order,
						_Utils_Tuple3(100, enemy, attackNow.b.a)),
						$temp$player = player,
						$temp$times = times - 1,
						$temp$order = order + 1;
					model = $temp$model;
					player = $temp$player;
					times = $temp$times;
					order = $temp$order;
					continue judgeActionFight;
				}
			}
		}
	});
var $author$project$Ai$aiActionAdd = F4(
	function (model, playerIndex, times, add) {
		var human = A2(
			$author$project$Definition$get,
			0,
			A2(
				$elm$core$List$filter,
				function (x) {
					return x.isHuman;
				},
				model.players));
		var humanIndex = human.order;
		var aiAction2 = A2($author$project$Definition$get, playerIndex, model.aiAction);
		var newAA2 = _Utils_update(
			aiAction2,
			{
				add: A3($elm_community$list_extra$List$Extra$setAt, times, add, aiAction2.add)
			});
		var aiAction1 = A2($author$project$Definition$get, playerIndex - 1, model.aiAction);
		var newAA1 = _Utils_update(
			aiAction1,
			{
				add: A3($elm_community$list_extra$List$Extra$setAt, times, add, aiAction1.add)
			});
		return (_Utils_cmp(playerIndex, humanIndex) > 0) ? _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex - 1, newAA1, model.aiAction)
			}) : _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex, newAA2, model.aiAction)
			});
	});
var $author$project$Definition$Controlled = {$: 'Controlled'};
var $author$project$Phase$Move$isControlled = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$Controlled);
};
var $author$project$Definition$FreeBoth = {$: 'FreeBoth'};
var $author$project$Phase$Move$isFreeBoth = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$FreeBoth);
};
var $author$project$Definition$FreeLeft = {$: 'FreeLeft'};
var $author$project$Phase$Move$isFreeLeft = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$FreeLeft);
};
var $author$project$Definition$FreeRight = {$: 'FreeRight'};
var $author$project$Phase$Move$isFreeRight = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$FreeRight);
};
var $author$project$Definition$LeftToControl = {$: 'LeftToControl'};
var $author$project$Phase$Move$isLeftToControl = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$LeftToControl);
};
var $author$project$Definition$RightToControl = {$: 'RightToControl'};
var $author$project$Phase$Move$isRightToControl = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$RightToControl);
};
var $author$project$Definition$Safe = {$: 'Safe'};
var $author$project$Phase$Move$isSafe = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$Safe);
};
var $author$project$Definition$Surrounded = {$: 'Surrounded'};
var $author$project$Phase$Move$isSurrounded = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$Surrounded);
};
var $author$project$Definition$ToControl = {$: 'ToControl'};
var $author$project$Phase$Move$isToControl = function (tile) {
	return _Utils_eq(tile.status, $author$project$Definition$ToControl);
};
var $author$project$Phase$Move$maxOther = F2(
	function (current, list) {
		var max = $elm$core$List$maximum(
			A3($elm_community$list_extra$List$Extra$setAt, current, 0, list));
		if (max.$ === 'Just') {
			var x = max.a;
			return x;
		} else {
			return 0;
		}
	});
var $author$project$Phase$Move$judgeTileStatus = F2(
	function (model, thisTile) {
		var index = thisTile.index;
		var adjacentIndex = _List_fromArray(
			[
				A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				index - 1),
				A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				index + 1)
			]);
		var adjacentTiles = A2(
			$elm$core$List$map,
			function (x) {
				return A2($author$project$Definition$get, x, model.map);
			},
			adjacentIndex);
		var adjacentLeft = A2($author$project$Definition$get, 0, adjacentTiles);
		var adjacentRight = A2($author$project$Definition$get, 1, adjacentTiles);
		return (!(!A2($author$project$Definition$get, model.currentPlayer, thisTile.familyMember))) ? (((!_Utils_eq(thisTile.owner, $elm$core$Maybe$Nothing)) || ((!_Utils_eq(adjacentLeft.owner, $elm$core$Maybe$Nothing)) || (!_Utils_eq(adjacentRight.owner, $elm$core$Maybe$Nothing)))) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$Controlled}) : ((_Utils_cmp(
			(A2($author$project$Definition$get, model.currentPlayer, thisTile.familyMember) - A2($author$project$Phase$Move$maxOther, model.currentPlayer, thisTile.familyMember)) + 2,
			thisTile.stability) > -1) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$ToControl}) : ((_Utils_cmp(
			(A2($author$project$Definition$get, model.currentPlayer, adjacentLeft.familyMember) - A2($author$project$Phase$Move$maxOther, model.currentPlayer, adjacentLeft.familyMember)) + 2,
			adjacentLeft.stability) > -1) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$LeftToControl}) : ((_Utils_cmp(
			(A2($author$project$Definition$get, model.currentPlayer, adjacentRight.familyMember) - A2($author$project$Phase$Move$maxOther, model.currentPlayer, adjacentRight.familyMember)) + 2,
			adjacentRight.stability) > -1) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$RightToControl}) : ((((!_Utils_eq(adjacentLeft.owner, $elm$core$Maybe$Nothing)) && (!_Utils_eq(
			adjacentLeft.owner,
			A2($elm_community$list_extra$List$Extra$getAt, model.currentPlayer, model.players)))) && ((!_Utils_eq(adjacentRight.owner, $elm$core$Maybe$Nothing)) && (!_Utils_eq(
			adjacentRight.owner,
			$elm$core$Maybe$Just(
				A2($author$project$Definition$get, model.currentPlayer, model.players)))))) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$Surrounded}) : ((_Utils_eq(adjacentLeft.owner, $elm$core$Maybe$Nothing) && _Utils_eq(adjacentRight.owner, $elm$core$Maybe$Nothing)) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$FreeBoth}) : (((!_Utils_eq(
			adjacentLeft.owner,
			A2($elm_community$list_extra$List$Extra$getAt, model.currentPlayer, model.players))) && _Utils_eq(adjacentRight.owner, $elm$core$Maybe$Nothing)) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$FreeRight}) : ((_Utils_eq(adjacentLeft.owner, $elm$core$Maybe$Nothing) && (!_Utils_eq(
			adjacentRight.owner,
			A2($elm_community$list_extra$List$Extra$getAt, model.currentPlayer, model.players)))) ? _Utils_update(
			thisTile,
			{status: $author$project$Definition$FreeLeft}) : _Utils_update(
			thisTile,
			{status: $author$project$Definition$NotSelf}))))))))) : _Utils_update(
			thisTile,
			{status: $author$project$Definition$NotSelf});
	});
var $author$project$Phase$Move$autoAddMembers = function (model) {
	var priorMap = A2(
		$elm$core$List$map,
		function (x) {
			return A2($author$project$Phase$Move$judgeTileStatus, model, x);
		},
		model.map);
	var rightToControlTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isRightToControl, priorMap);
	var safeTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isSafe, priorMap);
	var surroundedTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isSurrounded, priorMap);
	var toControlTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isToControl, priorMap);
	var leftToControlTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isLeftToControl, priorMap);
	var freerightTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isFreeRight, priorMap);
	var freeleftTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isFreeLeft, priorMap);
	var freebothTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isFreeBoth, priorMap);
	var currentPlayerIndex = model.currentPlayer;
	var controlledTiles = A2($elm$core$List$filter, $author$project$Phase$Move$isControlled, priorMap);
	return (!$elm$core$List$isEmpty(toControlTiles)) ? _Utils_Tuple2(
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.map),
			A2(
				$author$project$Definition$get,
				A2(
					$author$project$Phase$Move$getRandomNumber,
					model,
					$elm$core$List$length(toControlTiles)),
				toControlTiles).index),
		2) : ((!$elm$core$List$isEmpty(freebothTiles)) ? _Utils_Tuple2(
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.map),
			A2(
				$author$project$Definition$get,
				A2(
					$author$project$Phase$Move$getRandomNumber,
					model,
					$elm$core$List$length(freebothTiles)),
				freebothTiles).index + 1),
		2) : ((!$elm$core$List$isEmpty(freeleftTiles)) ? _Utils_Tuple2(
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.map),
			A2(
				$author$project$Definition$get,
				A2(
					$author$project$Phase$Move$getRandomNumber,
					model,
					$elm$core$List$length(freeleftTiles)),
				freeleftTiles).index - 1),
		2) : ((!$elm$core$List$isEmpty(freerightTiles)) ? _Utils_Tuple2(
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.map),
			A2(
				$author$project$Definition$get,
				A2(
					$author$project$Phase$Move$getRandomNumber,
					model,
					$elm$core$List$length(freerightTiles)),
				freerightTiles).index + 1),
		2) : ((!$elm$core$List$isEmpty(leftToControlTiles)) ? _Utils_Tuple2(
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.map),
			A2(
				$author$project$Definition$get,
				A2(
					$author$project$Phase$Move$getRandomNumber,
					model,
					$elm$core$List$length(leftToControlTiles)),
				leftToControlTiles).index) - 1,
		2) : ((!$elm$core$List$isEmpty(rightToControlTiles)) ? _Utils_Tuple2(
		A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(model.map),
			A2(
				$author$project$Definition$get,
				A2(
					$author$project$Phase$Move$getRandomNumber,
					model,
					$elm$core$List$length(rightToControlTiles)),
				rightToControlTiles).index) + 1,
		2) : ((!$elm$core$List$isEmpty(surroundedTiles)) ? _Utils_Tuple2(
		A2(
			$author$project$Definition$get,
			A2(
				$author$project$Phase$Move$getRandomNumber,
				model,
				$elm$core$List$length(surroundedTiles)),
			surroundedTiles).index,
		2) : ((!$elm$core$List$isEmpty(controlledTiles)) ? _Utils_Tuple2(
		A2(
			$author$project$Definition$get,
			A2(
				$author$project$Phase$Move$getRandomNumber,
				model,
				$elm$core$List$length(controlledTiles)),
			controlledTiles).index,
		1) : ((!$elm$core$List$isEmpty(safeTiles)) ? _Utils_Tuple2(
		A2(
			$author$project$Definition$get,
			A2(
				$author$project$Phase$Move$getRandomNumber,
				model,
				$elm$core$List$length(safeTiles)),
			safeTiles).index,
		2) : _Utils_Tuple2(-1, 2)))))))));
};
var $author$project$Ai$judgeAdd = F4(
	function (model, player, addTimes, showTimes) {
		judgeAdd:
		while (true) {
			var tileIndex = $author$project$Phase$Move$autoAddMembers(model).a;
			var newModel = _Utils_update(
				model,
				{aiRandomNumberIndex: model.aiRandomNumberIndex + 12});
			var tile = A2($author$project$Definition$get, tileIndex, newModel.map);
			var judgeBlair = function (_int) {
				return ((_int === 2) && _Utils_eq(player.character, $author$project$Definition$Blair)) ? 3 : _int;
			};
			var indicator = $author$project$Phase$Move$autoAddMembers(model).b;
			var familyMember = function (num) {
				return A3(
					$elm_community$list_extra$List$Extra$setAt,
					newModel.currentPlayer,
					A2($author$project$Definition$get, newModel.currentPlayer, tile.familyMember) + num,
					tile.familyMember);
			};
			var addedModel = (indicator === 1) ? _Utils_update(
				newModel,
				{
					map: A3(
						$elm_community$list_extra$List$Extra$setAt,
						tile.index,
						_Utils_update(
							tile,
							{
								familyMember: familyMember(1)
							}),
						model.map)
				}) : (_Utils_eq(player.character, $author$project$Definition$Blair) ? _Utils_update(
				newModel,
				{
					map: A3(
						$elm_community$list_extra$List$Extra$setAt,
						tile.index,
						_Utils_update(
							tile,
							{
								familyMember: familyMember(3)
							}),
						model.map)
				}) : _Utils_update(
				newModel,
				{
					map: A3(
						$elm_community$list_extra$List$Extra$setAt,
						tile.index,
						_Utils_update(
							tile,
							{
								familyMember: familyMember(2)
							}),
						model.map)
				}));
			var finalModel = addedModel;
			var add = _Utils_Tuple2(
				tileIndex,
				judgeBlair(indicator));
			var aaModel = A4($author$project$Ai$aiActionAdd, finalModel, player.order, showTimes, add);
			if (addTimes === 1) {
				return aaModel;
			} else {
				var $temp$model = aaModel,
					$temp$player = player,
					$temp$addTimes = addTimes - 1,
					$temp$showTimes = showTimes + 1;
				model = $temp$model;
				player = $temp$player;
				addTimes = $temp$addTimes;
				showTimes = $temp$showTimes;
				continue judgeAdd;
			}
		}
	});
var $elm$core$List$minimum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(
			A3($elm$core$List$foldl, $elm$core$Basics$min, x, xs));
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Ai$judgeReform = F2(
	function (model, times) {
		judgeReform:
		while (true) {
			var newModel = _Utils_update(
				model,
				{aiRandomNumberIndex: model.aiRandomNumberIndex + 2});
			var player = A2($author$project$Definition$get, newModel.currentPlayer, newModel.players);
			var policePoint = 1 - player.policeAttention;
			var popularPoint = player.popularWill;
			var prestigePoint = player.prestige;
			var wealthPoint = player.wealth / 2000;
			var minPoint = function (eleList1) {
				var _v2 = $elm$core$List$minimum(eleList1);
				if (_v2.$ === 'Just') {
					var current = _v2.a;
					return current;
				} else {
					return 1;
				}
			};
			var eleList = _List_fromArray(
				[wealthPoint, prestigePoint, policePoint, popularPoint]);
			var dice = $author$project$Ai$randInt(model) + $author$project$Ai$randInt(
				_Utils_update(
					model,
					{aiRandomNumberIndex: model.aiRandomNumberIndex + 1}));
			var indexNeedChange = function (eleList0) {
				indexNeedChange:
				while (true) {
					if ($elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (_int) {
								return _Utils_eq(
									_int,
									minPoint(eleList0));
							},
							eleList0)) === 1) {
						return A2(
							$author$project$Definition$elemIndexSure,
							minPoint(eleList0),
							eleList0);
					} else {
						var newDice = A2(
							$elm$core$Basics$modBy,
							$elm$core$List$length(
								A2(
									$elm$core$List$filter,
									function (_int) {
										return _Utils_eq(
											_int,
											minPoint(eleList0));
									},
									eleList0)),
							dice);
						switch (newDice) {
							case 0:
								return A2(
									$author$project$Definition$elemIndexSure,
									minPoint(eleList0),
									eleList0);
							case 1:
								var $temp$eleList0 = A3(
									$elm_community$list_extra$List$Extra$setAt,
									A2(
										$author$project$Definition$elemIndexSure,
										minPoint(eleList0),
										eleList0),
									100,
									eleList0);
								eleList0 = $temp$eleList0;
								continue indexNeedChange;
							case 2:
								var $temp$eleList0 = A3(
									$elm_community$list_extra$List$Extra$setAt,
									A2(
										$author$project$Definition$elemIndexSure,
										minPoint(eleList0),
										eleList0),
									100,
									eleList0);
								eleList0 = $temp$eleList0;
								continue indexNeedChange;
							case 3:
								return 3;
							default:
								return 3;
						}
					}
				}
			};
			var finalModel = function (model0) {
				var _v1 = indexNeedChange(eleList);
				switch (_v1) {
					case 0:
						return _Utils_update(
							model0,
							{
								players: A3(
									$elm_community$list_extra$List$Extra$setAt,
									model.currentPlayer,
									_Utils_update(
										player,
										{wealth: player.wealth + 10}),
									model.players)
							});
					case 1:
						return _Utils_update(
							model0,
							{
								players: A3(
									$elm_community$list_extra$List$Extra$setAt,
									model.currentPlayer,
									_Utils_update(
										player,
										{
											prestige: A2($elm$core$Basics$min, 1, player.prestige + 0.1)
										}),
									model.players)
							});
					case 2:
						return _Utils_update(
							model0,
							{
								players: A3(
									$elm_community$list_extra$List$Extra$setAt,
									model.currentPlayer,
									_Utils_update(
										player,
										{
											policeAttention: A2($elm$core$Basics$max, 0, player.policeAttention - 0.1)
										}),
									model.players)
							});
					case 3:
						return _Utils_update(
							model0,
							{
								players: A3(
									$elm_community$list_extra$List$Extra$setAt,
									model.currentPlayer,
									_Utils_update(
										player,
										{
											popularWill: A2($elm$core$Basics$min, 1, player.popularWill + 0.1)
										}),
									model.players)
							});
					default:
						return model0;
				}
			};
			if (times === 1) {
				return finalModel(newModel);
			} else {
				var $temp$model = finalModel(newModel),
					$temp$times = times - 1;
				model = $temp$model;
				times = $temp$times;
				continue judgeReform;
			}
		}
	});
var $author$project$Ai$aiImple = F2(
	function (model, player) {
		var newModel = _Utils_update(
			model,
			{aiRandomNumberIndex: model.aiRandomNumberIndex + 3});
		var actionDice = $author$project$Ai$generateActionDice(
			_List_fromArray(
				[
					$author$project$Ai$randInt(model),
					$author$project$Ai$randInt(
					_Utils_update(
						model,
						{aiRandomNumberIndex: model.aiRandomNumberIndex + 1})),
					$author$project$Ai$randInt(
					_Utils_update(
						model,
						{aiRandomNumberIndex: model.aiRandomNumberIndex + 1}))
				]));
		var add = function (model1) {
			return (!$elm$core$List$isEmpty(
				A2(
					$elm$core$List$filter,
					function (dice) {
						return _Utils_eq(dice, $author$project$Definition$AddDice);
					},
					actionDice))) ? _Utils_Tuple2(
				A4(
					$author$project$Ai$judgeAdd,
					model1,
					player,
					$elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (dice) {
								return _Utils_eq(dice, $author$project$Definition$AddDice);
							},
							actionDice)),
					0),
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (dice) {
							return _Utils_eq(dice, $author$project$Definition$AddDice);
						},
						actionDice))) : _Utils_Tuple2(
				model1,
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (dice) {
							return _Utils_eq(dice, $author$project$Definition$AddDice);
						},
						actionDice)));
		};
		var fight = function (model2) {
			return (!$elm$core$List$isEmpty(
				A2(
					$elm$core$List$filter,
					function (dice) {
						return _Utils_eq(dice, $author$project$Definition$FightDice);
					},
					actionDice))) ? _Utils_Tuple2(
				A4(
					$author$project$Ai$judgeActionFight,
					model2,
					player,
					$elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (dice) {
								return _Utils_eq(dice, $author$project$Definition$FightDice);
							},
							actionDice)),
					0),
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (dice) {
							return _Utils_eq(dice, $author$project$Definition$FightDice);
						},
						actionDice))) : _Utils_Tuple2(
				model2,
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (dice) {
							return _Utils_eq(dice, $author$project$Definition$FightDice);
						},
						actionDice)));
		};
		var reform = function (model0) {
			return (!$elm$core$List$isEmpty(
				A2(
					$elm$core$List$filter,
					function (dice) {
						return _Utils_eq(dice, $author$project$Definition$Reform);
					},
					actionDice))) ? _Utils_Tuple2(
				A2(
					$author$project$Ai$judgeReform,
					model0,
					$elm$core$List$length(
						A2(
							$elm$core$List$filter,
							function (dice) {
								return _Utils_eq(dice, $author$project$Definition$Reform);
							},
							actionDice))),
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (dice) {
							return _Utils_eq(dice, $author$project$Definition$Reform);
						},
						actionDice))) : _Utils_Tuple2(
				model,
				$elm$core$List$length(
					A2(
						$elm$core$List$filter,
						function (dice) {
							return _Utils_eq(dice, $author$project$Definition$Reform);
						},
						actionDice)));
		};
		var reformModel = reform(newModel).a;
		var addModel = add(reformModel).a;
		var fightModel = fight(addModel).a;
		var finalModel = A3(
			$author$project$Ai$aiActionCount,
			fightModel,
			player.order,
			_Utils_Tuple2(
				add(reformModel).b,
				fight(addModel).b));
		return finalModel;
	});
var $author$project$Ai$aiActionUpgrade = F3(
	function (model, playerIndex, upgrade) {
		var human = A2(
			$author$project$Definition$get,
			0,
			A2(
				$elm$core$List$filter,
				function (x) {
					return x.isHuman;
				},
				model.players));
		var humanIndex = human.order;
		var aiAction2 = A2($author$project$Definition$get, playerIndex, model.aiAction);
		var newAA2 = _Utils_update(
			aiAction2,
			{upgrade: upgrade});
		var aiAction1 = A2($author$project$Definition$get, playerIndex - 1, model.aiAction);
		var newAA1 = _Utils_update(
			aiAction1,
			{upgrade: upgrade});
		return (_Utils_cmp(playerIndex, humanIndex) > 0) ? _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex - 1, newAA1, model.aiAction)
			}) : _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex, newAA2, model.aiAction)
			});
	});
var $author$project$Map$assetUpgrade = function (building) {
	switch (building.$) {
		case 'Casino':
			var level = building.a;
			switch (level) {
				case 1:
					return _Utils_Tuple2(
						2000,
						$author$project$Definition$Casino(2));
				case 2:
					return _Utils_Tuple2(
						3000,
						$author$project$Definition$Casino(3));
				default:
					return _Utils_Tuple2(
						0,
						$author$project$Definition$Casino(3));
			}
		case 'Disco':
			var level = building.a;
			switch (level) {
				case 1:
					return _Utils_Tuple2(
						1800,
						$author$project$Definition$Disco(2));
				case 2:
					return _Utils_Tuple2(
						2500,
						$author$project$Definition$Disco(3));
				default:
					return _Utils_Tuple2(
						0,
						$author$project$Definition$Disco(3));
			}
		case 'NightMarket':
			var level = building.a;
			switch (level) {
				case 1:
					return _Utils_Tuple2(
						1500,
						$author$project$Definition$NightMarket(2));
				case 2:
					return _Utils_Tuple2(
						2000,
						$author$project$Definition$NightMarket(3));
				default:
					return _Utils_Tuple2(
						0,
						$author$project$Definition$NightMarket(3));
			}
		case 'BoxingGym':
			var level = building.a;
			switch (level) {
				case 1:
					return _Utils_Tuple2(
						1200,
						$author$project$Definition$BoxingGym(2));
				case 2:
					return _Utils_Tuple2(
						1800,
						$author$project$Definition$BoxingGym(3));
				default:
					return _Utils_Tuple2(
						0,
						$author$project$Definition$BoxingGym(3));
			}
		default:
			return _Utils_Tuple2(0, $author$project$Definition$Block);
	}
};
var $author$project$Definition$AttackAfterMove = {$: 'AttackAfterMove'};
var $author$project$Phase$Move$calculateAttackResult = F2(
	function (model, aiDice) {
		var prestigeBonus = function (thisPlayer) {
			var _v8 = thisPlayer.character;
			if (_v8.$ === 'Gorman') {
				return 1.5;
			} else {
				return 1;
			}
		};
		var popularPoliceFactor = function (popular) {
			return (popular <= 0.3) ? ((((-10.0) / 3.0) * popular) + 2.0) : ((((-5.0) / 7.0) * popular) + (17.0 / 14.0));
		};
		var policeBonus = function (thisPlayer) {
			var _v7 = thisPlayer.character;
			if (_v7.$ === 'Doherty') {
				return 1.5;
			} else {
				return 1;
			}
		};
		var judgeOwner = F2(
			function (thisPlayer, thisTile) {
				var _v6 = thisTile.owner;
				if (_v6.$ === 'Just') {
					var aPlayer = _v6.a;
					return _Utils_eq(aPlayer.character, thisPlayer.character) ? true : false;
				} else {
					return false;
				}
			});
		var findRandom1 = function (num) {
			return _Utils_eq(num, -1) ? A2($elm$core$Basics$modBy, 10, model.randomNumber) : num;
		};
		var random1 = findRandom1(aiDice);
		var familyLevelFactor = function (level) {
			switch (level.$) {
				case 'Low':
					return 0.9;
				case 'Medium':
					return 1;
				default:
					return 1.1;
			}
		};
		var factorFromFee = function (thisPlayer) {
			var _v4 = thisPlayer.familyLevel;
			switch (_v4.$) {
				case 'Low':
					return 0.8;
				case 'Medium':
					return 1;
				default:
					return 2;
			}
		};
		var factorFromDice = function (diceNumber) {
			switch (diceNumber) {
				case 0:
					return 0.8;
				case 10:
					return 1.4;
				default:
					return (0.1 * diceNumber) + 0.8;
			}
		};
		var factorFromAdjacentTiles = function (num) {
			switch (num) {
				case 1:
					return 1.1;
				case 2:
					return 1.3;
				default:
					return 1;
			}
		};
		var currentPlayerIndex = model.currentPlayer;
		var currentPlayer = A2($author$project$Definition$get, currentPlayerIndex, model.players);
		var familyBonus1 = familyLevelFactor(currentPlayer.familyLevel);
		var playerAtTile = A2($author$project$Definition$get, currentPlayer.currentIndex, model.map);
		var family1 = A2($author$project$Definition$get, currentPlayerIndex, playerAtTile.familyMember);
		var findRandom2 = function (num) {
			return _Utils_eq(num, -1) ? ((_Utils_eq(
				playerAtTile.building,
				$author$project$Definition$BoxingGym(1)) || _Utils_eq(
				playerAtTile.building,
				$author$project$Definition$BoxingGym(2))) ? ((((model.randomNumber - random1) / 10) | 0) + 1) : (_Utils_eq(
				playerAtTile.building,
				$author$project$Definition$BoxingGym(3)) ? ((((model.randomNumber - random1) / 10) | 0) + 2) : (((model.randomNumber - random1) / 10) | 0))) : num;
		};
		var random2 = findRandom2(aiDice);
		var owner = function () {
			var _v1 = playerAtTile.owner;
			if (_v1.$ === 'Just') {
				var player = _v1.a;
				return player;
			} else {
				return $author$project$Definition$dummyPlayer;
			}
		}();
		var familyBonus2 = familyLevelFactor(owner.familyLevel);
		var ownerIndex = A2($author$project$Definition$elemIndexSure, owner, model.players);
		var family2 = A2($author$project$Definition$get, ownerIndex, playerAtTile.familyMember);
		var totalLoss = $elm$core$Basics$round(
			$elm$core$Basics$sqrt(family1 + family2));
		var police2 = owner.policeAttention;
		var popular2 = owner.popularWill;
		var policeDelta2 = (owner.jailRound < 0) ? ((popularPoliceFactor(popular2) * 0.02) / policeBonus(owner)) : 0;
		var prestige2 = owner.prestige;
		var tilesOwned2 = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				judgeOwner(owner),
				model.map));
		var police1 = currentPlayer.policeAttention;
		var popular1 = currentPlayer.popularWill;
		var prestige1 = currentPlayer.prestige;
		var tilesOwned1 = $elm$core$List$length(
			A2(
				$elm$core$List$filter,
				judgeOwner(currentPlayer),
				model.map));
		var countAdjacentTiles = function (player) {
			var judge = function (thisTile) {
				var _v0 = thisTile.owner;
				if (_v0.$ === 'Just') {
					var thisPlayer = _v0.a;
					return _Utils_eq(thisPlayer.character, player.character) ? 1 : 0;
				} else {
					return 0;
				}
			};
			var index = player.currentIndex;
			var adjacentIndex = _List_fromArray(
				[
					A2(
					$elm$core$Basics$modBy,
					$elm$core$List$length(model.map),
					index - 1),
					A2(
					$elm$core$Basics$modBy,
					$elm$core$List$length(model.map),
					index + 1)
				]);
			var adjacentTiles = A2(
				$elm$core$List$map,
				function (x) {
					return A2($author$project$Definition$get, x, model.map);
				},
				adjacentIndex);
			return $elm$core$List$sum(
				A2($elm$core$List$map, judge, adjacentTiles));
		};
		var point = F3(
			function (thisPlayer, thisTile, diceNumber) {
				var thisOrder = thisPlayer.order;
				var thisFamily = A2($author$project$Definition$get, thisOrder, thisTile.familyMember);
				return ((thisFamily * $elm$core$Basics$sqrt(thisPlayer.prestige)) * factorFromAdjacentTiles(
					countAdjacentTiles(thisPlayer))) * factorFromDice(diceNumber);
			});
		var point1 = A3(point, currentPlayer, playerAtTile, random1);
		var point2 = A3(point, owner, playerAtTile, random2);
		var win = (_Utils_cmp(point1, point2) > 0) ? true : ((_Utils_cmp(point1, point2) < 0) ? false : ((_Utils_cmp(family1, family2) > 0) ? true : ((_Utils_cmp(family1, family2) < 0) ? false : ((_Utils_cmp(prestige1, prestige2) > -1) ? true : false))));
		var policeDelta1 = win ? ((popularPoliceFactor(popular1) * 0.04) / policeBonus(currentPlayer)) : ((popularPoliceFactor(popular1) * 0.02) / policeBonus(currentPlayer));
		var popularDelta1 = win ? 0.02 : (-A2($elm$core$Basics$min, 0.1, 0.01 * tilesOwned1));
		var popularDelta2 = win ? (-A2($elm$core$Basics$min, 0.1, 0.01 * tilesOwned2)) : 0.02;
		var prestigeDelta1 = win ? ((0.05 * prestige2) * prestigeBonus(currentPlayer)) : ((-0.05) * prestige2);
		var prestigeDelta2 = win ? ((-0.05) * prestige1) : ((0.05 * prestige1) * prestigeBonus(owner));
		var combatEf2 = ((((1 + $elm$core$Basics$sqrt(prestige2)) * familyBonus2) * factorFromDice(random2)) * factorFromAdjacentTiles(
			countAdjacentTiles(owner))) * factorFromFee(owner);
		var combatEf1 = ((((1 + $elm$core$Basics$sqrt(prestige1)) * familyBonus1) * factorFromDice(random1)) * factorFromAdjacentTiles(
			countAdjacentTiles(currentPlayer))) * factorFromFee(currentPlayer);
		var familyDelta1 = -$elm$core$Basics$round((totalLoss * combatEf2) / (combatEf1 + combatEf2));
		var familyDelta2 = -$elm$core$Basics$round((totalLoss * combatEf1) / (combatEf1 + combatEf2));
		var avoidOverflowInt = function (_int) {
			return A2($elm$core$Basics$max, 0, _int);
		};
		var updateFamily = A3(
			$elm_community$list_extra$List$Extra$setAt,
			ownerIndex,
			avoidOverflowInt(family2 + familyDelta2),
			A3(
				$elm_community$list_extra$List$Extra$setAt,
				currentPlayerIndex,
				avoidOverflowInt(family1 + familyDelta1),
				playerAtTile.familyMember));
		var updateTile = _Utils_update(
			playerAtTile,
			{familyMember: updateFamily});
		var updateMap = A3($elm_community$list_extra$List$Extra$setAt, playerAtTile.index, updateTile, model.map);
		var avoidOverflowFloat = function (_float) {
			return (_float >= 1) ? 1 : A2($elm$core$Basics$max, 0, _float);
		};
		var updatePlayer1 = _Utils_update(
			currentPlayer,
			{
				family: avoidOverflowInt(currentPlayer.family + familyDelta1),
				policeAttention: avoidOverflowFloat(police1 + policeDelta1),
				popularWill: avoidOverflowFloat(popular1 + popularDelta1),
				prestige: avoidOverflowFloat(prestige1 + prestigeDelta1)
			});
		var updatePlayer2 = _Utils_update(
			owner,
			{
				family: avoidOverflowInt(owner.family + familyDelta2),
				policeAttention: avoidOverflowFloat(police2 + policeDelta2),
				popularWill: avoidOverflowFloat(popular2 + popularDelta2),
				prestige: avoidOverflowFloat(prestige2 + prestigeDelta2)
			});
		var updatePlayers = A3(
			$elm_community$list_extra$List$Extra$setAt,
			ownerIndex,
			updatePlayer2,
			A3($elm_community$list_extra$List$Extra$setAt, currentPlayerIndex, updatePlayer1, model.players));
		var viewPopUp1 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$AttackAfterMove, $author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'style', 'I\'ll be back.'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Damn!')
						]))
				]),
			descriptionText: 'We lose ' + (A2($myrho$elm_round$Round$round, 0, (prestige1 - updatePlayer1.prestige) * 100) + ('% Prestige.' + ('\n' + ('We lose ' + (A2(
				$myrho$elm_round$Round$round,
				0,
				family1 - avoidOverflowInt(family1 + familyDelta1)) + (' Family members.' + ('\n' + ('We get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer1.policeAttention - police1) * 100) + ('% Police Attention.' + ('\n' + ('\n' + ('Enemy get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer2.prestige - prestige2) * 100) + ('% Prestige.' + ('\n' + ('Enemy lose ' + (A2(
				$myrho$elm_round$Round$round,
				0,
				family2 - avoidOverflowInt(family2 + familyDelta2)) + (' Family members.' + ('\n' + ('Enemy get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer2.policeAttention - police2) * 100) + '% Police Attention.')))))))))))))))))))))),
			title: 'LOSE'
		};
		var viewPopUp2 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$AttackAfterMove, $author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', 'Surrender to me!!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('God bless us!')
						]))
				]),
			descriptionText: 'We get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer1.prestige - prestige1) * 100) + ('% Prestige.' + ('\n' + ('We lose ' + ($elm$core$Debug$toString(
				family1 - avoidOverflowInt(family1 + familyDelta1)) + (' Family members.' + ('\n' + ('We get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer1.policeAttention - police1) * 100) + ('% Police Attention.' + ('\n' + ('\n' + ('Enemy lose ' + (A2($myrho$elm_round$Round$round, 0, (prestige2 - updatePlayer2.prestige) * 100) + ('% Prestige.' + ('\n' + ('Enemy lose ' + ($elm$core$Debug$toString(
				family2 - avoidOverflowInt(family2 + familyDelta2)) + (' Family members.' + ('\n' + ('Enemy get ' + (A2($myrho$elm_round$Round$round, 0, (updatePlayer2.policeAttention - police2) * 100) + '% Police Attention.')))))))))))))))))))))),
			title: 'WIN!'
		};
		var viewPopUp = win ? viewPopUp2 : viewPopUp1;
		var updateModel = _Utils_update(
			model,
			{map: updateMap, players: updatePlayers, showPopUp: true, viewPopUp: viewPopUp});
		return _Utils_Tuple2(
			updateModel,
			_Utils_Tuple2(point1, point2));
	});
var $author$project$Map$assetBasicToll = function (building) {
	switch (building.$) {
		case 'Casino':
			var level = building.a;
			switch (level) {
				case 1:
					return 300;
				case 2:
					return 600;
				case 3:
					return 1000;
				default:
					return 1000;
			}
		case 'Disco':
			var level = building.a;
			switch (level) {
				case 1:
					return 200;
				case 2:
					return 500;
				case 3:
					return 800;
				default:
					return 800;
			}
		case 'NightMarket':
			var level = building.a;
			switch (level) {
				case 1:
					return 150;
				case 2:
					return 400;
				case 3:
					return 700;
				default:
					return 700;
			}
		case 'BoxingGym':
			var level = building.a;
			switch (level) {
				case 1:
					return 150;
				case 2:
					return 400;
				case 3:
					return 700;
				default:
					return 70;
			}
		case 'Block':
			return 100;
		default:
			return 0;
	}
};
var $author$project$Phase$Move$payToll = function (model) {
	var currentPlayerIndex = model.currentPlayer;
	var currentPlayer = A2($author$project$Definition$get, currentPlayerIndex, model.players);
	var playerAtTile = A2($author$project$Definition$get, currentPlayer.currentIndex, model.map);
	var owner = playerAtTile.owner;
	if (owner.$ === 'Just') {
		var thisPlayer = owner.a;
		if (!_Utils_eq(thisPlayer.character, currentPlayer.character)) {
			var tollBonus = function () {
				var _v1 = thisPlayer.character;
				if (_v1.$ === 'Lance') {
					return 1.1;
				} else {
					return 1;
				}
			}();
			var viewPopUp = {
				backgroundImage: 'url(./src/image/event.jpg)',
				buttons: _List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$button,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$AttackAfterMove, $author$project$Definition$Click3)),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', '(I care'),
								$author$project$Style$buttonYes
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Who cares about this little money.')
							]))
					]),
				descriptionText: 'We lose ' + (A2(
					$myrho$elm_round$Round$round,
					0,
					$author$project$Map$assetBasicToll(playerAtTile.building) * tollBonus) + ' money.'),
				title: 'Pay Toll'
			};
			var loseMoneyPlayer = _Utils_update(
				currentPlayer,
				{
					wealth: currentPlayer.wealth - A2(
						$myrho$elm_round$Round$roundNum,
						0,
						$author$project$Map$assetBasicToll(playerAtTile.building) * tollBonus)
				});
			var getMoneyPlayer = _Utils_update(
				thisPlayer,
				{
					wealth: thisPlayer.wealth + A2(
						$myrho$elm_round$Round$roundNum,
						0,
						$author$project$Map$assetBasicToll(playerAtTile.building) * tollBonus)
				});
			var updatedPlayers = A3(
				$elm_community$list_extra$List$Extra$setAt,
				thisPlayer.order,
				getMoneyPlayer,
				A3($elm_community$list_extra$List$Extra$setAt, currentPlayerIndex, loseMoneyPlayer, model.players));
			return _Utils_update(
				model,
				{players: updatedPlayers, showPopUp: true, viewPopUp: viewPopUp});
		} else {
			return _Utils_update(
				model,
				{showPopUp: false});
		}
	} else {
		return _Utils_update(
			model,
			{showPopUp: false});
	}
};
var $author$project$Phase$Move$upgradeBuilding = function (model) {
	var currentPlayerIndex = model.currentPlayer;
	var currentPlayer = A2($author$project$Definition$get, currentPlayerIndex, model.players);
	var playerAtTile = A2($author$project$Definition$get, currentPlayer.currentIndex, model.map);
	var updatedTile = _Utils_update(
		playerAtTile,
		{
			building: $author$project$Map$assetUpgrade(playerAtTile.building).b
		});
	var updatedMap = A3($elm_community$list_extra$List$Extra$setAt, playerAtTile.index, updatedTile, model.map);
	var updatedPlayer = _Utils_update(
		currentPlayer,
		{
			wealth: currentPlayer.wealth - $author$project$Map$assetUpgrade(playerAtTile.building).a
		});
	var updatedPlayers = A3($elm_community$list_extra$List$Extra$setAt, currentPlayerIndex, updatedPlayer, model.players);
	return _Utils_update(
		model,
		{map: updatedMap, players: updatedPlayers, showPopUp: false});
};
var $author$project$Ai$aiMove = F2(
	function (model, player) {
		var playerSure = A2($author$project$Definition$get, model.currentPlayer, model.players);
		var playerAtTile = A2($author$project$Definition$get, playerSure.currentIndex, model.map);
		var judgeFight = function () {
			var pointTry2 = A2(
				$author$project$Phase$Move$calculateAttackResult,
				model,
				$author$project$Ai$randInt(model)).b;
			var pointTry1 = A2(
				$author$project$Phase$Move$calculateAttackResult,
				model,
				$author$project$Ai$randInt(model)).b;
			var point2 = pointTry2.b;
			var point1 = pointTry1.a;
			var newModel1 = _Utils_update(
				model,
				{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
			var newModel2 = _Utils_update(
				newModel1,
				{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
			var randomNumberModel = _Utils_update(
				newModel2,
				{
					aiRandomNumberIndex: model.aiRandomNumberIndex + 16,
					randomNumber: $author$project$Ai$aiGenerateRandomNumber(model)
				});
			var payTollModel = $author$project$Phase$Move$payToll(randomNumberModel);
			var fightModel = A2($author$project$Phase$Move$calculateAttackResult, randomNumberModel, -1).a;
			return (_Utils_cmp(point1, point2) > -1) ? _Utils_update(
				fightModel,
				{showPopUp: false}) : _Utils_update(
				payTollModel,
				{showPopUp: false});
		}();
		var fee = $author$project$Map$assetUpgrade(playerAtTile.building).a;
		var judgeUpgrade = function () {
			var newModel = _Utils_update(
				model,
				{aiRandomNumberIndex: model.aiRandomNumberIndex + 1});
			if (_Utils_cmp(
				fee - player.wealth,
				100 * $author$project$Ai$randInt(model)) > -1) {
				var model1 = $author$project$Phase$Move$upgradeBuilding(newModel);
				return A3($author$project$Ai$aiActionUpgrade, model1, player.order, playerAtTile.index);
			} else {
				return A3($author$project$Ai$aiActionUpgrade, model, player.order, -1);
			}
		}();
		var currentTile = A2($author$project$Definition$get, player.currentIndex, model.map);
		var owner = function () {
			var _v0 = currentTile.owner;
			if (_v0.$ === 'Just') {
				var thisPlayer = _v0.a;
				return thisPlayer;
			} else {
				return $author$project$Definition$dummyPlayer;
			}
		}();
		var currentPlayerSure = A2($author$project$Definition$get, model.currentPlayer, model.players);
		return (_Utils_eq(owner.character, currentPlayerSure.character) && (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Casino(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Disco(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$NightMarket(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$BoxingGym(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Casino(2)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Disco(2)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$NightMarket(2)) || _Utils_eq(
			currentTile.building,
			$author$project$Definition$BoxingGym(2)))))))))) ? judgeUpgrade : (((!_Utils_eq(owner.character, $author$project$Definition$dummyPlayer.character)) && (!_Utils_eq(owner.character, currentPlayerSure.character))) ? judgeFight : model);
	});
var $author$project$Ai$aiActionMove = F4(
	function (model, playerIndex, order, move) {
		var human = A2(
			$author$project$Definition$get,
			0,
			A2(
				$elm$core$List$filter,
				function (x) {
					return x.isHuman;
				},
				model.players));
		var humanIndex = human.order;
		var aiAction2 = A2($author$project$Definition$get, playerIndex, model.aiAction);
		var newAA2 = _Utils_update(
			aiAction2,
			{move: move, order: order});
		var aiAction1 = A2($author$project$Definition$get, playerIndex - 1, model.aiAction);
		var newAA1 = _Utils_update(
			aiAction1,
			{move: move, order: order});
		return (_Utils_cmp(playerIndex, humanIndex) > 0) ? _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex - 1, newAA1, model.aiAction)
			}) : _Utils_update(
			model,
			{
				aiAction: A3($elm_community$list_extra$List$Extra$setAt, playerIndex, newAA2, model.aiAction)
			});
	});
var $author$project$Phase$Move$throughHome = function (model) {
	var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
	var initIndex = 17 * model.currentPlayer;
	return ((_Utils_cmp(player.currentIndex, initIndex) > -1) && (_Utils_cmp(player.currentIndex - model.dice, initIndex) < 0)) ? true : false;
};
var $author$project$Ai$judgeHome = function (model) {
	var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
	var newPlayer = _Utils_update(
		player,
		{popularWill: player.popularWill + 0.1, wealth: player.wealth + 5000});
	return $author$project$Phase$Move$throughHome(model) ? _Utils_update(
		model,
		{
			players: A3($elm_community$list_extra$List$Extra$setAt, model.currentPlayer, newPlayer, model.players)
		}) : model;
};
var $author$project$Animation$convertToFrame = F2(
	function (indexList, map) {
		var length = $elm$core$List$length(indexList);
		var timeGap = $elm$core$Basics$round(100 / length);
		var getTuple = F2(
			function (percent, index) {
				var y = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						index,
						A2(
							$elm$core$List$map,
							function (_this) {
								return _this.position;
							},
							map))).b;
				var x = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						index,
						A2(
							$elm$core$List$map,
							function (_this) {
								return _this.position;
							},
							map))).a;
				return _Utils_Tuple2(
					percent,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Css$Animations$custom,
							'left',
							$elm$core$String$fromInt(x) + '%'),
							A2(
							$rtfeldman$elm_css$Css$Animations$custom,
							'top',
							$elm$core$String$fromInt(y) + '%')
						]));
			});
		var fullTimeList = A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(timeGap),
				A2($elm$core$List$range, 0, length - 2)),
			_List_fromArray(
				[100]));
		return A3($elm$core$List$map2, getTuple, fullTimeList, indexList);
	});
var $author$project$Animation$getCurrentPlayer = function (model) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Definition$dummyPlayer,
		A2($elm_community$list_extra$List$Extra$getAt, model.currentPlayer, model.players));
};
var $author$project$Ai$updatePlayer = function (model) {
	var currentPlayer = $author$project$Animation$getCurrentPlayer(model);
	var modList = function () {
		var fun = function (num) {
			return A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				num);
		};
		return A2(
			$elm$core$List$map,
			fun,
			A2($elm$core$List$range, currentPlayer.currentIndex, currentPlayer.currentIndex + model.dice));
	}();
	var frameList = A2($author$project$Animation$convertToFrame, modList, model.map);
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(model.map),
		currentPlayer.currentIndex + model.dice);
	var newPos = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(0, 0),
		A2(
			$elm_community$list_extra$List$Extra$getAt,
			newIndex,
			A2(
				$elm$core$List$map,
				function (_this) {
					return _this.position;
				},
				model.map)));
	var updated = _Utils_update(
		currentPlayer,
		{currentIndex: newIndex, currentPos: newPos, frameList: frameList});
	return _Utils_ap(
		A2($elm$core$List$take, model.currentPlayer, model.players),
		_Utils_ap(
			_List_fromArray(
				[updated]),
			A2($elm$core$List$drop, model.currentPlayer + 1, model.players)));
};
var $author$project$Ai$aiPrepare = F2(
	function (model, player) {
		var judgePolice = $author$project$Definition$Medium;
		var judgeFamily = $author$project$Definition$Medium;
		var newPlayer = _Utils_update(
			player,
			{familyLevel: judgeFamily, policeReduceLevel: judgePolice});
		var eventModel = function () {
			if ($elm$core$List$length(model.event.optionFunc) === 2) {
				var playerOption2 = $author$project$Definition$refreshPlayer(
					A2($author$project$Definition$get, 1, model.event.optionFunc)(player));
				var playerOption1 = $author$project$Definition$refreshPlayer(
					A2($author$project$Definition$get, 0, model.event.optionFunc)(player));
				var model2 = _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							A2($author$project$Definition$elemIndexSure, player, model.players),
							playerOption2,
							model.players)
					});
				var model1 = _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							A2($author$project$Definition$elemIndexSure, player, model.players),
							playerOption1,
							model.players)
					});
				return (!A2(
					$elm$core$Basics$modBy,
					2,
					$author$project$Ai$randInt(model))) ? model1 : model2;
			} else {
				var playerOption1 = $author$project$Definition$refreshPlayer(
					A2($author$project$Definition$get, 0, model.event.optionFunc)(player));
				var model1 = _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							A2($author$project$Definition$elemIndexSure, player, model.players),
							playerOption1,
							model.players)
					});
				return model1;
			}
		}();
		var newPlayers = A3($elm_community$list_extra$List$Extra$setAt, eventModel.currentPlayer, newPlayer, eventModel.players);
		var changeMoneyModel = _Utils_update(
			eventModel,
			{players: newPlayers});
		var rollDiceModel = _Utils_update(
			changeMoneyModel,
			{
				aiRandomNumberIndex: changeMoneyModel.aiRandomNumberIndex + 1,
				dice: $author$project$Ai$randInt(changeMoneyModel)
			});
		var movedModel = $author$project$Animation$checkMap(rollDiceModel);
		var finalModel = _Utils_update(
			movedModel,
			{
				isMoving: true,
				players: $author$project$Ai$updatePlayer(movedModel)
			});
		var aiActionModel = A4($author$project$Ai$aiActionMove, finalModel, player.order, player.order, finalModel.dice);
		return $author$project$Ai$judgeHome(aiActionModel);
	});
var $author$project$Ai$aiRound = F2(
	function (model, player) {
		var eventModel = A2($author$project$Event$Event$aiChooseEvent, player, model);
		var prepareModel = A2($author$project$Ai$aiPrepare, eventModel, player);
		var moveModel = A2($author$project$Ai$aiMove, prepareModel, player);
		var impleModel = A2($author$project$Ai$aiImple, moveModel, player);
		var finalModel = $author$project$Ai$aiEnd(impleModel);
		var aiJail = $author$project$Ai$aiEnd(model);
		return (player.jailRound <= 0) ? _Utils_update(
			finalModel,
			{
				currentPlayer: A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1)
			}) : _Utils_update(
			aiJail,
			{
				currentPlayer: A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1)
			});
	});
var $author$project$Condition$changeOneInfluence = F2(
	function (player, model) {
		var judgeOwner = function (tile) {
			var _v0 = tile.owner;
			if (_v0.$ === 'Just') {
				var current = _v0.a;
				return _Utils_eq(current.character, player.character) ? true : false;
			} else {
				return false;
			}
		};
		var index = A2($author$project$Definition$elemIndexSure, player, model.players);
		var controlTile = A2($elm$core$List$filter, judgeOwner, model.map);
		var calculateInfluence = function (tile) {
			return tile.stability;
		};
		var influenceAll = $elm$core$List$sum(
			A2($elm$core$List$map, calculateInfluence, model.map));
		var influenceInt = $elm$core$List$sum(
			A2($elm$core$List$map, calculateInfluence, controlTile));
		var newPlayer = _Utils_update(
			player,
			{influence: influenceInt / influenceAll});
		return _Utils_update(
			model,
			{
				players: A3($elm_community$list_extra$List$Extra$setAt, index, newPlayer, model.players)
			});
	});
var $author$project$Condition$changeInfluence = function (model) {
	var model1 = A2(
		$author$project$Condition$changeOneInfluence,
		A2($author$project$Definition$get, 0, model.players),
		model);
	var model2 = A2(
		$author$project$Condition$changeOneInfluence,
		A2($author$project$Definition$get, 1, model.players),
		model1);
	var model3 = A2(
		$author$project$Condition$changeOneInfluence,
		A2($author$project$Definition$get, 2, model.players),
		model2);
	return A2(
		$author$project$Condition$changeOneInfluence,
		A2($author$project$Definition$get, 3, model.players),
		model3);
};
var $author$project$Condition$countMember = function (model) {
	var p3 = A2($author$project$Definition$get, 3, model.players);
	var p2 = A2($author$project$Definition$get, 2, model.players);
	var p1 = A2($author$project$Definition$get, 1, model.players);
	var p0 = A2($author$project$Definition$get, 0, model.players);
	var np3 = _Utils_update(
		p3,
		{
			family: $elm$core$List$sum(
				A2(
					$elm$core$List$map,
					function (x) {
						return A2($author$project$Definition$get, 3, x.familyMember);
					},
					model.map))
		});
	var np2 = _Utils_update(
		p2,
		{
			family: $elm$core$List$sum(
				A2(
					$elm$core$List$map,
					function (x) {
						return A2($author$project$Definition$get, 2, x.familyMember);
					},
					model.map))
		});
	var np1 = _Utils_update(
		p1,
		{
			family: $elm$core$List$sum(
				A2(
					$elm$core$List$map,
					function (x) {
						return A2($author$project$Definition$get, 1, x.familyMember);
					},
					model.map))
		});
	var np0 = _Utils_update(
		p0,
		{
			family: $elm$core$List$sum(
				A2(
					$elm$core$List$map,
					function (x) {
						return A2($author$project$Definition$get, 0, x.familyMember);
					},
					model.map))
		});
	var newPlayers = _List_fromArray(
		[np0, np1, np2, np3]);
	return _Utils_update(
		model,
		{players: newPlayers});
};
var $author$project$Definition$Lose = {$: 'Lose'};
var $author$project$Condition$judgeOneLoser = F2(
	function (player, model) {
		var losePlayer = _Utils_update(
			player,
			{exist: false});
		var currentPlayerIndex = player.order;
		return ((player.wealth <= 0) || (player.influence <= 0)) ? (player.isHuman ? _Utils_update(
			model,
			{
				players: A3($elm_community$list_extra$List$Extra$setAt, currentPlayerIndex, losePlayer, model.players),
				state: $author$project$Definition$Lose
			}) : _Utils_update(
			model,
			{
				players: A3($elm_community$list_extra$List$Extra$setAt, currentPlayerIndex, losePlayer, model.players)
			})) : model;
	});
var $author$project$Condition$judgeLose = function (model) {
	var model1 = A2(
		$author$project$Condition$judgeOneLoser,
		A2($author$project$Definition$get, 0, model.players),
		model);
	var model2 = A2(
		$author$project$Condition$judgeOneLoser,
		A2($author$project$Definition$get, 1, model.players),
		model1);
	var model3 = A2(
		$author$project$Condition$judgeOneLoser,
		A2($author$project$Definition$get, 2, model.players),
		model2);
	return A2(
		$author$project$Condition$judgeOneLoser,
		A2($author$project$Definition$get, 3, model.players),
		model3);
};
var $author$project$Definition$Over100 = {$: 'Over100'};
var $author$project$Condition$generalPoint = F2(
	function (player, model) {
		var weight = _List_fromArray(
			[0.25, 0.2, 0.3, 0.15, 0.1]);
		var familyPercent = function () {
			var existPlayer = A2(
				$elm$core$List$filter,
				function (x) {
					return x.exist;
				},
				model.players);
			var totalFamily = $elm$core$List$sum(
				A2(
					$elm$core$List$map,
					function (x) {
						return x.family;
					},
					existPlayer));
			return player.family / totalFamily;
		}();
		var attributeList = _List_fromArray(
			[player.prestige, familyPercent, player.influence, player.popularWill, player.policeAttention]);
		var withWeightSum = $elm$core$List$sum(
			A3($elm$core$List$map2, $elm$core$Basics$mul, attributeList, weight));
		return player.exist ? ((player.wealth * withWeightSum) / $elm$core$List$sum(attributeList)) : 0;
	});
var $author$project$Definition$Win = {$: 'Win'};
var $author$project$Condition$judgeOneWin = F2(
	function (player, model) {
		return (player.influence >= 0.9) ? _Utils_update(
			model,
			{state: $author$project$Definition$Win, winnerIndex: player.order}) : model;
	});
var $author$project$Condition$maxSure = function (list) {
	var _v0 = $elm$core$List$maximum(list);
	if (_v0.$ === 'Just') {
		var a = _v0.a;
		return a;
	} else {
		return A2($author$project$Definition$get, 0, list);
	}
};
var $author$project$Condition$judgeWin = function (model) {
	var model1 = A2(
		$author$project$Condition$judgeOneWin,
		A2($author$project$Definition$get, 0, model.players),
		model);
	var model2 = A2(
		$author$project$Condition$judgeOneWin,
		A2($author$project$Definition$get, 1, model.players),
		model1);
	var model3 = A2(
		$author$project$Condition$judgeOneWin,
		A2($author$project$Definition$get, 2, model.players),
		model2);
	var model4 = A2(
		$author$project$Condition$judgeOneWin,
		A2($author$project$Definition$get, 3, model.players),
		model3);
	var pointList = _List_fromArray(
		[
			A2(
			$author$project$Condition$generalPoint,
			A2($author$project$Definition$get, 0, model.players),
			model4),
			A2(
			$author$project$Condition$generalPoint,
			A2($author$project$Definition$get, 1, model.players),
			model4),
			A2(
			$author$project$Condition$generalPoint,
			A2($author$project$Definition$get, 2, model.players),
			model4),
			A2(
			$author$project$Condition$generalPoint,
			A2($author$project$Definition$get, 3, model.players),
			model4)
		]);
	var maxPointIndex = A2(
		$author$project$Definition$elemIndexSure,
		$author$project$Condition$maxSure(pointList),
		pointList);
	return (model.round.index > 100) ? _Utils_update(
		model,
		{state: $author$project$Definition$Over100, winnerIndex: maxPointIndex}) : model4;
};
var $author$project$Condition$noOverFlow = function (model) {
	var players = model.players;
	var newPlayers = A2($elm$core$List$map, $author$project$Definition$refreshPlayer, players);
	return _Utils_update(
		model,
		{players: newPlayers});
};
var $author$project$Condition$refreshOwner = function (model) {
	var judgeOwner = function (tile) {
		var family = tile.familyMember;
		var max = $author$project$Condition$maxSure(family);
		var maxIndex = A2($author$project$Definition$elemIndexSure, max, family);
		var otherMax = $author$project$Condition$maxSure(
			A3($elm_community$list_extra$List$Extra$setAt, maxIndex, -1, family));
		return (_Utils_cmp(max - otherMax, tile.stability) > -1) ? _Utils_update(
			tile,
			{
				owner: A2($elm_community$list_extra$List$Extra$getAt, maxIndex, model.players)
			}) : _Utils_update(
			tile,
			{owner: $elm$core$Maybe$Nothing});
	};
	var tiles = A2($elm$core$List$map, judgeOwner, model.map);
	return _Utils_update(
		model,
		{map: tiles});
};
var $author$project$Condition$regularRefresh = function (model) {
	var modelOwner = $author$project$Condition$refreshOwner(model);
	var modelInfluence = $author$project$Condition$changeInfluence(modelOwner);
	var modelLose = $author$project$Condition$judgeLose(modelInfluence);
	var modelWin = $author$project$Condition$judgeWin(modelLose);
	var modelMember = $author$project$Condition$countMember(modelWin);
	return $author$project$Condition$noOverFlow(modelMember);
};
var $author$project$Condition$removeLosePlayer = function (model) {
	var losePlayers = A2(
		$elm$core$List$filter,
		function (x) {
			return !x.exist;
		},
		model.players);
	var losePlayerIndices = A2(
		$elm$core$List$map,
		function (x) {
			return x.order;
		},
		losePlayers);
	var clearTile = function (thisTile) {
		var single = F2(
			function (order, _v1) {
				return A2($elm$core$List$member, order, losePlayerIndices) ? 0 : A2($author$project$Definition$get, order, thisTile.familyMember);
			});
		var clearFamily = A2($elm$core$List$indexedMap, single, thisTile.familyMember);
		return _Utils_update(
			thisTile,
			{familyMember: clearFamily});
	};
	var clearOwner = function () {
		var single = function (thisTile) {
			var _v0 = thisTile.owner;
			if (_v0.$ === 'Nothing') {
				return thisTile;
			} else {
				var thisPlayer = _v0.a;
				return A2($elm$core$List$member, thisPlayer, losePlayers) ? _Utils_update(
					thisTile,
					{owner: $elm$core$Maybe$Nothing}) : thisTile;
			}
		};
		return A2($elm$core$List$map, single, model.map);
	}();
	var clearMap = A2($elm$core$List$map, clearTile, clearOwner);
	return _Utils_update(
		model,
		{map: clearMap});
};
var $author$project$Ai$ai = function (model) {
	var viewPopUp = {
		backgroundImage: 'url(./src/image/event.jpg)',
		buttons: _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click2)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Let\'s Go!!!')
					]))
			]),
		descriptionText: 'Defeat them all!',
		title: 'Round' + $elm$core$Debug$toString(model.round.index + 1)
	};
	var round = model.round;
	var playerZero = function (player) {
		return _Utils_update(
			player,
			{policeAttention: 0, popularWill: 0, prestige: 0, wealth: 0});
	};
	var propertyZero = function (modelZ) {
		return _Utils_update(
			modelZ,
			{
				players: A2(
					$elm$core$List$map,
					function (x) {
						return (!x.exist) ? playerZero(x) : x;
					},
					modelZ.players)
			});
	};
	var newRound = _Utils_update(
		round,
		{index: round.index + 1});
	var newModel = _Utils_update(
		model,
		{
			currentPlayer: A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1)
		});
	var aiIndex3 = A2($elm$core$Basics$modBy, 4, model.currentPlayer + 3);
	var aiIndex2 = A2($elm$core$Basics$modBy, 4, model.currentPlayer + 2);
	var aiIndex1 = A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1);
	var ai3 = A2($author$project$Definition$get, aiIndex3, model.players);
	var ai2 = A2($author$project$Definition$get, aiIndex2, model.players);
	var ai1 = A2($author$project$Definition$get, aiIndex1, model.players);
	var model1 = ai1.exist ? $author$project$Condition$removeLosePlayer(
		A2($author$project$Ai$aiRound, newModel, ai1)) : $author$project$Condition$removeLosePlayer(
		_Utils_update(
			newModel,
			{
				currentPlayer: A2($elm$core$Basics$modBy, 4, newModel.currentPlayer + 1),
				players: A3(
					$elm_community$list_extra$List$Extra$setAt,
					A2($author$project$Definition$elemIndexSure, ai1, newModel.players),
					playerZero(ai1),
					newModel.players)
			}));
	var model2 = ai2.exist ? $author$project$Condition$removeLosePlayer(
		A2($author$project$Ai$aiRound, model1, ai2)) : $author$project$Condition$removeLosePlayer(
		_Utils_update(
			model1,
			{
				currentPlayer: A2($elm$core$Basics$modBy, 4, model1.currentPlayer + 1),
				players: A3(
					$elm_community$list_extra$List$Extra$setAt,
					A2($author$project$Definition$elemIndexSure, ai2, model1.players),
					playerZero(ai2),
					model1.players)
			}));
	var model3 = ai3.exist ? $author$project$Condition$removeLosePlayer(
		A2($author$project$Ai$aiRound, model2, ai3)) : $author$project$Condition$removeLosePlayer(
		_Utils_update(
			model2,
			{
				currentPlayer: A2($elm$core$Basics$modBy, 4, model2.currentPlayer + 1),
				players: A3(
					$elm_community$list_extra$List$Extra$setAt,
					A2($author$project$Definition$elemIndexSure, ai3, model2.players),
					playerZero(ai3),
					model2.players)
			}));
	var model4 = $author$project$Ai$aiRecord(model3);
	var model5 = propertyZero(
		$author$project$Condition$removeLosePlayer(
			$author$project$Condition$regularRefresh(model4)));
	return _Utils_update(
		model5,
		{
			actionDice: _List_fromArray(
				[$author$project$Definition$NoActionDice, $author$project$Definition$NoActionDice, $author$project$Definition$NoActionDice]),
			actionDiceNumber: _List_fromArray(
				[-1, -1, -1]),
			aiRandomNumberIndex: 0,
			canClick: true,
			canSelectTile: false,
			currentPlayer: model.currentPlayer,
			diceState: $author$project$Definition$NotShowDice,
			fightButtonNumber: -1,
			round: newRound,
			selectedTileIndex: -1,
			showActionDice: false,
			showActionDiceRespectively: _List_fromArray(
				[false, false, false]),
			showDice: $author$project$Definition$NoDice,
			showPopUp: true,
			viewPopUp: viewPopUp
		});
};
var $author$project$Phase$End$calculatePF = function (model) {
	var prestige = A2($author$project$Definition$get, model.currentPlayer, model.players).prestige;
	var prestigeAssetFactor = 0.5 + $elm$core$Basics$sqrt(prestige);
	var prestigeBlockFactor = (0.4 * prestige) + 0.8;
	var popular = A2($author$project$Definition$get, model.currentPlayer, model.players).popularWill;
	var popularFactor = 0.6 + $elm$core$Basics$sqrt(popular);
	var police = A2($author$project$Definition$get, model.currentPlayer, model.players).policeAttention;
	var judgeOwner = function (tile) {
		var _v1 = tile.owner;
		if (_v1.$ === 'Just') {
			var current = _v1.a;
			return _Utils_eq(
				current.character,
				A2($author$project$Definition$get, model.currentPlayer, model.players).character) ? true : false;
		} else {
			return false;
		}
	};
	var controlTile = A2($elm$core$List$filter, judgeOwner, model.map);
	var calculateBuildingPF = function (tile) {
		var _v0 = tile.building;
		if (_v0.$ === 'Block') {
			return ((popularFactor * prestigeBlockFactor) * $author$project$Map$assetBasicIncome(tile.building)) / (police + 1);
		} else {
			return (prestigeAssetFactor * $author$project$Map$assetBasicIncome(tile.building)) / (police + 1);
		}
	};
	return $elm$core$List$sum(
		A2($elm$core$List$map, calculateBuildingPF, controlTile));
};
var $author$project$Phase$End$policeAttentionBribe = function (model) {
	var countLevel = function (level) {
		switch (level.$) {
			case 'Low':
				return 0.01;
			case 'Medium':
				return 0.02;
			default:
				return 0.03;
		}
	};
	return countLevel(
		A2($author$project$Definition$get, model.currentPlayer, model.players).policeReduceLevel);
};
var $author$project$Phase$End$ownedTile = function (model) {
	var judgeOwner = function (tile) {
		var _v0 = tile.owner;
		if (_v0.$ === 'Just') {
			var thisPlayer = _v0.a;
			return _Utils_eq(
				thisPlayer.character,
				A2($author$project$Definition$get, model.currentPlayer, model.players).character) ? true : false;
		} else {
			return false;
		}
	};
	return A2($elm$core$List$filter, judgeOwner, model.map);
};
var $author$project$Phase$End$policeAttentionCount = function (model) {
	var increasePerCasino = function (thisBuilding) {
		if (thisBuilding.$ === 'Casino') {
			var level = thisBuilding.a;
			switch (level) {
				case 1:
					return 0.01;
				case 2:
					return 0.02;
				default:
					return 0.04;
			}
		} else {
			return 0;
		}
	};
	var controlTile = $author$project$Phase$End$ownedTile(model);
	var policeIncrease = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (x) {
				return increasePerCasino(x.building);
			},
			controlTile));
	return policeIncrease;
};
var $author$project$Phase$End$popularWillCount = function (model) {
	var increasePerMarket = function (thisBuilding) {
		if (thisBuilding.$ === 'NightMarket') {
			var level = thisBuilding.a;
			switch (level) {
				case 1:
					return 0.01;
				case 2:
					return 0.02;
				default:
					return 0.03;
			}
		} else {
			return 0;
		}
	};
	var controlTile = $author$project$Phase$End$ownedTile(model);
	var popularIncrease = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (x) {
				return increasePerMarket(x.building);
			},
			controlTile));
	var block = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (x) {
				return _Utils_eq(x.building, $author$project$Definition$Block);
			},
			controlTile));
	var allBlock = (block > 6.0) ? (6 / 100) : (block / 100);
	return ((popularIncrease + allBlock) < 0) ? 0 : (popularIncrease + allBlock);
};
var $author$project$Phase$End$prestigeCount = function (model) {
	var decreasePerDisco = function (thisBuilding) {
		if (thisBuilding.$ === 'Disco') {
			var level = thisBuilding.a;
			switch (level) {
				case 1:
					return 0.01;
				case 2:
					return 0.02;
				default:
					return 0.03;
			}
		} else {
			return 0;
		}
	};
	var controlTile = $author$project$Phase$End$ownedTile(model);
	var prestigeDecrease = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (x) {
				return decreasePerDisco(x.building);
			},
			controlTile));
	return prestigeDecrease;
};
var $author$project$Phase$End$convertToFrame0 = F2(
	function (indexList, map) {
		var length = $elm$core$List$length(indexList);
		var timeGap = $elm$core$Basics$round(100 / length);
		var getTuple = F2(
			function (percent, index) {
				var y = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						index,
						A2(
							$elm$core$List$map,
							function (_this) {
								return _this.position;
							},
							map))).b;
				var x = A2(
					$elm$core$Maybe$withDefault,
					_Utils_Tuple2(0, 0),
					A2(
						$elm_community$list_extra$List$Extra$getAt,
						index,
						A2(
							$elm$core$List$map,
							function (_this) {
								return _this.position;
							},
							map))).a;
				return _Utils_Tuple2(
					percent,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Css$Animations$custom,
							'left',
							$elm$core$String$fromInt(x) + '%'),
							A2(
							$rtfeldman$elm_css$Css$Animations$custom,
							'top',
							$elm$core$String$fromInt(y) + '%')
						]));
			});
		var fullTimeList = A2(
			$elm$core$List$append,
			A2(
				$elm$core$List$map,
				$elm$core$Basics$mul(timeGap),
				A2($elm$core$List$range, 0, length - 2)),
			_List_fromArray(
				[100]));
		return A3($elm$core$List$map2, getTuple, fullTimeList, indexList);
	});
var $author$project$Phase$End$getCurrentPlayer0 = function (model) {
	return A2(
		$elm$core$Maybe$withDefault,
		$author$project$Definition$dummyPlayer,
		A2($elm_community$list_extra$List$Extra$getAt, model.currentPlayer, model.players));
};
var $author$project$Phase$End$updatePlayerJail = function (model) {
	var currentPlayer = $author$project$Phase$End$getCurrentPlayer0(model);
	var modList = function () {
		var fun = function (num) {
			return A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				num);
		};
		return A2(
			$elm$core$List$map,
			fun,
			A2($elm$core$List$range, currentPlayer.currentIndex, currentPlayer.currentIndex));
	}();
	var frameList = A2($author$project$Phase$End$convertToFrame0, modList, model.map);
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(model.map),
		currentPlayer.currentIndex);
	var newPos = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(0, 0),
		A2(
			$elm_community$list_extra$List$Extra$getAt,
			newIndex,
			A2(
				$elm$core$List$map,
				function (_this) {
					return _this.position;
				},
				model.map)));
	var updated = _Utils_update(
		currentPlayer,
		{currentIndex: newIndex, currentPos: newPos, frameList: frameList});
	return _Utils_ap(
		A2($elm$core$List$take, model.currentPlayer, model.players),
		_Utils_ap(
			_List_fromArray(
				[updated]),
			A2($elm$core$List$drop, model.currentPlayer + 1, model.players)));
};
var $author$project$Phase$End$countWealth = F2(
	function (model, clickState) {
		switch (clickState.$) {
			case 'Click1':
				var viewPopUp = {
					backgroundImage: 'url(./src/image/event.jpg)',
					buttons: _List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$button,
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$Events$onClick(
									A3($author$project$Definition$StartGameMessage, $author$project$Definition$EndPhase, $author$project$Definition$CountWealth, $author$project$Definition$Click2)),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
									$author$project$Style$buttonYes
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text('Oh...')
								]))
						]),
					descriptionText: 'You\'re sent to jail for high police attention.',
					title: 'Jail'
				};
				var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
				var wealthBonus = function () {
					var _v1 = player.character;
					if (_v1.$ === 'Lance') {
						return 1.1;
					} else {
						return 1;
					}
				}();
				var newPlayer = _Utils_update(
					player,
					{
						wealth: ((player.wealth + A2(
							$myrho$elm_round$Round$roundNum,
							0,
							wealthBonus * $author$project$Phase$End$calculatePF(model))) - ($author$project$Map$familyCost(
							A2($author$project$Definition$get, model.currentPlayer, model.players)) / 3)) - A2(
							$myrho$elm_round$Round$roundNum,
							0,
							$author$project$Map$policeReduceCost(
								A2($author$project$Definition$get, model.currentPlayer, model.players)))
					});
				var jailPlayer = _Utils_update(
					player,
					{
						currentIndex: 24,
						currentPos: _Utils_Tuple2(90, 40),
						jailRound: 2,
						policeAttention: 0.25
					});
				var players = A3($elm_community$list_extra$List$Extra$setAt, model.currentPlayer, jailPlayer, model.players);
				var finalPlayer = _Utils_update(
					newPlayer,
					{
						policeAttention: (newPlayer.policeAttention + A2(
							$myrho$elm_round$Round$roundNum,
							2,
							$author$project$Phase$End$policeAttentionCount(model))) - $author$project$Phase$End$policeAttentionBribe(model),
						popularWill: newPlayer.popularWill + A2(
							$myrho$elm_round$Round$roundNum,
							2,
							$author$project$Phase$End$popularWillCount(model)),
						prestige: newPlayer.prestige - A2(
							$myrho$elm_round$Round$roundNum,
							2,
							$author$project$Phase$End$prestigeCount(model))
					});
				var newModel = _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							$author$project$Definition$refreshPlayer(finalPlayer),
							model.players),
						showPopUp: false
					});
				var jailModel = _Utils_update(
					newModel,
					{players: players, showPopUp: true, viewPopUp: viewPopUp});
				var finalPlayers = $author$project$Phase$End$updatePlayerJail(jailModel);
				return (player.policeAttention > 0.99) ? _Utils_update(
					jailModel,
					{players: finalPlayers}) : $author$project$Ai$ai(newModel);
			case 'Click2':
				return $author$project$Ai$ai(
					_Utils_update(
						model,
						{showPopUp: false}));
			default:
				return model;
		}
	});
var $author$project$Phase$End$endPhase = F3(
	function (model, subPhase, clickState) {
		if (subPhase.$ === 'CountWealth') {
			return $author$project$Condition$regularRefresh(
				A2($author$project$Phase$End$countWealth, model, clickState));
		} else {
			return model;
		}
	});
var $author$project$Definition$LoadNextRound = {$: 'LoadNextRound'};
var $author$project$Phase$Implementation$policeAttentionBribe = function (model) {
	var countLevel = function (level) {
		switch (level.$) {
			case 'Low':
				return 1;
			case 'Medium':
				return 2;
			default:
				return 3;
		}
	};
	return 'You lose ' + ($elm$core$Debug$toString(
		countLevel(
			A2($author$project$Definition$get, model.currentPlayer, model.players).policeReduceLevel)) + '% police attention due to police bribe fee.');
};
var $author$project$Phase$Implementation$ownedTile = function (model) {
	var judgeOwner = function (tile) {
		var _v0 = tile.owner;
		if (_v0.$ === 'Just') {
			var current = _v0.a;
			return _Utils_eq(
				current.character,
				A2($author$project$Definition$get, model.currentPlayer, model.players).character) ? true : false;
		} else {
			return false;
		}
	};
	return A2($elm$core$List$filter, judgeOwner, model.map);
};
var $author$project$Phase$Implementation$policeAttentionCount = function (model) {
	var increasePerCasino = function (thisBuilding) {
		if (thisBuilding.$ === 'Casino') {
			var level = thisBuilding.a;
			switch (level) {
				case 1:
					return 0.01;
				case 2:
					return 0.02;
				default:
					return 0.04;
			}
		} else {
			return 0;
		}
	};
	var controlTile = $author$project$Phase$Implementation$ownedTile(model);
	var policeIncrease = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (x) {
				return increasePerCasino(x.building);
			},
			controlTile));
	return (!policeIncrease) ? '' : ('You get ' + (A2($myrho$elm_round$Round$round, 0, policeIncrease * 100) + '% police attention due to your casino(s). '));
};
var $author$project$Phase$Implementation$popularWillCount = function (model) {
	var increasePerMarket = function (thisBuilding) {
		if (thisBuilding.$ === 'NightMarket') {
			var level = thisBuilding.a;
			switch (level) {
				case 1:
					return 0.01;
				case 2:
					return 0.02;
				default:
					return 0.03;
			}
		} else {
			return 0;
		}
	};
	var controlTile = $author$project$Phase$Implementation$ownedTile(model);
	var popularIncrease = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (x) {
				return increasePerMarket(x.building);
			},
			controlTile));
	var block = $elm$core$List$length(
		A2(
			$elm$core$List$filter,
			function (x) {
				return _Utils_eq(x.building, $author$project$Definition$Block);
			},
			controlTile));
	var allBlock = (block > 6.0) ? (6 / 100) : (block / 100);
	return ((popularIncrease + allBlock) <= 0) ? '' : ('You get ' + (A2($myrho$elm_round$Round$round, 0, (popularIncrease * 100) + (allBlock * 100)) + '% popular will due to your night market(s). '));
};
var $author$project$Phase$Implementation$prestigeCount = function (model) {
	var decreasePerDisco = function (thisBuilding) {
		if (thisBuilding.$ === 'Disco') {
			var level = thisBuilding.a;
			switch (level) {
				case 1:
					return 0.01;
				case 2:
					return 0.02;
				default:
					return 0.03;
			}
		} else {
			return 0;
		}
	};
	var controlTile = $author$project$Phase$Implementation$ownedTile(model);
	var prestigeDecrease = $elm$core$List$sum(
		A2(
			$elm$core$List$map,
			function (x) {
				return decreasePerDisco(x.building);
			},
			controlTile));
	return (!prestigeDecrease) ? '' : ('You lose ' + (A2($myrho$elm_round$Round$round, 0, prestigeDecrease * 100) + '% prestige due to your disco(s). '));
};
var $author$project$Update$endPopUp = function (model) {
	return {
		backgroundImage: 'url(./src/image/event.jpg)',
		buttons: _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$LoadNextRound),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('OK')
					]))
			]),
		descriptionText: 'Income: \n Protection fee: ' + (A2(
			$myrho$elm_round$Round$round,
			0,
			$author$project$Phase$Implementation$calculatePF(model)) + (' \n Expenditure: Family cost: -' + (A2(
			$myrho$elm_round$Round$round,
			0,
			$author$project$Map$familyCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players)) / 3) + (' \n Bribe: -' + ($elm$core$Debug$toString(
			$author$project$Map$policeReduceCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players))) + ('          ' + ($author$project$Phase$Implementation$prestigeCount(model) + ($author$project$Phase$Implementation$policeAttentionCount(model) + ($author$project$Phase$Implementation$popularWillCount(model) + $author$project$Phase$Implementation$policeAttentionBribe(model)))))))))),
		title: 'Count Wealth'
	};
};
var $author$project$Definition$FightOrAdd = {$: 'FightOrAdd'};
var $author$project$Definition$Lucky = {$: 'Lucky'};
var $author$project$Animation$toDiceKind = function (number) {
	switch (number) {
		case 1:
			return $author$project$Definition$AddDice;
		case 2:
			return $author$project$Definition$FightDice;
		case 3:
			return $author$project$Definition$AddDice;
		case 4:
			return $author$project$Definition$FightOrAdd;
		case 5:
			return $author$project$Definition$Lucky;
		case 6:
			return $author$project$Definition$Reform;
		default:
			return $author$project$Definition$AddDice;
	}
};
var $author$project$Animation$handleDiceForAction = function (model) {
	var number = model.dice;
	var number1 = ((number / 36) | 0) + 1;
	var number2 = (((number - (36 * (number1 - 1))) / 6) | 0) + 1;
	var number3 = A2($elm$core$Basics$max, 1, (number - (36 * (number1 - 1))) - (6 * (number2 - 1)));
	return _Utils_update(
		model,
		{
			actionDice: _List_fromArray(
				[
					$author$project$Animation$toDiceKind(number1),
					$author$project$Animation$toDiceKind(number2),
					$author$project$Animation$toDiceKind(number3)
				]),
			actionDiceNumber: _List_fromArray(
				[number1, number2, number3])
		});
};
var $author$project$Phase$Implementation$addFamily = function (model) {
	var currentTile = A2($author$project$Definition$get, model.selectedTileIndex, model.map);
	var familyMemberPlus1 = A3(
		$elm_community$list_extra$List$Extra$setAt,
		model.currentPlayer,
		A2($author$project$Definition$get, model.currentPlayer, currentTile.familyMember) + 1,
		currentTile.familyMember);
	var currentPlayer = A2($author$project$Definition$get, model.currentPlayer, model.players);
	var addBonus = function () {
		var _v2 = currentPlayer.character;
		if (_v2.$ === 'Blair') {
			return 3;
		} else {
			return 2;
		}
	}();
	var addedPlayer = function () {
		var _v1 = currentTile.owner;
		if (_v1.$ === 'Just') {
			var player = _v1.a;
			return _Utils_eq(player.character, currentPlayer.character) ? _Utils_update(
				currentPlayer,
				{family: currentPlayer.family + addBonus}) : _Utils_update(
				currentPlayer,
				{family: currentPlayer.family + 1});
		} else {
			return _Utils_update(
				currentPlayer,
				{family: currentPlayer.family + addBonus});
		}
	}();
	var updatedPlayers = A3($elm_community$list_extra$List$Extra$setAt, model.currentPlayer, addedPlayer, model.players);
	var familyMemberPlus2 = A3(
		$elm_community$list_extra$List$Extra$setAt,
		model.currentPlayer,
		A2($author$project$Definition$get, model.currentPlayer, currentTile.familyMember) + addBonus,
		currentTile.familyMember);
	var addedTile = function () {
		var _v0 = currentTile.owner;
		if (_v0.$ === 'Just') {
			var player = _v0.a;
			return _Utils_eq(player.character, currentPlayer.character) ? _Utils_update(
				currentTile,
				{familyMember: familyMemberPlus2}) : _Utils_update(
				currentTile,
				{familyMember: familyMemberPlus1});
		} else {
			return _Utils_update(
				currentTile,
				{familyMember: familyMemberPlus2});
		}
	}();
	return _Utils_update(
		model,
		{
			map: A3($elm_community$list_extra$List$Extra$setAt, model.selectedTileIndex, addedTile, model.map),
			players: updatedPlayers
		});
};
var $author$project$Phase$Implementation$implementationEnd = function (model) {
	if (_Utils_eq(
		model.showActionDiceRespectively,
		_List_fromArray(
			[false, false, false]))) {
		var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
		var wealthBonus = function () {
			var _v0 = player.character;
			if (_v0.$ === 'Lance') {
				return 1.1;
			} else {
				return 1;
			}
		}();
		return {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$LoadNextRound),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('OK')
						]))
				]),
			descriptionText: 'Income: \n Protection fee: ' + (A2(
				$myrho$elm_round$Round$round,
				0,
				wealthBonus * $author$project$Phase$Implementation$calculatePF(model)) + (' \n Expenditure: Family cost: -' + (A2(
				$myrho$elm_round$Round$round,
				0,
				$author$project$Map$familyCost(
					A2($author$project$Definition$get, model.currentPlayer, model.players)) / 3) + (' \n Bribe: -' + (A2(
				$myrho$elm_round$Round$round,
				0,
				$author$project$Map$policeReduceCost(
					A2($author$project$Definition$get, model.currentPlayer, model.players))) + ('.          ' + ($author$project$Phase$Implementation$prestigeCount(model) + ($author$project$Phase$Implementation$policeAttentionCount(model) + ($author$project$Phase$Implementation$popularWillCount(model) + $author$project$Phase$Implementation$policeAttentionBribe(model)))))))))),
			title: 'Count Wealth'
		};
	} else {
		return model.viewPopUp;
	}
};
var $author$project$Phase$Implementation$judgePopUp = function (model) {
	return _Utils_eq(
		model.showActionDiceRespectively,
		_List_fromArray(
			[false, false, false])) ? true : false;
};
var $author$project$Phase$Implementation$testFunctionVanish = F2(
	function (model, buttonNumber) {
		return _Utils_update(
			model,
			{
				showActionDiceRespectively: A3(
					$elm_community$list_extra$List$Extra$setAt,
					buttonNumber,
					!A2($author$project$Definition$get, buttonNumber, model.showActionDiceRespectively),
					model.showActionDiceRespectively),
				showPopUp: false
			});
	});
var $author$project$Phase$Implementation$addDice = F3(
	function (model, buttonNumber, clickState) {
		var addResult = $author$project$Phase$Implementation$addFamily(model);
		var modelClickYes = A2($author$project$Phase$Implementation$testFunctionVanish, addResult, buttonNumber);
		switch (clickState.$) {
			case 'NotClick':
				return _Utils_update(
					model,
					{addOrFight: 'add', battleHighlight: false, canSelectTile: true, fightButtonNumber: buttonNumber, highlight: true});
			case 'Click4':
				return _Utils_update(
					modelClickYes,
					{
						addOrFight: 'add',
						addSE: true,
						canSelectTile: false,
						highlight: false,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(modelClickYes),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(modelClickYes)
					});
			case 'Click5':
				return _Utils_update(
					model,
					{addOrFight: 'add', canSelectTile: false, highlight: false, showPopUp: false});
			default:
				return _Utils_update(
					model,
					{addOrFight: 'add', showPopUp: true});
		}
	});
var $rtfeldman$elm_css$VirtualDom$Styled$property = F2(
	function (key, value) {
		return A3(
			$rtfeldman$elm_css$VirtualDom$Styled$Attribute,
			A2($elm$virtual_dom$VirtualDom$property, key, value),
			_List_Nil,
			'');
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$title = $rtfeldman$elm_css$Html$Styled$Attributes$stringProperty('title');
var $author$project$Phase$Implementation$changeToOtherDice = F3(
	function (model, clickState, buttonNumber) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Lucky, buttonNumber),
								$author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '4%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Fight against our enemies!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Launch a fight')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Lucky, buttonNumber),
								$author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '28%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Send brothers to protect our properties!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Send families')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Lucky, buttonNumber),
								$author$project$Definition$Click4)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '52%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('God bless us! Let\'s see what will I get...'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Bonus')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Lucky, buttonNumber),
								$author$project$Definition$Click5)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '76%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Let me think twice...'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('GiveUp')
						]))
				]),
			descriptionText: 'Click to change the dice to other Dice.',
			title: 'LuckyDice'
		};
		var changeDice = F2(
			function (listDices, dice) {
				var luckyIndex = A2($author$project$Definition$elemIndexSure, $author$project$Definition$Lucky, listDices);
				var changedList = A3($elm_community$list_extra$List$Extra$setAt, luckyIndex, dice, listDices);
				return changedList;
			});
		var refreshModel = F2(
			function (model0, dice) {
				return _Utils_update(
					model0,
					{
						actionDice: A2(changeDice, model0.actionDice, dice),
						showPopUp: false
					});
			});
		switch (clickState.$) {
			case 'Click2':
				return A2(refreshModel, model, $author$project$Definition$FightDice);
			case 'Click3':
				return A2(refreshModel, model, $author$project$Definition$AddDice);
			case 'Click4':
				return A2(refreshModel, model, $author$project$Definition$Reform);
			case 'Click5':
				return A2(refreshModel, model, $author$project$Definition$Lucky);
			case 'NotClick':
				return _Utils_update(
					model,
					{battleHighlight: false, highlight: false, showPopUp: true, viewPopUp: viewPopUp});
			default:
				return _Utils_update(
					model,
					{showPopUp: true});
		}
	});
var $author$project$Definition$Click7 = {$: 'Click7'};
var $author$project$Definition$Click8 = {$: 'Click8'};
var $author$project$Phase$Implementation$fightDice = F3(
	function (model, buttonNumber, clickState) {
		var playerIndexList = _List_fromArray(
			[
				_Utils_Tuple2(
				A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1),
				0),
				_Utils_Tuple2(
				A2($elm$core$Basics$modBy, 4, model.currentPlayer + 2),
				1),
				_Utils_Tuple2(
				A2($elm$core$Basics$modBy, 4, model.currentPlayer + 3),
				2)
			]);
		var judgeCanFightWith = function (list) {
			var playerExist = function (list1) {
				return A2(
					$elm$core$List$filter,
					function (x) {
						return A2($author$project$Definition$get, x.a, model.players).exist;
					},
					list1);
			};
			var family = A2($author$project$Definition$get, model.selectedTileIndex, model.map).familyMember;
			var zeroMember = function (list0) {
				return A2(
					$elm$core$List$filter,
					function (x) {
						return A2($author$project$Definition$get, x.a, family) > 0;
					},
					list0);
			};
			return (!A2($author$project$Definition$get, model.currentPlayer, family)) ? _List_Nil : zeroMember(
				playerExist(list));
		};
		var getButton = F2(
			function (buttons, filteredList) {
				var tranIndex = function (list) {
					return A2(
						$elm$core$List$map,
						function (x) {
							return x.b;
						},
						list);
				};
				return A2(
					$elm$core$List$map,
					function (x) {
						return A2($author$project$Definition$get, x, buttons);
					},
					tranIndex(filteredList));
			});
		var findCharacter = function (number) {
			var _v3 = A2($elm$core$Basics$modBy, 4, number + model.currentPlayer);
			switch (_v3) {
				case 0:
					return 'Lance';
				case 1:
					return 'Gorman';
				case 2:
					return 'Doherty';
				case 3:
					return 'Blair';
				default:
					return ' ';
			}
		};
		var changeLeft = function (buttons) {
			var _v2 = $elm$core$List$length(buttons);
			switch (_v2) {
				case 1:
					var html0 = A2($author$project$Definition$get, 0, buttons).b;
					var abm0 = A2($author$project$Definition$get, 0, buttons).a;
					var newABM0 = A3(
						$elm_community$list_extra$List$Extra$setAt,
						3,
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
						abm0);
					return _Utils_Tuple2(
						A3(
							$elm_community$list_extra$List$Extra$setAt,
							0,
							_Utils_Tuple2(newABM0, html0),
							buttons),
						1);
				case 2:
					var html1 = A2($author$project$Definition$get, 1, buttons).b;
					var html0 = A2($author$project$Definition$get, 0, buttons).b;
					var abm1 = A2($author$project$Definition$get, 1, buttons).a;
					var newABM1 = A3(
						$elm_community$list_extra$List$Extra$setAt,
						3,
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						abm1);
					var abm0 = A2($author$project$Definition$get, 0, buttons).a;
					var newABM0 = A3(
						$elm_community$list_extra$List$Extra$setAt,
						3,
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
						abm0);
					return _Utils_Tuple2(
						A3(
							$elm_community$list_extra$List$Extra$setAt,
							1,
							_Utils_Tuple2(newABM1, html1),
							A3(
								$elm_community$list_extra$List$Extra$setAt,
								0,
								_Utils_Tuple2(newABM0, html0),
								buttons)),
						2);
				default:
					return _Utils_Tuple2(
						buttons,
						$elm$core$List$length(buttons));
			}
		};
		var canFightIndex = judgeCanFightWith(playerIndexList);
		var buttonList = _List_fromArray(
			[
				_Utils_Tuple2(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3(
							$author$project$Definition$StartGameMessage,
							$author$project$Definition$ImplementationPhase,
							A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
							$author$project$Definition$Click6)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '4%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						findCharacter(1))
					])),
				_Utils_Tuple2(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3(
							$author$project$Definition$StartGameMessage,
							$author$project$Definition$ImplementationPhase,
							A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
							$author$project$Definition$Click7)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '28%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						findCharacter(2))
					])),
				_Utils_Tuple2(
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3(
							$author$project$Definition$StartGameMessage,
							$author$project$Definition$ImplementationPhase,
							A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
							$author$project$Definition$Click8)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '52%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						findCharacter(3))
					]))
			]);
		var usefulButton = changeLeft(
			A2(getButton, buttonList, canFightIndex));
		var chooseGiveUp = function () {
			var _v1 = usefulButton.b;
			switch (_v1) {
				case 0:
					return '40%';
				case 1:
					return '60%';
				case 2:
					return '70%';
				case 3:
					return '76%';
				default:
					return '70%';
			}
		}();
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: A2(
				$elm$core$List$append,
				A2(
					$elm$core$List$map,
					function (x) {
						return A2($rtfeldman$elm_css$Html$Styled$button, x.a, x.b);
					},
					usefulButton.a),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$button,
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3(
									$author$project$Definition$StartGameMessage,
									$author$project$Definition$ImplementationPhase,
									A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
									$author$project$Definition$Click5)),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', chooseGiveUp),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
								$author$project$Style$buttonYes
							]),
						_List_fromArray(
							[
								$rtfeldman$elm_css$Html$Styled$text('Give Up')
							]))
					])),
			descriptionText: 'Click to select a family to fight with.',
			title: 'Who do you want to fight with?'
		};
		var battleResult = function (playerIndex) {
			return A4(
				$author$project$Phase$Implementation$calculateActionAttackResult,
				model,
				playerIndex,
				-1,
				A2($author$project$Definition$get, 0, model.map));
		};
		var modelClickYes = function (playerIndex) {
			return A2(
				$author$project$Phase$Implementation$testFunctionVanish,
				A2(battleResult, playerIndex, buttonNumber).a,
				buttonNumber);
		};
		var modelChoose1 = modelClickYes(
			A2($elm$core$Basics$modBy, 4, model.currentPlayer + 1));
		var modelChoose2 = modelClickYes(
			A2($elm$core$Basics$modBy, 4, model.currentPlayer + 2));
		var modelChoose3 = modelClickYes(
			A2($elm$core$Basics$modBy, 4, model.currentPlayer + 3));
		switch (clickState.$) {
			case 'NotClick':
				return _Utils_update(
					model,
					{
						addOrFight: 'fight',
						battleHighlight: false,
						canSelectTile: false,
						fightButtonNumber: buttonNumber,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(model),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(model)
					});
			case 'Click4':
				return _Utils_update(
					model,
					{addOrFight: 'fight', battleHighlight: false, canSelectTile: false, showPopUp: true, viewPopUp: viewPopUp});
			case 'Click5':
				return _Utils_update(
					model,
					{addOrFight: 'fight', battleHighlight: false, canSelectTile: false, showPopUp: false});
			case 'Click6':
				return _Utils_update(
					modelChoose1,
					{addOrFight: 'fight', battleHighlight: false, canSelectTile: false, fightIndicator: 1, fightSE: true, showPopUp: true});
			case 'Click7':
				return _Utils_update(
					modelChoose2,
					{addOrFight: 'fight', battleHighlight: false, canSelectTile: false, fightIndicator: 2, fightSE: true, showPopUp: true});
			case 'Click8':
				return _Utils_update(
					modelChoose3,
					{addOrFight: 'fight', battleHighlight: false, canSelectTile: false, fightIndicator: 3, fightSE: true, showPopUp: true});
			default:
				return _Utils_update(
					model,
					{addOrFight: 'fight', battleHighlight: true, canSelectTile: true, fightButtonNumber: buttonNumber, highlight: false, showPopUp: false});
		}
	});
var $author$project$Phase$Implementation$fightOrAdd = F3(
	function (model, clickState, buttonNumber) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightOrAdd, buttonNumber),
								$author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Fight against our enemies!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Launch a fight')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightOrAdd, buttonNumber),
								$author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Send brothers to protect our properties!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Send families')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightOrAdd, buttonNumber),
								$author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '70%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Let me think twice...'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Give Up')
						]))
				]),
			descriptionText: 'Click to change the dice to other Dice.',
			title: 'Fight or Send members'
		};
		var changeDice = F2(
			function (listDices, dice) {
				var index = buttonNumber;
				var changedList = A3($elm_community$list_extra$List$Extra$setAt, index, dice, listDices);
				return changedList;
			});
		var refreshModel = F2(
			function (model0, dice) {
				return _Utils_update(
					model0,
					{
						actionDice: A2(changeDice, model0.actionDice, dice),
						showPopUp: false
					});
			});
		switch (clickState.$) {
			case 'Click1':
				return A2(refreshModel, model, $author$project$Definition$AddDice);
			case 'Click2':
				return A2(refreshModel, model, $author$project$Definition$FightDice);
			case 'Click3':
				return A2(refreshModel, model, $author$project$Definition$FightOrAdd);
			case 'NotClick':
				return _Utils_update(
					model,
					{battleHighlight: false, highlight: false, showPopUp: true, viewPopUp: viewPopUp});
			default:
				return _Utils_update(
					model,
					{showPopUp: true});
		}
	});
var $author$project$Phase$Implementation$reform = F3(
	function (model, clickState, buttonNumber) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Reform, buttonNumber),
								$author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '4%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Wealth +1000'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Money')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Reform, buttonNumber),
								$author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '28%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Prestige +5%'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Prestige')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Reform, buttonNumber),
								$author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '52%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Police Attention -5%'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Police Attention')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$Reform, buttonNumber),
								$author$project$Definition$Click4)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '76%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('Popular Will +5%'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Popular Will')
						]))
				]),
			descriptionText: 'Select one of the following bonus! Once you select, you can get Wealth +1000 or Prestige +5% or Police Attention -5% or Popular Will +5%.',
			title: 'Reform'
		};
		var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
		var model1 = A2($author$project$Phase$Implementation$testFunctionVanish, model, buttonNumber);
		switch (clickState.$) {
			case 'Click1':
				return _Utils_update(
					model1,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{wealth: player.wealth + 1000}),
							model.players),
						reformSE: true,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(model1),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(model1)
					});
			case 'Click2':
				return _Utils_update(
					model1,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{
									prestige: A2($elm$core$Basics$min, 1, player.prestige + 0.05)
								}),
							model.players),
						reformSE: true,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(model1),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(model1)
					});
			case 'Click3':
				return _Utils_update(
					model1,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{
									policeAttention: A2($elm$core$Basics$max, 0, player.policeAttention - 0.05)
								}),
							model.players),
						reformSE: true,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(model1),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(model1)
					});
			case 'Click4':
				return _Utils_update(
					model1,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{
									popularWill: A2($elm$core$Basics$min, 1, player.popularWill + 0.05)
								}),
							model.players),
						reformSE: true,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(model1),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(model1)
					});
			default:
				return _Utils_update(
					model,
					{battleHighlight: false, highlight: false, showPopUp: true, viewPopUp: viewPopUp});
		}
	});
var $author$project$Definition$seAllFalse = function (model) {
	return _Utils_update(
		model,
		{addSE: false, fightSE: false, moveSE: false, reformSE: false});
};
var $author$project$Phase$Implementation$useActionDice = F4(
	function (model, diceKind, clickState, buttonNumber) {
		var offSEModel = $author$project$Definition$seAllFalse(model);
		switch (diceKind.$) {
			case 'MoveDice':
				return _Utils_update(
					offSEModel,
					{
						showActionDiceRespectively: A3(
							$elm_community$list_extra$List$Extra$setAt,
							buttonNumber,
							!A2($author$project$Definition$get, buttonNumber, offSEModel.showActionDiceRespectively),
							offSEModel.showActionDiceRespectively),
						showDice: $author$project$Definition$RollingDice,
						showPopUp: $author$project$Phase$Implementation$judgePopUp(offSEModel),
						viewPopUp: $author$project$Phase$Implementation$implementationEnd(offSEModel)
					});
			case 'FightDice':
				return A3($author$project$Phase$Implementation$fightDice, offSEModel, buttonNumber, clickState);
			case 'AddDice':
				return A3($author$project$Phase$Implementation$addDice, offSEModel, buttonNumber, clickState);
			case 'FightOrAdd':
				return A3($author$project$Phase$Implementation$fightOrAdd, offSEModel, clickState, buttonNumber);
			case 'Lucky':
				return A3($author$project$Phase$Implementation$changeToOtherDice, offSEModel, clickState, buttonNumber);
			case 'Reform':
				return A3($author$project$Phase$Implementation$reform, offSEModel, clickState, buttonNumber);
			default:
				return A2($author$project$Phase$Implementation$testFunctionVanish, offSEModel, buttonNumber);
		}
	});
var $author$project$Phase$Implementation$implementPhase = F3(
	function (model, subPhase, clickState) {
		switch (subPhase.$) {
			case 'RollActionDice':
				return $author$project$Condition$regularRefresh(model);
			case 'UseActionDice':
				var diceKind = subPhase.a;
				var buttonNumber = subPhase.b;
				return $author$project$Condition$regularRefresh(
					A4($author$project$Phase$Implementation$useActionDice, model, diceKind, clickState, buttonNumber));
			default:
				return model;
		}
	});
var $author$project$Model$initPerspective = function (model) {
	var _v0 = model.character;
	switch (_v0.$) {
		case 'Lance':
			return _Utils_Tuple2(0, 0);
		case 'Gorman':
			return _Utils_Tuple2(-(1440 - (0.8 * model.windowSize.a)), 0);
		case 'Blair':
			return _Utils_Tuple2(0, -(1440 - (0.8 * model.windowSize.b)));
		case 'Doherty':
			return _Utils_Tuple2(-(1440 - (0.8 * model.windowSize.a)), -(1440 - (0.8 * model.windowSize.b)));
		default:
			return _Utils_Tuple2(0, 0);
	}
};
var $elm$random$Random$listHelp = F4(
	function (revList, n, gen, seed) {
		listHelp:
		while (true) {
			if (n < 1) {
				return _Utils_Tuple2(revList, seed);
			} else {
				var _v0 = gen(seed);
				var value = _v0.a;
				var newSeed = _v0.b;
				var $temp$revList = A2($elm$core$List$cons, value, revList),
					$temp$n = n - 1,
					$temp$gen = gen,
					$temp$seed = newSeed;
				revList = $temp$revList;
				n = $temp$n;
				gen = $temp$gen;
				seed = $temp$seed;
				continue listHelp;
			}
		}
	});
var $elm$random$Random$list = F2(
	function (n, _v0) {
		var gen = _v0.a;
		return $elm$random$Random$Generator(
			function (seed) {
				return A4($elm$random$Random$listHelp, _List_Nil, n, gen, seed);
			});
	});
var $author$project$Update$loading = {backgroundImage: 'url(./src/image/event.jpg)', buttons: _List_Nil, descriptionText: 'Load next round.', title: 'Loading'};
var $author$project$Phase$Move$attackAfterMove = F2(
	function (model, clickState) {
		switch (clickState.$) {
			case 'Click1':
				return A2($author$project$Phase$Move$calculateAttackResult, model, -1).a;
			case 'Click2':
				return $author$project$Phase$Move$payToll(model);
			case 'Click3':
				return _Utils_update(
					model,
					{showPopUp: false});
			default:
				return model;
		}
	});
var $author$project$Definition$UpgradeAfterMove = {$: 'UpgradeAfterMove'};
var $author$project$Phase$Move$buildingName = function (tile) {
	var _v0 = tile.building;
	switch (_v0.$) {
		case 'Casino':
			var level = _v0.a;
			return 'level' + ($elm$core$Debug$toString(level) + ' casino');
		case 'Disco':
			var level = _v0.a;
			return 'level' + ($elm$core$Debug$toString(level) + ' disco');
		case 'NightMarket':
			var level = _v0.a;
			return 'level' + ($elm$core$Debug$toString(level) + ' night market');
		case 'BoxingGym':
			var level = _v0.a;
			return 'level' + ($elm$core$Debug$toString(level) + ' boxing gym');
		default:
			return '  ';
	}
};
var $author$project$Phase$Move$ifBoxing = function (tile) {
	var _v0 = tile.building;
	if (_v0.$ === 'BoxingGym') {
		var level = _v0.a;
		return '(Warning: Your enemy has a level ' + ($elm$core$Debug$toString(level) + ' boxing gym here. They may be more stronger!)');
	} else {
		return '';
	}
};
var $author$project$Phase$Move$judgeActionAfterMove = F2(
	function (model, clickState) {
		var viewPopUp3 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$AttackAfterMove, $author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', 'Damn it!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Fine...')
						]))
				]),
			descriptionText: 'You have no family members here. You have to pay the toll fee. Hope you have a good luck!',
			title: 'You have no members here'
		};
		var currentPlayerSure = A2($author$project$Definition$get, model.currentPlayer, model.players);
		var currentTile = A2($author$project$Definition$get, currentPlayerSure.currentIndex, model.map);
		var owner = function () {
			var _v0 = currentTile.owner;
			if (_v0.$ === 'Just') {
				var player = _v0.a;
				return player;
			} else {
				return $author$project$Definition$dummyPlayer;
			}
		}();
		var viewPopUp1 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$AttackAfterMove, $author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', 'Kill\'em all!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Fight!')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$AttackAfterMove, $author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '60%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', 'Keep a low profile...'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Pay toll')
						]))
				]),
			descriptionText: 'You can start a fight against the owner or pay toll.' + ('\n' + $author$project$Phase$Move$ifBoxing(currentTile)),
			title: 'Fight or Pay'
		};
		var viewPopUp2 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$UpgradeAfterMove, $author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', 'Expand our business!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Sure')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$UpgradeAfterMove, $author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '60%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'title', 'I\'m running out of money...'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Give Up.')
						]))
				]),
			descriptionText: 'Do you want to pay ' + ($elm$core$Debug$toString(
				$author$project$Map$assetUpgrade(currentTile.building)) + (' to upgrade your ' + ($author$project$Phase$Move$buildingName(currentTile) + '?'))),
			title: 'Building Upgrading'
		};
		return (_Utils_eq(owner.character, currentPlayerSure.character) && (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Casino(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Disco(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$NightMarket(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$BoxingGym(1)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Casino(2)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$Disco(2)) || (_Utils_eq(
			currentTile.building,
			$author$project$Definition$NightMarket(2)) || _Utils_eq(
			currentTile.building,
			$author$project$Definition$BoxingGym(2)))))))))) ? _Utils_update(
			model,
			{showPopUp: true, viewPopUp: viewPopUp2}) : (((!_Utils_eq(owner.character, $author$project$Definition$dummyPlayer.character)) && (!_Utils_eq(owner.character, currentPlayerSure.character))) ? ((!(!A2(
			$author$project$Definition$get,
			currentPlayerSure.order,
			A2($author$project$Definition$get, currentPlayerSure.currentIndex, model.map).familyMember))) ? _Utils_update(
			model,
			{showPopUp: true, viewPopUp: viewPopUp1}) : _Utils_update(
			model,
			{showPopUp: true, viewPopUp: viewPopUp3})) : model);
	});
var $author$project$Definition$ActionDice = {$: 'ActionDice'};
var $author$project$Phase$Move$manageEvent = F2(
	function (model, clickState) {
		var newModel = model;
		var currentPlayer = A2($author$project$Definition$get, model.currentPlayer, model.players);
		if ($elm$core$List$length(newModel.event.optionFunc) === 2) {
			var playerOption2 = $author$project$Definition$refreshPlayer(
				A2($author$project$Definition$get, 1, newModel.event.optionFunc)(currentPlayer));
			var playerOption1 = $author$project$Definition$refreshPlayer(
				A2($author$project$Definition$get, 0, newModel.event.optionFunc)(currentPlayer));
			var model2 = _Utils_update(
				newModel,
				{
					canClick: true,
					diceState: $author$project$Definition$ActionDice,
					players: A3($elm_community$list_extra$List$Extra$setAt, newModel.currentPlayer, playerOption2, newModel.players),
					showPopUp: false
				});
			var model1 = _Utils_update(
				newModel,
				{
					canClick: true,
					diceState: $author$project$Definition$ActionDice,
					players: A3($elm_community$list_extra$List$Extra$setAt, newModel.currentPlayer, playerOption1, newModel.players),
					showPopUp: false
				});
			switch (clickState.$) {
				case 'Click1':
					return A2($author$project$Phase$Move$judgeActionAfterMove, model1, $author$project$Definition$NotClick);
				case 'Click2':
					return A2($author$project$Phase$Move$judgeActionAfterMove, model2, $author$project$Definition$NotClick);
				default:
					return model;
			}
		} else {
			var playerOption1 = $author$project$Definition$refreshPlayer(
				A2($author$project$Definition$get, 0, newModel.event.optionFunc)(currentPlayer));
			var model1 = _Utils_update(
				newModel,
				{
					canClick: true,
					diceState: $author$project$Definition$ActionDice,
					players: A3($elm_community$list_extra$List$Extra$setAt, newModel.currentPlayer, playerOption1, model.players),
					showPopUp: false
				});
			if (clickState.$ === 'Click1') {
				return A2($author$project$Phase$Move$judgeActionAfterMove, model1, $author$project$Definition$NotClick);
			} else {
				return model;
			}
		}
	});
var $author$project$Definition$ManageEvent = {$: 'ManageEvent'};
var $author$project$Event$SEvent2$optionFunc2_1 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 1000});
};
var $author$project$Event$SEvent2$event_2_1 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth +1000']);
	var description = 'You found grandfather\'s notepad, which recorded a series of business methods, and got the key hidden in the pages, you do not know which door to open...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent2$optionFunc2_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent2$optionFunc2_2 = function (player) {
	return player;
};
var $author$project$Event$SEvent2$event_2_2 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'After a long absence, you stepped into grandfather\'s study. You wanted to see the book that grandfather had mentioned to you all the time. Unexpectedly, it was a mechanism on the shelf, and I opened the secret door after the shelf with the key found last time.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent2$optionFunc2_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent2$optionFunc2_3 = function (player) {
	return player;
};
var $author$project$Event$SEvent2$event_2_3 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'You contacted grandfather\'s once most trusted follower, but he did not trust your ability, and did not want to help you, trying to prove yourself!';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent2$optionFunc2_3]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent2$optionFunc2_4 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (4 / 100)});
};
var $author$project$Event$SEvent2$event_2_4 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Prestige +4%']);
	var description = 'After a period of time, the head of followers contacted you actively, and you got his recognition. He began to support you in public, the old man in the underworld obviously know him, and your followers trust you more.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent2$optionFunc2_4]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent2$optionFunc2_5 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth * 1.05});
};
var $author$project$Event$SEvent2$event_2_5 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth * 1.05']);
	var description = 'This period of time the head\'s management makes you business go to a higher level. You think the future will also be able to go on so smoothly...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent2$optionFunc2_5]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent3$optionFunc3_1 = function (player) {
	return player;
};
var $author$project$Event$SEvent3$event_3_1 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'Grandpa used to say, \"When you hit a bottleneck, open my secret safe.\" You think that time has come at last. You got a dead cell phone, and you decided just to charge it up and come back later.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent3$optionFunc3_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent3$optionFunc3_2 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (3 / 100)});
};
var $author$project$Event$SEvent3$event_3_2 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Popular Will +3%']);
	var description = 'You suddenly recall the old days of grandpa, and now under your leadership, the family is not as good as before, which let you miss and feel a little ashamed. \"Grandpa disappeared for no apparent reason. If he were still here...\" At the same time you are reminded of what he had taught you.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent3$optionFunc3_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent3$optionFunc3_3 = function (player) {
	return _Utils_update(
		player,
		{wealth: player.wealth + 2000});
};
var $author$project$Event$SEvent3$event_3_3 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Wealth +2000']);
	var description = 'You suddenly thought back to the phone. When you opened it, it\'s just a phone number in your address book. You dialed the number and all you hear was the phrase \"Not yet...\", the call was then hung up, but you received a text message that turned out to be some of your family\'s hidden assets.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent3$optionFunc3_3]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent3$optionFunc3_4 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige + (3 / 100)});
};
var $author$project$Event$SEvent3$event_3_4 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Prestige +3%']);
	var description = 'Some time later, you received another text message, revealing some of the family\'s old relationships. You became more and more curious about who this person is...';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent3$optionFunc3_4]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent3$optionFunc3_5 = function (player) {
	return _Utils_update(
		player,
		{prestige: player.prestige * 1.05});
};
var $author$project$Event$SEvent3$event_3_5 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Prestige * 1.05']);
	var description = 'One day, you received a MMS message. It was a photo of your grandfather at the beach. \"It turned out to be my grandfather pretending to be missing but actually running away.\" And the more confident you became in the management of your family.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent3$optionFunc3_5]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent4$optionFunc4_1 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention - (2 / 100)});
};
var $author$project$Event$SEvent4$event_4_1 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Police Attention -2%']);
	var description = 'Your family has got along well with the police for generations. In this case, as the family motto goes, \"Only a fool goes to prison.\"';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent4$optionFunc4_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent4$optionFunc4_2 = function (player) {
	return player;
};
var $author$project$Event$SEvent4$event_4_2 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'Although it is good for the family, you actually despise the policemen who are good friends with the family, because they cannot stand up for their own justice as policemen.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent4$optionFunc4_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent4$optionFunc4_3 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention + (2 / 100)});
};
var $author$project$Event$SEvent4$event_4_3 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Police Attention +2%']);
	var description = 'Your bad attitude towards the police also affects the relationship between the family and the police to some extent.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent4$optionFunc4_3]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent4$optionFunc4_4 = function (player) {
	return player;
};
var $author$project$Event$SEvent4$event_4_4 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'On the road, you saw the police enforcing the law impartially, and you wondered, \"Is this bullying? Just like what we do?\" Have they really lost the sense of justice that they had when working as the police at first?';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent4$optionFunc4_4]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent4$optionFunc4_5 = function (player) {
	return _Utils_update(
		player,
		{policeAttention: player.policeAttention * 0.95});
};
var $author$project$Event$SEvent4$event_4_5 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Police Attention * 0.95']);
	var description = 'You heard the young police ask, \"Why do we know what the gang have done but don\'t disclose them?\" The old police officer said, \"Because this will only lead to more chaos, not just in the gangs, but in all the people.\" So is this also a kind of justice? Your recognition of them has strengthened.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent4$optionFunc4_5]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent5$optionFunc5_1 = function (player) {
	return player;
};
var $author$project$Event$SEvent5$event_5_1 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'There is a medium in your family, and he has got along well with the family since the generation of his grandfather, but you do not believe his words, you do not know why the family get along with him.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent5$optionFunc5_1]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent5$optionFunc5_2 = function (player) {
	return player;
};
var $author$project$Event$SEvent5$event_5_2 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = '\"The Lord is too young...\" You heard the medium talking to your followers, and you felt angry because you felt that he thought you were too young to take on great responsibilities. You were being belittled.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent5$optionFunc5_2]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent5$optionFunc5_3 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill + (3 / 100)});
};
var $author$project$Event$SEvent5$event_5_3 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Popular Will +3%']);
	var description = 'One day, you see him in the street \"bamboozle people\", you felt contempt for him. But you were moved when seeing the relief on people\'s faces after they questioned him.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent5$optionFunc5_3]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent5$optionFunc5_4 = function (player) {
	return player;
};
var $author$project$Event$SEvent5$event_5_4 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Nothing happens']);
	var description = 'You began to wonder why your neighborhood was always less grumpy and more calm than other gangs. You decided to have a good talk with the medium one day.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent5$optionFunc5_4]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent5$optionFunc5_5 = function (player) {
	return _Utils_update(
		player,
		{popularWill: player.popularWill * 1.05});
};
var $author$project$Event$SEvent5$event_5_5 = function (model) {
	var optionDescription = _List_fromArray(
		['OK.']);
	var hint = _List_fromArray(
		['Popular Will * 1.05']);
	var description = 'After talking to him, you realized that it was obviously better to call him a psychologist, even though he\'s all babbling. Although he appeared as a medium, his purpose is to comfort other\'s heart. You see the importance of taking people\'s moods into account.';
	var event = A4(
		$author$project$Definition$Event,
		description,
		optionDescription,
		_List_fromArray(
			[$author$project$Event$SEvent5$optionFunc5_5]),
		hint);
	return _Utils_update(
		model,
		{event: event});
};
var $author$project$Event$SEvent2$judgeEvent_2_1 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Lance) && (player.storyRound === 4)) ? _Utils_Tuple2(true, '2_1') : _Utils_Tuple2(false, '2_1');
};
var $author$project$Event$SEvent2$judgeEvent_2_2 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Lance) && (player.storyRound === 8)) ? _Utils_Tuple2(true, '2_2') : _Utils_Tuple2(false, '2_2');
};
var $author$project$Event$SEvent2$judgeEvent_2_3 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Lance) && (player.storyRound === 12)) ? _Utils_Tuple2(true, '2_3') : _Utils_Tuple2(false, '2_3');
};
var $author$project$Event$SEvent2$judgeEvent_2_4 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Lance) && (player.storyRound === 16)) ? _Utils_Tuple2(true, '2_4') : _Utils_Tuple2(false, '2_4');
};
var $author$project$Event$SEvent2$judgeEvent_2_5 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Lance) && (player.storyRound === 20)) ? _Utils_Tuple2(true, '2_5') : _Utils_Tuple2(false, '2_5');
};
var $author$project$Event$SEvent3$judgeEvent_3_1 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Gorman) && (player.storyRound === 4)) ? _Utils_Tuple2(true, '3_1') : _Utils_Tuple2(false, '3_1');
};
var $author$project$Event$SEvent3$judgeEvent_3_2 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Gorman) && (player.storyRound === 8)) ? _Utils_Tuple2(true, '3_2') : _Utils_Tuple2(false, '3_2');
};
var $author$project$Event$SEvent3$judgeEvent_3_3 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Gorman) && (player.storyRound === 12)) ? _Utils_Tuple2(true, '3_3') : _Utils_Tuple2(false, '3_3');
};
var $author$project$Event$SEvent3$judgeEvent_3_4 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Gorman) && (player.storyRound === 16)) ? _Utils_Tuple2(true, '3_4') : _Utils_Tuple2(false, '3_4');
};
var $author$project$Event$SEvent3$judgeEvent_3_5 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Gorman) && (player.storyRound === 20)) ? _Utils_Tuple2(true, '3_5') : _Utils_Tuple2(false, '3_5');
};
var $author$project$Event$SEvent4$judgeEvent_4_1 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Doherty) && (player.storyRound === 4)) ? _Utils_Tuple2(true, '4_1') : _Utils_Tuple2(false, '4_1');
};
var $author$project$Event$SEvent4$judgeEvent_4_2 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Doherty) && (player.storyRound === 8)) ? _Utils_Tuple2(true, '4_2') : _Utils_Tuple2(false, '4_2');
};
var $author$project$Event$SEvent4$judgeEvent_4_3 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Doherty) && (player.storyRound === 12)) ? _Utils_Tuple2(true, '4_3') : _Utils_Tuple2(false, '4_3');
};
var $author$project$Event$SEvent4$judgeEvent_4_4 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Doherty) && (player.storyRound === 16)) ? _Utils_Tuple2(true, '4_4') : _Utils_Tuple2(false, '4_4');
};
var $author$project$Event$SEvent4$judgeEvent_4_5 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Doherty) && (player.storyRound === 20)) ? _Utils_Tuple2(true, '4_5') : _Utils_Tuple2(false, '4_5');
};
var $author$project$Event$SEvent5$judgeEvent_5_1 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Blair) && (player.storyRound === 4)) ? _Utils_Tuple2(true, '5_1') : _Utils_Tuple2(false, '5_1');
};
var $author$project$Event$SEvent5$judgeEvent_5_2 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Blair) && (player.storyRound === 8)) ? _Utils_Tuple2(true, '5_2') : _Utils_Tuple2(false, '5_2');
};
var $author$project$Event$SEvent5$judgeEvent_5_3 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Blair) && (player.storyRound === 12)) ? _Utils_Tuple2(true, '5_3') : _Utils_Tuple2(false, '5_3');
};
var $author$project$Event$SEvent5$judgeEvent_5_4 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Blair) && (player.storyRound === 16)) ? _Utils_Tuple2(true, '5_4') : _Utils_Tuple2(false, '5_4');
};
var $author$project$Event$SEvent5$judgeEvent_5_5 = function (player) {
	return (_Utils_eq(player.character, $author$project$Definition$Blair) && (player.storyRound === 20)) ? _Utils_Tuple2(true, '5_5') : _Utils_Tuple2(false, '5_5');
};
var $author$project$Event$Event$storyIndicatorToEvent = F2(
	function (indicator, event) {
		var indicatorList = A2($elm$core$String$split, '_', indicator);
		var part1 = $author$project$Definition$toIntSure(
			A2($author$project$Definition$get, 0, indicatorList));
		var part2 = $author$project$Definition$toIntSure(
			A2($author$project$Definition$get, 1, indicatorList));
		return A2($author$project$Definition$get, ((part1 - 2) * 5) + (part2 - 1), event);
	});
var $author$project$Event$Event$chooseStoryEvent = function (model) {
	var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
	var judgeEventList = _List_fromArray(
		[$author$project$Event$SEvent2$judgeEvent_2_1, $author$project$Event$SEvent2$judgeEvent_2_2, $author$project$Event$SEvent2$judgeEvent_2_3, $author$project$Event$SEvent2$judgeEvent_2_4, $author$project$Event$SEvent2$judgeEvent_2_5, $author$project$Event$SEvent3$judgeEvent_3_1, $author$project$Event$SEvent3$judgeEvent_3_2, $author$project$Event$SEvent3$judgeEvent_3_3, $author$project$Event$SEvent3$judgeEvent_3_4, $author$project$Event$SEvent3$judgeEvent_3_5, $author$project$Event$SEvent4$judgeEvent_4_1, $author$project$Event$SEvent4$judgeEvent_4_2, $author$project$Event$SEvent4$judgeEvent_4_3, $author$project$Event$SEvent4$judgeEvent_4_4, $author$project$Event$SEvent4$judgeEvent_4_5, $author$project$Event$SEvent5$judgeEvent_5_1, $author$project$Event$SEvent5$judgeEvent_5_2, $author$project$Event$SEvent5$judgeEvent_5_3, $author$project$Event$SEvent5$judgeEvent_5_4, $author$project$Event$SEvent5$judgeEvent_5_5]);
	var filteredList = A2(
		$elm$core$List$filter,
		function (func) {
			return func(player).a;
		},
		judgeEventList);
	var eventList = _List_fromArray(
		[$author$project$Event$SEvent2$event_2_1, $author$project$Event$SEvent2$event_2_2, $author$project$Event$SEvent2$event_2_3, $author$project$Event$SEvent2$event_2_4, $author$project$Event$SEvent2$event_2_5, $author$project$Event$SEvent3$event_3_1, $author$project$Event$SEvent3$event_3_2, $author$project$Event$SEvent3$event_3_3, $author$project$Event$SEvent3$event_3_4, $author$project$Event$SEvent3$event_3_5, $author$project$Event$SEvent4$event_4_1, $author$project$Event$SEvent4$event_4_2, $author$project$Event$SEvent4$event_4_3, $author$project$Event$SEvent4$event_4_4, $author$project$Event$SEvent4$event_4_5, $author$project$Event$SEvent5$event_5_1, $author$project$Event$SEvent5$event_5_2, $author$project$Event$SEvent5$event_5_3, $author$project$Event$SEvent5$event_5_4, $author$project$Event$SEvent5$event_5_5]);
	var _v0 = $elm$core$List$length(filteredList);
	if (!_v0) {
		return model;
	} else {
		var randomIndex = A2(
			$elm$core$Basics$modBy,
			$elm$core$List$length(filteredList),
			model.randomNumber);
		var randomEventJudge = A2($author$project$Definition$get, randomIndex, filteredList);
		var indicator = randomEventJudge(player).b;
		var event = A2($author$project$Event$Event$storyIndicatorToEvent, indicator, eventList);
		return event(model);
	}
};
var $author$project$Event$Event$chooseAnEvent = function (model) {
	return $author$project$Event$Event$chooseStoryEvent(
		A2(
			$author$project$Event$Event$chooseRandomEvent,
			A2($author$project$Definition$get, model.currentPlayer, model.players),
			model));
};
var $author$project$Phase$Move$setStoryRound = function (model) {
	var round = model.round;
	var players = model.players;
	var newPlayers = A2(
		$elm$core$List$map,
		function (x) {
			return _Utils_update(
				x,
				{storyRound: round.index});
		},
		players);
	return _Utils_update(
		model,
		{players: newPlayers});
};
var $author$project$Phase$Move$move = F2(
	function (model, clickState) {
		var storyRoundModel = $author$project$Phase$Move$setStoryRound(model);
		var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
		var newPlayer = _Utils_update(
			player,
			{popularWill: player.popularWill + 0.1, wealth: player.wealth + 5000});
		var newModel = $author$project$Event$Event$chooseAnEvent(storyRoundModel);
		var chooseEventButtons = function (numbers) {
			return (numbers === 1) ? _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$ManageEvent, $author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '75%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '12.5%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '77%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title(
							A2($author$project$Definition$get, 0, newModel.event.hint)),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							A2($author$project$Definition$get, 0, newModel.event.optionDescription))
						]))
				]) : _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$ManageEvent, $author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '75%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '12.5%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '70%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title(
							A2($author$project$Definition$get, 0, newModel.event.hint)),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							A2($author$project$Definition$get, 0, newModel.event.optionDescription))
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$ManageEvent, $author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '75%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '12.5%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '85%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title(
							A2($author$project$Definition$get, 1, newModel.event.hint)),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(
							A2($author$project$Definition$get, 1, newModel.event.optionDescription))
						]))
				]);
		};
		var eventPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: chooseEventButtons(
				$elm$core$List$length(newModel.event.optionFunc)),
			descriptionText: newModel.event.description,
			title: 'Event'
		};
		var finalPopUp = $author$project$Phase$Move$throughHome(model) ? {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$Move, $author$project$Definition$Click4)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('I deserve it.')
						]))
				]),
			descriptionText: 'Welcome home, you get Wealth +5000 and Popular Will +10%.',
			title: 'Reward'
		} : eventPopUp;
		if (clickState.$ === 'Click4') {
			return _Utils_update(
				newModel,
				{
					players: A3($elm_community$list_extra$List$Extra$setAt, model.currentPlayer, newPlayer, model.players),
					showEndButton: false,
					showPopUp: true,
					viewPopUp: eventPopUp
				});
		} else {
			return _Utils_update(
				newModel,
				{showEndButton: false, showPopUp: true, viewPopUp: finalPopUp});
		}
	});
var $author$project$Phase$Move$upgrade = F2(
	function (model, clickState) {
		switch (clickState.$) {
			case 'Click1':
				return $author$project$Phase$Move$upgradeBuilding(model);
			case 'Click2':
				return _Utils_update(
					model,
					{showPopUp: false});
			default:
				return model;
		}
	});
var $author$project$Phase$Move$movePhase = F3(
	function (model, subPhase, clickState) {
		switch (subPhase.$) {
			case 'Move':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Move$move, model, clickState));
			case 'ManageEvent':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Move$manageEvent, model, clickState));
			case 'AfterMove':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Move$judgeActionAfterMove, model, clickState));
			case 'AttackAfterMove':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Move$attackAfterMove, model, clickState));
			case 'UpgradeAfterMove':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Move$upgrade, model, clickState));
			default:
				return model;
		}
	});
var $author$project$Update$onJailCount = function (model) {
	var viewPopUp = {
		backgroundImage: 'url(./src/image/event.jpg)',
		buttons: _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$EndPhase, $author$project$Definition$CountWealth, $author$project$Definition$Click1)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonYes
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('OK')
					]))
			]),
		descriptionText: 'Income: \n Protection fee: ' + (A2(
			$myrho$elm_round$Round$round,
			0,
			$author$project$Phase$Implementation$calculatePF(model)) + (' \n Expenditure: familyCost: -' + (A2(
			$myrho$elm_round$Round$round,
			0,
			$author$project$Map$familyCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players)) / 3) + (' \n Bribe: -' + ($elm$core$Debug$toString(
			$author$project$Map$policeReduceCost(
				A2($author$project$Definition$get, model.currentPlayer, model.players))) + ('          ' + ($author$project$Phase$Implementation$prestigeCount(model) + ($author$project$Phase$Implementation$policeAttentionCount(model) + ($author$project$Phase$Implementation$popularWillCount(model) + $author$project$Phase$Implementation$policeAttentionBribe(model)))))))))),
		title: 'Count Wealth'
	};
	return _Utils_update(
		model,
		{showPopUp: true, viewPopUp: viewPopUp});
};
var $author$project$Update$playerDice = function (model) {
	var players = model.players;
	var newPlayers = A2(
		$elm$core$List$map,
		function (player) {
			return _Utils_update(
				player,
				{dice: model.dice});
		},
		players);
	return newPlayers;
};
var $author$project$Definition$AdjustMoneyPolice = function (a) {
	return {$: 'AdjustMoneyPolice', a: a};
};
var $author$project$Definition$High = {$: 'High'};
var $author$project$Definition$Low = {$: 'Low'};
var $author$project$Phase$Prepare$adjustMoneyFamily = F2(
	function (model, clickState) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$PreparationPhase,
								$author$project$Definition$AdjustMoneyPolice($author$project$Definition$Low),
								$author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Low')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$PreparationPhase,
								$author$project$Definition$AdjustMoneyPolice($author$project$Definition$Medium),
								$author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Medium')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$PreparationPhase,
								$author$project$Definition$AdjustMoneyPolice($author$project$Definition$High),
								$author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '70'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('High')
						]))
				]),
			descriptionText: 'Click to adjust your money spending on bribing the police.',
			title: 'Adjust police bribery costs.'
		};
		var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
		switch (clickState.$) {
			case 'Click1':
				return _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{familyLevel: $author$project$Definition$Low}),
							model.players),
						showEndButton: false,
						viewPopUp: viewPopUp
					});
			case 'Click2':
				return _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{familyLevel: $author$project$Definition$Medium}),
							model.players),
						showEndButton: false,
						viewPopUp: viewPopUp
					});
			case 'Click3':
				return _Utils_update(
					model,
					{
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{familyLevel: $author$project$Definition$High}),
							model.players),
						showEndButton: false,
						viewPopUp: viewPopUp
					});
			default:
				return model;
		}
	});
var $author$project$Definition$Dice = {$: 'Dice'};
var $author$project$Definition$OnJailCount = {$: 'OnJailCount'};
var $author$project$Phase$Prepare$adjustMoneyPolice = F2(
	function (model, clickState) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$OnJailCount),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('I‘ll be back!')
						]))
				]),
			descriptionText: 'Life in the Jail is not easy...',
			title: 'Jail'
		};
		var player = A2($author$project$Definition$get, model.currentPlayer, model.players);
		switch (clickState.$) {
			case 'Click1':
				return (player.jailRound > 0) ? _Utils_update(
					model,
					{
						canClick: false,
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{jailRound: player.jailRound - 1, policeReduceLevel: $author$project$Definition$Low}),
							model.players),
						showPopUp: true,
						viewPopUp: viewPopUp
					}) : _Utils_update(
					model,
					{
						diceState: $author$project$Definition$Dice,
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{policeReduceLevel: $author$project$Definition$Low}),
							model.players),
						showPopUp: false
					});
			case 'Click2':
				return (player.jailRound > 0) ? _Utils_update(
					model,
					{
						canClick: false,
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{jailRound: player.jailRound - 1, policeReduceLevel: $author$project$Definition$Medium}),
							model.players),
						showPopUp: true,
						viewPopUp: viewPopUp
					}) : _Utils_update(
					model,
					{
						diceState: $author$project$Definition$Dice,
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{policeReduceLevel: $author$project$Definition$Medium}),
							model.players),
						showPopUp: false
					});
			case 'Click3':
				return (player.jailRound > 0) ? _Utils_update(
					model,
					{
						canClick: false,
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{jailRound: player.jailRound - 1, policeReduceLevel: $author$project$Definition$High}),
							model.players),
						showPopUp: true,
						viewPopUp: viewPopUp
					}) : _Utils_update(
					model,
					{
						diceState: $author$project$Definition$Dice,
						players: A3(
							$elm_community$list_extra$List$Extra$setAt,
							model.currentPlayer,
							_Utils_update(
								player,
								{policeReduceLevel: $author$project$Definition$High}),
							model.players),
						showPopUp: false
					});
			default:
				return model;
		}
	});
var $author$project$Definition$AdjustMoneyFamily = function (a) {
	return {$: 'AdjustMoneyFamily', a: a};
};
var $author$project$Definition$characterName = function (model) {
	var _v0 = model.character;
	switch (_v0.$) {
		case 'Lance':
			return 'With a Silver Spoon -- Lance';
		case 'Gorman':
			return 'The Last Glorious -- Gorman';
		case 'Doherty':
			return 'Social Butterfly -- Doherty';
		case 'Blair':
			return 'Fertile -- Blair';
		default:
			return 'Dummy -- Dummy';
	}
};
var $author$project$Phase$Prepare$initControl = function (model) {
	var home4 = A2($author$project$Definition$get, 51, model.map);
	var home3 = A2($author$project$Definition$get, 34, model.map);
	var home2 = A2($author$project$Definition$get, 17, model.map);
	var home1 = A2($author$project$Definition$get, 0, model.map);
	var map1 = A3(
		$elm_community$list_extra$List$Extra$setAt,
		0,
		_Utils_update(
			home1,
			{
				owner: A2($elm_community$list_extra$List$Extra$getAt, 0, model.players)
			}),
		model.map);
	var map2 = A3(
		$elm_community$list_extra$List$Extra$setAt,
		17,
		_Utils_update(
			home2,
			{
				owner: A2($elm_community$list_extra$List$Extra$getAt, 1, model.players)
			}),
		map1);
	var map3 = A3(
		$elm_community$list_extra$List$Extra$setAt,
		34,
		_Utils_update(
			home3,
			{
				owner: A2($elm_community$list_extra$List$Extra$getAt, 2, model.players)
			}),
		map2);
	var map4 = A3(
		$elm_community$list_extra$List$Extra$setAt,
		51,
		_Utils_update(
			home4,
			{
				owner: A2($elm_community$list_extra$List$Extra$getAt, 3, model.players)
			}),
		map3);
	return _Utils_update(
		model,
		{map: map4});
};
var $author$project$Phase$Prepare$reInit = function (model) {
	var changeFirstPlayer = function () {
		var _v0 = model.character;
		switch (_v0.$) {
			case 'Lance':
				return 0;
			case 'Gorman':
				return 1;
			case 'Doherty':
				return 2;
			case 'Blair':
				return 3;
			default:
				return 3;
		}
	}();
	var player = A2($author$project$Definition$get, changeFirstPlayer, model.players);
	var newPlayer = _Utils_update(
		player,
		{isHuman: true});
	var judgeHuman = A3($elm_community$list_extra$List$Extra$setAt, changeFirstPlayer, newPlayer, model.players);
	var newModel = _Utils_update(
		model,
		{currentPlayer: changeFirstPlayer, players: judgeHuman, showEndButton: false});
	var controlModel = $author$project$Phase$Prepare$initControl(newModel);
	return controlModel;
};
var $author$project$Phase$Prepare$letUsStart = F2(
	function (model, clickState) {
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$PreparationPhase,
								$author$project$Definition$AdjustMoneyFamily($author$project$Definition$Low),
								$author$project$Definition$Click1)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Low')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$PreparationPhase,
								$author$project$Definition$AdjustMoneyFamily($author$project$Definition$Medium),
								$author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Medium')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$PreparationPhase,
								$author$project$Definition$AdjustMoneyFamily($author$project$Definition$High),
								$author$project$Definition$Click3)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '70%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('High')
						]))
				]),
			descriptionText: 'Click to adjust your money spending on maintaining your family member.',
			title: 'Adjust Family member maintenance cost.'
		};
		var resetModel = $author$project$Phase$Prepare$reInit(model);
		var motto = function () {
			var _v2 = resetModel.character;
			switch (_v2.$) {
				case 'Lance':
					return 'Money is Power!';
				case 'Gorman':
					return 'Nobility is my sword!';
				case 'Doherty':
					return 'Only a fool goes to prison.';
				case 'Blair':
					return 'Quantity is the king of war.';
				default:
					return ' ';
			}
		}();
		var characterDescription = function () {
			var _v1 = resetModel.character;
			switch (_v1.$) {
				case 'Lance':
					return 'Our family\'s ancestors accumulated huge wealth and capital and controlled half of the town\'s trade and we firmly believe that the power of money was infinite. Now, we’ve endured for too many years, and it\'s time to defeat them with endless wealth.';
				case 'Gorman':
					return 'Thirty years ago, our family was the ruler of the town, but the cursed capitalists, slaves and robbers took everything out of my family’s control. Now, I\'m back, with the honor and mission that my family has given me, claiming everything that belongs to my family.';
				case 'Doherty':
					return 'My father and brother died in the gunfight, which made me have to take over the family. After a series of suffering and failure, I learned the skills of building strong relationship network and dealing with different forces. The town will soon succumb to my charm.';
				case 'Blair':
					return 'As the oldest family in the town, the Blair family has lived and thrived on this land for hundreds of years. Kings, parliaments, revolutionaries, capitalists, we witnessed their coming and leaving one after another, growing our family day after day. Quantity is the king of war, and the countless members will wipe out all opposition.';
				default:
					return ' ';
			}
		}();
		var viewPopUp2 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click2)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '30%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$rtfeldman$elm_css$Html$Styled$Attributes$title('I\'m the King!'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(motto)
						]))
				]),
			descriptionText: characterDescription,
			title: $author$project$Definition$characterName(resetModel)
		};
		switch (clickState.$) {
			case 'Click2':
				return _Utils_update(
					model,
					{bgm: true, showEndButton: false, viewPopUp: viewPopUp});
			case 'Click1':
				return _Utils_update(
					resetModel,
					{bgm: true, showEndButton: false, viewPopUp: viewPopUp2});
			case 'Click3':
				return $author$project$Model$init('Lance').a;
			case 'Click4':
				return $author$project$Model$init('Gorman').a;
			case 'Click5':
				return $author$project$Model$init('Doherty').a;
			case 'Click6':
				return $author$project$Model$init('Blair').a;
			default:
				return resetModel;
		}
	});
var $author$project$Phase$Prepare$preparePhase = F3(
	function (model, subPhase, clickState) {
		switch (subPhase.$) {
			case 'LetUsStart':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Prepare$letUsStart, model, clickState));
			case 'AdjustMoneyFamily':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Prepare$adjustMoneyFamily, model, clickState));
			case 'AdjustMoneyPolice':
				return $author$project$Condition$regularRefresh(
					A2($author$project$Phase$Prepare$adjustMoneyPolice, model, clickState));
			default:
				return model;
		}
	});
var $author$project$Update$randomNumber = $elm$core$Platform$Cmd$batch(
	_List_fromArray(
		[
			A2(
			$elm$random$Random$generate,
			$author$project$Definition$RandomNumber,
			A2($elm$random$Random$int, 1, 100))
		]));
var $author$project$Style$buttonNo = $rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2($rtfeldman$elm_css$Css$property, 'width', '220px'),
			A2($rtfeldman$elm_css$Css$property, 'height', '50px'),
			A2($rtfeldman$elm_css$Css$property, 'border', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'outline', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'color', '#111'),
			A2($rtfeldman$elm_css$Css$property, 'background', '#fff'),
			A2($rtfeldman$elm_css$Css$property, 'position', 'relative'),
			A2($rtfeldman$elm_css$Css$property, 'z-index', '0'),
			A2($rtfeldman$elm_css$Css$property, 'border-radius', '10px'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'url(./src/img/cursor.cur),move'),
			$rtfeldman$elm_css$Css$before(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'content', '\'\''),
					A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)'),
					A2($rtfeldman$elm_css$Css$property, 'position', 'absolute'),
					A2($rtfeldman$elm_css$Css$property, 'top', '-2px'),
					A2($rtfeldman$elm_css$Css$property, 'left', '-2px'),
					A2($rtfeldman$elm_css$Css$property, 'background-size', '400%'),
					A2($rtfeldman$elm_css$Css$property, 'z-index', '-1'),
					A2($rtfeldman$elm_css$Css$property, 'filter', 'blur(5px)'),
					A2($rtfeldman$elm_css$Css$property, 'width', 'calc(100% + 4px)'),
					A2($rtfeldman$elm_css$Css$property, 'height', 'calc(100% + 4px)'),
					$rtfeldman$elm_css$Css$animationName(
					$rtfeldman$elm_css$Css$Animations$keyframes(
						_List_fromArray(
							[
								_Utils_Tuple2(
								0,
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0 0')
									])),
								_Utils_Tuple2(
								50,
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '400% 0')
									])),
								_Utils_Tuple2(
								100,
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0 0')
									]))
							]))),
					$rtfeldman$elm_css$Css$animationDuration(
					$rtfeldman$elm_css$Css$sec(30)),
					A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
					A2($rtfeldman$elm_css$Css$property, 'opacity', '0'),
					A2($rtfeldman$elm_css$Css$property, 'transition', 'opacity .3s ease-in-out'),
					A2($rtfeldman$elm_css$Css$property, 'border-radius', '10px')
				])),
			$rtfeldman$elm_css$Css$active(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'color', '#fff')
				])),
			$rtfeldman$elm_css$Css$active(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$after(
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Css$property, 'background', 'transparent')
						]))
				])),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					$rtfeldman$elm_css$Css$before(
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Css$property, 'opacity', '1')
						]))
				])),
			$rtfeldman$elm_css$Css$after(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'z-index', '-1'),
					A2($rtfeldman$elm_css$Css$property, 'content', '\'\''),
					A2($rtfeldman$elm_css$Css$property, 'position', 'absolute'),
					A2($rtfeldman$elm_css$Css$property, 'width', '100%'),
					A2($rtfeldman$elm_css$Css$property, 'height', '100%'),
					A2($rtfeldman$elm_css$Css$property, 'background', '#fff'),
					A2($rtfeldman$elm_css$Css$property, 'left', '0'),
					A2($rtfeldman$elm_css$Css$property, 'top', '0'),
					A2($rtfeldman$elm_css$Css$property, 'border-radius', '10-px')
				]))
		]));
var $author$project$Update$reselectTile = F4(
	function (model, tileIndex, buttonNumber, indicator) {
		var description = function () {
			switch (indicator) {
				case 'policeStation':
					return 'You can\'t select police station to add member or fight.';
				case 'jail':
					return 'You can\'t select jail to add member pr fight.';
				case 'noOthers':
					return 'No one can fight with you here!';
				case 'noMember':
					return 'You have no member here.';
				default:
					return ' ';
			}
		}();
		var addOrFight = _Utils_eq(
			A2($author$project$Definition$get, buttonNumber, model.actionDice),
			$author$project$Definition$FightDice) ? 'fight' : 'add';
		var title = function () {
			switch (addOrFight) {
				case 'fight':
					return 'Can\'t launch a battle here.';
				case 'add':
					return 'Can\'t send members here.';
				default:
					return ' ';
			}
		}();
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							_Utils_eq(
							A2($author$project$Definition$get, buttonNumber, model.actionDice),
							$author$project$Definition$FightDice) ? $rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
								$author$project$Definition$Click5)) : $rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$AddDice, buttonNumber),
								$author$project$Definition$Click5)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonNo
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('OK')
						]))
				]),
			descriptionText: description + ' Click to give up.',
			title: title
		};
		return _Utils_update(
			model,
			{canSelectTile: false, selectedTileIndex: tileIndex, showPopUp: true, viewPopUp: viewPopUp});
	});
var $author$project$Update$restart = function (model) {
	var viewPopUp = {
		backgroundImage: 'url(./src/image/event.jpg)',
		buttons: _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click3)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '4%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonNo
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Lance')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click4)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '28%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonNo
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Gorman')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click5)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '52%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonNo
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Doherty')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick(
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$PreparationPhase, $author$project$Definition$LetUsStart, $author$project$Definition$Click6)),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '76%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
						$author$project$Style$buttonNo
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Blair')
					]))
			]),
		descriptionText: 'Which family do you want to choose?',
		title: 'Restart'
	};
	return _Utils_update(
		model,
		{showPopUp: true, viewPopUp: viewPopUp});
};
var $author$project$Update$selectTile = F3(
	function (model, tileIndex, buttonNumber) {
		var viewPopUpCanNotAdd = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$AddDice, buttonNumber),
								$author$project$Definition$Click5)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Oh...')
						]))
				]),
			descriptionText: 'You can\'t send family to this tile since we don\'t have enough influence around there.',
			title: 'Can\'t send members here'
		};
		var viewPopUp = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							_Utils_eq(
							A2($author$project$Definition$get, buttonNumber, model.actionDice),
							$author$project$Definition$FightDice) ? $rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
								$author$project$Definition$Click4)) : $rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$AddDice, buttonNumber),
								$author$project$Definition$Click4)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '30%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('Yes')
						])),
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							_Utils_eq(
							A2($author$project$Definition$get, buttonNumber, model.actionDice),
							$author$project$Definition$FightDice) ? $rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
								$author$project$Definition$Click5)) : $rtfeldman$elm_css$Html$Styled$Events$onClick(
							A3(
								$author$project$Definition$StartGameMessage,
								$author$project$Definition$ImplementationPhase,
								A2($author$project$Definition$UseActionDice, $author$project$Definition$AddDice, buttonNumber),
								$author$project$Definition$Click5)),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonNo
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('No')
						]))
				]),
			descriptionText: 'Click to confirm or give up.',
			title: 'Do you want to select this tile?'
		};
		var tile = A2($author$project$Definition$get, tileIndex, model.map);
		var preTile = A2(
			$author$project$Definition$get,
			A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				tileIndex - 1),
			model.map);
		var playerIndex = model.currentPlayer;
		var nextTile = A2(
			$author$project$Definition$get,
			A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				tileIndex + 1),
			model.map);
		var judgeCanAdd = !(!((A2($author$project$Definition$get, playerIndex, preTile.familyMember) + A2($author$project$Definition$get, playerIndex, nextTile.familyMember)) + A2($author$project$Definition$get, playerIndex, tile.familyMember)));
		return ((_Utils_eq(
			A2($author$project$Definition$get, buttonNumber, model.actionDice),
			$author$project$Definition$AddDice) && judgeCanAdd) || _Utils_eq(
			A2($author$project$Definition$get, buttonNumber, model.actionDice),
			$author$project$Definition$FightDice)) ? _Utils_update(
			model,
			{canSelectTile: false, selectedTileIndex: tileIndex, showPopUp: true, viewPopUp: viewPopUp}) : _Utils_update(
			model,
			{canSelectTile: false, selectedTileIndex: tileIndex, showPopUp: true, viewPopUp: viewPopUpCanNotAdd});
	});
var $author$project$Update$updatePlayer = function (model) {
	var currentPlayer = $author$project$Animation$getCurrentPlayer(model);
	var modList = function () {
		var fun = function (num) {
			return A2(
				$elm$core$Basics$modBy,
				$elm$core$List$length(model.map),
				num);
		};
		return A2(
			$elm$core$List$map,
			fun,
			A2($elm$core$List$range, currentPlayer.currentIndex, currentPlayer.currentIndex + model.dice));
	}();
	var frameList = A2($author$project$Animation$convertToFrame, modList, model.map);
	var newIndex = A2(
		$elm$core$Basics$modBy,
		$elm$core$List$length(model.map),
		currentPlayer.currentIndex + model.dice);
	var newPos = A2(
		$elm$core$Maybe$withDefault,
		_Utils_Tuple2(0, 0),
		A2(
			$elm_community$list_extra$List$Extra$getAt,
			newIndex,
			A2(
				$elm$core$List$map,
				function (_this) {
					return _this.position;
				},
				model.map)));
	var updated = _Utils_update(
		currentPlayer,
		{currentIndex: newIndex, currentPos: newPos, frameList: frameList});
	return _Utils_ap(
		A2($elm$core$List$take, model.currentPlayer, model.players),
		_Utils_ap(
			_List_fromArray(
				[updated]),
			A2($elm$core$List$drop, model.currentPlayer + 1, model.players)));
};
var $author$project$Update$play = F2(
	function (msg, model) {
		var movedModel = $author$project$Animation$checkMap(model);
		switch (msg.$) {
			case 'StartGameMessage':
				var phase = msg.a;
				var subPhase = msg.b;
				var clickState = msg.c;
				switch (phase.$) {
					case 'PreparationPhase':
						return _Utils_Tuple2(
							A3($author$project$Phase$Prepare$preparePhase, movedModel, subPhase, clickState),
							A2($author$project$Update$chooseMsgForInit, subPhase, clickState));
					case 'MovePhase':
						return _Utils_Tuple2(
							A3($author$project$Phase$Move$movePhase, movedModel, subPhase, clickState),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2(
										$elm$random$Random$generate,
										$author$project$Definition$RandomNumber,
										A2($elm$random$Random$int, 1, 100)),
										A2(
										$elm$random$Random$generate,
										$author$project$Definition$AiRandomNumber,
										A2(
											$elm$random$Random$list,
											10000,
											A2($elm$random$Random$int, 1, 6)))
									])));
					case 'ImplementationPhase':
						return _Utils_Tuple2(
							A3($author$project$Phase$Implementation$implementPhase, movedModel, subPhase, clickState),
							$author$project$Update$chooseCmdMsgForImp(subPhase));
					default:
						return _Utils_Tuple2(
							A3($author$project$Phase$End$endPhase, movedModel, subPhase, clickState),
							$elm$core$Platform$Cmd$batch(
								_List_fromArray(
									[
										A2(
										$elm$random$Random$generate,
										$author$project$Definition$AiRandomNumber,
										A2(
											$elm$random$Random$list,
											100,
											A2($elm$random$Random$int, 1, 6)))
									])));
				}
			case 'Roll':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{canClick: false, showDice: $author$project$Definition$RollingDice}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								$elm$random$Random$generate,
								$author$project$Definition$NewFace,
								A2($elm$random$Random$int, 1, 6)),
								A3($andrewMacmurray$elm_delay$Delay$after, 3, $andrewMacmurray$elm_delay$Delay$Second, $author$project$Definition$StopRoll)
							])));
			case 'NewFace':
				var newFace = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{
							dice: newFace,
							players: $author$project$Update$playerDice(movedModel)
						}),
					$author$project$Update$randomNumber);
			case 'StopRoll':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{
							isMoving: true,
							moveSE: true,
							players: A2(
								$author$project$Update$changeDice,
								$author$project$Update$updatePlayer(movedModel),
								movedModel),
							showDice: $author$project$Definition$FinalDice
						}),
					A3(
						$andrewMacmurray$elm_delay$Delay$after,
						2,
						$andrewMacmurray$elm_delay$Delay$Second,
						A3($author$project$Definition$StartGameMessage, $author$project$Definition$MovePhase, $author$project$Definition$Move, $author$project$Definition$NotClick)));
			case 'RollAction':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{
							canClick: false,
							showActionDiceRespectively: _List_fromArray(
								[true, true, true]),
							showDice: $author$project$Definition$RollingMoreDice
						}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A2(
								$elm$random$Random$generate,
								$author$project$Definition$NewFaceAction,
								A2($elm$random$Random$int, 1, 216)),
								A3($andrewMacmurray$elm_delay$Delay$after, 3, $andrewMacmurray$elm_delay$Delay$Second, $author$project$Definition$StopRollAction)
							])));
			case 'NewFaceAction':
				var newFace = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{dice: newFace}),
					$author$project$Update$randomNumber);
			case 'StopRollAction':
				var newModel = $author$project$Animation$handleDiceForAction(movedModel);
				return _Utils_Tuple2(
					_Utils_update(
						newModel,
						{canClickEndAction: true, isMoving: true, showActionDice: true, showDice: $author$project$Definition$FinalMoreDice, showEndButton: true}),
					$elm$core$Platform$Cmd$none);
			case 'Side':
				return (_Utils_eq(movedModel.sideState, $author$project$Definition$NoSide) || _Utils_eq(movedModel.sideState, $author$project$Definition$HideSide)) ? _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{sideState: $author$project$Definition$ShowSide}),
					$author$project$Update$randomNumber) : _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{sideState: $author$project$Definition$HideSide}),
					$author$project$Update$randomNumber);
			case 'Top':
				return (_Utils_eq(movedModel.topState, $author$project$Definition$NoTop) || _Utils_eq(movedModel.topState, $author$project$Definition$HideTop)) ? _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{topState: $author$project$Definition$ShowTop}),
					$author$project$Update$randomNumber) : _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{topState: $author$project$Definition$HideTop}),
					$author$project$Update$randomNumber);
			case 'SpecialMoveNewFace':
				var newFace = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{dice: newFace}),
					$author$project$Update$randomNumber);
			case 'SpecialMoveStopRoll':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{
							isMoving: true,
							players: $author$project$Update$updatePlayer(movedModel),
							showDice: $author$project$Definition$FinalDice
						}),
					A3(
						$andrewMacmurray$elm_delay$Delay$after,
						2,
						$andrewMacmurray$elm_delay$Delay$Second,
						A3(
							$author$project$Definition$StartGameMessage,
							$author$project$Definition$ImplementationPhase,
							A2($author$project$Definition$UseActionDice, $author$project$Definition$NoActionDice, 10),
							$author$project$Definition$Click6)));
			case 'AddKey':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{
							control: _List_fromArray(
								[value])
						}),
					$author$project$Update$randomNumber);
			case 'RemoveKey':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{control: _List_Nil}),
					$author$project$Update$randomNumber);
			case 'SelectTile':
				var tileIndex = msg.a;
				var buttonNumber = msg.b;
				return _Utils_Tuple2(
					A3($author$project$Update$selectTile, model, tileIndex, buttonNumber),
					$author$project$Update$randomNumber);
			case 'ReselectTile':
				var tileIndex = msg.a;
				var buttonNumber = msg.b;
				var indicator = msg.c;
				return _Utils_Tuple2(
					A4($author$project$Update$reselectTile, model, tileIndex, buttonNumber, indicator),
					$author$project$Update$randomNumber);
			case 'RandomNumber':
				var number = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{randomNumber: number}),
					$elm$core$Platform$Cmd$none);
			case 'GetSize':
				var viewport = msg.a;
				var gotSizeModel = _Utils_update(
					movedModel,
					{
						windowSize: _Utils_Tuple2(
							$elm$core$Basics$round(viewport.viewport.width),
							$elm$core$Basics$round(viewport.viewport.height))
					});
				var x = $author$project$Model$initPerspective(gotSizeModel).a;
				var y = $author$project$Model$initPerspective(gotSizeModel).b;
				return _Utils_Tuple2(
					_Utils_update(
						gotSizeModel,
						{mapMoveX: x, mapMoveY: y}),
					$elm$core$Platform$Cmd$none);
			case 'UpdateSize':
				var w = msg.a;
				var h = msg.b;
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{
							windowSize: _Utils_Tuple2(w, h)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ViewDetailedTile':
				var index = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{detailTileIndex: index, viewDetailed: true}),
					$elm$core$Platform$Cmd$none);
			case 'NoDetail':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{viewDetailed: false}),
					$elm$core$Platform$Cmd$none);
			case 'EndAction':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							showActionDiceRespectively: _List_fromArray(
								[false, false, false]),
							showEndButton: false,
							showPopUp: true,
							viewPopUp: $author$project$Update$endPopUp(model)
						}),
					$author$project$Update$randomNumber);
			case 'AiRandomNumber':
				var list = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{aiRandomNumber: list}),
					$elm$core$Platform$Cmd$none);
			case 'Restart':
				return _Utils_Tuple2(
					$author$project$Update$restart(model),
					$elm$core$Platform$Cmd$none);
			case 'OnJailCount':
				return _Utils_Tuple2(
					$author$project$Update$onJailCount(movedModel),
					$author$project$Update$randomNumber);
			case 'LoadNextRound':
				return _Utils_Tuple2(
					_Utils_update(
						movedModel,
						{showEndButton: false, viewPopUp: $author$project$Update$loading}),
					$elm$core$Platform$Cmd$batch(
						_List_fromArray(
							[
								A3(
								$andrewMacmurray$elm_delay$Delay$after,
								2,
								$andrewMacmurray$elm_delay$Delay$Second,
								A3($author$project$Definition$StartGameMessage, $author$project$Definition$EndPhase, $author$project$Definition$CountWealth, $author$project$Definition$Click1))
							])));
			default:
				return _Utils_Tuple2(movedModel, $elm$core$Platform$Cmd$none);
		}
	});
var $author$project$Update$win = F2(
	function (msg, model) {
		var winner = A2($author$project$Definition$get, model.winnerIndex, model.players);
		var viewPopUp2 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Restart),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('I\'ll be back one day!')
						]))
				]),
			descriptionText: $author$project$Update$name(model.winnerIndex) + '\'s power in the town obviously overthrew us. We had to choose to retreat. The car to the East is ready.',
			title: 'Lose'
		};
		var viewPopUp1 = {
			backgroundImage: 'url(./src/image/event.jpg)',
			buttons: _List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$button,
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Restart),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-weight', 'bold'),
							$author$project$Style$buttonYes
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text('God bless us!')
						]))
				]),
			descriptionText: 'Under your wise leadership and hard work, we have defeated all the enemies and regained the leadership of the town. A new road is ahead!',
			title: 'Win!'
		};
		return winner.isHuman ? _Utils_Tuple2(
			_Utils_update(
				model,
				{showPopUp: true, state: $author$project$Definition$Play, viewPopUp: viewPopUp1}),
			$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
			_Utils_update(
				model,
				{showPopUp: true, state: $author$project$Definition$Play, viewPopUp: viewPopUp2}),
			$elm$core$Platform$Cmd$none);
	});
var $author$project$Update$update = F2(
	function (msg, model) {
		var _v0 = model.state;
		switch (_v0.$) {
			case 'Play':
				return A2($author$project$Update$play, msg, model);
			case 'Win':
				return A2($author$project$Update$win, msg, model);
			case 'Lose':
				return A2($author$project$Update$lose, msg, model);
			default:
				return A2($author$project$Update$over100, msg, model);
		}
	});
var $rtfeldman$elm_css$Html$Styled$audio = $rtfeldman$elm_css$Html$Styled$node('audio');
var $elm$json$Json$Encode$bool = _Json_wrap;
var $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			$rtfeldman$elm_css$VirtualDom$Styled$property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $rtfeldman$elm_css$Html$Styled$Attributes$autoplay = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('autoplay');
var $author$project$Definition$Roll = {$: 'Roll'};
var $author$project$Definition$RollAction = {$: 'RollAction'};
var $author$project$Style$button1 = $rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2($rtfeldman$elm_css$Css$property, 'background-color', '#DC143C'),
			A2($rtfeldman$elm_css$Css$property, 'top', '0px'),
			A2($rtfeldman$elm_css$Css$property, 'position', 'relative'),
			A2($rtfeldman$elm_css$Css$property, 'display', 'block'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'pointer'),
			A2($rtfeldman$elm_css$Css$property, 'text-align', 'center'),
			A2($rtfeldman$elm_css$Css$property, 'text-decoration', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'outline', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'color', '#fff'),
			A2($rtfeldman$elm_css$Css$property, 'border', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'border-radius', '15px'),
			A2($rtfeldman$elm_css$Css$property, 'box-shadow', '0 9px #8B0000'),
			A2($rtfeldman$elm_css$Css$property, '-webkit-transition-duration', '0.2s'),
			A2($rtfeldman$elm_css$Css$property, 'transition-duration', '0.2s'),
			A2($rtfeldman$elm_css$Css$property, 'overflow', 'hidden'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'url(./src/img/cursor.cur),move'),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'background', '#B22222'),
					A2($rtfeldman$elm_css$Css$property, 'display', 'block'),
					A2($rtfeldman$elm_css$Css$property, 'position', 'absolute')
				])),
			$rtfeldman$elm_css$Css$active(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'background-color', '#B22222'),
					A2($rtfeldman$elm_css$Css$property, 'box-shadow', '0 5px #800000'),
					A2($rtfeldman$elm_css$Css$property, 'transform', 'translateY(4px)'),
					$rtfeldman$elm_css$Css$after(
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Css$property, 'padding', '0'),
							A2($rtfeldman$elm_css$Css$property, 'margin', '0'),
							A2($rtfeldman$elm_css$Css$property, 'opacity', '1'),
							A2($rtfeldman$elm_css$Css$property, 'transition', '0s')
						]))
				]))
		]));
var $rtfeldman$elm_css$Html$Styled$Attributes$disabled = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('disabled');
var $author$project$Main$chooseDiceModel = function (model) {
	var _v0 = model.diceState;
	switch (_v0.$) {
		case 'Dice':
			return A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Roll),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw'),
						$rtfeldman$elm_css$Html$Styled$Attributes$disabled(!model.canClick),
						$rtfeldman$elm_css$Html$Styled$Attributes$title('Click and ROCK\'N\'ROLL!'),
						$author$project$Style$button1
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('MOVE')
					]));
		case 'ActionDice':
			return A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$RollAction),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw'),
						$rtfeldman$elm_css$Html$Styled$Attributes$disabled(!model.canClick),
						$rtfeldman$elm_css$Html$Styled$Attributes$title(
						model.canClick ? 'Click to get different available actions.' : 'You\'ve done that. How dare you!'),
						$author$project$Style$button1
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('Action')
					]));
		default:
			return A2($rtfeldman$elm_css$Html$Styled$button, _List_Nil, _List_Nil);
	}
};
var $rtfeldman$elm_css$Html$Styled$Attributes$controls = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('controls');
var $rtfeldman$elm_css$Css$animationDelay = function (arg) {
	return A2($rtfeldman$elm_css$Css$prop1, 'animation-delay', arg);
};
var $rtfeldman$elm_css$Html$Styled$div = $rtfeldman$elm_css$Html$Styled$node('div');
var $rtfeldman$elm_css$Html$Styled$img = $rtfeldman$elm_css$Html$Styled$node('img');
var $rtfeldman$elm_css$Html$Styled$Attributes$src = function (url) {
	return A2($rtfeldman$elm_css$Html$Styled$Attributes$stringProperty, 'src', url);
};
var $author$project$Animation$diceAnimation = function (model) {
	var _v0 = model.showDice;
	switch (_v0.$) {
		case 'NoDice':
			return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
		case 'FinalDice':
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '15%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '25%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src(
								'./src/image/dice/dice' + ($elm$core$Debug$toString(model.dice) + '.png')),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$animationName(
										$rtfeldman$elm_css$Css$Animations$keyframes(
											_List_fromArray(
												[
													_Utils_Tuple2(
													0,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '1')
														])),
													_Utils_Tuple2(
													100,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '0')
														]))
												]))),
										$rtfeldman$elm_css$Css$animationDuration(
										$rtfeldman$elm_css$Css$sec(2)),
										$rtfeldman$elm_css$Css$animationDelay(
										$rtfeldman$elm_css$Css$sec(1)),
										A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards')
									]))
							]),
						_List_Nil)
					]));
		case 'RollingDice':
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '15%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '25%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/image/dice/dice.gif')
							]),
						_List_Nil)
					]));
		case 'RollingMoreDice':
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '60%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '6%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/image/dice/dice.gif')
							]),
						_List_Nil),
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '6%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/image/dice/dice.gif')
							]),
						_List_Nil),
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '80%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '6%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/image/dice/dice.gif')
							]),
						_List_Nil)
					]));
		default:
			var newModel = $author$project$Animation$handleDiceForAction(model);
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '60%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '6%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src(
								'./src/image/dice/dice' + ($elm$core$Debug$toString(
									A2($author$project$Definition$get, 0, newModel.actionDiceNumber)) + '.png')),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$animationName(
										$rtfeldman$elm_css$Css$Animations$keyframes(
											_List_fromArray(
												[
													_Utils_Tuple2(
													0,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '1')
														])),
													_Utils_Tuple2(
													100,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '0')
														]))
												]))),
										$rtfeldman$elm_css$Css$animationDuration(
										$rtfeldman$elm_css$Css$sec(2)),
										$rtfeldman$elm_css$Css$animationDelay(
										$rtfeldman$elm_css$Css$sec(1)),
										A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards')
									]))
							]),
						_List_Nil),
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '6%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src(
								'./src/image/dice/dice' + ($elm$core$Debug$toString(
									A2($author$project$Definition$get, 1, newModel.actionDiceNumber)) + '.png')),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$animationName(
										$rtfeldman$elm_css$Css$Animations$keyframes(
											_List_fromArray(
												[
													_Utils_Tuple2(
													0,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '1')
														])),
													_Utils_Tuple2(
													100,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '0')
														]))
												]))),
										$rtfeldman$elm_css$Css$animationDuration(
										$rtfeldman$elm_css$Css$sec(2)),
										$rtfeldman$elm_css$Css$animationDelay(
										$rtfeldman$elm_css$Css$sec(1)),
										A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards')
									]))
							]),
						_List_Nil),
						A2(
						$rtfeldman$elm_css$Html$Styled$img,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '80%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '6%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '30%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$src(
								'./src/image/dice/dice' + ($elm$core$Debug$toString(
									A2($author$project$Definition$get, 2, newModel.actionDiceNumber)) + '.png')),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										$rtfeldman$elm_css$Css$animationName(
										$rtfeldman$elm_css$Css$Animations$keyframes(
											_List_fromArray(
												[
													_Utils_Tuple2(
													0,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '1')
														])),
													_Utils_Tuple2(
													100,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '0')
														]))
												]))),
										$rtfeldman$elm_css$Css$animationDuration(
										$rtfeldman$elm_css$Css$sec(2)),
										$rtfeldman$elm_css$Css$animationDelay(
										$rtfeldman$elm_css$Css$sec(1)),
										A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards')
									]))
							]),
						_List_Nil)
					]));
	}
};
var $author$project$Definition$EndAction = {$: 'EndAction'};
var $author$project$Main$judgeEndButton = function (model) {
	return model.showEndButton ? A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$EndAction),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '80%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw'),
				$rtfeldman$elm_css$Html$Styled$Attributes$disabled(!model.canClickEndAction),
				$author$project$Style$button1
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text('End')
			])) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
};
var $rtfeldman$elm_css$Html$Styled$Attributes$loop = $rtfeldman$elm_css$Html$Styled$Attributes$boolProperty('loop');
var $author$project$Animation$playerAnimation = F2(
	function (model, player) {
		var playerColor = function () {
			if (player.jailRound <= 0) {
				var _v2 = player.character;
				switch (_v2.$) {
					case 'Lance':
						return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #FFB404, #FCC201, #FFF77A, #DC9202)');
					case 'Gorman':
						return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #E60073, #EE1A84, #F73395, #FF4DA6)');
					case 'Blair':
						return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #FF7F50, #FF8A5E, #FF956C, #FFA07A)');
					case 'Doherty':
						return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #000080, #2132A4, #4363C9, #6495ED)');
					default:
						return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #000080, #2132A4, #4363C9, #6495ED)');
				}
			} else {
				return A2($rtfeldman$elm_css$Css$property, 'background-image', 'linear-gradient(-45deg, #000000 0%, #CCCCCC 10%, #000000 20%, #CCCCCC 30%, #000000 40%, #CCCCCC 50%, #000000 60%, #CCCCCC 70%, #000000 80%, #CCCCCC 90%, #000000 100%)');
			}
		}();
		var playerAbbr = function () {
			var _v1 = player.character;
			switch (_v1.$) {
				case 'Lance':
					return 'L';
				case 'Gorman':
					return 'G';
				case 'Blair':
					return 'B';
				case 'Doherty':
					return 'D';
				default:
					return ' ';
			}
		}();
		var currentPlayer = $author$project$Animation$getCurrentPlayer(model);
		if (player.exist) {
			var _v0 = model.isMoving;
			if (_v0) {
				return A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '50px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '50px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-radius', '100%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-size', '100% 100%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'box-shadow', '10px 10px 20px grey'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'overflow', 'hidden'),
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(player.frameList)),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(1)),
									A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards')
								]))
						]),
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '50px'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.8vw'),
									$rtfeldman$elm_css$Html$Styled$Attributes$css(
									_List_fromArray(
										[
											playerColor,
											A2($rtfeldman$elm_css$Css$property, 'background-size', '400% 400%'),
											$rtfeldman$elm_css$Css$animationName(
											$rtfeldman$elm_css$Css$Animations$keyframes(
												_List_fromArray(
													[
														_Utils_Tuple2(
														0,
														_List_fromArray(
															[
																A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0% 50%')
															])),
														_Utils_Tuple2(
														50,
														_List_fromArray(
															[
																A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '100% 50%')
															])),
														_Utils_Tuple2(
														100,
														_List_fromArray(
															[
																A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0% 50%')
															]))
													]))),
											$rtfeldman$elm_css$Css$animationDuration(
											$rtfeldman$elm_css$Css$sec(6)),
											A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite')
										]))
								]),
							_List_fromArray(
								[
									$rtfeldman$elm_css$Html$Styled$text(playerAbbr)
								]))
						]));
			} else {
				return A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '50px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '50px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-radius', '100%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-size', '100% 100%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'box-shadow', '10px 10px 20px grey'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '50px'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.8vw'),
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									playerColor,
									A2($rtfeldman$elm_css$Css$property, 'background-size', '400% 400%'),
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(
										_List_fromArray(
											[
												_Utils_Tuple2(
												0,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0% 50%'),
														A2(
														$rtfeldman$elm_css$Css$Animations$custom,
														'left',
														$elm$core$Debug$toString(player.currentPos.a) + '%'),
														A2(
														$rtfeldman$elm_css$Css$Animations$custom,
														'top',
														$elm$core$Debug$toString(player.currentPos.b) + '%')
													])),
												_Utils_Tuple2(
												50,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '100% 50%'),
														A2(
														$rtfeldman$elm_css$Css$Animations$custom,
														'left',
														$elm$core$Debug$toString(player.currentPos.a) + '%'),
														A2(
														$rtfeldman$elm_css$Css$Animations$custom,
														'top',
														$elm$core$Debug$toString(player.currentPos.b) + '%')
													])),
												_Utils_Tuple2(
												100,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0% 50%'),
														A2(
														$rtfeldman$elm_css$Css$Animations$custom,
														'left',
														$elm$core$Debug$toString(player.currentPos.a) + '%'),
														A2(
														$rtfeldman$elm_css$Css$Animations$custom,
														'top',
														$elm$core$Debug$toString(player.currentPos.b) + '%')
													]))
											]))),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(6)),
									A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite')
								]))
						]),
					_List_fromArray(
						[
							$rtfeldman$elm_css$Html$Styled$text(playerAbbr)
						]));
			}
		} else {
			return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
		}
	});
var $author$project$Animation$playersAnimation = function (model) {
	return A2(
		$elm$core$List$map,
		$author$project$Animation$playerAnimation(model),
		model.players);
};
var $rtfeldman$elm_css$Css$PxUnits = {$: 'PxUnits'};
var $rtfeldman$elm_css$Css$Internal$lengthConverter = F3(
	function (units, unitLabel, numericValue) {
		return {
			absoluteLength: $rtfeldman$elm_css$Css$Structure$Compatible,
			calc: $rtfeldman$elm_css$Css$Structure$Compatible,
			flexBasis: $rtfeldman$elm_css$Css$Structure$Compatible,
			fontSize: $rtfeldman$elm_css$Css$Structure$Compatible,
			length: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAuto: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrAutoOrCoverOrContain: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNone: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNoneOrMinMaxDimension: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumber: $rtfeldman$elm_css$Css$Structure$Compatible,
			lengthOrNumberOrAutoOrNoneOrContent: $rtfeldman$elm_css$Css$Structure$Compatible,
			numericValue: numericValue,
			textIndent: $rtfeldman$elm_css$Css$Structure$Compatible,
			unitLabel: unitLabel,
			units: units,
			value: _Utils_ap(
				$elm$core$String$fromFloat(numericValue),
				unitLabel)
		};
	});
var $rtfeldman$elm_css$Css$px = A2($rtfeldman$elm_css$Css$Internal$lengthConverter, $rtfeldman$elm_css$Css$PxUnits, 'px');
var $author$project$Definition$Top = {$: 'Top'};
var $author$project$Style$buttonTop = $rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2($rtfeldman$elm_css$Css$property, 'color', 'white'),
			A2($rtfeldman$elm_css$Css$property, 'text-transform', 'uppercase'),
			A2($rtfeldman$elm_css$Css$property, 'text-decoration', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'background', '#ffffff'),
			A2($rtfeldman$elm_css$Css$property, 'display', 'inline-block'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'url(./src/img/cursor.cur),move'),
			$rtfeldman$elm_css$Css$animationName(
			$rtfeldman$elm_css$Css$Animations$keyframes(
				_List_fromArray(
					[
						_Utils_Tuple2(
						0,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$Animations$custom, 'background-color', '#8B0000'),
								A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0 0 5px #8B0000')
							])),
						_Utils_Tuple2(
						50,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$Animations$custom, 'background-color', '#B22222'),
								A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0 0 20px #B22222')
							])),
						_Utils_Tuple2(
						100,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$Animations$custom, 'background-color', '#8B0000'),
								A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0 0 5px #8B0000')
							]))
					]))),
			A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
			$rtfeldman$elm_css$Css$animationDuration(
			$rtfeldman$elm_css$Css$sec(1.3))
		]));
var $rtfeldman$elm_css$Html$Styled$textarea = $rtfeldman$elm_css$Html$Styled$node('textarea');
var $author$project$Main$renderAILog = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '30%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '50%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'z-index', '1'),
				function () {
				var _v0 = model.topState;
				switch (_v0.$) {
					case 'ShowTop':
						return $rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(
										_List_fromArray(
											[
												_Utils_Tuple2(
												0,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateY(-95%)')
													])),
												_Utils_Tuple2(
												100,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateY(0%)')
													]))
											]))),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(1)),
									A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-moz-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-webkit-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-o-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-linear-gradient(top, black 95%, transparent 5%)')
								]));
					case 'HideTop':
						return $rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(
										_List_fromArray(
											[
												_Utils_Tuple2(
												0,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateY(0%)')
													])),
												_Utils_Tuple2(
												100,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateY(-95%)')
													]))
											]))),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(1)),
									A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-moz-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-webkit-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-o-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-linear-gradient(top, black 95%, transparent 5%)')
								]));
					default:
						return $rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$property, 'transform', 'translateY(-95%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-moz-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-webkit-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-o-linear-gradient(top, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-linear-gradient(top, black 95%, transparent 5%)')
								]));
				}
			}()
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Top),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '15%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '8%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '94%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '0%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						$author$project$Style$buttonTop
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('LOG')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$textarea,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '15%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '70%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						$rtfeldman$elm_css$Html$Styled$Attributes$disabled(true),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'resize', 'none')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(model.aiRecord)
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '3%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '4%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '2vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text('RECORD')
					]))
			]));
};
var $rtfeldman$elm_css$Html$Styled$h1 = $rtfeldman$elm_css$Html$Styled$node('h1');
var $rtfeldman$elm_css$Html$Styled$h2 = $rtfeldman$elm_css$Html$Styled$node('h2');
var $rtfeldman$elm_css$Html$Styled$p = $rtfeldman$elm_css$Html$Styled$node('p');
var $author$project$Map$renderDetailedTile = function (model) {
	var stabilityPrompt = $elm$core$Debug$toString(
		A2($author$project$Definition$get, model.detailTileIndex, model.map).stability);
	var owner = A2($author$project$Definition$get, model.detailTileIndex, model.map).owner;
	var ownerName = function () {
		if (owner.$ === 'Just') {
			var player = owner.a;
			return $author$project$Definition$playerName(player);
		} else {
			return 'No';
		}
	}();
	var ownerColor = function () {
		switch (ownerName) {
			case 'Lance':
				return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #FFB404, #FCC201, #FFF77A, #DC9202)');
			case 'Gorman':
				return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #E60073, #EE1A84, #F73395, #FF4DA6)');
			case 'Doherty':
				return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #000080, #2132A4, #4363C9, #6495ED)');
			case 'Blair':
				return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #FF7F50, #FF8A5E, #FF956C, #FFA07A)');
			case 'No':
				return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #DBE4EB, #D3DBE1, #CCD3D8, #C4CACE)');
			default:
				return A2($rtfeldman$elm_css$Css$property, 'background', 'linear-gradient(-45deg, #DBE4EB, #D3DBE1, #CCD3D8, #C4CACE)');
		}
	}();
	var levelPrompt = A2($author$project$Definition$buildingLevel, model.map, model.detailTileIndex).b;
	var family = A2($author$project$Definition$get, model.detailTileIndex, model.map).familyMember;
	var familyPrompt = A2(
		$elm$core$List$map,
		function (a) {
			return $author$project$Definition$playerName(
				A2($author$project$Definition$get, a, model.players)) + (': ' + ($elm$core$Debug$toString(
				A2($author$project$Definition$get, a, family)) + ' people'));
		},
		A2($elm$core$List$range, 0, 3));
	var buildingName = A2($author$project$Definition$buildingLevel, model.map, model.detailTileIndex).a;
	var incomePrompt = ((buildingName === 'Police Station') || (buildingName === 'Jail')) ? '' : ('Income: ' + $elm$core$Debug$toString(
		$author$project$Map$assetBasicIncome(
			A2($author$project$Definition$get, model.detailTileIndex, model.map).building)));
	var tollPrompt = ((buildingName === 'Police Station') || (buildingName === 'Jail')) ? '' : ('Toll: ' + $elm$core$Debug$toString(
		$author$project$Map$assetBasicToll(
			A2($author$project$Definition$get, model.detailTileIndex, model.map).building)));
	var buildingColor = function () {
		switch (buildingName) {
			case 'Casino':
				return 'blue';
			case 'Disco':
				return 'green';
			case 'Boxing Gym':
				return 'red';
			case 'Night Market':
				return 'purple';
			case 'Block':
				return 'silver';
			case 'Police Station':
				return 'gold';
			default:
				return 'black';
		}
	}();
	var _v0 = model.viewDetailed;
	if (_v0) {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '60%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '15%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '20%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
					$rtfeldman$elm_css$Html$Styled$Attributes$css(
					_List_fromArray(
						[
							$rtfeldman$elm_css$Css$animationName(
							$rtfeldman$elm_css$Css$Animations$keyframes(
								_List_fromArray(
									[
										_Utils_Tuple2(
										0,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '0')
											])),
										_Utils_Tuple2(
										100,
										_List_fromArray(
											[
												A2($rtfeldman$elm_css$Css$Animations$custom, 'opacity', '1')
											]))
									]))),
							A2($rtfeldman$elm_css$Css$property, 'background-size', '400% 400%'),
							$rtfeldman$elm_css$Css$animationDuration(
							$rtfeldman$elm_css$Css$sec(0.5)),
							A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards'),
							A2($rtfeldman$elm_css$Css$property, 'border-radius', '10px'),
							A2($rtfeldman$elm_css$Css$property, 'z-index', '3')
						]))
				]),
			_List_fromArray(
				[
					A2(
					$rtfeldman$elm_css$Html$Styled$div,
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '100%'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
							A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'box-shadow', '10px 10px 20px grey'),
							$rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									ownerColor,
									A2($rtfeldman$elm_css$Css$property, 'background-size', '400% 400%'),
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(
										_List_fromArray(
											[
												_Utils_Tuple2(
												0,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0% 50%')
													])),
												_Utils_Tuple2(
												50,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '100% 50%')
													])),
												_Utils_Tuple2(
												100,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '0% 50%')
													]))
											]))),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(6)),
									A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
									A2($rtfeldman$elm_css$Css$property, 'border-radius', '10px')
								]))
						]),
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '4%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', 'white')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$h1,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.7vw'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', buildingColor)
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(buildingName)
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '21%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$h1,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.3vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(levelPrompt)
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '30%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '0.5vw')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(
											'Index: ' + $elm$core$Debug$toString(model.detailTileIndex))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Owner: ' + ownerName)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Stability: ' + stabilityPrompt)
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '0.5vw')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$h2,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.4vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text('Family Members')
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(
											A2($author$project$Definition$get, 0, familyPrompt))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(
											A2($author$project$Definition$get, 1, familyPrompt))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(
											A2($author$project$Definition$get, 2, familyPrompt))
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(
											A2($author$project$Definition$get, 3, familyPrompt))
										]))
								])),
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '83%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.2vw'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(tollPrompt + (' ' + incomePrompt))
										]))
								]))
						]))
				]));
	} else {
		return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	}
};
var $author$project$Main$renderHeadBar = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '35%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '5%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '65%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '0%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', '#4169E1'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-radius', '3px'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'box-shadow', '-3px 3px 5px white')
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$img,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '1%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/wealth.png')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '9%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '7%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '0.8vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'vertical-align', 'middle')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						A2(
							$myrho$elm_round$Round$round,
							0,
							A2($author$project$Definition$get, model.currentPlayer, model.players).wealth))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$img,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '17%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/prestige.png')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '9%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '23%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '0.8vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'vertical-align', 'middle')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						A2(
							$myrho$elm_round$Round$round,
							0,
							A2($author$project$Definition$get, model.currentPlayer, model.players).prestige * 100) + ' %')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$img,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '35%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/family.png')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '9%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '41%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '0.8vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'vertical-align', 'middle')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						$elm$core$Debug$toString(
							A2($author$project$Definition$get, model.currentPlayer, model.players).family))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$img,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '51%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/influence.png')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '9%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '57%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '0.8vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'vertical-align', 'middle')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						A2(
							$myrho$elm_round$Round$round,
							0,
							A2($author$project$Definition$get, model.currentPlayer, model.players).influence * 100) + ' %')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$img,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '67%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						(A2($author$project$Definition$get, model.currentPlayer, model.players).popularWill < 0.2) ? $rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/angry.png') : $rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/smile.png')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '9%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '73%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '0.8vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'vertical-align', 'middle')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						A2(
							$myrho$elm_round$Round$round,
							0,
							A2($author$project$Definition$get, model.currentPlayer, model.players).popularWill * 100) + ' %')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$img,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '83%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/status/police.png')
					]),
				_List_Nil),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '9%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '89%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '0.8vw'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'line-height', '100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'vertical-align', 'middle')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						A2(
							$myrho$elm_round$Round$round,
							0,
							A2($author$project$Definition$get, model.currentPlayer, model.players).policeAttention * 100) + ' %')
					]))
			]));
};
var $author$project$Definition$NoDetail = {$: 'NoDetail'};
var $author$project$Definition$ViewDetailedTile = function (a) {
	return {$: 'ViewDetailedTile', a: a};
};
var $rtfeldman$elm_css$Html$Styled$Events$onMouseOut = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseout',
		$elm$json$Json$Decode$succeed(msg));
};
var $rtfeldman$elm_css$Html$Styled$Events$onMouseOver = function (msg) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$Events$on,
		'mouseover',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Definition$NoOp = {$: 'NoOp'};
var $author$project$Definition$ReselectTile = F3(
	function (a, b, c) {
		return {$: 'ReselectTile', a: a, b: b, c: c};
	});
var $author$project$Definition$SelectTile = F2(
	function (a, b) {
		return {$: 'SelectTile', a: a, b: b};
	});
var $author$project$Map$whenSelectTile = F3(
	function (model, tile, fightOrAdd) {
		var judgeInJail = F2(
			function (index, member) {
				return (A2($author$project$Definition$get, index, model.players).jailRound > 0) ? 0 : member;
			});
		var judgeFightCase = _Utils_eq(tile.building, $author$project$Definition$PoliceStation) ? 'policeStation' : (_Utils_eq(tile.building, $author$project$Definition$Jail) ? 'jail' : ((!A2($author$project$Definition$get, model.currentPlayer, tile.familyMember)) ? 'noMember' : (_Utils_eq(
			$elm$core$List$sum(
				A2($elm$core$List$indexedMap, judgeInJail, tile.familyMember)),
			A2($author$project$Definition$get, model.currentPlayer, tile.familyMember)) ? 'noOthers' : 'Nothing')));
		switch (fightOrAdd) {
			case 'fight':
				if (model.canSelectTile) {
					switch (judgeFightCase) {
						case 'policeStation':
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$ReselectTile, tile.index, model.fightButtonNumber, 'policeStation'));
						case 'jail':
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$ReselectTile, tile.index, model.fightButtonNumber, 'jail'));
						case 'noOthers':
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$ReselectTile, tile.index, model.fightButtonNumber, 'noOthers'));
						case 'noMember':
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$ReselectTile, tile.index, model.fightButtonNumber, 'noMember'));
						default:
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A2($author$project$Definition$SelectTile, tile.index, model.fightButtonNumber));
					}
				} else {
					return $rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$NoOp);
				}
			case 'add':
				if (model.canSelectTile) {
					var _v2 = tile.building;
					switch (_v2.$) {
						case 'PoliceStation':
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$ReselectTile, tile.index, model.fightButtonNumber, 'policeStation'));
						case 'Jail':
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A3($author$project$Definition$ReselectTile, tile.index, model.fightButtonNumber, 'jail'));
						default:
							return $rtfeldman$elm_css$Html$Styled$Events$onClick(
								A2($author$project$Definition$SelectTile, tile.index, model.fightButtonNumber));
					}
				} else {
					return $rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$NoOp);
				}
			default:
				return $rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$NoOp);
		}
	});
var $author$project$Map$renderMap = F2(
	function (map, model) {
		var currentPlayer = A2($author$project$Definition$get, model.currentPlayer, model.players);
		var renderTile = function (thisTile) {
			var widthHeight = A2(
				$elm$core$List$member,
				thisTile.index,
				_List_fromArray(
					[0, 17, 34, 51])) ? _Utils_Tuple2('10%', '10%') : (((thisTile.direction === 1) || (thisTile.direction === 2)) ? _Utils_Tuple2('5%', '10%') : _Utils_Tuple2('10%', '5%'));
			var stripeWidthHeight = ((thisTile.direction === 1) || (thisTile.direction === 2)) ? _Utils_Tuple2('100%', '10%') : _Utils_Tuple2('10%', '100%');
			var stripeLeftTop = ((thisTile.direction === 1) || (thisTile.direction === 2)) ? _Utils_Tuple2('0%', '50%') : _Utils_Tuple2('50%', '0%');
			var skew_ = function () {
				var _v7 = thisTile.direction;
				switch (_v7) {
					case 1:
						return A2($rtfeldman$elm_css$Css$property, 'transform', 'skewY(10deg)');
					case 2:
						return A2($rtfeldman$elm_css$Css$property, 'transform', 'skewY(10deg)');
					case 3:
						return A2($rtfeldman$elm_css$Css$property, 'transform', 'skewX(10deg)');
					case 4:
						return A2($rtfeldman$elm_css$Css$property, 'transform', 'skewX(10deg)');
					default:
						return A2($rtfeldman$elm_css$Css$property, '', '');
				}
			}();
			var owner = thisTile.owner;
			var noHighlight = $rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Css$property,
						'left',
						$elm$core$Debug$toString(thisTile.position.a) + '%'),
						A2(
						$rtfeldman$elm_css$Css$property,
						'top',
						$elm$core$Debug$toString(thisTile.position.b) + '%')
					]));
			var highlight2 = $rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Css$property,
						'left',
						$elm$core$Debug$toString(thisTile.position.a) + '%'),
						A2(
						$rtfeldman$elm_css$Css$property,
						'top',
						$elm$core$Debug$toString(thisTile.position.b) + '%'),
						$rtfeldman$elm_css$Css$animationName(
						$rtfeldman$elm_css$Css$Animations$keyframes(
							_List_fromArray(
								[
									_Utils_Tuple2(
									0,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0px 0px 10px 10px #DC143C')
										])),
									_Utils_Tuple2(
									100,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0px 0px 10px 10px #B22222')
										]))
								]))),
						$rtfeldman$elm_css$Css$animationDuration(
						$rtfeldman$elm_css$Css$sec(1)),
						A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
						A2($rtfeldman$elm_css$Css$property, 'animation-timing-function', 'ease-in-out'),
						A2($rtfeldman$elm_css$Css$property, 'animation-direction', 'alternate')
					]));
			var highlight1 = $rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Css$property,
						'left',
						$elm$core$Debug$toString(thisTile.position.a) + '%'),
						A2(
						$rtfeldman$elm_css$Css$property,
						'top',
						$elm$core$Debug$toString(thisTile.position.b) + '%'),
						$rtfeldman$elm_css$Css$animationName(
						$rtfeldman$elm_css$Css$Animations$keyframes(
							_List_fromArray(
								[
									_Utils_Tuple2(
									0,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0px 0px 10px 10px #4169E1')
										])),
									_Utils_Tuple2(
									100,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0px 0px 10px 10px #000080')
										]))
								]))),
						$rtfeldman$elm_css$Css$animationDuration(
						$rtfeldman$elm_css$Css$sec(1)),
						A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
						A2($rtfeldman$elm_css$Css$property, 'animation-timing-function', 'ease-in-out'),
						A2($rtfeldman$elm_css$Css$property, 'animation-direction', 'alternate')
					]));
			var highlight0 = $rtfeldman$elm_css$Html$Styled$Attributes$css(
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Css$property,
						'left',
						$elm$core$Debug$toString(thisTile.position.a) + '%'),
						A2(
						$rtfeldman$elm_css$Css$property,
						'top',
						$elm$core$Debug$toString(thisTile.position.b) + '%'),
						$rtfeldman$elm_css$Css$animationName(
						$rtfeldman$elm_css$Css$Animations$keyframes(
							_List_fromArray(
								[
									_Utils_Tuple2(
									0,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0px 0px 10px 10px #BDBDBD')
										])),
									_Utils_Tuple2(
									100,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0px 0px 10px 10px #FFFFFF')
										]))
								]))),
						$rtfeldman$elm_css$Css$animationDuration(
						$rtfeldman$elm_css$Css$sec(1)),
						A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
						A2($rtfeldman$elm_css$Css$property, 'animation-timing-function', 'ease-in-out'),
						A2($rtfeldman$elm_css$Css$property, 'animation-direction', 'alternate')
					]));
			var familyEachTile = function (aTile) {
				return A2($author$project$Definition$get, model.currentPlayer, aTile.familyMember);
			};
			var dirParsing = $elm$core$Debug$toString(thisTile.direction) + '.png';
			var url = function () {
				var _v5 = thisTile.building;
				switch (_v5.$) {
					case 'Casino':
						return './MapElement/C_Source/C_Casino/C_Casino' + dirParsing;
					case 'Disco':
						return './MapElement/C_Source/C_Disco/C_Disco' + dirParsing;
					case 'NightMarket':
						return './MapElement/C_Source/C_NightMarket/C_NightMarket' + dirParsing;
					case 'BoxingGym':
						return './MapElement/C_Source/C_BoxingGym/C_BoxingGym' + dirParsing;
					case 'PoliceStation':
						return './MapElement/C_Source/C_Police/C_PoliceStation.png';
					case 'Jail':
						return './MapElement/C_Source/C_Jail/C_Jail.png';
					default:
						var _v6 = thisTile.index;
						switch (_v6) {
							case 0:
								return './MapElement/C_Source/C_Spawning/Lhome.png';
							case 17:
								return './MapElement/C_Source/C_Spawning/Ghome.png';
							case 34:
								return './MapElement/C_Source/C_Spawning/Dhome.png';
							case 51:
								return './MapElement/C_Source/C_Spawning/Bhome.png';
							default:
								return './MapElement/C_Source/C_Block/C_Block' + dirParsing;
						}
				}
			}();
			var colorSet = function () {
				if (owner.$ === 'Just') {
					var thisPlayer = owner.a;
					var _v4 = thisPlayer.character;
					switch (_v4.$) {
						case 'Lance':
							return A2($rtfeldman$elm_css$Css$property, 'background-image', 'linear-gradient(135deg, #fff, #fff 25%, #DAA520 25%, #DAA520 50%, #fff 50%, #fff 75%, #DAA520 75%, #DAA520 100%)');
						case 'Gorman':
							return A2($rtfeldman$elm_css$Css$property, 'background-image', 'linear-gradient(135deg, #fff, #fff 25%, #e60073 25%, #e60073 50%, #fff 50%, #fff 75%, #e60073 75%, #e60073 100%)');
						case 'Doherty':
							return A2($rtfeldman$elm_css$Css$property, 'background-image', 'linear-gradient(135deg, #fff, #fff 25%, #6495ED 25%, #6495ED 50%, #fff 50%, #fff 75%, #6495ED 75%, #6495ED 100%)');
						case 'Blair':
							return A2($rtfeldman$elm_css$Css$property, 'background-image', 'linear-gradient(135deg, #fff, #fff 25%, #FFA07A 25%, #FFA07A 50%, #fff 50%, #fff 75%, #FFA07A 75%, #FFA07A 100%)');
						default:
							return A2($rtfeldman$elm_css$Css$property, '', '');
					}
				} else {
					return A2($rtfeldman$elm_css$Css$property, '', '');
				}
			}();
			var ownerHint = function () {
				if (owner.$ === 'Just') {
					var thisPlayer = owner.a;
					return (thisPlayer.exist && (!A2(
						$elm$core$List$member,
						thisTile.index,
						_List_fromArray(
							[0, 17, 34, 51])))) ? A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', stripeWidthHeight.a),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', stripeWidthHeight.b),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', stripeLeftTop.a),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', stripeLeftTop.b),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										skew_,
										colorSet,
										A2($rtfeldman$elm_css$Css$property, 'opacity', '0.9'),
										A2($rtfeldman$elm_css$Css$property, 'background-size', '100px 100px'),
										$rtfeldman$elm_css$Css$animationName(
										$rtfeldman$elm_css$Css$Animations$keyframes(
											_List_fromArray(
												[
													_Utils_Tuple2(0, _List_Nil),
													_Utils_Tuple2(
													100,
													_List_fromArray(
														[
															A2($rtfeldman$elm_css$Css$Animations$custom, 'background-position', '100px 0')
														]))
												]))),
										$rtfeldman$elm_css$Css$animationDuration(
										$rtfeldman$elm_css$Css$sec(2)),
										A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
										A2($rtfeldman$elm_css$Css$property, 'animation-timing-function', 'linear')
									]))
							]),
						_List_Nil) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
				} else {
					return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
				}
			}();
			var battleJudge = function () {
				var listExceptCurrent = _Utils_ap(
					A2($elm$core$List$take, model.currentPlayer, thisTile.familyMember),
					A2($elm$core$List$drop, model.currentPlayer + 1, thisTile.familyMember));
				return ((!(!A2($author$project$Definition$get, model.currentPlayer, thisTile.familyMember))) && A2(
					$elm$core$List$any,
					function (x) {
						return !(!x);
					},
					listExceptCurrent)) ? true : false;
			}();
			var adjacentTiles = _List_fromArray(
				[
					A2(
					$author$project$Definition$get,
					A2(
						$elm$core$Basics$modBy,
						$elm$core$List$length(model.map),
						thisTile.index - 1),
					model.map),
					thisTile,
					A2(
					$author$project$Definition$get,
					A2(
						$elm$core$Basics$modBy,
						$elm$core$List$length(model.map),
						thisTile.index + 1),
					model.map)
				]);
			var familyAdjacent = A2($elm$core$List$map, familyEachTile, adjacentTiles);
			var highlightEffect = function () {
				if (model.highlight) {
					if (owner.$ === 'Just') {
						var thisPlayer = owner.a;
						return A2(
							$elm$core$List$any,
							function (x) {
								return !(!x);
							},
							familyAdjacent) ? (_Utils_eq(thisPlayer, currentPlayer) ? highlight2 : highlight1) : noHighlight;
					} else {
						return A2(
							$elm$core$List$any,
							function (x) {
								return !(!x);
							},
							familyAdjacent) ? highlight2 : noHighlight;
					}
				} else {
					return noHighlight;
				}
			}();
			var adjacentOwnedNum = (_Utils_eq(
				A2($author$project$Definition$get, 0, adjacentTiles).owner,
				$elm$core$Maybe$Just(currentPlayer)) && _Utils_eq(
				A2($author$project$Definition$get, 2, adjacentTiles).owner,
				$elm$core$Maybe$Just(currentPlayer))) ? 2 : (((!_Utils_eq(
				A2($author$project$Definition$get, 0, adjacentTiles).owner,
				$elm$core$Maybe$Just(currentPlayer))) && (!_Utils_eq(
				A2($author$project$Definition$get, 2, adjacentTiles).owner,
				$elm$core$Maybe$Just(currentPlayer)))) ? 0 : 1);
			var battleHighlight = function () {
				if (model.battleHighlight) {
					if (battleJudge) {
						switch (adjacentOwnedNum) {
							case 1:
								return highlight1;
							case 2:
								return highlight2;
							default:
								return highlight0;
						}
					} else {
						return noHighlight;
					}
				} else {
					return noHighlight;
				}
			}();
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A3($author$project$Map$whenSelectTile, model, thisTile, model.addOrFight),
						$rtfeldman$elm_css$Html$Styled$Events$onMouseOver(
						$author$project$Definition$ViewDetailedTile(thisTile.index)),
						$rtfeldman$elm_css$Html$Styled$Events$onMouseOut($author$project$Definition$NoDetail),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', widthHeight.a),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', widthHeight.b),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-image', 'url(' + (url + ')')),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-size', '100% 100%'),
						highlightEffect,
						battleHighlight
					]),
				_List_fromArray(
					[ownerHint]));
		};
		return A2($elm$core$List$map, renderTile, map);
	});
var $author$project$PopUp$generalRenderPopUp = F5(
	function (model, backgroundImage, title, descriptionText, buttons) {
		var _v0 = model.showPopUp;
		if (_v0) {
			return A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '50%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '30%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '25%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-image', backgroundImage),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-size', '100% 100%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-radius', '5px'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-width', '1px'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'z-index', '2')
					]),
				A2(
					$elm$core$List$append,
					buttons,
					_List_fromArray(
						[
							A2(
							$rtfeldman$elm_css$Html$Styled$div,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '2%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '90%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '50%'),
									A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
								]),
							_List_fromArray(
								[
									A2(
									$rtfeldman$elm_css$Html$Styled$h1,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '2vw'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', '#fff')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(title)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '90%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '2%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', 'gray'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '90%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '2%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', 'gray'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '0.5%')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$p,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-indent', '2em'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.2vw'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', '#fff')
										]),
									_List_fromArray(
										[
											$rtfeldman$elm_css$Html$Styled$text(descriptionText)
										])),
									A2(
									$rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '90%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '2%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', 'gray'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
										]),
									_List_Nil),
									A2(
									$rtfeldman$elm_css$Html$Styled$div,
									_List_fromArray(
										[
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '90%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '2%'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', 'gray'),
											A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
										]),
									_List_Nil)
								]))
						])));
		} else {
			return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
		}
	});
var $author$project$PopUp$renderPopUp = function (model) {
	return A5($author$project$PopUp$generalRenderPopUp, model, model.viewPopUp.backgroundImage, model.viewPopUp.title, model.viewPopUp.descriptionText, model.viewPopUp.buttons);
};
var $author$project$Definition$Side = {$: 'Side'};
var $author$project$Style$buttonSide = $rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2($rtfeldman$elm_css$Css$property, 'color', '!important'),
			A2($rtfeldman$elm_css$Css$property, 'text-transform', 'uppercase'),
			A2($rtfeldman$elm_css$Css$property, 'text-decoration', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'background', '#ffffff'),
			A2($rtfeldman$elm_css$Css$property, 'display', 'inline-block'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'url(./src/img/cursor.cur),move'),
			$rtfeldman$elm_css$Css$animationName(
			$rtfeldman$elm_css$Css$Animations$keyframes(
				_List_fromArray(
					[
						_Utils_Tuple2(
						0,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$Animations$custom, 'background-color', '#2ba805'),
								A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0 0 5px #2ba805')
							])),
						_Utils_Tuple2(
						50,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$Animations$custom, 'background-color', '#49e819'),
								A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0 0 20px #49e819')
							])),
						_Utils_Tuple2(
						100,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$Animations$custom, 'background-color', '#2ba805'),
								A2($rtfeldman$elm_css$Css$Animations$custom, 'box-shadow', '0 0 5px #2ba805')
							]))
					]))),
			A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
			$rtfeldman$elm_css$Css$animationDuration(
			$rtfeldman$elm_css$Css$sec(1.3))
		]));
var $author$project$Style$glowing = function (player) {
	var color = function () {
		if (player.exist) {
			var _v0 = player.character;
			switch (_v0.$) {
				case 'Lance':
					return _Utils_Tuple2('0 0 10px #fff, 0 0 20px #fff, 0 0 30px #DAA520, 0 0 40px #DAA520, 0 0 50px #DAA520, 0 0 60px #DAA520, 0 0 70px #DAA520', '0 0 20px #fff, 0 0 30px #FFD700, 0 0 40px #FFD700, 0 0 50px #FFD700, 0 0 60px #FFD700, 0 0 70px #FFD700, 0 0 80px #FFD700');
				case 'Gorman':
					return _Utils_Tuple2('0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073', '0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6');
				case 'Doherty':
					return _Utils_Tuple2('0 0 10px #fff, 0 0 20px #fff, 0 0 30px #000080, 0 0 40px #000080, 0 0 50px #000080, 0 0 60px #000080, 0 0 70px #000080', '0 0 20px #fff, 0 0 30px #6495ED, 0 0 40px #6495ED, 0 0 50px #6495ED, 0 0 60px #6495ED, 0 0 70px #6495ED, 0 0 80px #6495ED');
				case 'Blair':
					return _Utils_Tuple2('0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF7F50, 0 0 40px #FF7F50, 0 0 50px #FF7F50, 0 0 60px #FF7F50, 0 0 70px #FF7F50', '0 0 20px #fff, 0 0 30px #FFA07A, 0 0 40px #FFA07A, 0 0 50px #FFA07A, 0 0 60px #FFA07A, 0 0 70px #FFA07A, 0 0 80px #FFA07A');
				default:
					return _Utils_Tuple2('0 0 10px #fff, 0 0 20px #fff, 0 0 30px #FF7F50, 0 0 40px #FF7F50, 0 0 50px #FF7F50, 0 0 60px #FF7F50, 0 0 70px #FF7F50', '0 0 20px #fff, 0 0 30px #FFA07A, 0 0 40px #FFA07A, 0 0 50px #FFA07A, 0 0 60px #FFA07A, 0 0 70px #FFA07A, 0 0 80px #FFA07A');
			}
		} else {
			return _Utils_Tuple2('0 0 10px #fff, 0 0 20px #fff, 0 0 30px #8B0000, 0 0 40px #8B0000, 0 0 50px #8B0000, 0 0 60px #8B0000, 0 0 70px #8B0000', '0 0 20px #fff, 0 0 30px #FF0000, 0 0 40px #FF0000, 0 0 50px #FF0000, 0 0 60px #FF0000, 0 0 70px #FF0000, 0 0 80px #FF0000');
		}
	}();
	return $rtfeldman$elm_css$Html$Styled$Attributes$css(
		_List_fromArray(
			[
				$rtfeldman$elm_css$Css$animationName(
				$rtfeldman$elm_css$Css$Animations$keyframes(
					_List_fromArray(
						[
							_Utils_Tuple2(
							0,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Animations$custom, 'text-shadow', color.a)
								])),
							_Utils_Tuple2(
							100,
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$Animations$custom, 'text-shadow', color.b)
								]))
						]))),
				$rtfeldman$elm_css$Css$animationDuration(
				$rtfeldman$elm_css$Css$sec(1)),
				A2($rtfeldman$elm_css$Css$property, 'animation-iteration-count', 'infinite'),
				A2($rtfeldman$elm_css$Css$property, 'animation-timing-function', 'ease-in-out'),
				A2($rtfeldman$elm_css$Css$property, 'animation-direction', 'alternate')
			]));
};
var $rtfeldman$elm_css$Html$Styled$li = $rtfeldman$elm_css$Html$Styled$node('li');
var $rtfeldman$elm_css$Html$Styled$s = $rtfeldman$elm_css$Html$Styled$node('s');
var $author$project$Main$renderPlayerAttributes = F2(
	function (model, player) {
		var name = player.exist ? $rtfeldman$elm_css$Html$Styled$text(
			$author$project$Definition$playerName(player)) : A2(
			$rtfeldman$elm_css$Html$Styled$s,
			_List_Nil,
			_List_fromArray(
				[
					$rtfeldman$elm_css$Html$Styled$text(
					$author$project$Definition$playerName(player))
				]));
		var color = function () {
			var _v0 = player.character;
			switch (_v0.$) {
				case 'Lance':
					return 'gold';
				case 'Gorman':
					return '#ad1453';
				case 'Doherty':
					return '#4169E1';
				case 'Blair':
					return 'orange';
				default:
					return ' ';
			}
		}();
		return _List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$h1,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', color),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '2vw'),
						$author$project$Style$glowing(player)
					]),
				_List_fromArray(
					[name])),
				A2(
				$rtfeldman$elm_css$Html$Styled$li,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Wealth: ' + A2($myrho$elm_round$Round$round, 0, player.wealth))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$li,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Prestige: ' + (A2($myrho$elm_round$Round$round, 0, player.prestige * 100) + '%'))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$li,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Family Members: ' + $elm$core$Debug$toString(player.family))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$li,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Influence: ' + (A2($myrho$elm_round$Round$round, 0, player.influence * 100) + '%'))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$li,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Popular Will: ' + (A2($myrho$elm_round$Round$round, 0, player.popularWill * 100) + '%'))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$li,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Police Attention: ' + (A2($myrho$elm_round$Round$round, 0, player.policeAttention * 100) + '%'))
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$h2,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						'Point: ' + A2(
							$myrho$elm_round$Round$round,
							0,
							A2($author$project$Condition$generalPoint, player, model)))
					]))
			]);
	});
var $author$project$Main$renderSideBar = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '30%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '100%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'z-index', '2'),
				function () {
				var _v0 = model.sideState;
				switch (_v0.$) {
					case 'ShowSide':
						return $rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(
										_List_fromArray(
											[
												_Utils_Tuple2(
												0,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateX(-95%)')
													])),
												_Utils_Tuple2(
												100,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateX(0%)')
													]))
											]))),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(1)),
									A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-moz-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-webkit-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-o-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-linear-gradient(left, black 95%, transparent 5%)')
								]));
					case 'HideSide':
						return $rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									$rtfeldman$elm_css$Css$animationName(
									$rtfeldman$elm_css$Css$Animations$keyframes(
										_List_fromArray(
											[
												_Utils_Tuple2(
												0,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateX(0%)')
													])),
												_Utils_Tuple2(
												100,
												_List_fromArray(
													[
														A2($rtfeldman$elm_css$Css$Animations$custom, 'transform', 'translateX(-95%)')
													]))
											]))),
									$rtfeldman$elm_css$Css$animationDuration(
									$rtfeldman$elm_css$Css$sec(1)),
									A2($rtfeldman$elm_css$Css$property, 'animation-fill-mode', 'forwards'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-moz-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-webkit-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-o-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-linear-gradient(left, black 95%, transparent 5%)')
								]));
					default:
						return $rtfeldman$elm_css$Html$Styled$Attributes$css(
							_List_fromArray(
								[
									A2($rtfeldman$elm_css$Css$property, 'transform', 'translateX(-95%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-moz-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-webkit-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-o-linear-gradient(left, black 95%, transparent 5%)'),
									A2($rtfeldman$elm_css$Css$property, 'background', '-linear-gradient(left, black 95%, transparent 5%)')
								]));
				}
			}()
			]),
		_List_fromArray(
			[
				A2(
				$rtfeldman$elm_css$Html$Styled$button,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Events$onClick($author$project$Definition$Side),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '8%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '95%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '0%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1vw'),
						$author$project$Style$buttonSide
					]),
				_List_fromArray(
					[
						_Utils_eq(model.sideState, $author$project$Definition$ShowSide) ? $rtfeldman$elm_css$Html$Styled$text('◀') : $rtfeldman$elm_css$Html$Styled$text('▶')
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				A2(
					$author$project$Main$renderPlayerAttributes,
					model,
					A2($author$project$Definition$get, 0, model.players))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				A2(
					$author$project$Main$renderPlayerAttributes,
					model,
					A2($author$project$Definition$get, 1, model.players))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				A2(
					$author$project$Main$renderPlayerAttributes,
					model,
					A2($author$project$Definition$get, 2, model.players))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '40%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '50%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				A2(
					$author$project$Main$renderPlayerAttributes,
					model,
					A2($author$project$Definition$get, 3, model.players)))
			]));
};
var $author$project$Main$actionDiceHint = F2(
	function (model, indicator) {
		var _v0 = A2($author$project$Definition$get, indicator, model.actionDice);
		switch (_v0.$) {
			case 'NoActionDice':
				return '';
			case 'MoveDice':
				return 'Click to move.';
			case 'FightDice':
				return 'Click a tile and select a rival to launch a fight.\n(You\'ll get considerable bonus on red tiles, minor bonus on blue tiles and no bonus on white tiles.)';
			case 'AddDice':
				return 'Click a tile and send our brothers there. (Red tiles for 2 members (3 for Blair) and blue tiles for only 1.)';
			case 'FightOrAdd':
				return 'Click to make another choice between launching a fight or sending members.';
			case 'Lucky':
				return 'Click to make another choice between launching a fight, sending members or getting a bonus.';
			default:
				return 'Click to get a bonus from wealth, prestige, popular will or police attention.';
		}
	});
var $author$project$Definition$Click9 = {$: 'Click9'};
var $author$project$Main$actionDiceMsg = F3(
	function (model, indicator, buttonNumber) {
		var _v0 = A2($author$project$Definition$get, indicator, model.actionDice);
		switch (_v0.$) {
			case 'NoActionDice':
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$NoActionDice, buttonNumber),
					$author$project$Definition$NotClick);
			case 'MoveDice':
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$MoveDice, buttonNumber),
					$author$project$Definition$NotClick);
			case 'FightDice':
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$FightDice, buttonNumber),
					$author$project$Definition$Click9);
			case 'AddDice':
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$AddDice, buttonNumber),
					$author$project$Definition$NotClick);
			case 'FightOrAdd':
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$FightOrAdd, buttonNumber),
					$author$project$Definition$NotClick);
			case 'Lucky':
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$Lucky, buttonNumber),
					$author$project$Definition$NotClick);
			default:
				return A3(
					$author$project$Definition$StartGameMessage,
					$author$project$Definition$ImplementationPhase,
					A2($author$project$Definition$UseActionDice, $author$project$Definition$Reform, buttonNumber),
					$author$project$Definition$NotClick);
		}
	});
var $author$project$Main$actionDiceText = F2(
	function (model, indicator) {
		var _v0 = A2($author$project$Definition$get, indicator, model.actionDice);
		switch (_v0.$) {
			case 'NoActionDice':
				return 'NoActionDice';
			case 'MoveDice':
				return 'MoveDice';
			case 'FightDice':
				return 'Launch a fight';
			case 'AddDice':
				return 'Send families';
			case 'FightOrAdd':
				return 'Fight Or Send';
			case 'Lucky':
				return 'Willingness';
			default:
				return 'Bonus';
		}
	});
var $author$project$Style$button2 = $rtfeldman$elm_css$Html$Styled$Attributes$css(
	_List_fromArray(
		[
			A2($rtfeldman$elm_css$Css$property, 'background-color', '#708090'),
			A2($rtfeldman$elm_css$Css$property, 'top', '0px'),
			A2($rtfeldman$elm_css$Css$property, 'position', 'relative'),
			A2($rtfeldman$elm_css$Css$property, 'display', 'block'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'pointer'),
			A2($rtfeldman$elm_css$Css$property, 'text-align', 'center'),
			A2($rtfeldman$elm_css$Css$property, 'text-decoration', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'outline', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'color', '#fff'),
			A2($rtfeldman$elm_css$Css$property, 'border', 'none'),
			A2($rtfeldman$elm_css$Css$property, 'border-radius', '15px'),
			A2($rtfeldman$elm_css$Css$property, 'box-shadow', '0 9px #696969'),
			A2($rtfeldman$elm_css$Css$property, '-webkit-transition-duration', '0.2s'),
			A2($rtfeldman$elm_css$Css$property, 'transition-duration', '0.2s'),
			A2($rtfeldman$elm_css$Css$property, 'overflow', 'hidden'),
			A2($rtfeldman$elm_css$Css$property, 'cursor', 'url(./src/img/cursor.cur),move'),
			$rtfeldman$elm_css$Css$hover(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'background', '#696969'),
					A2($rtfeldman$elm_css$Css$property, 'display', 'block'),
					A2($rtfeldman$elm_css$Css$property, 'position', 'absolute')
				])),
			$rtfeldman$elm_css$Css$active(
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Css$property, 'background-color', '#696969'),
					A2($rtfeldman$elm_css$Css$property, 'box-shadow', '0 5px #2F4F4F'),
					A2($rtfeldman$elm_css$Css$property, 'transform', 'translateY(4px)'),
					$rtfeldman$elm_css$Css$after(
					_List_fromArray(
						[
							A2($rtfeldman$elm_css$Css$property, 'padding', '0'),
							A2($rtfeldman$elm_css$Css$property, 'margin', '0'),
							A2($rtfeldman$elm_css$Css$property, 'opacity', '1'),
							A2($rtfeldman$elm_css$Css$property, 'transition', '0s')
						]))
				]))
		]));
var $author$project$Main$showActionDice = function (model) {
	var actionDice3 = A2($author$project$Definition$get, 2, model.showActionDiceRespectively) ? A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Events$onClick(
				A2($author$project$Main$actionDiceMsg, model, 2)(2)),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '65%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw'),
				$rtfeldman$elm_css$Html$Styled$Attributes$title(
				A2($author$project$Main$actionDiceHint, model, 2)),
				$author$project$Style$button2
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(
				A2($author$project$Main$actionDiceText, model, 2))
			])) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	var actionDice2 = A2($author$project$Definition$get, 1, model.showActionDiceRespectively) ? A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Events$onClick(
				A2($author$project$Main$actionDiceMsg, model, 1)(1)),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '50%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw'),
				$rtfeldman$elm_css$Html$Styled$Attributes$title(
				A2($author$project$Main$actionDiceHint, model, 1)),
				$author$project$Style$button2
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(
				A2($author$project$Main$actionDiceText, model, 1))
			])) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	var actionDice1 = A2($author$project$Definition$get, 0, model.showActionDiceRespectively) ? A2(
		$rtfeldman$elm_css$Html$Styled$button,
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$Events$onClick(
				A2($author$project$Main$actionDiceMsg, model, 0)(0)),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '10%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '35%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '1.5vw'),
				$rtfeldman$elm_css$Html$Styled$Attributes$title(
				A2($author$project$Main$actionDiceHint, model, 0)),
				$author$project$Style$button2
			]),
		_List_fromArray(
			[
				$rtfeldman$elm_css$Html$Styled$text(
				A2($author$project$Main$actionDiceText, model, 0))
			])) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	return model.showActionDice ? _List_fromArray(
		[actionDice1, actionDice2, actionDice3]) : _List_fromArray(
		[
			A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil)
		]);
};
var $author$project$Main$showDiceNumber = function (model) {
	var _v0 = model.diceState;
	if (_v0.$ === 'Dice') {
		return A2(
			$rtfeldman$elm_css$Html$Styled$div,
			_List_fromArray(
				[
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', '#000000'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-family', 'SWGothe, Arial, sans-serif'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '2vw'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '40%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '30%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'display', 'block'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '20%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '5%'),
					A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center')
				]),
			_List_Nil);
	} else {
		return A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil);
	}
};
var $rtfeldman$elm_css$Css$valuesOrNone = function (list) {
	return $elm$core$List$isEmpty(list) ? {value: 'none'} : {
		value: A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				function ($) {
					return $.value;
				},
				list))
	};
};
var $rtfeldman$elm_css$Css$transforms = A2(
	$elm$core$Basics$composeL,
	$rtfeldman$elm_css$Css$prop1('transform'),
	$rtfeldman$elm_css$Css$valuesOrNone);
var $rtfeldman$elm_css$Css$cssFunction = F2(
	function (funcName, args) {
		return funcName + ('(' + (A2($elm$core$String$join, ', ', args) + ')'));
	});
var $rtfeldman$elm_css$Css$translate2 = F2(
	function (tx, ty) {
		return {
			transform: $rtfeldman$elm_css$Css$Structure$Compatible,
			value: A2(
				$rtfeldman$elm_css$Css$cssFunction,
				'translate',
				_List_fromArray(
					[tx.value, ty.value]))
		};
	});
var $author$project$Main$view = function (model) {
	return A2(
		$rtfeldman$elm_css$Html$Styled$div,
		_List_fromArray(
			[
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '100%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '100%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '0%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '0%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background', 'url(./src/image/background.png)'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'background-size', '100% 100%'),
				A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'z-index', '-1')
			]),
		_List_fromArray(
			[
				model.bgm ? A2(
				$rtfeldman$elm_css$Html$Styled$audio,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/audio/bgm.mp3'),
						$rtfeldman$elm_css$Html$Styled$Attributes$autoplay(true),
						$rtfeldman$elm_css$Html$Styled$Attributes$controls(false),
						$rtfeldman$elm_css$Html$Styled$Attributes$loop(true)
					]),
				_List_Nil) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil),
				model.reformSE ? A2(
				$rtfeldman$elm_css$Html$Styled$audio,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/audio/Reform.wav'),
						$rtfeldman$elm_css$Html$Styled$Attributes$autoplay(true),
						$rtfeldman$elm_css$Html$Styled$Attributes$controls(false),
						$rtfeldman$elm_css$Html$Styled$Attributes$loop(false)
					]),
				_List_Nil) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil),
				model.addSE ? A2(
				$rtfeldman$elm_css$Html$Styled$audio,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/audio/Add.wav'),
						$rtfeldman$elm_css$Html$Styled$Attributes$autoplay(true),
						$rtfeldman$elm_css$Html$Styled$Attributes$controls(false),
						$rtfeldman$elm_css$Html$Styled$Attributes$loop(false)
					]),
				_List_Nil) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil),
				model.fightSE ? A2(
				$rtfeldman$elm_css$Html$Styled$audio,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/audio/Fight.wav'),
						$rtfeldman$elm_css$Html$Styled$Attributes$autoplay(true),
						$rtfeldman$elm_css$Html$Styled$Attributes$controls(false),
						$rtfeldman$elm_css$Html$Styled$Attributes$loop(false)
					]),
				_List_Nil) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil),
				model.moveSE ? A2(
				$rtfeldman$elm_css$Html$Styled$audio,
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$Attributes$src('./src/audio/Move.wav'),
						$rtfeldman$elm_css$Html$Styled$Attributes$autoplay(true),
						$rtfeldman$elm_css$Html$Styled$Attributes$controls(false),
						$rtfeldman$elm_css$Html$Styled$Attributes$loop(false)
					]),
				_List_Nil) : A2($rtfeldman$elm_css$Html$Styled$div, _List_Nil, _List_Nil),
				$author$project$Main$renderHeadBar(model),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '50%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '20%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '0%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'text-align', 'center'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'color', 'white'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'font-size', '3vw')
					]),
				_List_fromArray(
					[
						$rtfeldman$elm_css$Html$Styled$text(
						function () {
							var _v0 = model.showDice;
							switch (_v0.$) {
								case 'FinalDice':
									return 'Move forwards: ' + ($elm$core$Debug$toString(model.dice) + ' tiles');
								case 'FinalMoreDice':
									return 'Action dice points: ' + ($elm$core$Debug$toString(
										A2($author$project$Definition$get, 0, model.actionDiceNumber)) + (' ' + ($elm$core$Debug$toString(
										A2($author$project$Definition$get, 1, model.actionDiceNumber)) + (' ' + $elm$core$Debug$toString(
										A2($author$project$Definition$get, 2, model.actionDiceNumber))))));
								case 'RollingDice':
									return 'Rolling...';
								case 'RollingMoreDice':
									return 'Rolling...';
								default:
									return '';
							}
						}())
					])),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '15%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '90%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '83%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '5%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute')
					]),
				_Utils_ap(
					_List_fromArray(
						[
							$author$project$Main$chooseDiceModel(model),
							$author$project$Main$showDiceNumber(model),
							$author$project$Main$judgeEndButton(model)
						]),
					$author$project$Main$showActionDice(model))),
				A2(
				$rtfeldman$elm_css$Html$Styled$div,
				_List_fromArray(
					[
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '80%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '2%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '10%'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-width', '3px'),
						A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'border-style', 'solid'),
						$rtfeldman$elm_css$Html$Styled$Attributes$css(
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Css$property, 'overflow', 'hidden'),
								A2($rtfeldman$elm_css$Css$property, 'box-shadow', '0px 0px 10px #888888')
							]))
					]),
				_List_fromArray(
					[
						A2(
						$rtfeldman$elm_css$Html$Styled$div,
						_List_fromArray(
							[
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'width', '1440px'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'height', '1440px'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'left', '0%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'top', '0%'),
								A2($rtfeldman$elm_css$Html$Styled$Attributes$style, 'position', 'absolute'),
								$rtfeldman$elm_css$Html$Styled$Attributes$css(
								_List_fromArray(
									[
										A2($rtfeldman$elm_css$Css$property, 'transform-origin', '50% 50%'),
										$rtfeldman$elm_css$Css$transforms(
										_List_fromArray(
											[
												A2(
												$rtfeldman$elm_css$Css$translate2,
												$rtfeldman$elm_css$Css$px(model.mapMoveX),
												$rtfeldman$elm_css$Css$px(model.mapMoveY))
											]))
									]))
							]),
						_Utils_ap(
							A2($author$project$Map$renderMap, model.map, model),
							$author$project$Animation$playersAnimation(model))),
						$author$project$Map$renderDetailedTile(model),
						$author$project$Animation$diceAnimation(model)
					])),
				$author$project$PopUp$renderPopUp(model),
				$author$project$Main$renderSideBar(model),
				$author$project$Main$renderAILog(model)
			]));
};
var $author$project$Main$main = $elm$browser$Browser$element(
	{
		init: $author$project$Model$init,
		subscriptions: $author$project$Main$subscriptions,
		update: $author$project$Update$update,
		view: A2($elm$core$Basics$composeR, $author$project$Main$view, $rtfeldman$elm_css$Html$Styled$toUnstyled)
	});
_Platform_export({'Main':{'init':$author$project$Main$main($elm$json$Json$Decode$string)(0)}});}(this));
! function(e, n) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports =
		n() : "function" == typeof define && define.amd ? define(n) : e.hanabi = n()
}(this, function() {
	"use strict";

	function e(e, n) {
		return n = {
			exports: {}
		}, e(n, n.exports), n.exports
	}

	function n(e) {
		return '<span style="color: slategray">' + e + "</span>"
	}
	var r = e(function(e) {
			var n = e.exports = function() {
				return new RegExp("(?:" + n.line().source + ")|(?:" + n.block().source +
					")", "gm")
			};
			n.line = function() {
				return /(?:^|\s)\/\/(.+?)$/gm
			}, n.block = function() {
				return /\/\*([\S\s]*?)\*\//gm
			}
		}),
		u = ["23AC69", "91C132", "F19726", "E8552D", "1AAB8E", "E1147F", "2980C1",
			"1BA1E6", "9FA0A0", "F19726", "E30B20", "E30B20", "A3338B"
		],
		t = function(e, t) {
			void 0 === t && (t = {});
			var o = t.colors;
			void 0 === o && (o = u);
			var f = 0,
				c = {},
				i =
				/[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/,
				s = /</,
				a = new RegExp("(" + i.source + "|" + s.source + ")|(" + r().source + ")",
					"gmi");
			return e.replace(a, function(e, r, u) {
				if (u) return n(u);
				if ("<" === r) return "&lt;";
				var t;
				c[r] ? t = c[r] : (t = o[f], c[r] = t);
				/* この部分でスマホブラウザでは、constructor が上手く表示されない。 
				   #function Object... と表示されてしまう。by Atman */
				//var i = '<span style="color: #' + t + '">' + r + "</span>";
				var i;
				if (r.replace(/^s+|s+$/g,'') == 'constructor') {
					i = '<span style="color: #">' + "constructor" + "</span>";
				} else {
					i = '<span style="color: #' + t + '">' + r + "</span>";
				}
				/* 上記部分で、「constructor」が表示される場合を分岐した by Atman */
				return f = ++f % o.length, i
			})
		};
	return t
});
var HanabiBrowser = {
	ref: {
		colors: ['23AC69', '91C132', 'F19726', 'E8552D', '1AAB8E', 'E1147F',
			'2980C1', '1BA1E6', '9FA0A0', 'F19726', 'E30B20', 'E30B20', 'A3338B'
		],
		lineNumber: true
	},
	default: {
		defaultColors: ['23AC69', '91C132', 'F19726', 'E8552D', '1AAB8E', 'E1147F',
			'2980C1', '1BA1E6', '9FA0A0', 'F19726', 'E30B20', 'E30B20', 'A3338B'
		]
	},
	start: function(selector, line_number) {
		HanabiBrowser.ref.lineNumber = line_number;
		$(selector || 'code').each(function(code, element) {

			/* 1. 変換して欲しくない文字列を適当な文字列に置換 by Atman*/
			var ha_code = $(element).html().replace(new RegExp('/// &lt;', 'g'),'__temp1__');
			var ha_code = ha_code.replace(new RegExp('&gt;&lt;', 'g'),'__temp2__');

			 /* デフォルトでは、& が &amp; に変換されてしまうため、replae(new RegExp('&amp;'...))を追記して対策 by Atman */
			var ha_code = ha_code.replace(new RegExp('&lt;', 'g'),'<').
											replace(new RegExp('&gt;', 'g'), '>').replace(new RegExp('&amp;', 'g'), '&');

			/* 2. 適当な文字列に置換していた文字列を元に戻す by Atman*/
			var ha_code = ha_code.replace(new RegExp('__temp1__', 'g'),'/// &lt;');
			var ha_code = ha_code.replace(new RegExp('__temp2__', 'g'),'&gt;&lt;');

			var ha_code = hanabi(ha_code, HanabiBrowser.ref);

			ha_code = ha_code.substring(0, ha_code.length - 1).replace(new RegExp('\n', 'g'), '<br>').
											replace(new RegExp('  ', 'g'), '&nbsp&nbsp');

			var lineNumber = 0;
			var lines = [];
			ha_code.split('<br>').forEach(function(codeline) {
				if (HanabiBrowser.ref.lineNumber) {
					lines.push(
						'<span style="width: 30px; display: inline-block" class="hanabi-linenumber">' +
						(++lineNumber).toString() + '</span>' + codeline)
				} else {
					lines.push(
						'<span style="width: 30px; display: none" class="hanabi-linenumber">' +
						(++lineNumber).toString() + '</span>' + codeline)
				}
			});
			ha_code = lines.join('<br>');
			$(element).html(ha_code)
		})
	},
	setLinenumber: function(line_number) {
		HanabiBrowser.ref.lineNumber = line_number;
		if (HanabiBrowser.ref.lineNumber) {
			$('.hanabi-linenumber').css('display', 'inline-block')
		} else {
			$('.hanabi-linenumber').css('display', 'none')
		}
	},
	toggleLinenumber: function() {
		HanabiBrowser.ref.lineNumber = !HanabiBrowser.ref.lineNumber;
		HanabiBrowser.setLinenumber(HanabiBrowser.ref.lineNumber)
	},
	putColor: function(color) {
		if (typeof color == 'string') {
			HanabiBrowser.ref.colors.push(color)
		} else {
			HanabiBrowser.ref.colors = HanabiBrowser.ref.colors.concat(color)
		}
	},
	defaultColors: function() {
		HanabiBrowser.ref.colors = HanabiBrowser.default.defaultColors
	},
	clearColors: function() {
		HanabiBrowser.ref.colors = []
	}
}

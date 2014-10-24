// validation
// Alex Buznik (http://buznik.net/)
// 2012-2013
//
// just call
//
// 		var validation = new validize("[data-validate]");
//
// when window ready. It is safe to recall it when new fields are added.
// fields to be validated need appropriate 'data-validate' attribute.

if (typeof page_var == "undefined") page_var = {}
page_var.lang = 0; // id of the language, corresponds with the second var name in err_string;

// (function( $ ) {
	var validize = function(obj) {
		var _this = this;
		this.lang = page_var.lang;

		// console.log('init', $(obj));
		$(obj).on('blur', function(e) {
			_this.validate(this);
		});

		this.addError = function(curObj, error, dv, err_string) {
			if (curObj.hasClass("error")) {
				curObj.closest(".i").prev("label").removeClass("valid").find(".err_string").remove();
			}

			err_string = _this.err_string(err_string);
			curObj
				.addClass("error")
				.closest(".i").prev("label").removeClass("valid").addClass("invalid")
				.find("em").before('<span class="err_string">(' + err_string + ')</span>')
			error[dv] = err_string;
		}

		this.removeError = function(curObj, error, dv) {
			curObj.removeClass("error")
			if (!curObj.closest(".i").find(".error").length) {
				curObj.closest(".i").prev("label").addClass("valid").removeClass("invalid").find(".err_string").remove();
			}
			if (error) delete error.dv;
		}

		this.err_string = function(get) {
			var string = {
				'full': {
					0: "The field must not be empty"
				},
				'length': {
					0: "At least 6 symbols"
				},
				'password': {
					0: "The passwords must match"
				},
				'text': {
					0: 'Letters only'
				},
				'phone': {
					0: "Numbers only and +"
				},
				'email': {
					0: "E-mail address is incorrect"
				},
				'general': {
					0: "This field is incorrect"
				}

			}
			if (string[get]) {
				return string[get][_this.lang];
			} else {
				return false;
			}
		}



		this.validate = function(obj) {
			var curObj = $(obj);
			var error = {};
			var c = curObj.val();
			var form = curObj.closest("form");

			var dv = curObj.attr("data-validate");
			_this.removeError(curObj);
			if (!$(this).hasClass("opt")) {

				if (dv == "full" ) {
					if (c == '' || c == ' ' || c == "" ) {
						_this.addError(curObj, error, dv, "full");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "length" ) {
					if (c == '' || c == ' ' || c == "" ) {
						_this.addError(curObj, error, dv, "full");
					} else if (c.length < 6 ) {
						_this.addError(curObj, error, dv, "length");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "password" ) {
					if (c == '' || c == ' ' || c == "" ) {
						_this.addError(curObj, error, dv, "full");
					} else if (c != curObj.parents("li").prev("li").find("input[data-pass-one]").val()) {
						_this.addError(curObj, error, dv, "password");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "text" ) {
					var reg = new RegExp('[0-9]+');
					if (c == '' || c == ' ' || c == "" ) {
						_this.addError(curObj, error, dv, "full");
					} else if ( reg.test(c) ) {
						_this.addError(curObj, error, dv, "text");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "phone" ) {
					var reg = new RegExp('[0-9]+');
					if (c == '' || c == ' ' || c == "" || c.length < 7) {
						_this.addError(curObj, error, dv, "full");
					} else if (!reg.test(c)) {
						_this.addError(curObj, error, dv, "phone");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "date" ) {
					var reg = new RegExp('[0-9\.]+');

					if (c == '' || c == ' ' || c == "" ) {
						_this.addError(curObj, error, dv, "full");
					} else if (!reg.test(c)) {
						_this.addError(curObj, error, dv, "general");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "select" ) {
					if ( !curObj.siblings(".dropdown").find("li[data-value='" + c + "']").length ) {
						_this.addError(curObj, error, dv, "general");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}

				if (dv == "email" ) {

				    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

				    if ( reg.test(c) != true) {
						_this.addError(curObj, error, dv, "email");
					} else {
						_this.removeError(curObj, error, dv);
					}
				}
			}


			if (curObj.is(form.find("[data-validate]").last()) && !form.find(".error").length) {
				form.addClass("is_valid")
				if (form.hasClass("submit_after")) form.submit();
			} else {
				form.removeClass("is_valid");
				if (curObj.is(form.find("[data-validate]").last())) form.removeClass("submit_after");
			}

		}
	}

	$.fn.validize = function(extendedValidize) {
		console.log(extendedValidize);
		if (typeof extendedValidize != "undefined") {
			var ext = $.extend(extendedValidize, validize);
			console.log(ext);
			var validate = new ext(this);
		} else {
			var validate = new validize(this);
		}
	};

	function extend(Child, Parent) {
		var F = function() { }
		F.prototype = Parent.prototype
		Child.prototype = new F()
		Child.prototype.constructor = Child
		Child.superclass = Parent.prototype
	}
// })(jQuery);
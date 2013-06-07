// validation
// Alex Buznik (http://buznik.net/)
// 2012-2013
//
// just call validate_ini() when window ready. It is safe to recall it when new fields are added.

function validate_ini() {

	$(".form_wrap form [data-validate]").unbind('blur').bind('blur', function(e) {
		var curObj = $(this);
		var error = {};
		var c = curObj.val();
		var dv = curObj.attr("data-validate");

		function addError(curObj, error, dv, err_string) {
			if (curObj.hasClass("error")) {
				curObj.parents(".i").prev("label").removeClass("valid").find(".err_string").remove();
			}
			curObj
				.addClass("error")
				.parents(".i").prev("label").removeClass("valid").addClass("invalid")
				.find("em").before('<span class="err_string">(' + err_string + ')</span>')
			error[dv] = err_string;
		}

		function removeError(curObj, error, dv) {
			curObj.removeClass("error")
			if (!curObj.parents(".i").find(".error").length) {
				curObj.parents(".i").prev("label").addClass("valid").removeClass("invalid").find(".err_string").remove();
			}
			delete error.dv;
		}

		removeError(curObj);
		if (!$(this).hasClass("opt")) {


			if (dv == "full" ) {
				if (c == '' || c == ' ' || c == "" ) {
					addError(curObj, error, dv, "This field should not be empty");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "length" ) {
				if (c == '' || c == ' ' || c == "" ) {
					addError(curObj, error, dv, "This field should not be empty");
				} else if (c.length < 6 ) {
					addError(curObj, error, dv, "At least 6 symbols");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "password" ) {
				if (c == '' || c == ' ' || c == "" ) {
					addError(curObj, error, dv, "This field should not be empty");
				} else if (c != curObj.parents("li").prev("li").find("input[data-pass-one]").val()) {
					addError(curObj, error, dv, "The passwords must match");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "text" ) {
				var reg = new RegExp('[0-9]+');
				if (c == '' || c == ' ' || c == "" ) {
					addError(curObj, error, dv, "This field should not be empty");
				} else if ( reg.test(c) ) {
					addError(curObj, error, dv, "This field can contain letters only");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "phone" ) {
				var reg = new RegExp('[0-9]+');
				if (c == '' || c == ' ' || c == "" || c.length < 7) {
					addError(curObj, error, dv, "This field should not be empty");
				} else if (!reg.test(c)) {
					addError(curObj, error, dv, "This field can contain numbers only and +");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "date" ) {
				var reg = new RegExp('[0-9\.]+');
				
				if (c == '' || c == ' ' || c == "" ) {
					addError(curObj, error, dv, "This field should not be empty");
				} else if (!reg.test(c)) {
					addError(curObj, error, dv, "This field is incorrect");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "select" ) {
				if ( !curObj.siblings(".dropdown").find("li[data-value='" + c + "']").length ) {
					addError(curObj, error, dv, "This field is incorrect");
				} else {
					removeError(curObj, error, dv);
				}
			}

			if (dv == "birth" ) {
				if (c == '' || c == ' ' ) {
					addError(curObj, error, dv, "This field should not be empty");
				} else {
					removeError(curObj, error, dv);
		
					// parse years
					var check = c.split("-");
					var year = new Date;
					year = year.getFullYear();
					if (parseInt(check[0]) > 31 || parseInt(check[1]) > 12 || parseInt(check[2]) > year || parseInt(check[2]) < 1910 ) {
						addError(curObj, error, dv, "Date of birth is incorrect");
					} else {
						removeError(curObj, error, dv);
					}
				}
			}

			if (dv == "email" ) {

			    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			    
			    if ( reg.test(c) != true) {
					addError(curObj, error, dv, "E-mail address is incorrect");
				} else {
					removeError(curObj, error, dv);
				}
			}
		}


		if (curObj.is(curObj.parents("form").find("[data-validate]").last()) && !curObj.parents("form").find(".error").length) {
			curObj.parents("form").addClass("is_valid")
			if (curObj.parents("form").hasClass("submit_after")) curObj.parents("form").submit();
		} else {
			curObj.parents("form").removeClass("is_valid");
			if (curObj.parents("form").hasClass("submit_after")) curObj.parents("form").removeClass("submit_after")
		}


	});
}

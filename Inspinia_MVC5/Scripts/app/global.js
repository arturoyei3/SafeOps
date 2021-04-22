
var isMobileDevice = window.navigator.userAgent.toLowerCase().includes("mobi");

Vue.http.options.emulateJSON = true;
var check = "ok";

var options = {
    validate: {
        errorElement: "span",
        errorClass: 'form-control-label',
        highlight: function (element) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-danger');
            $(element).closest('.form-control').addClass('form-control-danger');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-danger').addClass('has-success');
            $(element).closest('.form-control').removeClass('form-control-danger');
        }
    }
}

$.fn.clearForm = function () {
    $(this).each(function () {
        $(this).find(".form-group").removeClass("has-success").removeClass("has-danger");
        $(this).trigger('reset.unobtrusiveValidation');
    });
};

var toggleLoader = function () {
    $('.loader-container').toggleClass('hidden');
}

var toggleLoaderHistory = function () {
    $('.loader-container-history').toggleClass('hidden');
}

var toggleMenu = function () {
    $('.pace-done').toggleClass('open');
}

var globalInAll = function () {
    $('#sidebarCollapse').on('click', function () {
        $('.hamburger').toggleClass('is-active');
    });
}

var globalToggleMenu = function () {
    if (isMobileDevice) {
        $('.y3-sidebar-wrapper,.hamburger').toggleClass('is-active');
    }
}

var $_get = function (key) {
    key = key.replace(/[\[]/, '\\[');
    key = key.replace(/[\]]/, '\\]');
    var pattern = "[\\?&]" + key + "=([^&#]*)";
    var regex = new RegExp(pattern);
    var url = unescape(window.location.href);
    var results = regex.exec(url);
    if (results === null) {
        return null;
    } else {
        return results[1];
    }
};

function $_getPath() {
    var path = (window.location.pathname).split('/')[1];
    return path;
}

function doHashCode() {
    String.prototype.hashCode = function () {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz";
        possible += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        possible += "0123456789";
        for (var i = 0; i < 15; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }
    var hash = new String().hashCode();
    return hash;
}

function fformat(fecha) {
    return moment(fecha).format("YYYY-MM-DD")
}

var toggleCard = function () {
    $('.collapse-link').on('click', function (e) {
        e.preventdefault();
        var ibox = $(this).closest('div.card');
        var button = $(this).find('i');
        var content = ibox.children('.card-body');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });
}


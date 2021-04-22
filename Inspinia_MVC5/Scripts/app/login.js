var login = new Vue({
    el: '#appLogin',
    data: function () {
        return {
            send: {
                userName: '',
                password: ''
            },
            alert: false,
            error: true,
            msg: ''
        };
    },
    mounted: function () {
        var self = this;
        $("body").keypress(function (e) {
            if (e.which === 13) {
                self.login();
            }
        });
    },
    methods: {
        login: function () {
            var self = this,
                form = $("#formLogin");
            form.validate({
                focusCleanup: true,
                rules: {
                    UserName: {
                        required: true,
                        email: true
                    },
                    Password: {
                        required: true,
                        minlength: 3,
                        maxlength: 15
                    }
                },
                //errorElement: options.validate.errorElement,
                //errorClass: options.validate.errorClass,
                //highlight: options.validate.highlight,
                //unhighlight: options.validate.unhighlight
            });

            if (form.valid()) {
                toggleLoader();
                self.$http.post('/Account/LoginExt', JSON.stringify(self.send)).then(function (response) {
                    toggleLoader();
                    switch (response.body.status) {
                        case 1:                           
                            var path = $_get("ReturnUrl");
                            if (path !== '/' && path !== null) {
                                location.href = path;
                            } else {
                                location.href = "/Dashboards/Dashboard_1";
                            }
                            break;
                        case 2:
                            self.alert = true;
                            self.error = true;
                            self.msg = response.body.msg;
                            swal("Error", self.msg, "error");

                            break;
                        default:
                            console.log(response.body.status);
                            self.alert = false;
                            break;
                    }
                    self.send.userName = '';
                    self.send.password = '';
                    form.clearForm();
                }, function () {
                    console.log('ocurrio un error');
                    toggleLoader();
                });
            } else {
            }
        }
    }
});
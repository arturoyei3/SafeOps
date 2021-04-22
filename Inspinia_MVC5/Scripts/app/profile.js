var vuePerfil = new Vue({
    el: '#wrapper',
    data: function () {
        return {
            op: {
                user: {
                    nombre: '',
                    apellido: '',
                    correo: '',
                    estado: 0,
                    menu: [],
                    password_last: '',
                    password_new: '',
                    password_repeat: ''
                },               
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
                },
                pag: {
                    path: '',
                    current: 'list',
                    list: true,
                    edit: false,
                    detail: false,
                    nuevo: false,
                    follow: false,
                    ismobile: false
                },
                clock: {
                    fecha: '',
                    hora: ''
                }
            },

            detail69: { //Objeto
                Id: '',
                RFC: 'VARL8504251Z3',
                Fecha: '',
                T69: true,
                T69B: true,
                Tipo: 1,
                Nombre: '',
                Supuestos: [
                    {
                        Supuesto: 'Condonado',
                        PPublicacion: '',
                        Monto: 3232,
                        Publicacion: ''
                    },
                    {
                        Supuesto: 'Supuesto 22',
                        PPublicacion: '',
                        Monto: 0,
                        Publicacion: ''
                    }
                ],
            },

            res69B: {
                Num: 0,
                RFC: 'ddd',
                Nombre: 'ddd',
                Situacion: '',
                PubPresuncion: '',
                SATPresuntos: '',
                NoFechaOfGlobalPresuncion: '',
                PubDOFPresuntos: '',
                PubDesvirtuados: '',
                NoFechaOfGlobalDesvirtuados: '',
                PubDOFDesvirtuados: '',
                NoFechaOfGlobalDefinitivos: '',
                PubDefinitivos: '',
                PubDOFDefinitivos: '',
                NoFechaOfGlobalSentenciaFav: '',
                PubSentenciaFav: '',
                NoFechaOfGlobalSentenciaFav2: '',
                PubDOFSentenciaFav: ''
            },

            currentperiod: {
                InitDate: '',
                EndDate: '',
            },

            history: [
                {
                    RFC: 'dd',
                    Fecha: '',
                    T69: true,
                    T69B: false
                },
            ],

            provhistory: [
                {
                    RFC: 'dd',
                    Fecha: '',
                    T69: true,
                    T69B: false
                },
            ],

            currentsearchs: [
                {                    
                    RFC: 'dd',
                    Fecha: '',
                    T69: true,
                    T69B: false
                },
            ],

            send: {
                password: '',
                newpassword: '',
                repassword: '',
            },   
            
            TypeAccount: {
                RolName: '',
                Description: '',
                MaxSearch: '',
                DayInsert: '',
                MonthInsert: '',
                YearInsert: '',
                CurrentSearchs: '',
                CurrentProv: '',
                CurrentFailProv: '',
                Res: '',
                Message: '',
            },

            filterCurrentSearchs: '',
            filterHistory: '',
            filterProv: '',
            alert: false,
            error: true,
            msg: ''
        };
    },
    computed: {        
        filteredCurrentSearchs() {

            if (this.filterCurrentSearchs != '') {
                return this.currentsearchs
                    .filter(u => u.RFC.toUpperCase().indexOf(this.filterCurrentSearchs.toUpperCase()) > -1);
            }
            else
                return this.currentsearchs;

        },

        filteredHistory() {

            if (this.filterHistory != '') {
                return this.history
                    .filter(u => u.RFC.toUpperCase().indexOf(this.filterHistory.toUpperCase()) > -1);
            }
            else
                return this.history;
        },

        filteredProv() {

            if (this.filterProv != '') {
                return this.provhistory
                    .filter(u => u.RFC.toUpperCase().indexOf(this.filterProv.toUpperCase()) > -1);
            }
            else
                return this.provhistory;

        },
    },
    mounted: function () {    
        var self = this;
        setTimeout(function () {
            self.GetTypeAccountInfo();
            self.GetCurrentPeriod();
            self.GetCurrentSearchs();
            self.GetHistory();
            self.GetProvHistory();
        }, 500);

        var self = this;        
    },
    filters: {
        mayusculas: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.toUpperCase();
        },

        dateFormat: function (value) {
            if (!value) return '';
            return moment(value).locale('es').format('DD/MM/YYYY');
        },
    },
    methods: {

        GetTypeAccountInfo: function () {
            var self = this;
            toggleLoader();
            self.$http.post('/Dashboards/GetTypeAccountInfo').then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.TypeAccount.RolName = response.body.d.RolName;
                        self.TypeAccount.Description = response.body.d.Description;
                        self.TypeAccount.MaxSearch = response.body.d.MaxSearch;
                        self.TypeAccount.DayInsert = response.body.d.DayInsert;
                        self.TypeAccount.MonthInsert = response.body.d.MonthInsert;
                        self.TypeAccount.YearInsert = response.body.d.YearInsert;
                        self.TypeAccount.CurrentSearchs = response.body.d.CurrentSearchs;
                        self.TypeAccount.CurrentProv = response.body.d.CurrentProv;
                        self.TypeAccount.CurrentFailProv = response.body.d.CurrentFailProv;

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
            }, function () {
                toggleLoader();
                console.log('ocurrio un error');
            });
        },

        GetCurrentPeriod: function () {
            var self = this;

            toggleLoaderHistory();
            self.$http.post('/Account/GetCurrentPeriod').then(function (response) {
                switch (response.body.status) {
                    case 1:
                        self.currentperiod = response.body.d;
                        break;                    
                    default:
                        console.log(response.body.status);
                        self.alert = false;
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });

        },

        GetCurrentSearchs: function () {
            var self = this;

            toggleLoaderHistory();
            self.$http.post('/Account/CurrentSearchs').then(function (response) {
                toggleLoaderHistory();
                switch (response.body.status) {
                    case 1:
                        self.currentsearchs = response.body.d;
                        toggleLoaderHistory();
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
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });

        },

        GetHistory: function () {
            var self = this;

            toggleLoaderHistory();
            self.$http.post('/Account/History').then(function (response) {
                toggleLoaderHistory();
                switch (response.body.status) {
                    case 1:
                        self.history = response.body.d;
                        toggleLoaderHistory();
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
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });
            
        },

        GetProvHistory: function () {
            var self = this;

            toggleLoaderHistory();
            self.$http.post('/Account/ProvHistory').then(function (response) {
                toggleLoaderHistory();
                switch (response.body.status) {
                    case 1:
                        self.provhistory = response.body.d;
                        toggleLoaderHistory();
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
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });

        },

        changePassword: function () {

            var self = this,
                form = $("#formContrasena");
            form.validate({
                focusCleanup: true,
                rules: {
                    Password: {
                        required: true,
                    },
                    NewPassword: {
                        required: true,
                    },
                    RePassword: {
                        required: true,                        
                    },
                },
            });


            if (form.valid()) {

                if (self.send.newpassword == self.send.repassword) {
                    toggleLoader();
                    self.$http.post('/Account/ChangePassword', JSON.stringify({ 'password': self.send.password, 'newpassword': self.send.newpassword})).then(function (response) {
                        toggleLoader();
                        switch (response.body.status) {
                            case 1:
                                swal("Cambio de contraseña", "Se ha realizado el cambio de contraseña.", "success");                                                                    
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
                        self.send.password = '';
                        self.send.newpassword = '';
                        self.send.repassword = '';

                        form.clearForm();
                    }, function () {
                        console.log('ocurrio un error');
                    });
                }
                else {
                    swal("Error", "Contraseñas no coinciden.", "error");
                }
            } else {
            }



        },

        toggleInputForm: function (action, id, rfc) {
            var self = this;
            if (action === 'detail69') {
                toggleLoader();
                self.$http.post('/Searchs/Detail69', JSON.stringify({ 'idSearch': id })).then(function (response) {
                    toggleLoader();
                    switch (response.body.status) {
                        case 1:
                            self.detail69.RFC = rfc;
                            self.detail69.Nombre = response.body.d.Nombre;
                            self.detail69.Supuestos = response.body.d.Supuestos;

                            $('#RFCDetail').modal('toggle');

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
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                });
            }
            if (action === 'detail69B') {
                toggleLoader();
                self.$http.post('/Searchs/Detail69B', JSON.stringify({ 'idSearch': id })).then(function (response) {
                    toggleLoader();
                    switch (response.body.status) {
                        case 1:
                            vuePerfil.res69B = response.body.d;
                            $('#RFCDetail69B').modal('toggle');
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
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                });
            }
        },
    }
});
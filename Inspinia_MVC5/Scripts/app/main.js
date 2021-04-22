var mainVue = new Vue({
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

            message: {},

            messages: [],

            allmessages: [{
                InsertDate: '',
                Title: '',
                MessageText: '',
                Icon: '',
                Id: 0
            }],

            user: {
                name: '',
                rolId: 0,
                rol: '',
            },

            excel: {
                //import excel
                _columnas: [],
                _exceljson: [],
                _exceljsonfinal: [],
                
                procesados: 0,
                conerror: 0,

                detail: { //Objeto
                    Id: '',
                    RFC: '',
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
            },

            dashboard: {
                LastSearch: '',
                LastUpdate: '',
                Title: '',
                Status: 1,
                Message: '',    
            },

            perfil: {
                currentperiod: {
                    InitDate: '',
                    EndDate: '',
                },

                history: [
                    {
                        RFC: '',
                        Fecha: '',
                        T69: true,
                        T69B: false
                    },
                ],

                provhistorysimple: [
                    {
                        RFC: '',
                    }
                ],

                provhistory: [
                    {
                        RFC: '',
                        Fecha: '',
                        T69: true,
                        T69B: false
                    },
                ],

                currentsearchs: [
                    {
                        RFC: '',
                        Fecha: '',
                        T69: true,
                        T69B: false
                    },
                ],

                currentautsearchs: [
                    {
                        RFC: '',
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
                    UserName: '',
                    RolId: 0,

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
                filterCurrentAutSearchs: '',
                filterHistory: '',
                filterProv: '',

                filterSoloCurrentSearchs: false,
                filterSoloCurrentAutSearchs: false,
                filterSoloHistory: false,
                filterSoloProv: false,


                alert: false,
                error: true,
                msg: ''

            },

            searchfilter: {
                busqueda: '1',
                selecteddate: '',
            },

            search: {
                send: {                    
                    RFC: '',
                },
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
                RFC: '',
                Nombre: '',
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

            res: {
                Num: 0,
                RFC: '',
                Nombre: '',
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

            alert: false,
            error: true,
            msg: ''
        };
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

        split69: function (value) {
            if (!value) return '';
            var s = value.split(':');

            if(s.length > 1)
                return s[1];
            else
                return s[0];
        },

    },
    computed: {
        filteredCurrentSearchs() {
            var _res = [];

            if (this.perfil.filterSoloCurrentSearchs) {
                _res = this.perfil.currentsearchs
                    .filter(u => u.C69 > 0 || u.C69B > 0);
            }
            else
                _res = this.perfil.currentsearchs;
           

            if (this.perfil.filterCurrentSearchs != '') {
                return _res
                    .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterCurrentSearchs.toUpperCase()) > -1);
            }
            else
                return _res;

        },

        filteredCurrentAutSearchs() {

            var _res = [];

            if (this.perfil.filterSoloCurrentAutSearchs) {
                _res = this.perfil.currentautsearchs
                    .filter(u => u.C69 > 0 || u.C69B > 0);
            }
            else
                _res = this.perfil.currentautsearchs;


            if (this.perfil.filterCurrentAutSearchs != '') {
                return _res
                    .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterCurrentAutSearchs.toUpperCase()) > -1);
            }
            else
                return _res;



            //if (this.perfil.filterCurrentAutSearchs != '') {
            //    return this.perfil.currentautsearchs
            //        .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterCurrentAutSearchs.toUpperCase()) > -1);
            //}
            //else
            //    return this.perfil.currentautsearchs;

        },

        filteredHistory() {

            var _res = [];

            if (this.perfil.filterSoloHistory) {
                _res = this.perfil.history
                    .filter(u => u.C69 > 0 || u.C69B > 0);
            }
            else
                _res = this.perfil.history;


            if (this.perfil.filterHistory != '') {
                return _res
                    .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterHistory.toUpperCase()) > -1);
            }
            else
                return _res;





            //if (this.perfil.filterHistory != '') {
            //    return this.perfil.history
            //        .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterHistory.toUpperCase()) > -1);
            //}
            //else
            //    return this.perfil.history;
        },

        filteredProv() {

            var _res = [];

            if (this.perfil.filterSoloProv) {
                _res = this.perfil.provhistory
                    .filter(u => u.C69 > 0 || u.C69B > 0);
            }
            else
                _res = this.perfil.provhistory;


            if (this.perfil.filterProv != '') {
                return _res
                    .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterProv.toUpperCase()) > -1);
            }
            else
                return _res;


            //if (this.perfil.filterProv != '') {
            //    return this.perfil.provhistory
            //        .filter(u => u.RFC.toUpperCase().indexOf(this.perfil.filterProv.toUpperCase()) > -1);
            //}
            //else
            //    return this.perfil.provhistory;

        },
    },
    mounted: function () {
        var self = this;
        var pathname = $(location).attr('pathname').toLowerCase();
        var path = pathname.split('/');

        self.op.pag.path = path[path.length - 1];

        $("#txtsearch").keypress(function (e) {
            if (e.which === 13) {
                self.searchRFC();
            }
        });

        setTimeout(function () {
            self.GetUserInfo();
            self.GetMessages();

            //DASBOARD
            if (self.op.pag.path === "dashboard_1") {
                self.GetTypeAccountInfo();
                self.GetAccountInfo();
            }

            //PERFIL
            if (self.op.pag.path === 'profile') {
                self.GetTypeAccountInfo();
                self.GetCurrentPeriod();
              
            }       

            if (self.op.pag.path === 'excel') {
                self.GetProvHistorySimple();
            }       

            if (self.op.pag.path === 'consultas') {
                self.GetCurrentPeriod();
                self.GetCurrentSearchs();
                self.GetCurrentAutSearchs();
                self.GetHistory();
                self.GetProvHistory();
            }

            if (self.op.pag.path === 'messages') {
                self.GetAllMessages();               
            }          
            
        }, 500);
    },
    methods: {
        //GENERAL
        toggleInputForm: function (action, id, rfc) {
            var self = this;           

            if (action === 'searchRFC') {
                if (self.searchfilter.busqueda == 1) {
                    self.op.pag.list = true; self.op.pag.current = 'Búsqueda RFC';
                    self.searchRFC();
                }
                else { //Por fecha
                    self.searchfilter.selecteddate = $("#data_1 input").val();
                    if (moment(self.searchfilter.selecteddate, 'DD/MM/YYYY', true).isValid()) {
                        if (self.user.rolId > 1) {
                            self.op.pag.list = true; self.op.pag.current = 'Búsqueda RFC';
                            self.searchRFC();
                        }
                        else {
                            swal("Error", "Opción exclusiva para usuarios Premium.", "info");
                        }
                    }
                    else {
                        swal("Error", "Seleccione una fecha válida.", "info");
                    }                    
                }
            }

            if (action === 'detail') {
                self.op.pag.detail = true; self.op.pag.current = 'Detalle';
            }

            if (action === 'list') {
                self.op.pag.list = true; self.op.pag.current = 'Lista';
            }

            if (action === 'detail69') {
                self.op.pag.list = false; self.op.pag.detail = true;
                toggleLoader();
                self.$http.post('/Searchs/Detail69', JSON.stringify({ 'idSearch': id })).then(function (response) {
                    toggleLoader();
                    switch (response.body.status) {
                        case 1:
                            self.detail69.RFC = rfc;
                            self.detail69.Nombre = response.body.d.Nombre;
                            self.detail69.Supuestos = response.body.d.Supuestos;

                            //self.detail = response.body.d;

                            $('#RFCDetail').modal('toggle');

                            break;
                        case 2:
                            self.alert = true;
                            self.error = true;
                            self.msg = response.body.msg;
                            swal("Error", self.msg, "error");
                            break;
                        default:
                            location.href = "/Account/login";
                            break;
                    }
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                });
            }

            if (action === 'detail69B') {
                self.op.pag.list = false; self.op.pag.detail = true;
                toggleLoader();
                self.$http.post('/Searchs/Detail69B', JSON.stringify({ 'idSearch': id })).then(function (response) {
                    toggleLoader();
                    switch (response.body.status) {
                        case 1:
                            self.res69B = response.body.d;
                            $('#RFCDetail69B').modal('toggle');
                            break;
                        case 2:
                            self.alert = true;
                            self.error = true;
                            self.msg = response.body.msg;
                            swal("Error", self.msg, "error");
                            break;
                        default:
                            location.href = "/Account/login";
                            break;
                    }
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                });
            }

            if (action === 'edit') {

            }

            if (action === 'new') {
                self.op.pag.new = true;
            }

            if (action === 'copiar') {
                self.op.pag.list = true;
            }

            if (action === 'delete') {
                self.op.pag.list = true;
            }
        },

        GetUserInfo: function () {
            var self = this;
            self.$http.post('/Account/GetUserInfo').then(function (response) {
                switch (response.body.status) {
                    case 1:
                        self.user.name = response.body.d.Name;
                        self.user.rolId = response.body.d.RolId;
                        self.user.rol = response.body.d.Rol;

                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
            });
        },

        GetPremium: function () {
            var self = this;
            $('#modalPricing').modal('toggle');
        },

        //PERFIL       °
        GetMessages: function () {
            var self = this;
            self.$http.post('/Layouts/GetMessages').then(function (response) {                
                switch (response.body.status) {
                    case 1:
                        self.messages = response.body.d;
                      
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");
                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                toggleLoader();
                console.log('ocurrio un error');
            });
        },

        GetAllMessages: function () {
            var self = this;
            self.$http.post('/Layouts/GetAllMessages').then(function (response) {
                switch (response.body.status) {
                    case 1:
                        self.allmessages = response.body.d;

                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");
                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                toggleLoader();
                console.log('ocurrio un error');
            });
        },

        ShowMessageDetail: function (id) {
            var self = this;

            self.messages.forEach(function (m, im) {
                if (m.Id == id) {
                    self.message = m;
                    self.$http.post('/Layouts/UpdateMessage', JSON.stringify({ 'idMessage': m.Id })).then(function (response) {
                        
                        $('#modalMessageDetail').modal('toggle');
                        
                    }, function () {                        
                        console.log('ocurrio un error');
                        });
                }
            });
        },

        GetTypeAccountInfo: function () {
            var self = this;
            toggleLoader();
            self.$http.post('/Dashboards/GetTypeAccountInfo').then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.perfil.TypeAccount.UserName = response.body.d.UserName;
                        self.perfil.TypeAccount.RolId = response.body.d.RolId;
                        self.perfil.TypeAccount.RolName = response.body.d.RolName;
                        self.perfil.TypeAccount.Description = response.body.d.Description;
                        self.perfil.TypeAccount.MaxSearch = response.body.d.MaxSearch;
                        self.perfil.TypeAccount.MaxAutSearch = response.body.d.MaxAutSearch;
                        self.perfil.TypeAccount.DayInsert = response.body.d.DayInsert;
                        self.perfil.TypeAccount.MonthInsert = response.body.d.MonthInsert;
                        self.perfil.TypeAccount.YearInsert = response.body.d.YearInsert;
                        self.perfil.TypeAccount.CurrentSearchs = response.body.d.CurrentSearchs;
                        self.perfil.TypeAccount.CurrentAutSearchs = response.body.d.CurrentAutSearchs;

                        self.perfil.TypeAccount.CurrentProv = response.body.d.CurrentProv;
                        self.perfil.TypeAccount.CurrentFailProv = response.body.d.CurrentFailProv;

                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");
                        break;
                    default:
                        location.href = "/Account/login";
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
                        self.perfil.currentperiod = response.body.d;
                        break;
                    default:
                        location.href = "/Account/login";
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
                        self.perfil.currentsearchs = response.body.d;
                        toggleLoaderHistory();
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });

        },

        GetCurrentAutSearchs: function () {
            var self = this;

            toggleLoaderHistory();
            self.$http.post('/Account/CurrentAutSearchs').then(function (response) {
                toggleLoaderHistory();
                switch (response.body.status) {
                    case 1:
                        self.perfil.currentautsearchs = response.body.d;
                        toggleLoaderHistory();
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
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
                        self.perfil.history = response.body.d;
                        toggleLoaderHistory();
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });

        },

        SendEmailNotification: function () {
            var self = this;

            toggleLoader();
            self.$http.post('/Account/SendEmailNotification').then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.perfil.history = response.body.d;
                        toggleLoader();
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
                toggleLoader();
            });

        },

        GetProvHistory: function () {
            var self = this;

            toggleLoaderHistory();
            self.$http.post('/Account/ProvHistory').then(function (response) {
                toggleLoaderHistory();
                switch (response.body.status) {
                    case 1:
                        self.perfil.provhistory = response.body.d;
                        toggleLoaderHistory();
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
                toggleLoaderHistory();
            });

        },

        GetProvHistorySimple: function () {
            var self = this;

            self.$http.post('/Account/ProvHistorySimple').then(function (response) {
                switch (response.body.status) {
                    case 1:
                        self.perfil.provhistorysimple = response.body.d;
                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
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

                if (self.perfil.send.newpassword == self.perfil.send.repassword) {
                    toggleLoader();
                    self.$http.post('/Account/ChangePassword', JSON.stringify({ 'password': self.perfil.send.password, 'newpassword': self.perfil.send.newpassword })).then(function (response) {
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
                                location.href = "/Account/login";
                                break;
                        }
                        self.perfil.send.password = '';
                        self.perfil.send.newpassword = '';
                        self.perfil.send.repassword = '';

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
        
        //DASHBOARD
        GetAccountInfo: function () {
            var self = this;
            toggleLoader();
            self.$http.post('/Dashboards/GetAccountInfo').then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.dashboard.LastSearch = response.body.d.LastSearch;
                        self.dashboard.LastUpdate = response.body.d.LastUpdate;
                        self.dashboard.Status = response.body.d.Status;
                        self.dashboard.Title = response.body.d.Title;
                        self.dashboard.Message = response.body.d.Message;

                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");
                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                toggleLoader();
                console.log('ocurrio un error');
            });


        },    

        //SEARCH
        searchRFC: function () {
            var self = this;
            if (self.search.send.RFC.length < 12) {
                swal("Error", "RFC con formato inválido.", "error");
            }
            else {

                swal({
                    title: "¿Está seguro?",
                    text: "Se realizará la consulta del contribuyente.",
                    buttons: true,
                    dangerMode: false
                })
                    .then((willSearch) => {
                        if (willSearch) {
                            self.$http.post('/Account/ValidateAccount', JSON.stringify({ 'toSearch': 1 })).then(function (response) {
                                self.res = response.body.d;
                                switch (response.body.status) {
                                    case 1:
                                        toggleLoader();
                                        self.$http.post('/Searchs/SearchRFC', JSON.stringify({ 'RFC': self.search.send.RFC, 'tipoBusqueda': self.searchfilter.busqueda, 'fecha': self.searchfilter.selecteddate  })).then(function (response) {
                                            toggleLoader();
                                            self.res = response.body.d;
                                            switch (response.body.status) {
                                                case 1:
                                                    self.op.pag.list = false; self.op.pag.detail = true;

                                                    $('#RFCNoEncontrado').modal('toggle');
                                                    break;
                                                case 2:
                                                    self.op.pag.list = false; self.op.pag.detail = true;
                                                    self.alert = true;
                                                    self.error = true;
                                                    self.msg = response.body.msg;

                                                    $('#RFCEncontrado').modal('toggle');
                                                    break;
                                                default:
                                                    location.href = "/Account/login";
                                                    break;
                                            }                                         
                                        }, function () {
                                            toggleLoader();
                                            console.log('ocurrio un error');
                                        });

                                        break;
                                    case 2:
                                        self.alert = true;
                                        self.error = true;
                                        self.msg = response.body.msg;
                                        swal("Error", self.msg, "error");
                                        break;
                                    default:
                                        location.href = "/Account/login";
                                        break;
                                }
                            }, function () {
                                toggleLoader();
                                console.log('ocurrio un error');
                            });
                        }
                    });
            }
        },

        //IMPORT
        ProcesarNuevos: function () {
            var self = this;
            var aux = [];

            self.searchfilter.selecteddate = $("#data_1 input").val();
       

            for (var i = 0; i < self.excel._exceljson.length; i++) {
                var cellValue = self.excel._exceljson[i][self.excel._columnas[0]];
                if (cellValue == null)
                    cellValue = "";


                if (cellValue != "") {
                    var enhist = false;

                    for (var simple = 0; simple < self.perfil.provhistorysimple.length; simple++) {
                        if (self.perfil.provhistorysimple[simple].RFC === cellValue) {
                            enhist = true;
                            break;
                        }
                    }

                    if (!enhist) {
                        var detalle = {
                            Id: '',
                            RFC: cellValue,
                            Fecha: '',
                            T69: null,
                            T69B: null,
                            S69: null,
                            S69B: null,
                            Tipo: 1,
                            Nombre: '',
                        };
                        aux.push(detalle);                        
                    }
                }
            }

            if (aux.length > 0) {
                toggleLoader();
                self.$http.post('/Account/ValidateAccount', JSON.stringify({ 'toSearch': aux.length })).then(function (response) {
                    toggleLoader();
                    switch (response.body.status) {
                        case 1:
                            self.excel.detail = [];
                            self.excel.procesados = 0;

                            self.op.pag.list = false;
                            self.op.pag.detail = true;
                            self.excel.detail = aux;

                            $('#modalDetalle').modal('toggle');

                            break;
                        case 2:
                            self.alert = true;
                            self.error = true;
                            self.msg = response.body.msg;
                            swal("Error", self.msg, "error");
                            break;
                        default:
                            location.href = "/Account/login";
                            break;
                    }
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                });

            }
            else {
                swal("Error", "No hay proveedores nuevos a procesar.", "error");
            }           
        },

        Procesar: function () {
            var self = this;
            self.searchfilter.selecteddate = $("#data_1 input").val();
            toggleLoader();

            self.$http.post('/Account/ValidateAccount', JSON.stringify({ 'toSearch': self.excel._exceljson.length })).then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.excel.detail = [];
                        self.excel.procesados = 0;

                        self.op.pag.list = false;
                        self.op.pag.detail = true;

                        for (var i = 0; i < self.excel._exceljson.length; i++) {
                            var cellValue = self.excel._exceljson[i][self.excel._columnas[0]];
                            if (cellValue == null)
                                cellValue = "";

                            var detalle = {
                                Id: '',
                                RFC: cellValue,
                                Fecha: '',
                                T69: null,
                                T69B: null,
                                S69: null,
                                S69B: null,
                                Tipo: 1,
                                Nombre: '',
                            };

                            self.excel.detail.push(detalle);
                        }

                        $('#modalDetalle').modal('toggle');

                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");
                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                toggleLoader();
                location.href = "/Account/login";                                               
            });
        },

        ExportToTable: function () {
            var self = this;

            if (self.user.rolId > 1) {
                $("#excelfile tr").remove();
                var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xlsx|.xls)$/;
                /*Checks whether the file is a valid excel file*/
                if (regex.test($("#excelfile").val().toLowerCase())) {
                    var xlsxflag = false; /*Flag for checking whether excel is .xls format or .xlsx format*/
                    if ($("#excelfile").val().toLowerCase().indexOf(".xlsx") > 0) {
                        xlsxflag = true;
                    }
                    /*Checks whether the browser supports HTML5*/
                    if (typeof (FileReader) != "undefined") {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            var data = e.target.result;
                            /*Converts the excel data in to object*/
                            if (xlsxflag) {
                                var workbook = XLSX.read(data, { type: 'binary' });
                            }
                            else {
                                var workbook = XLS.read(data, { type: 'binary' });
                            }
                            /*Gets all the sheetnames of excel in to a variable*/
                            var sheet_name_list = workbook.SheetNames;

                            var cnt = 0; /*This is used for restricting the script to consider only first sheet of excel*/
                            var exceljson;

                            sheet_name_list.forEach(function (y) { /*Iterate through all sheets*/
                                /*Convert the cell value to Json*/
                                if (xlsxflag) {
                                    exceljson = XLSX.utils.sheet_to_json(workbook.Sheets[y]);
                                }
                                else {
                                    exceljson = XLS.utils.sheet_to_row_object_array(workbook.Sheets[y]);
                                }
                                if (exceljson.length > 0 && cnt == 0) {

                                    var columns = self.BindTableHeader(exceljson, '#exceltable'); /*Gets all the column headings of Excel*/
                                    self.excel._columnas = columns;


                                    //quita repetidos
                                    self.excel._exceljson = [];
                                    self.excel._exceljsonfinal = [];
                                    for (var i = 0; i < exceljson.length; i++) {
                                        var pasa = true;
                                        var cellValue = exceljson[i][self.excel._columnas[0]];


                                        for (var j = 0; j < self.excel._exceljsonfinal.length; j++) {
                                            var cellValueJ = self.excel._exceljsonfinal[j][self.excel._columnas[0]];

                                            if (cellValue == cellValueJ && i != j) {
                                                pasa = false;
                                            }
                                        }

                                        if (pasa)
                                            self.excel._exceljsonfinal.push(exceljson[i]);
                                    }

                                    self.excel._exceljson = self.excel._exceljsonfinal;

                                    self.BindTable(self.excel._exceljson, '#exceltable');
                                    cnt++;
                                }
                            });

                            

                            if (self.excel._columnas.length == 1) {
                                $('#seprocesaran').html("Se encontraron " + self.excel._exceljson.length + " contribuyentes.")
                                $('#modalDetalle').modal('toggle');


                                $('#exceltable').show();
                            }
                            else {
                                if (self.excel._columnas.length == 0)
                                    swal("Error", "No se encontró una columna 'RFC'. Favor de modificar el archivo.", "error");
                                if (self.excel._columnas.length > 1)
                                    swal("Error", "Se encontraron múltiples columnas 'RFC'. Favor de modificar el archivo.", "error");
                            }
                        }
                        if (xlsxflag) {/*If excel file is .xlsx extension than creates a Array Buffer from excel*/
                            reader.readAsArrayBuffer($("#excelfile")[0].files[0]);
                        }
                        else {
                            reader.readAsBinaryString($("#excelfile")[0].files[0]);
                        }
                    }
                    else {
                        swal("Error", "Tu navegador no soporta HTML5. Te recomendamos usar Google Chrome.", "error");
                    }
                }
                else {
                    swal("Error", "Favor de seleccionar un archivo.", "error");
                }
            }
            else {
                swal("Error", "Opción exclusiva para usuarios Premium.", "info");
            }
        },

        FindRepeted: function (el) {

        },

        BindTable: function (jsondata, tableid) {
            var self = this;
            $(tableid).html('');
        
           

            for (var i = 0; i < jsondata.length; i++) {
                var row$ = $('<tr/>');
                var pasa = false;
                
                for (var colIndex = 0; colIndex < self.excel._columnas.length; colIndex++) {
                    var cellValue = jsondata[i][self.excel._columnas[colIndex]];

                    if (cellValue == null)
                        cellValue = "";

                    if (cellValue != "") {
                        pasa = true;
                        var enhist = false;

                        for (var simple = 0; simple < self.perfil.provhistorysimple.length; simple++) {
                            if (self.perfil.provhistorysimple[simple].RFC === cellValue) {
                                enhist = true;
                                break;
                            }                                
                        }

                        var str = "" + (i + 1);
                        var pad = "000";

                        if (enhist) {
                            row$.append($('<td/>').html(" <i class='fa fa-history' style='float: left; margin - right: 5px; color: forestgreen; font-size:x-large'></i>"));
                        }
                        else {
                            row$.append($('<td/>').html(""));
                        }

                        row$.append($('<td/>').html("<small>" + (pad.substring(0, pad.length - str.length) + str) + "</small> - <strong>" + cellValue + " </strong>"));

                    }
                }

                if(pasa)
                    $(tableid).append(row$);
            }
        },

        BindTableHeader: function (jsondata, tableid) {
            var self = this;

            var columnSet = [];
            var headerTr$ = $('<tr/>');
            for (var i = 0; i < jsondata.length; i++) {
                var rowHash = jsondata[i];
                for (var key in rowHash) {
                    if (key == "RFC") {
                        if (rowHash.hasOwnProperty(key)) {
                            if ($.inArray(key, columnSet) == -1) {/*Adding each unique column names to a variable array*/
                                columnSet.push(key);
                                headerTr$.append($('<th/>').html(key));
                            }
                        }
                    }
                }
            }
            //$(tableid).append(headerTr$);
            return columnSet;
        },

        reportToCSVConvertor: function (JSONData, fileName, ReportTitle, ShowLabel) {

            var aux = [];
            switch (fileName) {
                case 'Excel':
                    JSONData.forEach(function (r, ir) {
                        aux.push({
                            RFC: r.RFC,
                            Fecha: moment(r.Fecha).locale('es').format('DD/MM/YYYY'),
                            Supuesto: r.T69 == true ? 'Si' : 'No',
                            Sentencia: r.T69B == true ? 'Si' : 'No'
                        });
                    });
                    break;

                default:
                    break;
            }


            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof aux !== 'object' ? JSON.parse(aux) : aux;

            var CSV = '';
            //Set Report title in first row or line

            CSV += ReportTitle + '\r\n\n';

            var row = "", index;

            //This condition will generate the Label/Header
            if (ShowLabel) {
                row = "";

                //This loop will extract the label from 1st index of on array
                for (index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV === '') {
                alert("Invalid data");
                return;
            }

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        reportToCSVConvertorProfile: function (ReportTitle, ShowLabel) {
            var self = this;
            var aux = [];
            var inde = 0;
            var ReportTitle = '';
            var fileName = '';

            $(".tab-content .tab-pane").each(function (_inda, _obja) {
                if ($(this).hasClass("active")) {
                    inde = _inda;
                }
            });


            
            switch (inde) {
                case 0:
                    var JSONData = self.filteredProv;
                    fileName = 'proveedores';
                    ReportTitle = "Mis proveedores";

                    break;

                case 1:

                    var JSONData = self.filteredCurrentSearchs;
                    fileName = 'periodo';
                    ReportTitle = "Consultas manuales del periodo";

                    break;

                case 2:

                    var JSONData = self.filteredHistory;
                    fileName = 'historial';
                    ReportTitle = "Historial de consultas";

                    break;

                case 3:
                    var JSONData = self.filteredCurrentAutSearchs;
                    fileName = 'automaticas';
                    ReportTitle = "Consultas automáticas del periodo";

                    break;
                default:
                    break;
            }

            JSONData.forEach(function (r, ir) {
                aux.push({
                    RFC: r.RFC,
                    Fecha: moment(r.Fecha).locale('es').format('DD/MM/YYYY'),
                    Supuesto: r.C69 > 0 ? 'Si' : 'No',
                    Sentencia: r.C69B > 0 ? 'Si' : 'No'
                });
            });


            //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
            var arrData = typeof aux !== 'object' ? JSON.parse(aux) : aux;

            var CSV = '';
            //Set Report title in first row or line

            CSV += ReportTitle + '\r\n\n';

            var row = "", index;

            //This condition will generate the Label/Header
            if (ShowLabel) {
                row = "";

                //This loop will extract the label from 1st index of on array
                for (index in arrData[0]) {

                    //Now convert each value to string and comma-seprated
                    row += index + ',';
                }

                row = row.slice(0, -1);

                //append Label row with line break
                CSV += row + '\r\n';
            }

            //1st loop is to extract each row
            for (var i = 0; i < arrData.length; i++) {
                row = "";

                //2nd loop will extract each column and convert it in string comma-seprated
                for (index in arrData[i]) {
                    row += '"' + arrData[i][index] + '",';
                }

                row.slice(0, row.length - 1);

                //add a line break after each row
                CSV += row + '\r\n';
            }

            if (CSV === '') {
                alert("Invalid data");
                return;
            }

            //Initialize file format you want csv or xls
            var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

            // Now the little tricky part.
            // you can use either>> window.open(uri);
            // but this will not work in some browsers
            // or you will not get the correct file extension    

            //this trick will generate a temp <a /> tag
            var link = document.createElement("a");
            link.href = uri;

            //set the visibility hidden so it will not effect on your web-layout
            link.style = "visibility:hidden";
            link.download = fileName + ".csv";

            //this part will append the anchor tag and remove it after automatic click
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },

        reportToCSVConvertor69: function (ReportTitle, ShowLabel) {
            var self = this;
            var aux = [];
            var inde = 0;
            var ReportTitle = '';
            var fileName = '';
            
            self.$http.post('/Account/ProvHistoryDetail69').then(function (response) {
                switch (response.body.status) {
                    case 1:

                        var JSONData = response.body.d;
                        fileName = 'proveedores_69';
                        ReportTitle = "Estatus de mis proveedores (69)";

                        JSONData.forEach(function (r, ir) {
                            aux.push({
                                RFC: r.RFC,
                                Nombre: r.Nombre,
                                Supuesto: r.Supuesto,
                                PPublicacion: r.PPublicacion,
                                Publicacion: r.Publicacion,                                
                            });
                        });

                        


                        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                        var arrData = typeof aux !== 'object' ? JSON.parse(aux) : aux;

                        var CSV = '';
                        //Set Report title in first row or line

                        CSV += ReportTitle + '\r\n\n';

                        var row = "", index;

                        //This condition will generate the Label/Header
                        if (ShowLabel) {
                            row = "";

                            //This loop will extract the label from 1st index of on array
                            for (index in arrData[0]) {

                                //Now convert each value to string and comma-seprated
                                row += index + ',';
                            }

                            row = row.slice(0, -1);

                            //append Label row with line break
                            CSV += row + '\r\n';
                        }

                        //1st loop is to extract each row
                        for (var i = 0; i < arrData.length; i++) {
                            row = "";

                            //2nd loop will extract each column and convert it in string comma-seprated
                            for (index in arrData[i]) {
                                row += '"' + arrData[i][index] + '",';
                            }

                            row.slice(0, row.length - 1);

                            //add a line break after each row
                            CSV += row + '\r\n';
                        }

                        if (CSV === '') {
                            alert("Invalid data");
                            return;
                        }

                        //Initialize file format you want csv or xls
                        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                        // Now the little tricky part.
                        // you can use either>> window.open(uri);
                        // but this will not work in some browsers
                        // or you will not get the correct file extension    

                        //this trick will generate a temp <a /> tag
                        var link = document.createElement("a");
                        link.href = uri;

                        //set the visibility hidden so it will not effect on your web-layout
                        link.style = "visibility:hidden";
                        link.download = fileName + ".csv";

                        //this part will append the anchor tag and remove it after automatic click
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);




                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                    console.log('ocurrio un error');
                });
        },

        reportToCSVConvertor69B: function (ReportTitle, ShowLabel) {
            var self = this;
            var aux = [];
            var inde = 0;
            var ReportTitle = '';
            var fileName = '';

            self.$http.post('/Account/ProvHistoryDetail69B').then(function (response) {
                switch (response.body.status) {
                    case 1:

                        var JSONData = response.body.d;
                        fileName = 'proveedores_69B';
                        ReportTitle = "Estatus de mis proveedores (69B)";

                        JSONData.forEach(function (r, ir) {
                            aux.push({
                                RFC: r.RFC,
                                Nombre: r.Nombre,
                                Situacion: r.Situacion,
                                PubPresuncion: r.PubPresuncion,
                                SATPresuntos: r.SATPresuntos,
                                NoFechaOfGlobalPresuncion: r.NoFechaOfGlobalPresuncion,
                                PubDOFPresuntos: r.PubDOFPresuntos,
                                PubDesvirtuados: r.PubDesvirtuados,
                                NoFechaOfGlobalDesvirtuados: r.NoFechaOfGlobalDesvirtuados,
                                PubDOFDesvirtuados: r.PubDOFDesvirtuados,
                                NoFechaOfGlobalDefinitivos: r.NoFechaOfGlobalDefinitivos,
                                PubDefinitivos: r.PubDefinitivos,
                                PubDOFDefinitivos: r.PubDOFDefinitivos,
                                NoFechaOfGlobalSentenciaFav: r.NoFechaOfGlobalSentenciaFav,
                                PubSentenciaFav: r.PubSentenciaFav,
                                NoFechaOfGlobalSentenciaFav2: r.NoFechaOfGlobalSentenciaFav2,
                                PubDOFSentenciaFav: r.PubDOFSentenciaFav
                            });
                        });




                        //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
                        var arrData = typeof aux !== 'object' ? JSON.parse(aux) : aux;

                        var CSV = '';
                        //Set Report title in first row or line

                        CSV += ReportTitle + '\r\n\n';

                        var row = "", index;

                        //This condition will generate the Label/Header
                        if (ShowLabel) {
                            row = "";

                            //This loop will extract the label from 1st index of on array
                            for (index in arrData[0]) {

                                //Now convert each value to string and comma-seprated
                                row += index + ',';
                            }

                            row = row.slice(0, -1);

                            //append Label row with line break
                            CSV += row + '\r\n';
                        }

                        //1st loop is to extract each row
                        for (var i = 0; i < arrData.length; i++) {
                            row = "";

                            //2nd loop will extract each column and convert it in string comma-seprated
                            for (index in arrData[i]) {
                                row += '"' + arrData[i][index] + '",';
                            }

                            row.slice(0, row.length - 1);

                            //add a line break after each row
                            CSV += row + '\r\n';
                        }

                        if (CSV === '') {
                            alert("Invalid data");
                            return;
                        }

                        //Initialize file format you want csv or xls
                        var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

                        // Now the little tricky part.
                        // you can use either>> window.open(uri);
                        // but this will not work in some browsers
                        // or you will not get the correct file extension    

                        //this trick will generate a temp <a /> tag
                        var link = document.createElement("a");
                        link.href = uri;

                        //set the visibility hidden so it will not effect on your web-layout
                        link.style = "visibility:hidden";
                        link.download = fileName + ".csv";

                        //this part will append the anchor tag and remove it after automatic click
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);




                        break;
                    case 2:
                        self.alert = true;
                        self.error = true;
                        self.msg = response.body.msg;
                        swal("Error", self.msg, "error");

                        break;
                    default:
                        location.href = "/Account/login";
                        break;
                }
            }, function () {
                console.log('ocurrio un error');
            });
        },        
    }
});

Vue.component('yei3-row', {
    props: ['detail'],
    mounted() {
        var self = this;
        setTimeout(function () {
            self.Buscar(self.detail.RFC)
        }, 500);
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
    data: function () {
        return {
            Wait: true,
        };
    },
    methods: {
        toggleInputForm: function (action, id, rfc) {
            var self = this;

            if (mainVue.excel.procesados == mainVue.excel.detail.length) {
                if (action === 'detail69') {
                    toggleLoader();
                    self.$http.post('/Searchs/Detail69', JSON.stringify({ 'idSearch': id })).then(function (response) {
                        toggleLoader();
                        switch (response.body.status) {
                            case 1:
                                mainVue.detail69.RFC = rfc;
                                mainVue.detail69.Nombre = response.body.d.Nombre;
                                mainVue.detail69.Supuestos = response.body.d.Supuestos;

                                $('#RFCDetail').modal('toggle');

                                break;
                            case 2:
                                self.alert = true;
                                self.error = true;
                                self.msg = response.body.msg;
                                swal("Error", self.msg, "error");
                                break;
                            default:
                                location.href = "/Account/login";
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
                                mainVue.res69B = response.body.d;
                                $('#RFCDetail69B').modal('toggle');
                                break;
                            case 2:
                                self.alert = true;
                                self.error = true;
                                self.msg = response.body.msg;
                                swal("Error", self.msg, "error");
                                break;
                            default:
                                location.href = "/Account/login";
                                break;
                        }
                    }, function () {
                        toggleLoader();
                        console.log('ocurrio un error');
                    });
                }

            }
            else {
                swal("Error", "Espere a que termine el proceso de búsqueda");
            }

        },

        Buscar: function (RFC) {
            var self = this;
            self.detail.wait = true;
            

            self.$http.post('/Searchs/SearchRFC', JSON.stringify({ 'RFC': RFC, 'tipoBusqueda': mainVue.searchfilter.busqueda, 'fecha': mainVue.searchfilter.selecteddate })).then(function (response) {
                mainVue.excel.procesados = mainVue.excel.procesados + 1;
                self.Wait = false;
                self.detail.Fecha = response.body.d[0].Fecha;
                self.detail.Id = response.body.d[0].Id;
                self.detail.T69 = response.body.d[0].T69;
                self.detail.T69B = response.body.d[0].T69B;
                self.detail.S69 = response.body.d[0].S69;
                self.detail.S69B = response.body.d[0].S69B;

                self.detail.C69 = response.body.d[0].C69;
                self.detail.C69B = response.body.d[0].C69B;
                self.detail.Date69B = response.body.d[0].Date69B;

                if (self.detail.T69 || self.detail.T69B)
                    mainVue.excel.conerror = mainVue.excel.conerror + 1;

            }, function () {
                console.log('ocurrio un error');
            });
        },
    },
    template:
        `
    <div class="row" v-if="Wait == false && (detail.T69 || detail.T69B)">
        <div class="col-2">
            <i v-if="Wait" class="fa fa-clock-o"></i><i style="color:red" v-if="Wait == false" class="fa fa-check"></i>
        </div>
        <div class="col-4">
            {{detail.RFC | mayusculas }}
        </div>
        <div class="col-3" style="font-size:large">
             
            <i v-if="detail.C69 > 0" style="color:red; cursor:pointer" v-on:click="toggleInputForm('detail69', detail.Id, detail.RFC)" class="fa fa-exclamation-circle"></i>
            <i v-if="detail.C69 == 0 && detail.S69 != null " style="color:forestgreen;" class="fa fa-check-circle"></i>
        </div>
        <div class="col-3" style="font-size:large">
            <i v-if="detail.Date69B <= 30" style="color:darkorange; cursor:pointer" v-bind:title="'Días para desvirtuar: '  + detail.Date69B" class="fa fa-exclamation-triangle"></i>
            <i v-if="detail.T69B && detail.C69B > 0" style="color:red; cursor:pointer" v-on:click="toggleInputForm('detail69B', detail.Id, detail.RFC)" class="fa fa-exclamation-circle"></i>
            <i v-if="detail.C69B == 0 && detail.S69B != null" style="color:forestgreen;" class="fa fa-check-circle"></i>
        </div> 
    </div>
  `

})
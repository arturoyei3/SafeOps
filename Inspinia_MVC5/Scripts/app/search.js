var search = new Vue({
    el: '#wrapper',
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
            send: {
                RFC: '',
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
            res: {
                Num : 0,
                RFC : 'ddd',
                Nombre : 'ddd',
                Situacion : '',
                PubPresuncion : '',
                SATPresuntos : '',
                NoFechaOfGlobalPresuncion : '',
                PubDOFPresuntos : '',
                PubDesvirtuados : '',
                NoFechaOfGlobalDesvirtuados : '',
                PubDOFDesvirtuados : '',
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
    computed: {        
    },
    mounted: function () {
        var self = this;
        $("body").keypress(function (e) {
            if (e.which === 13) {
                self.searchRFC();
            }
        });
    },
    methods: {
        toggleInputForm: function (action, id, rfc) {
            var self = this;
            self.op.pag.list = false;
            self.op.pag.edit = false;
            self.op.pag.detail = false;
            self.op.pag.new = false;
            self.op.pag.follow = false;

            if (action === 'searchRFC') {
                self.op.pag.list = true; self.op.pag.current = 'Búsqueda RFC';
                self.searchRFC();
            }

            if (action === 'detail') {
                self.op.pag.detail = true; self.op.pag.current = 'Detalle';


            }    

            if (action === 'detail69') {
                self.op.pag.detail = true; self.op.pag.current = 'Detalle';

                toggleLoader();
                self.$http.post('/Searchs/Detail69', JSON.stringify({ 'idSearch': id})).then(function (response) {
                    toggleLoader();                    
                    switch (response.body.status) {
                        case 1:
                            self.detail69.RFC = rfc;
                            self.detail69.Nombre = response.body.d.Nombre;
                            self.detail69.Supuestos = response.body.d.Supuestos;

                            self.detail = response.body.d;
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
                    self.send.userName = '';
                    self.send.password = '';
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                });             


            }    

            if (action === 'detail69B') {           
                self.op.pag.detail = true; self.op.pag.current = 'Detalle';

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
                            console.log(response.body.status);
                            self.alert = false;
                            break;
                    }                   
                }, function () {
                    toggleLoader();
                    console.log('ocurrio un error');
                }); 
            }    

           

            if (action === 'list') {
                self.op.pag.list = true; self.op.pag.current = 'Lista';               
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

        searchRFC: function () {
            var self = this;            
            if (self.send.RFC.length < 12) {
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
                                        self.$http.post('/Searchs/SearchRFC', JSON.stringify(self.send)).then(function (response) {
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
                                                    console.log(response.body.status);
                                                    self.alert = false;
                                                    break;
                                            }
                                            self.send.userName = '';
                                            self.send.password = '';
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
                                        console.log(response.body.status);
                                        self.alert = false;
                                        break;
                                }                               
                            }, function () {
                                toggleLoader();
                                console.log('ocurrio un error');
                                });        
                        }
                    });             
            }
        }
    }
});
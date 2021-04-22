
var _excel = new Vue({
    el: '#wrapper',    
    data: function () {
        return {            
            op: {

                _columnas: [],
                _exceljson: {},

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
            detail: { //Objeto
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
            alert: false,
            error: true,
            msg: '',
            procesados: 0,
            conerror: 0
        };
    },
    computed: {
    },
    mounted: function () {
    },    
    methods: {
        Procesar: function () {
            var self = this;


            toggleLoader();
            self.$http.post('/Account/ValidateAccount', JSON.stringify({ 'toSearch': self._exceljson.length })).then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:


                        self.excel.detail = [];
                        self.excel.procesados = 0;
                        self.op.pag.list = false;
                        self.op.pag.detail = true;

                        for (var i = 0; i < self._exceljson.length; i++) {
                            var cellValue = self._exceljson[i][self._columnas[0]];
                            if (cellValue == null)
                                cellValue = "";

                            var detalle = {
                                Id: '',
                                RFC: cellValue,
                                Fecha: '',
                                T69: null,
                                T69B: null,
                                Tipo: 1,
                                Nombre: '',
                            };

                            self.detail.push(detalle);
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
                        console.log(response.body.status);
                        self.alert = false;
                        break;
                }
            }, function () {
                toggleLoader();
                console.log('ocurrio un error');
                });





            
            
        },
       
        ExportToTable: function () {
            var self = this;

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
                                self.BindTable(exceljson, '#exceltable');
                                cnt++;
                            }
                        });

                        self._exceljson = exceljson;

                        if (self._columnas.length == 1) {
                            $('#seprocesaran').html("Se procesarán " + self._exceljson.length + " contribuyentes.")
                            $('#modalDetalle').modal('toggle');


                            $('#exceltable').show();
                        }
                        else {
                            if (self._columnas.length == 0)
                                swal("Error", "No se encontró una columna 'RFC'. Favor de modificar el archivo.", "error");
                            if (self._columnas.length > 1)
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
        },

        BindTable: function (jsondata, tableid) {
            var self = this;

            var columns = self.BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/
            self._columnas = columns;

            for (var i = 0; i < jsondata.length; i++) {
                var row$ = $('<tr/>');
                for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var cellValue = jsondata[i][columns[colIndex]];
                    if (cellValue == null)
                        cellValue = "";

                    var str = "" + (i + 1);
                    var pad = "000";

                    row$.append($('<td/>').html("<small>" + (pad.substring(0, pad.length - str.length) + str) + "</small> - <strong>" + cellValue + " </strong>"));
                }
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
            $(tableid).append(headerTr$);
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
                            Supuesto: r.T69 == true ? 'Si': 'No',
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

            if (_excel.procesados == _excel.detail.length) {
                if (action === 'detail69') {
                    toggleLoader();
                    self.$http.post('/Searchs/Detail69', JSON.stringify({ 'idSearch': id })).then(function (response) {
                        toggleLoader();
                        switch (response.body.status) {
                            case 1:
                                _excel.detail69.RFC = rfc;
                                _excel.detail69.Nombre = response.body.d.Nombre;
                                _excel.detail69.Supuestos = response.body.d.Supuestos;

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
                                _excel.res69B = response.body.d;
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

            }
            else {
                swal("Error", "Espere a que termine el proceso de búsqueda");
            }
            
        },

        Buscar: function (RFC) {
            var self = this;
            self.detail.wait = true;
            self.$http.post('/Searchs/SearchRFC', JSON.stringify({ 'RFC': RFC })).then(function (response) {
                _excel.procesados = _excel.procesados + 1;
                self.Wait = false;
                self.detail.Fecha = response.body.d[0].Fecha;
                self.detail.Id = response.body.d[0].Id;
                self.detail.T69 = response.body.d[0].T69;
                self.detail.T69B = response.body.d[0].T69B;

                if (self.detail.T69 || self.detail.T69B) 
                    _excel.conerror = _excel.conerror + 1;
                
            }, function () {
                console.log('ocurrio un error');
            });
        },
    },
    template:
        `
    <div class="row" v-if="Wait == false && (detail.T69 || detail.T69B)">
        <div class="col-1">
            <i v-if="Wait" class="fa fa-clock-o"></i><i style="color:red" v-if="Wait == false" class="fa fa-check"></i>
        </div>
        <div class="col-5">
            {{detail.RFC | mayusculas }}
        </div>
        <div class="col-2">
            {{detail.Fecha | dateFormat}}
        </div>
        <div class="col-2">
            <i v-if="detail.T69" style="color:red; cursor:pointer" v-on:click="toggleInputForm('detail69', detail.Id, detail.RFC)" class="fa fa-exclamation-circle"></i> <i v-if="detail.T69 == false" style="color:forestgreen;" class="fa fa-check-circle"></i>
        </div>
        <div class="col-2">
            <i v-if="detail.T69B" style="color:red; cursor:pointer" v-on:click="toggleInputForm('detail69B', detail.Id, detail.RFC)" class="fa fa-exclamation-circle"></i> <i v-if="detail.T69B == false" style="color:forestgreen;" class="fa fa-check-circle"></i>
        </div> 
    </div>
  `

})



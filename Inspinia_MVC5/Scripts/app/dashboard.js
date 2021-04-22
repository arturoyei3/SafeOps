
var _dashboard = new Vue({
    el: '#wrapper', 
    data: function () {
        return {
            LastSearch: '',
            LastUpdate: '',
            Title: '',
            Status: '',
            Message: '',            

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
        }        
    },
    computed: {
    },
    mounted: function () {
        var self = this;
        setTimeout(function () {
            self.GetAccountInfo();
            self.GetTypeAccountInfo();
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
    methods: {  
        GetAccountInfo: function () {
            var self = this;
            toggleLoader();
            self.$http.post('/Dashboards/GetAccountInfo').then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.LastSearch = response.body.d.LastSearch;
                        self.LastUpdate = response.body.d.LastUpdate;
                        self.Status = response.body.d.Status;
                        self.Title = response.body.d.Title;
                        self.Message = response.body.d.Message;

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

        GetTypeAccountInfo: function () {
            var self = this;
            toggleLoader();
            self.$http.post('/Dashboards/GetTypeAccountInfo').then(function (response) {
                toggleLoader();
                switch (response.body.status) {
                    case 1:
                        self.TypeAccount.UserName = response.body.d.UserName;
                        self.TypeAccount.RolId = response.body.d.RolId;
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
    }
});

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SATSR.Models
{
    public class AccountInfoResult
    {
        private bool _res;
        private string _title;
        private string _message;
        private DateTime _lastUpdate;
        private DateTime _lastSearch;
        private int _status;
        
        public bool Res { get => _res; set => _res = value; }
        public string Message { get => _message; set => _message = value; }
        public DateTime LastUpdate { get => _lastUpdate; set => _lastUpdate = value; }
        public DateTime LastSearch { get => _lastSearch; set => _lastSearch = value; }
        public int Status { get => _status; set => _status = value; }
        public string Title { get => _title; set => _title = value; }
    }

    public class TypeAccountInfoResult
    {
        private bool _res;
        private string _message;

        private string _userName;
        private int _rolId;
        private string _rolName;
        private string _description;
        private int _maxSearch;
        private int _maxAutSearch;



        private int _dayInsert;
        private int _monthInsert;
        private int _yearInsert;

        private int _currentSearchs;
        private int _currentAutSearchs;
        private int _currentProv;
        private int _currentFailProv;

        public string RolName { get => _rolName; set => _rolName = value; }
        public string Description { get => _description; set => _description = value; }
        public int MaxSearch { get => _maxSearch; set => _maxSearch = value; }
        public int MaxAutSearch { get => _maxAutSearch; set => _maxAutSearch = value; }
        public int DayInsert { get => _dayInsert; set => _dayInsert = value; }
        public int MonthInsert { get => _monthInsert; set => _monthInsert = value; }
        public int YearInsert { get => _yearInsert; set => _yearInsert = value; }
        public int CurrentSearchs { get => _currentSearchs; set => _currentSearchs = value; }
        public int CurrentAutSearchs { get => _currentAutSearchs; set => _currentAutSearchs = value; }
        public int CurrentProv { get => _currentProv; set => _currentProv = value; }
        public int CurrentFailProv { get => _currentFailProv; set => _currentFailProv = value; }
        public bool Res { get => _res; set => _res = value; }
        public string Message { get => _message; set => _message = value; }
        public string UserName { get => _userName; set => _userName = value; }
        public int RolId { get => _rolId; set => _rolId = value; }
    }

    public class AccountPersonalInfoResult {

        private string _name;
        private int _rolId;
        private string _rol;

        public string Name { get => _name; set => _name = value; }
        public int RolId { get => _rolId; set => _rolId = value; }
        public string Rol { get => _rol; set => _rol = value; }
    }
}
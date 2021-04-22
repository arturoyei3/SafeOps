using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SATSR.Models
{
    public class UpdateResult
    {
        private int _id;
        private int _idSourceType;
        private string _name;
        private DateTime _dateUpdate;
        private int _records;
        private int _m;
        private int _f;
        private string _tableQuery;

        public int Id { get => _id; set => _id = value; }
        public int IdSourceType { get => _idSourceType; set => _idSourceType = value; }
        public string Name { get => _name; set => _name = value; }
        public DateTime DateUpdate { get => _dateUpdate; set => _dateUpdate = value; }
        public int Records { get => _records; set => _records = value; }
        public int M { get => _m; set => _m = value; }
        public int F { get => _f; set => _f = value; }
        public string TableQuery { get => _tableQuery; set => _tableQuery = value; }
    }    
}
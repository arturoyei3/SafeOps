using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inspinia_MVC5.Models
{
    public class SearchResult
    {
        private int _id;
        private string _RFC;
        private DateTime _fecha;
        private DateTime _hora;
        private bool t69;
        private bool t69B;
        private string _s69;
        private string _s69B;
        private int _date69B;

        private int _c69;
        private int _c69B;

        public int Id { get => _id; set => _id = value; }
        public string RFC { get => _RFC; set => _RFC = value; }
        public DateTime Fecha { get => _fecha; set => _fecha = value; }
        public DateTime Hora { get => _hora; set => _hora = value; }
        public bool T69 { get => t69; set => t69 = value; }
        public bool T69B { get => t69B; set => t69B = value; }
        public string S69 { get => _s69; set => _s69 = value; }
        public string S69B { get => _s69B; set => _s69B = value; }
        public int C69 { get => _c69; set => _c69 = value; }
        public int C69B { get => _c69B; set => _c69B = value; }
        public int Date69B { get => _date69B; set => _date69B = value; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SATSR.Models
{

    public class SearchGenericResult{
        private int _registros;
        private string _archivo;
        private string _dateUpdated;
        private int _date69B;

        public int Registros { get => _registros; set => _registros = value; }
        public string Archivo { get => _archivo; set => _archivo = value; }
        public string DateUpdated { get => _dateUpdated; set => _dateUpdated = value; }
        public int Date69B { get => _date69B; set => _date69B = value; }
    }

    public class Detail69Result
    { 

        private string _nombre;
        private string _RFC;
        private List<Detail69SupuestoResult> _supuestos;

        public string Nombre { get => _nombre; set => _nombre = value; }
        public string RFC { get => _RFC; set => _RFC = value; }
        public List<Detail69SupuestoResult> Supuestos { get => _supuestos; set => _supuestos = value; }
        
        public Detail69Result()
        {
            this.Supuestos = new List<Detail69SupuestoResult>();
        }
    }

    public class Detail69BResult
    {
        private int _num;
        private string _RFC;
        private string _nombre;
        private string _situacion;
        private string _pubPresuncion;
        private string _SATPresuntos;
        private string _noFechaOfGlobalPresuncion;
        private string _pubDOFPresuntos;
        private string _pubDesvirtuados;
        private string _noFechaOfGlobalDesvirtuados;
        private string _pubDOFDesvirtuados;
        private string _noFechaOfGlobalDefinitivos;
        private string _pubDefinitivos;
        private string _pubDOFDefinitivos;
        private string _noFechaOfGlobalSentenciaFav;
        private string _pubSentenciaFav;
        private string _noFechaOfGlobalSentenciaFav2;
        private string _pubDOFSentenciaFav;

        public int Num { get => _num; set => _num = value; }
        public string Nombre { get => _nombre; set => _nombre = value; }
        public string RFC { get => _RFC; set => _RFC = value; }
        public string Situacion { get => _situacion; set => _situacion = value; }
        public string PubPresuncion { get => _pubPresuncion; set => _pubPresuncion = value; }
        public string SATPresuntos { get => _SATPresuntos; set => _SATPresuntos = value; }
        public string NoFechaOfGlobalPresuncion { get => _noFechaOfGlobalPresuncion; set => _noFechaOfGlobalPresuncion = value; }
        public string PubDOFPresuntos { get => _pubDOFPresuntos; set => _pubDOFPresuntos = value; }
        public string PubDesvirtuados { get => _pubDesvirtuados; set => _pubDesvirtuados = value; }
        public string NoFechaOfGlobalDesvirtuados { get => _noFechaOfGlobalDesvirtuados; set => _noFechaOfGlobalDesvirtuados = value; }
        public string PubDOFDesvirtuados { get => _pubDOFDesvirtuados; set => _pubDOFDesvirtuados = value; }
        public string NoFechaOfGlobalDefinitivos { get => _noFechaOfGlobalDefinitivos; set => _noFechaOfGlobalDefinitivos = value; }
        public string PubDefinitivos { get => _pubDefinitivos; set => _pubDefinitivos = value; }
        public string PubDOFDefinitivos { get => _pubDOFDefinitivos; set => _pubDOFDefinitivos = value; }
        public string NoFechaOfGlobalSentenciaFav { get => _noFechaOfGlobalSentenciaFav; set => _noFechaOfGlobalSentenciaFav = value; }
        public string PubSentenciaFav { get => _pubSentenciaFav; set => _pubSentenciaFav = value; }
        public string NoFechaOfGlobalSentenciaFav2 { get => _noFechaOfGlobalSentenciaFav2; set => _noFechaOfGlobalSentenciaFav2 = value; }
        public string PubDOFSentenciaFav { get => _pubDOFSentenciaFav; set => _pubDOFSentenciaFav = value; }        
    }

    public class Detail69SupuestoResult
    {
        private string _RFC;
        private string _supuesto;
        private string _ppublicacion;
        private string _monto;
        private string _publicacion;
        private string _nombre;

        public string Supuesto { get => _supuesto; set => _supuesto = value; }
        public string PPublicacion { get => _ppublicacion; set => _ppublicacion = value; }
        public string Monto { get => _monto; set => _monto = value; }
        public string Publicacion { get => _publicacion; set => _publicacion = value; }
        public string Nombre { get => _nombre; set => _nombre = value; }
        public string RFC { get => _RFC; set => _RFC = value; }
    }
}
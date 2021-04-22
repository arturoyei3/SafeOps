using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SATSR.Models
{
    public class ValidateResult
    {
        private bool _res;
        private string _message;

        public bool Res { get => _res; set => _res = value; }
        public string Message { get => _message; set => _message = value; }
    }
}
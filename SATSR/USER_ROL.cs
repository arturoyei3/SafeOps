//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace SATSR
{
    using System;
    using System.Collections.Generic;
    
    public partial class USER_ROL
    {
        public int ID { get; set; }
        public int ID_USER { get; set; }
        public int ID_ROL { get; set; }
    
        public virtual ROL ROL { get; set; }
        public virtual USER USER { get; set; }
    }
}

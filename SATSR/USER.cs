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
    
    public partial class USER
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public USER()
        {
            this.MESSAGE = new HashSet<MESSAGE>();
            this.MESSAGE_DETAIL = new HashSet<MESSAGE_DETAIL>();
            this.USER_ROL = new HashSet<USER_ROL>();
            this.USER_SEARCH_HISTORY = new HashSet<USER_SEARCH_HISTORY>();
        }
    
        public int ID { get; set; }
        public string FIRST_NAME { get; set; }
        public string LAST_NAME { get; set; }
        public string EMAIL { get; set; }
        public string PASS { get; set; }
        public int ID_STATUS { get; set; }
        public string AREA { get; set; }
        public string PHONE { get; set; }
        public string ALIAS { get; set; }
        public string PERSONAL_MOBILE { get; set; }
        public string MOBILE { get; set; }
        public Nullable<int> NNS { get; set; }
        public Nullable<int> CONTRACT_NUM { get; set; }
        public string STREET_TYPE { get; set; }
        public string STREET_NAME { get; set; }
        public string EXT_NUM { get; set; }
        public string INT_NUM { get; set; }
        public string SUBURB { get; set; }
        public string LOCATION { get; set; }
        public string MUNICIPALITY { get; set; }
        public string STATE { get; set; }
        public Nullable<System.DateTime> INSERT_DATE { get; set; }
        public Nullable<System.DateTime> TIME_INSERT { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MESSAGE> MESSAGE { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<MESSAGE_DETAIL> MESSAGE_DETAIL { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USER_ROL> USER_ROL { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<USER_SEARCH_HISTORY> USER_SEARCH_HISTORY { get; set; }
    }
}

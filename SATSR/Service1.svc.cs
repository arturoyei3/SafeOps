using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using SATSR.Models;

namespace SATSR
{
    // NOTA: puede usar el comando "Rename" del menú "Refactorizar" para cambiar el nombre de clase "SATService" en el código, en svc y en el archivo de configuración.
    // NOTE: para iniciar el Cliente de prueba WCF para probar este servicio, seleccione SATService.svc o SATService.svc.cs en el Explorador de soluciones e inicie la depuración.
    public class SATService : ISATService
    {
        private YEI3_SATEntities db = new YEI3_SATEntities();

        public USER Login(string userName, string password)
        {
            try
            {
                USER us = new USER();
                var usr = db.USER.FirstOrDefault(u => u.EMAIL == userName && u.PASS == password);
                if (usr != null)
                {
                    us.ID = usr.ID;
                    us.FIRST_NAME = usr.FIRST_NAME;
                    us.ID_STATUS = usr.ID_STATUS;
                }

                return us;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int NewSearch(int iduser, string RFC, int tipoBusqueda, string fecha)
        {
            try
            {
                USER_SEARCH_HISTORY usrHist = new USER_SEARCH_HISTORY();

                usrHist.ID_USER = iduser;
                usrHist.INSERT_DATE = DateTime.Now;
                usrHist.RFC = RFC;
                usrHist.TYPE_SEARCH = tipoBusqueda;

                if (tipoBusqueda == 2)
                    usrHist.SEARCH_DATE = Convert.ToDateTime(fecha); 

                db.USER_SEARCH_HISTORY.Add(usrHist);
                db.SaveChanges();

                return usrHist.ID;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public SearchGenericResult Search69(int idSearch, string RFC, int tipoBusqueda, string fecha)
        {
            USER_SEARCH_HISTORY usrHist = db.USER_SEARCH_HISTORY.Find(idSearch);
            SearchGenericResult resultado = new SearchGenericResult();

            try
            {                            
                var res = db.SIMPLE_SEARCH_RFC_69_BY_DATE(RFC, tipoBusqueda, tipoBusqueda == 1 ? "" : fecha.Split('/')[2] + "-" + fecha.Split('/')[1] + "-" + fecha.Split('/')[0]).FirstOrDefault();

                if (res.Registros != null)
                {
                    resultado.Registros = res.Registros.Value;
                    resultado.Archivo = res.TablaQuery;
                    resultado.DateUpdated = res.TablaQuery;

                    usrHist.C69 = res.TablaQuery;
                    usrHist.C69_C = res.Registros.Value;
                    db.SaveChanges();                    
                }

                return resultado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public SearchGenericResult Search69B(int idSearch, string RFC, int tipoBusqueda, string fecha)
        {
            USER_SEARCH_HISTORY usrHist = db.USER_SEARCH_HISTORY.Find(idSearch);
            SearchGenericResult resultado = new SearchGenericResult();

            try
            {
                
                var res = db.SIMPLE_SEARCH_RFC_69B_DAYDATE_BY_DATE(RFC, tipoBusqueda, tipoBusqueda == 1 ? "" : fecha.Split('/')[2] + "-" + fecha.Split('/')[1] + "-" + fecha.Split('/')[0]).FirstOrDefault();

                if (res.Registros != null)
                {
                    resultado.Registros = res.Registros.Value;
                    resultado.DateUpdated = res.TablaQuery;
                    resultado.Archivo = res.TablaQuery;
                    resultado.Date69B = res.Date69B == null ? 1000 : res.Date69B.Value;

                    usrHist.C69_B = res.TablaQuery;
                    usrHist.C69_BC = res.Registros.Value;
                    usrHist.C69_B_DATE = res.D69B;
                    db.SaveChanges();                    
                }
               
                return resultado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Detail69Result Detail69(int idSearch)
        {
            try
            {
                Detail69Result res = new Detail69Result();
                var consulta = db.USER_SEARCH_HISTORY.Find(idSearch);

                List<SEARCH_DETAIL_69_Result> resultado = db.SEARCH_DETAIL_69(consulta.C69, consulta.RFC).ToList();
                res.RFC = consulta.RFC;

                foreach (var item in resultado)
                {
                    Detail69SupuestoResult _ob = new Detail69SupuestoResult();
                    res.Nombre = item.NOMBRE;

                    _ob.Monto = item.MONTO;
                    _ob.PPublicacion = item.PPUBLICACION;
                    _ob.Publicacion = item.PUBLICACION;
                    _ob.Supuesto = item.SUPUESTO;

                    res.Supuestos.Add(_ob);
                }

                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Detail69BResult Detail69B(int idSearch)
        {
            try
            {
                Detail69BResult res = new Detail69BResult();
                var consulta = db.USER_SEARCH_HISTORY.Find(idSearch);

                List<SEARCH_DETAIL_69B_Result> resultado = db.SEARCH_DETAIL_69B(consulta.C69_B, consulta.RFC).ToList();
               
                foreach (var item in resultado)
                {
                    res.Num = item.Num.Value;
                    res.RFC = item.RFC;
                    res.Nombre = item.Nombre;
                    res.Situacion = item.Situacion;
                    res.PubPresuncion = item.PubPresuncion;
                    res.SATPresuntos = item.SATPresuntos;
                    res.NoFechaOfGlobalPresuncion = item.NoFechaOfGlobalPresuncion;
                    res.PubDOFPresuntos = item.PubDOFPresuntos;
                    res.PubDesvirtuados = item.PubDesvirtuados;
                    res.NoFechaOfGlobalDesvirtuados = item.NoFechaOfGlobalDesvirtuados;
                    res.PubDOFDesvirtuados = item.PubDOFDesvirtuados;
                    res.NoFechaOfGlobalDefinitivos = item.NoFechaOfGlobalDefinitivos;
                    res.PubDefinitivos = item.PubDefinitivos;
                    res.PubDOFDefinitivos = item.PubDOFDefinitivos;
                    res.NoFechaOfGlobalSentenciaFav = item.NoFechaOfGlobalSentenciaFav;
                    res.PubSentenciaFav = item.PubSentenciaFav;
                    res.NoFechaOfGlobalSentenciaFav2 = item.NoFechaOfGlobalSentenciaFav2;
                    res.PubDOFSentenciaFav = item.PubDOFSentenciaFav;                
                }

                return res;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool EmailExists(string email)
        {
            try
            {
                USER us = new USER();
                var usr = db.USER.FirstOrDefault(u => u.EMAIL == email);
                if (usr != null)
                    return true;
                else
                    return false;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public ExecResult ValidateEmail(int idUser)
        {
            ExecResult res = new ExecResult();

            try
            {
                var usr = db.USER.Find(idUser);
                if (usr != null)
                {
                    switch (usr.ID_STATUS)
                    {
                        case 1:
                            res.Res = false;
                            res.Message = "Usuario activo";
                            break;
                        case 2:
                            res.Res = false;
                            res.Message = "Usuario inactivo";
                            break;
                        case 3:
                            res.Res = false;
                            res.Message = "Usuario no existente";
                            break;
                        case 4:
                            usr.ID_STATUS = 1;
                            db.SaveChanges();
                            res.Res = true;
                            break;
                        default:
                            break;
                    }
                }
                else {
                    res.Res = false;
                    res.Message = "Usuario no encontrado";
                }
            }
            catch (Exception ex)
            {
                res.Res = false;
                res.Message = ex.Message;                    
            }

            return res;
        }

        public USER Forgot(string userName)
        {
            try
            {
                USER us = new USER();
                var usr = db.USER.FirstOrDefault(u => u.EMAIL == userName);
                if (usr != null)
                {
                    us.ID = usr.ID;
                    us.FIRST_NAME = usr.FIRST_NAME;
                    us.LAST_NAME = usr.LAST_NAME;
                    us.PASS = usr.PASS;
                    us.EMAIL = usr.EMAIL;                    
                }

                SATSR.Tools.Email.ForgotPasswordEmail(us);
                return us;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Register(string name, string lastname, string email, string password)
        {
            try
            {
                USER us = new USER();
                us.FIRST_NAME = name;
                us.LAST_NAME = lastname;
                us.EMAIL = email;
                us.PASS = password;
                us.ID_STATUS = 4; //Pendiente
                us.INSERT_DATE = DateTime.Now.Date;
                us.TIME_INSERT = DateTime.Now;
                db.USER.Add(us);
                db.SaveChanges();

                USER_ROL ur = new USER_ROL();
                ur.ID_USER = us.ID;
                ur.ID_ROL = 1; // Basic
                db.USER_ROL.Add(ur);
                db.SaveChanges();

                USER usret = new USER();
                usret.ID_STATUS = us.ID_STATUS;
                usret.ID = us.ID;
                usret.FIRST_NAME = us.FIRST_NAME;
                usret.LAST_NAME = us.LAST_NAME;
                usret.EMAIL = us.EMAIL;

                //busca la url de envío
                string _url = (from c in db.CONFIGURATION
                               where c.CODE == "URL-REGISTRATION"
                               select c).FirstOrDefault().VALUE;

                SATSR.Tools.Email.RegisterEmail(us, _url);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }        

        public ExecResult ChangePassword(int id, string password, string newpassword)
        {
            try
            {
                ExecResult res = new ExecResult();
                USER usr = db.USER.Find(id);

                if (usr.PASS == password)
                {
                    usr.PASS = newpassword;
                    db.SaveChanges();

                    res.Res = true;
                }
                else
                {
                    res.Res = false;
                    res.Message = "Contraseña actual incorrecta. Favor de validar.";
                }

                return res;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public List<SearchHistoryResult> History(int idUser)
        {
            try
            {
                List<SearchHistoryResult> res = new List<SearchHistoryResult>();
                USER usr = db.USER.Find(idUser);
                var hist = (from h in db.USER_SEARCH_HISTORY
                            where h.ID_USER == idUser && h.TYPE_SEARCH != 3
                            orderby h.INSERT_DATE descending select h).ToList();

                foreach (var h in hist)
                {
                    SearchHistoryResult _r = new SearchHistoryResult();
                    _r.Id = h.ID;
                    _r.Fecha = h.INSERT_DATE;
                    _r.FechaBusqueda = h.SEARCH_DATE == null ? h.INSERT_DATE : h.SEARCH_DATE.Value;
                    _r.RFC = h.RFC;
                    _r.T69 = h.C69 == null ? false : true;
                    _r.T69B = h.C69_B == null ? false : true;
                    _r.S69 = h.C69;
                    _r.S69B = h.C69_B;
                    _r.C69 = h.C69_C == null ? 0 : h.C69_C.Value;
                    _r.C69B = h.C69_BC == null ? 0 : h.C69_BC.Value;
                    _r.Date69B = h.C69_B_DATE == null ? 1000 : DateTime.Now.Subtract(h.C69_B_DATE.Value).Days;

                    res.Add(_r);
                }

                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<SearchHistoryResult> CurrentSearchs(int idUser)
        {
            try
            {
                USER usr = db.USER.Find(idUser);

                //Current Period
                DateTime hoy = DateTime.Now;
                DateTime currentPerInit = new DateTime();
                DateTime currentPerEnd = new DateTime();

                if (hoy.Day <= usr.INSERT_DATE.Value.Day)
                {
                    currentPerInit = new DateTime(hoy.AddMonths(-1).Year, hoy.AddMonths(-1).Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                }
                else
                {
                    currentPerInit = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.AddMonths(1).Year, hoy.AddMonths(1).Month, usr.INSERT_DATE.Value.Day);
                }

                //var hist = (from h in db.USER_SEARCH_HISTORY
                //            where h.ID_USER == idUser && h.TYPE_SEARCH != 3 && (h.INSERT_DATE >= currentPerInit && h.INSERT_DATE <= currentPerEnd)
                //            orderby h.INSERT_DATE descending
                var l = db.SEARCH_HISTORY_PERIOD(idUser, currentPerInit, currentPerEnd).ToList();

                var hist = (from h in l
                            where  h.TYPE_SEARCH != 3 

                            select new SearchHistoryResult
                            {
                                Id = h.ID,
                                Fecha = h.INSERT_DATE,
                                FechaBusqueda = h.SEARCH_DATE == null ? h.INSERT_DATE : h.SEARCH_DATE.Value,
                                RFC = h.RFC,
                                T69 = h.C69 == null ? false : true,
                                T69B = h.C69_B == null ? false : true,
                                S69 = h.C69,
                                S69B = h.C69_B,
                                C69 = h.C69_C == null ? 0 : h.C69_C.Value,
                                C69B = h.C69_BC == null ? 0 : h.C69_BC.Value,
                                Date69B = h.Date69B == null ? 1000 : h.Date69B.Value
                            }).ToList();

                return hist;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public List<SearchHistoryResult> CurrentAutSearchs(int idUser)
        {
            try
            {
                USER usr = db.USER.Find(idUser);

                //Current Period
                DateTime hoy = DateTime.Now;
                DateTime currentPerInit = new DateTime();
                DateTime currentPerEnd = new DateTime();

                if (hoy.Day <= usr.INSERT_DATE.Value.Day)
                {
                    currentPerInit = new DateTime(hoy.AddMonths(-1).Year, hoy.AddMonths(-1).Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                }
                else
                {
                    currentPerInit = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.AddMonths(1).Year, hoy.AddMonths(1).Month, usr.INSERT_DATE.Value.Day);
                }

                var l = db.SEARCH_HISTORY_PERIOD(idUser, currentPerInit, currentPerEnd).ToList();
                var hist = (from h in l
                            where h.TYPE_SEARCH == 3 
                  
                            select new SearchHistoryResult
                            {
                                Id = h.ID,
                                Fecha = h.INSERT_DATE,
                                FechaBusqueda = h.SEARCH_DATE == null ? h.INSERT_DATE : h.SEARCH_DATE.Value,
                                RFC = h.RFC,
                                T69 = h.C69 == null ? false : true,
                                T69B = h.C69_B == null ? false : true,
                                S69 = h.C69,
                                S69B = h.C69_B,
                                C69 = h.C69_C == null ? 0 : h.C69_C.Value,
                                C69B = h.C69_BC == null ? 0 : h.C69_BC.Value,
                                Date69B = h.Date69B == null ? 1000 : h.Date69B.Value
                            }).ToList();

                return hist;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public CurrentPeriodResult CurrentPeriod(int idUser)
        {
            CurrentPeriodResult res = new CurrentPeriodResult();
            try
            {
                USER usr = db.USER.Find(idUser);

                //Current Period
                DateTime hoy = DateTime.Now;
                DateTime currentPerInit = new DateTime();
                DateTime currentPerEnd = new DateTime();

                if (hoy.Day <= usr.INSERT_DATE.Value.Day)
                {
                    currentPerInit = new DateTime(hoy.AddMonths(-1).Year, hoy.AddMonths(-1).Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                }
                else
                {
                    currentPerInit = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.AddMonths(1).Year, hoy.AddMonths(1).Month, usr.INSERT_DATE.Value.Day);
                }

                res.InitDate = currentPerInit;
                res.EndDate = currentPerEnd;
                

                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<SearchHistorySimpleResult> ProvHistorySimple(int idUser)
        {
            List<SearchHistorySimpleResult> res = new List<SearchHistorySimpleResult>();
            try
            {             
                var l = (from s in db.USER_SEARCH_HISTORY where s.ID_USER == idUser orderby s.INSERT_DATE descending select s).ToList();

                var currentProv = (from s in l                                 
                                   group s by s.RFC into g                                   
                                   select g).ToList();

                foreach (var p in currentProv)
                {
                    var _prov = p.FirstOrDefault();

                    res.Add(new SearchHistorySimpleResult
                    {
                        RFC = _prov.RFC                        
                    });                      
                }    

                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }


        public List<SearchHistoryResult> ProvHistory(int idUser)
        {
            List<SearchHistoryResult> res = new List<SearchHistoryResult>();
            try
            {
                USER usr = db.USER.Find(idUser);

                //Current Period
                DateTime hoy = DateTime.Now;
                DateTime currentPerInit = new DateTime();
                DateTime currentPerEnd = new DateTime();

                if (hoy.Day <= usr.INSERT_DATE.Value.Day)
                {
                    currentPerInit = new DateTime(hoy.AddMonths(-1).Year, hoy.AddMonths(-1).Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                }
                else
                {
                    currentPerInit = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.AddMonths(1).Year, hoy.AddMonths(1).Month, usr.INSERT_DATE.Value.Day);
                }

                var l = (from s in db.USER_SEARCH_HISTORY where s.ID_USER == idUser orderby s.INSERT_DATE descending select s).ToList();

                var currentProv = (from s in l
                                   group s by s.RFC into g
                                   select g).ToList();

                foreach (var p in currentProv)
                {
                    var _prov = p.FirstOrDefault();

                    res.Add(new SearchHistoryResult
                    {
                        Id = _prov.ID,
                        Fecha = _prov.INSERT_DATE,
                        FechaBusqueda = _prov.SEARCH_DATE == null ? _prov.INSERT_DATE : _prov.SEARCH_DATE.Value,
                        RFC = _prov.RFC,
                        T69 = _prov.C69 == null ? false : true,
                        T69B = _prov.C69_B == null ? false : true,
                        S69 = _prov.C69,
                        S69B = _prov.C69_B,
                        C69 = _prov.C69_C == null ? 0 : _prov.C69_C.Value,
                        C69B = _prov.C69_BC == null ? 0 : _prov.C69_BC.Value,
                        Date69B = _prov.C69_B_DATE == null ? 1000 : DateTime.Now.Subtract(_prov.C69_B_DATE.Value).Days
                    });
                }

                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<Detail69SupuestoResult> ProvHistoryDetail69(int idUser)
        {
            List<Detail69SupuestoResult> res = new List<Detail69SupuestoResult>();
            try
            {
                var _r = db.GET_DETAIL_69(idUser);

                foreach (var p in _r)
                {

                    res.Add(new Detail69SupuestoResult
                    {
                        RFC = p.C1,
                        Nombre = p.C2,
                        Supuesto = p.C4,
                        PPublicacion = p.C5,
                        Monto = p.C6,                        
                        Publicacion = p.C7                                                                                       
                    });
                }

                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<Detail69BResult> ProvHistoryDetail69B(int idUser)
        {
            List<Detail69BResult> res = new List<Detail69BResult>();
            try
            {
                var _r = db.GET_DETAIL_69B(idUser);

                foreach (var p in _r)
                {

                    res.Add(new Detail69BResult
                    {
                        RFC = p.C2,
                        Nombre = p.C3,
                        Situacion = p.C4,
                        PubPresuncion  =p.C5,
                        SATPresuntos = p.C6.ToString(),
                        NoFechaOfGlobalPresuncion = p.C7,
                        PubDOFPresuntos = p.C8.ToString(),
                        PubDesvirtuados = p.C9,
                        NoFechaOfGlobalDesvirtuados = p.C10,
                        PubDOFDesvirtuados = p.C11,
                        NoFechaOfGlobalDefinitivos = p.C12,
                        PubDefinitivos = p.C13.ToString(),
                        PubDOFDefinitivos = p.C14.ToString(),
                        NoFechaOfGlobalSentenciaFav = p.C15,
                        PubSentenciaFav = p.C16,
                        NoFechaOfGlobalSentenciaFav2 = p.C17,
                        PubDOFSentenciaFav = p.C18
                    });
                }

                return res;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public AccountInfoResult GetAccountInfo(int idUser)
        {
            AccountInfoResult res = new AccountInfoResult();

            try
            {                
                DateTime fechaActual = DateTime.Now;

                //BUSCA EL HISTORIAL DE CONSULTAS HECHAS POR EL USUARIO, PARA CONOCER LA ULTIMA FECHA 
                var hist = (from h in db.USER_SEARCH_HISTORY
                            where h.ID_USER == idUser
                            orderby h.INSERT_DATE descending

                            select new SearchHistoryResult
                            {
                                Id = h.ID,
                                Fecha = h.INSERT_DATE,
                                FechaBusqueda = h.SEARCH_DATE == null ? h.INSERT_DATE : h.SEARCH_DATE.Value,
                                RFC = h.RFC,
                                T69 = h.C69.Length > 0 ? true : false,
                                T69B = h.C69_B.Length > 0 ? true : false,
                                S69 = h.C69,
                                S69B = h.C69_B,
                                C69 = h.C69_C == null ? 0 : h.C69_C.Value,
                                C69B = h.C69_BC == null ? 0 : h.C69_BC.Value,
                            }).FirstOrDefault();
                ///////////////////////////////////////////////////////////////////////////////////////

                //BUSCA LA ULTIMA CARGA DEL TIPO SOURCE 1
                var source_1 = (from s in db.UPDATE
                                where s.ID_SOURCE_TYPE == 1
                                orderby s.DATE_UPDATE descending

                                select new UpdateResult
                                {
                                    Id = s.ID,
                                    DateUpdate = s.DATE_UPDATE,
                                    F = s.F,
                                    M = s.M,
                                    IdSourceType = s.ID_SOURCE_TYPE,
                                    Name = s.NAME,
                                    Records = s.RECORDS,
                                    TableQuery = s.TABLE_QUERY
                                }).FirstOrDefault();

                //BUSCA LA ULTIMA CARGA DEL TIPO SOURCE 2
                var source_2 = (from s in db.UPDATE
                                where s.ID_SOURCE_TYPE == 2
                                orderby s.DATE_UPDATE descending

                                select new UpdateResult
                                {
                                    Id = s.ID,
                                    DateUpdate = s.DATE_UPDATE,
                                    F = s.F,
                                    M = s.M,
                                    IdSourceType = s.ID_SOURCE_TYPE,
                                    Name = s.NAME,
                                    Records = s.RECORDS,
                                    TableQuery = s.TABLE_QUERY
                                }).FirstOrDefault();

                if (source_1.DateUpdate <= source_2.DateUpdate)
                    res.LastUpdate = source_2.DateUpdate;
                else
                    res.LastUpdate = source_1.DateUpdate;

                ///////////////////////////////////////////////////////////////////////////////////////               
                //VERIFICA LAS FECHAS DE CADA ACTUALIZACION CON LA ÚLTIMA ACTUALIZACIÓN

                if (hist != null) 
                {
                    res.LastSearch = hist.Fecha;

                    if (hist.Fecha < source_1.DateUpdate && hist.Fecha < source_2.DateUpdate) // SI...LA ULTIMA BUSQUEDA ES INFERIOR A AMBAS CARGAS
                    {
                        res.Title = "Riesgo";
                        res.Message = "Existen nuevas actualizaciones.";
                        res.Status = 3;
                    }
                    else
                    {
                        if (hist.Fecha < source_1.DateUpdate || hist.Fecha < source_2.DateUpdate)
                        {
                            res.Status = 2;
                            res.Message = "Existe una nueva actualización.";
                            res.Title = "Precaución";
                        }
                        else
                        {
                            res.Title = "Seguro";
                            res.Status = 1;
                        }                           
                    }
                }
                else
                {
                    res.Status = 4;
                    res.Title = "Riesgo";
                    res.Message = "No se ha realizado alguna búsqueda.";
                }

                res.Res = true;
                return res;
            }
            catch (Exception  ex)
            {
                res.Res = false;
                res.Message = ex.Message;
                return res;
            }
        }

        public TypeAccountInfoResult GetTypeAccountInfo(int idUser)
        {
            TypeAccountInfoResult res = new TypeAccountInfoResult();
            try
            {
                USER usr = db.USER.Find(idUser);
                ROL r = usr.USER_ROL.FirstOrDefault().ROL;
                
                res.RolId = r.ID;
                res.RolName = r.NAME;
                res.MaxSearch = r.MAX_SEARCH.Value;
                res.MaxAutSearch = r.MAX_AUT.Value;            
                res.Description = r.DESCRIPTION;

                res.UserName = usr.FIRST_NAME + " " + usr.LAST_NAME;
                res.YearInsert = usr.INSERT_DATE.Value.Year;
                res.MonthInsert = usr.INSERT_DATE.Value.Month;
                res.DayInsert = usr.INSERT_DATE.Value.Day;

                //Current Period
                DateTime hoy = DateTime.Now;
                DateTime currentPerInit = new DateTime();
                DateTime currentPerEnd = new DateTime();

                if (hoy.Day <= res.DayInsert){
                    currentPerInit = new DateTime(hoy.AddMonths(-1).Year, hoy.AddMonths(-1).Month, res.DayInsert);
                    currentPerEnd = new DateTime(hoy.Year, hoy.Month, res.DayInsert);
                }
                else{
                    currentPerInit = new DateTime(hoy.Year, hoy.Month, res.DayInsert);
                    currentPerEnd = new DateTime(hoy.AddMonths(1).Year, hoy.AddMonths(1).Month, res.DayInsert);
                }

                var uhs = db.SEARCH_HISTORY_PERIOD(idUser, currentPerInit, currentPerEnd).ToList();

                res.CurrentSearchs = (from s in uhs
                                      where s.ID_USER == idUser && s.TYPE_SEARCH != 3 
                                   select s).Count();

                res.CurrentProv = (from s in uhs
                                   where s.ID_USER == idUser && s.TYPE_SEARCH != 3 
                                   group s by s.RFC into  g
                                   select g).Count();

                res.CurrentFailProv = (from s in uhs
                                       where s.ID_USER == idUser && s.TYPE_SEARCH != 3 &&  ((string.IsNullOrEmpty(s.C69) ? 0 : s.C69_C.Value) > 0 || (string.IsNullOrEmpty(s.C69_B) ? 0 : s.C69_BC.Value) > 0 ) 
                                   group s by s.RFC into g
                                   select g).Count();

                res.CurrentAutSearchs = (from s in uhs
                                         where s.ID_USER == idUser && s.TYPE_SEARCH == 3
                                         select s).Count();

                res.Res = true;
                return res;
            }
            catch (Exception ex)
            {
                res.Res = false;
                res.Message = ex.Message;
                return res;
            }
        }

        public AccountPersonalInfoResult GetUserInfo(int idUser)
        {
            AccountPersonalInfoResult res = new AccountPersonalInfoResult();
            try
            {
                USER usr = db.USER.Find(idUser);
                ROL r = usr.USER_ROL.FirstOrDefault().ROL;

                res.Name = usr.FIRST_NAME + " " + usr.LAST_NAME;
                res.RolId = r.ID;
                res.Rol = r.NAME;

                return res;
            }
            catch (Exception ex)
            {
                res.Name = "Error";
                return res;
            }
        }

        public ValidateResult ValidateAccount(int idUser, int toSearch)
        {
            ValidateResult res = new ValidateResult();
            try
            {
                USER usr = db.USER.Find(idUser);
                ROL r = usr.USER_ROL.FirstOrDefault().ROL;
                
                //Current Period
                DateTime hoy = DateTime.Now;
                DateTime currentPerInit = new DateTime();
                DateTime currentPerEnd = new DateTime();

                if (hoy.Day <= usr.INSERT_DATE.Value.Day)
                {
                    currentPerInit = new DateTime(hoy.AddMonths(-1).Year, hoy.AddMonths(-1).Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                }
                else
                {
                    currentPerInit = new DateTime(hoy.Year, hoy.Month, usr.INSERT_DATE.Value.Day);
                    currentPerEnd = new DateTime(hoy.AddMonths(1).Year, hoy.AddMonths(1).Month, usr.INSERT_DATE.Value.Day);
                }

                int currentSearchs = (from s in db.USER_SEARCH_HISTORY
                                      where s.ID_USER == idUser && s.TYPE_SEARCH != 3 &&  (s.INSERT_DATE >= currentPerInit && s.INSERT_DATE <= currentPerEnd)
                                      select s).Count();


                if (currentSearchs + toSearch <= r.MAX_SEARCH.Value)
                    res.Res = true;
                else
                {
                    res.Message = "La solicitud supera por " + ((currentSearchs + toSearch) -r.MAX_SEARCH.Value).ToString() +  " el límite de consultas de tu plan.";
                    res.Res = false;
                }
               
                return res;
            }
            catch (Exception ex)
            {
                res.Res = false;
                res.Message = ex.Message;
                return res;
            }
        }

        public List<MessageResult> GetMessages(int idUser)
        {
            List<MessageResult> res = new List<MessageResult>();
            try
            {
                res = (from m in db.MESSAGE
                                 join md in db.MESSAGE_DETAIL on m.ID equals md.ID_MESSAGE
                                 where md.ID_USER_TO == idUser && m.ID_STATUS == 1 && md.DELIVERED == false 
                                 orderby m.INSERT_DATE descending
                                 select new MessageResult {
                                     Id = m.ID,
                                     Icon = m.ICON,
                                     InsertDate = m.INSERT_DATE,
                                     MessageText = m.MESSAGE1,
                                     Title = m.TITLE
                                 }).Take(5).ToList();

            }
            catch (Exception ex)
            {                
            }
            return res;
        }

        public List<MessageResult> GetAllMessages(int idUser)
        {
            List<MessageResult> res = new List<MessageResult>();
            try
            {
                res = (from m in db.MESSAGE
                       join md in db.MESSAGE_DETAIL on m.ID equals md.ID_MESSAGE
                       where md.ID_USER_TO == idUser && m.ID_STATUS == 1
                       orderby m.INSERT_DATE descending
                       select new MessageResult
                       {
                           Id = m.ID,
                           Icon = m.ICON,
                           InsertDate = m.INSERT_DATE,
                           MessageText = m.MESSAGE1,
                           Title = m.TITLE
                       }).ToList();

            }
            catch (Exception ex)
            {
            }
            return res;
        }

        public bool UpdateMessages(int idMessage, int idUser)
        {
            try
            {
                MESSAGE_DETAIL md = (from d in db.MESSAGE_DETAIL where d.ID_MESSAGE == idMessage  && d.ID_USER_TO == idUser select d).FirstOrDefault();
                md.DELIVERED = true;

                db.SaveChanges();
                
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool SendEmailNotification()
        {
            try
            {
                var res = (from m in db.MESSAGE
                       join md in db.MESSAGE_DETAIL on m.ID equals md.ID_MESSAGE
                       where m.ID_STATUS == 1 && md.EMAIL_NOTIFICATION == false
                       orderby m.INSERT_DATE descending
                      select md).ToList();

                foreach (var item in res)
                {
                    SATSR.Tools.Email.NotificationEmail(item.USER, item.MESSAGE.INSERT_DATE.ToString("dd/MM/yyyy"), item.MESSAGE.TITLE, item.MESSAGE.MESSAGE1, item.MESSAGE.ICON);
                }

                //ACTUALIZA EL ESTADO DE MENSAJES A ENVIADO
                db.DELIVERY_AUTOMATIC_SEARCH();                

                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}

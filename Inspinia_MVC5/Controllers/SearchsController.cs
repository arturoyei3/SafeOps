using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

using Inspinia_MVC5.Models;

namespace Inspinia_MVC5.Controllers
{
    [Authorize]
    public class SearchsController : Controller
    {
        private SATClient.SATServiceClient sac = new SATClient.SATServiceClient();

        // GET: Searchs
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult RFC()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Detail69(int idSearch)
        {
            try
            {
                var _69 = sac.Detail69(idSearch);
                return Json(new { status = 1, d = _69 }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public JsonResult Detail69B(int idSearch)
        {
            try
            {
                var _69B = sac.Detail69B(idSearch);
                return Json(new { status = 1, d = _69B }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                throw;
            }
        }


        [HttpPost]
        public JsonResult SearchRFC(string RFC, int tipoBusqueda, string fecha)
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                List<SearchResult> lst = new List<SearchResult>();

                if (authCookie != null)
                {
                    FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                    int idUser = int.Parse(ticket.UserData);
                    var idSearch = sac.NewSearch(idUser, RFC, tipoBusqueda, fecha);

                    if (idSearch > 0)
                    {
                        //Busca en el 69;
                        var _69 = sac.Search69(idSearch, RFC, tipoBusqueda, fecha);
                        //Busca en el 69B;
                        var _69B = sac.Search69B(idSearch, RFC, tipoBusqueda, fecha);

                        SearchResult res = new SearchResult()
                        {
                            Id = idSearch,
                            RFC = RFC,
                            Fecha = DateTime.Now.Date,
                            Hora = DateTime.Now,
                            T69 = _69.Registros > 0 ? true : false,
                            T69B = _69B.Registros > 0 ? true : false,

                            S69 = _69.Archivo,
                            S69B = _69B.Archivo,
                            Date69B = _69B.Date69B,

                            C69 =  _69.Registros,
                            C69B = _69B.Registros,
                        };

                        lst.Add(res);

                        if (_69.Registros == 0 && _69B.Registros == 0)
                            return Json(new { status = 1, d = lst }, JsonRequestBehavior.AllowGet);
                        else
                            return Json(new { status = 2, d = lst, msg = "Contribuyente encontrado." }, JsonRequestBehavior.AllowGet);
                    }
                }
                return Json(new { status = 99, msg = "Ticket expirado" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
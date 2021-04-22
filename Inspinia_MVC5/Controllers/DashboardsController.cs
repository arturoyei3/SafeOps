using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Inspinia_MVC5.Controllers
{
    [Authorize]
    public class DashboardsController : Controller
    {
        private SATClient.SATServiceClient sac = new SATClient.SATServiceClient();

        public ActionResult Dashboard_1()
        {
            return View();
        }

        public ActionResult Dashboard_2()
        {
            return View();
        }

        public ActionResult Dashboard_3()
        {
            return View();
        }
        
        public ActionResult Dashboard_4()
        {
            return View();
        }
        
        public ActionResult Dashboard_4_1()
        {
            return View();
        }

        public ActionResult Dashboard_5()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetAccountInfo()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.GetAccountInfo(idUser);

                if (chg.Res)
                    return Json(new { status = 1, msg = chg.Message, d = chg }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { status = 2, msg = chg.Message, d = chg}, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public JsonResult GetTypeAccountInfo()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.GetTypeAccountInfo(idUser);

                if (chg.Res)
                    return Json(new { status = 1, msg = chg.Message, d = chg }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { status = 2, msg = chg.Message, d = chg}, JsonRequestBehavior.AllowGet);

            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
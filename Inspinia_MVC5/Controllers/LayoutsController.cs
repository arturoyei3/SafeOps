using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Inspinia_MVC5.Controllers
{

    public class LayoutsController : Controller
    {
        private SATClient.SATServiceClient sac = new SATClient.SATServiceClient();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult OffCanvas()
        {
            return View();
        }

        public ActionResult Messages()
        {
            return View();
        }

        [HttpPost]
        public JsonResult GetMessages()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.GetMessages(idUser);

                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);                                 

            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public JsonResult GetAllMessages()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.GetAllMessages(idUser);

                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        [HttpPost]
        public JsonResult UpdateMessage(int idMessage)
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.UpdateMessages(idMessage, idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
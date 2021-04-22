using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace Inspinia_MVC5.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private SATClient.SATServiceClient sac = new SATClient.SATServiceClient();

        // GET: Account
        public ActionResult Index()
        {           
            return View();
        }

        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Register()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult CompleteRegistration()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult SendEmailNotification()
        {
            return View();
        }

        public ActionResult Consultas()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Login()
        {           
            return View();
        }

      
        public ActionResult logOut()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Login", "Account");
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult LoginExt(string userName, string password)
        {
            if (userName != null && password != null)
            {
                try
                {                   
                    // Validamos si el usuario esta dado de alta
                    var usr = sac.Login(userName, password);
                    if (usr.ID != 0)
                    {
                        string idUser = usr.ID.ToString();


                        if (usr.ID_STATUS == 1)
                        {

                            // Creamos el ticket de autenticación
                            FormsAuthenticationTicket authTicket = new FormsAuthenticationTicket(
                              1, usr.FIRST_NAME, DateTime.Now, DateTime.Now.AddHours(1), false, idUser, FormsAuthentication.FormsCookiePath
                            );

                            string encTicket = FormsAuthentication.Encrypt(authTicket);
                            HttpCookie faCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
                            Response.Cookies.Add(faCookie);

                            return Json(new { status = 1, msg = "Usuario existente" }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            switch (usr.ID_STATUS)
                            {
                                case 2:
                                    return Json(new { status = 2, msg = "Usuario Inactivo" }, JsonRequestBehavior.AllowGet);
                                case 3:
                                    return Json(new { status = 2, msg = "Usuario Eliminado" }, JsonRequestBehavior.AllowGet);
                                case 4:
                                    return Json(new { status = 2, msg = "En espera de confirmación de correo." }, JsonRequestBehavior.AllowGet);
                                default:
                                    break;
                            }
                        }
                        

                    }
                    else
                    {
                        return Json(new { status = 2, msg = "Usuario y/o contraseña incorrectos" }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception e)
                {
                    return Json(new { status = 2, msg = e.Message });
                }
            }
            return Json(new { status = 2, msg = "faltan datos mod" });
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult ValidateEmail(int userId)
        {
            try
            {
                var chg = sac.ValidateEmail(userId);

                if (chg.Res)
                    return Json(new { status = 1, d = chg, msg = chg.Message }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { status = 2, d = chg, msg = chg.Message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult ValidateAccount(int toSearch)
        {
            HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
            FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
            int idUser = int.Parse(ticket.UserData);

            if (idUser > 0)
            {
                try
                {
                    // Validamos si el usuario esta dado de alta
                    var usr = sac.ValidateAccount(idUser,toSearch);
                    if (usr.Res)
                    {
                        return Json(new { status = 1, msg = "Ok" }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { status = 2, msg = usr.Message}, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception e)
                {
                    return Json(new { status = 2, msg = e.Message });
                }
            }
            return Json(new { status = 2, msg = "Error al recibir la información." });
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Forgot(string userName)
        {
            if (userName != null)
            {
                try
                {
                    // Validamos si el usuario esta dado de alta
                    var usr = sac.Forgot(userName);
                    if (usr.ID != 0)
                    {
                        return Json(new { status = 1, msg = "usuario existente." }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        return Json(new { status = 2, msg = "Usuario incorrecto." }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception e)
                {
                    return Json(new { status = 2, msg = e.Message });
                }
            }
            return Json(new { status = 2, msg = "faltan datos mod" });
        }

        [HttpPost]
        [AllowAnonymous]
        public JsonResult Register(string name, string lastname, string email, string password, string repassword, string terms)
        {
            if (name != null || lastname != null || email != null || password != null)
            {
                try
                {
                    //Verifica email
                    var useremail = sac.EmailExists(email);
                    if (useremail == false)
                    {
                        // Validamos si el usuario esta dado de alta
                        var usr = sac.Register(name, lastname, email, password);
                        if (usr)
                        {
                            return Json(new { status = 1, msg = "Usuario existente." }, JsonRequestBehavior.AllowGet);
                        }
                        else
                        {
                            return Json(new { status = 2, msg = "Usuario incorrecto." }, JsonRequestBehavior.AllowGet);
                        }
                    }
                    else {
                        return Json(new { status = 2, msg = "Correo electrónico registrado. Favor de ingresar otro." }, JsonRequestBehavior.AllowGet);
                    }
                }
                catch (Exception e)
                {
                    return Json(new { status = 2, msg = e.Message });
                }
            }
            return Json(new { status = 2, msg = "Faltan datos para el registro." });
        }

        

        [HttpPost]
        public JsonResult ChangePassword(string password, string newpassword)
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.ChangePassword(idUser, password, newpassword);

                if (chg.Res)
                    return Json(new { status = 1, msg = "Cambio de contraseña." }, JsonRequestBehavior.AllowGet);
                else
                    return Json(new { status = 2, msg = chg.Message }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }

        }

        [HttpPost]
        public JsonResult CurrentSearchs()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.CurrentSearchs(idUser);
                return Json(new { status = 1, d = chg}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult CurrentAutSearchs()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.CurrentAutSearchs(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult GetUserInfo()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.GetUserInfo(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult History()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.History(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult ProvHistorySimple()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.ProvHistorySimple(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult ProvHistory()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.ProvHistory(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult ProvHistoryDetail69()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.ProvHistoryDetail69(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }

        [HttpPost]
        public JsonResult ProvHistoryDetail69B()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.ProvHistoryDetail69B(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }



        [HttpPost]
        public JsonResult GetCurrentPeriod()
        {
            try
            {
                HttpCookie authCookie = Request.Cookies[FormsAuthentication.FormsCookieName];
                FormsAuthenticationTicket ticket = FormsAuthentication.Decrypt(authCookie.Value);
                int idUser = int.Parse(ticket.UserData);

                var chg = sac.CurrentPeriod(idUser);
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }


        [HttpPost]
        [AllowAnonymous]
        public JsonResult SendEmail()
        {
            try
            {              
                var chg = sac.SendEmailNotification();
                return Json(new { status = 1, d = chg }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception e)
            {
                return Json(new { status = 2, msg = e.Message });
            }
        }


        





    }
}
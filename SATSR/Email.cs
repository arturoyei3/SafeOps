using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Net.Security;
using System.IO;
using System.Threading;
using System.Security.Cryptography.X509Certificates;


namespace SATSR.Tools
{
    public class Email
    {

        public static bool ForgotPasswordEmail(USER user)
        {
            try
            {                
                var mensaje = new MailMessage();
                mensaje.Subject = "SafeOps - Recuperación de contraseña";

                //then we create the Html part
                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(
                "<section style=\"width:100%;\"><header><h2>Recuperación de contraseña</h2></header>" +
                "<div style=\"width:100%;\">" +
                    "<p><b>" + user.FIRST_NAME + " " + user.LAST_NAME + "</b>,</p>" +
                    "<p>Le dejamos su contraseña actual:</p>" +
                    "<h3>" + user.PASS + "</h3> " +                    
                "</div>" +
                "</section>"
                , null, "text/html"
                );
                mensaje.AlternateViews.Add(htmlView);
                mensaje.To.Add(user.EMAIL);

                mensaje.IsBodyHtml = true;

                var smtp = new SmtpClient();
                ServicePointManager.ServerCertificateValidationCallback =
                    delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };

                smtp.Send(mensaje);

                //SERVICE_LOG sl = new SERVICE_LOG();
                //sl.ID_DAILY_ROL = iddailyrol;
                //sl.ID_USER = iduser;
                //sl.LOG_DATE = DateTime.Now;
                //sl.DESCRIPTION = "Envío de correo de cambio de asignación a operador (" + usr.correo + ")";

                //db.SERVICE_LOG.Add(sl);
                //db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static bool RegisterEmail(USER user, string url)
        {
            try
            {
                var mensaje = new MailMessage();
                mensaje.Subject = "SafeOps - Alta de usuario";

                //then we create the Html part
                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(
                "<section style=\"width:100%;\"><header><h2>Gracias por registrarte</h2></header>" +
                "<div style=\"width:100%;\">" +
                    "<p><b>" + user.FIRST_NAME + " " + user.LAST_NAME + "</b>,</p>" +
                    "<p>De clic en el siguiente liga para activar su cuenta:</p>" +
                    "<a href=\"" + url + "Account/CompleteRegistration?REG=" + user.ID+"\">Activar</a> " +
                "</div>" +
                "</section>"
                , null, "text/html"
                );
                mensaje.AlternateViews.Add(htmlView);
                mensaje.To.Add(user.EMAIL);

                mensaje.IsBodyHtml = true;

                var smtp = new SmtpClient();
                ServicePointManager.ServerCertificateValidationCallback =
                    delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };

                smtp.Send(mensaje);

                //SERVICE_LOG sl = new SERVICE_LOG();
                //sl.ID_DAILY_ROL = iddailyrol;
                //sl.ID_USER = iduser;
                //sl.LOG_DATE = DateTime.Now;
                //sl.DESCRIPTION = "Envío de correo de cambio de asignación a operador (" + usr.correo + ")";

                //db.SERVICE_LOG.Add(sl);
                //db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static bool NotificationEmail(USER user, string fecha, string title, string message, string icon)
        {
            try
            {
                var mensaje = new MailMessage();
                string imgsource = string.Empty;
                mensaje.Subject = title;// "SafeOps - Ejecución automática";


                switch (icon)
                {   
                    case "fa-upload":
                        imgsource = "<img width='100' src='https://safe-ops.net/Images/logo-t.png' />";
                        break;                    
                    case "fa-check-circle":
                        imgsource = "<img width='100' src='https://safe-ops.net/Images/email_ok.png' />";
                        break;
                    case "fa-exclamation-circle":
                        imgsource = "<img width='100' src='https://safe-ops.net/Images/email_error.png' />";
                        break;
                    case "fa-close":
                        imgsource = "<img width='100' src='https://safe-ops.net/Images/email_error.png' />";
                        break;
                    default:
                        imgsource = "<img width='100' src='https://safe-ops.net/Images/logo-t.png' />";
                        break;
                }               

                //then we create the Html part
                AlternateView htmlView = AlternateView.CreateAlternateViewFromString(
                "<section style=\"width:100%;\">" +
                "<p> " + imgsource + " </p> " + 
                "<div style=\"width:100%;\">" +
                    "<p><b>" + user.FIRST_NAME + " " + user.LAST_NAME + "</b>,</p>" +
                    "<p>"+ message +"</p>" +                   
                "</div>" +
                "</section>"
                , null, "text/html"
                );
                mensaje.AlternateViews.Add(htmlView);
                mensaje.To.Add(user.EMAIL);

                mensaje.IsBodyHtml = true;

                var smtp = new SmtpClient();
                ServicePointManager.ServerCertificateValidationCallback =
                    delegate (object s, X509Certificate certificate, X509Chain chain, SslPolicyErrors sslPolicyErrors) { return true; };

                smtp.Send(mensaje);

                //SERVICE_LOG sl = new SERVICE_LOG();
                //sl.ID_DAILY_ROL = iddailyrol;
                //sl.ID_USER = iduser;
                //sl.LOG_DATE = DateTime.Now;
                //sl.DESCRIPTION = "Envío de correo de cambio de asignación a operador (" + usr.correo + ")";

                //db.SERVICE_LOG.Add(sl);
                //db.SaveChanges();

                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
    }
}
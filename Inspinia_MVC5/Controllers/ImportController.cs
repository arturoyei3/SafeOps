using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;
using System.Net;
using System.Threading.Tasks;

namespace Inspinia_MVC5.Controllers
{
    [Authorize]
    public class ImportController : Controller
    {
        // GET: Import
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Excel()
        {
            return View();
        }        
    }
}
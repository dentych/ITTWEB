using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Data;

namespace WebApplication.Controllers
{
    [Authorize]
    public class SearchController : Controller
    {
        private ComponentDbContext context;

        public SearchController(ComponentDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Show(string query)
        {
            var model = context.ComponentTypes.Where(ct => ct.ComponentName.Contains(query)).ToList();

            return View(model);
        }
    }
}
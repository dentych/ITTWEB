using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication.Data;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class ComponentTypeController : Controller
    {
        private ComponentDbContext context;

        public ComponentTypeController(ComponentDbContext context)
        {
            System.Diagnostics.Debug.WriteLine("Andy: get Context");
            this.context = context;
        }

        public IActionResult Index()
        {
            System.Diagnostics.Debug.WriteLine("Andy: Index");
            return View();

        }

        [HttpGet]
        public IActionResult Create()
        {
            System.Diagnostics.Debug.WriteLine("Andy: Get Create");
            return View();
        }

        [HttpPost]
        public IActionResult Create(string ctName)
        {
            if (!string.IsNullOrEmpty(ctName))
            {
                var coType = new ComponentType();
                coType.ComponentName = ctName;

                System.Diagnostics.Debug.WriteLine("Andy: Add to context");
                context.ComponentTypes.Add(coType);
                context.SaveChanges(true);

                return RedirectToAction("Show", new {id = coType.ComponentTypeId});
            }
            else
            {
                ViewData["error"] = "Please input a correct name you noob.";
                return View();
            }
        }

        public IActionResult Show(int id)
        {
            var componentType = context.ComponentTypes.Single(c => c.ComponentTypeId == id);

            System.Diagnostics.Debug.WriteLine("Andy " + id);
            System.Diagnostics.Debug.WriteLine("Andy: " + context);

            return View(componentType);

        }

        public IActionResult Delete(int id)
        {
            ViewData["id"] = id;
            return View();
        }

        [ActionName("Delete")]
        [HttpPost]
        public IActionResult Delete_ComponentType(int id)
        {
            var coType = findComponentTypeById(id);
            context.ComponentTypes.Remove(coType);
            context.SaveChanges();

            return RedirectToAction("Index");
        }

        private ComponentType findComponentTypeById(int id)
        {
            return context.ComponentTypes.Single(c => c.ComponentTypeId == id);
        }

    }
}
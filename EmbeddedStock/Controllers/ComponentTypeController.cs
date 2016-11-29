using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
            this.context = context;
        }

        public IActionResult Index()
        {
            var componentTypes = context.ComponentTypes.Include(ct => ct.Categories).ToList();
            return View(componentTypes);

        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string ctName)
        {
            if (!string.IsNullOrEmpty(ctName))
            {
                var coType = new ComponentType();
                coType.ComponentName = ctName;

                context.ComponentTypes.Add(coType);
                context.SaveChanges(true);

                return RedirectToAction("Show", new {id = coType.ComponentTypeId});
            }
            else
            {
                ViewData["error"] = "Please input a correct name.";
                return View();
            }
        }

        public IActionResult Show(int id)
        {
            var componentType = context.ComponentTypes.Single(ct => ct.ComponentTypeId == id);

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
            return context.ComponentTypes.Single(ct => ct.ComponentTypeId == id);
        }

    }
}
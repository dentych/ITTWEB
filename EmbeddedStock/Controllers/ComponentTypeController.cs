using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication.Data;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Authorize]
    public class ComponentTypeController : Controller
    {
        private ComponentDbContext context;

        public ComponentTypeController(ComponentDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            var componentTypes = context.ComponentTypes.Include(ct => ct.Components).ToList();
            return View(componentTypes);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string ctName, string ctInfo, string ctLocation, ComponentTypeStatus ctStatus,
            string ctDatasheet, string ctImageUrl, string ctManufacturer, string ctWikiLink, string ctAdminComment)
        {
            if (!string.IsNullOrEmpty(ctName))
            {
                var coType = new ComponentType();
                coType.ComponentName = ctName;
                coType.ComponentInfo = ctInfo;
                coType.Location = ctLocation;
                coType.Status = ctStatus;
                coType.Datasheet = ctDatasheet;
                coType.ImageUrl = ctImageUrl;
                coType.Manufacturer = ctManufacturer;
                coType.WikiLink = ctWikiLink;
                coType.AdminComment = ctAdminComment;

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
            var componentType =
                context.ComponentTypes.Include(ct => ct.CategoryComponentTypes)
                    .ThenInclude(cct => cct.Category)
                    .Include(ct => ct.Components)
                    .Single(ct => ct.ComponentTypeId == id);

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
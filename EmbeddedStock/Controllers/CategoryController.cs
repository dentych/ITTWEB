using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Authorize]
    public class CategoryController : Controller
    {
        private ComponentDbContext context;

        public CategoryController(ComponentDbContext context)
        {
            this.context = context;
        }

        public IActionResult Index()
        {
            var categories = context.Categories.Include(c => c.CategoryComponentTypes).ToList();
            return View(categories);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(string categoryName)
        {
            if (!string.IsNullOrEmpty(categoryName))
            {
                var cat = new Category();
                cat.Name = categoryName;

                context.Categories.Add(cat);
                context.SaveChanges(true);

                return RedirectToAction("Show", new {id = cat.CategoryId});
            }
            else
            {
                ViewData["error"] = "Please input a correct name you noob.";
                return View();
            }
        }

        public IActionResult Show(int id)
        {
            var category = findCategoryById(id, true);

            return View(category);
        }

        public IActionResult Delete(int id)
        {
            ViewData["id"] = id;
            return View();
        }

        [ActionName("Delete")]
        [HttpPost]
        public IActionResult Delete_Category(int id)
        {
            var cat = findCategoryById(id);
            context.Categories.Remove(cat);
            context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult Update(int id)
        {
            var model = findCategoryById(id);
            return View(model);
        }

        [ActionName("Update")]
        [HttpPost]
        public IActionResult Update(int id, string categoryName)
        {
            var model = findCategoryById(id);
            model.Name = categoryName;
            context.Categories.Update(model);
            context.SaveChanges();

            return RedirectToAction("Index");
        }

        public IActionResult ComponentType(int id)
        {
            var categoryComponentTypes = context.Categories.Where(c => c.CategoryId == id)
                .Include(c => c.CategoryComponentTypes)
                .ThenInclude(cct => cct.ComponentType)
                .ToList();
            var model = context.ComponentTypes.Include(ct => ct.CategoryComponentTypes)
                .ThenInclude(cct => cct.Category)
                .Where(ct => ct.CategoryComponentTypes.All(cct => cct.CategoryId != id))
                .ToList();
            ViewData["id"] = id;
            return View(model);
        }

        [HttpPost]
        public IActionResult ComponentType(int id, int componentTypeId)
        {
            if (componentTypeId < 1)
            {
                return RedirectToAction("Show", new {id = id});
            }

            var category = findCategoryById(id, true);
            category.CategoryComponentTypes.Add(new CategoryComponentType
            {
                CategoryId = id,
                ComponentTypeId = componentTypeId
            });
            context.SaveChanges();
            return RedirectToAction("Show", new {id = id});
        }

        private Category findCategoryById(int id, bool includeTypes = false)
        {
            if (includeTypes)
            {
                return context.Categories.Include(c => c.CategoryComponentTypes)
                    .ThenInclude(cct => cct.ComponentType)
                    .Single(c => c.CategoryId == id);
            }
            else
            {
                return context.Categories.Single(c => c.CategoryId == id);
            }
        }
    }
}
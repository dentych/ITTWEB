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
            var categories = context.Categories.Include(c => c.ComponentTypes).ToList();
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
            var category = context.Categories.Single(c => c.CategoryId == id);

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

        private Category findCategoryById(int id)
        {
            return context.Categories.Single(c => c.CategoryId == id);
        }
    }
}
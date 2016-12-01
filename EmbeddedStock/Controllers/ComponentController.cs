using System;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using WebApplication.Models.ComponentViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Authorize]
    public class ComponentController : Controller
    {
        private ComponentDbContext context;

        public ComponentController(ComponentDbContext context)
        {
            this.context = context;
        }

        public IActionResult Create(int componentTypeId)
        {
            var model = context.ComponentTypes.Single(ct => ct.ComponentTypeId == componentTypeId);
            return View(model);
        }

        [HttpPost]
        public IActionResult Create(long componentTypeId, int componentNumber, string serialNo,
            ComponentStatus status, string adminComment, string userComment)
        {
            var component = new Component();
            component.ComponentTypeId = componentTypeId;
            component.ComponentNumber = componentNumber;
            component.SerialNo = serialNo;
            component.Status = status;
            component.AdminComment = adminComment;
            component.UserComment = userComment;

            context.Components.Add(component);
            context.SaveChanges();

            return RedirectToAction("Show", "ComponentType", new { id = component.ComponentTypeId });
        }

        [HttpPost]
        public IActionResult Save(long componentTypeId, int componentNumber, string serialNo,
            ComponentStatus status, string adminComment, string userComment)
        {
            var component = new Component();
            component.ComponentTypeId = componentTypeId;
            component.ComponentNumber = componentNumber;
            component.SerialNo = serialNo;
            component.Status = status;
            component.AdminComment = adminComment;
            component.UserComment = userComment;

            context.Components.Update(component);
            context.SaveChanges();

            return RedirectToAction("Show", "ComponentType", new { id = component.ComponentTypeId });
        }

        public IActionResult Show(int id)
        {
            var component = context.Components.Single(c => c.ComponentId == id);
            var componentType = context.ComponentTypes.Single(ct => ct.ComponentTypeId == component.ComponentTypeId);
            var model = new ComponentViewModel(component, componentType);
            return View(model);
        }

        public IActionResult Edit(int id)
        {
            var component = context.Components.Single(c => c.ComponentId == id);
            var componentType = context.ComponentTypes.Single(ct => ct.ComponentTypeId == component.ComponentTypeId);
            var model = new ComponentViewModel(component, componentType);
            return View(model);
        }

        [ActionName("Edit")]
        [HttpPost]
        public IActionResult Edit(int id, int componentNumber, string serialNo,
            ComponentStatus Status, string adminComment, string userComment)
        {
            var component = FindComponentById(id);
            component.AdminComment = adminComment;
            component.ComponentNumber = componentNumber;
            component.SerialNo = serialNo;
            component.Status = Status;
            component.UserComment = userComment;
            context.Components.Update(component);
            context.SaveChanges();

            return RedirectToAction("Show", "Component", new { id = component.ComponentId });
        }

        public IActionResult Delete(int id)
        {
            ViewData["id"] = id;
            return View();
        }

        [ActionName("Delete")]
        [HttpPost]
        public IActionResult Delete_Component(int id)
        {
            var component = FindComponentById(id);
            context.Components.Remove(component);
            context.SaveChanges();

            return RedirectToAction("Show", "ComponentType", new { id = component.ComponentTypeId });
        }

        private Component FindComponentById(int id)
        {
            return context.Components.Single(c => c.ComponentId == id);
        }
    }
}
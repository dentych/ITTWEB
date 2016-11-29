using WebApplication.Models;

namespace WebApplication.Models.ComponentViewModels
{
    public class ComponentShowViewModel
    {
        public ComponentShowViewModel(Component component, ComponentType componentType)
        {
            ComponentId = component.ComponentId;
            ComponentTypeId = component.ComponentTypeId;
            ComponentNumber = component.ComponentNumber;
            SerialNo = component.SerialNo;
            AdminComment = component.AdminComment;
            UserComment = component.UserComment;

            ComponentType = componentType;
        }

        public long ComponentId { get; set; }
        public long ComponentTypeId { get; set; }
        public ComponentType ComponentType { get; set; }
        public int ComponentNumber { get; set; }
        public string SerialNo { get; set; }
        public ComponentStatus Status { get; set; }
        public string AdminComment { get; set; }
        public string UserComment { get; set; }
    }
}
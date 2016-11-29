using System.Collections.Generic;

namespace WebApplication.Models
{
    public class Category
    {
        public Category()
        {
            CategoryComponentTypes = new List<CategoryComponentType>();
        }

        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryComponentType> CategoryComponentTypes { get; protected set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingList.Api.Entities
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<ShoppingListItem> Items { get; set; }
    }
}

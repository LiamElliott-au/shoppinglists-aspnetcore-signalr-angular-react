using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShoppingList.Api.Entities
{
    public class ShoppingListItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public bool Purchased { get; set; }
    }
}

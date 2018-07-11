using Microsoft.AspNetCore.SignalR;
using ShoppingList.Api.Data;
using ShoppingList.Api.Entities;
using ShoppingList.Api.SignalR;
using System.Threading.Tasks;

namespace ShoppingList.Api.Services
{
    public class ShoppingListNotificationService : IShoppingListNotificationService
    {
        private readonly IHubContext<ShoppingListHub> hub;
        private readonly ShoppingListDbContext db;

        public ShoppingListNotificationService(IHubContext<ShoppingListHub> hub, ShoppingListDbContext db)
        {
            this.hub = hub;
            this.db = db;
        }

        public async Task NotifyShoppingListItemAdded(int shoppingListId, ShoppingListItem item)
        {
            var group = hub.Clients.Group($"{ShoppingListHub.SHOPPINGLIST_GROUP}{shoppingListId}");
            await group.SendAsync("ShoppingListItem_Added", item);
        }

        public async Task NotifyShoppingListItemUpdated(int shoppingListId, ShoppingListItem item)
        {
            var group = hub.Clients.Group($"{ShoppingListHub.SHOPPINGLIST_GROUP}{shoppingListId}");
            await group.SendAsync("ShoppingListItem_Updated", item);
        }

        public async Task NotifyShoppingListUpdated(Entities.ShoppingList item)
        {
            var group = hub.Clients.Group($"{ShoppingListHub.SHOPPINGLIST_GROUP}{item.Id}");
            await group.SendAsync("ShoppingList_Updated", item);
        }

        public async Task NotifyRefreshList()
        {
            await hub.Clients.All.SendAsync("ShoppingLists_Refresh", db.ShoppingLists);
        }
    }
}

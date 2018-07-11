using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ShoppingList.Api.SignalR
{
    public class ShoppingListHub : Hub
    {
        public const string SHOPPINGLIST_GROUP = "ShoppingList_";
        public async Task JoinList(string listId)
        {
            await Groups.AddToGroupAsync(this.Context.ConnectionId, $"{SHOPPINGLIST_GROUP}{listId}");
        }

        public async Task LeaveList(string listId)
        {
            await Groups.RemoveFromGroupAsync(this.Context.ConnectionId, $"{SHOPPINGLIST_GROUP}{listId}");
        }
    }
}

using ShoppingList.Api.Entities;
using System.Threading.Tasks;

namespace ShoppingList.Api.Services
{
    public interface IShoppingListNotificationService
    {
        Task NotifyRefreshList();
        Task NotifyShoppingListItemAdded(int shoppingListId, ShoppingListItem item);
        Task NotifyShoppingListItemUpdated(int shoppingListId, ShoppingListItem item);
        Task NotifyShoppingListUpdated(Entities.ShoppingList item);

    }
}

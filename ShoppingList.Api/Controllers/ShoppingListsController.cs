using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingList.Api.Data;
using ShoppingList.Api.Entities;
using ShoppingList.Api.Services;

namespace ShoppingList.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingListsController : ControllerBase
    {
        private readonly ShoppingListDbContext db;
        private readonly IShoppingListNotificationService notifications;

        public ShoppingListsController(ShoppingListDbContext db, IShoppingListNotificationService notifications)
        {
            this.db = db;
            this.notifications = notifications;
        }

        // GET api/values
        [HttpGet]
        public async Task<IActionResult> Get()
        {

            return Ok(await db.ShoppingLists.ToListAsync());
        }

        // GET api/values/5
        [HttpGet("{id}", Name = "GetShoppingList")]
        public async Task<IActionResult> Get(int id)
        {
            var list = await db.ShoppingLists.Include(l => l.Items).SingleOrDefaultAsync(i => i.Id == id);
            if (list == null)
            {
                return NotFound();
            }
            
            return Ok(list);
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Entities.ShoppingList value)
        {
            if (value == null) return BadRequest();

            await db.ShoppingLists.AddAsync(value);
            await db.SaveChangesAsync();

            await notifications.NotifyRefreshList();
            return CreatedAtRoute("GetShoppingList", new { id = value.Id }, value);

        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Entities.ShoppingList value)
        {
            if (value == null || value.Id != id)
                return BadRequest();

            var list = await db.ShoppingLists.Include(l => l.Items).SingleOrDefaultAsync(i => i.Id == id);
            if (list == null)
            {
                return NotFound();
            }

            list.Name = value.Name;
            list.Items = value.Items;

            try
            {
                db.ShoppingLists.Update(list);
                db.SaveChanges();
            }
            catch (Exception e)
            {

            }

            await notifications.NotifyRefreshList();
            return NoContent();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var list = await db.ShoppingLists.FindAsync(id);

            if (list == null)
            {
                return NotFound();
            }

            db.ShoppingLists.Remove(list);
            await db.SaveChangesAsync();

            await notifications.NotifyRefreshList();
            return NoContent();
        }


        [HttpGet("{shoppingListId}/Items/{id}", Name = "ShoppingListItem")]
        public async Task<IActionResult> GetItem(int shoppingListId, int id)
        {
            var list = await db.ShoppingLists.Include(l => l.Items).SingleOrDefaultAsync(l => l.Id == shoppingListId);

            if (list == null)
            {
                return NotFound();
            }

            return Ok(list.Items.SingleOrDefault(i => i.Id == id));
        }

        [HttpPost("{shoppingListId}/Items")]
        public async Task<IActionResult> PostItem(int shoppingListId, [FromBody] ShoppingListItem item)
        {
            var list = await db.ShoppingLists.Include(l => l.Items).SingleOrDefaultAsync(l => l.Id == shoppingListId);

            if (list == null)
            {
                return NotFound();
            }

            if (list.Items == null)
            {
                list.Items = new List<ShoppingListItem>();
            }

            list.Items.Add(item);
            await db.SaveChangesAsync();

            await notifications.NotifyShoppingListItemAdded(shoppingListId, item);
            return CreatedAtRoute("ShoppingListItem", new { shoppingListId, item.Id }, item);
        }

        [HttpPut("{shoppingListId}/Items/{id}")]
        public async Task<IActionResult> PutItem(int shoppingListId, int id, [FromBody] ShoppingListItem item)
        {
            var list = await db.ShoppingLists.Include(l => l.Items).SingleOrDefaultAsync(l => l.Id == shoppingListId);

            if (list == null)
            {
                return NotFound();
            }

            var original = list.Items.SingleOrDefault(i => i.Id == id);

            if (original == null)
            {
                return NotFound();
            }

            original.Name = item.Name;
            original.Purchased = item.Purchased;
            await db.SaveChangesAsync();


            await notifications.NotifyShoppingListItemUpdated(shoppingListId, item);
            return NoContent();
        }
    }
}

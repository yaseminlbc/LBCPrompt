using Lbcprompt.API.Data;
using Lbcprompt.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CategoryController(ApplicationDbContext context) { _context = context; }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _context.Categories.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Add(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Category category)
        {
            var c = await _context.Categories.FindAsync(id);
            if (c == null) return NotFound();
            c.Name = category.Name;
            await _context.SaveChangesAsync();
            return Ok(c);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var c = await _context.Categories.FindAsync(id);
            if (c == null) return NotFound();
            _context.Categories.Remove(c);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }

}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FullstackTodoAPI.Data;
using FullstackTodoAPI.Models;

namespace FullstackTodoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TodoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos()
        {
            return await _context.TodoItemcrud.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodo(TodoItem todo)
        {
            _context.TodoItemcrud.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodos), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, TodoItem todo)
        {
            if (id != todo.Id) return BadRequest();
            _context.Entry(todo).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.TodoItemcrud.FindAsync(id);
            if (todo == null) return NotFound();

            _context.TodoItemcrud.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}

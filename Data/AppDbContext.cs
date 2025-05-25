using Microsoft.EntityFrameworkCore;
using FullstackTodoAPI.Models;
using System.Collections.Generic;

namespace FullstackTodoAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItemcrud { get; set; }
    }
}

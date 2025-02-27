using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using quizapi.Models;

namespace quizapi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions)
        {

        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Scores> Scores { get; set; }
        public DbSet<Questions> Questions { get; set; }
        public DbSet<Admins> Admins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Users>()
                .HasKey(u => u.UserId);

            modelBuilder.Entity<Questions>()
                .HasKey(q => q.QuestionId);

            modelBuilder.Entity<Scores>()
                .HasKey(s => s.ScoreId);

            modelBuilder.Entity<Admins>()
                .HasKey(a => a.AdminId);
    
        }
    }
}
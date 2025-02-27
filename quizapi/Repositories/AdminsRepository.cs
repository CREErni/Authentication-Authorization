using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using quizapi.Data;
using quizapi.Interfaces;
using quizapi.Models;

namespace quizapi.Repositories
{
    public class AdminsRepository : IAdminsRepository
    {
        private readonly ApplicationDbContext _context;
        public AdminsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Admins>> GetAllAsync()
        {
           return _context.Admins.ToListAsync();
        }
        public Task<Admins> GetByIdAsync(int id)
        {
            return _context.Admins.FindAsync(id).AsTask();
        }
        public async Task AddAsync(Admins users)
        {
            await _context.Admins.AddAsync(users);
        }
        public async Task UpdateAsync(Admins users)
        {
            _context.Admins.Update(users);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var users = await _context.Admins.FindAsync(id);
            if (users != null)
            {
                _context.Admins.Remove(users);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Admins> GetByUsernameAsync(string username)
        {
            return await _context.Admins.FirstOrDefaultAsync(a => a.Username == username);
        }

    }
}
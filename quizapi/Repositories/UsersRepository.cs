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
    public class UsersRepository : IUsersRepository
    {
        private readonly ApplicationDbContext _context;
        public UsersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Users>> GetAllAsync()
        {
           return _context.Users.ToListAsync();
        }
        public Task<Users> GetByIdAsync(int id)
        {
            return _context.Users.FindAsync(id).AsTask();
        }
        public async Task AddAsync(Users users)
        {
            await _context.Users.AddAsync(users);
        }
        public async Task UpdateAsync(Users users)
        {
            _context.Users.Update(users);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users != null)
            {
                _context.Users.Remove(users);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<Users> GetByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

    }
}
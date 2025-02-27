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
    public class ScoresRepository : IScoresRepository
    {
        private readonly ApplicationDbContext _context;
        public ScoresRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Scores>> GetAllAsync()
        {
           return _context.Scores.ToListAsync();
        }
        public Task<Scores> GetByIdAsync(int id)
        {
            return _context.Scores.FindAsync(id).AsTask();
        }
        public async Task AddAsync(Scores scores)
        {
            await _context.Scores.AddAsync(scores);
        }
        public async Task UpdateAsync(Scores scores)
        {
            _context.Scores.Update(scores);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var scores = await _context.Scores.FindAsync(id);
            if (scores != null)
            {
                _context.Scores.Remove(scores);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<List<Scores>> GetByUserIdAsync(int userId)
        {
            return await _context.Scores.Where(s => s.UserId == userId).ToListAsync();
        }
    }
}
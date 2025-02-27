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
    public class QuestionsRepository : IQuestionsRepository
    {
        private readonly ApplicationDbContext _context;
        public QuestionsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Task<List<Questions>> GetAllAsync()
        {
           return _context.Questions.ToListAsync();
        }
        public Task<Questions> GetByIdAsync(int id)
        {
            return _context.Questions.FindAsync(id).AsTask();
        }
        public async Task AddAsync(Questions questions)
        {
            await _context.Questions.AddAsync(questions);
        }
        public async Task UpdateAsync(Questions questions)
        {
            _context.Questions.Update(questions);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var questions = await _context.Questions.FindAsync(id);
            if (questions != null)
            {
                _context.Questions.Remove(questions);
                await _context.SaveChangesAsync();
            }
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Models;

namespace quizapi.Interfaces
{
    public interface IScoresRepository
    {
         Task<List<Scores>> GetAllAsync();
        Task<Scores> GetByIdAsync (int id);
        Task AddAsync (Scores scores);
        Task UpdateAsync (Scores scores);
        Task DeleteAsync (int id);
        Task<List<Scores>> GetByUserIdAsync(int userId);
    }
}
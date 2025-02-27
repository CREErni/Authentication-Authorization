using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Models;

namespace quizapi.Interfaces
{
    public interface IQuestionsRepository
    {
        Task<List<Questions>> GetAllAsync();
        Task<Questions> GetByIdAsync (int id);
        Task AddAsync (Questions questions);
        Task UpdateAsync (Questions questions);
        Task DeleteAsync (int id);
    }
}
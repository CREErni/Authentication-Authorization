using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Models;

namespace quizapi.Interfaces
{
    public interface IUsersRepository
    {
        Task<List<Users>> GetAllAsync();
        Task<Users> GetByIdAsync (int id);
        Task AddAsync (Users users);
        Task UpdateAsync (Users users);
        Task DeleteAsync (int id);
        Task<Users> GetByUsernameAsync(string username);
    }
}
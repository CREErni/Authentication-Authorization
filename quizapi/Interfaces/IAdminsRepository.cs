using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Models;

namespace quizapi.Interfaces
{
    public interface IAdminsRepository
    {
        Task<List<Admins>> GetAllAsync();
        Task<Admins> GetByIdAsync (int id);
        Task AddAsync (Admins users);
        Task UpdateAsync (Admins users);
        Task DeleteAsync (int id);
        Task<Admins> GetByUsernameAsync(string username);
    }
}
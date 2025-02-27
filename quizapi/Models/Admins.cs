using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Models
{
    public class Admins
    {
        public int AdminId { get; set; }
        public required string Username { get; set; }
        public required string Password { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
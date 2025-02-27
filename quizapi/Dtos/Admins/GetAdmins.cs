using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Dtos.Admins
{
    public class GetAdmins
    {
        public required int AdminId { get; set; }
        public required string Username { get; set; }
        public required string  Password { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace quizapi.Dtos.Admins
{
    public class LoginAdmins
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
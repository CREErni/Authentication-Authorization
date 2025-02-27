using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Data;
using quizapi.Dtos.Admins;
using quizapi.Interfaces;
using quizapi.Mappers;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace quizapi.Controllers
{
    [Route("api/admins")]
    public class AdminsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IAdminsRepository _adminsRepo;
        public AdminsController(ApplicationDbContext context, IAdminsRepository adminsRepo)
        {
            _adminsRepo = adminsRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var admins = await _adminsRepo.GetAllAsync();
            var adminDto = admins.Select(b => b.ToGetAdminsDto());
            return Ok(admins);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var admins = await _adminsRepo.GetByIdAsync(id);
            if(admins == null)
            {
                return NotFound();
            }
            return Ok(admins.ToGetAdminsDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateAdmins adminDto)
        {
            // Check if the username already exists
            var existingUser = await _adminsRepo.GetByUsernameAsync(adminDto.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists");
            }

            var adminModel = adminDto.ToAdminsFromCreateDto();
            await _adminsRepo.AddAsync(adminModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = adminModel.AdminId }, adminModel.ToGetAdminsDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAdmins updateDto)
        {
            var adminModel = await _adminsRepo.GetByIdAsync(id);
            if (adminModel == null)
            {
                return NotFound();
            }

            // Check if the new username already exists (excluding the current user)
            var existingUser = await _adminsRepo.GetByUsernameAsync(updateDto.Username);
            if (existingUser != null && existingUser.AdminId != id)
            {
                return BadRequest("Username already exists");
            }

            adminModel.Username = updateDto.Username;
            adminModel.Password = updateDto.Password;
            await _context.SaveChangesAsync();
            return Ok(adminModel.ToGetAdminsDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var adminModel = await _adminsRepo.GetByIdAsync(id);
            if(adminModel == null)
            {
                return NotFound();
            }
            await _adminsRepo.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginAdmins loginDto)
        {
            var user = await _adminsRepo.GetByUsernameAsync(loginDto.Username);

                if (user == null || !VerifyPassword(loginDto.Password, user.Password))
                {
                    return Unauthorized("Invalid username or password");
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes("GodLovesYouAllTheTime-AllTheTimeGodLovesYou");
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim(ClaimTypes.Name, user.Username)
                    }),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                return Ok(new { Token = tokenString });
        

                // Here you can generate a token if you are using JWT or just return user info;
            }

            // Method to verify password (you might want to hash and compare passwords)
            private bool VerifyPassword(string inputPassword, string storedPassword)
            {
                // Implement your password verification logic here
                return inputPassword == storedPassword; // Replace with secure hash comparison
            }
            
                
    }
    
}


using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using quizapi.Data;
using quizapi.Dtos;
using quizapi.Dtos.Users;
using quizapi.Interfaces;
using quizapi.Mappers;

namespace quizapi.Controllers
{
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IUsersRepository _usersRepo;
        public UsersController(ApplicationDbContext context, IUsersRepository usersRepo)
        {
            _usersRepo = usersRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _usersRepo.GetAllAsync();
            var userDto = users.Select(b => b.ToGetUsersDto());
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var users = await _usersRepo.GetByIdAsync(id);
            if(users == null)
            {
                return NotFound();
            }
            return Ok(users.ToGetUsersDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUsers userDto)
        {
            // Check if the username already exists
            var existingUser = await _usersRepo.GetByUsernameAsync(userDto.Username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists");
            }

            var userModel = userDto.ToUsersFromCreateDto();
            await _usersRepo.AddAsync(userModel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = userModel.UserId }, userModel.ToGetUsersDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateUsers updateDto)
        {
            var userModel = await _usersRepo.GetByIdAsync(id);
            if (userModel == null)
            {
                return NotFound();
            }

            // Check if the new username already exists (excluding the current user)
            var existingUser = await _usersRepo.GetByUsernameAsync(updateDto.Username);
            if (existingUser != null && existingUser.UserId != id)
            {
                return BadRequest("Username already exists");
            }

            userModel.Username = updateDto.Username;
            userModel.Password = updateDto.Password;
            await _context.SaveChangesAsync();
            return Ok(userModel.ToGetUsersDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userModel = await _usersRepo.GetByIdAsync(id);
            if(userModel == null)
            {
                return NotFound();
            }
            await _usersRepo.DeleteAsync(id);
            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUsers loginDto)
        {
            var user = await _usersRepo.GetByUsernameAsync(loginDto.Username);

                if (user == null || !VerifyPassword(loginDto.Password, user.Password))
                {
                    return Unauthorized("Invalid username or password");
                }

                // Here you can generate a token if you are using JWT or just return user info
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

                return Ok(new { Token = tokenString, User = user.ToGetUsersDto() });
            }

            // Method to verify password (you might want to hash and compare passwords)
            private bool VerifyPassword(string inputPassword, string storedPassword)
            {
                // Implement your password verification logic here
                return inputPassword == storedPassword; // Replace with secure hash comparison
            }
            
                
    }
    
}


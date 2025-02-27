using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using quizapi.Dtos;
using quizapi.Dtos.Users;
using quizapi.Models;

namespace quizapi.Mappers
{
    public static class UsersMapper
    {
        public static GetUsers ToGetUsersDto(this Users usersModel) 
        {
            return new GetUsers
            {
                UserId = usersModel.UserId,
                Username = usersModel.Username,
                Password = usersModel.Password,
                CreatedAt  = usersModel.CreatedAt 
            };
        }
        
        public static Users ToUsersFromCreateDto(this CreateUsers usersDto)
            {
                return new Users
                {
                    Username = usersDto.Username,
                    Password = usersDto.Password
                };
            }
    }
}
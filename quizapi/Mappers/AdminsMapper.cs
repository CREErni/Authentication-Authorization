using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using quizapi.Dtos;
using quizapi.Dtos.Admins;
using quizapi.Models;


namespace quizapi.Mappers
{
    public static class AdminsMapper
    {
         public static GetAdmins ToGetAdminsDto(this Admins adminsModel) 
        {
            return new GetAdmins
            {
                AdminId = adminsModel.AdminId,
                Username = adminsModel.Username,
                Password = adminsModel.Password,
                CreatedAt  = adminsModel.CreatedAt 
            };
        }
        
        public static Admins ToAdminsFromCreateDto(this CreateAdmins adminsDto)
            {
                return new Admins
                {
                    Username = adminsDto.Username,
                    Password = adminsDto.Password
                };
            }
    }
}
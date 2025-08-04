using AutoMapper;
using Lbcprompt.API.Data;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lbcprompt.API.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _db;
        private readonly IMapper _mapper;

        public UserService(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        public async Task<List<UserDto>> GetAllUsersAsync()
        {
            var users = await _db.Users
                                 .AsNoTracking()
                                 .ToListAsync();
            return _mapper.Map<List<UserDto>>(users);
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return null;
            return _mapper.Map<UserDto>(user);
        }
    }
}

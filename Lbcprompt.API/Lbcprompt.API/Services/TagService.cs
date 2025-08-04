// Services/TagService.cs
using AutoMapper;
using Lbcprompt.API.Data;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Services
{
    public class TagService : ITagService
    {
        private readonly ApplicationDbContext _ctx;
        private readonly IMapper _mapper;

        public TagService(ApplicationDbContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<IEnumerable<TagDto>> GetAllAsync()
        {
            var tags = await _ctx.Tags.ToListAsync();
            return _mapper.Map<IEnumerable<TagDto>>(tags);
        }

        public async Task<TagDto?> GetByIdAsync(int id)
        {
            var tag = await _ctx.Tags.FindAsync(id);
            return tag == null ? null : _mapper.Map<TagDto>(tag);
        }

        public async Task<TagDto> CreateAsync(string name)
        {
            var tag = new Tag { Name = name };
            _ctx.Tags.Add(tag);
            await _ctx.SaveChangesAsync();
            return _mapper.Map<TagDto>(tag);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tag = await _ctx.Tags.FindAsync(id);
            if (tag == null) return false;
            _ctx.Tags.Remove(tag);
            await _ctx.SaveChangesAsync();
            return true;
        }
    }
}

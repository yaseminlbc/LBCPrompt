// Services/PromptService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Lbcprompt.API.Data;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Services
{
    public class PromptService : IPromptService
    {
        private readonly ApplicationDbContext _ctx;

        public PromptService(ApplicationDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<Prompt> CreatePromptAsync(PromptDto dto, int userId)
        {
            
            var distinctTagNames = (dto.Tags ?? new List<string>())
                .Select(t => t.Trim())
                .Distinct()
                .ToList();

            
            var existingTags = await _ctx.Tags
                .Where(t => distinctTagNames.Contains(t.Name))
                .ToListAsync();

            
            var newTagNames = distinctTagNames
                .Except(existingTags.Select(t => t.Name))
                .ToList();

            
            foreach (var tagName in newTagNames)
            {
                _ctx.Tags.Add(new Tag { Name = tagName });
            }

            
            if (newTagNames.Count > 0)
                await _ctx.SaveChangesAsync();

            
            var allTags = await _ctx.Tags
                .Where(t => distinctTagNames.Contains(t.Name))
                .ToListAsync();

            
            var prompt = new Prompt
            {
                Title = dto.Title,
                Content = dto.Content,
                AuthorId = userId,
                CategoryId = dto.CategoryId,
                IsApproved = dto.IsApproved,
                CreatedAt = dto.CreatedAt == default
                             ? DateTime.UtcNow
                             : dto.CreatedAt,
                Tags = allTags
            };

            _ctx.Prompts.Add(prompt);
            await _ctx.SaveChangesAsync();
            return prompt;
        }

        public async Task<List<Prompt>> GetAllPromptsAsync()
        {
            return await _ctx.Prompts
                .Include(p => p.Author)
                .Include(p => p.Tags)
                .Include(p => p.Likes)
                .Include(p => p.Reports)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<Prompt?> GetPromptByIdAsync(int id)
        {
            return await _ctx.Prompts
                .Include(p => p.Author)
                .Include(p => p.Tags)
                .Include(p => p.Likes)
                .Include(p => p.Reports)
                .FirstOrDefaultAsync(p => p.Id == id);
        }
    }
}

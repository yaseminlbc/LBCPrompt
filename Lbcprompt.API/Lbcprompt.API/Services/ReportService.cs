// Services/ReportService.cs

using Lbcprompt.API.Data;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Lbcprompt.API.Services
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _ctx;

        public ReportService(ApplicationDbContext ctx)
        {
            
            _ctx = ctx;
        }

        public async Task<Report> CreateReportAsync(ReportDto dto, int reporterId)
        {
            var report = new Report
            {
                PromptId = dto.PromptId,
                Reason = dto.Reason,
                ReporterId = reporterId
            };

            _ctx.Reports.Add(report);
            await _ctx.SaveChangesAsync();
            return report;
        }

        public async Task<List<Report>> GetAllReportsAsync()
        {
            return await _ctx.Reports
                .Include(r => r.Prompt)
                .Include(r => r.Reporter)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync();
        }

        public async Task<bool> HasUserReportedPromptAsync(int promptId, int userId)
        {
            return await _ctx.Reports.AnyAsync(r => r.PromptId == promptId && r.ReporterId == userId);
        }
    }
}

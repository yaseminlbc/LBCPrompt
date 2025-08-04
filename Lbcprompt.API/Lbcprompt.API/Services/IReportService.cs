using System.Collections.Generic;
using System.Threading.Tasks;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Services
{
    public interface IReportService
    {
        Task<Report> CreateReportAsync(ReportDto dto, int reporterId);
        Task<List<Report>> GetAllReportsAsync();
        Task<bool> HasUserReportedPromptAsync(int promptId, int userId);
    }
}

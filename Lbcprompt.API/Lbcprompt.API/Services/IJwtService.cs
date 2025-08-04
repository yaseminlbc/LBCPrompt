using System.Collections.Generic;
using System.Security.Claims;

namespace Lbcprompt.API.Services
{
    public interface IJwtService
    {
        
        string GenerateToken(IEnumerable<Claim> claims);
    }
}

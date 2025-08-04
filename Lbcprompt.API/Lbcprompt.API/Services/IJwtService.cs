using System.Collections.Generic;
using System.Security.Claims;

namespace Lbcprompt.API.Services
{
    /// <summary>
    /// JWT oluşturmak için gerekli servisi tanımlar.
    /// </summary>
    public interface IJwtService
    {
        /// <summary>
        /// Verilen claim’lerle bir JWT üretir.
        /// </summary>
        string GenerateToken(IEnumerable<Claim> claims);
    }
}

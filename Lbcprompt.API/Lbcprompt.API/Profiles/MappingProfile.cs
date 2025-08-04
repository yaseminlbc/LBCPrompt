using AutoMapper;
using Lbcprompt.API.DTOs;
using Lbcprompt.API.Models;

namespace Lbcprompt.API.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Model ↔ DTO eşlemeleri
            CreateMap<Comment, CommentDto>().ReverseMap();
            CreateMap<Report, ReportDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();

            // Register/Login DTO ↔ Entity
            CreateMap<UserRegisterDto, User>().ReverseMap();
            CreateMap<UserLoginDto, User>().ReverseMap();

            // Prompt ↔ PromptDto özel mapping (Tags listesi için)
            // DTO → Entity: string list → Tag objeleri
            CreateMap<PromptDto, Prompt>()
                .ForMember(dest => dest.Tags,
                           opt => opt.MapFrom(src
                             => src.Tags
                                   .Select(name => new Tag { Name = name })
                                   .ToList()));

            CreateMap<Prompt, PromptDto>()
     .ForMember(dest => dest.Likes, opt => opt.MapFrom(src => src.Likes.Count));

        }
    }
}

using AutoMapper;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.EF.User;

namespace QuestAnsWebServices
{
    public class AutoMapperConfig
    {
        public static void Register()
        {
            Mapper.Initialize(
                cfg =>
                {
                    cfg.CreateMap<ApplicationUser, UserDTO>()
                        .ForMember(x => x.Id, xx => xx.MapFrom(f => f.Id))
                        .ForMember(x => x.UserName, xx => xx.MapFrom(f => f.UserName))
                        .ForMember(x => x.Name, xx => xx.MapFrom(f => f.Name))
                        .ForMember(x => x.Surname, xx => xx.MapFrom(f => f.Surname))
                        .ForMember(x => x.RegistrationDate, xx => xx.MapFrom(f => f.RegistrationDate))
                        .ForMember(x => x.Email, xx => xx.MapFrom(f => f.Email));

                    cfg.CreateMap<UserRegisterDTO, ApplicationUser>()
                        .ForMember(x => x.UserName, xx => xx.MapFrom(f => f.UserName))
                        .ForMember(x => x.Name, xx => xx.MapFrom(f => f.Name))
                        .ForMember(x => x.Surname, xx => xx.MapFrom(f => f.Surname))
                        .ForMember(x => x.Email, xx => xx.MapFrom(f => f.Email));
                });
        }
    }
}

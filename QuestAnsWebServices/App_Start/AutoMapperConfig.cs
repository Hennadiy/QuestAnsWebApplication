using AutoMapper;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.EF.Info;
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
                    //todo proper mapping
                    cfg.CreateMap<ApplicationUser, UserDTO>();

                    cfg.CreateMap<UserRegisterDTO, ApplicationUser>();
                    cfg.CreateMap<UserUpdateDTO, ApplicationUser>();

                    cfg.CreateMap<CityDTO, City>();
                    cfg.CreateMap<City, CityDTO>();
                    cfg.CreateMap<CountryDTO, Country>();
                    cfg.CreateMap<Country, CountryDTO>();
                });
        }
    }
}

using AutoMapper;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.EF.Info;
using QuestAnsWebServices.Providers;
using System;
using System.Diagnostics.Contracts;
using System.Linq;

namespace QuestAnsWebServices.Repositories
{
    public interface ICityRepository
    {
        CityDTO[] GetCities(int countryId);
        void AddCity(CityDTO cityDto);
    }

    public class CityRepository : RepositoryBase<CityDTO, City, ApplicationDbContext>, ICityRepository
    {
        public CityRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public CityDTO[] GetCities(int countryId)
        {
            return (from cityCountry in _context.CitiesCountries
                    where cityCountry.CountryId == countryId
                    select cityCountry.City)
                    .AsEnumerable()
                    .Select(x => Mapper.Map<CityDTO>(x))
                    .ToArray();
        }

        public void AddCity(CityDTO cityDto)
        {
            Contract.Requires<ArgumentNullException>(cityDto != null);

            AddItem(cityDto);
        }
    }
}
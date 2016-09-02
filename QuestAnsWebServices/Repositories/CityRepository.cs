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
        void AddCity(int coutnryId, CityDTO cityDto);
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

        public void AddCity(int coutnryId, CityDTO cityDto)
        {
            Contract.Requires<ArgumentNullException>(cityDto != null);

            var cityDbItem = AddItem(cityDto);

            var entity = _context.Set<CityCountry>();
            var dbItem = entity.Create();

            dbItem.CountryId = coutnryId;
            dbItem.CityId = cityDbItem.Id;

            entity.Add(dbItem);
            _context.SaveChanges();
        }
    }
}
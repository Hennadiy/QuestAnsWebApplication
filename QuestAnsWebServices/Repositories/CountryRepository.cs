using AutoMapper;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.EF.Info;
using QuestAnsWebServices.Providers;
using System;
using System.Diagnostics.Contracts;
using System.Linq;

namespace QuestAnsWebServices.Repositories
{
    public interface ICountryRepository
    {
        CountryDTO[] GetCountries();
        int AddCountry(CountryDTO countryDTO);
    }

    public class CountryRepository : RepositoryBase<CountryDTO, Country, ApplicationDbContext>, ICountryRepository
    {
        public CountryRepository(ApplicationDbContext dbContext) : base(dbContext) { }

        public CountryDTO[] GetCountries()
        {
            return (from country in _context.Countries select country)
                    .AsEnumerable()
                    .Select(x => Mapper.Map<CountryDTO>(x))
                    .ToArray();
        }

        public int AddCountry(CountryDTO countryDTO)
        {
            Contract.Requires<ArgumentNullException>(countryDTO != null);

            var item = AddItem(countryDTO);

            return item.Id;
        }

    }
}
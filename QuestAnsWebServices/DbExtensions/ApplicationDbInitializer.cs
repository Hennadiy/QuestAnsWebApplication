using QuestAnsWebServices.DTO;
using QuestAnsWebServices.Helpers;
using QuestAnsWebServices.Providers;
using QuestAnsWebServices.Repositories;
using System;
using System.Diagnostics.Contracts;

namespace QuestAnsWebServices.DbExtensions
{
    public interface IApplicationDbInitializer
    {
        void Seed(ApplicationDbContext context);
    }

    public class ApplicationDbInitializer : IApplicationDbInitializer
    {
        private readonly IJsonHelper _jsonHelper;

        public ApplicationDbInitializer(IJsonHelper jsonHelper)
        {
            Contract.Requires<ArgumentNullException>(jsonHelper != null);

            _jsonHelper = jsonHelper;
        }

        public void Seed(ApplicationDbContext context)
        {
            var countries = _jsonHelper.ReadCountriesWithCities(Properties.Resources.countries___cities);
            var countryRepository = new CountryRepository(context);
            var cityRepository = new CityRepository(context);

            foreach (var country in countries)
            {
                var countryId = countryRepository.AddCountry(new CountryDTO
                {
                    Value = country.Name
                });

                foreach (var city in country.Cities)
                {
                    cityRepository.AddCity(countryId, new CityDTO
                    {
                        CountryId = countryId,
                        Value = city
                    });
                }
            }
        }
    }
}
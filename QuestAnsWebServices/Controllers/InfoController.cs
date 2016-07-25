using QuestAnsWebServices.DTO;
using QuestAnsWebServices.Repositories;
using System;
using System.Diagnostics.Contracts;
using System.Web.Http;

namespace QuestAnsWebServices.Controllers
{
    public class InfoController : ApiController
    {
        private readonly ICityRepository _cityRepository;
        private readonly ICountryRepository _countryRepository;

        public InfoController(ICountryRepository countryRepository, ICityRepository cityRepository)
        {
            Contract.Requires<ArgumentNullException>(countryRepository != null);
            Contract.Requires<ArgumentNullException>(cityRepository != null);

            _countryRepository = countryRepository;
            _cityRepository = cityRepository;
        }

        [HttpGet]
        public IHttpActionResult GetCountries()
        {
            return Ok(_countryRepository.GetCountries());
        }

        [HttpGet]
        public IHttpActionResult GetCities(int countryId)
        {
            return Ok(_cityRepository.GetCities(countryId));
        }
    }
}
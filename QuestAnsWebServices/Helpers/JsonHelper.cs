using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using QuestAnsWebServices.Models;
using System.Collections.Generic;
using System.Text;

namespace QuestAnsWebServices.Helpers
{
    public class JsonHelper : IJsonHelper
    {
        public override List<Country> ReadCountriesWithCities(byte[] data)
        {
            var json = Encoding.UTF8.GetString(data);
            var objs = (JObject)JsonConvert.DeserializeObject(json);
            return ParseCountries(objs);
        }

        private List<Country> ParseCountries(JObject objs)
        {
            var list = new List<Country>();
            foreach (var token in objs.Children())
            {
                if (token is JProperty)
                {
                    var country = new Country()
                    {
                        Name = GetJProperty(token),
                        Cities = ParseCities(token)
                    };
                    list.Add(country);
                }
            }

            return list;
        }

        private List<string> ParseCities(JToken token)
        {
            var list = new List<string>();
            var cities = (token as JProperty).Value.Children();

            foreach (var city in cities)
            {
                list.Add(GetJValue(city));
            }

            return list;
        }
    }
}
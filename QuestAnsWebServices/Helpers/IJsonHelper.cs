using Newtonsoft.Json.Linq;
using QuestAnsWebServices.Models;
using System.Collections.Generic;

namespace QuestAnsWebServices.Helpers
{
    public abstract class IJsonHelper
    {
        public abstract List<Country> ReadCountriesWithCities(byte[] data);

        protected string GetJValue(JToken token)
        {
            if (token is JValue)
            {
                var value = token as JValue;

                return value.Value.ToString();
            }

            return default(string);
        }

        protected string GetJProperty(JToken token)
        {
            if (token is JProperty)
            {
                var value = token as JProperty;

                return value.Name.ToString();
            }

            return default(string);
        }
    }
}
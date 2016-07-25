using System.Collections.Generic;

namespace QuestAnsWebServices.Models
{
    public class Country
    {
        public string Name { get; set; }
        public List<string> Cities { get; set; }
    }
}
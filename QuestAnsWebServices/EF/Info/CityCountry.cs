using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuestAnsWebServices.EF.Info
{
    public class CityCountry
    {
        [Key]
        public int Id { get; set; }

        public int CountryId { get; set; }

        public int CityId { get; set; }

        [ForeignKey("CountryId")]
        public Country Country { get; set; }

        [ForeignKey("CityId")]
        public City City { get; set; }
    }
}
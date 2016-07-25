using System.ComponentModel.DataAnnotations;

namespace QuestAnsWebServices.EF.Info
{
    public class Country
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Value { get; set; }
    }
}
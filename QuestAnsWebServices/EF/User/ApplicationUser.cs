using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNet.Identity.EntityFramework;
using QuestAnsWebServices.EF.Info;

namespace QuestAnsWebServices.EF.User
{
    public class ApplicationUser : IdentityUser
    {
        [MaxLength(24)]
        [MinLength(3)]
        [Required]
        public string Name { get; set; }

        [MaxLength(24)]
        [MinLength(3)]
        [Required]
        public string Surname { get; set; }

        [Required]
        public DateTime RegistrationDate { get; set; }

        [Index(IsUnique = true)]
        public override string UserName
        {
            get
            {
                return base.UserName;
            }

            set
            {
                base.UserName = value;
            }
        }

        public DateTime? Birthdate { get; set; }

        [MaxLength(24)]
        [MinLength(3)]
        public string Skype { get; set; }

        public string PhotoUrl { get; set; }

        public int? CountryId { get; set; }
        [ForeignKey("CountryId")]
        public virtual Country Country { get; set; }

        public int? CityId { get; set; }
        [ForeignKey("CityId")]
        public virtual City City { get; set; }
    }
}

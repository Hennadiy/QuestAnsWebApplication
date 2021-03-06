﻿using Microsoft.AspNet.Identity.EntityFramework;
using QuestAnsWebServices.DbExtensions;
using QuestAnsWebServices.EF.Info;
using QuestAnsWebServices.EF.User;
using System.Data.Entity;

namespace QuestAnsWebServices.Providers
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new CreateApplicationDatabaseIfNotExists());
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Country> Countries { get; set; }

        public DbSet<City> Cities { get; set; }

        public DbSet<CityCountry> CitiesCountries { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>()
                        .HasOptional(s => s.City)
                        .WithMany()
                        .WillCascadeOnDelete(true);

            modelBuilder.Entity<ApplicationUser>()
                        .HasOptional(s => s.Country)
                        .WithMany()
                        .WillCascadeOnDelete(true);
        }
    }
}

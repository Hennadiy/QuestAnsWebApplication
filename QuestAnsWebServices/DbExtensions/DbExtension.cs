namespace System.Data.Entity
{
    public static class DbExtension
    {
        public static void Initialize<TDbContext>(bool force) where TDbContext : DbContext, new()
        {
            using (var context = new TDbContext())
            {
                context.Database.Initialize(force);
            }
        }
    }
}
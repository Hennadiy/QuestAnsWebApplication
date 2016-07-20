using System;
using System.Data.Entity;
using System.Diagnostics.Contracts;
using AutoMapper;

namespace QuestAnsWebServices.Repositories
{
    public class RepositoryBase<DTO, T, Context>
        where T : class
        where Context : DbContext
    {
        private Context _context;

        public RepositoryBase(Context context)
        {
            Contract.Requires<ArgumentNullException>(context != null);

            _context = context;
        }

        protected void AddItem(DTO dtoItem)
        {
            Contract.Requires<ArgumentNullException>(dtoItem != null);

            var entity = _context.Set<T>();
            var dbItem = entity.Create();

            Mapper.Map(dtoItem, dbItem);

            entity.Add(dbItem);
            _context.SaveChanges();
        }

        protected void DeleteItem(long id)
        {
            Contract.Requires<ArgumentNullException>(id > 0);

            var entity = _context.Set<T>();
            var item = entity.Find(id);

            if (item == null)
            {
                throw new Exception(string.Format("Entity not found with id {0}.", id));
            }

            DeleteItem(item);
        }

        protected void DeleteItem(T item)
        {
            Contract.Requires<ArgumentNullException>(item != null);

            _context.Set<T>().Remove(item);
            _context.SaveChanges();
        }

        protected T GetItem(string guid)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(guid));

            return _context.Set<T>().Find(guid);
        }
    }
}

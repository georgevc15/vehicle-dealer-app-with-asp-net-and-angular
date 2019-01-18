using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContext context;

        public UnitOfWork(VegaDbContext context)
        {
            this.context = context;

        }
        public async Task Complete()
        {
            await context.SaveChangesAsync();
        }

        Task IUnitOfWork.CompleteAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
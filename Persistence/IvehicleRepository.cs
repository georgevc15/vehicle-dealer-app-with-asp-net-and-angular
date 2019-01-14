using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public interface IvehicleRepository
    {
         Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);

    }
}
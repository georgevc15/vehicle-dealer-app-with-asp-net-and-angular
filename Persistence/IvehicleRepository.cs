using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public interface IvehicleRepository
    {
         Task<Vehicle> GetVehicle(int id);
    }
}
using System.ComponentModel.DataAnnotations.Schema;

namespace vega.Models
{
    [Table("Vehicles")]
    public class VehicleFeature
    {
        public int VehicleId { get; set; }
        public int FeaturedId { get; set; }
        public int Vehicle { get; set; }
        public int Feature { get; set; }
    }
}
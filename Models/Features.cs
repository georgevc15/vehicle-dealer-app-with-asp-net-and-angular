using System.ComponentModel.DataAnnotations;

namespace vega.Models
{
    public class Features
    {
        public int Id {get; set; }

        [Required]
        [StringLength(255)]
        public string Name { get; set; }
    }
}
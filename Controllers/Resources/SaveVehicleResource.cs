using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using vega.Core.Models;

namespace vega.Controllers.Resources
{

    public class SaveVehicleResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool isRegistered { get; set; }

        [Required]
        public ContactResource Contact {get; set; }
        
        public ICollection<int> Features { get; set; }

        //constructor class
        public SaveVehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}
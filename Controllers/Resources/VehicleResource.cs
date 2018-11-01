using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using vega.Models;

namespace vega.Controllers.Resources
{

    public class VehicleResource
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool isRegistered { get; set; }

        public ContactResource Contact {get; set; }
        
        public ICollection<int> Features { get; set; }

        //constructor class
        public VehicleResource()
        {
            Features = new Collection<int>();
        }
    }
}
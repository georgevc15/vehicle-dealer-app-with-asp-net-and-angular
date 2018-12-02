using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    public class FeaturesController : Controller
    {

        private readonly IMapper mapper;
        private readonly VegaDbContext context;

        public FeaturesController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
    
        [HttpGet("/api/features")]
        public async Task<IEnumerable<Features>> GetFeatures()
        {
            return await context.Features.ToListAsync();
        }
    
    }

}
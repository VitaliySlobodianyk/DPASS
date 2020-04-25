using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelCardServer.Models;

namespace TravelCardServer.Controllers
{
    [Route("/price")]
    [ApiController]
    public class pricesController : ControllerBase
    {
        // GET: api/prices
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(GoogleSheets.GetPrice());
        }
    }
}

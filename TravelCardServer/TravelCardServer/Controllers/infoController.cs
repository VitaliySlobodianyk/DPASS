using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TravelCardServer.Controllers
{
    [Route("/info")]
    [ApiController]
    public class infoController : ControllerBase
    {
        // GET: api/info
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(GoogleSheets.GetInfo());
        }

        
    }
}

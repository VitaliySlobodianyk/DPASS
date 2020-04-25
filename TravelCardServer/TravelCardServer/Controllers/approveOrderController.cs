using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TravelCardServer.Models;
using System.Text.Json;

namespace TravelCardServer.Controllers
{
    [Route("/approveOrder")]
    [ApiController]
    public class approveOrderController : ControllerBase
    {
        // GET: api/approveOrder
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/approveOrder/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/approveOrder
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/approveOrder/5
        [HttpPut]
        public void Put([FromBody] object value)
        {
            ApprovedOrder order = JsonSerializer.Deserialize<ApprovedOrder>(value.ToString());

            GoogleSheets.approveOrder(order);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

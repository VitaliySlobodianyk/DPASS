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
    [Route("/newOrder")]
    [ApiController]
    public class newOrderController : ControllerBase
    {
        // GET: api/newOrder
        [HttpGet]
        public IActionResult Get()
        {
            Order order = new Order()
            {
                id = "kfjgdkhjfglksjdgsdf",
                name = "Test Test",
                group = "PD-31",
                phone = "11111111111",
                date = "2020/4",
                cards = new Card[]
                {
                    new Card()
                    {
                        type = "Metro",
                        limit = "46",
                        quantity = 5
                    },
                    new Card()
                    {
                        type = "Metro",
                        limit = "62",
                        quantity = 7
                    }
                }

            };
            return Ok(order);
        }


        // POST: api/newOrder
        [HttpPost]
        public IActionResult Post([FromBody] object value)
        {

            Order order = JsonSerializer.Deserialize<Order>(value.ToString());

            if(GoogleSheets.IsUnicle(order))
            {
                GoogleSheets.WriteOrder(order);
                return Ok();
            }

            return null;

        }

        // PUT: api/newOrder/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }


}

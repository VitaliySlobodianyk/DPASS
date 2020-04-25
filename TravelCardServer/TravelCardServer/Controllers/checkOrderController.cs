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
    
    
    
    [Route("/checkOrder")]
    [ApiController]
    public class checkOrderController : ControllerBase
    {
        [HttpPost]
        public IEnumerable<checkedOrder> Get([FromBody] object value)
        {

            checkedOrder[] orders = JsonSerializer.Deserialize<checkedOrder[]>(value.ToString());

            for (int i = 0; i < orders.Length; i++)
            {
                GoogleSheets.checkOrder(orders[i]);
            }

            return orders;
        }






        // PUT: api/checkOrder/5
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

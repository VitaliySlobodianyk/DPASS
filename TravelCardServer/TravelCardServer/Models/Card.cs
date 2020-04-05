using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelCardServer.Models
{
    public class Card
    {
        public string id { get; set; }
        public string type { get; set; }
        public string limit { get; set; }
        public float prise { get; set; }
        public int quantity { get; set; }       
    }
}

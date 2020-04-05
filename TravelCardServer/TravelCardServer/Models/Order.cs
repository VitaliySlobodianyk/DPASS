using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelCardServer.Models
{
    public class Order
    {
        public string id { get; set; }
        public string name { get; set; }
        public string group { get; set; }
        public string phone { get; set; }
        public string date { get; set; }

        public Card[] cards { get; set; }

        public bool approved { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelCardServer.Models
{
    public class checkedOrder
    {
        public string id { get; set; }
        public string date { get; set; }
        public bool approved { get; set; }
        public string info { get; set; }
    }
}

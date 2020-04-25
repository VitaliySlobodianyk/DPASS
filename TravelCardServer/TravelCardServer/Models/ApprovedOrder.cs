using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelCardServer.Models
{
    public class ApprovedOrder
    {
        public string id { get; set; }
        public string billId { get; set; }
        public string payDate{ get; set; }
        public string orderDate{ get; set; }
        public string sum { get; set; }

    }
}

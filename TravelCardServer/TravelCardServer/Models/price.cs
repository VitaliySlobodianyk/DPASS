using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelCardServer.Models
{
    public class price
    {
        public costCard metro { get; set; }
        public costCard metroTram { get; set; }
        public costCard metroBus { get; set; }
        public costCard metroTroley { get; set; }
    }
}

using System;

namespace Wave.Models
{    
    public class WaveInfo
    {        
        public Guid id { get; set; }
        public DateTime date { get; set; }
        public string category { get; set; }
        public string employee_name { get; set; }
        public string employee_address { get; set; }
        public string expense_description { get; set; }
        public decimal pre_tax_amount { get; set; }
        public string tax_name { get; set; }
        public decimal tax_amount { get; set; }        
    }
}

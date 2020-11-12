using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Timelogger.Models.Entities
{
    public class Project
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string TimeSpent { get; set; }

        [Column(TypeName = "date")]
        public DateTime Deadline { get; set; }
    }
}

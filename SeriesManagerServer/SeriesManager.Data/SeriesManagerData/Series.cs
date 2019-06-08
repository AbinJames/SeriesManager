using SeriesManagerServer.Contracts.SeriesManagerData;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SeriesManagerServer.Data.SeriesManagerData
{
    public class Series : ISeries
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SeriesId { get; set; }

        public long ApiId { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string SeriesName { get; set; }
    }
}

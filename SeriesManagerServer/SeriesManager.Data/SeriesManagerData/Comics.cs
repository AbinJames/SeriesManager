using SeriesManagerServer.Contracts.SeriesManagerData;
using System.ComponentModel.DataAnnotations;

namespace SeriesManagerServer.Data.SeriesManagerData
{
    public class Comics : IComics
    {
        [Key]
        public long ComicsId { get; set; }

        [Required]
        [StringLength(60, MinimumLength = 3)]
        public string ComicsName { get; set; }
    }
}

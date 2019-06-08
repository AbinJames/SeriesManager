using Microsoft.EntityFrameworkCore;
using SeriesManagerServer.Data.SeriesManagerData;
using SeriesManagerServer.Data.Services.SeriesManagerDataContext;
using System.Collections.Generic;
using System.Linq;

namespace SeriesManagerServer.Data.Services.SeriesManagerServices
{
    public class SeriesService
    {
        private readonly SeriesManagerContext seriesManagerContext;

        /// <summary>
        /// Get application db context
        /// </summary>
        /// <param name="context">
        /// database context
        /// </param>
        public SeriesService(SeriesManagerContext context)
        {
            seriesManagerContext = context;
        }

        /// <summary>
        /// Get list of series details
        /// </summary>
        /// <returns>list of series details</returns>
        public IEnumerable<Series> GetSeries()
        {
            return seriesManagerContext.Series.OrderBy(series => series.SeriesName);
        }

        /// <summary>
        /// Adds series details to database
        /// </summary>
        /// <param name="Series">
        /// All details stored as class object
        /// </param>
        public void AddSeries(Series series)
        {
            seriesManagerContext.Series.Add(series);
            seriesManagerContext.SaveChanges();
        }

        public bool DeleteSeries(long seriesId)
        {
            var series = seriesManagerContext.Series.Where(x => x.ApiId == seriesId).FirstOrDefault();
            seriesManagerContext.Series.Remove(series);
            seriesManagerContext.SaveChanges();
            return true;
        }
    }
}

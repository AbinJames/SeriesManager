using Microsoft.AspNetCore.Mvc;
using SeriesManagerServer.Data.SeriesManagerData;
using SeriesManagerServer.Data.Services.SeriesManagerDataContext;
using SeriesManagerServer.Data.Services.SeriesManagerServices;
using System.Collections.Generic;

namespace SeriesManagerServer.API.SeriesManagerControllers
{
    /// <summary>
    /// Controller for calling series operations
    /// </summary>
    [Produces("application/json")]
    [Route("api/SeriesManagerServer/")]
    [ApiController]
    public class SeriesController : ControllerBase
    {
        private SeriesService seriesService;
        public SeriesController(SeriesManagerContext seriesManagerContext)
        {
            seriesService = new SeriesService(seriesManagerContext);
        }

        /// <summary>
        /// Add series details to database through service
        /// </summary>
        /// <param name="Series">Data from clientside</param>
        /// <returns>No content or error</returns>
        [HttpPost]
        [Route("AddSeries")]
        public IActionResult AddSeries(Series series)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            seriesService.AddSeries(series);
            return NoContent();
        }

        /// <summary>
        /// Gets list of series details from database through service
        /// </summary>
        /// <returns>List of series details</returns>
        [HttpGet]
        [Route("GetSeries")]
        public IEnumerable<Series> GetSeries()
        {
            return seriesService.GetSeries();
        }

        /// <summary>
        /// Delete series
        /// </summary>
        /// <returns>List of series details</returns>
        [HttpDelete("{seriesId}")]
        [Route("DeleteSeries/{seriesId}")]
        public IActionResult DeleteSeries(long seriesId)
        {
            var result = seriesService.DeleteSeries(seriesId);
            return Ok(true);
        }
    }
}

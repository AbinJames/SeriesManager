namespace SeriesManagerServer.Contracts.SeriesManagerData
{
    public interface ISeries
    {
        int SeriesId { get; set; }

        long ApiId { get; set; }

        string SeriesName { get; set; }
    }
}

namespace server.Models
{
    public class DrashaFilters
    {
        //public string? Commentator { get; set; }
        //public string? Topic { get; set; }
        public required string Topic { get; set; }
        public string? Parasha { get; set; }

        public required int Length { get; set; }
        public required string Style { get; set; }
    }
}

namespace QuestAnsWebServices.DTO
{
    public class CountryDTO
    {
        public int Id { get; set; }
        public string Value { get; set; }
    }

    public class CityDTO
    {
        public int Id { get; set; }
        public int CountryId { get; set; }
        public string Value { get; set; }
    }
}
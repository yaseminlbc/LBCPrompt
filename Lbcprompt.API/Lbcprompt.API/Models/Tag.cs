namespace Lbcprompt.API.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }

        // EF Core many-to-many
        public ICollection<Prompt> Prompts { get; set; } = new List<Prompt>();
    }
}

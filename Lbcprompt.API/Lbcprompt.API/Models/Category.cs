namespace Lbcprompt.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<Prompt> Prompts { get; set; } = new List<Prompt>();
    }
}

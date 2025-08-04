using System.Collections.Generic;
using Lbcprompt.API.Models;
using Microsoft.EntityFrameworkCore;
using PromptModel = Lbcprompt.API.Models.Prompt;

namespace Lbcprompt.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Prompt> Prompts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Tag> Tags { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> opts)
            : base(opts) { }

        protected override void OnModelCreating(ModelBuilder mb)
        {
            base.OnModelCreating(mb);

            // User.Email unique constraint
            mb.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Prompt → User (Author)
            mb.Entity<PromptModel>()
                .HasOne(p => p.Author)
                .WithMany(u => u.Prompts)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.NoAction);

            // Comment → Prompt (TEK CASCADE BURADA!)
            mb.Entity<Comment>()
                .HasOne(c => c.Prompt)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PromptId)
                .OnDelete(DeleteBehavior.Cascade);

            // Comment → User
            mb.Entity<Comment>()
                .HasOne(c => c.Author)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.AuthorId)
                .OnDelete(DeleteBehavior.NoAction);

            // Report → Prompt
            mb.Entity<Report>()
                .HasOne(r => r.Prompt)
                .WithMany(p => p.Reports)
                .HasForeignKey(r => r.PromptId)
                .OnDelete(DeleteBehavior.NoAction);

            // Report → User
            mb.Entity<Report>()
                .HasOne(r => r.Reporter)
                .WithMany(u => u.Reports)
                .HasForeignKey(r => r.ReporterId)
                .OnDelete(DeleteBehavior.NoAction);

            // Like → Prompt (NoAction! Asla Cascade yapma)
            mb.Entity<Like>()
                .HasOne(l => l.Prompt)
                .WithMany(p => p.Likes)
                .HasForeignKey(l => l.PromptId)
                .OnDelete(DeleteBehavior.NoAction);

            // Like → Comment (NoAction! Asla Cascade yapma)
            mb.Entity<Like>()
                .HasOne(l => l.Comment)
                .WithMany(c => c.Likes)
                .HasForeignKey(l => l.CommentId)
                .OnDelete(DeleteBehavior.NoAction);

            // Like → User
            mb.Entity<Like>()
                .HasOne(l => l.User)
                .WithMany(u => u.Likes)
                .HasForeignKey(l => l.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            // Prompt → Category (Cascade olabilir)
            mb.Entity<PromptModel>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Prompts)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Prompt ↔ Tag many-to-many (Cascade bırakılabilir)
            mb.Entity<PromptModel>()
                .HasMany(p => p.Tags)
                .WithMany(t => t.Prompts)
                .UsingEntity<Dictionary<string, object>>("PromptTags",
                    j => j
                        .HasOne<Tag>()
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade),
                    j => j
                        .HasOne<PromptModel>()
                        .WithMany()
                        .HasForeignKey("PromptId")
                        .OnDelete(DeleteBehavior.Cascade)
                );

            // Tag.Name unique
            mb.Entity<Tag>()
                .HasIndex(t => t.Name)
                .IsUnique();
        }
    }
}

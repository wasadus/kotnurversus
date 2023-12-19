﻿// <auto-generated />
using System;
using System.Collections.Generic;
using Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Models.Rounds;
using Models.Settings;
using Models.Specifications;
using Models.Teams;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Db.Migrations
{
    [DbContext(typeof(DbContext))]
    partial class DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.13")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Db.Dbo.Categories.CategoryDbo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("color");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.ToTable("categories");
                });

            modelBuilder.Entity("Db.Dbo.Challenges.ChallengeDbo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid")
                        .HasColumnName("categoryId");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<bool>("IsCatInBag")
                        .HasColumnType("boolean")
                        .HasColumnName("is_cat_in_bag");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("short_description");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.HasIndex("Title", "CategoryId")
                        .IsUnique();

                    b.ToTable("challenges");
                });

            modelBuilder.Entity("Db.Dbo.Challenges.SnapshotChallengeDbo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<Guid>("GameId")
                        .HasColumnType("uuid")
                        .HasColumnName("game_id");

                    b.Property<Guid>("RoundId")
                        .HasColumnType("uuid")
                        .HasColumnName("round_id");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid")
                        .HasColumnName("categoryId");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<bool>("IsCatInBag")
                        .HasColumnType("boolean")
                        .HasColumnName("is_cat_in_bag");

                    b.Property<int>("Order")
                        .HasColumnType("integer")
                        .HasColumnName("order");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("short_description");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id", "GameId", "RoundId");

                    b.HasIndex("Id", "GameId", "RoundId")
                        .IsUnique();

                    b.ToTable("challenges_snapshot");
                });

            modelBuilder.Entity("Db.Dbo.Games.GameDbo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<int>("Form")
                        .HasColumnType("integer")
                        .HasColumnName("form");

                    b.Property<Settings>("Settings")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("settings");

                    b.Property<List<Specification>>("Specifications")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("specifications");

                    b.Property<DateTimeOffset>("StartDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("start_date");

                    b.Property<int>("State")
                        .HasColumnType("integer")
                        .HasColumnName("state");

                    b.Property<List<Team>>("Teams")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("teams");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id");

                    b.ToTable("games");
                });

            modelBuilder.Entity("Db.Dbo.Rounds.RoundDbo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<List<Artifact>>("Artifacts")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("artifacts");

                    b.Property<string>("Description")
                        .HasColumnType("text")
                        .HasColumnName("description");

                    b.Property<Guid>("GameId")
                        .HasColumnType("uuid")
                        .HasColumnName("game_id");

                    b.Property<List<HistoryItem>>("History")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("history");

                    b.Property<Guid?>("NextRoundId")
                        .HasColumnType("uuid")
                        .HasColumnName("next_round_id");

                    b.Property<int>("Order")
                        .HasColumnType("integer")
                        .HasColumnName("order");

                    b.Property<List<Participant>>("Participants")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("participants");

                    b.Property<Settings>("Settings")
                        .IsRequired()
                        .HasColumnType("jsonb")
                        .HasColumnName("settings");

                    b.Property<Specification>("Specification")
                        .HasColumnType("jsonb")
                        .HasColumnName("specification");

                    b.HasKey("Id");

                    b.ToTable("rounds");
                });

            modelBuilder.Entity("Db.Dbo.Users.UserDbo", b =>
                {
                    b.Property<Guid>("Id")
                        .HasColumnType("uuid")
                        .HasColumnName("id");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<bool>("IsAuthorized")
                        .HasColumnType("boolean")
                        .HasColumnName("is_authorized");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password_hash");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.ToTable("users");
                });
#pragma warning restore 612, 618
        }
    }
}

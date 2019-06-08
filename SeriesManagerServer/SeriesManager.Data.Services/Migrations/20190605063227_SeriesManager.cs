using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace SeriesManagerServer.Data.Services.Migrations
{
    public partial class SeriesManager : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Comics",
                columns: table => new
                {
                    ComicsId = table.Column<long>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ComicsName = table.Column<string>(maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comics", x => x.ComicsId);
                });

            migrationBuilder.CreateTable(
                name: "Series",
                columns: table => new
                {
                    SeriesId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    ApiId = table.Column<long>(nullable: false),
                    SeriesName = table.Column<string>(maxLength: 60, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Series", x => x.SeriesId);
                });

            migrationBuilder.InsertData(
                table: "Comics",
                columns: new[] { "ComicsId", "ComicsName" },
                values: new object[,]
                {
                    { 1L, "Doomsday Clock" },
                    { 2L, "The Life of Captain Marvel" },
                    { 3L, "Tony Stark Iron Man" },
                    { 4L, "Spider-geddon" }
                });

            migrationBuilder.InsertData(
                table: "Series",
                columns: new[] { "SeriesId", "ApiId", "SeriesName" },
                values: new object[,]
                {
                    { 77, 2993L, "Stranger things" },
                    { 76, 36483L, "Star Wars Resistance" },
                    { 75, 7480L, "Star Trek Discovery" },
                    { 74, 713L, "SpongeBob SquarePants" },
                    { 73, 21928L, "Spider-Man" },
                    { 72, 143L, "Silicon Valley" },
                    { 71, 335L, "Sherlock" },
                    { 70, 2158L, "Shadowhunters" },
                    { 69, 14612L, "Santa Clarita Diet" },
                    { 68, 22188L, "Salvation" },
                    { 67, 20172L, "Runaways" },
                    { 65, 34300L, "Rise of the Teenage Mutant Ninja Turtles" },
                    { 78, 17862L, "Stretch Armstrong and the Flex Fighters" },
                    { 64, 216L, "Rick and Morty" },
                    { 63, 3144L, "Preacher" },
                    { 62, 590L, "Pokemon" },
                    { 61, 488L, "Naruto Shippuden" },
                    { 60, 1871L, "Mr Robot" },
                    { 59, 80L, "Modern Family" },
                    { 58, 417L, "MasterChef Junior" },
                    { 57, 3160L, "MasterChef Australia" },
                    { 56, 324L, "Masterchef" },
                    { 55, 2176L, "Marvels The Defenders" },
                    { 66, 5262L, "Riverdale" },
                    { 79, 1850L, "Supergirl" },
                    { 81, 33395L, "Take Two" },
                    { 54, 31365L, "Manifest" },
                    { 104, 1371L, "Westworld" },
                    { 103, 15296L, "Voltron Legendary Defender" },
                    { 102, 7523L, "Van Helsing" },
                    { 101, 38387L, "Transformers Cyberverse" },
                    { 100, 27557L, "Titans" },
                    { 99, 8873L, "Timeless " },
                    { 98, 1878L, "Thunderbirds are go" },
                    { 97, 73L, "The Walking Dead" },
                    { 96, 4296L, "The Tom and Jerry Show" },
                    { 95, 14116L, "The Tick" },
                    { 94, 32938L, "The Rookie" },
                    { 93, 28134L, "The Purge" },
                    { 92, 16544L, "The Punisher" },
                    { 91, 20263L, "The Orville" },
                    { 90, 35839L, "The Neighborhood" },
                    { 89, 17078L, "The Grand Tour" },
                    { 88, 25948L, "The Gifted" },
                    { 87, 13L, "The Flash" },
                    { 86, 36449L, "The Epic Tales of Captain Underpants" },
                    { 85, 37675L, "The Dragon Prince" },
                    { 84, 66L, "The Big Bang Theory" },
                    { 83, 34017L, "The Adventures of Kid Danger" },
                    { 82, 6L, "The 100" },
                    { 80, 19L, "Supernatural" },
                    { 53, 12888L, "Man with a plan" },
                    { 51, 5511L, "MacGyver" },
                    { 105, 689L, "Young Justice" },
                    { 23, 210L, "Doctor Who" },
                    { 22, 1851L, "Dcs Legends of Tomorrow" },
                    { 21, 1369L, "Daredevil" },
                    { 20, 15L, "Constantine" },
                    { 19, 25110L, "Condor" },
                    { 18, 15307L, "Cloak and Dagger" },
                    { 17, 25242L, "Castlevania" },
                    { 16, 25414L, "Castle Rock" },
                    { 15, 49L, "Brooklyn Nine-Nine" },
                    { 14, 1855L, "Blindspot" },
                    { 13, 57L, "Blackish" },
                    { 12, 20683L, "Black Lightning" },
                    { 11, 21142L, "Big Hero 6 The Series" },
                    { 10, 22084L, "Ben 10" },
                    { 9, 2540L, "Avengers Assemble" },
                    { 8, 919L, "Attack on Titan" },
                    { 7, 4L, "Arrow" },
                    { 6, 3182L, "American Gods" },
                    { 5, 12036L, "Altered Carbon" },
                    { 4, 31L, "Agents of S.H.I.E.L.D." },
                    { 3, 3949L, "A series of unfortunate events" },
                    { 2, 31339L, "A Discovery of Witches" },
                    { 1, 7194L, "13 Reasons Why" },
                    { 24, 2368L, "Dragon Ball Super" },
                    { 52, 32819L, "Magnum P I" },
                    { 25, 133L, "Elementary" },
                    { 27, 23314L, "Final Space" },
                    { 50, 2174L, "Luke Cage" },
                    { 49, 1859L, "Lucifer" },
                    { 48, 8898L, "Lost in Space" },
                    { 47, 5495L, "Lethal Weapon" },
                    { 46, 6393L, "Legion" },
                    { 45, 41L, "Last Man Standing" },
                    { 44, 3082L, "Krypton" },
                    { 43, 11918L, "Kong King of the Apes" },
                    { 42, 12522L, "Justice League Action" },
                    { 41, 1370L, "Jessica Jones" },
                    { 40, 1589L, "iZombie" },
                    { 39, 2175L, "Iron Fist" },
                    { 38, 2300L, "Into The Badlands" },
                    { 37, 7L, "Homeland" },
                    { 36, 36768L, "Happy Together" },
                    { 35, 21216L, "Happy" },
                    { 34, 2476L, "Guardians of the Galaxy" },
                    { 33, 28366L, "Grown-ish" },
                    { 32, 11L, "Gotham" },
                    { 31, 31257L, "God Friended Me" },
                    { 30, 82L, "Game of Thrones" },
                    { 29, 3022L, "Future Man" },
                    { 28, 20003L, "Freedom Fighters The Ray" },
                    { 26, 1824L, "Fear The Walking Dead" },
                    { 106, 26020L, "Young Sheldon" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comics");

            migrationBuilder.DropTable(
                name: "Series");
        }
    }
}

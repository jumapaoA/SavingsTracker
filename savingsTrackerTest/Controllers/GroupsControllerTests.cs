using System.Net;
using System.Net.Http;
using Xunit.Abstractions;

namespace savingsTacker.Controllers
{
    public class GroupsControllerTests
    {
        private readonly ITestOutputHelper output;

        public GroupsControllerTests(ITestOutputHelper output)
        {
            this.output = output;
        }
        [Theory]
        [InlineData("https://localhost:44448/groups")]
        [InlineData("https://localhost:44448/groups/1")]
        [InlineData("https://localhost:44448/groups/members/1")]
        [InlineData("https://localhost:44448/groups/user/existing_user_id")]
        [InlineData("https://localhost:44448/groups/admin/existing_user_id")]
        [InlineData("https://localhost:44448/groups/savings/1")]
        [InlineData("https://localhost:44448/groups/saving/1")]
        [InlineData("https://localhost:44448/groups/create")]
        [InlineData("https://localhost:44448/groups/add-member/1")]
        [InlineData("https://localhost:44448/groups/add-saving/1")]
        [InlineData("https://localhost:44448/groups/update/1")]
        [InlineData("https://localhost:44448/groups/update-admin/1")]
        [InlineData("https://localhost:44448/groups/member-status/1")]
        [InlineData("https://localhost:44448/groups/update-saving/1")]
        public async Task GroupsURLTestConnection(string url)
        {
            var fakeHandler = new FakeHttpMessageHandler();
            var httpClient = new HttpClient(fakeHandler);

            // Act
            HttpResponseMessage response = await httpClient.GetAsync(url);

            // Assert
            output.WriteLine(response.ToString());
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

    }
}

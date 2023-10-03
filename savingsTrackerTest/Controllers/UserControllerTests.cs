using System.Net;
using System.Net.Http;

namespace savingsTacker.Controllers
{
    public class UserControllerTests
    {
        [Theory]
        [InlineData("https://localhost:44448/user")]
        [InlineData("https://localhost:44448/user/existing_user_id")]
        [InlineData("https://localhost:44448/user/user-saving/1")]
        [InlineData("https://localhost:44448/user/group-members/1")]
        [InlineData("https://localhost:44448/user/group-admin/1")]
        [InlineData("https://localhost:44448/user/upload/profile-picture/existing_user_id")]
        [InlineData("https://localhost:44448/user/update-profile/existing_user_id")]
        [InlineData("https://localhost:44448/user/update-status/existing_user_id")]
        public async Task UsersURLTestConnection(string url)
        {
            var fakeHandler = new FakeHttpMessageHandler();
            var httpClient = new HttpClient(fakeHandler);

            // Act
            HttpResponseMessage response = await httpClient.GetAsync(url);

            // Assert
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        }

    }
}

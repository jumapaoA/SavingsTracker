using System.Net;
using System.Net.Http;

namespace savingsTacker.Controllers
{
    public class SavingsControllerTests
    {
        [Theory]
        [InlineData("https://localhost:44448/savings")]
        [InlineData("https://localhost:44448/savings/user/existing_user_id")]
        [InlineData("https://localhost:44448/savings/1")]
        [InlineData("https://localhost:44448/savings/group/1")]
        [InlineData("https://localhost:44448/savings/group-savings/existing_user_id")]
        [InlineData("https://localhost:44448/savings/create")]
        [InlineData("https://localhost:44448/savings/update/1")]
        public async Task SavingsURLTestConnection(string url)
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

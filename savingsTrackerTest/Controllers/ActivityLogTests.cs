using System.Net;
using System.Net.Http;

namespace savingsTacker.Controllers
{
    public class ActivityLogTests
    {
        [Theory]
        [InlineData("https://localhost:44448/activity/existing_user_id")]
        public async Task ActivityLogURLTestConnection(string url)
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

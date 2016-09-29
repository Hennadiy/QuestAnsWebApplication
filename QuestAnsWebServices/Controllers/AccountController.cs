using QuestAnsWebServices.DTO;
using QuestAnsWebServices.Extensions;
using QuestAnsWebServices.Models;
using QuestAnsWebServices.Repositories;
using System;
using System.Diagnostics.Contracts;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace QuestAnsWebServices.Controllers
{
    [Authorize]
    public class AccountController : ApiControllerExtended
    {
        private readonly IUserRepository _userRepository;

        public AccountController(IUserRepository userRepository)
        {
            Contract.Requires<ArgumentNullException>(userRepository != null);

            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetCurrentUser()
        {
            var userId = GetCurrentUserId();

            var user = await _userRepository.GetUserById(userId);

            return Ok(user);
        }

        [HttpPost]
        public async Task<IHttpActionResult> UpdateCurrentUser(UserUpdateDTO userUpdateDTO)
        {
            Contract.Requires<ArgumentNullException>(userUpdateDTO != null);

            var userId = GetCurrentUserId();

            var user = await _userRepository.UpdateCurrentUser(userId, userUpdateDTO);

            return Ok(user);
        }

        [HttpPost]
        public IHttpActionResult UploadPhoto(Image image)
        {
            Contract.Requires<ArgumentNullException>(image != null);

            var userId = GetCurrentUserId();
            var baseUri = Request.RequestUri.AbsoluteUri.Replace(Request.RequestUri.AbsolutePath, string.Empty);
            var path = _userRepository.UploadPhoto(image, userId, baseUri);

            return Ok(path);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUser(string userName)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userName));

            var user = await _userRepository.GetUser(userName);

            return Ok(user);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IHttpActionResult> Register(UserRegisterDTO userDTO)
        {
            Contract.Requires<ArgumentNullException>(userDTO != null);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userRepository.Register(userDTO);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }

        [HttpPost]
        public IHttpActionResult Signout()
        {
            _userRepository.Signout();
            return Ok();
        }

        [HttpPost]
        public async Task<IHttpActionResult> ChangePasswordForCurrentUser(UserChangePasswordDTO userDTO)
        {
            Contract.Requires<ArgumentNullException>(userDTO != null);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userId = GetCurrentUserId();

            var result = await _userRepository.ChangePasswordForCurrentUser(userId, userDTO);

            if (!result.Succeeded)
            {
                return GetErrorResult(result);
            }

            return Ok();
        }
    }
}

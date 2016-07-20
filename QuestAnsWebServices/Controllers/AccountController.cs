using System;
using System.Diagnostics.Contracts;
using System.Threading.Tasks;
using System.Web.Http;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.Extensions;
using QuestAnsWebServices.Repositories;

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
        public UserDTO GetCurrentUser()
        {
            var userId = GetCurrentUserId();

            return _userRepository.GetUserById(userId);
        }

        [HttpGet]
        public async Task<UserDTO> GetUser(string userName)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userName));

            return await _userRepository.GetUser(userName);
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

using System;
using System.Diagnostics.Contracts;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using QuestAnsWebServices.App_Start;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.EF.User;

namespace QuestAnsWebServices.Repositories
{
    public interface IUserRepository
    {
        UserDTO GetUserById(string userId);
        Task<UserDTO> GetUser(string userName);
        Task<IdentityResult> Register(UserRegisterDTO userDTO);
        Task<IdentityResult> ChangePasswordForCurrentUser(string userId, UserChangePasswordDTO model);
        void Signout();
    }

    public class UserRepository : IUserRepository
    {
        private readonly ApplicationUserManager _userManager;
        private readonly IAuthenticationManager _authManager;

        public UserRepository(ApplicationUserManager userManager, IAuthenticationManager authManager)
        {
            Contract.Requires<ArgumentNullException>(userManager != null);
            Contract.Requires<ArgumentNullException>(authManager != null);

            _userManager = userManager;
            _authManager = authManager;
        }

        public UserDTO GetUserById(string userId)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userId));

            var user = _userManager.FindById(userId);

            return Mapper.Map<UserDTO>(user);
        }

        public async Task<UserDTO> GetUser(string userName)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userName));

            var user = await _userManager.FindByNameAsync(userName);

            return Mapper.Map<UserDTO>(user);
        }

        public async Task<IdentityResult> Register(UserRegisterDTO userDTO)
        {
            Contract.Requires<ArgumentNullException>(userDTO != null);

            var user = Mapper.Map<ApplicationUser>(userDTO);

            user.RegistrationDate = DateTime.Now;

            return await _userManager.CreateAsync(user, userDTO.Password);
        }

        public async Task<IdentityResult> ChangePasswordForCurrentUser(string userId, UserChangePasswordDTO userDTO)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userId));
            Contract.Requires<ArgumentNullException>(userDTO != null);

            return await _userManager.ChangePasswordAsync(userId, userDTO.OldPassword, userDTO.NewPassword);
        }

        public void Signout()
        {
            _authManager.SignOut(CookieAuthenticationDefaults.AuthenticationType);
        }
    }
}

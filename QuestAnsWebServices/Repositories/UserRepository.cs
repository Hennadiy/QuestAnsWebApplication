using AutoMapper;
using ImageResizer;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using QuestAnsWebServices.App_Start;
using QuestAnsWebServices.DTO;
using QuestAnsWebServices.EF.User;
using QuestAnsWebServices.Helpers;
using QuestAnsWebServices.Models;
using System;
using System.Diagnostics.Contracts;
using System.IO;
using System.Threading.Tasks;

namespace QuestAnsWebServices.Repositories
{
    public interface IUserRepository
    {
        Task<UserDTO> GetUserById(string userId);
        Task<UserDTO> GetUser(string userName);
        Task<IdentityResult> Register(UserRegisterDTO userDTO);
        Task<UserDTO> UpdateCurrentUser(string userId, UserUpdateDTO userDTO);
        Task<IdentityResult> ChangePasswordForCurrentUser(string userId, UserChangePasswordDTO model);
        string UploadPhoto(Image image, string userId, string baseUri);
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

        public async Task<UserDTO> GetUserById(string userId)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userId));

            var user = await GetUserByIdInternal(userId);

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

        public async Task<UserDTO> UpdateCurrentUser(string userId, UserUpdateDTO userDTO)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userId));
            Contract.Requires<ArgumentNullException>(userDTO != null);

            var user = await GetUserByIdInternal(userId);

            Mapper.Map(userDTO, user);

            await _userManager.UpdateAsync(user);

            return await GetUserById(userId);
        }

        private async Task<ApplicationUser> GetUserByIdInternal(string userId)
        {
            Contract.Requires<ArgumentNullException>(!string.IsNullOrEmpty(userId));

            return await _userManager.FindByIdAsync(userId);
        }

        public string UploadPhoto(Image image, string userId, string baseUri)
        {
            var imgFolder = "/Content/UserImages";
            var ext = Path.GetExtension(image.Name);
            var path = AppDomain.CurrentDomain.BaseDirectory + imgFolder;
            var tmpPath = Path.GetTempFileName() + ext;

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            FileHelper.CreateFile(tmpPath, image.Content);

            var fileName = userId + ext;
            var fullPath = Path.Combine(path, fileName);
            var fullPathMobile = Path.Combine(path, userId + "_mob" + ext);

            FileHelper.BuildImageJob(tmpPath, fullPath, new Instructions("width=460;height=102;format=png;mode=pad"));
            FileHelper.BuildImageJob(tmpPath, fullPathMobile, new Instructions("width=190;height=44;format=png;mode=pad"));

            File.Delete(tmpPath);

            return baseUri + imgFolder + "/" + fileName;
        }
    }
}

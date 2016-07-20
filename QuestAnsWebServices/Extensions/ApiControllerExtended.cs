using System;
using System.Diagnostics.Contracts;
using System.Web.Http;
using Microsoft.AspNet.Identity;

namespace QuestAnsWebServices.Extensions
{
    public class ApiControllerExtended : ApiController
    {
        protected IHttpActionResult GetErrorResult(IdentityResult result)
        {
            Contract.Requires<ArgumentNullException>(result != null);

            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected string GetCurrentUserId()
        {
            return User.Identity.GetUserId();
        }
    }
}
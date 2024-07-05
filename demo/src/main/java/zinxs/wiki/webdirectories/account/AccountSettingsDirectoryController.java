package zinxs.wiki.webdirectories.account;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;

@AllArgsConstructor
@RestController
@RequestMapping(path = "accountsettings")
public class AccountSettingsDirectoryController {
    @Autowired
    private AuthTokenUtils authTokenUtils;
    @CrossOrigin
    @GetMapping
    public ModelAndView getAccountSettingsPage(@CookieValue(value = "token", defaultValue = "none") String token){
        ModelAndView modelAndView = new ModelAndView();
        if(token.equals("none")){
            // System.out.println("Token was None");
            modelAndView.setViewName("homepage-logged-out.html");
        }else{
            try {
                if (authTokenUtils.isExpired(token)) {
                    // System.out.println("token was expired");
                    modelAndView.setViewName("homepage-logged-out.html");
                } else {
                    // System.out.println("token was valid");
                    modelAndView.setViewName("account-profile.html");
                }
            }catch (Exception e){
                //   System.out.println("token process gave error :" + e);
                modelAndView.setViewName("homepage-logged-out.html");
            }
        }
        return modelAndView;
    }
}

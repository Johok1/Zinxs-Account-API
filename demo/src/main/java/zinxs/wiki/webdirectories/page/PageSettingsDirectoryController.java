package zinxs.wiki.webdirectories.page;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;

@AllArgsConstructor
@RestController
@RequestMapping(path = "pagesettings")
public class PageSettingsDirectoryController {

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @CrossOrigin
    @GetMapping
    public ModelAndView getPageSettingsPage(@CookieValue(value = "token", defaultValue = "none") String token){
        ModelAndView modelAndView = new ModelAndView();
        if(token.equals("none")){
            // System.out.println("Token was None");
            modelAndView.setViewName("auth-login-social.html");
        }else{
            try {
                if (authTokenUtils.isExpired(token)) {
                    //   System.out.println("token was expired");
                    modelAndView.setViewName("auth-login-social.html");
                } else {
                    //  System.out.println("token was valid");
                    modelAndView.setViewName("page-settings.html");
                }
            }catch (Exception e){
                //  System.out.println("token process gave error :" + e);
                modelAndView.setViewName("auth-login-social.html");
            }
        }

        return modelAndView;
    }


}

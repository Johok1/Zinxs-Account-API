package zinxs.wiki.webdirectories.passwordreset;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRepository;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;

@AllArgsConstructor
@RestController
@RequestMapping("/resetpassword")
public class ResetPasswordDirectoryController {

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @Autowired
    private AccountRepository accountRepository;


    @CrossOrigin
    @GetMapping
    public ModelAndView getPasswordResetPage(@CookieValue(value = "token", defaultValue = "none") String token){
        ModelAndView modelAndView = new ModelAndView();
        System.out.println("token " + token);
        if(token.equals("none")){
            // System.out.println("Token was None");
            modelAndView.setViewName("auth-password-social.html");
        }else{
            try {
                if (authTokenUtils.isExpired(token)) {
                    //   System.out.println("token was expired");
                    modelAndView.setViewName("auth-password-social.html");
                } else {
                    //  System.out.println("token was valid");
                    modelAndView.setViewName("auth-reset-password.html");
                }
            }catch (Exception e){
                //  System.out.println("token process gave error :" + e);
                modelAndView.setViewName("auth-password-social.html");
            }
        }

        return modelAndView;
    }
    private Account getAccount(String tempToken){
        try{
            String decodedToken = authTokenUtils.decodeEmail(tempToken);
            Account targetAccount = accountRepository.findByEmail(decodedToken).get();
            if(targetAccount.isEnabled()){
                return targetAccount;
            }else{
                throw new RuntimeException("Account " + decodedToken + " is disabled!");
            }
        }catch (Exception e){
            throw new RuntimeException("getAccount error " + e);
        }
    }
}

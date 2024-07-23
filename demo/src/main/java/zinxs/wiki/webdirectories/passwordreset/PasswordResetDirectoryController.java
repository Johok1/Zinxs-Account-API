package zinxs.wiki.webdirectories.passwordreset;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRepository;
import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@AllArgsConstructor
@RestController
@RequestMapping("/passwordreset")
public class PasswordResetDirectoryController {

    @Autowired
    private AuthTokenUtils authTokenUtils;

    @Autowired
    private AccountRepository accountRepository;

    @CrossOrigin
    @GetMapping("/request")
    public ModelAndView resetPasswordWithToken(@RequestParam("token") String token, HttpServletResponse response){
        ModelAndView modelAndView = new ModelAndView();
        System.out.println("request endpoint token " + token + "\n"+"\n");
        try {
            Account account = getAccount(token);
            System.out.println( "account:" + account.getEmail() + " " + account.isEnabled());
            if (account.isEnabled()) {
                Cookie cookie = new Cookie("token", token);
                cookie.setPath("/");
                response.addCookie(cookie);
                modelAndView.setViewName("redirect:/resetpassword");
            }else{
                modelAndView.setViewName("redirect:/login");
            }
            System.out.println(modelAndView.toString());
        }catch (Exception e){
            modelAndView.setViewName("redirect:/login");
            System.out.println( "request error: " + e.getMessage());
            return modelAndView;

        }

        System.out.println(modelAndView.toString());

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
    @CrossOrigin
    @GetMapping
    public ModelAndView getPasswordResetPage(@CookieValue(value = "token", defaultValue = "none") String token){
        ModelAndView modelAndView = new ModelAndView();
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
                    modelAndView.setViewName("auth-password-social.html");
                }
            }catch (Exception e){
                //  System.out.println("token process gave error :" + e);
                modelAndView.setViewName("auth-password-social.html");
            }
        }

        return modelAndView;
    }
}

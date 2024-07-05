package zinxs.wiki.validationapi;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import zinxs.wiki.jsonobjects.GoogleRegistrationRequest;
import zinxs.wiki.jsonobjects.LoginRequest;
import zinxs.wiki.jsonobjects.RegistrationRequest;

@RestController
@RequestMapping(path = "api/v1/validation")
@AllArgsConstructor
public class ValidationController {
    //contains endpoints for registering and validating users


    private final ValidationService validationService;



    @CrossOrigin
    @GetMapping("/isAdmin/{token}")
    public String isAdmin(@PathVariable String token){
        return validationService.isAdmin(token);
    }

    @CrossOrigin
    @PostMapping("/static/login")
    public String login(@RequestBody LoginRequest loginRequest) throws Exception {

        return validationService.login(loginRequest);
    }

    @CrossOrigin
    @PostMapping("/googleLogin/{idToken}")
    public String googleLogin(@PathVariable String idToken){
        return validationService.googleLogin(idToken);
    }

    @CrossOrigin
    @PostMapping("/googleRegister")
    public String googleRegister(@RequestBody GoogleRegistrationRequest request){
        return validationService.googleRegister(request);
    }
    @CrossOrigin
    @GetMapping("/checkHomepagePin/{pin}")
    public String checkHomepagePin(@PathVariable String pin){
        if(pin.equals("G-9i")) {
            return "true";
        }else {
            return "false";
        }
    }

    @CrossOrigin
    @PostMapping("/register")
    public String register(@RequestBody RegistrationRequest request) {

        return validationService.register(request);
    }

    @CrossOrigin
    @PostMapping("resetPassword/{email}")
    public String resetPassword(@PathVariable String email){
        return validationService.resetPassword(email);
    }

    @CrossOrigin
    @GetMapping(path = "confirm")
    public ModelAndView confirm(@RequestParam("token") String token) {
        return validationService.confirmToken(token);
    }




    /* not sure that this method is really necessary since the validity of the token should be checked at
       every endpoint that attempts to use it to get data associated with a user, however it might be useful
       if we wanted to create logic that periodically checks their temptoken just to automatically log them out
       without them having to realize it after trying to access something
    public boolean validateToken(@PathVariable String tempToken){
        //this will call service layer to check if the temptoken is expired
        return false;
    }
    */

}

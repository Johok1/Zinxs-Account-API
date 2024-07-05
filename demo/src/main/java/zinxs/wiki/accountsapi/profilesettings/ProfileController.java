package zinxs.wiki.accountsapi.profilesettings;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.jsonobjects.AccountPageHeaderResponse;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/profile")
@AllArgsConstructor
public class ProfileController {

    private final ProfileService profileService;

    @CrossOrigin
    @PostMapping("/setProfileImage/{token}")
    public String setProfileImage(@PathVariable String token,@RequestParam("file")MultipartFile image){
        System.out.println("ProfileController setProfileImage posted " + image.getOriginalFilename());
        return profileService.setProfileImage(token, image);
    }

    @CrossOrigin
    @GetMapping(value = "/getProfileImage/{token}",
                produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getProfileImage(@PathVariable String token){
        return profileService.getProfileImage(token);
    }

    @CrossOrigin
    @GetMapping("/getUsername/{token}")
    public String getUsername(@PathVariable String token) {
        return profileService.getProfileUsername(token);
    }

    @CrossOrigin
    @GetMapping("/setUsername/{token}/{username}")
    public String setUsername(@PathVariable String token, @PathVariable String username){
        return profileService.setProfileUsername(token,username);
    }

    @CrossOrigin
    @GetMapping("/getNickname/{token}")
    public String getNickname(@PathVariable String token){
        return profileService.getProfileNickname(token);
    }

    @CrossOrigin
    @GetMapping("/setNickname/{token}/{nickname}")
    public String setNickname(@PathVariable String token, @PathVariable String nickname){
        return profileService.setProfileNickname(token, nickname);
    }

    @CrossOrigin
    @GetMapping("/setEmail/{token}/{email}")
    public String setEmail(@PathVariable String token, @PathVariable String email){
        return profileService.setProfileEmail(token, email);
    }

    @CrossOrigin
    @GetMapping("/getEmail/{token}")
    public String getEmail(@PathVariable String token){
        return profileService.getProfileEmail(token);
    }

    @CrossOrigin
    @GetMapping("/setPassword/{token}/{password}")
    public String setPassword(@PathVariable String token, @PathVariable String password){
        return profileService.setProfilePassword(token,password);
    }


    @CrossOrigin
    @GetMapping("getAccountPageHeaders/{token}")
    public List<AccountPageHeaderResponse> getAccountPageHeaders(@PathVariable String token){
        return profileService.getAccountPageHeaders(token);
    }

    @CrossOrigin
    @GetMapping( value ="getAccountPageLogo/{token}/{pageId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody Resource getAccountPageLogo(@PathVariable String token, @PathVariable String pageId){
        return profileService.getAccountPageLogo(token, pageId);
    }


}

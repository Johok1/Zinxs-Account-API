package zinxs.wiki.accountsapi.profilesettings;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import zinxs.wiki.accountsapi.Account;
import zinxs.wiki.accountsapi.AccountRepository;

import zinxs.wiki.accountsapi.utilities.AuthTokenUtils;
import zinxs.wiki.restobjects.response.AccountPageHeaderResponse;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProfileService {


    private final AccountRepository accountRepository;

    private final AuthTokenUtils authTokenUtils;

    private Account getAccount(String tempToken){
        String email = authTokenUtils.decodeEmail(tempToken);
        System.out.println("ProfileService getAccount email " + email);
        Optional<Account> account = accountRepository.findByEmail(email);
        boolean accountExists = account.isPresent();
        if(accountExists){
            return  account.get();
        }else {
            throw new RuntimeException("accessing profile service with account that is not present in the database");
        }
    }




    public List<AccountPageHeaderResponse> getAccountPageHeaders(String token){
        try{
            Account account = getAccount(token);
            List<AccountPageHeaderResponse> pageHeaders = new ArrayList<>();
            List<AccountPageHeaderResponse> pages = account.getPages();
            for(AccountPageHeaderResponse page: pages){
                AccountPageHeaderResponse response = new AccountPageHeaderResponse(
                        String.valueOf(page.getPageId()),
                        page.getPageName()
                );
                pageHeaders.add(response);
            }
            return pageHeaders;
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public String setProfileImage(String tempToken, MultipartFile image){
        try {
            Account account = getAccount(tempToken);
            account.setProfileImage(image.getBytes());
            accountRepository.save(account);
            return "true";
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] getProfileImage(String tempToken){
        Account account = getAccount(tempToken);
        return account.getProfileImage();
    }


    public String getProfileUsername(String tempToken){
        Account account = getAccount(tempToken);
        return account.getUsername();
    }

    public String setProfileUsername(String tempToken, String username){
        Account account = getAccount(tempToken);
        account.setUsername(username);
        accountRepository.save(account);
        return account.getUsername();
    }

    public String getProfileEmail(String tempToken){
        Account account = getAccount(tempToken);
        return account.getEmail();
    }

    public String setProfileEmail(String tempToken, String email){
        Account account = getAccount(tempToken);
        if(email.contains("@")) {
            account.setEmail(email);
            accountRepository.save(account);
            return account.getEmail();
        }else{
            return "Invalid Email";
        }
    }

    public String setProfilePassword(String tempToken, String newPassword){
        try {
            Account account = getAccount(tempToken);
            account.setPassword(authTokenUtils.bCryptPasswordEncoder.encode(newPassword));
            accountRepository.save(account);
            return "true";
        }catch (Exception e){
            return e.getMessage();
        }
    }

    public String getProfileNickname(String tempToken){
        Account account = getAccount(tempToken);
        return account.getNickname();
    }

    public String setProfileNickname(String tempToken, String nickname){
        Account account = getAccount(tempToken);
        account.setNickname(nickname);
        accountRepository.save(account);
        return account.getNickname();
    }

    public String addProfilePage(String token, AccountPageHeaderResponse headerResponse){
        Account account = getAccount(token);
        ArrayList<AccountPageHeaderResponse> pages = account.getPages();
        pages.add(headerResponse);
        account.setPages(pages);
        accountRepository.save(account);
        return "true";
    }





}

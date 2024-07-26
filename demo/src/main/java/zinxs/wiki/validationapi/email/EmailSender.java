package zinxs.wiki.validationapi.email;

public interface EmailSender {

    void sendResetEmail(String email, String name, String link);
    void sendSignUpEmail(String email, String name, String link);
}

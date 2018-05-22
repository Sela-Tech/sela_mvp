package com.sela.app.mvp;

import android.widget.EditText;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AuthUtil {
    /**
     * A dummy authentication store containing known user names and passwords.
     * TODO: remove after connecting to a real authentication system.
     */
    public static final String UserPrefs = "UserPrefs";
    public static final String LoggedIn = "LoggedIn";
    public static final String FriendbotURLFormat = "https://friendbot.stellar.org/?addr=%s";
    public static final String RegisterURI = "https://sela-labs.herokuapp.com/register";
    public static final String LoginURI = "https://sela-labs.herokuapp.com/login";
    public static final String FirstNameQueryField = "first_name";
    public static final String FamilyNameQueryField = "family_name";
    public static final String UserNameQueryField = "username";
    public static final String PublicKeyQueryField = "public_key";
    public static final String PasswordQueryField = "password";
    public static final String SuccessStr = "success";
    public static final String MessageStr = "message";
    public static List<String> SampleCredentials = new ArrayList<String>(Arrays.asList("user1:publickey1:password1", "user2:publickey2:password2", "user3:publickey3:password3"));

    public static void clearTextFields(EditText... textFields) {
        for (EditText textField : textFields) {
            textField.setText("");
        }
    }
}

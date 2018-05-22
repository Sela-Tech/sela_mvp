package com.sela.app.mvp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SharedPreferences userPrefs = getSharedPreferences(AuthUtil.UserPrefs, MODE_PRIVATE);
        boolean loggedIn = userPrefs.getBoolean(AuthUtil.LoggedIn, false);
        // close splash activity
        finish();
        if (loggedIn) {
            // Start home activity
            startActivity(new Intent(SplashActivity.this, MainActivity.class));
        } else {
            // Start login/signup activity
            startActivity(new Intent(SplashActivity.this, LoginRegisterActivity.class));
        }
    }
}

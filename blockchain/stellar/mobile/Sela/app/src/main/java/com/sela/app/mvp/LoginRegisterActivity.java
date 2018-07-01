package com.sela.app.mvp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class LoginRegisterActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login_register);

        Button loginButton = (Button) findViewById(R.id.login_nav_button);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View loginButtonView) {
                // Start login activity
                startActivity(new Intent(LoginRegisterActivity.this, LoginActivity.class));
                // close login/signup activity
                finish();
            }
        });

        Button signupButton = (Button) findViewById(R.id.register_nav_button);
        signupButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View signupButton) {
                // Start login activity
                startActivity(new Intent(LoginRegisterActivity.this, RegisterActivity.class));
                // close login/signup activity
                finish();
            }
        });
    }
}

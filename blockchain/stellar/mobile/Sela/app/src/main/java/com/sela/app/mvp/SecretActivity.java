package com.sela.app.mvp;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class SecretActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_secret);

        // Get intent that started this activity and extract message
        Intent intent = getIntent();
        String secret = intent.getStringExtra(IntentExtras.SECRET);

        // Capture layout's TextView and set message as its text
        TextView textView = findViewById(R.id.display_secret);
        textView.setText(secret);

        Button loginButton = (Button) findViewById(R.id.continue_button);
        loginButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                SharedPreferences userPrefs = getSharedPreferences(AuthUtil.UserPrefs, MODE_PRIVATE);
                SharedPreferences.Editor userPrefsEditor = userPrefs.edit();
                userPrefsEditor.putBoolean(AuthUtil.LoggedIn, true);
                userPrefsEditor.apply();
                startActivity(new Intent(SecretActivity.this, MainActivity.class));;
            }
        });
    }
}

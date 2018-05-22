package com.sela.app.mvp;

import android.content.Intent;
import android.support.v4.app.DialogFragment;
import android.support.v4.app.NavUtils;
import android.support.v7.app.ActionBar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;

public class ProjectCreateActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_project_create);
        ActionBar actionBar = getSupportActionBar();
        if (actionBar != null){
            actionBar.setDisplayHomeAsUpEnabled(true);
            actionBar.setHomeButtonEnabled(true);
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        switch (id) {
            case android.R.id.home:
                Intent intent = NavUtils.getParentActivityIntent(this);
                intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                NavUtils.navigateUpTo(this, intent);
                return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public void createProject(View button) {
        EditText projectNameField = (EditText) button.findViewById(R.id.project_name_text);
        EditText projectDescField = (EditText) button.findViewById(R.id.project_desc_text);
        EditText projectStartField = (EditText) button.findViewById(R.id.project_start_date);
        EditText projectEndField = (EditText) button.findViewById(R.id.project_end_date);
        EditText projectCapField = (EditText) button.findViewById(R.id.project_capital);
        EditText projectQuoteField = (EditText) button.findViewById(R.id.project_quote);

        String projectName = projectNameField.getText().toString();
        String projectDesc = projectDescField.getText().toString();
        String projectStart = projectStartField.getText().toString();
        String projectEnd = projectEndField.getText().toString();
        String projectCap = projectCapField.getText().toString();
        String projectQuote = projectQuoteField.getText().toString();
    }

    public void showProjectDatePicker(View v) {
        DialogFragment newFragment = new ProjectDatePicker();
        newFragment.show(getSupportFragmentManager(), "datePicker");
    }
}

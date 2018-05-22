package com.sela.app.mvp;

import android.animation.Animator;
import android.animation.AnimatorListenerAdapter;
import android.annotation.TargetApi;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.app.LoaderManager.LoaderCallbacks;

import android.content.CursorLoader;
import android.content.Loader;
import android.database.Cursor;
import android.net.Uri;
import android.os.AsyncTask;

import android.os.Build;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.text.TextUtils;
import android.view.KeyEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;
import org.stellar.sdk.KeyPair;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import static android.Manifest.permission.READ_CONTACTS;

/**
 * A register screen that offers registration via usenrame/public key/password.
 */
public class RegisterActivity extends AppCompatActivity implements LoaderCallbacks<Cursor> {

    /**
     * Id to identity READ_CONTACTS permission request.
     */
    private static final int REQUEST_READ_CONTACTS = 0;

    /**
     * Keep track of the register task to ensure we can cancel it if requested.
     */
    private UserRegisterTask mAuthTask = null;

    // UI references.
//    private AutoCompleteTextView mEmailView;
    private EditText mFirstnameView;
    private EditText mFamilynameView;
    private EditText mUsernameView;
//    private EditText mPublickeyView;
    private EditText mPasswordView;
    private EditText mPasswordConfView;
    private View mProgressView;
    private View mRegisterFormView;

    // Current error message
    private String errorMessage = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        // Set up the registration form.
//        mEmailView = (AutoCompleteTextView) findViewById(R.id.email);
//        populateAutoComplete();

        mFirstnameView = (EditText) findViewById(R.id.firstname_register);
        mFamilynameView = (EditText) findViewById(R.id.familyname_register);
        mUsernameView = (EditText) findViewById(R.id.username_register);
//        mPublickeyView = (EditText) findViewById(R.id.publickey);
        mPasswordView = (EditText) findViewById(R.id.password_register);
        mPasswordConfView = (EditText) findViewById(R.id.password_confirmation);
        mPasswordConfView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
            @Override
            public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
                if (id == EditorInfo.IME_ACTION_DONE || id == EditorInfo.IME_NULL) {
                    attemptRegister();
                    return true;
                }
                return false;
            }
        });

        Button registerButton = (Button) findViewById(R.id.register_button);
        registerButton.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptRegister();
            }
        });

        TextView loginRedirect = (TextView) findViewById(R.id.redirect_login);
        loginRedirect.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                // Start login activity
                startActivity(new Intent(RegisterActivity.this, LoginActivity.class));
                // close register activity
                finish();
            }
        });

        mRegisterFormView = findViewById(R.id.register_form);
        mProgressView = findViewById(R.id.register_progress);
    }

    private void populateAutoComplete() {
        if (!mayRequestContacts()) {
            return;
        }

        getLoaderManager().initLoader(0, null, this);
    }

    private boolean mayRequestContacts() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            return true;
        }
        if (checkSelfPermission(READ_CONTACTS) == PackageManager.PERMISSION_GRANTED) {
            return true;
        }
        if (shouldShowRequestPermissionRationale(READ_CONTACTS)) {
//            Snackbar.make(mEmailView, R.string.permission_rationale, Snackbar.LENGTH_INDEFINITE)
//                    .setAction(android.R.string.ok, new View.OnClickListener() {
//                        @Override
//                        @TargetApi(Build.VERSION_CODES.M)
//                        public void onClick(View v) {
//                            requestPermissions(new String[]{READ_CONTACTS}, REQUEST_READ_CONTACTS);
//                        }
//                    });
        } else {
            requestPermissions(new String[]{READ_CONTACTS}, REQUEST_READ_CONTACTS);
        }
        return false;
    }

    /**
     * Callback received when a permissions request has been completed.
     */
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions,
                                           @NonNull int[] grantResults) {
        if (requestCode == REQUEST_READ_CONTACTS) {
            if (grantResults.length == 1 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//                populateAutoComplete();
            }
        }
    }

    /**
     * Attempts to sign in or register the account specified by the registration form.
     * If there are form errors (invalid email, missing fields, etc.), the
     * errors are presented and no actual registration attempt is made.
     */
    private void attemptRegister() {
        if (mAuthTask != null) {
            return;
        }

        // Reset errors.
//        mEmailView.setError(null);
        mFirstnameView.setError(null);
        mFamilynameView.setError(null);
        mUsernameView.setError(null);
//        mPublickeyView.setError(null);
        mPasswordView.setError(null);
        mPasswordConfView.setError(null);

        // Store values at the time of the registration attempt.
//        String email = mEmailView.getText().toString();
        String firstname = mFirstnameView.getText().toString();
        String familyname = mFamilynameView.getText().toString();
        String username = mUsernameView.getText().toString();
//        String publickey = mPublickeyView.getText().toString();
        String password = mPasswordView.getText().toString();
        String passwordConf = mPasswordConfView.getText().toString();

        boolean cancel = false;
        View focusView = null;

        // Check for valid field entries
        if (!isUsernameValid(username)) {
            // Check for a valid username, if the user entered one.
            mUsernameView.setError(errorMessage);
            focusView = mUsernameView;
            cancel = true;
        } /*else if (!isPublickeyValid(publickey)) {
            // Check for a valid public key, if the user entered one.
            mPublickeyView.setError(errorMessage);
            focusView = mPublickeyView;
            cancel = true;
        }*/ else if (!isPasswordValid(password)) {
            // Check for a valid password, if the user entered one.
            mPasswordView.setError(errorMessage);
            focusView = mPasswordView;
            cancel = true;
        } else if (!isPasswordConfValid(password, passwordConf)) {
            // Check for a valid password confirmation, if the user entered one.
            mPasswordConfView.setError(errorMessage);
            focusView = mPasswordConfView;
            cancel = true;
        }

        // Check for a valid email address.
//        if (TextUtils.isEmpty(email)) {
//            mEmailView.setError(getString(R.string.error_field_required));
//            focusView = mEmailView;
//            cancel = true;
//        } else if (!isEmailValid(email)) {
//            mEmailView.setError(getString(R.string.error_invalid_email));
//            focusView = mEmailView;
//            cancel = true;
//        }

        if (cancel) {
            // There was an error; don't attempt registration and focus the first
            // form field with an error.
            focusView.requestFocus();
        } else {
            // Show a progress spinner, and kick off a background task to
            // perform the user registration attempt.
            showProgress(true);
            mAuthTask = new UserRegisterTask(firstname, familyname, username, password);
            mAuthTask.execute((Void) null);
        }
    }

//    private boolean isEmailValid(String email) {
//        //TODO: Replace this with your own logic
//        return email.contains("@");
//    }

    private boolean isUsernameValid(String username) {
        if (TextUtils.isEmpty(username)) {
            errorMessage = getString(R.string.error_field_required);
            return false;
        }
        if (username.length() < Integer.valueOf(getString(R.string.min_username_length))) {
            errorMessage = getString(R.string.error_short_username) + "\nUsername must be at least " + getString(R.string.min_username_length) + " characters long";
            return false;
        }
        if (username.contains(" ")) {
            errorMessage = getString(R.string.error_contains_space);
            return false;
        }
        errorMessage = null;
        return true;
    }

    private boolean isPublickeyValid(String pubkey) {
        if (TextUtils.isEmpty(pubkey)) {
            errorMessage = getString(R.string.error_field_required);
            return false;
        }
        if (pubkey.length() < Integer.valueOf(getString(R.string.min_pubkey_length))) {
            errorMessage = getString(R.string.error_short_pubkey) + "\nPublic key must be at least " + getString(R.string.min_pubkey_length) + " characters long";
            return false;
        }
        if (pubkey.contains(" ")) {
            errorMessage = getString(R.string.error_contains_space);
            return false;
        }
        errorMessage = null;
        return true;
    }

    private boolean isPasswordValid(String password) {
        if (TextUtils.isEmpty(password)) {
            errorMessage = getString(R.string.error_field_required);
            return false;
        }
        if (password.length() < Integer.valueOf(getString(R.string.min_password_length))) {
            errorMessage = getString(R.string.error_short_password) + "\nPassword must be at least " + getString(R.string.min_password_length) + " characters long";
            return false;
        }
        errorMessage = null;
        return true;
    }

    private boolean isPasswordConfValid(String password, String passwordConf) {
        if (TextUtils.isEmpty(passwordConf)) {
            errorMessage = getString(R.string.error_field_required);
            return false;
        }
        if (passwordConf.length() < Integer.valueOf(getString(R.string.min_password_length))) {
            errorMessage = getString(R.string.error_short_password) + "\nPassword must be at least " + getString(R.string.min_password_length) + " characters long";
            return false;
        }
        if (!password.equals(passwordConf)) {
            errorMessage = getString(R.string.error_mismatched_password);
            return false;
        }
        errorMessage = null;
        return true;
    }

    /**
     * Shows the progress UI and hides the registration form.
     */
    @TargetApi(Build.VERSION_CODES.HONEYCOMB_MR2)
    private void showProgress(final boolean show) {
        // On Honeycomb MR2 we have the ViewPropertyAnimator APIs, which allow
        // for very easy animations. If available, use these APIs to fade-in
        // the progress spinner.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.HONEYCOMB_MR2) {
            int shortAnimTime = getResources().getInteger(android.R.integer.config_shortAnimTime);

            mRegisterFormView.setVisibility(show ? View.GONE : View.VISIBLE);
            mRegisterFormView.animate().setDuration(shortAnimTime).alpha(
                    show ? 0 : 1).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mRegisterFormView.setVisibility(show ? View.GONE : View.VISIBLE);
                }
            });

            mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
            mProgressView.animate().setDuration(shortAnimTime).alpha(
                    show ? 1 : 0).setListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
                }
            });
        } else {
            // The ViewPropertyAnimator APIs are not available, so simply show
            // and hide the relevant UI components.
            mProgressView.setVisibility(show ? View.VISIBLE : View.GONE);
            mRegisterFormView.setVisibility(show ? View.GONE : View.VISIBLE);
        }
    }

    @Override
    public Loader<Cursor> onCreateLoader(int i, Bundle bundle) {
        return new CursorLoader(this,
                // Retrieve data rows for the device user's 'profile' contact.
                Uri.withAppendedPath(ContactsContract.Profile.CONTENT_URI,
                        ContactsContract.Contacts.Data.CONTENT_DIRECTORY), ProfileQuery.PROJECTION,

                // Select only email addresses.
                ContactsContract.Contacts.Data.MIMETYPE +
                        " = ?", new String[]{ContactsContract.CommonDataKinds.Email
                .CONTENT_ITEM_TYPE},

                // Show primary email addresses first. Note that there won't be
                // a primary email address if the user hasn't specified one.
                ContactsContract.Contacts.Data.IS_PRIMARY + " DESC");
    }

    @Override
    public void onLoadFinished(Loader<Cursor> cursorLoader, Cursor cursor) {
        List<String> emails = new ArrayList<>();
        cursor.moveToFirst();
        while (!cursor.isAfterLast()) {
            emails.add(cursor.getString(ProfileQuery.ADDRESS));
            cursor.moveToNext();
        }

//        addEmailsToAutoComplete(emails);
    }

    @Override
    public void onLoaderReset(Loader<Cursor> cursorLoader) {

    }

//    private void addEmailsToAutoComplete(List<String> emailAddressCollection) {
//        //Create adapter to tell the AutoCompleteTextView what to show in its dropdown list.
//        ArrayAdapter<String> adapter =
//                new ArrayAdapter<>(RegisterActivity.this,
//                        android.R.layout.simple_dropdown_item_1line, emailAddressCollection);
//
//        mEmailView.setAdapter(adapter);
//    }


    private interface ProfileQuery {
        String[] PROJECTION = {
                ContactsContract.CommonDataKinds.Email.ADDRESS,
                ContactsContract.CommonDataKinds.Email.IS_PRIMARY,
        };

        int ADDRESS = 0;
        int IS_PRIMARY = 1;
    }

    /**
     * Represents an asynchronous registration task used to onboard the user
     */
    public class UserRegisterTask extends AsyncTask<Void, Void, Boolean> {

        private final String mFirstname;
        private final String mFamilyname;
        private final String mUsername;
        private final String mPublickey;
        private final String mPrivatekey;
        private final String mPassword;

        UserRegisterTask(String firstname, String familyname, String username, /*String pubkey,*/ String password) {
            mFirstname = firstname;
            mFamilyname = familyname;
            mUsername = username;
            KeyPair pair = KeyPair.random();
            mPublickey = pair.getAccountId();
            mPrivatekey = new String(pair.getSecretSeed());
            mPassword = password;
        }

        @Override
        protected Boolean doInBackground(Void... params) {
            // TODO: attempt authentication against a network service.
//            try {
//                // Simulate network access.
//                Thread.sleep(2000);
//            } catch (InterruptedException e) {
//                return false;
//            }
//            for (String credential : AuthUtil.SampleCredentials) {
//                String[] pieces = credential.split(":");
//                if (pieces[0].equals(mUsername)) {
//                    // Account exists, return false.
//                    return false;
//                }
//            }

            // TODO: register the new account here.
//            AuthUtil.SampleCredentials.add(mUsername + ":" + mPassword);
//            return true;

//            MongoCollection<Document> users = DbUtil.MongoDB.getCollection("users");
//            long numExistingUsers = users.count(Filters.eq("username", mUsername));
//            if (numExistingUsers > 0) {
//                return false;
//            }
//            Document newUser = new Document("username", mUsername)
//                                .append("publickey", mPublickey)
//                                .append("password", mPassword);
//            users.insertOne(newUser);
//            return true;
            HttpURLConnection connection;
            JSONObject regData;
            JSONObject regResult;
            try {
                // Connect
                connection = (HttpURLConnection) ((new URL(AuthUtil.RegisterURI).openConnection()));
                connection.setDoOutput(true);
                connection.setRequestProperty("Content-Type", "application/json");
                connection.setRequestProperty("Accept", "application/json");
                connection.setRequestMethod("POST");
                connection.connect();

                // Write
                OutputStream outputStream = connection.getOutputStream();
                BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(outputStream, "UTF-8"));
                regData = new JSONObject();
                regData.put(AuthUtil.FirstNameQueryField, mFirstname);
                regData.put(AuthUtil.FamilyNameQueryField, mFamilyname);
                regData.put(AuthUtil.UserNameQueryField, mUsername);
                regData.put(AuthUtil.PublicKeyQueryField, mPublickey);
                regData.put(AuthUtil.PasswordQueryField, mPassword);
                writer.write(regData.toString());
                writer.close();
                outputStream.close();

                // Read
                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "UTF-8"));
                String line = null;
                StringBuilder sb = new StringBuilder();
                while ((line = bufferedReader.readLine()) != null) {
                    sb.append(line);
                }
                bufferedReader.close();
                regResult = new JSONObject(sb.toString());

                // Check
                if (regResult.getBoolean(AuthUtil.SuccessStr)) {
                  return true;
                }
                errorMessage = regResult.getString(AuthUtil.MessageStr);
                return false;
            } catch (UnsupportedEncodingException e) {
              errorMessage = e.getMessage();
              e.printStackTrace();
            } catch (IOException e) {
              errorMessage = e.getMessage();
              e.printStackTrace();
            } catch (JSONException e) {
              errorMessage = e.getMessage();
              e.printStackTrace();
            }
            return false;
        }

        @Override
        protected void onPostExecute(final Boolean success) {
            mAuthTask = null;
            showProgress(false);

            if (success) {
                Intent intent = new Intent(RegisterActivity.this, SecretActivity.class);
                intent.putExtra(IntentExtras.SECRET, mPrivatekey);
                startActivity(intent);
                finish();
            } else {
                mUsernameView.setError(errorMessage);
                AuthUtil.clearTextFields(mUsernameView/*, mPublickeyView*/);
                mUsernameView.requestFocus();
            }
        }

        @Override
        protected void onCancelled() {
            mAuthTask = null;
            showProgress(false);
        }
    }
}


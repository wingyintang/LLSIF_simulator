package com.twy.llsif;

import android.content.Intent;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.TextView;
//import android.widget.Toast;
import java.util.Locale;
import android.content.res.Configuration;
import android.content.res.Resources;
import android.util.DisplayMetrics;

public class LLSIFMenu extends ActionBarActivity {
    int OpenFile =  1;
    int llsiftw =  3;
    Button Button1;
    Button Button2;
    TextView Label1;
    TextView Label2;
    TextView LinkLabel1;
    TextView RichTextBox1;
    RadioButton RadioButton1;
    RadioButton RadioButton2;
    RadioButton RadioButton3;
    RadioButton RadioButton4;
    public void setLocale(String lang) {
        Resources res = getResources();
        // Change locale settings in the app.
        DisplayMetrics dm = res.getDisplayMetrics();
        android.content.res.Configuration conf = res.getConfiguration();
        conf.locale = new Locale(lang.toLowerCase());
        res.updateConfiguration(conf, dm);
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_llsif_main);
        Button1 = (Button) findViewById(R.id.Button1);
        Button2 = (Button) findViewById(R.id.Button2);
        Label1 = (TextView) findViewById(R.id.Label1);
        Label2 = (TextView) findViewById(R.id.Label2);
        LinkLabel1 = (TextView) findViewById(R.id.LinkLabel1);
        RadioButton1 = (RadioButton) findViewById(R.id.RadioButton1);
        RadioButton2 = (RadioButton) findViewById(R.id.RadioButton2);
        RadioButton3 = (RadioButton) findViewById(R.id.RadioButton3);
        RadioButton4 = (RadioButton) findViewById(R.id.RadioButton4);
        RichTextBox1 = (TextView) findViewById(R.id.RichTextBox1);
        Button1.setOnClickListener(new View.OnClickListener(){
           public void onClick(View v){
                Intent OpenFileDialog1 = new Intent(v.getContext(), OpenFileDialog.class);
                startActivityForResult(OpenFileDialog1, OpenFile);
            }
        });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode== RESULT_OK){
            if (requestCode ==  OpenFile) {
                String filename=data.getStringExtra("FileName");
                //Toast.makeText(getApplicationContext(), filename, Toast.LENGTH_SHORT).show();
                String filetype = "";
                if (filename.indexOf('.') > -1) {
                    filetype = filename.substring(filename.lastIndexOf('.') + 1);
                }
                switch(filetype) {
                    case "sif":
                        //readsif(filename);
                        break;
                    case "osu":
                        //readosu(filename);
                        break;
                    case "mid":
                        //readmidi(filename);
                        break;
                    case "midi":
                        //readmidi(filename);
                        break;
                };
            } else if (requestCode ==  llsiftw){

            } else {

            }
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_llsif_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }
}

package com.twy.llsif;

import android.content.Intent;
import android.graphics.Color;
import android.os.Environment;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ListView;
import android.widget.TextView;
import java.io.File;
import java.util.Arrays;
import java.lang.String;

public class OpenFileDialog extends ActionBarActivity {
    String[] Filter = {"sif","osu","mid;midi"};
    String[] Colors = {"#FFCCCC","#FFEECC","#FFFFCC"};
    String FolderName = Environment.getExternalStorageDirectory().getAbsolutePath();
    TextView textView;
    LinearLayout LL1;
    private void opendir(String s) {
        try{
            s = new File(s).getAbsolutePath();
            textView.setText(s);
            File f = new File(s);
            File[] files = f.listFiles();
            LL1.removeAllViews();
            Button Buttondot = new Button(this);
            Buttondot.setText("..");
            Buttondot.setBackgroundColor(Color.parseColor("#FF8080"));
            Buttondot.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
            final String sdot = f.getParent();
            Buttondot.setOnClickListener(new View.OnClickListener() {
                public void onClick(View v){
                    opendir(sdot);
                }
            });
            LL1.addView(Buttondot);
            Arrays.sort(files);
            for(int i=0; i < files.length; i++)
            {
                if(files[i].isDirectory()){
                    Button Buttons = new Button(this);
                    Buttons.setText(files[i].getName());
                    Buttons.setBackgroundColor(Color.parseColor("#00FFFF"));
                    Buttons.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
                    final String s2 = files[i].getAbsolutePath();
                    Buttons.setOnClickListener(new View.OnClickListener() {
                        public void onClick(View v){
                            opendir(s2);
                        }
                    });
                    LL1.addView(Buttons);
                }
            }
            for(int l=0; l < Filter.length; l++) {
                for(int i=0; i < files.length; i++)
                {
                    if(!files[i].isDirectory()){
                        String[] cutfilter = Filter[l].split(";");
                        Boolean valids = false;
                        for (int k=0; k<cutfilter.length;k++){
                            if(files[i].getName().substring(files[i].getName().lastIndexOf('.') + 1).equals(cutfilter[k])) {
                                valids = true;
                            }
                        }
                        if(valids) {
                            Button Buttons = new Button(this);
                            Buttons.setText(files[i].getName());
                            Buttons.setBackgroundColor(Color.parseColor(Colors[l]));
                            Buttons.setGravity(Gravity.LEFT | Gravity.CENTER_VERTICAL);
                            final String s2 = files[i].getAbsolutePath();
                            Buttons.setOnClickListener(new View.OnClickListener() {
                                public void onClick(View v) {
                                    Intent returnIntent = new Intent();
                                    returnIntent.putExtra("FileName",s2);
                                    setResult(RESULT_OK, returnIntent);
                                    finish();
                                }
                            });
                            LL1.addView(Buttons);
                        }
                    }
                }
            }
        } catch (Exception ex) {

        };
    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_open_file_dialog);
        textView = (TextView) findViewById(R.id.textView);
        LL1 = (LinearLayout) findViewById(R.id.LinearLayout);
        opendir(FolderName);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_open_file_dialog, menu);
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

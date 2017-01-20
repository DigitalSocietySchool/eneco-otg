package medialab.enecootgstore4;

import android.app.FragmentManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.IntentFilter;
import android.nfc.NdefMessage;
import android.nfc.NdefRecord;
import android.nfc.NfcAdapter;
import android.os.Bundle;
import android.os.Parcelable;
import android.support.design.widget.TabLayout;
import android.support.v4.app.FragmentActivity;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.Toast;

/**

 This class contains all the nfc functions and calls

 */

public class appActivity extends AppCompatActivity {

    public MainActivity.SectionsPagerAdapter mSectionsPagerAdapter;
    public ViewPager mViewPager;

    NfcAdapter nfcAdapter;
    static CheckBox cbxActivateCard;
    static CheckBox cbxCard;
    static CheckBox cbxBorrowPowerBank;
    static CheckBox cbxReturnPowerBank;
    static String cardId;
    static String batteryId;

    // 0 = borrow, 1 = return, 2 = activate
    public byte screenNumber;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        nfcAdapter = NfcAdapter.getDefaultAdapter(this);


        // Check if the smartphone has NFC

        nfcAdapter = NfcAdapter.getDefaultAdapter(this);
        if (nfcAdapter == null) {
            Toast.makeText(this, "NFC not supported or enabled", Toast.LENGTH_LONG).show();

        }

//        cbxBorrowPowerBank = (CheckBox) findViewById(R.id.cbxBorrowPowerBank);
//        cbxReturnPowerBank = (CheckBox) findViewById(R.id.cbxReturnPowerBank);
//        cbxCard = (CheckBox) findViewById(R.id.cbxCard);
//        cbxActivateCard = (CheckBox) findViewById(R.id.cbxActivateCard);

    }

        // When the app starts running or resumes after using another app, the ForgroundDispatch is enabled. At an NFC Intent
        // - which is only when reading text (see the Manifest) - the NFC intent is executed in that same activity/ class.
    @Override
    protected void onResume() {
        super.onResume();

        PendingIntent intent = PendingIntent.getActivity(this, 0, new Intent(this, getClass()).addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP),0);
        NfcAdapter.getDefaultAdapter(this).enableForegroundDispatch(this, intent,null,null);
    }

        // When the user switches to another app, the app is put in a pause, and the ForgroundDispatch gets disabled.
    @Override
    protected void onPause(){
        super.onPause();
        if(NfcAdapter.getDefaultAdapter(this) != null){
            NfcAdapter.getDefaultAdapter(this).disableForegroundDispatch(this);
        }
    }

        // When a NFC intent is called...
    @Override
    public void onNewIntent(Intent intent){
        setIntent(intent);
        if(NfcAdapter.ACTION_NDEF_DISCOVERED.equals(getIntent().getAction())){
            handleIntent(getIntent());
        }
    }

        // The intent gets handled here
    private void handleIntent(Intent nfcIntent) {
        Log.i("hello", "world");
        if (NfcAdapter.ACTION_NDEF_DISCOVERED.equals(nfcIntent.getAction())) {
            Parcelable[] receivedArray =
                    nfcIntent.getParcelableArrayExtra(NfcAdapter.EXTRA_NDEF_MESSAGES);

            if(receivedArray != null) {
                // messagesToReceiveArray.clear();
                NdefMessage receivedMessage = (NdefMessage) receivedArray[0];
                NdefRecord[] attachedRecords = receivedMessage.getRecords();

                for (NdefRecord record:attachedRecords) {
                    String s = new String(record.getPayload());
                    //Make sure we don't pass along our AAR (Android Application Record)
                    if (s.equals(getPackageName())) { continue; }
                    Log.i("full payload string", s);

                    // create the final string; deleting first 3 chars.
                    char c[] = s.toCharArray();
                    String finalString = "";
                    for (int j = 3; j < c.length; j++ ){
                         finalString = finalString + c[j];
                    }
                    Log.i("final string", finalString);
                    // The received code/text will be excecuted in checkNFC
                    checkNFC(finalString);
                }
            }
            else {
                Toast.makeText(this, "Received Blank Parcel", Toast.LENGTH_LONG).show();
            }
        }
    }

        // The received NFC tag will be checked
    private void checkNFC(String finalString) {

        // The screen number gets updated with the current screen state
        screenNumber = (byte) mViewPager.getCurrentItem();

        // Check if the chip represents a battery
        if (finalString.indexOf("b") != -1) {

            if (batteryId == null) {
                batteryId = finalString;

                if (screenNumber == 0) {
                    cbxBorrowPowerBank = (CheckBox) findViewById(R.id.cbxBorrowPowerBank);
                    checkBattery(cbxBorrowPowerBank);
                } else if (screenNumber == 1) {
                    cbxReturnPowerBank = (CheckBox) findViewById(R.id.cbxReturnPowerBank);
                    checkBattery(cbxReturnPowerBank);
                } else {
                    Toast.makeText(this, "no battery necessary ", Toast.LENGTH_LONG).show();
                    resetBattery();
                }
            } else
                Toast.makeText(this, "Looks like you need to reset!", Toast.LENGTH_LONG).show();
        }


        // Check if the chip represents a card
        else if (finalString.indexOf("c") != -1) {

            if (cardId == null) {
                cardId = finalString;

                if (screenNumber == 0) {
                    cbxCard = (CheckBox) findViewById(R.id.cbxCard);
                    checkCard(cbxCard);
                } else if (screenNumber == 2) {
                    cbxActivateCard = (CheckBox) findViewById(R.id.cbxActivateCard);
                    checkCard(cbxActivateCard);
                } else {
                    Toast.makeText(this, "no card necessary ", Toast.LENGTH_LONG).show();
                    resetCard();
                }
            } else
                Toast.makeText(this, "Looks like you need to reset!", Toast.LENGTH_LONG).show();
        }
        // And else...
        else{
            Toast.makeText(this, "no valid input", Toast.LENGTH_LONG).show();
        }
    }

    // Card is checked.
    private void checkCard(CheckBox card) {

        if(!card.isChecked()){
            card.setChecked(true);
            Toast.makeText(this, "card checked", Toast.LENGTH_SHORT).show();
        }
//        else{
//            Toast.makeText(this, "card was scanned already", Toast.LENGTH_SHORT).show();
//        }
    }

    // Battery is checked
    private void checkBattery(CheckBox battery) {

        if(!battery.isChecked()){
            battery.setChecked(true);
            Toast.makeText(this, "battery checked", Toast.LENGTH_SHORT).show();
        }
//        else{
//            Toast.makeText(this, "battery was scanned already", Toast.LENGTH_SHORT).show();
//        }
    }


    // Reset card
    public void resetCard(){
        cbxActivateCard = (CheckBox) findViewById(R.id.cbxActivateCard);
        cbxCard = (CheckBox) findViewById(R.id.cbxCard);

        cardId = null;

        if (cbxCard != null){
            cbxCard.setChecked(false);
            cbxCard = null;
        }
        if (cbxActivateCard != null){
            cbxActivateCard.setChecked(false);
            cbxActivateCard = null;
        }
    }

    // Reset battery
    public  void resetBattery(){
        cbxBorrowPowerBank = (CheckBox) findViewById(R.id.cbxBorrowPowerBank);
        cbxReturnPowerBank = (CheckBox) findViewById(R.id.cbxReturnPowerBank);

        batteryId = null;

        if(cbxBorrowPowerBank != null){
            cbxBorrowPowerBank.setChecked(false);
            cbxBorrowPowerBank = null;
        }
        if(cbxReturnPowerBank != null){
            cbxReturnPowerBank.setChecked(false);
            cbxReturnPowerBank = null;
        }
    }

}

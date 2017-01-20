package medialab.enecootgstore4;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.TextView;
import android.widget.Toast;

import static medialab.enecootgstore4.appActivity.batteryId;
import static medialab.enecootgstore4.appActivity.cardId;

/**
 * Created by user on 12-1-2017.
 */

public class returnTab extends Fragment implements View.OnClickListener{

    CheckBox cbxReturnPowerBank;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.return_tab, container, false);


        // Button and checkbox Init
        Button btnReturn = (Button) rootView.findViewById(R.id.btnReturn);
        btnReturn.setOnClickListener(this);

        cbxReturnPowerBank = (CheckBox) rootView.findViewById(R.id.cbxReturnPowerBank);


        return rootView;
    }


    // Button OnClick
    @Override
    public void onClick(View view) {
        if ( appActivity.batteryId != null
                && cbxReturnPowerBank.isChecked()) {

            Toast.makeText(this.getActivity(), "PowerBank " + String.valueOf(batteryId) + " is successfully brought back ", Toast.LENGTH_LONG).show();

            cbxReturnPowerBank.setChecked(false);
            batteryId = null;
        } else
            Toast.makeText(this.getActivity(), "There is information missing unfortunately..", Toast.LENGTH_LONG).show();
    }
}


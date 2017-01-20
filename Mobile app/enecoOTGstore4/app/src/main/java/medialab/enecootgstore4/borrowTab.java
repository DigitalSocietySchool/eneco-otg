package medialab.enecootgstore4;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.telephony.CellIdentityGsm;
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

public class borrowTab extends Fragment implements View.OnClickListener{
    CheckBox cbxCard;
    CheckBox cbxBorrowPowerBank;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.borrow_tab, container, false);


        // Buttons and checkboxes init
        Button btnBorrow = (Button) rootView.findViewById(R.id.btnBorrow);
        btnBorrow.setOnClickListener(this);

        cbxBorrowPowerBank = (CheckBox) rootView.findViewById(R.id.cbxBorrowPowerBank);
        cbxCard = (CheckBox) rootView.findViewById(R.id.cbxCard);

        return rootView;
    }

    // Button OnClick
    @Override
    public void onClick(View view) {
        if (cardId != null && batteryId != null
                && cbxBorrowPowerBank.isChecked() && cbxCard.isChecked()) {

            Toast.makeText(this.getActivity(), "card number " + String.valueOf(cardId) + " and battery number " + String.valueOf(batteryId) + " are successfully connected! ", Toast.LENGTH_LONG).show();


            cbxBorrowPowerBank.setChecked(false);
            cbxCard.setChecked(false);
            cardId = null;
            batteryId = null;
        } else
            Toast.makeText(this.getActivity(), "There is information missing unfortunately..", Toast.LENGTH_LONG).show();
    }
}

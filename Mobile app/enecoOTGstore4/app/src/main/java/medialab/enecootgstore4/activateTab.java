package medialab.enecootgstore4;

import android.support.v4.app.Fragment;
import android.os.Bundle;
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

public class activateTab  extends Fragment implements View.OnClickListener {

    CheckBox cbxActivateCard;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.activate_tab, container, false);


        // Button and checkbox init
        Button btnActivate = (Button) rootView.findViewById(R.id.btnActivate);
        btnActivate.setOnClickListener(this);

        cbxActivateCard = (CheckBox) rootView.findViewById(R.id.cbxActivateCard);

        return rootView;
    }

    // Button OnClick
    @Override
    public void onClick(View view) {
        if ( appActivity.cardId != null
                && cbxActivateCard.isChecked()) {

            Toast.makeText(this.getActivity(), "Card " + String.valueOf(cardId) + " is successfully activated ", Toast.LENGTH_LONG).show();

            cbxActivateCard.setChecked(false);
            cardId = null;
        } else
            Toast.makeText(this.getActivity(), "There is information missing unfortunately..", Toast.LENGTH_LONG).show();

    }
}

import React from 'react';

import { Dispatcher, Constants } from "../../flux";


export const transitionAlertTrigger = (text, severity, askReload=true) => {
    Dispatcher.dispatch({
        actionType: Constants.ACTIVATE_ALERT,
        payload: {
            text: (
                <div>
                    {text} {askReload ? 
                        <span><a href="#" onClick={() => window.location.reload()}>Refresh</a> to see changes.</span>
                        : null}
                </div>
            ),
            severity: severity,
        }
    });
}
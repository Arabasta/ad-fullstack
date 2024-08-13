import {View} from "react-native";
import ButtonPrimary from "../common/button/ButtonPrimary";

const ResetStopLossTriggerByPortfolio = ({ onReset }) => {
    return (
        <View>
            <ButtonPrimary title="Apply Stop Loss (%) on Current Portfolio Value" onPress={onReset} />
        </View>
    );
};

export default ResetStopLossTriggerByPortfolio;
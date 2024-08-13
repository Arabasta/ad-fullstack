import Container from "../common/container/Container";
import ButtonSecondary from "../common/button/ButtonSecondary";

const ResetStopLossTriggerByPortfolio = ({ onReset }) => {
    return (
        <Container>
            <ButtonSecondary title="Apply Stop Loss (%)" onPress={onReset} />
        </Container>
    );
};

export default ResetStopLossTriggerByPortfolio;
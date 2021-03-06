import styles from "./ActionSelection.module.scss";
import WhitePillButton from "../WhitePillButton";
import LoadingIcon from "../LoadingIcon/LoadIcon";

const TruthSelect = ({ actions, actionSelected, truthOrDare }) => {
  return (
    <div
      className={styles.truthSelect}
      style={{
        backgroundImage:
          "url(/images/other/FRASecondPlayer-TruthSelection-BACKGROUND.jpg)",
      }}
    >
      <div className={styles.textBox}>
        <p>
          YOU CAN
          <br /> CHOOSE
          <br />
          <span>
            WHICH
            <br /> {truthOrDare}
          </span>
        </p>
      </div>
      <div className={styles.btnBox}>
        {actions.map((action, i) => (
          <div key={i}>
            <WhitePillButton
              onStart={() => actionSelected(action.id)}
              text={`<span>${i + 1}</span><span>${action.text}</span>`}
            />
          </div>
        ))}
        <LoadingIcon />
      </div>
    </div>
  );
};
export default TruthSelect;

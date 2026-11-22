import { Fragment } from "react";
import styles from "./DocsScreen.module.css";

/** 문서 문단: `코드` 는 <code>, [[키]] 는 <kbd>. 나머지는 글자 그대로 (HTML 로 해석하지 않는다) */
const RichText = ({ text }: { text: string }) => (
  <>
    {text.split(/(`[^`]+`|\[\[[^\]]+\]\])/).map((part, index) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index} className={styles.inlineCode}>{part.slice(1, -1)}</code>;
      }
      if (part.startsWith("[[") && part.endsWith("]]")) {
        return <kbd key={index} className={styles.kbd}>{part.slice(2, -2)}</kbd>;
      }
      return <Fragment key={index}>{part}</Fragment>;
    })}
  </>
);

export default RichText;

import { cn } from "@/lib/utils";
import text from "@/styles/text.module.css";
import RichText from "./RichText";
import type { DocBlock } from "../types";
import styles from "./DocsScreen.module.css";

/** 문서 내용 한 덩어리 (문단 · 목록 · 순서 · 명령 · 단축키 표 · 알림) */
const DocBlockView = ({ block }: { block: DocBlock }) => {
  switch (block.kind) {
    case "p":
      return <p className={cn(text.bodyM, styles.p)}><RichText text={block.text} /></p>;
    case "list":
      return (
        <ul className={cn(text.bodyM, styles.list)}>
          {block.items.map((item) => <li key={item}><RichText text={item} /></li>)}
        </ul>
      );
    case "steps":
      return (
        <ol className={cn(text.bodyM, styles.steps)}>
          {block.items.map((item) => <li key={item}><RichText text={item} /></li>)}
        </ol>
      );
    case "command":
      return (
        <pre className={cn(text.code, styles.command)}>
          <span aria-hidden="true" className={styles.prompt}>$ </span>
          <code>{block.command}</code>
        </pre>
      );
    case "keys":
      return (
        <table className={cn(text.bodyM, styles.keys)}>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.action}>
                <td className={styles.keysCell}>
                  {row.keys.map((key) => <kbd key={key} className={styles.kbd}>{key}</kbd>)}
                </td>
                <td>{row.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    case "note":
      return <p className={cn(text.bodyM, styles.note)}><RichText text={block.text} /></p>;
  }
};

export default DocBlockView;

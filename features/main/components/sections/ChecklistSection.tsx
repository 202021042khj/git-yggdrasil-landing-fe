import SectionHead from "@/components/common/SectionHead";
import type { HomeDictionary } from "../../types";
import { cn } from "@/lib/utils";
import section from "@/styles/section.module.css";
import text from "@/styles/text.module.css";
import styles from "./ChecklistSection.module.css";

interface ChecklistSectionProps {
  t: HomeDictionary;
  idPrefix?: string;
}

const ChecklistSection = ({ t, idPrefix = "" }: ChecklistSectionProps) => (
  <section
    aria-labelledby={`${idPrefix}checklist-title`}
    className={cn(section.section, section.divided, section.brand)}
  >
    <div className={section.inner}>
      <SectionHead
        headingId={`${idPrefix}checklist-title`}
        {...t.checklistHead}
      />
      <ul className={styles.list}>
        {t.checklist.map((item) => (
          <li
            key={item.title}
            className={styles.item}
          >
            <div className={styles.head}>
              <span aria-hidden="true" className={styles.mark} />
              <h3 className={cn(text.headingM, styles.title)}>
                {item.title}
              </h3>
            </div>
            <p className={cn(text.bodyM, styles.description)}>
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default ChecklistSection;

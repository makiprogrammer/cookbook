import classNames from "classnames";
import Link from "next/link";
import { RefObject } from "react";

import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { mealTypeList } from "global/meals";
import { FormSubmitHandler } from "global/types";

import styles from "./ExploreForm.module.css";

export interface ExploreFormProps {
  onChange: () => void;
  onSubmit: FormSubmitHandler;
  formRef?: RefObject<HTMLFormElement>;
}

export function ExploreForm({ onChange, onSubmit, formRef }: ExploreFormProps) {
  return (
    <form
      className={styles.form}
      ref={formRef}
      onSubmit={onSubmit}
      onChange={onChange}
    >
      <div className={styles.table}>
        <label className={classNames(styles.full, styles.search)}>
          <input type="search" name="search" placeholder="Try garlic soup..." />
          <Icon type="search" />
        </label>
        <label>
          Meal type:
          <select name="mealType" defaultValue="_ALL">
            <option value="_ALL">All</option>
            {mealTypeList.map((mt) => (
              <option key={mt.id} value={mt.id}>
                {mt.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.submit}>
        <span>
          The filtering includes your{" "}
          <Link className="text-link" href="/profile">
            profile data
          </Link>{" "}
          as kitchen equipment and allergies.
        </span>
        <Button type="submit" icon="search" theme="primary">
          Search
        </Button>
      </div>
    </form>
  );
}

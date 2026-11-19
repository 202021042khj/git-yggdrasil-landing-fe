import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // 템플릿에서 그대로 옮겨 온 디자인 시스템 코드(khj-fe-template 원본도 같은 오류)는
  // 이 랜딩에서 고치지 않는다. 새 코드에는 규칙을 그대로 적용한다.
  {
    // khj-fe-template 원본에서도 같은 20개 오류가 나는 파일만 정확히 지정한다 (폴더 전체 X)
    files: [
      "components/ui/button.tsx",
      "components/ui/notify/notify.tsx",
      "components/ui/slot.tsx",
      "components/ui/sortable-table.tsx",
      "components/common/deferred-component.tsx",
      "hooks/useCallbackRef.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/static-components": "off",
    },
  },
  // 기능 폴더 경계 (khj-fe-template 와 같음): features/<기능> 밖에서는 그 기능의 index.ts 로만 가져다 쓴다.
  // 기능 폴더 안에서 자기 파일끼리는 상대 경로(./, ../)로 import 한다.
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/features/*/*"],
              message:
                "features/<기능> 밖에서는 '@/features/<기능>'(index.ts)으로만 import 하세요.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

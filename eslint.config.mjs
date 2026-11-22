import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
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
              // server.ts 는 서버 전용 공개 목록(언어 사전 읽기)이라 예외. 클라이언트 컴포넌트가 index.ts 를 가져가도 server-only 가 섞이지 않게 나눴다
              group: ["@/features/*/*", "!@/features/*/server"],
              message:
                "features/<기능> 밖에서는 '@/features/<기능>'(index.ts) 또는 서버 전용 '@/features/<기능>/server' 로만 import 하세요.",
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

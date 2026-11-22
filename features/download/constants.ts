import type { PlatformInfo } from "./types";

// 화면 문구는 i18n/{ko,en}.ts 에 있다. 여기는 언어와 무관한 릴리스 주소 · 파일 이름 · 명령만 둔다.

// ---------- 릴리스 ----------

/** 앱 버전 기본값. 화면은 GitHub 최신 릴리스 태그를 쓰고(getDownloadDictionary), 받지 못할 때만 이 값을 보여 준다 */
export const APP_VERSION = "0.2.0";

/** electron-builder.config.cjs productName (설치된 앱 이름). 파일 이름은 artifactName 의 "Yggdrasil-..." */
export const APP_PRODUCT_NAME = "Yggdrasil";

export const REPO_URL = "https://github.com/202021042khj/git-yggdrasil";
/** 모든 파일 · 이전 버전 · 파일별 sha256 */
export const RELEASES_URL = `${REPO_URL}/releases`;

/** GitHub 의 "가장 최근 릴리스" 고정 주소. 파일 이름만 바꿔 붙인다 */
export const latestDownloadUrl = (fileName: string) => `${RELEASES_URL}/latest/download/${fileName}`;

/** Windows 설치 파일 이름 (git-yggdrasil electron-builder.config.cjs 의 artifactName 과 같아야 한다) (처음 열기 안내 문구에도 쓴다) */
export const WINDOWS_SETUP_FILE = "Yggdrasil-windows-setup.exe";

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "mac",
    title: "macOS",
    shape: "circle",
    files: [
      { id: "mac-arm64", fileName: "Yggdrasil-mac-arm64.dmg", arch: "arm64" },
      { id: "mac-x64", fileName: "Yggdrasil-mac-x64.dmg", arch: "x64" },
    ],
  },
  {
    id: "windows",
    title: "Windows",
    shape: "square",
    files: [{ id: "win-x64", fileName: WINDOWS_SETUP_FILE, arch: "any" }],
  },
  {
    id: "linux",
    title: "Linux",
    shape: "triangle",
    files: [{ id: "linux-x64", fileName: "Yggdrasil-linux-x64.AppImage", arch: "any" }],
  },
];

/** macOS "손상되었기 때문에 열 수 없습니다" 대처 명령 (고급 안내) */
export const MAC_QUARANTINE_COMMAND = `xattr -dr com.apple.quarantine "/Applications/${APP_PRODUCT_NAME}.app"`;

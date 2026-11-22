/**
 * 방문한 컴퓨터의 운영체제와 CPU 를 추정한다 (React 없음, 브라우저 navigator 만 받음).
 *
 * - 운영체제: User-Agent Client Hints(navigator.userAgentData.platform) → 없으면 navigator.userAgent.
 * - Mac CPU: userAgentData.getHighEntropyValues(["architecture"]) (Chromium 계열) → 없으면 WebGL 그래픽 이름("Apple M1" 등).
 *   Safari · Firefox 는 Apple Silicon 에서도 UA 에 "Intel Mac OS X" 라고 쓰므로 UA 로는 알 수 없다 → 모르면 "unknown".
 * - iPadOS 는 데스크톱 UA("Macintosh")를 보내므로 터치 지점 수로 가려 휴대 기기로 본다.
 */

export type DetectedOs = "mac" | "windows" | "linux" | "mobile" | "unknown";
export type DetectedArch = "arm64" | "x64" | "unknown";

export interface DetectedPlatform {
  os: DetectedOs;
  arch: DetectedArch;
}

interface UaDataLike {
  platform?: string;
  mobile?: boolean;
  getHighEntropyValues?: (hints: string[]) => Promise<{ architecture?: string; bitness?: string }>;
}

export type NavigatorLike = Pick<Navigator, "userAgent" | "maxTouchPoints"> & {
  userAgentData?: UaDataLike;
};

export const UNKNOWN_PLATFORM: DetectedPlatform = { os: "unknown", arch: "unknown" };

/** 동기 추정: 운영체제만 (CPU 는 Mac 이면 "unknown") */
export const detectOs = (nav: NavigatorLike): DetectedOs => {
  const ua = nav.userAgent ?? "";
  const hint = nav.userAgentData?.platform?.toLowerCase() ?? "";

  if (nav.userAgentData?.mobile || /android|iphone|ipad|ipod|mobile/i.test(ua)) return "mobile";
  if (hint === "macos" || /macintosh|mac os x/i.test(ua)) {
    // iPadOS 13+ 는 Mac 처럼 보인다. Mac 은 터치 지점이 0~1
    return (nav.maxTouchPoints ?? 0) > 1 ? "mobile" : "mac";
  }
  if (hint === "windows" || /windows/i.test(ua)) return "windows";
  if (hint === "chrome os" || /cros/i.test(ua)) return "unknown";
  if (hint === "linux" || /linux|x11/i.test(ua)) return "linux";
  return "unknown";
};

const archFromHints = async (nav: NavigatorLike): Promise<DetectedArch> => {
  const getValues = nav.userAgentData?.getHighEntropyValues;
  if (!getValues) return "unknown";
  try {
    const { architecture } = await getValues.call(nav.userAgentData, ["architecture", "bitness"]);
    if (architecture === "arm") return "arm64";
    if (architecture === "x86") return "x64";
  } catch {
    // 권한 정책 등으로 막히면 모르는 것으로 둔다
  }
  return "unknown";
};

/** WebGL 그래픽 이름으로 Apple Silicon 을 가린다 (Firefox 등). Safari 는 "Apple GPU" 로 가려서 알 수 없다 */
const archFromWebGl = (): DetectedArch => {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    if (!gl) return "unknown";
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    if (/apple m\d/i.test(renderer)) return "arm64";
    if (/intel|amd|radeon|nvidia/i.test(renderer)) return "x64";
  } catch {
    // WebGL 이 꺼져 있으면 모르는 것으로 둔다
  }
  return "unknown";
};

/** 운영체제 + CPU. Mac 이 아니면 CPU 는 Client Hints 로만 본다(Windows on ARM 안내용) */
export const detectPlatform = async (nav: NavigatorLike): Promise<DetectedPlatform> => {
  const os = detectOs(nav);
  if (os !== "mac" && os !== "windows") return { os, arch: "unknown" };
  const hinted = await archFromHints(nav);
  if (hinted !== "unknown" || os !== "mac") return { os, arch: hinted };
  return { os, arch: archFromWebGl() };
};

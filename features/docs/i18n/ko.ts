import { MAC_QUARANTINE_COMMAND } from "../constants";
import type { DocsDictionary } from "../types";

/**
 * 문서 (한국어, 기본 언어). "어떻게 하나" 와 "안 될 때" 만 쓴다 — 무엇을 할 수 있는지는 랜딩 "기능 알아보기" 가 맡는다.
 * 앱 화면 이름(메뉴 · 버튼)은 앱의 src/shared/i18n/ko.ts 와 같게 쓴다. 토픽 id 는 랜딩 "자세히 보기" 링크가 가리킨다(drag · menu · diff · conflict · rebase).
 */
const ko: DocsDictionary = {
  metadata: {
    title: "문서 — Yggdrasil for Git",
    description: "Yggdrasil 사용법: 저장소 열기, 끌어 놓기, 충돌 해결, 커밋 정리, 잃어버린 커밋 찾기, 문제 해결.",
  },
  title: "문서",
  tocLabel: "목차",
  sections: [
    {
      id: "start",
      title: "시작하기",
      topics: [
        {
          id: "install",
          title: "설치",
          blocks: [
            { kind: "p", text: "다운로드 페이지에서 이 컴퓨터에 맞는 파일을 받아 설치합니다. 시스템에 git 2.38 이상이 설치되어 있어야 합니다." },
            { kind: "p", text: "아직 서명하지 않은 앱이라 처음 한 번은 운영체제가 실행을 막습니다. 아래 \"문제 해결\" 에서 여는 방법을 확인하세요." },
          ],
        },
        {
          id: "open",
          title: "저장소 열기",
          blocks: [
            {
              kind: "list",
              items: [
                "\"저장소 폴더 열기\" 또는 [[⌘O]] 로 git 저장소 폴더를 고르면 커밋 그래프가 바로 그려집니다.",
                "git 저장소가 아닌 폴더를 열면 \"git 시작하기\" 버튼이 뜹니다. 누르면 그 폴더에서 `git init` 을 실행하고 바로 시작합니다.",
                "원격 저장소는 \"URL 로 clone\"([[⌘⇧O]]) 또는 GitHub 에 로그인한 뒤 \"내 GitHub 저장소에서 clone\" 으로 받습니다.",
                "시작 화면의 \"최근 저장소\" 에서 다시 열 수 있고, 마지막으로 연 저장소는 다음 실행 때 자동으로 열립니다.",
              ],
            },
          ],
        },
        {
          id: "undo",
          title: "되돌리기",
          blocks: [
            { kind: "p", text: "앱에서 한 조작은 실행 기록에 실제 git 명령과 함께 남습니다. [[⌘Z]] 로 하나씩 되돌리고, [[⇧⌘Z]] 로 다시 실행합니다." },
            { kind: "note", text: "\"변경 버리기\" 와 \"여기로 되돌리기, 변경 버림\"(reset --hard) 으로 버린 작업 영역의 변경은 되돌리기로 복구되지 않습니다. 실행 전에 한 번 더 확인합니다." },
          ],
        },
      ],
    },
    {
      id: "basics",
      title: "기본 조작",
      topics: [
        {
          id: "drag",
          title: "끌어 놓기",
          blocks: [
            { kind: "p", text: "커밋, 브랜치 이름표, 변경 묶음, 파일, stash 카드, 원격 이름표를 끌 수 있습니다." },
            {
              kind: "steps",
              items: [
                "끌기 시작하면 놓을 수 있는 모든 곳에 무슨 일이 일어나는지 적힌 라벨이 뜹니다.",
                "라벨에 가까이 가면 자석처럼 붙고, 결과 그래프가 캔버스에 겹쳐 보입니다. 실행될 git 명령도 함께 보입니다.",
                "놓으면 실행됩니다. 놓기 전에 [[Esc]] 를 누르면 취소합니다.",
              ],
            },
            { kind: "p", text: "브랜치 이름표를 끌면 그 브랜치의 커밋이 함께 움직입니다(rebase). 합치기(merge)와 포인터만 옮기기는 메뉴에 있습니다." },
            { kind: "note", text: "push 된 커밋(색이 찬 노드)을 다시 쓰는 조작은 실행 전에 확인합니다. 이후 force push 가 필요합니다." },
          ],
        },
        {
          id: "menu",
          title: "놓은 뒤 고르는 메뉴",
          blocks: [
            { kind: "p", text: "할 수 있는 일이 여러 개인 곳에 놓으면 메뉴가 뜹니다. 예를 들어 커밋을 다른 브랜치 이름표에 놓으면 옮기기, 복사(cherry-pick), 브랜치 합치기 중에서 고릅니다. 항목마다 실행할 git 명령이 적혀 있습니다." },
            { kind: "list", items: ["숫자 키, 또는 화살표와 [[Enter]] 로 고릅니다.", "[[Esc]] 로 아무것도 하지 않고 닫습니다."] },
          ],
        },
        {
          id: "click",
          title: "오른쪽 클릭 · 더블클릭",
          blocks: [
            {
              kind: "list",
              items: [
                "끌지 않고도 됩니다. 아무 항목이나 오른쪽 클릭하면 같은 조작을 메뉴에서 고를 수 있습니다. 키보드로는 [[Shift]] [[F10]] 입니다.",
                "브랜치 이름표를 더블클릭하면 checkout, 커밋을 더블클릭하면 메시지 수정입니다.",
              ],
            },
          ],
        },
        {
          id: "multi",
          title: "여러 커밋 한꺼번에",
          blocks: [
            {
              kind: "steps",
              items: [
                "[[⌘]] 클릭으로 하나씩 더하거나 빼고, [[Shift]] 클릭으로 같은 브랜치의 범위를 고릅니다.",
                "고른 커밋 중 하나를 다른 브랜치 이름표에 끌어 놓거나 오른쪽 클릭하면, 오래된 것부터 한꺼번에 복사(cherry-pick)합니다.",
                "[[Esc]] 로 선택을 풉니다.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "how-to",
      title: "방법",
      topics: [
        {
          id: "diff",
          title: "바뀐 내용 보기",
          blocks: [
            {
              kind: "steps",
              items: [
                "그래프에서 커밋을 누르면 오른쪽 상세에 작성자, 부모, 바뀐 파일이 보입니다.",
                "파일을 누르면 diff 가 열립니다. \"통합\" 과 \"좌우\" 로 보기 방식을 바꾸고, \"공백 무시\" 를 켤 수 있습니다. 이미지는 전 · 후를 나란히 보여 줍니다.",
                "같은 자리의 히스토리 탭은 이름이 바뀌어도 그 파일을 따라가고, blame 탭은 줄마다 마지막으로 바꾼 커밋을 알려 줍니다.",
              ],
            },
            { kind: "p", text: "작업 영역의 파일에서는 \"이 덩어리만 stage\" 를 누르거나, +/- 줄을 클릭(또는 [[Space]])해서 고른 줄만 stage 할 수 있습니다." },
          ],
        },
        {
          id: "conflict",
          title: "충돌 해결",
          blocks: [
            { kind: "p", text: "현재 브랜치의 merge · rebase · cherry-pick · revert · pull 이 충돌하면 그 자리에서 멈추고 위에 배너가 뜹니다." },
            {
              kind: "steps",
              items: [
                "오른쪽 패널에서 충돌한 파일을 엽니다.",
                "구간마다 A, B, \"A 다음 B\", \"B 다음 A\" 중 하나를 고릅니다. 결과는 아래에서 바로 보이고 직접 고칠 수도 있습니다.",
                "\"이 내용으로 해결\" 을 누릅니다. 파일 통째로는 \"A 쪽 사용\" · \"B 쪽 사용\" · \"외부 에디터로\" 를 쓸 수 있습니다.",
                "모든 파일을 해결하면 배너의 \"계속\" 을 누릅니다. \"이 커밋 건너뛰기\" 와 \"중단 (시작 전으로)\" 도 있습니다.",
              ],
            },
            { kind: "note", text: "rebase 중에는 git 의 --ours 가 대상(받는 쪽), --theirs 가 내 커밋입니다. 앱의 A · B 도 이 순서를 따릅니다." },
            { kind: "p", text: "체크아웃하지 않은 브랜치에서 충돌이 나면 아무것도 바꾸지 않고, 체크아웃하고 진행할지 묻습니다. 터미널에서 시작해 멈춘 작업도 앱에서 열면 그대로 이어서 해결할 수 있습니다." },
          ],
        },
        {
          id: "rebase",
          title: "커밋 정리 (rebase -i)",
          blocks: [
            {
              kind: "steps",
              items: [
                "브랜치 이름표를 오른쪽 클릭하고 \"커밋 정리 (rebase -i)…\" 를 고릅니다.",
                "위가 오래된 커밋입니다. 줄을 끌거나 [[↑]] [[↓]] 로 순서를 바꿉니다.",
                "줄마다 \"그대로\", \"메시지 수정\", \"위 커밋에 합치기\", \"위 커밋에 합치기 (메시지 버림)\", \"빼기\" 중에서 고릅니다.",
                "결과를 확인하고 \"실행\" 을 누릅니다. 처음부터 다시 하려면 \"처음대로\" 를 누릅니다.",
              ],
            },
            { kind: "p", text: "체크아웃하지 않은 브랜치도 정리할 수 있습니다. 현재 브랜치에서 충돌이 나면 실제 rebase -i 로 멈추고, 충돌 해결과 같은 방법으로 이어 갑니다." },
            { kind: "note", text: "merge 커밋이 있는 줄기는 아직 정리할 수 없습니다. push 된 커밋을 정리하면 이후 force push 가 필요합니다." },
          ],
        },
        {
          id: "recover",
          title: "잃어버린 커밋 찾기",
          blocks: [
            { kind: "p", text: "브랜치를 지웠거나 reset 으로 커밋이 사라져 보여도, 대부분은 찾을 수 있습니다." },
            {
              kind: "steps",
              items: [
                "오른쪽 실행 기록 옆의 \"예전 커밋 찾기\" 를 누릅니다. HEAD 기록(reflog)과 앱이 조작 전에 남긴 백업이 보이고, 어느 브랜치에서도 닿지 않는 커밋은 따로 표시됩니다.",
                "\"그래프에서 보기\" 로 내용을 확인합니다.",
                "\"여기서 새 브랜치로 살리기…\", \"이 커밋만 복사 (cherry-pick)\", \"이 커밋으로 되돌리기…\" 중에서 고릅니다.",
              ],
            },
          ],
        },
        {
          id: "github",
          title: "GitHub 와 다른 원격",
          blocks: [
            {
              kind: "list",
              items: [
                "\"GitHub 로그인\" 을 누르면 브라우저에 승인 페이지가 열립니다. 앱에 보이는 코드를 입력하고 승인하면 끝납니다.",
                "로그인하면 github.com 저장소의 fetch · pull · push · clone 에 자동으로 쓰입니다. \"내 GitHub 저장소에서 clone\" 과 원격 섹션의 \"GitHub 에 새 저장소로 올리기\" 도 쓸 수 있습니다.",
                "PR 은 브랜치 이름표를 오른쪽 클릭하고 \"GitHub PR 만들기…\" 를 고릅니다.",
                "GitLab · Bitbucket · 사내 서버처럼 GitHub 밖의 HTTPS 원격은 인증이 필요할 때 사용자 이름과 액세스 토큰을 묻고, 시스템의 git 자격 증명 도우미(macOS 키체인 등)에 저장합니다.",
                "SSH 원격은 시스템의 SSH 에이전트에 등록된 키를 그대로 씁니다.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "reference",
      title: "참고",
      topics: [
        {
          id: "shortcuts",
          title: "단축키",
          blocks: [
            {
              kind: "keys",
              rows: [
                { keys: ["⌘O"], action: "저장소 폴더 열기" },
                { keys: ["⌘⇧O"], action: "URL 로 clone" },
                { keys: ["⌘K"], action: "커밋 · 파일 찾기" },
                { keys: ["⌘,"], action: "설정" },
                { keys: ["⌘Z"], action: "되돌리기" },
                { keys: ["⇧⌘Z"], action: "다시 실행" },
                { keys: ["⌘Enter"], action: "커밋" },
                { keys: ["Esc"], action: "끌기 취소 · 메뉴 닫기 · 선택 풀기" },
                { keys: ["←", "→", "↑", "↓"], action: "그래프에서 이동" },
                { keys: ["Shift", "F10"], action: "고른 항목의 메뉴" },
              ],
            },
            { kind: "p", text: "Windows 와 Linux 에서는 [[⌘]] 대신 [[Ctrl]] 을 씁니다." },
          ],
        },
        {
          id: "safety",
          title: "안전한가요?",
          blocks: [
            {
              kind: "list",
              items: [
                "히스토리 조작은 `git merge-tree` 로 작업 폴더를 건드리지 않고 먼저 계산합니다. 충돌이 날 것 같으면 아무것도 바꾸지 않고 충돌 파일을 알려 줍니다.",
                "현재 브랜치가 바뀌면 `git reset --keep` 으로 작업 폴더를 맞춥니다. 로컬 변경은 그대로 두고, 덮어써질 것 같으면 git 이 거절합니다.",
                "조작하기 전의 브랜치 위치는 `refs/yggdrasil/backup/` 에 남아서 \"예전 커밋 찾기\" 에서 다시 찾을 수 있습니다.",
              ],
            },
          ],
        },
        {
          id: "privacy",
          title: "개인정보와 보안",
          blocks: [
            {
              kind: "list",
              items: [
                "Yggdrasil 은 설치된 git 을 실행할 뿐, 코드를 어디에도 보내지 않습니다.",
                "GitHub 토큰은 운영체제 키체인으로 암호화해 두고, git 에는 github.com 에 한해서 환경 변수로만 넘깁니다. 명령 인자로는 넘기지 않습니다.",
                "다른 호스트의 비밀번호 · 토큰은 시스템 git 자격 증명 도우미에 바로 저장되고, 앱은 따로 보관하지 않습니다.",
                "이 웹사이트는 개인정보를 수집하지 않습니다. 표시 언어(한국어 · 영어)를 기억하는 쿠키 하나만 브라우저에 저장하며, 1년 뒤 자동으로 지워지고 브라우저에서 언제든 지울 수 있습니다.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "troubleshooting",
      title: "문제 해결",
      topics: [
        {
          id: "mac-blocked",
          title: "macOS: 앱이 열리지 않아요",
          blocks: [
            {
              kind: "steps",
              items: [
                "\"Yggdrasil\"이(가) 열리지 않았습니다 창이 뜨면 \"완료\" 를 누릅니다. 휴지통으로 옮기지 마세요.",
                "시스템 설정 › 개인정보 보호 및 보안 을 열고, 아래 보안 항목의 Yggdrasil 옆 \"그래도 열기\" 를 누릅니다.",
                "암호나 Touch ID 로 확인합니다. 다음부터는 바로 열립니다.",
              ],
            },
            { kind: "p", text: "\"손상되었기 때문에 열 수 없습니다\" 가 뜨면 터미널에서 한 번 실행한 뒤 다시 엽니다." },
            { kind: "command", command: MAC_QUARANTINE_COMMAND },
          ],
        },
        {
          id: "windows-blocked",
          title: "Windows: \"Windows의 PC 보호\" 가 떠요",
          blocks: [
            { kind: "steps", items: ["\"추가 정보\" 를 누릅니다.", "앱 이름이 Yggdrasil 인지 확인하고 \"실행\" 을 누릅니다."] },
          ],
        },
        {
          id: "keychain",
          title: "macOS: 키체인 암호를 물어요",
          blocks: [
            { kind: "p", text: "GitHub 에 로그인해 둔 상태에서 앱을 업데이트하면 \"키체인에 저장된 'Yggdrasil Safe Storage' 를 사용하려고 합니다\" 창이 뜰 수 있습니다. 내 Mac 로그인 암호를 넣고 \"항상 허용\" 을 누르면 됩니다." },
            { kind: "p", text: "아직 서명하지 않은 앱이라 업데이트할 때마다 한 번씩 물을 수 있습니다." },
          ],
        },
        {
          id: "git-missing",
          title: "git 을 찾을 수 없다고 나와요",
          blocks: [
            { kind: "p", text: "터미널에서 버전을 확인합니다. 2.38 이상이 필요합니다. 없거나 낮으면 git-scm.com 에서 새로 설치한 뒤 앱을 다시 엽니다." },
            { kind: "command", command: "git --version" },
          ],
        },
        {
          id: "remote-errors",
          title: "push · pull 이 실패해요",
          blocks: [
            { kind: "p", text: "앱이 원인과 해결 방법을 함께 보여 줍니다. 자주 나오는 경우는 다음과 같습니다." },
            {
              kind: "list",
              items: [
                "SSH 키가 등록되지 않음: 키를 만들어 GitHub(또는 서버)에 등록하고, SSH 에이전트에 추가합니다. 앱은 암호를 묻느라 멈추지 않도록 SSH 를 질문 없이 실행합니다.",
                "호스트 키를 모름: 터미널에서 그 주소로 한 번 접속해 호스트 키를 받아 둡니다.",
                "권한 없음: 그 저장소에 push 권한이 있는 계정인지, 토큰에 저장소 권한이 있는지 확인합니다.",
                "원격과 갈라짐: 먼저 Pull 합니다. 그대로 push 하면 덮어쓰므로 앱이 한 번 더 확인합니다.",
              ],
            },
          ],
        },
      ],
    },
  ],
  help: { text: "여기서 해결되지 않으면 GitHub 이슈로 알려 주세요.", link: "GitHub 이슈 열기 ↗" },
};

export default ko;

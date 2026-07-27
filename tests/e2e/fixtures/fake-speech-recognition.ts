/**
 * react-hook-speech-to-text instantiates window.SpeechRecognition once at
 * module load time (not lazily inside the hook), so this must be injected
 * via page.addInitScript() before the app's bundle evaluates - real browser
 * speech recognition needs an actual microphone and a live connection to
 * the vendor's recognition service, neither of which is available in CI.
 */
export const FAKE_TRANSCRIPT =
  "A closure is a function that retains access to its lexical scope even when invoked outside that scope.";

export function installFakeSpeechRecognition() {
  const transcript = FAKE_TRANSCRIPT;
  class FakeSpeechRecognition {
    continuous = false;
    interimResults = false;
    lang = "en-US";
    maxAlternatives = 1;
    onresult: ((event: unknown) => void) | null = null;
    onaudiostart: (() => void) | null = null;
    onend: (() => void) | null = null;
    private timer: ReturnType<typeof setTimeout> | null = null;

    start() {
      this.onaudiostart?.();
      this.timer = setTimeout(() => {
        const result = Object.assign([{ transcript, confidence: 0.9 }], { isFinal: true });
        this.onresult?.({ resultIndex: 0, results: [result] });
      }, 200);
    }

    stop() {
      if (this.timer) clearTimeout(this.timer);
      this.onend?.();
    }
  }

  // @ts-expect-error - test-only global shim
  window.SpeechRecognition = FakeSpeechRecognition;
  // @ts-expect-error - test-only global shim
  window.webkitSpeechRecognition = FakeSpeechRecognition;
}

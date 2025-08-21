// components/Results.tsx
import { createPortal } from "react-dom";

type ResultsProps = {
  game: string;
  outcome: boolean;
  guesses: number;
  onClose: () => void;
};

export const Results = ({ game, outcome, guesses, onClose }: ResultsProps) => {
  const modalRoot = document.getElementById("modal-root")!;
  return createPortal(
    (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50" onClick={onClose} />
        <div
          role="dialog"
          aria-modal="true"
          className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
        >
          <button
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>

          <h2 className="mb-4 text-xl font-bold">{game} Results</h2>
          <p className="mb-2">{outcome ? "You won!" : "You lost."}</p>
          <p className="mb-6">Guesses: {guesses}</p>

          <button
            onClick={onClose}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    ),
    modalRoot
  );
}

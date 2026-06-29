import React from "react";

// Utils
import { readFromLocalStorage } from "@/utils/localStorage";

// Constants
import { LS_KEY_LIST } from "@/constants/localStorage";

// Typings
import { UserData } from "@/typings/user";

type Achievement =
  | {
      type: "wins";
      title: string;
      description: string;
      target: number;
    }
  | {
      type: "time";
      title: string;
      description: string;
      timeLimit: number;
    }
  | {
      type: "readNews";
      title: string;
      description: string;
    };

const achievements: Achievement[] = [
  {
    type: "wins",
    title: "Neofita 📚",
    description: "Vinci la tua prima partita",
    target: 1,
  },
  {
    type: "wins",
    title: "Esperto 🎯",
    description: "Raggiungi 10 vittorie",
    target: 10,
  },
  {
    type: "wins",
    title: "Veterano 🏅",
    description: "Raggiungi 50 vittorie",
    target: 50,
  },
  {
    type: "wins",
    title: "Leggenda 👑",
    description: "Raggiungi 100 vittorie",
    target: 100,
  },
  {
    type: "time",
    title: "Freccia 🏹",
    description: "Vinci una partita in 3 minuti o meno",
    timeLimit: 180,
  },
  {
    type: "time",
    title: "Velocista 🏎️",
    description: "Vinci una partita in 2 minuti o meno",
    timeLimit: 120,
  },
  {
    type: "time",
    title: "Fulmine ⚡",
    description: "Vinci una partita in 100 secondi o meno",
    timeLimit: 100,
  },
  {
    type: "readNews",
    title: "Informato 📰",
    description: "Leggi almeno una notizia",
  },
];

const Achievements: React.FC = () => {
  const storedUserData: UserData | null = readFromLocalStorage(
    LS_KEY_LIST.USER_DATA,
  );

  const storedReadNews: number | null = readFromLocalStorage(
    LS_KEY_LIST.READ_NEWS,
  );

  const matchesWon = storedUserData?.matchesWon || 0;
  const bestTime = storedUserData?.bestTime || 0;

  const isCompleted = (a: Achievement) => {
    if (a.type === "wins") {
      return matchesWon >= a.target;
    }

    if (a.type === "time") {
      return bestTime > 0 && bestTime <= a.timeLimit;
    }

    if (a.type === "readNews") {
      return storedReadNews !== null && storedReadNews > 0;
    }

    return false;
  };

  const getProgress = (a: Achievement) => {
    if (a.type === "wins") {
      return Math.min(matchesWon, a.target);
    }
    return 0;
  };

  return (
    <div>
      <div className="row g-2">
        {achievements.map((a, idx) => {
          const completed = isCompleted(a);

          return (
            <div key={idx} className="col-6">
              <div
                className={`p-2 h-100 rounded border position-relative d-flex flex-column justify-content-between overflow-hidden ${
                  completed
                    ? "bg-success-subtle border-success"
                    : "bg-body-secondary"
                }`}
              >
                <div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="achievement-title small lh-sm">
                      {a.title}
                    </div>

                    <div className="ms-auto d-flex align-items-center">
                      {completed ? (
                        <span className="achievement-status completed">✔</span>
                      ) : (
                        <span className="achievement-status locked">🔒</span>
                      )}
                    </div>
                  </div>

                  <p className="achievement-desc mt-1 mb-0">{a.description}</p>
                </div>

                {a.type === "wins" && (
                  <div>
                    <div className="d-flex justify-content-between small mt-2">
                      <span>
                        {getProgress(a)}/{a.target}
                      </span>
                      <span>
                        {Math.round((getProgress(a) / a.target) * 100)}%
                      </span>
                    </div>

                    <div
                      className="border progress mt-1"
                      style={{ height: 10 }}
                    >
                      <div
                        className={`${completed ? "bg-success" : "bg-primary"}`}
                        style={{
                          width: `${(getProgress(a) / a.target) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                {a.type === "time" && (
                  <div className="mt-2">
                    {bestTime > 0 ? (
                      <div className="small">
                        {!completed && (
                          <span className="text-muted">
                            Il tuo miglior tempo è {bestTime}s
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="small text-muted">
                        Nessuna vittoria ancora registrata
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;

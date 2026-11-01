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
      type: "levels";
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

type AchievementCategory = {
  type: Achievement["type"];
  title: string;
  icon: string;
  description: string;
};

const categories: AchievementCategory[] = [
  {
    type: "wins",
    title: "Vittorie",
    icon: "🏆",
    description: "Dimostra di essere un vero campione",
  },
  {
    type: "time",
    title: "Velocità",
    icon: "⚡",
    description: "Metti alla prova la tua rapidità",
  },
  {
    type: "levels",
    title: "Livelli",
    icon: "🧩",
    description: "Completa tutti i livelli del gioco",
  },
  {
    type: "readNews",
    title: "Esplorazione",
    icon: "📰",
    description: "Scopri tutte le novità",
  },
];

const achievements: Achievement[] = [
  {
    type: "wins",
    title: "Neofita 📚",
    description: "Vinci la tua prima partita in modalità Random",
    target: 1,
  },
  {
    type: "wins",
    title: "Esperto 🎯",
    description: "Raggiungi 10 vittorie in modalità Random",
    target: 10,
  },
  {
    type: "wins",
    title: "Veterano 🏅",
    description: "Raggiungi 50 vittorie in modalità Random",
    target: 50,
  },
  {
    type: "wins",
    title: "Leggenda 👑",
    description: "Raggiungi 100 vittorie in modalità Random",
    target: 100,
  },
  {
    type: "time",
    title: "Freccia 🏹",
    description: "Vinci una partita in modalità Random in 3 minuti o meno",
    timeLimit: 180,
  },
  {
    type: "time",
    title: "Velocista 🏎️",
    description: "Vinci una partita in modalità Random in 2 minuti o meno",
    timeLimit: 120,
  },
  {
    type: "time",
    title: "Fulmine ⚡",
    description: "Vinci una partita in modalità Random in 100 secondi o meno",
    timeLimit: 100,
  },
  {
    type: "levels",
    title: "Rompighiaccio 🧊",
    description: "Completa il primo livello",
    target: 1,
  },
  {
    type: "levels",
    title: "Scalatore 🧗",
    description: "Completa il livello 10",
    target: 10,
  },
  {
    type: "levels",
    title: "Paroliere ✍️",
    description: "Completa il livello 50",
    target: 50,
  },
  {
    type: "levels",
    title: "Enigmista 🧠",
    description: "Completa il livello 100",
    target: 100,
  },
  {
    type: "readNews",
    title: "Informato 📰",
    description: "Leggi almeno una volta la sezione News",
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
  const lastLevelCompleted = storedUserData?.lastLevelCompleted || 0;

  const isCompleted = (a: Achievement): boolean => {
    switch (a.type) {
      case "wins":
        return matchesWon >= a.target;

      case "time":
        return bestTime > 0 && bestTime <= a.timeLimit;

      case "levels":
        return lastLevelCompleted >= a.target;

      case "readNews":
        return storedReadNews !== null && storedReadNews > 0;
    }
  };

  const getProgress = (a: Achievement): number => {
    if (a.type === "wins") {
      return Math.min(matchesWon, a.target);
    }

    if (a.type === "levels") {
      return Math.min(lastLevelCompleted, a.target);
    }

    return 0;
  };

  return (
    <div className="achievements">
      {/* Achievement categories */}
      {categories.map((category) => {
        const categoryAchievements = achievements.filter(
          (a) => a.type === category.type,
        );

        const completedCount = categoryAchievements.filter(isCompleted).length;

        return (
          <section key={category.type} className="mb-4">
            {/* Category heading */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-body-secondary"
                style={{
                  width: 44,
                  height: 44,
                  flexShrink: 0,
                  fontSize: "1.35rem",
                }}
              >
                {category.icon}
              </div>

              <div className="flex-grow-1">
                <h6 className="fw-bold mb-1">{category.title}</h6>
                <p className="text-muted small mb-0">{category.description}</p>
              </div>

              <span
                className={`badge rounded-pill ${
                  completedCount === categoryAchievements.length
                    ? "text-bg-success"
                    : "text-bg-secondary"
                }`}
              >
                {completedCount}/{categoryAchievements.length}
              </span>
            </div>

            {/* Cards */}
            <div className="row g-2">
              {categoryAchievements.map((a) => {
                const completed = isCompleted(a);

                return (
                  <div key={`${a.type}-${a.title}`} className="col-6">
                    <div
                      className={`achievement-card p-3 h-100 rounded-3 border d-flex flex-column justify-content-between ${
                        completed
                          ? "bg-success-subtle border-success"
                          : "bg-body-secondary border-transparent"
                      }`}
                    >
                      <div>
                        <div className="d-flex align-items-start gap-2">
                          <div className="achievement-title fw-semibold small lh-sm flex-grow-1">
                            {a.title}
                          </div>

                          <span
                            className={`achievement-status ${
                              completed ? "completed" : "locked"
                            }`}
                            aria-label={
                              completed ? "Achievement sbloccato" : "Bloccato"
                            }
                            title={
                              completed ? "Achievement sbloccato" : "Bloccato"
                            }
                          >
                            {completed ? "✔" : "🔒"}
                          </span>
                        </div>

                        <p className="achievement-desc text-muted small mt-2 mb-0">
                          {a.description}
                        </p>
                      </div>

                      {/* Wins and levels progress */}
                      {(a.type === "wins" || a.type === "levels") && (
                        <div className="mt-3">
                          <div className="d-flex justify-content-between align-items-center small mb-1">
                            <span className="text-muted">
                              {getProgress(a)}/{a.target}
                            </span>
                            <span className="fw-semibold">
                              {Math.round((getProgress(a) / a.target) * 100)}%
                            </span>
                          </div>

                          <div
                            className="progress border"
                            style={{ height: 6 }}
                            role="progressbar"
                            aria-label={`Progresso: ${a.title}`}
                            aria-valuenow={getProgress(a)}
                            aria-valuemin={0}
                            aria-valuemax={a.target}
                          >
                            <div
                              className={`progress-bar ${
                                completed ? "bg-success" : "bg-primary"
                              }`}
                              style={{
                                width: `${(getProgress(a) / a.target) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}

                      {/* Time progress */}
                      {a.type === "time" && (
                        <div className="mt-3 small">
                          {bestTime > 0 ? (
                            <span
                              className={
                                completed
                                  ? "text-success fw-semibold"
                                  : "text-muted"
                              }
                            >
                              {completed
                                ? `Record: ${bestTime}s`
                                : `Il tuo record: ${bestTime}s`}
                            </span>
                          ) : (
                            <span className="text-muted">
                              Nessuna vittoria registrata
                            </span>
                          )}
                        </div>
                      )}

                      {/* News status */}
                      {a.type === "readNews" && (
                        <div className="mt-3 small">
                          <span
                            className={
                              completed
                                ? "text-success fw-semibold"
                                : "text-muted"
                            }
                          >
                            {completed ? "Hai letto le News" : "Da completare"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Achievements;

import React, { useRef, useEffect } from "react";

type ConfettiParticle = {
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  gravity: number;
  drag: number;
};

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const createConfetti = (
    canvas: HTMLCanvasElement,
    count: number
  ): ConfettiParticle[] => {
    const confetti: ConfettiParticle[] = [];
    for (let i = 0; i < count; i++) {
      confetti.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        size: Math.random() * 8 + 4,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        velocityX: (Math.random() - 0.5) * 10,
        velocityY: (Math.random() - 0.5) * 10,
        gravity: 0.1,
        drag: 0.98,
      });
    }
    return confetti;
  };

  const drawConfetti = (
    ctx: CanvasRenderingContext2D,
    confetti: ConfettiParticle[]
  ) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    confetti.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
  };

  const updateConfetti = (confetti: ConfettiParticle[]) => {
    confetti.forEach((particle) => {
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.velocityY += particle.gravity;
      particle.velocityX *= particle.drag;
      particle.velocityY *= particle.drag;
    });
  };

  const handleExplode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const confetti = createConfetti(canvas, 50);
    const animate = () => {
      drawConfetti(ctx, confetti);
      updateConfetti(confetti);
      requestAnimationFrame(animate);
    };

    animate();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      canvas.width = viewportWidth;
      canvas.height = viewportHeight;
    }
    handleExplode();
  }, []);

  return <canvas ref={canvasRef} className="confetti__canvas" />;
};

export default Confetti;

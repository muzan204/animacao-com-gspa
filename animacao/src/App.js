import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

function App() {
  const STEP = 60;
  const BOX_SIZE = 80;

  const containerRef = useRef(null);

  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [autoAnim, setAutoAnim] = useState(false);

  // função de limite
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  // movimento com limite
  const move = (dx, dy) => {
    const container = containerRef.current;

    const maxX = container.offsetWidth - BOX_SIZE;
    const maxY = container.offsetHeight - BOX_SIZE;

    setPosition(prev => ({
      x: clamp(prev.x + dx * STEP, 0, maxX),
      y: clamp(prev.y + dy * STEP, 0, maxY)
    }));
  };

  // animação automática
  useEffect(() => {
    if (!autoAnim) return;

    const container = containerRef.current;

    const maxX = container.offsetWidth - BOX_SIZE;
    const maxY = container.offsetHeight - BOX_SIZE;

    let direction = 1;

    const interval = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x + direction * 100;
        let newY = prev.y + direction * 80;

        if (newX >= maxX || newX <= 0) direction *= -1;

        return {
          x: clamp(newX, 0, maxX),
          y: clamp(newY, 0, maxY)
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [autoAnim]);

  return (
    <div style={styles.app}>
      <h1 style={styles.title}>React + Framer Motion 🚀</h1>

      <div ref={containerRef} style={styles.container}>
        <motion.div
          drag
          dragConstraints={containerRef}
          className="box"
          animate={position}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 10
          }}
          onDragEnd={(e, info) => {
            setPosition({
              x: info.point.x - containerRef.current.offsetLeft,
              y: info.point.y - containerRef.current.offsetTop
            });
          }}
          style={styles.box}
        >
          🔥
        </motion.div>
      </div>

      <div style={styles.controls}>
        <button onClick={() => move(0, -1)}>↑</button>
        <button onClick={() => move(0, 1)}>↓</button>
        <button onClick={() => move(-1, 0)}>←</button>
        <button onClick={() => move(1, 0)}>→</button>
        <button onClick={() => setAutoAnim(!autoAnim)}>
          {autoAnim ? "Parar" : "Auto"}
        </button>
      </div>
    </div>
  );
}

// 🎨 estilos no mesmo arquivo
const styles = {
  app: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #e0f7fa, #b2ebf2)",
    fontFamily: "Segoe UI"
  },

  title: {
    color: "#004d40"
  },

  container: {
    width: "90%",
    maxWidth: "800px",
    height: "400px",
    background: "#fff",
    borderRadius: "15px",
    position: "relative",
    overflow: "hidden",
    margin: "20px 0"
  },

  box: {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #ff9800, #ffc107)",
    borderRadius: "12px",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "grab",
    fontSize: "24px"
  },

  controls: {
    display: "flex",
    gap: "10px"
  }
};

export default App;
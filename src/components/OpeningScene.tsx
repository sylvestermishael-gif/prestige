/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface OpeningSceneProps {
  onEnter: () => void;
  key?: React.Key;
}

// Struct for high-fidelity star field
interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
  hasFlare: boolean;
}

// Struct for Earth Land point (pre-calculated 3D Cartesian coordinates)
interface EarthPoint {
  x: number; // Unit sphere X
  y: number; // Unit sphere Y
  z: number; // Unit sphere Z
  isLand: boolean;
  colorType: 'forest' | 'sand' | 'ice' | 'city';
}

// High-fidelity procedural Earth map generator
const getLandType = (lat: number, lon: number): { isLand: boolean; colorType: 'forest' | 'sand' | 'ice' | 'city' } => {
  let isLand = false;
  let colorType: 'forest' | 'sand' | 'ice' | 'city' = 'forest';

  // Antarctica Polar Cap
  if (lat < -1.25) {
    return { isLand: true, colorType: 'ice' };
  }
  // Greenland Polar Cap
  if (lat > 1.05 && lon > -1.1 && lon < -0.4) {
    return { isLand: true, colorType: 'ice' };
  }

  // Africa Continent
  if (lon > -0.3 && lon < 0.9 && lat > -0.6 && lat < 0.65) {
    const bightOfBenin = lon > -0.2 && lon < 0.18 && lat > 0.05 && lat < 0.14;
    if (!bightOfBenin) {
      isLand = true;
      // Sahara desert band
      if (lat > 0.15 && lat < 0.5) {
        colorType = 'sand';
      }
    }
  }
  // South America Continent
  else if (lon > -1.45 && lon < -0.6 && lat > -1.0 && lat < 0.25) {
    const isInsideSA = lon > -1.4 && lon < -0.6 + (lat < -0.2 ? (lat + 0.2) * 0.55 : 0);
    if (isInsideSA) {
      isLand = true;
    }
  }
  // North America Continent
  else if (lon > -2.2 && lon < -0.9 && lat >= 0.25 && lat < 1.1) {
    const inGulf = lon > -1.7 && lon < -1.4 && lat > 0.3 && lat < 0.52;
    if (!inGulf) {
      isLand = true;
      if (lat > 0.55 && lat < 0.78 && lon > -1.8 && lon < -1.3) {
        colorType = 'sand'; // Southwest deserts
      }
    }
  }
  // Europe Continent
  else if (lon > -0.25 && lon < 0.8 && lat >= 0.62 && lat < 1.25) {
    isLand = true;
  }
  // Asia Continent
  else if (lon >= 0.8 && lon < 3.0 && lat >= -0.15 && lat < 1.35) {
    isLand = true;
    // Arabian & Gobi Deserts
    if (lat > 0.15 && lat < 0.5 && lon > 0.6 && lon < 1.3) {
      colorType = 'sand'; // Middle East
    } else if (lat > 0.55 && lat < 0.82 && lon > 1.4 && lon < 2.0) {
      colorType = 'sand'; // Gobi / Taklamakan
    }
  }
  // Australia Continent
  else if (lon > 1.95 && lon < 2.7 && lat > -0.75 && lat < -0.18) {
    isLand = true;
    if (Math.random() < 0.72) {
      colorType = 'sand';
    }
  }

  // High-frequency shoreline crinkles and island seeds (fractal detail)
  const noise = Math.sin(lat * 26) * Math.cos(lon * 26) * 0.12 + 
                Math.sin(lat * 52 + lon * 26) * 0.05 +
                Math.cos(lat * 14 - lon * 38) * 0.03;
                
  if (isLand) {
    if (noise < -0.07) {
      isLand = false;
    }
  } else {
    if (noise > 0.18) {
      isLand = true;
      if (lat > 0.8) colorType = 'ice';
    }
  }

  // Realistic city light hubs concentration on dark side
  if (isLand && colorType !== 'ice') {
    const isUS_East = lon > -1.4 && lon < -0.9 && lat > 0.45 && lat < 0.75;
    const isEurope_Core = lon > -0.1 && lon < 0.5 && lat > 0.65 && lat < 0.95;
    const isAsia_Core = lon > 1.8 && lon < 2.5 && lat > 0.35 && lat < 0.8;
    
    const density = (isUS_East || isEurope_Core || isAsia_Core) ? 0.38 : 0.07;
    if (Math.random() < density) {
      colorType = 'city';
    }
  }

  return { isLand, colorType };
};

export default function OpeningScene({ onEnter }: OpeningSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'intro' | 'flight' | 'completed'>('intro');
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const pointsRef = useRef<EarthPoint[]>([]);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<{ x: number; y: number; length: number; speed: number; alpha: number; angle: number }[]>([]);
  const frameIdRef = useRef<number | null>(null);

  // Initialization: Generate 600 twinkling stars and high-density 9,000 Earth points
  useEffect(() => {
    // 1. Starfield setup
    const stars: Star[] = [];
    const starColors = [
      'rgba(186, 230, 253, ', // Ice blue
      'rgba(254, 240, 138, ', // Warm yellow
      'rgba(255, 255, 255, ', // Pure white
      'rgba(253, 186, 116, ', // Soft amber
    ];
    for (let i = 0; i < 600; i++) {
      stars.push({
        x: Math.random() * 3000 - 1500,
        y: Math.random() * 3000 - 1500,
        size: Math.random() * 1.8 + 0.3,
        alpha: Math.random(),
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkleSpeed: Math.random() * 0.02 + 0.004,
        twinklePhase: Math.random() * Math.PI * 2,
        hasFlare: Math.random() < 0.07,
      });
    }
    starsRef.current = stars;

    // 2. High-density Fibonacci point-cloud setup
    const points: EarthPoint[] = [];
    const count = 9000;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = i * 2.399963; // golden angle increment

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      const lon = Math.atan2(z, x);
      const lat = Math.asin(y);

      const land = getLandType(lat, lon);
      points.push({
        x,
        y,
        z,
        isLand: land.isLand,
        colorType: land.colorType,
      });
    }
    pointsRef.current = points;
  }, []);

  // Main Render Frame Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let earthRotation = 0;
    let cloudsRotation = 0;
    let cameraZoom = 1;
    let flightAlpha = 0;
    let clockTime = 0;

    const animate = () => {
      clockTime += 0.015;

      // Draw rich interstellar space gradient background
      const bgGrad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 10,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      bgGrad.addColorStop(0, '#020617'); // Space black/deep navy
      bgGrad.addColorStop(0.5, '#01040f');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Mouse Parallax easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const centerX = canvas.width / 2 + mouseRef.current.x * 20;
      const centerY = canvas.height / 2 + mouseRef.current.y * 20;

      // 1. Draw rich background interstellar nebula clouds
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      
      const neb1 = ctx.createRadialGradient(
        canvas.width * 0.3 + mouseRef.current.x * 50, canvas.height * 0.4 + mouseRef.current.y * 50, 0,
        canvas.width * 0.3, canvas.height * 0.4, Math.max(canvas.width, canvas.height) * 0.65
      );
      neb1.addColorStop(0, 'rgba(88, 28, 135, 0.09)'); // deep violet dust
      neb1.addColorStop(0.5, 'rgba(124, 58, 237, 0.03)');
      neb1.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const neb2 = ctx.createRadialGradient(
        canvas.width * 0.7 + mouseRef.current.x * -40, canvas.height * 0.65 + mouseRef.current.y * -40, 0,
        canvas.width * 0.7, canvas.height * 0.65, Math.max(canvas.width, canvas.height) * 0.75
      );
      neb2.addColorStop(0, 'rgba(14, 116, 144, 0.06)'); // cosmic teal dust
      neb2.addColorStop(0.6, 'rgba(6, 182, 212, 0.02)');
      neb2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.restore();

      // 2. Draw realistic, organically twinkling starfield
      ctx.save();
      ctx.translate(mouseRef.current.x * 12, mouseRef.current.y * 12);
      starsRef.current.forEach(star => {
        // Calculate smooth continuous wave twinkling
        const twinkle = Math.sin(clockTime * star.twinkleSpeed * 100 + star.twinklePhase) * 0.35 + 0.65;
        ctx.fillStyle = `${star.color}${Math.max(0, Math.min(1, star.alpha * twinkle))})`;

        if (phase === 'flight') {
          // Accelerating warp stretch effect on flight
          const dx = star.x;
          const dy = star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const stretch = 1 + flightAlpha * 14;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(186, 230, 253, ${Math.max(0, 0.5 - flightAlpha)})`;
          ctx.lineWidth = star.size * 0.7;
          ctx.moveTo(canvas.width / 2 + dx, canvas.height / 2 + dy);
          ctx.lineTo(canvas.width / 2 + dx * stretch, canvas.height / 2 + dy * stretch);
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(canvas.width / 2 + star.x, canvas.height / 2 + star.y, star.size, 0, Math.PI * 2);
          ctx.fill();

          // Render cross lens flares for ultra-bright foreground stars
          if (star.hasFlare && star.size > 1.3) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${star.alpha * twinkle * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            // Horizontal line
            ctx.moveTo(canvas.width / 2 + star.x - 5, canvas.height / 2 + star.y);
            ctx.lineTo(canvas.width / 2 + star.x + 5, canvas.height / 2 + star.y);
            // Vertical line
            ctx.moveTo(canvas.width / 2 + star.x, canvas.height / 2 + star.y - 5);
            ctx.lineTo(canvas.width / 2 + star.x, canvas.height / 2 + star.y + 5);
            ctx.stroke();
          }
        }
      });
      ctx.restore();

      // 3. Periodic cinematic shooting stars
      if (Math.random() < 0.015 && shootingStarsRef.current.length < 3) {
        shootingStarsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.45),
          length: Math.random() * 100 + 50,
          speed: Math.random() * 14 + 10,
          alpha: 1,
          angle: Math.PI / 5 + Math.random() * 0.08,
        });
      }

      shootingStarsRef.current.forEach((ss, idx) => {
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.02;

        if (ss.alpha <= 0) {
          shootingStarsRef.current.splice(idx, 1);
        } else {
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            ss.x, ss.y,
            ss.x - Math.cos(ss.angle) * ss.length, ss.y - Math.sin(ss.angle) * ss.length
          );
          gradient.addColorStop(0, `rgba(254, 215, 170, ${ss.alpha})`); // Orange/Coral glow tip
          gradient.addColorStop(0.2, `rgba(186, 230, 253, ${ss.alpha * 0.85})`); // Ice blue
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.6;
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(ss.x - Math.cos(ss.angle) * ss.length, ss.y - Math.sin(ss.angle) * ss.length);
          ctx.stroke();
        }
      });

      // 4. Update orbital rotation
      earthRotation += 0.0012;
      cloudsRotation += 0.0016;

      let earthRadius = Math.min(canvas.width, canvas.height) * 0.23;
      
      if (phase === 'flight') {
        cameraZoom += (flightAlpha * 0.13);
        earthRadius = earthRadius * Math.pow(cameraZoom, 2.6);
        flightAlpha += 0.008;

        if (flightAlpha >= 1) {
          setPhase('completed');
          onEnter();
          if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
          return;
        }
      }

      // 5. Custom Atmospheric Rayleigh Scattering Shader (Multi-layered bloom)
      if (earthRadius < canvas.width * 2) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        // Multi-layered light scattering rings (glowing blue-cyan atmosphere dome)
        const atmosphereLayers = 6;
        for (let a = 0; a < atmosphereLayers; a++) {
          const layerRadius = earthRadius * (1.0 + a * 0.022);
          const layerGlow = ctx.createRadialGradient(
            centerX - earthRadius * 0.24 * (1 - flightAlpha), 
            centerY - earthRadius * 0.24 * (1 - flightAlpha), 
            earthRadius * 0.88,
            centerX, 
            centerY, 
            layerRadius
          );
          // High-fidelity spectral coloring
          layerGlow.addColorStop(0, 'rgba(56, 189, 248, 0.22)'); // Intense Cyan-Blue
          layerGlow.addColorStop(0.25, 'rgba(14, 165, 233, 0.12)'); // Atmosphere blue
          layerGlow.addColorStop(0.65, 'rgba(3, 105, 161, 0.05)'); // Ocean deep blue
          layerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = layerGlow;
          ctx.beginPath();
          ctx.arc(centerX, centerY, layerRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        // 6. Draw deep ocean blue sphere (Sun shadow base)
        ctx.beginPath();
        const sphereGrad = ctx.createRadialGradient(
          centerX - earthRadius * 0.28 * (1 - flightAlpha), centerY - earthRadius * 0.28 * (1 - flightAlpha), earthRadius * 0.1,
          centerX, centerY, earthRadius
        );
        sphereGrad.addColorStop(0, '#1e40af'); // Light ocean blue specular zone
        sphereGrad.addColorStop(0.55, '#1e3a8a'); // Middle ocean navy
        sphereGrad.addColorStop(1, '#020617'); // Dark side
        ctx.fillStyle = sphereGrad;
        ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 7. Render high-resolution detailed Earth point-cloud (rotated in 3D Cartesian coordinates)
      ctx.save();
      if (earthRadius < canvas.width * 2) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
        ctx.clip();
      }

      const points = pointsRef.current;
      points.forEach(pt => {
        // Pre-calculated rotation using fast 3D matrix math around Y-axis
        let currentRotation = earthRotation;
        let ry = pt.y;
        
        if (phase === 'flight') {
          const ease = Math.min(1, flightAlpha * 2);
          // Direct camera alignment towards the West African coastline vector
          currentRotation = earthRotation * (1 - ease) + (-0.05) * ease;
          ry = pt.y * (1 - ease) + (pt.y - 0.11) * ease;
        }

        // Rotate X and Z coordinates
        const rx = pt.x * Math.cos(currentRotation) - pt.z * Math.sin(currentRotation);
        const rz = pt.x * Math.sin(currentRotation) + pt.z * Math.cos(currentRotation);

        // Only draw points on the visible facing hemisphere (Z pointing towards camera)
        if (rz >= 0) {
          const px = centerX + rx * earthRadius;
          const py = centerY + ry * earthRadius;

          // Sunlight calculation based on distance from top-left light source
          const distToSun = Math.sqrt(
            Math.pow(px - (centerX - earthRadius * 0.65), 2) + 
            Math.pow(py - (centerY - earthRadius * 0.65), 2)
          );
          const sunIntensity = Math.max(0, 1 - distToSun / (earthRadius * 1.55));

          if (pt.isLand) {
            // Draw landmasses
            if (sunIntensity > 0.18) {
              // Sunset/Sunrise Terminator glow lines (Amber scattering along sunset belt)
              if (sunIntensity >= 0.18 && sunIntensity <= 0.32) {
                const sunsetFactor = 1 - Math.abs(sunIntensity - 0.25) / 0.07;
                ctx.fillStyle = `rgba(249, 115, 22, ${0.5 + sunsetFactor * 0.5})`; // Fiery orange terminator
              } else {
                if (pt.colorType === 'sand') {
                  ctx.fillStyle = `rgba(244, 219, 186, ${0.45 + sunIntensity * 0.55})`; // Sahara / Outback sand
                } else if (pt.colorType === 'ice') {
                  ctx.fillStyle = `rgba(248, 250, 252, ${0.65 + sunIntensity * 0.35})`; // Glaciers
                } else {
                  ctx.fillStyle = `rgba(16, 185, 129, ${0.4 + sunIntensity * 0.6})`; // Deep forest emerald green
                }
              }
            } else {
              // Dark Side: Beautiful warm city lights
              if (pt.colorType === 'city' || Math.random() < 0.15) {
                const alpha = (1 - sunIntensity * 5.5) * 0.85;
                ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`; // Amber city core lights
              } else {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.15)'; // Shaded land
              }
            }

            // High performance optimized square pixels for tiny points, circle arcs for larger visible dots
            const dotSize = Math.max(0.65, (earthRadius / 250) * (0.55 + sunIntensity * 0.45));
            ctx.beginPath();
            ctx.arc(px, py, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // 8. Custom Rayleigh Inner Atmosphere Limb scatter over the Earth surface
      if (earthRadius < canvas.width * 2) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        
        const innerLimb = ctx.createRadialGradient(
          centerX - earthRadius * 0.35, centerY - earthRadius * 0.35, earthRadius * 0.3,
          centerX, centerY, earthRadius
        );
        innerLimb.addColorStop(0, 'rgba(56, 189, 248, 0)');
        innerLimb.addColorStop(0.75, 'rgba(56, 189, 248, 0.08)');
        innerLimb.addColorStop(0.93, 'rgba(186, 230, 253, 0.28)'); // Intense atmospheric limb
        innerLimb.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = innerLimb;
        ctx.beginPath();
        ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      }

      // 9. Floating cloud cover layers
      if (earthRadius < canvas.width * 2) {
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        for (let i = 0; i < 45; i++) {
          const cloudLon = (i * 0.14) + cloudsRotation;
          const cloudLat = Math.sin(i * 0.25) * 0.55;
          const cosCloudLon = Math.cos(cloudLon);
          if (cosCloudLon >= 0) {
            const cloudRadius = earthRadius * 1.025;
            const px = centerX + cloudRadius * Math.cos(cloudLat) * Math.sin(cloudLon);
            const py = centerY + cloudRadius * Math.sin(cloudLat);
            
            const gr = ctx.createRadialGradient(px, py, 2, px, py, earthRadius * 0.16);
            gr.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
            gr.addColorStop(0.4, 'rgba(255, 255, 255, 0.1)');
            gr.addColorStop(1, 'rgba(255, 255, 255, 0)');
            ctx.fillStyle = gr;
            ctx.beginPath();
            ctx.arc(px, py, earthRadius * 0.16, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      }
      ctx.restore();

      // 10. Late descent transitions (passing city limits and skyline)
      if (phase === 'flight') {
        const transitionThreshold = 0.58;
        if (flightAlpha > transitionThreshold) {
          const cityAlpha = (flightAlpha - transitionThreshold) / (1 - transitionThreshold);
          
          ctx.save();
          ctx.strokeStyle = `rgba(186, 230, 253, ${cityAlpha * 0.5})`; // Sky blue wireframes
          ctx.lineWidth = 1.0;

          const buildingCount = 8;
          for (let b = 0; b < buildingCount; b++) {
            const bIndex = b + 1;
            const bScale = Math.pow(cityAlpha, 2.2) * (bIndex * 1.6);
            const bWidth = 90 * bScale;
            const bHeight = 360 * bScale;
            const bX = (canvas.width / buildingCount) * b - (bWidth / 2) + Math.sin(bIndex * 18) * 80 * (1 - cityAlpha);
            const bY = canvas.height - bHeight + (50 * (1 - cityAlpha));

            ctx.fillStyle = `rgba(15, 23, 42, ${cityAlpha * 0.18})`; // Luxury high-rise silhouette
            ctx.fillRect(bX, bY, bWidth, bHeight);
            ctx.strokeRect(bX, bY, bWidth, bHeight);

            // Light matrices on skyscraper windows
            ctx.strokeStyle = `rgba(249, 115, 22, ${cityAlpha * 0.28})`; // Golden amber lights
            ctx.beginPath();
            const cols = 5;
            const rows = 14;
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const wx = bX + (bWidth / (cols + 1)) * (c + 1);
                const wy = bY + (bHeight / (rows + 1)) * (r + 1);
                ctx.rect(wx - 1.5, wy - 1.5, 3, 3);
              }
            }
            ctx.stroke();
          }
          ctx.restore();

          // Rushing speed vectors
          ctx.strokeStyle = `rgba(16, 185, 129, ${cityAlpha * 0.35})`; // Emerald vector lines
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const laneX = (canvas.width / 6) * i + (canvas.width / 12);
            ctx.moveTo(laneX, canvas.height);
            ctx.lineTo(laneX + (laneX - canvas.width / 2) * (cityAlpha * 4), canvas.height - 300);
          }
          ctx.stroke();

          // Entering cloud layer (Ivory transition blast)
          ctx.fillStyle = `rgba(248, 250, 252, ${cityAlpha * 0.98})`; 
          ctx.beginPath();
          const cloudZoomRadius = canvas.width * 1.35 * Math.pow(cityAlpha, 3);
          ctx.arc(canvas.width / 2, canvas.height / 2, cloudZoomRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
    };
  }, [phase, onEnter]);

  const handleStartFlight = () => {
    if (phase === 'intro') {
      setPhase('flight');
    }
  };

  return (
    <div id="opening-scene-container" className="fixed inset-0 z-50 overflow-hidden bg-slate-950 flex flex-col justify-between text-white select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-pointer" onClick={handleStartFlight} />
    </div>
  );
}

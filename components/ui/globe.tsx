"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import ThreeGlobe from "three-globe";

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export interface Position {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

interface MarkerDef {
  id: string;
  lat: number;
  lng: number;
  color: string;
}

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
  markers?: MarkerDef[];
  onMarkerClick?: (id: string) => void;
}

export function World({ globeConfig, markers = [], onMarkerClick }: WorldProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  const {
    globeColor = "#062056",
    showAtmosphere = true,
    atmosphereColor = "#ffffff",
    atmosphereAltitude = 0.1,
    emissive = "#062056",
    emissiveIntensity = 0.1,
    shininess = 0.9,
    polygonColor = "rgba(255,255,255,0.7)",
    ambientLight = "#38bdf8",
    directionalLeftLight = "#ffffff",
    directionalTopLight = "#ffffff",
    pointLight = "#ffffff",
    maxRings = 3,
    initialPosition = { lat: 22.3193, lng: 114.1694 },
    autoRotate = true,
    autoRotateSpeed = 0.5,
  } = globeConfig;

  // keep a stable ref so the effect closure can see latest onMarkerClick
  const onMarkerClickRef = useRef(onMarkerClick);
  useEffect(() => { onMarkerClickRef.current = onMarkerClick; }, [onMarkerClick]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const w = el.offsetWidth;
    const h = el.offsetHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.NoToneMapping;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 1000);
    camera.position.z = 250;

    scene.add(new THREE.AmbientLight(ambientLight, 4.0));
    const dLeft = new THREE.DirectionalLight(directionalLeftLight, 6.0);
    dLeft.position.set(-400, 100, 400);
    scene.add(dLeft);
    const dTop = new THREE.DirectionalLight(directionalTopLight, 6.0);
    dTop.position.set(-200, 500, 200);
    scene.add(dTop);
    const pLight = new THREE.PointLight(pointLight, 6.0, 800);
    pLight.position.set(-200, 500, 200);
    scene.add(pLight);

    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .hexPolygonsData([] as object[])
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(showAtmosphere)
      .atmosphereColor(atmosphereColor)
      .atmosphereAltitude(atmosphereAltitude)
      .hexPolygonColor(() => polygonColor);

    fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
      .then((r) => r.json())
      .then((countries) => { globe.hexPolygonsData(countries.features); })
      .catch(() => {});

    globe.onGlobeReady(() => {
      const mat = globe.globeMaterial() as THREE.MeshPhongMaterial;
      mat.color = new THREE.Color(globeColor);
      mat.emissive = new THREE.Color(emissive);
      mat.emissiveIntensity = emissiveIntensity;
      mat.shininess = shininess * 100;
    });

    // Marker dots (visible spheres on the surface)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = globe as any;
    if (markers.length > 0) {
      globe
        .pointsData(markers)
        .pointLat((d: object) => (d as MarkerDef).lat)
        .pointLng((d: object) => (d as MarkerDef).lng)
        .pointColor((d: object) => (d as MarkerDef).color)
        .pointAltitude(0.04)
        .pointRadius(0.6)
        .pointsMerge(false);

      // Rings on marker cities
      g.ringsData(markers)
        .ringLat((d: MarkerDef) => d.lat)
        .ringLng((d: MarkerDef) => d.lng)
        .ringColor((d: MarkerDef) => () => d.color)
        .ringMaxRadius(maxRings)
        .ringPropagationSpeed(3)
        .ringRepeatPeriod(1200);
    }

    // Detect marker clicks by projecting each marker's 3D position to screen space.
    // Formula matches three-globe's internal polar2Cartesian exactly.
    const GLOBE_RADIUS = 100;
    const markerLocalPos = (m: MarkerDef) => {
      const phi   = (90 - m.lat) * (Math.PI / 180);
      const theta = (90 - m.lng) * (Math.PI / 180);
      return new THREE.Vector3(
        GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta),
        GLOBE_RADIUS * Math.cos(phi),
        GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta)
      );
    };

    const handleClick = (e: MouseEvent) => {
      if (!markers.length) return;
      const rect = renderer.domElement.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const globeCenter = new THREE.Vector3().setFromMatrixPosition(globe.matrixWorld);

      let best: MarkerDef | null = null;
      let bestDist = Infinity;

      for (const m of markers) {
        const worldPos = markerLocalPos(m).applyMatrix4(globe.matrixWorld);
        // skip markers on the back hemisphere (facing away from camera)
        const toSurface = worldPos.clone().sub(globeCenter);
        const toCam = camera.position.clone().sub(worldPos);
        if (toSurface.dot(toCam) < 0) continue;

        const projected = worldPos.project(camera);
        const sx = ((projected.x + 1) / 2) * rect.width;
        const sy = ((-projected.y + 1) / 2) * rect.height;
        const d = Math.hypot(clickX - sx, clickY - sy);
        if (d < bestDist) { bestDist = d; best = m; }
      }

      if (best && bestDist < 48) onMarkerClickRef.current?.(best.id);
    };
    renderer.domElement.addEventListener("click", handleClick);

    scene.add(globe);

    globe.rotation.y = (initialPosition.lng * Math.PI) / 180;
    globe.rotation.x = -(initialPosition.lat * Math.PI) / 180;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    const ro = new ResizeObserver(() => {
      const nw = el.offsetWidth;
      const nh = el.offsetHeight;
      renderer.setSize(nw, nh);
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
    });
    ro.observe(el);

    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      controls.dispose();
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.dispose();
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mountRef} className="w-full h-full" />;
}

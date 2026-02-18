import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut } from 'lucide-react';

interface Avatar3DProps {
  outfitColor?: string;
  onReady?: () => void;
}

const Avatar3D: React.FC<Avatar3DProps> = ({ outfitColor = '#8B5CF6', onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.Camera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const avatarRef = useRef<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const rotationRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a); // Dark background
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 3;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 5);
    scene.add(directionalLight);

    // Create avatar group
    const avatarGroup = new THREE.Group();
    scene.add(avatarGroup);
    avatarRef.current = avatarGroup;

    // Create head (sphere)
    const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
    const headMaterial = new THREE.MeshPhongMaterial({
      color: 0xfdbcb4, // Skin tone
    });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 1;
    avatarGroup.add(head);

    // Create body (cylinder)
    const bodyGeometry = new THREE.CylinderGeometry(0.35, 0.35, 1.2, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({
      color: outfitColor,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0;
    avatarGroup.add(body);

    // Create left arm
    const armGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.9, 32);
    const armMaterial = new THREE.MeshPhongMaterial({ color: 0xfdbcb4 });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-0.6, 0.3, 0);
    leftArm.rotation.z = Math.PI / 6;
    avatarGroup.add(leftArm);

    // Create right arm
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(0.6, 0.3, 0);
    rightArm.rotation.z = -Math.PI / 6;
    avatarGroup.add(rightArm);

    // Create left leg
    const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.9, 32);
    const legMaterial = new THREE.MeshPhongMaterial({ color: 0x2d2d2d });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-0.2, -1.1, 0);
    avatarGroup.add(leftLeg);

    // Create right leg
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(0.2, -1.1, 0);
    avatarGroup.add(rightLeg);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate avatar
      rotationRef.current += 0.005;
      avatarGroup.rotation.y = rotationRef.current;

      // Slight bob animation
      avatarGroup.position.y = Math.sin(rotationRef.current * 2) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    setIsLoading(false);
    onReady?.();

    // Handle window resize
    const handleResize = () => {
      const newWidth = containerRef.current?.clientWidth || width;
      const newHeight = containerRef.current?.clientHeight || height;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update outfit color
  useEffect(() => {
    if (avatarRef.current && outfitColor) {
      const body = avatarRef.current.children[1];
      if (body && body instanceof THREE.Mesh) {
        (body.material as THREE.MeshPhongMaterial).color.set(outfitColor);
      }
    }
  }, [outfitColor]);

  const handleRotate = () => {
    if (avatarRef.current) {
      avatarRef.current.rotation.y = Math.random() * Math.PI * 2;
    }
  };

  const handleZoomIn = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.max(cameraRef.current.position.z - 0.5, 1);
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      cameraRef.current.position.z = Math.min(cameraRef.current.position.z + 0.5, 8);
    }
  };

  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Canvas */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading avatar...</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex gap-2 justify-center">
        <button
          onClick={handleZoomIn}
          className="p-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleRotate}
          className="p-2 rounded-lg bg-secondary hover:bg-secondary/90 text-secondary-foreground transition-all"
          title="Rotate"
        >
          <RotateCw className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Avatar3D;

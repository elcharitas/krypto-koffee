import { FC, useEffect, useRef } from "react";
import createGlobe from "cobe";

const GLOBE_OPTS = {
    phi: 0,
    theta: 0,
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16000,
    devicePixelRatio: 2,
    mapBrightness: 6,
    markers: [],
};

interface IGlobe {
    width: number;
    height: number;
}
export const Globe: FC<IGlobe> = ({ width, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return () => {};
        let phi = 0;

        const globe = createGlobe(canvasRef.current, {
            ...GLOBE_OPTS,
            width: width * 1.5,
            height: height * 1.5,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [0.1, 0.8, 1],
            glowColor: [1, 1, 1],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.01;
            },
        });

        return () => {
            globe.destroy();
        };
    }, [height, width]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                width,
                maxWidth: "100%",
                aspectRatio: "1",
                margin: "8px",
            }}
        />
    );
};

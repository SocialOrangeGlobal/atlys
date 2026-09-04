import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 32,
  height: 32,
}
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0A0E1A 0%, #121829 100%)",
          borderRadius: 8,
          position: "relative",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)",
        }}
      >
        {/* Top Contrail flight line + plane dot */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: 5,
            right: 5,
            height: 1.5,
            background: "linear-gradient(90deg, #4F46E5, #9333EA, #00D65B)",
            borderRadius: 2,
          }}
        />

        {/* Monogram GG */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontWeight: 900,
            fontSize: 16,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            marginTop: 4,
            letterSpacing: -1,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>G</span>
          <span
            style={{
              background: "linear-gradient(90deg, #4F46E5, #00D65B)",
              backgroundClip: "text",
              color: "#00D65B",
            }}
          >
            G
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

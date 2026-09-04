import { ImageResponse } from "next/og"

export const runtime = "edge"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

export default function AppleIcon() {
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
          position: "relative",
        }}
      >
        {/* Top Flight Contrail */}
        <div
          style={{
            position: "absolute",
            top: 36,
            left: 36,
            right: 50,
            height: 4,
            background: "linear-gradient(90deg, #4F46E5 0%, #9333EA 50%, #00D65B 100%)",
            borderRadius: 4,
          }}
        />

        {/* Monogram GG */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            fontWeight: 900,
            fontSize: 88,
            fontFamily: "system-ui, sans-serif",
            lineHeight: 1,
            marginTop: 20,
            letterSpacing: -4,
          }}
        >
          <span style={{ color: "#FFFFFF" }}>G</span>
          <span style={{ color: "#00D65B" }}>G</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

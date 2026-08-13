import { ImageResponse } from 'next/og'

export const alt = 'CHRITERIO · Estrategia y gestión para crecer en Amazon'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#061530',
          color: '#ffffff',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 760,
            height: 760,
            top: -430,
            right: -210,
            borderRadius: '50%',
            background: 'rgba(46, 91, 255, 0.23)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 540,
            height: 540,
            bottom: -390,
            left: -180,
            borderRadius: '50%',
            background: 'rgba(46, 91, 255, 0.14)',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: -4,
            }}
          >
            CHRITERIO
          </div>
          <div
            style={{
              width: 110,
              height: 6,
              marginTop: 22,
              borderRadius: 999,
              background: '#2e5bff',
            }}
          />
          <div
            style={{
              display: 'flex',
              marginTop: 30,
              fontSize: 31,
              color: 'rgba(255,255,255,0.72)',
              letterSpacing: 0.5,
            }}
          >
            Estrategia y gestión para crecer en Amazon
          </div>
        </div>
      </div>
    ),
    size,
  )
}

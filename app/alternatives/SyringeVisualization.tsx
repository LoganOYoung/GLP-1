'use client';

interface SyringeVisualizationProps {
  units: number;
  syringeSize: '0.3ml' | '0.5ml' | '1ml';
  markPosition: number; // 0-100 percentage
}

export default function SyringeVisualization({ units, syringeSize, markPosition }: SyringeVisualizationProps) {
  const syringeHeight = 200;
  const syringeWidth = 60;
  const barrelWidth = 40;
  const plungerWidth = 30;
  
  // Calculate fill height based on mark position (0-100%)
  const fillHeight = (markPosition / 100) * (syringeHeight - 40); // Leave space for tip
  
  // Syringe capacity in units based on size
  const capacityUnits: Record<'0.3ml' | '0.5ml' | '1ml', number> = {
    '0.3ml': 30,
    '0.5ml': 50,
    '1ml': 100,
  };
  
  const maxUnits = capacityUnits[syringeSize];
  const majorTicks = 5; // Major tick every 5 units
  const tickCount = Math.floor(maxUnits / majorTicks);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-900">
          {units} units ({syringeSize} syringe)
        </p>
        <p className="text-xs text-slate-600 mt-1">
          Draw to the {markPosition}% mark
        </p>
      </div>
      
      <svg
        width={syringeWidth}
        height={syringeHeight + 20}
        className="drop-shadow-sm"
        viewBox={`0 0 ${syringeWidth} ${syringeHeight + 20}`}
      >
        {/* Syringe barrel */}
        <rect
          x={(syringeWidth - barrelWidth) / 2}
          y="20"
          width={barrelWidth}
          height={syringeHeight - 20}
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="2"
          rx="4"
        />
        
        {/* Liquid fill */}
        <rect
          x={(syringeWidth - barrelWidth) / 2 + 2}
          y={syringeHeight - fillHeight}
          width={barrelWidth - 4}
          height={fillHeight}
          fill="#10b981"
          rx="2"
        />
        
        {/* Measurement ticks */}
        {Array.from({ length: tickCount + 1 }).map((_, i) => {
          const tickY = 20 + (i * (syringeHeight - 20)) / tickCount;
          const isMajor = i % 2 === 0;
          const tickLength = isMajor ? 8 : 4;
          const tickValue = maxUnits - (i * majorTicks);
          
          return (
            <g key={i}>
              {/* Tick mark */}
              <line
                x1={(syringeWidth - barrelWidth) / 2}
                x2={(syringeWidth - barrelWidth) / 2 - tickLength}
                y1={tickY}
                y2={tickY}
                stroke="#64748b"
                strokeWidth={isMajor ? "1.5" : "1"}
              />
              {/* Tick label */}
              {isMajor && (
                <text
                  x={(syringeWidth - barrelWidth) / 2 - tickLength - 4}
                  y={tickY + 4}
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="end"
                >
                  {tickValue}
                </text>
              )}
            </g>
          );
        })}
        
        {/* Mark line (target position) */}
        <line
          x1={(syringeWidth - barrelWidth) / 2}
          x2={(syringeWidth + barrelWidth) / 2}
          y1={syringeHeight - fillHeight}
          y2={syringeHeight - fillHeight}
          stroke="#ef4444"
          strokeWidth="2"
          strokeDasharray="4 2"
        />
        
        {/* Plunger */}
        <rect
          x={(syringeWidth - plungerWidth) / 2}
          y="10"
          width={plungerWidth}
          height="15"
          fill="#e2e8f0"
          stroke="#cbd5e1"
          strokeWidth="1"
          rx="2"
        />
        
        {/* Needle tip */}
        <polygon
          points={`${syringeWidth / 2},${syringeHeight} ${syringeWidth / 2 - 5},${syringeHeight + 15} ${syringeWidth / 2 + 5},${syringeHeight + 15}`}
          fill="#94a3b8"
        />
      </svg>
      
      <div className="text-xs text-slate-600 text-center max-w-xs">
        <p className="font-medium text-slate-900 mb-1">Instructions:</p>
        <ol className="list-decimal list-inside space-y-1 text-left">
          <li>Pull plunger to draw medication</li>
          <li>Stop when liquid reaches the red dashed line</li>
          <li>Remove air bubbles if present</li>
          <li>Inject as directed by your prescriber</li>
        </ol>
      </div>
    </div>
  );
}

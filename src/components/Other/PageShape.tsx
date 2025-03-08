import { cn } from '@/lib/utils/cn'
interface PageShapeProps {
  className?: string
  position: 'top' | 'bottom-left' | 'bottom-right' | 'header'
}

export const PageShape: React.FC<PageShapeProps> = ({ position, className = '' }) => {
  const transforms = ['', 'scale(-1, 1)', 'scale(1, -1)', 'scale(-1, -1)'] // 0 normal, 1 flip horizontal, 2 flip vertical, 3 flip both
  const randomTransform = transforms[Math.floor(Math.random() * transforms.length)]

  if ( position === 'header') {
    return (
      <div className="w-full h-[1245px] z-20 text-black">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1245" // Adjusted viewBox height to 1245 to add 5px at the bottom
          className={cn(className, 'absolute bottom-0')}
          transform={transforms[0]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 201.561092 0 1036.200679 0 1087.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="white" mask="url(#mask)" />
          <rect y="1240" width="100%" height="5" fill="white" />{' '}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }
  if ( position === 'top') {
    return (
      <div className="w-full h-[350px] z-20 text-black">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 350" // Adjusted viewBox height to 1245 to add 5px at the bottom
          className={cn(className, 'absolute')}
          transform={transforms[1]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255.099121 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs>
          <polygon points="0 0 0 135 1255.099121 332 1920 0 1920 0 1920 0 0 0" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)" /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
        {/* <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  }
  if (position === 'bottom-left' || position === 'bottom-right') {
    return (
      <div className="w-full h-[350px] z-20 text-black">
        <svg
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 350" // Adjusted viewBox height to 1245 to add 5px at the bottom
          className={cn(className, 'absolute bottom-0')}
          transform={position === 'bottom-left' ? transforms[3]: transforms[2]}
        >
          <defs>
            <mask id="mask">
              <rect width="100%" height="100%" fill="white" />
              <polygon points="0 0 0 135 1255.099121 332 1920 0 1920 0 1920 0 0 0" />
            </mask>
          </defs>
          <polygon points="0 0 0 135 1255.099121 332 1920 0 1920 0 1920 0 0 0" />
          {/* <rect width="100%" height="100%" fill="white" mask="url(#mask)" /> */}
          {/* Added white rectangle at the bottom */}
        </svg>
 {/*        <div className="absolute bottom-0 border-none left-0 w-full h-[20px] z-10 bg-white" /> */}
      </div>
    )
  } 
}


export const Mask = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1245"
      className={cn(className, 'absolute w-full h-full')}
    >
      <defs>
        <mask id="mask">
          {/* The entire section is black, meaning it's hidden */}
          <rect width="100%" height="100%" fill="black" />
          {/* The polygon shape is white, meaning it's visible (transparent) */}
          <polygon
            fill="white"
            points="0 0 0 201.561092 0 1036.200679 0 1087.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0"
          />
        </mask>
      </defs>

      {/* Apply the mask to a black rectangle to create transparency */}
      <rect width="100%" height="100%" fill="black" mask="url(#mask)" />
    </svg>
  );
};

// <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1240" className={cn(className, 'absolute bottom-[0px]')}>
//       <defs>
//         <mask id="mask">
//           <rect width="100%" height="100%" fill="white" />
//           <polygon
//             // fill="black"
//             points="0 0 0 201.561092 0 1036.200679 0 1092.625789 1255.099121 1240.909908 1920 908.450984 1920 201.561092 1920 0 0 0"
//           />
//         </mask>
//       </defs>
//       <rect width="100%" height="100%" fill="white" mask="url(#mask)" />
//     </svg>


/// working


// {/* <svg
//           id="Layer_1"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1920 350" // Adjusted viewBox height to 1245 to add 5px at the bottom
//           className={cn(className, 'absolute bottom-0')}
//           transform={transforms[0]}
//         >
//           <defs>
//             <mask id="mask">
//               <rect width="100%" height="100%" fill="white" />
//               <polygon points="0 0 0 135 1255.099121 332 1920 0 1920 0 1920 0 0 0" />
//             </mask>
//           </defs>
//           <rect width="100%" height="100%" fill="white" mask="url(#mask)" />
//           {/* Added white rectangle at the bottom */}
//         </svg> */}
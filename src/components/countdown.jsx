// import { useEffect, useState } from 'react';
// import './Countdown.css';

// export default function Countdown({ start = 5, onComplete }) {
//   const [count, setCount] = useState(start);

//   useEffect(() => {
//     if (count > 0) {
//       const timer = setTimeout(() => setCount(count - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       if (onComplete) onComplete();
//     }
//   }, [count, onComplete]);

//   if (count === 0) return null;

//   return (
//     <div className="countdown-mask">
//       <span>{count}</span>
//     </div>
//   );
// }

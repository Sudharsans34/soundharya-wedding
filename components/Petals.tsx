'use client';
export default function Petals(){
 return <>{Array.from({length:18}).map((_,i)=><span key={i} className="petal" style={{left:`${(i*17)%100}%`, animationDuration:`${8+(i%7)}s`, animationDelay:`${i*.7}s`, opacity:.25+(i%5)*.09}}/> )}</>
}

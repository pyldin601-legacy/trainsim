import { animationFrameScheduler, interval } from "rxjs";

const timer$ = interval(0, animationFrameScheduler);

export default timer$;

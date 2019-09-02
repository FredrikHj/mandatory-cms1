import {BehaviorSubject} from "rxjs";

export const currentIndex$ = new BehaviorSubject(window.localStorage.getItem("currentIndex"));

export function updateCurrentIndex(currentIndex){
    console.log(currentIndex);
    if(currentIndex === null){
        window.localStorage.removeItem("currentIndex");
        currentIndex$.next(currentIndex);
    }else{
        currentIndex$.next(currentIndex);
    }
}

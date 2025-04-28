import { inject, Injectable } from "@angular/core";
import { onAuthStateChanged } from "firebase/auth";
import { doc, Firestore, onSnapshot } from "firebase/firestore";
import { BehaviorSubject, Observable } from "rxjs";
import { Auth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class RoleService {
    private auth = inject(Auth);
    private role$: BehaviorSubject<string> = new BehaviorSubject<string>('guest');

    constructor(private firestore: Firestore) {
        onAuthStateChanged(this.auth, user => {
            if (user) {
                const docRef = doc(this.firestore, `users/${user.uid}`);
                onSnapshot(docRef, (snapshot) => {
                    const data = snapshot.data();
                    if (data?.["role"]) {
                        this.role$.next(data["role"]);
                    }
                });
            } else {
                this.role$.next('guest');
            }
        });
    }

    getRole(): Observable<string> {
        return this.role$.asObservable();
    }
}
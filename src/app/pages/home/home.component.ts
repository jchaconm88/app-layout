import { Component, inject } from '@angular/core';
import { NbActionsModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { NbSecurityModule } from '@nebular/security';

@Component({
  selector: 'app-home',
  imports: [
    NbButtonModule,
    NbIconModule,
    NbActionsModule,
    NbSecurityModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private firestore = inject(Firestore);
  private auth = inject(Auth);

  constructor() {
    // this.getUsers().subscribe(users => {
    //   console.log('Usuarios desde Firestore:', users);
    // });
  }

  async toggleShuffle(){
    const result = await signInWithEmailAndPassword(this.auth, 'fchacong@outlook.com', 'Jo@quin88_');
      console.log('Login exitoso', result.user);
  }

  getUsers(): Observable<any[]> {
    const usersCollection = collection(this.firestore, 'app-users');
    return collectionData(usersCollection, { idField: 'id' });
  }
}
